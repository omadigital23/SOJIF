import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';
import { sendContactConfirmation, sendContactNotificationToAdmin, ADMIN_EMAIL } from '@/lib/email';
import { rateLimiters, getClientIP } from '@/lib/rate-limit';
import { captureException, addBreadcrumb } from '@/lib/sentry';

const contactSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string().min(8).max(20),
    company: z.string().max(100).optional(),
    subject: z.string().min(1),
    message: z.string().min(10).max(2000),
    // Extra fields from the extended form
    domain: z.string().optional(),
    turnover: z.string().optional(),
    employees: z.string().optional(),
    challenge: z.string().optional(),
    phase: z.string().optional(),
    budget: z.string().optional(),
    meetingPref: z.string().optional(),
});

export async function POST(request: Request) {
    const clientIP = getClientIP(request);

    try {
        // Apply rate limiting (fail open if not configured)
        try {
            const rateLimit = await rateLimiters.contact(clientIP);
            if (!rateLimit.success) {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'Trop de demandes. Veuillez réessayer plus tard.',
                        retryAfter: rateLimit.resetTime,
                    },
                    { status: 429, headers: { 'Retry-After': rateLimit.resetTime.toString() } }
                );
            }
        } catch (rateLimitError) {
            console.warn('Rate limiting unavailable, continuing:', rateLimitError);
            // Continue without rate limiting
        }

        const body = await request.json();
        const validated = contactSchema.parse(body);

        addBreadcrumb('Contact form submitted', {
            email: validated.email,
            subject: validated.subject,
        });

        // Build full message with extra info
        let fullMessage = validated.message;
        if (validated.domain || validated.turnover || validated.employees) {
            fullMessage += `\n\n--- Informations Entreprise ---`;
            if (validated.company) fullMessage += `\nEntreprise: ${validated.company}`;
            if (validated.domain) fullMessage += `\nDomaine: ${validated.domain}`;
            if (validated.turnover) fullMessage += `\nChiffre d'affaires: ${validated.turnover}`;
            if (validated.employees) fullMessage += `\nNombre de salariés: ${validated.employees}`;
            if (validated.phase) fullMessage += `\nPhase: ${validated.phase}`;
            if (validated.budget) fullMessage += `\nBudget: ${validated.budget}`;
            if (validated.challenge) fullMessage += `\nChallenge: ${validated.challenge}`;
            if (validated.meetingPref) fullMessage += `\nPréférence RDV: ${validated.meetingPref}`;
        }

        const { error } = await supabaseAdmin
            .from('contact_messages')
            .insert({
                first_name: validated.firstName,
                last_name: validated.lastName,
                email: validated.email,
                phone: validated.phone,
                company: validated.company || null,
                subject: validated.subject,
                message: fullMessage,
                status: 'new',
            })
            .select('id')
            .single();

        if (error) {
            console.error('Supabase error:', error);
            captureException(error as Error, {
                source: 'contact/insert',
                email: validated.email,
            });
            return NextResponse.json(
                { success: false, message: 'Erreur lors de l\'enregistrement.' },
                { status: 500 }
            );
        }

        // Send confirmation email to user
        try {
            await sendContactConfirmation(
                validated.email,
                validated.firstName,
                validated.subject
            );
            addBreadcrumb('Contact confirmation email sent', {
                email: validated.email,
            });
        } catch (emailError) {
            console.warn('Failed to send contact confirmation email:', emailError);
            // Don't fail the request, continue normally
        }

        // Send notification email to admin with all form data
        try {
            const adminNotification = await sendContactNotificationToAdmin({
                firstName: validated.firstName,
                lastName: validated.lastName,
                email: validated.email,
                phone: validated.phone,
                company: validated.company || null,
                subject: validated.subject,
                message: fullMessage,
                domain: validated.domain || null,
                turnover: validated.turnover || null,
                employees: validated.employees || null,
                challenge: validated.challenge || null,
                phase: validated.phase || null,
                budget: validated.budget || null,
                meetingPref: validated.meetingPref || null,
            });
            addBreadcrumb('Admin contact notification email sent');
            console.info('Admin contact notification email sent', {
                emailId: adminNotification.id,
                to: ADMIN_EMAIL,
            });
        } catch (emailError) {
            console.warn('Failed to send admin contact notification email:', emailError);
        }

        return NextResponse.json(
            { success: true, message: 'Message reçu avec succès.' },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation error:', error);
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }

        if (error instanceof Error) {
            console.error('Contact API error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name,
            });
            captureException(error, {
                source: 'contact/post',
                ip: clientIP,
            });
        } else {
            console.error('Unknown error in contact API:', error);
        }

        return NextResponse.json(
            { success: false, message: 'Erreur interne du serveur.' },
            { status: 500 }
        );
    }
}

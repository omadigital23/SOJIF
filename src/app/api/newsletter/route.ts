import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';
import { sendNewsletterConfirmation } from '@/lib/email';
import { rateLimiters, getClientIP } from '@/lib/rate-limit';
import { captureException, addBreadcrumb } from '@/lib/sentry';

const newsletterSchema = z.object({
    email: z.string().email(),
});

export async function POST(request: Request) {
    const clientIP = getClientIP(request);

    try {
        // Apply rate limiting
        const rateLimit = await rateLimiters.newsletter(clientIP);
        if (!rateLimit.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Trop de tentatives. Veuillez réessayer plus tard.',
                    retryAfter: rateLimit.resetTime,
                },
                { status: 429, headers: { 'Retry-After': rateLimit.resetTime.toString() } }
            );
        }

        const body = await request.json();
        const { email } = newsletterSchema.parse(body);

        addBreadcrumb('Newsletter subscription attempt', { email });

        const { error, data } = await supabaseAdmin
            .from('newsletter_subscribers')
            .upsert(
                {
                    email,
                    source: 'website',
                    is_active: true,
                    subscribed_at: new Date().toISOString(),
                },
                { onConflict: 'email' }
            )
            .select('id')
            .single();

        if (error) {
            console.error('Supabase error:', error);
            captureException(error as Error, {
                source: 'newsletter/insert',
                email,
            });
            return NextResponse.json(
                { success: false, message: 'Erreur lors de l\'inscription.' },
                { status: 500 }
            );
        }

        // Send confirmation email
        try {
            await sendNewsletterConfirmation(email);
            addBreadcrumb('Newsletter confirmation email sent', { email });
        } catch (emailError) {
            console.warn('Failed to send newsletter confirmation:', emailError);
            // Don't fail the request, the subscription is already saved
        }

        addBreadcrumb('Newsletter subscription successful', {
            email,
            subscriberId: data?.id,
        });

        return NextResponse.json(
            { success: true, message: 'Inscription réussie.' },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }

        if (error instanceof Error) {
            captureException(error, {
                source: 'newsletter/post',
                ip: clientIP,
            });
        }

        console.error('Newsletter API error:', error);
        return NextResponse.json(
            { success: false, message: 'Erreur interne.' },
            { status: 500 }
        );
    }
}

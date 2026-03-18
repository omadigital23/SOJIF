import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';

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
    try {
        const body = await request.json();
        const validated = contactSchema.parse(body);

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
            });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { success: false, message: 'Erreur lors de l\'enregistrement.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Message reçu avec succès.' },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }
        console.error('Contact API error:', error);
        return NextResponse.json(
            { success: false, message: 'Erreur interne du serveur.' },
            { status: 500 }
        );
    }
}

import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string().min(8).max(20),
    company: z.string().max(100).optional(),
    subject: z.string().min(1),
    message: z.string().min(10).max(2000),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = contactSchema.parse(body);

        // TODO: Rate limiting with Upstash
        // TODO: Store in Supabase contact_messages table
        // TODO: Send email notification via Resend

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
        return NextResponse.json(
            { success: false, message: 'Erreur interne du serveur.' },
            { status: 500 }
        );
    }
}

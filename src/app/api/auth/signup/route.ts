import { NextResponse } from 'next/server';
import { z } from 'zod';

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    company: z.string().optional(),
    phone: z.string().min(8),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = signupSchema.parse(body);

        // TODO: Create user in Supabase Auth
        // TODO: Create user profile in users table
        // TODO: Send welcome email via Resend
        // TODO: Rate limiting with Upstash

        return NextResponse.json(
            { success: true, message: 'Compte créé avec succès.' },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, message: 'Erreur lors de la création du compte.' },
            { status: 500 }
        );
    }
}

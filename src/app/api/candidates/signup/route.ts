import { NextResponse } from 'next/server';
import { z } from 'zod';

const candidateSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    password: z.string().min(8),
    skills: z.array(z.string()).optional(),
    experience: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = candidateSchema.parse(body);

        // TODO: Create candidate account in Supabase Auth
        // TODO: Create candidate_profiles record
        // TODO: Send confirmation email

        return NextResponse.json(
            { success: true, message: 'Compte candidat créé avec succès.' },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ success: false, message: 'Erreur interne.' }, { status: 500 });
    }
}

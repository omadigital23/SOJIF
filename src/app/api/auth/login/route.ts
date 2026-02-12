import { NextResponse } from 'next/server';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = loginSchema.parse(body);

        // TODO: Authenticate with Supabase Auth
        // TODO: Rate limiting / brute force protection with Upstash

        return NextResponse.json(
            { success: true, message: 'Connexion réussie.' },
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
            { success: false, message: 'Identifiants incorrects.' },
            { status: 401 }
        );
    }
}

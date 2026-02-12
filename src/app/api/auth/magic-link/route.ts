import { NextResponse } from 'next/server';
import { z } from 'zod';

const magicLinkSchema = z.object({
    email: z.string().email(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = magicLinkSchema.parse(body);

        // TODO: Send magic link via Supabase Auth
        // TODO: Rate limiting with Upstash

        return NextResponse.json(
            { success: true, message: 'Lien magique envoyé.' },
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
            { success: false, message: 'Erreur lors de l\'envoi.' },
            { status: 500 }
        );
    }
}

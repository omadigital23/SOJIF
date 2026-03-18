import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';

const magicLinkSchema = z.object({
    email: z.string().email(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = magicLinkSchema.parse(body);

        const { error } = await supabaseAdmin.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/fr/espace-client`,
            },
        });

        if (error) {
            console.error('Magic link error:', error);
            return NextResponse.json(
                { success: false, message: 'Erreur lors de l\'envoi du lien.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Lien magique envoyé. Vérifiez votre email.' },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }
        console.error('Magic link API error:', error);
        return NextResponse.json(
            { success: false, message: 'Erreur lors de l\'envoi.' },
            { status: 500 }
        );
    }
}

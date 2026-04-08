import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = loginSchema.parse(body);

        // Authenticate with Supabase using email/password
        const supabase = createClient(
            env.NEXT_PUBLIC_SUPABASE_URL,
            env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error || !data.session) {
            return NextResponse.json(
                { success: false, message: 'Email ou mot de passe incorrect.' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                accessToken: data.session.access_token,
                user: {
                    id: data.user.id,
                    email: data.user.email,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, message: 'Données invalides.' }, { status: 400 });
        }
        console.error('Login API error:', error);
        return NextResponse.json({ success: false, message: 'Erreur interne.' }, { status: 500 });
    }
}

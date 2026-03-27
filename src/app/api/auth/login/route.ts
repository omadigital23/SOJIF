import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';
import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

// Créer le client public pour l'authentification
const supabaseAnon = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = loginSchema.parse(body);

        const { data, error } = await supabaseAnon.auth.signInWithPassword({
            email: validated.email,
            password: validated.password,
        });

        if (error) {
            console.error('Login error:', error);
            return NextResponse.json(
                { success: false, message: 'Identifiants incorrects.' },
                { status: 401 }
            );
        }

        // Update last login timestamp
        await supabaseAdmin
            .from('users')
            .update({
                last_login_at: new Date().toISOString(),
                login_count: data.user?.user_metadata?.login_count
                    ? data.user.user_metadata.login_count + 1
                    : 1,
            })
            .eq('id', data.user.id);

        return NextResponse.json(
            {
                success: true,
                message: 'Connexion réussie.',
                session: {
                    access_token: data.session.access_token,
                    refresh_token: data.session.refresh_token,
                    expires_at: data.session.expires_at,
                },
                user: {
                    id: data.user.id,
                    email: data.user.email,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, message: 'Données invalides.' },
                { status: 400 }
            );
        }
        console.error('Login API error:', error);
        return NextResponse.json(
            { success: false, message: 'Identifiants incorrects.' },
            { status: 401 }
        );
    }
}

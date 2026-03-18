import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';

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

        // 1. Create user in Supabase Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: validated.email,
            password: validated.password,
            email_confirm: true,
            user_metadata: {
                first_name: validated.firstName,
                last_name: validated.lastName,
            },
        });

        if (authError) {
            console.error('Auth error:', authError);
            const message = authError.message.includes('already registered')
                ? 'Un compte existe déjà avec cet email.'
                : 'Erreur lors de la création du compte.';
            return NextResponse.json({ success: false, message }, { status: 400 });
        }

        // 2. Create user profile in users table
        const { error: profileError } = await supabaseAdmin
            .from('users')
            .insert({
                id: authData.user.id,
                email: validated.email,
                first_name: validated.firstName,
                last_name: validated.lastName,
                phone: validated.phone,
                company: validated.company || null,
                role: 'client',
                email_verified: true,
            });

        if (profileError) {
            console.error('Profile error:', profileError);
            // Rollback auth user if profile creation fails
            await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
            return NextResponse.json(
                { success: false, message: 'Erreur lors de la création du profil.' },
                { status: 500 }
            );
        }

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
        console.error('Signup API error:', error);
        return NextResponse.json(
            { success: false, message: 'Erreur lors de la création du compte.' },
            { status: 500 }
        );
    }
}

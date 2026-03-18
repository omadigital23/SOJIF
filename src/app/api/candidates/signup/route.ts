import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';

const candidateSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    password: z.string().min(8),
    domain: z.string().optional(),
    experience: z.string().optional(),
    skills: z.array(z.string()).optional(),
    message: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = candidateSchema.parse(body);

        // 1. Create auth user
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

        // 2. Create user profile
        const { error: userError } = await supabaseAdmin
            .from('users')
            .insert({
                id: authData.user.id,
                email: validated.email,
                first_name: validated.firstName,
                last_name: validated.lastName,
                phone: validated.phone,
                role: 'candidate',
                email_verified: true,
            });

        if (userError) {
            console.error('User error:', userError);
            await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
            return NextResponse.json({ success: false, message: 'Erreur interne.' }, { status: 500 });
        }

        // 3. Create candidate record
        const { data: candidateData, error: candidateError } = await supabaseAdmin
            .from('candidates')
            .insert({ user_id: authData.user.id, status: 'pending' })
            .select('id')
            .single();

        if (candidateError) {
            console.error('Candidate error:', candidateError);
            return NextResponse.json({ success: false, message: 'Erreur interne.' }, { status: 500 });
        }

        // 4. Create candidate profile
        await supabaseAdmin.from('candidate_profiles').insert({
            candidate_id: candidateData.id,
            skills: validated.skills || [],
            desired_position: validated.domain || null,
            bio: validated.message || null,
            experience_years: validated.experience
                ? parseInt(validated.experience) || null
                : null,
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Compte candidat créé avec succès.',
                candidateId: candidateData.id,
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
        }
        console.error('Candidate signup API error:', error);
        return NextResponse.json({ success: false, message: 'Erreur interne.' }, { status: 500 });
    }
}

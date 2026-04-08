import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';
import { sendRecruitmentConfirmation } from '@/lib/email';

const candidateSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    domain: z.string().optional(),
    experience: z.string().optional(),
    skills: z.array(z.string()).optional(),
    message: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = candidateSchema.parse(body);

        // ─── 1. Invite user via Supabase magic link (aucun mot de passe) ───────
        // Supabase envoie un email avec un lien de connexion sécurisé.
        // L'email transactionnel est configuré dans le dashboard Supabase (support@sojifconsulting.com).
        const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
            validated.email,
            {
                data: {
                    first_name: validated.firstName,
                    last_name: validated.lastName,
                },
            }
        );

        // Si l'utilisateur existe déjà, on continue sans erreur critique
        const userId = inviteData?.user?.id;
        if (inviteError && !inviteError.message.includes('already been registered')) {
            console.error('Invite error:', inviteError);
            return NextResponse.json(
                { success: false, message: 'Erreur lors de la création du compte.' },
                { status: 400 }
            );
        }

        // ─── 2. Si c'est un nouvel utilisateur, créer le profil ────────────────
        if (userId) {
            await supabaseAdmin.from('users').upsert({
                id: userId,
                email: validated.email,
                first_name: validated.firstName,
                last_name: validated.lastName,
                phone: validated.phone,
                role: 'candidate',
                email_verified: false,
            }, { onConflict: 'id' });
        }

        // ─── 3. Trouver ou créer l'enregistrement candidat ─────────────────────
        let candidateId: string | null = null;

        if (userId) {
            const { data: existingCandidate } = await supabaseAdmin
                .from('candidates')
                .select('id')
                .eq('user_id', userId)
                .maybeSingle();

            if (existingCandidate) {
                candidateId = existingCandidate.id;
            } else {
                const { data: newCandidate, error: candidateError } = await supabaseAdmin
                    .from('candidates')
                    .insert({ user_id: userId, status: 'pending' })
                    .select('id')
                    .single();

                if (!candidateError && newCandidate) {
                    candidateId = newCandidate.id;

                    // 4. Profil candidat
                    await supabaseAdmin.from('candidate_profiles').upsert({
                        candidate_id: candidateId,
                        skills: validated.skills ?? [],
                        desired_position: validated.domain ?? null,
                        bio: validated.message ?? null,
                        experience_years: validated.experience
                            ? parseInt(validated.experience) || null
                            : null,
                    }, { onConflict: 'candidate_id' });
                }
            }
        }

        // ─── 5. Email de confirmation (via Resend, hors flux Supabase) ──────────
        try {
            await sendRecruitmentConfirmation(
                validated.email,
                `${validated.firstName} ${validated.lastName}`,
                validated.domain ?? 'votre domaine'
            );
        } catch (emailError) {
            console.warn('Recruitment confirmation email failed:', emailError);
            // Non bloquant
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Candidature enregistrée. Vérifiez vos emails pour activer votre compte.',
                candidateId,
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

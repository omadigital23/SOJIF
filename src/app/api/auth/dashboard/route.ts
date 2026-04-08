import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json({ success: false, message: 'Token manquant.' }, { status: 401 });
        }

        // Verify token and get user from Supabase
        const supabase = createClient(
            env.NEXT_PUBLIC_SUPABASE_URL,
            env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            { global: { headers: { Authorization: `Bearer ${token}` } } }
        );

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ success: false, message: 'Session expirée.' }, { status: 401 });
        }

        // Fetch user profile from admin client
        const adminSupabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
            auth: { autoRefreshToken: false, persistSession: false },
        });

        const { data: userProfile } = await adminSupabase
            .from('users')
            .select('id, email, first_name, last_name, phone')
            .eq('id', user.id)
            .single();

        // Fetch subscription
        const { data: subscription } = await adminSupabase
            .from('subscriptions')
            .select('id, status, start_date, pack_id')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .maybeSingle();

        // Fetch recent payments (last 10)
        const { data: payments } = await adminSupabase
            .from('payments')
            .select('id, amount, currency, status, description, created_at')
            .eq('customer_email', user.email)
            .order('created_at', { ascending: false })
            .limit(10);

        // Fetch candidate documents if user is a candidate
        const { data: candidateData } = await adminSupabase
            .from('candidates')
            .select('id')
            .eq('user_id', user.id)
            .maybeSingle();

        let documents: unknown[] = [];
        if (candidateData?.id) {
            const { data: docs } = await adminSupabase
                .from('candidate_documents')
                .select('id, type, file_name, file_url, file_size, created_at')
                .eq('candidate_id', candidateData.id)
                .order('created_at', { ascending: false });
            documents = docs ?? [];
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email ?? '',
                firstName: userProfile?.first_name ?? user.user_metadata?.first_name ?? '',
                lastName: userProfile?.last_name ?? user.user_metadata?.last_name ?? '',
            },
            subscription: subscription ?? null,
            payments: payments ?? [],
            documents,
        });
    } catch (error) {
        console.error('Dashboard API error:', error);
        return NextResponse.json({ success: false, message: 'Erreur interne.' }, { status: 500 });
    }
}

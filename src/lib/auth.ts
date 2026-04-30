import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';
import { supabaseAdmin } from '@/lib/supabase-server';

export interface UserProfile {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: 'client' | 'candidate' | 'admin' | 'super_admin';
    is_active: boolean | null;
}

export function getBearerToken(request: Request) {
    const authHeader = request.headers.get('authorization');
    const [scheme, token] = authHeader?.split(' ') ?? [];

    if (scheme?.toLowerCase() !== 'bearer' || !token) {
        return null;
    }

    return token;
}

export async function getUserFromAccessToken(token: string) {
    const supabase = createClient(
        env.NEXT_PUBLIC_SUPABASE_URL,
        env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
            global: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        }
    );

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) return null;

    return user;
}

export async function getUserProfile(userId: string) {
    const { data, error } = await supabaseAdmin
        .from('users')
        .select('id, email, first_name, last_name, role, is_active')
        .eq('id', userId)
        .single();

    if (error || !data) return null;

    return data as UserProfile;
}

export async function requireAdmin(request: Request) {
    const token = getBearerToken(request);
    if (!token) return null;

    const user = await getUserFromAccessToken(token);
    if (!user) return null;

    const profile = await getUserProfile(user.id);
    if (!profile?.is_active || !['admin', 'super_admin'].includes(profile.role)) {
        return null;
    }

    return { token, user, profile };
}

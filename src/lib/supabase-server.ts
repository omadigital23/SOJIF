import { createClient } from '@supabase/supabase-js';
import { env } from './env';

// Server-side client with service role key (bypasses RLS)
// Use ONLY in API routes / server components
export const supabaseAdmin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

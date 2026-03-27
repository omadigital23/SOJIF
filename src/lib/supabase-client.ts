import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Client-side Supabase client (respects RLS)
let client: SupabaseClient | null = null;

export function getSupabaseClient() {
    if (!client) {
        client = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL || '',
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        );
    }
    return client;
}

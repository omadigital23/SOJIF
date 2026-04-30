import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        if (!(await requireAdmin(request))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data, error } = await supabaseAdmin
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const messages = (data || []).map((msg) => ({
            id: msg.id,
            firstName: msg.first_name || '',
            lastName: msg.last_name || '',
            email: msg.email || '',
            subject: msg.subject || '',
            message: msg.message || '',
            status: msg.status || 'unread',
            createdAt: msg.created_at,
        }));

        return NextResponse.json(messages);
    } catch (error) {
        console.error('Messages fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

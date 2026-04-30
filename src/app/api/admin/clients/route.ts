import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        if (!(await requireAdmin(request))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data, error } = await supabaseAdmin
            .from('users')
            .select('id, email, first_name, last_name, company, phone, is_active, created_at')
            .eq('role', 'client')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const clients = (data || []).map((user) => ({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            company: user.company || '',
            phone: user.phone || '',
            status: user.is_active ? 'active' : 'inactive',
            createdAt: user.created_at,
        }));

        return NextResponse.json(clients);
    } catch (error) {
        console.error('Clients fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

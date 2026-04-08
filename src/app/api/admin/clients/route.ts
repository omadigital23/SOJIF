import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

async function verifyAdminToken(token: string) {
    try {
        const {
            data: { user },
        } = await supabaseAdmin.auth.admin.getUserById(token);

        if (!user) return null;

        const { data: userData } = await supabaseAdmin
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single();

        return userData && ['admin', 'super_admin'].includes(userData.role) ? user : null;
    } catch {
        return null;
    }
}

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token || !(await verifyAdminToken(token))) {
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

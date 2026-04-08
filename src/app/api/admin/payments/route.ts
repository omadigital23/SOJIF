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
            .from('payments')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const payments = (data || []).map((payment) => ({
            id: payment.id,
            clientName: payment.client_name || 'N/A',
            email: payment.client_email || '',
            amount: payment.amount || 0,
            status: payment.status || 'pending',
            method: payment.method || 'Flutterwave',
            reference: payment.reference || '',
            createdAt: payment.created_at,
        }));

        return NextResponse.json(payments);
    } catch (error) {
        console.error('Payments fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

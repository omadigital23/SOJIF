import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        if (!(await requireAdmin(request))) {
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

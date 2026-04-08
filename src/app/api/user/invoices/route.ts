import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

async function verifyUserToken(token: string) {
    try {
        const {
            data: { user },
        } = await supabaseAdmin.auth.admin.getUserById(token);
        return user ? true : false;
    } catch {
        return false;
    }
}

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token || !(await verifyUserToken(token))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const {
            data: { user },
        } = await supabaseAdmin.auth.admin.getUserById(token);

        const { data, error } = await supabaseAdmin
            .from('invoices')
            .select('*')
            .eq('user_id', user?.id)
            .order('created_at', { ascending: false });

        if (error) throw error;

        const invoices = (data || []).map((invoice) => ({
            id: invoice.id,
            number: invoice.invoice_number || '',
            date: invoice.created_at,
            amount: invoice.amount || 0,
            status: invoice.status || 'pending',
            periodStart: invoice.period_start,
            periodEnd: invoice.period_end,
            url: invoice.invoice_url,
        }));

        return NextResponse.json(invoices);
    } catch (error) {
        console.error('Invoices fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

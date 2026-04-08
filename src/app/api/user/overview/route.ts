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

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Get user profile from database
        const { data: userProfile } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

        // Get subscription info
        const { data: subscription } = await supabaseAdmin
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .single();

        // Get invoices
        const { data: invoices, count: invoicesCount } = await supabaseAdmin
            .from('invoices')
            .select('*', { count: 'exact' })
            .eq('user_id', user.id);

        return NextResponse.json({
            subscription: subscription?.plan_name || 'N/A',
            status: subscription?.status || 'inactive',
            nextBillingDate: subscription?.next_billing_date,
            totalSpent: invoices?.reduce((sum, inv) => sum + (inv.amount || 0), 0) || 0,
            invoicesCount: invoicesCount || 0,
            ticketsCount: 0,
        });
    } catch (error) {
        console.error('Overview error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

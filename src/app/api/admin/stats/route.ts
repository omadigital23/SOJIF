import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        if (!(await requireAdmin(request))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get stats from database
        const [clients, payments, candidates, messages] = await Promise.all([
            supabaseAdmin.from('users').select('id', { count: 'exact' }).eq('role', 'client'),
            supabaseAdmin.from('payments').select('*', { count: 'exact' }),
            supabaseAdmin.from('candidates').select('id', { count: 'exact' }),
            supabaseAdmin.from('contact_messages').select('id', { count: 'exact' }),
        ]);

        const completedPayments = payments.data?.filter((p) => p.status === 'completed') || [];
        const totalRevenue = completedPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
        const pendingPayments = payments.data?.filter((p) => p.status === 'pending').length || 0;

        // Get recent activity
        const { data: recentActivity } = await supabaseAdmin
            .from('activity_log')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        return NextResponse.json({
            totalClients: clients.count || 0,
            activeSubscriptions: clients.count || 0, // You may need to adjust this query
            totalRevenue,
            pendingPayments,
            candidates: candidates.count || 0,
            messages: messages.count || 0,
            recentActivity: recentActivity || [],
        });
    } catch (error) {
        console.error('Stats error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

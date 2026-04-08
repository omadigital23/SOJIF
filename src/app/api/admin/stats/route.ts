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

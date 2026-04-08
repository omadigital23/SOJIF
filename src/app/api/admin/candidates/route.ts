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
            .from('candidates')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const candidates = (data || []).map((candidate) => ({
            id: candidate.id,
            firstName: candidate.first_name || '',
            lastName: candidate.last_name || '',
            email: candidate.email || '',
            phone: candidate.phone || '',
            department: candidate.department || '',
            experience: candidate.experience_years || '',
            status: candidate.status || 'new',
            cvUrl: candidate.cv_url,
            createdAt: candidate.created_at,
        }));

        return NextResponse.json(candidates);
    } catch (error) {
        console.error('Candidates fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        if (!(await requireAdmin(request))) {
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

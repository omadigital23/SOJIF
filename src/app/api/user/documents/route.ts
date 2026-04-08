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
            .from('documents')
            .select('*')
            .eq('user_id', user?.id)
            .order('created_at', { ascending: false });

        if (error) throw error;

        const documents = (data || []).map((doc) => ({
            id: doc.id,
            name: doc.name || '',
            category: doc.type || 'Other',
            size: doc.file_size || 0,
            uploadedAt: doc.created_at,
            url: doc.file_url,
        }));

        return NextResponse.json(documents);
    } catch (error) {
        console.error('Documents fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

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

        const { data: userProfile, error } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('id', user?.id)
            .single();

        if (error) {
            return NextResponse.json(
                { firstName: '', lastName: '', email: user?.email || '', phone: '', company: '', position: '' },
                { status: 200 }
            );
        }

        return NextResponse.json({
            firstName: userProfile.first_name || '',
            lastName: userProfile.last_name || '',
            email: userProfile.email || '',
            phone: userProfile.phone || '',
            company: userProfile.company || '',
            position: userProfile.position || '',
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
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

        const body = await request.json();

        const { error } = await supabaseAdmin
            .from('users')
            .update({
                first_name: body.firstName,
                last_name: body.lastName,
                phone: body.phone,
                company: body.company,
                position: body.position,
                updated_at: new Date().toISOString(),
            })
            .eq('id', user.id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Profile update error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

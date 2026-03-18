import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';

const newsletterSchema = z.object({
    email: z.string().email(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = newsletterSchema.parse(body);

        const { error } = await supabaseAdmin
            .from('newsletter_subscribers')
            .upsert(
                {
                    email,
                    source: 'website',
                    is_active: true,
                    subscribed_at: new Date().toISOString(),
                },
                { onConflict: 'email' }
            );

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { success: false, message: 'Erreur lors de l\'inscription.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Inscription réussie.' },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }
        console.error('Newsletter API error:', error);
        return NextResponse.json(
            { success: false, message: 'Erreur interne.' },
            { status: 500 }
        );
    }
}

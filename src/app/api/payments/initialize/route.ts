import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';

const paymentSchema = z.object({
    packName: z.string(),
    amount: z.number().positive(),
    currency: z.literal('XOF'),
    customerEmail: z.string().email(),
    customerName: z.string().min(2),
    customerPhone: z.string().min(8),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = paymentSchema.parse(body);

        // Find user by email (if exists)
        const { data: userData } = await supabaseAdmin
            .from('users')
            .select('id')
            .eq('email', validated.customerEmail)
            .single();

        // Create pending payment record
        const { data: paymentData, error: paymentError } = await supabaseAdmin
            .from('payments')
            .insert({
                user_id: userData?.id || null,
                amount: validated.amount,
                currency: validated.currency,
                status: 'pending',
                provider: 'flutterwave',
                customer_email: validated.customerEmail,
                customer_name: validated.customerName,
                customer_phone: validated.customerPhone,
                description: `Abonnement ${validated.packName}`,
            })
            .select('id')
            .single();

        if (paymentError) {
            console.error('Payment record error:', paymentError);
            return NextResponse.json(
                { success: false, message: 'Erreur lors de l\'initialisation du paiement.' },
                { status: 500 }
            );
        }

        // TODO: Initialize Flutterwave payment when API keys are configured
        // For now, return a reference for manual processing
        const paymentRef = `SOJIF-${paymentData.id.slice(0, 8).toUpperCase()}`;

        return NextResponse.json(
            {
                success: true,
                paymentId: paymentData.id,
                paymentRef,
                message: 'Paiement initialisé. Notre équipe vous contactera pour finaliser.',
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }
        console.error('Payment API error:', error);
        return NextResponse.json(
            { success: false, message: 'Erreur d\'initialisation du paiement.' },
            { status: 500 }
        );
    }
}

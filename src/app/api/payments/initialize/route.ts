import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';
import { initializeFlutterwavePayment } from '@/lib/flutterwave';
import { rateLimiters, getClientIP } from '@/lib/rate-limit';
import { captureException, addBreadcrumb } from '@/lib/sentry';

const paymentSchema = z.object({
    packName: z.string().min(1),
    amount: z.number().positive(),
    currency: z.literal('XOF'),
    customerEmail: z.string().email(),
    customerName: z.string().min(2),
    customerPhone: z.string().min(8),
});

export async function POST(request: Request) {
    const clientIP = getClientIP(request);

    try {
        // Apply rate limiting
        const rateLimit = await rateLimiters.payment(clientIP);
        if (!rateLimit.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Trop de tentatives de paiement. Veuillez réessayer plus tard.',
                    retryAfter: rateLimit.resetTime,
                },
                { status: 429, headers: { 'Retry-After': rateLimit.resetTime.toString() } }
            );
        }

        const body = await request.json();
        const validated = paymentSchema.parse(body);

        addBreadcrumb('Payment initialization started', {
            email: validated.customerEmail,
            packName: validated.packName,
        });

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
            captureException(paymentError as Error, { source: 'payments/initialize' });
            return NextResponse.json(
                { success: false, message: 'Erreur lors de l\'initialisation du paiement.' },
                { status: 500 }
            );
        }

        // Initialize Flutterwave payment
        const flutterwaveResponse = await initializeFlutterwavePayment(
            validated.amount,
            validated.customerEmail,
            validated.customerName,
            validated.customerPhone,
            paymentData.id,
            `Abonnement ${validated.packName}`
        );

        // Update payment record with Flutterwave details
        const { error: updateError } = await supabaseAdmin
            .from('payments')
            .update({
                external_id: flutterwaveResponse.txRef,
                flutterwave_id: flutterwaveResponse.flutterwaveId,
            })
            .eq('id', paymentData.id);

        if (updateError) {
            console.warn('Payment update error:', updateError);
        }

        addBreadcrumb('Payment initialized successfully', {
            paymentId: paymentData.id,
            flutterwaveId: flutterwaveResponse.flutterwaveId,
        });

        return NextResponse.json(
            {
                success: true,
                paymentId: paymentData.id,
                checkoutUrl: flutterwaveResponse.checkoutUrl,
                txRef: flutterwaveResponse.txRef,
                message: 'Paiement initialisé avec succès. Veuillez compléter le paiement.',
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
        
        if (error instanceof Error) {
            captureException(error, {
                source: 'payments/initialize',
                ip: clientIP,
            });
        }
        
        console.error('Payment API error:', error);
        return NextResponse.json(
            { success: false, message: 'Erreur d\'initialisation du paiement.' },
            { status: 500 }
        );
    }
}

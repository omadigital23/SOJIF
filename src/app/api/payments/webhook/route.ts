import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { verifyFlutterwavePayment } from '@/lib/flutterwave';
import { captureException, addBreadcrumb } from '@/lib/sentry';

/**
 * Webhook handler for Flutterwave payment notifications
 * This is called by Flutterwave to confirm payment status
 */
export async function POST(request: Request) {
    try {
        const event = await request.json();

        // Verify webhook secret
        const signature = request.headers.get('verif-hash');
        const webhookSecret = process.env.FLUTTERWAVE_WEBHOOK_SECRET || '';

        if (signature !== webhookSecret) {
            console.warn('Invalid webhook signature');
            return NextResponse.json(
                { success: false, message: 'Invalid signature' },
                { status: 401 }
            );
        }

        addBreadcrumb('Flutterwave webhook received', {
            eventType: event.event,
            transactionId: event.data?.id,
        });

        // Handle payment completion
        if (event.event === 'charge.completed') {
            const { data } = event;

            // Verify the transaction with Flutterwave
            const verification = await verifyFlutterwavePayment(data.id);

            if (!verification.success) {
                console.warn('Payment verification failed:', verification);
                return NextResponse.json(
                    { success: false, message: 'Payment verification failed' },
                    { status: 400 }
                );
            }

            // Find payment record by transaction reference
            const { data: paymentRecord, error: paymentError } = await supabaseAdmin
                .from('payments')
                .select('id, user_id')
                .eq('external_id', data.tx_ref)
                .single();

            if (paymentError || !paymentRecord) {
                console.warn('Payment record not found:', paymentError);
                captureException(paymentError as Error, {
                    source: 'payments/webhook',
                    txRef: data.tx_ref,
                });
                return NextResponse.json(
                    { success: false, message: 'Payment record not found' },
                    { status: 404 }
                );
            }

            // Update payment status to completed
            const { error: updateError } = await supabaseAdmin
                .from('payments')
                .update({
                    status: 'completed',
                    completed_at: new Date().toISOString(),
                    flutterwave_response: verification.transactionData,
                })
                .eq('id', paymentRecord.id);

            if (updateError) {
                console.error('Payment update error:', updateError);
                captureException(updateError as Error, {
                    source: 'payments/webhook/update',
                    paymentId: paymentRecord.id,
                });
                return NextResponse.json(
                    { success: false, message: 'Could not update payment' },
                    { status: 500 }
                );
            }

            // If user exists, update their subscription
            if (paymentRecord.user_id) {
                const { error: subscriptionError } = await supabaseAdmin
                    .from('users')
                    .update({
                        subscription_status: 'active',
                        last_payment_date: new Date().toISOString(),
                    })
                    .eq('id', paymentRecord.user_id);

                if (subscriptionError) {
                    console.warn('Subscription update error:', subscriptionError);
                } else {
                    addBreadcrumb('User subscription activated', {
                        userId: paymentRecord.user_id,
                    });
                }
            }

            addBreadcrumb('Payment completed successfully', {
                paymentId: paymentRecord.id,
                amount: verification.amount,
                currency: verification.currency,
            });

            return NextResponse.json(
                { success: true, message: 'Payment processed successfully' },
                { status: 200 }
            );
        }

        // Log other events for monitoring
        console.log('Flutterwave event:', event.event);
        return NextResponse.json(
            { success: true, message: 'Event processed' },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
            captureException(error, {
                source: 'payments/webhook',
            });
        }

        console.error('Webhook processing error:', error);
        return NextResponse.json(
            { success: false, message: 'Webhook processing failed' },
            { status: 500 }
        );
    }
}

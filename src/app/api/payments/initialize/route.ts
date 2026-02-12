import { NextResponse } from 'next/server';
import { z } from 'zod';

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

        // TODO: Initialize Flutterwave payment
        // TODO: Create pending payment record in Supabase
        // TODO: Return Flutterwave checkout URL

        const mockPaymentLink = `https://checkout.flutterwave.com/pay/mock-${Date.now()}`;

        return NextResponse.json(
            { success: true, paymentLink: mockPaymentLink },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, message: 'Erreur d\'initialisation du paiement.' },
            { status: 500 }
        );
    }
}

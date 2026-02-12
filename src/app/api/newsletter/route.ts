import { NextResponse } from 'next/server';
import { z } from 'zod';

const newsletterSchema = z.object({
    email: z.string().email(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = newsletterSchema.parse(body);

        // TODO: Rate limiting with Upstash
        // TODO: Store in Supabase newsletter_subscribers table
        // TODO: Send welcome email via Resend

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
        return NextResponse.json(
            { success: false, message: 'Erreur interne.' },
            { status: 500 }
        );
    }
}

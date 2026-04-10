import { NextResponse } from 'next/server';

export async function GET() {
    const diagnostics = {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        configured: {
            supabase: {
                url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
                anonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                serviceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
            },
            resend: {
                apiKey: !!process.env.RESEND_API_KEY,
            },
            brevo: {
                smtpUser: !!process.env.BREVO_SMTP_USER,
                smtpPass: !!process.env.BREVO_SMTP_PASS,
            },
            upstash: {
                url: !!process.env.UPSTASH_REDIS_REST_URL,
                token: !!process.env.UPSTASH_REDIS_REST_TOKEN,
            },
            flutterwave: {
                publicKey: !!process.env.FLUTTERWAVE_PUBLIC_KEY,
                secretKey: !!process.env.FLUTTERWAVE_SECRET_KEY,
            },
            sentry: {
                dsn: !!process.env.SENTRY_DSN,
            },
        },
    };

    return NextResponse.json(diagnostics);
}

import { NextResponse } from 'next/server';
import { z } from 'zod';

const projectSchema = z.object({
    companyName: z.string().min(2),
    contactName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    projectType: z.enum(['website', 'ecommerce', 'webapp', 'mobile', 'crm', 'branding']),
    description: z.string().min(20).max(3000),
    budget: z.string().optional(),
    timeline: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = projectSchema.parse(body);

        // TODO: Store in Supabase project_requests table
        // TODO: Send notification email via Resend
        // TODO: Rate limiting with Upstash

        return NextResponse.json(
            { success: true, message: 'Demande de projet enregistrée.' },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ success: false, message: 'Erreur interne.' }, { status: 500 });
    }
}

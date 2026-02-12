import { NextResponse } from 'next/server';
import { z } from 'zod';

const recruitmentSchema = z.object({
    companyName: z.string().min(2),
    contactName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    positionTitle: z.string().min(3),
    department: z.string(),
    description: z.string().min(20).max(3000),
    requirements: z.string().optional(),
    salary: z.string().optional(),
    location: z.string().optional(),
    urgency: z.enum(['low', 'medium', 'high']).optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = recruitmentSchema.parse(body);

        // TODO: Store in Supabase recruitment_requests table
        // TODO: Send notification to SOJIF team via Resend

        return NextResponse.json(
            { success: true, message: 'Demande de recrutement enregistrée.' },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ success: false, message: 'Erreur interne.' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';

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

        const { error } = await supabaseAdmin
            .from('project_requests')
            .insert({
                company_name: validated.companyName,
                contact_name: validated.contactName,
                email: validated.email,
                phone: validated.phone,
                project_type: validated.projectType,
                description: validated.description,
                budget: validated.budget || null,
                timeline: validated.timeline || null,
                status: 'new',
            });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { success: false, message: 'Erreur lors de l\'enregistrement.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Demande de projet enregistrée.' },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
        }
        console.error('Project request API error:', error);
        return NextResponse.json({ success: false, message: 'Erreur interne.' }, { status: 500 });
    }
}

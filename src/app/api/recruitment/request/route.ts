import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';
import { sendRecruitmentNotificationToAdmin } from '@/lib/email';

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
    contractType: z.enum(['cdi', 'cdd', 'interim', 'freelance', 'stage']).optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = recruitmentSchema.parse(body);

        const { error } = await supabaseAdmin
            .from('recruitment_requests')
            .insert({
                company_name: validated.companyName,
                contact_name: validated.contactName,
                email: validated.email,
                phone: validated.phone,
                position_title: validated.positionTitle,
                department: validated.department || null,
                description: validated.description,
                requirements: validated.requirements || null,
                salary: validated.salary || null,
                location: validated.location || null,
                urgency: validated.urgency || 'medium',
                contract_type: validated.contractType || null,
                status: 'new',
            });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { success: false, message: 'Erreur lors de l\'enregistrement.' },
                { status: 500 }
            );
        }

        // Send notification email to admin
        try {
            const adminNotification = await sendRecruitmentNotificationToAdmin({
                companyName: validated.companyName,
                contactName: validated.contactName,
                email: validated.email,
                phone: validated.phone,
                positionTitle: validated.positionTitle,
                department: validated.department || null,
                description: validated.description,
                requirements: validated.requirements || null,
                salary: validated.salary || null,
                location: validated.location || null,
                urgency: validated.urgency || null,
                contractType: validated.contractType || null,
            });
            console.info('Admin recruitment notification email sent', {
                emailId: adminNotification.messageId,
                to: 'contact@sojifconsulting.com',
                replyTo: validated.email,
            });
        } catch (emailError) {
            console.warn('Failed to send admin recruitment notification email:', {
                error: emailError,
                to: 'contact@sojifconsulting.com',
                replyTo: validated.email,
            });
            // Don't fail the request, continue normally
        }

        return NextResponse.json(
            { success: true, message: 'Demande de recrutement enregistrée.' },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, message: 'Données invalides.' }, { status: 400 });
        }
        console.error('Recruitment request API error:', error);
        return NextResponse.json({ success: false, message: 'Erreur interne.' }, { status: 500 });
    }
}

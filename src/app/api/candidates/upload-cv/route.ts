import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { ADMIN_EMAIL, FROM_EMAIL, FROM_NAME } from '@/lib/email';
import { env } from '@/lib/env';

const CV_BUCKET = 'sojifcv';

async function sendCvNotification({
    candidateName,
    candidateEmail,
    cvUrl,
    fileName,
}: {
    candidateName: string;
    candidateEmail: string;
    cvUrl: string;
    fileName: string;
}) {
    const apiKey = env.BREVO_API_KEY;
    if (!apiKey) return;

    await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'api-key': apiKey,
        },
        body: JSON.stringify({
            sender: { name: FROM_NAME, email: FROM_EMAIL },
            to: [{ email: ADMIN_EMAIL }],
            replyTo: { email: candidateEmail },
            subject: `[CANDIDATURE] CV reçu — ${candidateName}`,
            htmlContent: `
<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
body{font-family:'Segoe UI',sans-serif;line-height:1.6;color:#333}
.container{max-width:650px;margin:0 auto;padding:20px;background:#f9fafb}
.email-content{background:white;padding:40px;border-radius:12px}
h1{color:#1f2937;margin-bottom:4px;font-size:22px}
.subtitle{color:#6b7280;font-size:13px;margin-bottom:24px}
table{width:100%;border-collapse:collapse;margin:16px 0}
td{padding:10px 14px;border-bottom:1px solid #f3f4f6;font-size:14px}
td:first-child{font-weight:600;color:#374151;width:160px;background:#f9fafb}
.btn{display:inline-block;padding:12px 28px;background:#2563eb;color:white;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;margin-top:16px}
.badge{display:inline-block;padding:4px 14px;background:#fef3c7;color:#92400e;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:20px}
.footer{text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #e5e7eb;color:#9ca3af;font-size:11px}
</style>
</head><body>
<div class="container"><div class="email-content">
<h1>📄 Nouveau CV reçu</h1>
<p class="subtitle">Reçu via le formulaire de candidature SOJIF Consulting</p>
<span class="badge">Formulaire candidat</span>
<table>
<tr><td>Candidat</td><td><strong>${candidateName}</strong></td></tr>
<tr><td>Email</td><td><a href="mailto:${candidateEmail}" style="color:#2563eb">${candidateEmail}</a></td></tr>
<tr><td>Fichier</td><td>${fileName}</td></tr>
</table>
<a href="${cvUrl}" class="btn">📥 Télécharger le CV</a>
<div class="footer">
<p>Répondez directement à cet email pour contacter le candidat.</p>
<p>© ${new Date().getFullYear()} SOJIF Consulting — Notification automatique</p>
</div>
</div></div></body></html>`,
        }),
    });
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('cv') as File | null;
        const candidateId = formData.get('candidateId') as string | null;
        const candidateName = formData.get('candidateName') as string | null;
        const candidateEmail = formData.get('candidateEmail') as string | null;

        if (!file) {
            return NextResponse.json({ success: false, message: 'Aucun fichier fourni.' }, { status: 400 });
        }

        // Validate file type (PDF only)
        if (file.type !== 'application/pdf') {
            return NextResponse.json(
                { success: false, message: 'Seuls les fichiers PDF sont acceptés.' },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { success: false, message: 'Le fichier ne doit pas dépasser 5 Mo.' },
                { status: 400 }
            );
        }

        // Generate unique file path
        const timestamp = Date.now();
        const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const filePath = `cvs/${candidateId || 'anonymous'}/${timestamp}-${cleanName}`;

        // Upload to Supabase Storage
        const arrayBuffer = await file.arrayBuffer();
        const fileBuffer = new Uint8Array(arrayBuffer);

        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
            .from(CV_BUCKET)
            .upload(filePath, fileBuffer, {
                contentType: 'application/pdf',
                upsert: false,
            });

        if (uploadError) {
            console.error('Storage upload error:', { bucket: CV_BUCKET, filePath, error: uploadError });
            return NextResponse.json(
                { success: false, message: "Erreur lors de l'upload du fichier." },
                { status: 500 }
            );
        }

        // Get public URL
        const { data: urlData } = supabaseAdmin.storage
            .from(CV_BUCKET)
            .getPublicUrl(uploadData.path);

        // Insert document record if candidateId provided
        if (candidateId) {
            const { error: docError } = await supabaseAdmin
                .from('candidate_documents')
                .insert({
                    candidate_id: candidateId,
                    type: 'cv',
                    file_url: urlData.publicUrl,
                    file_name: file.name,
                    file_size: file.size,
                    mime_type: 'application/pdf',
                });
            if (docError) console.error('Document record error:', docError);
        }

        // Send email notification to admin with CV link
        if (candidateName && candidateEmail) {
            try {
                await sendCvNotification({
                    candidateName,
                    candidateEmail,
                    cvUrl: urlData.publicUrl,
                    fileName: file.name,
                });
                console.info('CV notification email sent to admin');
            } catch (emailError) {
                console.warn('CV notification email failed:', emailError);
            }
        }

        return NextResponse.json(
            { success: true, message: 'CV uploadé avec succès.', fileUrl: urlData.publicUrl },
            { status: 200 }
        );
    } catch (error) {
        console.error('Upload CV API error:', error);
        return NextResponse.json({ success: false, message: "Erreur lors de l'upload." }, { status: 500 });
    }
}

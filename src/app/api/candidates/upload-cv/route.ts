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
    candidatePhone,
    candidateDomain,
    candidateExperience,
    candidateMessage,
}: {
    candidateName: string;
    candidateEmail: string;
    cvUrl: string;
    fileName: string;
    candidatePhone?: string | null;
    candidateDomain?: string | null;
    candidateExperience?: string | null;
    candidateMessage?: string | null;
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
            htmlContent: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#f1f5f9;color:#1e293b}
.wrapper{max-width:680px;margin:32px auto;padding:0 16px}
.header{background:linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%);border-radius:12px 12px 0 0;padding:32px 40px;text-align:center}
.header h1{color:white;font-size:22px;font-weight:700;letter-spacing:.3px}
.header p{color:rgba(255,255,255,.75);font-size:13px;margin-top:6px}
.badge{display:inline-block;background:rgba(255,255,255,.15);color:white;border:1px solid rgba(255,255,255,.3);border-radius:20px;padding:4px 14px;font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;margin-top:12px}
.body{background:white;padding:36px 40px}
.meta{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:6px 16px;margin-bottom:28px;font-size:12px;color:#64748b;text-align:right}
.section-title{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.8px;margin:28px 0 12px;padding-bottom:6px;border-bottom:1px solid #f1f5f9}
.section-title:first-of-type{margin-top:0}
table{width:100%;border-collapse:collapse}
tr:last-child td{border-bottom:none}
td{padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:14px;vertical-align:top}
td.label{font-weight:600;color:#475569;width:170px;background:#f8fafc;border-radius:4px}
td.value{color:#1e293b}
.motivation{background:#f8fafc;border-left:3px solid #2563eb;border-radius:0 8px 8px 0;padding:16px 20px;font-size:14px;line-height:1.7;color:#334155;white-space:pre-wrap}
.cv-btn{display:block;text-align:center;margin:28px 0 0}
.cv-btn a{display:inline-block;background:#2563eb;color:white;text-decoration:none;padding:13px 32px;border-radius:8px;font-weight:600;font-size:14px;letter-spacing:.3px}
.footer{background:#f8fafc;border-top:1px solid #e2e8f0;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center}
.footer p{font-size:11px;color:#94a3b8;line-height:1.6}
.footer strong{color:#64748b}
</style>
</head><body>
<div class="wrapper">

  <div class="header">
    <h1>📄 Nouvelle Candidature</h1>
    <p>Formulaire de candidature — SOJIF Consulting</p>
    <span class="badge">CV reçu</span>
  </div>

  <div class="body">
    <div class="meta">Reçu le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>

    <p class="section-title">Informations du candidat</p>
    <table>
      <tr><td class="label">Nom complet</td><td class="value"><strong>${candidateName}</strong></td></tr>
      <tr><td class="label">Email</td><td class="value"><a href="mailto:${candidateEmail}" style="color:#2563eb;text-decoration:none">${candidateEmail}</a></td></tr>
      ${candidatePhone ? `<tr><td class="label">Téléphone</td><td class="value">${candidatePhone}</td></tr>` : ''}
      ${candidateDomain ? `<tr><td class="label">Domaine d'expertise</td><td class="value">${candidateDomain}</td></tr>` : ''}
      ${candidateExperience ? `<tr><td class="label">Années d'expérience</td><td class="value">${candidateExperience}</td></tr>` : ''}
      <tr><td class="label">Fichier CV</td><td class="value">${fileName}</td></tr>
    </table>

    ${candidateMessage ? `
    <p class="section-title">Lettre de motivation</p>
    <div class="motivation">${candidateMessage.replace(/\n/g, '<br/>')}</div>` : ''}

    <div class="cv-btn">
      <a href="${cvUrl}">📥 Télécharger le CV</a>
    </div>
  </div>

  <div class="footer">
    <p>Vous pouvez répondre directement à cet email pour contacter <strong>${candidateName}</strong>.<br>
    © ${new Date().getFullYear()} SOJIF Consulting — Notification automatique</p>
  </div>

</div>
</body></html>`,
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
        const candidatePhone = formData.get('candidatePhone') as string | null;
        const candidateDomain = formData.get('candidateDomain') as string | null;
        const candidateExperience = formData.get('candidateExperience') as string | null;
        const candidateMessage = formData.get('candidateMessage') as string | null;

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
                    candidatePhone: candidatePhone || null,
                    candidateDomain: candidateDomain || null,
                    candidateExperience: candidateExperience || null,
                    candidateMessage: candidateMessage || null,
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

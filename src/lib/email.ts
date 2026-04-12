import nodemailer from 'nodemailer';
import { env } from './env';

export const FROM_EMAIL = env.BREVO_FROM_EMAIL || 'support@sojifconsulting.com';
export const FROM_NAME = env.BREVO_FROM_NAME || 'SOJIF Consulting';
export const SUPPORT_EMAIL = 'support@sojifconsulting.com';
export const ADMIN_EMAIL = 'contact@sojifconsulting.com';

function getTransporter() {
    const user = env.BREVO_SMTP_USER;
    const pass = env.BREVO_SMTP_PASS;
    if (!user || !pass) {
        throw new Error('BREVO_SMTP_USER or BREVO_SMTP_PASS is not configured.');
    }
    return nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false,
        auth: { user, pass },
    });
}

async function sendEmail(options: {
    to: string | string[];
    subject: string;
    html: string;
    replyTo?: string;
}) {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
        from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        replyTo: options.replyTo,
    });
    return info;
}

export async function sendSignupConfirmation(email: string, name: string, magicLink: string) {
    try {
        return await sendEmail({
            to: email,
            subject: 'Bienvenue chez SOJIF Consulting - Confirmez votre email',
            html: `
<!DOCTYPE html><html><head><meta charset="utf-8">
<style>body{font-family:'Segoe UI',sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px;background:#f9fafb}.email-content{background:white;padding:40px;border-radius:12px}h1{color:#1f2937;margin-bottom:20px}.cta-button{display:inline-block;padding:12px 32px;background:#3b82f6;color:white;text-decoration:none;border-radius:6px;margin:20px 0;font-weight:600}.footer{text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px}.link-text{word-break:break-all;color:#3b82f6;font-size:12px}</style>
</head><body>
<div class="container"><div class="email-content">
<h1>Bienvenue, ${name}! 👋</h1>
<p>Merci de vous intéresser à SOJIF Consulting. Pour finaliser votre inscription, veuillez confirmer votre adresse email.</p>
<a href="${magicLink}" class="cta-button">Confirmer mon email</a>
<p>Ou copiez ce lien dans votre navigateur :</p>
<p class="link-text">${magicLink}</p>
<p>Ce lien expire dans 24 heures.</p>
<div class="footer"><p>© 2025 SOJIF Consulting. Tous droits réservés.</p></div>
</div></div></body></html>`,
        });
    } catch (error) {
        console.error('Signup confirmation email error:', error);
        throw error;
    }
}

export async function sendPasswordReset(email: string, name: string, resetLink: string) {
    try {
        return await sendEmail({
            to: email,
            subject: 'SOJIF Consulting - Réinitialisation de votre mot de passe',
            html: `
<!DOCTYPE html><html><head><meta charset="utf-8">
<style>body{font-family:'Segoe UI',sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px;background:#f9fafb}.email-content{background:white;padding:40px;border-radius:12px}h1{color:#1f2937;margin-bottom:20px}.cta-button{display:inline-block;padding:12px 32px;background:#3b82f6;color:white;text-decoration:none;border-radius:6px;margin:20px 0;font-weight:600}.footer{text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px}.alert{background:#fef2f2;border-left:4px solid #ef4444;padding:15px;margin:20px 0;border-radius:4px}</style>
</head><body>
<div class="container"><div class="email-content">
<h1>Réinitialisation de votre mot de passe</h1>
<p>Bonjour ${name},</p>
<p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte SOJIF Consulting.</p>
<a href="${resetLink}" class="cta-button">Réinitialiser mon mot de passe</a>
<div class="alert"><strong>Attention :</strong> Ce lien n'est valide que pendant 1 heure. Si vous ne l'avez pas demandé, ignorez cet email.</div>
<p style="word-break:break-all;color:#3b82f6;font-size:12px">${resetLink}</p>
<div class="footer"><p>© 2025 SOJIF Consulting. Tous droits réservés.</p></div>
</div></div></body></html>`,
        });
    } catch (error) {
        console.error('Password reset email error:', error);
        throw error;
    }
}

/**
 * Confirmation newsletter — unsubscribeUrl est optionnel.
 * Si non fourni, affiche un lien de contact à la place.
 */
export async function sendNewsletterConfirmation(email: string, unsubscribeUrl?: string) {
    const unsubscribeLink = unsubscribeUrl
        ? `<p style="margin-top:12px"><a href="${unsubscribeUrl}" style="color:#6b7280;font-size:12px">Se désabonner</a></p>`
        : `<p style="margin-top:12px;font-size:12px;color:#6b7280">Pour vous désabonner, contactez <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></p>`;

    try {
        return await sendEmail({
            to: email,
            subject: 'SOJIF Consulting - Inscription à la newsletter confirmée',
            html: `
<!DOCTYPE html><html><head><meta charset="utf-8">
<style>body{font-family:'Segoe UI',sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px;background:#f9fafb}.email-content{background:white;padding:40px;border-radius:12px}h1{color:#1f2937;margin-bottom:20px}.footer{text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px}ul{margin:15px 0}li{margin:8px 0}</style>
</head><body>
<div class="container"><div class="email-content">
<h1>Bienvenue dans notre newsletter ! 📬</h1>
<p>Merci de vous être inscrit à la newsletter SOJIF Consulting.</p>
<p>Vous allez désormais recevoir :</p>
<ul>
<li>✓ Les dernières actualités de nos services de digitalisation</li>
<li>✓ Des conseils en gestion de ressources humaines</li>
<li>✓ Les offres spéciales et partenariats exclusifs</li>
<li>✓ Les nouvelles tournées de recrutement</li>
</ul>
<p>À très bientôt !</p>
<div class="footer"><p>© 2025 SOJIF Consulting. Tous droits réservés.</p>${unsubscribeLink}</div>
</div></div></body></html>`,
        });
    } catch (error) {
        console.error('Newsletter confirmation email error:', error);
        throw error;
    }
}

export async function sendContactConfirmation(email: string, name: string, subject: string) {
    try {
        return await sendEmail({
            to: email,
            subject: 'SOJIF Consulting - Message reçu',
            html: `
<!DOCTYPE html><html><head><meta charset="utf-8">
<style>body{font-family:'Segoe UI',sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px;background:#f9fafb}.email-content{background:white;padding:40px;border-radius:12px}h1{color:#1f2937;margin-bottom:20px}.footer{text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px}</style>
</head><body>
<div class="container"><div class="email-content">
<h1>Merci, ${name}!</h1>
<p>Nous avons bien reçu votre message concernant : <strong>${subject}</strong></p>
<p>Notre équipe vous répondra dans les plus brefs délais (généralement sous 24 heures).</p>
<p>Cordialement,<br/>L'équipe SOJIF Consulting</p>
<div class="footer"><p>© 2025 SOJIF Consulting. Tous droits réservés.</p></div>
</div></div></body></html>`,
        });
    } catch (error) {
        console.error('Contact confirmation email error:', error);
        throw error;
    }
}

export async function sendRecruitmentConfirmation(email: string, name: string, position: string) {
    try {
        return await sendEmail({
            to: email,
            subject: 'SOJIF Consulting - Candidature reçue',
            html: `
<!DOCTYPE html><html><head><meta charset="utf-8">
<style>body{font-family:'Segoe UI',sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px;background:#f9fafb}.email-content{background:white;padding:40px;border-radius:12px}h1{color:#1f2937;margin-bottom:20px}.footer{text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px}</style>
</head><body>
<div class="container"><div class="email-content">
<h1>Merci pour votre candidature! 🙏</h1>
<p>Bonjour ${name},</p>
<p>Nous avons bien reçu votre candidature pour le poste de <strong>${position}</strong>.</p>
<p>Notre équipe RH examinera attentivement votre profil et vous contactera si votre expérience correspond à nos besoins.</p>
<p>Nous vous remercions de votre intérêt pour SOJIF Consulting.</p>
<p>Cordialement,<br/>L'équipe Recrutement SOJIF Consulting</p>
<div class="footer"><p>© 2025 SOJIF Consulting. Tous droits réservés.</p></div>
</div></div></body></html>`,
        });
    } catch (error) {
        console.error('Recruitment confirmation email error:', error);
        throw error;
    }
}

// ─── Admin notification emails ───────────────────────────────────────────────

interface ContactNotificationData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string | null;
    subject: string;
    message: string;
    domain?: string | null;
    turnover?: string | null;
    employees?: string | null;
    challenge?: string | null;
    phase?: string | null;
    budget?: string | null;
    meetingPref?: string | null;
}

/**
 * Envoie un email complet à l'admin (contact@sojifconsulting.com)
 * avec toutes les informations soumises via le formulaire de contact.
 */
export async function sendContactNotificationToAdmin(data: ContactNotificationData) {
    const challengeLabels: Record<string, string> = {
        tax: 'Fiscalité / Comptabilité',
        accounting: 'Comptabilité',
        hr: 'Ressources Humaines',
        other: 'Autre',
    };
    const phaseLabels: Record<string, string> = {
        creation: 'Création',
        growth: 'Croissance',
        restructuring: 'Restructuration',
    };
    const meetingLabels: Record<string, string> = {
        video: 'Visioconférence',
        inPerson: 'En présentiel',
    };

    const optionalRows = [
        data.company ? `<tr><td>Entreprise</td><td>${data.company}</td></tr>` : '',
        data.domain ? `<tr><td>Domaine d'activité</td><td>${data.domain}</td></tr>` : '',
        data.turnover ? `<tr><td>Chiffre d'affaires</td><td>${data.turnover}</td></tr>` : '',
        data.employees ? `<tr><td>Nombre de salariés</td><td>${data.employees}</td></tr>` : '',
        data.phase ? `<tr><td>Phase de l'entreprise</td><td>${phaseLabels[data.phase] || data.phase}</td></tr>` : '',
        data.budget ? `<tr><td>Budget</td><td>${data.budget}</td></tr>` : '',
        data.challenge ? `<tr><td>Challenge principal</td><td>${challengeLabels[data.challenge] || data.challenge}</td></tr>` : '',
        data.meetingPref ? `<tr><td>Préférence de RDV</td><td>${meetingLabels[data.meetingPref] || data.meetingPref}</td></tr>` : '',
    ].filter(Boolean).join('\n');

    try {
        return await sendEmail({
            to: ADMIN_EMAIL,
            replyTo: data.email,
            subject: `[CONTACT] ${data.firstName} ${data.lastName} — ${data.subject}`,
            html: `
<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
body{font-family:'Segoe UI',sans-serif;line-height:1.6;color:#333}
.container{max-width:650px;margin:0 auto;padding:20px;background:#f9fafb}
.email-content{background:white;padding:40px;border-radius:12px}
h1{color:#1f2937;margin-bottom:4px;font-size:22px}
.subtitle{color:#6b7280;font-size:13px;margin-bottom:24px}
table{width:100%;border-collapse:collapse;margin:16px 0}
td{padding:10px 14px;border-bottom:1px solid #f3f4f6;font-size:14px}
td:first-child{font-weight:600;color:#374151;width:180px;background:#f9fafb}
.message-box{background:#f3f4f6;padding:16px;border-radius:8px;margin-top:8px;white-space:pre-wrap;font-size:14px;line-height:1.6}
.section-title{font-size:13px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;margin:24px 0 8px}
.footer{text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #e5e7eb;color:#9ca3af;font-size:11px}
.badge{display:inline-block;padding:4px 14px;background:#dbeafe;color:#1e40af;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:20px}
</style>
</head><body>
<div class="container"><div class="email-content">
<h1>📩 Nouveau message de contact</h1>
<p class="subtitle">Reçu via le formulaire du site SOJIF Consulting</p>
<span class="badge">Formulaire de contact</span>

<p class="section-title">Coordonnées</p>
<table>
<tr><td>Nom complet</td><td>${data.firstName} ${data.lastName}</td></tr>
<tr><td>Email</td><td><a href="mailto:${data.email}" style="color:#2563eb">${data.email}</a></td></tr>
<tr><td>Téléphone</td><td>${data.phone}</td></tr>
<tr><td>Sujet</td><td><strong>${data.subject}</strong></td></tr>
</table>

${optionalRows ? `<p class="section-title">Informations Entreprise</p><table>${optionalRows}</table>` : ''}

<p class="section-title">Message</p>
<div class="message-box">${data.message.replace(/\n/g, '<br/>')}</div>

<div class="footer">
<p>Vous pouvez répondre directement à cet email pour contacter <strong>${data.firstName} ${data.lastName}</strong> (${data.email}).</p>
<p>© ${new Date().getFullYear()} SOJIF Consulting — Notification automatique</p>
</div>
</div></div></body></html>`,
        });
    } catch (error) {
        console.error('Admin contact notification email error:', error);
        throw error;
    }
}

interface RecruitmentNotificationData {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    positionTitle: string;
    department?: string | null;
    description: string;
    requirements?: string | null;
    salary?: string | null;
    location?: string | null;
    urgency?: string | null;
    contractType?: string | null;
}

/**
 * Envoie une notification à l'admin (contact@sojifconsulting.com)
 * quand une demande de recrutement est soumise.
 */
export async function sendRecruitmentNotificationToAdmin(data: RecruitmentNotificationData) {
    const urgencyLabels: Record<string, string> = {
        low: '🟢 Faible',
        medium: '🟡 Moyenne',
        high: '🔴 Urgente',
    };
    const contractLabels: Record<string, string> = {
        cdi: 'CDI',
        cdd: 'CDD',
        interim: 'Intérim',
        freelance: 'Freelance',
        stage: 'Stage',
    };

    try {
        return await sendEmail({
            to: ADMIN_EMAIL,
            replyTo: data.email,
            subject: `[RECRUTEMENT] Nouvelle demande de ${data.companyName} — ${data.positionTitle}`,
            html: `
<!DOCTYPE html><html><head><meta charset="utf-8">
<style>body{font-family:'Segoe UI',sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px;background:#f9fafb}.email-content{background:white;padding:40px;border-radius:12px}h1{color:#1f2937;margin-bottom:20px}table{width:100%;border-collapse:collapse;margin:20px 0}td{padding:8px 12px;border-bottom:1px solid #e5e7eb}td:first-child{font-weight:600;color:#374151;width:160px}.message-box{background:#f3f4f6;padding:16px;border-radius:8px;margin-top:16px;white-space:pre-wrap}.footer{text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px}.badge{display:inline-block;padding:4px 12px;background:#fef3c7;color:#92400e;border-radius:20px;font-size:12px;font-weight:600}</style>
</head><body>
<div class="container"><div class="email-content">
<h1>📋 Nouvelle demande de recrutement</h1>
<span class="badge">Formulaire de recrutement</span>
<table>
<tr><td>Entreprise</td><td>${data.companyName}</td></tr>
<tr><td>Contact</td><td>${data.contactName}</td></tr>
<tr><td>Email</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
<tr><td>Téléphone</td><td>${data.phone}</td></tr>
<tr><td>Poste recherché</td><td><strong>${data.positionTitle}</strong></td></tr>
${data.department ? `<tr><td>Département</td><td>${data.department}</td></tr>` : ''}
${data.contractType ? `<tr><td>Type de contrat</td><td>${contractLabels[data.contractType] || data.contractType}</td></tr>` : ''}
${data.urgency ? `<tr><td>Urgence</td><td>${urgencyLabels[data.urgency] || data.urgency}</td></tr>` : ''}
${data.salary ? `<tr><td>Salaire</td><td>${data.salary}</td></tr>` : ''}
${data.location ? `<tr><td>Localisation</td><td>${data.location}</td></tr>` : ''}
</table>
<h3>Description du poste :</h3>
<div class="message-box">${data.description.replace(/\n/g, '<br/>')}</div>
${data.requirements ? `<h3>Exigences :</h3><div class="message-box">${data.requirements.replace(/\n/g, '<br/>')}</div>` : ''}
<div class="footer"><p>Email envoyé automatiquement depuis le site SOJIF Consulting.</p></div>
</div></div></body></html>`,
        });
    } catch (error) {
        console.error('Admin recruitment notification email error:', error);
        throw error;
    }
}

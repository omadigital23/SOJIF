import { Resend } from 'resend';

export const FROM_EMAIL = 'noreply@sojif-consulting.com';
export const SUPPORT_EMAIL = 'support@sojif-consulting.com';

function getResendClient() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        throw new Error('RESEND_API_KEY environment variable is not set');
    }
    return new Resend(apiKey);
}

/**
 * Send a signup confirmation email
 */
export async function sendSignupConfirmation(email: string, name: string, magicLink: string) {
    try {
        const result = await getResendClient().emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: 'Bienvenue chez SOJIF Consulting - Confirmez votre email',
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
        .email-content { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #1f2937; margin-bottom: 20px; }
        .cta-button { display: inline-block; padding: 12px 32px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
        .cta-button:hover { background: #2563eb; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
        .link-text { word-break: break-all; color: #3b82f6; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="email-content">
            <h1>Bienvenue, ${name}! 👋</h1>
            <p>Merci de vous intéresser à SOJIF Consulting. Pour finaliser votre inscription, veuillez confirmer votre adresse email.</p>
            <a href="${magicLink}" class="cta-button">Confirmer mon email</a>
            <p>Ou copiez ce lien dans votre navigateur :</p>
            <p class="link-text">${magicLink}</p>
            <p>Ce lien expire dans 24 heures.</p>
            <div class="footer">
                <p>© 2026 SOJIF Consulting. Tous droits réservés.</p>
                <p>Ne pas répondre à cet email. Pour nous contacter, visitez notre site web.</p>
            </div>
        </div>
    </div>
</body>
</html>
            `,
        });

        return result;
    } catch (error) {
        console.error('Signup confirmation email error:', error);
        throw error;
    }
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(email: string, name: string, resetLink: string) {
    try {
        const result = await getResendClient().emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: 'SOJIF Consulting - Réinitialisation de votre mot de passe',
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
        .email-content { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #1f2937; margin-bottom: 20px; }
        .cta-button { display: inline-block; padding: 12px 32px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
        .cta-button:hover { background: #2563eb; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
        .alert { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="email-content">
            <h1>Réinitialisation de votre mot de passe</h1>
            <p>Bonjour ${name},</p>
            <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte SOJIF Consulting.</p>
            <a href="${resetLink}" class="cta-button">Réinitialiser mon mot de passe</a>
            <div class="alert">
                <strong>Attention :</strong> Ce lien n'est valide que pendant 1 heure. Si vous ne l'avez pas demandé, ignorez cet email.
            </div>
            <p>Ou copiez ce lien dans votre navigateur :</p>
            <p style="word-break: break-all; color: #3b82f6; font-size: 12px;">${resetLink}</p>
            <div class="footer">
                <p>© 2026 SOJIF Consulting. Tous droits réservés.</p>
                <p>Ne pas répondre à cet email. Pour nous contacter, visitez notre site web.</p>
            </div>
        </div>
    </div>
</body>
</html>
            `,
        });

        return result;
    } catch (error) {
        console.error('Password reset email error:', error);
        throw error;
    }
}

/**
 * Send newsletter subscription confirmation
 */
export async function sendNewsletterConfirmation(email: string) {
    try {
        const result = await getResendClient().emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: 'SOJIF Consulting - Inscription à la newsletter confirmée',
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
        .email-content { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #1f2937; margin-bottom: 20px; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
        ul { margin: 15px 0; }
        li { margin: 8px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="email-content">
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
            <div class="footer">
                <p>© 2026 SOJIF Consulting. Tous droits réservés.</p>
                <p><a href="[UNSUBSCRIBE_LINK]">Se désabonner de cette liste</a></p>
            </div>
        </div>
    </div>
</body>
</html>
            `,
        });

        return result;
    } catch (error) {
        console.error('Newsletter confirmation email error:', error);
        throw error;
    }
}

/**
 * Send contact form confirmation
 */
export async function sendContactConfirmation(
    email: string,
    name: string,
    subject: string
) {
    try {
        const result = await getResendClient().emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: 'SOJIF Consulting - Message reçu',
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
        .email-content { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #1f2937; margin-bottom: 20px; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="email-content">
            <h1>Merci, ${name}!</h1>
            <p>Nous avons bien reçu votre message concernant : <strong>${subject}</strong></p>
            <p>Notre équipe vous répondra dans les plus brefs délais (généralement sous 24 heures).</p>
            <p>Cordialement,<br/>L'équipe SOJIF Consulting</p>
            <div class="footer">
                <p>© 2026 SOJIF Consulting. Tous droits réservés.</p>
            </div>
        </div>
    </div>
</body>
</html>
            `,
        });

        return result;
    } catch (error) {
        console.error('Contact confirmation email error:', error);
        throw error;
    }
}

/**
 * Send recruitment confirmation email
 */
export async function sendRecruitmentConfirmation(email: string, name: string, position: string) {
    try {
        const result = await getResendClient().emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: 'SOJIF Consulting - Candidature reçue',
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
        .email-content { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #1f2937; margin-bottom: 20px; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="email-content">
            <h1>Merci pour votre candidature! 🙏</h1>
            <p>Bonjour ${name},</p>
            <p>Nous avons bien reçu votre candidature pour le poste de <strong>${position}</strong>.</p>
            <p>Notre équipe RH examinera attentivement votre profil et vous contactera si votre expérience correspond à nos besoins.</p>
            <p>Nous vous remercions de votre intérêt pour SOJIF Consulting.</p>
            <p>Cordialement,<br/>L'équipe Recrutement</p>
            <div class="footer">
                <p>© 2026 SOJIF Consulting. Tous droits réservés.</p>
            </div>
        </div>
    </div>
</body>
</html>
            `,
        });

        return result;
    } catch (error) {
        console.error('Recruitment confirmation email error:', error);
        throw error;
    }
}

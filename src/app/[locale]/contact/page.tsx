import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildCanonicalAlternates } from '@/lib/site-url';
import ContactPageClient from './ContactPageClient';

type Props = {
    params: Promise<{ locale: 'fr' | 'en' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'contact' });

    const title = t('title');
    const description = locale === 'fr'
        ? 'Contactez SOJIF Consulting à Dakar, Sénégal. Demandez un diagnostic gratuit, une consultation juridique, fiscale ou RH. Réponse sous 24h. WhatsApp disponible.'
        : 'Contact SOJIF Consulting in Dakar, Senegal. Request a free diagnostic, legal, tax or HR consultation. Response within 24h. WhatsApp available.';

    return {
        title,
        description,
        keywords: locale === 'fr'
            ? 'contact SOJIF Consulting, consultation Dakar, diagnostic gratuit Sénégal, WhatsApp cabinet conseil, rendez-vous cabinet Dakar'
            : 'contact SOJIF Consulting, consultation Dakar, free diagnostic Senegal, WhatsApp consulting firm, appointment consulting Dakar',
        alternates: buildCanonicalAlternates(locale, '/contact'),
    };
}

export default function ContactPage() {
    return <ContactPageClient />;
}

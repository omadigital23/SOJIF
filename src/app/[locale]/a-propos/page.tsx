import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildCanonicalAlternates } from '@/lib/site-url';
import AboutPageClient from './AboutPageClient';

type Props = {
    params: Promise<{ locale: 'fr' | 'en' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'about' });

    const title = t('title');
    const description = locale === 'fr'
        ? 'Découvrez SOJIF Consulting : cabinet d\'excellence en droit, finance et développement à Dakar, Sénégal. Notre mission, notre vision et nos valeurs au service des entreprises africaines.'
        : 'Discover SOJIF Consulting: a firm of excellence in law, finance and development in Dakar, Senegal. Our mission, vision and values serving African businesses.';

    return {
        title,
        description,
        keywords: locale === 'fr'
            ? 'SOJIF Consulting Dakar, cabinet conseil Sénégal, Fatou Guewel MBAYE, histoire SOJIF, valeurs cabinet Dakar'
            : 'SOJIF Consulting Dakar, consulting firm Senegal, Fatou Guewel MBAYE, about SOJIF, firm values Dakar',
        alternates: buildCanonicalAlternates(locale, '/a-propos'),
    };
}

export default function AboutPage() {
    return <AboutPageClient />;
}

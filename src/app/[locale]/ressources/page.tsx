import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildCanonicalAlternates } from '@/lib/site-url';
import ResourcesPageClient from './ResourcesPageClient';

type Props = {
    params: Promise<{ locale: 'fr' | 'en' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'resources' });

    const title = t('title');
    const description = locale === 'fr'
        ? 'Accédez aux ressources SOJIF Consulting : guides pratiques, articles et outils pour la gestion d\'entreprise, l\'optimisation fiscale et le droit des affaires au Sénégal.'
        : 'Access SOJIF Consulting resources: practical guides, articles and tools for business management, tax optimization and business law in Senegal.';

    return {
        title,
        description,
        keywords: locale === 'fr'
            ? 'ressources SOJIF Consulting, guide fiscalité Sénégal, actualité juridique Dakar, conseils RH Sénégal, newsletter entreprise Dakar'
            : 'SOJIF Consulting resources, Senegal tax guide, Dakar legal news, Senegal HR advice, Dakar business newsletter',
        alternates: buildCanonicalAlternates(locale, '/ressources'),
    };
}

export default function ResourcesPage() {
    return <ResourcesPageClient />;
}

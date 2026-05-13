import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildCanonicalAlternates } from '@/lib/site-url';
import OffersPageClient from './OffersPageClient';

type Props = {
    params: Promise<{ locale: 'fr' | 'en' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'offers' });

    const title = t('title');
    const description = locale === 'fr'
        ? 'Découvrez les offres d\'abonnement annuel et 6 mois SOJIF Consulting : Pack Essentiel, Croissance et Prestige. Comptabilité, fiscalité, juridique et RH à Dakar, Sénégal. 50% d\'acompte à la signature.'
        : 'Explore SOJIF Consulting annual and 6-month subscription plans: Essential, Growth and Prestige Packs. Accounting, tax, legal and HR services in Dakar, Senegal. 50% deposit upon signing.';

    return {
        title,
        description,
        keywords: locale === 'fr'
            ? 'offres SOJIF Consulting, abonnement cabinet Dakar, tarifs comptabilité Sénégal, pack juridique Dakar, prix expert-comptable Sénégal'
            : 'SOJIF Consulting offers, consulting subscription Dakar, accounting rates Senegal, legal pack Dakar, accountant prices Senegal',
        alternates: buildCanonicalAlternates(locale, '/offres'),
    };
}

export default function OffersPage() {
    return <OffersPageClient />;
}

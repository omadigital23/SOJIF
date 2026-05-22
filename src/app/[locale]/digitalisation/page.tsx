import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildCanonicalAlternates } from '@/lib/site-url';
import DigitalizationPageClient from './DigitalizationPageClient';

type Props = {
    params: Promise<{ locale: 'fr' | 'en' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'digitalisation' });

    const title = t('title');
    const description = locale === 'fr'
        ? 'Accélérez votre transformation numérique avec SOJIF Consulting. Création de sites web, applications mobiles, plateformes e-commerce, solutions logicielles et formation ERP Odoo à Dakar, Sénégal.'
        : 'Accelerate your digital transformation with SOJIF Consulting. Custom website creation, mobile applications, e-commerce platforms, software solutions and Odoo ERP training in Dakar, Senegal.';

    return {
        title,
        description,
        keywords: locale === 'fr'
            ? 'transformation digitale Sénégal, formation Odoo Dakar, formation ERP Odoo Sénégal, création site web Dakar, agence web Sénégal, développement application mobile Dakar, digitalisation entreprise Afrique, e-commerce Sénégal'
            : 'digital transformation Senegal, Odoo training Dakar, Odoo ERP training Senegal, website creation Dakar, web agency Senegal, mobile app development Dakar, enterprise digitalization Africa, e-commerce Senegal',
        alternates: buildCanonicalAlternates(locale, '/digitalisation'),
    };
}

export default function DigitalizationPage() {
    return <DigitalizationPageClient />;
}

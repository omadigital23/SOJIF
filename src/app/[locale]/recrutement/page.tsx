import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildCanonicalAlternates } from '@/lib/site-url';
import RecruitmentPageClient from './RecruitmentPageClient';

type Props = {
    params: Promise<{ locale: 'fr' | 'en' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'recruitment' });

    const title = t('title');
    const description = locale === 'fr'
        ? 'Service de recrutement et de placement professionnel SOJIF Consulting à Dakar. Espace candidat pour déposer votre CV et espace entreprise pour vos besoins en recrutement de cadres et profils techniques au Sénégal.'
        : 'SOJIF Consulting recruitment and professional placement service in Dakar. Candidate area to submit your CV and company area for your executive and technical profile recruitment needs in Senegal.';

    return {
        title,
        description,
        keywords: locale === 'fr'
            ? 'recrutement Sénégal, cabinet recrutement Dakar, offres d\'emploi Sénégal, placement professionnel Dakar, chasseur de têtes Sénégal, déposer CV Dakar, embauche cadres Sénégal'
            : 'recruitment Senegal, recruitment agency Dakar, job offers Senegal, professional placement Dakar, headhunter Senegal, submit CV Dakar, hiring executives Senegal',
        alternates: buildCanonicalAlternates(locale, '/recrutement'),
    };
}

export default function RecruitmentPage() {
    return <RecruitmentPageClient />;
}

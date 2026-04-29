import { notFound } from 'next/navigation';
import { departments, getDepartmentBySlug } from '@/data/departments';
import DepartmentPageClient from './DepartmentPageClient';
import type { Metadata } from 'next';
import { buildCanonicalAlternates } from '@/lib/site-url';

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
    const locales = ['fr', 'en'];
    return locales.flatMap((locale) =>
        departments.map((dept) => ({
            locale,
            slug: dept.slug,
        }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const dept = getDepartmentBySlug(slug);
    if (!dept) return {};

    return {
        title: dept.title,
        description: dept.description,
        alternates: buildCanonicalAlternates(locale as 'fr' | 'en', `/departements/${slug}`),
    };
}

export default async function DepartmentPage({ params }: Props) {
    const { slug, locale } = await params;
    const dept = getDepartmentBySlug(slug);

    if (!dept) {
        notFound();
    }

    return <DepartmentPageClient department={dept} locale={locale} />;
}

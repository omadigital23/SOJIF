import { MetadataRoute } from 'next';
import { PUBLIC_SITE_URL, getLocalizedRoute } from '@/lib/site-url';
import { DEPARTMENT_SLUGS } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = ['fr', 'en'] as const;
    const lastModified = new Date();

    // Base routes that should be in both languages
    const baseRoutes = [
        '',
        '/a-propos',
        '/contact',
        '/departements',
        '/digitalisation',
        '/offres',
        '/recrutement',
        '/ressources',
    ];

    const sitemap: MetadataRoute.Sitemap = [];

    // Add localized routes
    locales.forEach((locale) => {
        baseRoutes.forEach((route) => {
            sitemap.push({
                url: `${PUBLIC_SITE_URL}${getLocalizedRoute(locale, route)}`,
                lastModified,
                changeFrequency: 'weekly',
                priority: route === '' ? 1.0 : 0.8,
            });
        });
    });

    // Add department-specific routes
    locales.forEach((locale) => {
        DEPARTMENT_SLUGS.forEach((slug) => {
            sitemap.push({
                url: `${PUBLIC_SITE_URL}${getLocalizedRoute(locale, `/departements/${slug}`)}`,
                lastModified,
                changeFrequency: 'monthly',
                priority: 0.9, // Departments are highly important for SEO
            });
        });
    });

    return sitemap;
}

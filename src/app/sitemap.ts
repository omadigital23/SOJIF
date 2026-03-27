import { MetadataRoute } from 'next';
import { env } from '@/lib/env';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = env.NEXT_PUBLIC_APP_URL;
    const locales = ['fr', 'en'];
    const lastModified = new Date();

    // Base routes that should be in both languages
    const baseRoutes = [
        '',
        '/a-propos',
        '/contact',
        '/departements',
        '/digitalisation',
        '/espace-client',
        '/offres',
        '/recrutement',
        '/ressources',
    ];

    const sitemap: MetadataRoute.Sitemap = [];

    // Add localized routes
    locales.forEach((locale) => {
        baseRoutes.forEach((route) => {
            const path = `/${locale}${route}`;
            sitemap.push({
                url: `${baseUrl}${path}`,
                lastModified,
                changeFrequency: 'weekly',
                priority: route === '' ? 1.0 : 0.8,
            });
        });
    });

    // Add department-specific routes (example - you might want to fetch these from your database)
    const departmentSlugs = [
        'rh-consulting',
        'digitalisation',
        'formation',
        'recrutement',
        'conseil-strategie',
    ];

    locales.forEach((locale) => {
        departmentSlugs.forEach((slug) => {
            sitemap.push({
                url: `${baseUrl}/${locale}/departements/${slug}`,
                lastModified,
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        });
    });

    return sitemap;
}

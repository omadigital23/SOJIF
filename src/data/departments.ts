import type { Department } from '@/lib/types';

// Le contenu réel (titres, descriptions, services, tarifs, cas) est dans les fichiers i18n
// (fr.json / en.json) sous departments.departmentsList.<slug>.*
// Ici on définit uniquement la structure : slug, icône, et les compteurs de listes
// (utilisés pour itérer dans DepartmentPageClient.tsx via department.services.length, etc.)

export const departments: Department[] = [
    {
        slug: 'droit',
        icon: 'Scale',
        servicesCount: 8,
        pricingCount: 3,
        casesCount: 3,
    },
    {
        slug: 'fiscalite',
        icon: 'Calculator',
        servicesCount: 8,
        pricingCount: 3,
        casesCount: 3,
    },
    {
        slug: 'rh',
        icon: 'Users',
        servicesCount: 8,
        pricingCount: 4,
        casesCount: 3,
    },
    {
        slug: 'conseil',
        icon: 'TrendingUp',
        servicesCount: 8,
        pricingCount: 2,
        casesCount: 3,
    },
    {
        slug: 'digitalisation',
        icon: 'Monitor',
        servicesCount: 9,
        pricingCount: 6,
        casesCount: 3,
    },
    {
        slug: 'recrutement',
        icon: 'UserPlus',
        servicesCount: 8,
        pricingCount: 3,
        casesCount: 3,
    },
];

export function getDepartmentBySlug(slug: string): Department | undefined {
    return departments.find((d) => d.slug === slug);
}

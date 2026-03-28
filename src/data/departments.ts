import type { Department } from '@/lib/types';

export const departments: Department[] = [
    {
        slug: 'droit',
        icon: 'Scale',
        titleKey: 'departments.departmentsList.droit.title',
        subtitleKey: 'departments.departmentsList.droit.subtitle',
        descriptionKey: 'departments.departmentsList.droit.description',
        missionKey: 'departments.departmentsList.droit.mission',
        services: [{}, {}, {}, {}, {}, {}, {}, {}],
        pricing: [{}, {}, {}],
        cases: [{}, {}, {}],
    },
    {
        slug: 'fiscalite',
        icon: 'Calculator',
        titleKey: 'departments.departmentsList.fiscalite.title',
        subtitleKey: 'departments.departmentsList.fiscalite.subtitle',
        descriptionKey: 'departments.departmentsList.fiscalite.description',
        missionKey: 'departments.departmentsList.fiscalite.mission',
        services: [{}, {}, {}, {}, {}, {}, {}, {}],
        pricing: [{}, {}, {}],
        cases: [{}, {}, {}],
    },
    {
        slug: 'rh',
        icon: 'Users',
        titleKey: 'departments.departmentsList.rh.title',
        subtitleKey: 'departments.departmentsList.rh.subtitle',
        descriptionKey: 'departments.departmentsList.rh.description',
        missionKey: 'departments.departmentsList.rh.mission',
        services: [{}, {}, {}, {}, {}, {}, {}, {}],
        pricing: [{}, {}, {}, {}],
        cases: [{}, {}, {}],
    },
    {
        slug: 'conseil',
        icon: 'TrendingUp',
        titleKey: 'departments.departmentsList.conseil.title',
        subtitleKey: 'departments.departmentsList.conseil.subtitle',
        descriptionKey: 'departments.departmentsList.conseil.description',
        missionKey: 'departments.departmentsList.conseil.mission',
        services: [{}, {}, {}, {}, {}, {}, {}, {}],
        pricing: [{}, {}],
        cases: [{}, {}, {}],
    },
    {
        slug: 'digitalisation',
        icon: 'Monitor',
        titleKey: 'departments.departmentsList.digitalisation.title',
        subtitleKey: 'departments.departmentsList.digitalisation.subtitle',
        descriptionKey: 'departments.departmentsList.digitalisation.description',
        missionKey: 'departments.departmentsList.digitalisation.mission',
        services: [{}, {}, {}, {}, {}, {}, {}, {}],
        pricing: [{}, {}, {}],
        cases: [{}, {}, {}],
    },
    {
        slug: 'recrutement',
        icon: 'UserPlus',
        titleKey: 'departments.departmentsList.recrutement.title',
        subtitleKey: 'departments.departmentsList.recrutement.subtitle',
        descriptionKey: 'departments.departmentsList.recrutement.description',
        missionKey: 'departments.departmentsList.recrutement.mission',
        services: [{}, {}, {}, {}, {}, {}, {}, {}],
        pricing: [{}, {}, {}],
        cases: [{}, {}, {}],
    },
];

export function getDepartmentBySlug(slug: string): Department | undefined {
    return departments.find((d) => d.slug === slug);
}

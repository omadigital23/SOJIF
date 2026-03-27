export const COMPANY = {
    name: 'SOJIF Consulting',
    signature: 'Droit • Finance • Développement',
    tagline: 'Cabinet de Structuration & Performance des Entreprises',
    email: 'contact@sojifconsulting.com',
    phone: '+221711615476',
    phoneDisplay: '+221 71 161 54 76',
    whatsapp: '221711615476',
    address: 'Dakar, Sénégal',
    website: 'www.sojifconsulting.com',
    director: 'Fatou Guewel MBAYE',
    directorTitle: 'Directrice Générale',
} as const;

export const NAV_ITEMS = [
    { label: 'nav.home', href: '/' },
    { label: 'nav.about', href: '/a-propos' },
    { label: 'nav.departments', href: '/departements/droit' },
    { label: 'nav.offers', href: '/offres' },
    { label: 'nav.digitalization', href: '/digitalisation' },
    { label: 'nav.recruitment', href: '/recrutement' },
    { label: 'nav.resources', href: '/ressources' },
    { label: 'nav.contact', href: '/contact' },
] as const;

export const DEPARTMENT_SLUGS = [
    'droit',
    'fiscalite',
    'rh',
    'conseil',
    'digitalisation',
    'recrutement',
] as const;

export type DepartmentSlug = (typeof DEPARTMENT_SLUGS)[number];

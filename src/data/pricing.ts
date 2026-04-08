import type { PricingPack } from '@/lib/types';

// Le contenu réel (nom, description, features, cta) est dans les fichiers i18n
// (fr.json / en.json) sous home.packs.<index>.*
// featuresCount sert à itérer dans PricingSection.tsx et OffersPage.tsx

export const pricingPacks: PricingPack[] = [
    {
        price: 2500000,
        period: '/an',
        featuresCount: 7,
        highlighted: false,
    },
    {
        price: 4000000,
        period: '/an',
        featuresCount: 7,
        highlighted: true,
    },
    {
        price: 7000000,
        period: '/an',
        featuresCount: 8,
        highlighted: false,
    },
];

export const comparisonFeatures = [
    { essentiel: 'string', croissance: 'string', prestige: 'string' },
    { essentiel: 'string', croissance: 'string', prestige: 'string' },
    { essentiel: 'string', croissance: 'string', prestige: 'string' },
    { essentiel: 'string', croissance: 'string', prestige: 'string' },
    { essentiel: 'string', croissance: 'string', prestige: 'string' },
    { essentiel: false,    croissance: true,     prestige: true     },
    { essentiel: false,    croissance: false,    prestige: true     },
] as const;

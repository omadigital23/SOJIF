import type { PricingPack } from '@/lib/types';

// Le contenu réel (nom, description, features, cta) est dans les fichiers i18n
// (fr.json / en.json) sous home.packs.<index>.*
// featuresCount sert à itérer dans PricingSection.tsx et OffersPage.tsx

export const pricingPacks: PricingPack[] = [
    {
        translationKey: '0',
        featuresCount: 7,
        highlighted: false,
        visualIndex: 0,
    },
    {
        translationKey: '1',
        featuresCount: 7,
        highlighted: true,
        visualIndex: 1,
    },
    {
        translationKey: '2',
        featuresCount: 8,
        highlighted: false,
        visualIndex: 2,
    },
    {
        translationKey: '3',
        featuresCount: 7,
        highlighted: false,
        visualIndex: 0,
    },
    {
        translationKey: '4',
        featuresCount: 7,
        highlighted: false,
        visualIndex: 1,
    },
    {
        translationKey: '5',
        featuresCount: 8,
        highlighted: false,
        visualIndex: 2,
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

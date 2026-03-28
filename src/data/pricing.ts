import type { PricingPack } from '@/lib/types';

export const pricingPacks: PricingPack[] = [
    {
        price: 2500000,
        period: '/an',
        nameKey: 'home.packs.0.name',
        descriptionKey: 'home.packs.0.description',
        features: [{}, {}, {}, {}, {}, {}, {}],
        ctaKey: 'home.packs.0.cta',
    },
    {
        price: 4000000,
        period: '/an',
        nameKey: 'home.packs.1.name',
        descriptionKey: 'home.packs.1.description',
        features: [{}, {}, {}, {}, {}, {}, {}],
        ctaKey: 'home.packs.1.cta',
        highlighted: true,
    },
    {
        price: 7000000,
        period: '/an',
        nameKey: 'home.packs.2.name',
        descriptionKey: 'home.packs.2.description',
        features: [{}, {}, {}, {}, {}, {}, {}, {}],
        ctaKey: 'home.packs.2.cta',
    },
];

export const comparisonFeatures = [
    { feature: 'offers.comparisonList.0.feature', essentiel: 'offers.comparisonList.0.essentiel', croissance: 'offers.comparisonList.0.croissance', prestige: 'offers.comparisonList.0.prestige' },
    { feature: 'offers.comparisonList.1.feature', essentiel: 'offers.comparisonList.1.essentiel', croissance: 'offers.comparisonList.1.croissance', prestige: 'offers.comparisonList.1.prestige' },
    { feature: 'offers.comparisonList.2.feature', essentiel: 'offers.comparisonList.2.essentiel', croissance: 'offers.comparisonList.2.croissance', prestige: 'offers.comparisonList.2.prestige' },
    { feature: 'offers.comparisonList.3.feature', essentiel: 'offers.comparisonList.3.essentiel', croissance: 'offers.comparisonList.3.croissance', prestige: 'offers.comparisonList.3.prestige' },
    { feature: 'offers.comparisonList.4.feature', essentiel: 'offers.comparisonList.4.essentiel', croissance: 'offers.comparisonList.4.croissance', prestige: 'offers.comparisonList.4.prestige' },
    { feature: 'offers.comparisonList.5.feature' },
    { feature: 'offers.comparisonList.6.feature' },
];

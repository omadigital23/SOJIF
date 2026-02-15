import type { PricingPack } from '@/lib/types';

export const pricingPacks: PricingPack[] = [
    {
        name: 'Pack Essentiel',
        price: 2500000,
        period: '/an',
        description: 'Cible : Startups, TPE et Indépendants. Objectif : Assurer une conformité de base sans alourdir vos charges.',
        features: [
            'Tenue complète de la comptabilité (CA < 50 millions FCFA)',
            'Déclaration de TVA mensuelle et bilan annuel',
            '1 modification statutaire simple par an ou 1 PV annuel',
            'Conseil fiscal par e-mail et veille réglementaire',
            'Rédaction de contrats de travail types (jusqu’à 5 employés)',
            'Conseils sur les déclarations IPRES/CSS',
            'Assistance téléphonique prioritaire (3 appels/mois)',
        ],
        cta: 'Choisir Essentiel',
    },
    {
        name: 'Pack Croissance',
        price: 4000000,
        period: '/an',
        description: 'Cible : PME en plein développement. Objectif : Sécuriser votre expansion avec une expertise proactive.',
        features: [
            'Tenue comptable complète et BRS (CA < 150 millions FCFA)',
            'Déclarations fiscales et sociales mensuelles',
            '2 modifications statutaires et 2 contrats commerciaux par an',
            'Audit fiscal annuel préventif',
            'Gestion de la paie (jusqu’à 15 employés)',
            'Gestion dossiers disciplinaires et conseil droit du travail',
            'Réunion de stratégie trimestrielle (présentiel ou visio)',
        ],
        highlighted: true,
        cta: 'Choisir Croissance',
    },
    {
        name: 'Pack Prestige',
        price: 7000000,
        period: '/an',
        description: 'Cible : Grandes Entreprises, Filiales et PME à fort volume. Objectif : Une direction juridique, fiscale et RH externalisée de haut niveau.',
        features: [
            'Gestion comptable totale sans limite de CA',
            'Liasses fiscales complètes (BIC) et reporting mensuel',
            'Secrétariat juridique complet et contrats complexes',
            'Protection de la propriété intellectuelle (OAPI)',
            'Optimisation fiscale et assistance contrôle (Défense et Recours)',
            'Gestion de la paie illimitée et 2 recrutements cadres/an',
            'Médiation sociale et audit social complet',
            'Consultant dédié disponible 24h/24 et 7j/7',
        ],
        cta: 'Choisir Prestige',
    },
];

export const comparisonFeatures = [
    { feature: 'Gestion comptable', essentiel: 'CA < 50M', croissance: 'CA < 150M', prestige: 'Illimité' },
    { feature: 'Juridique', essentiel: '1 modif/an', croissance: '2 modifs + 2 contrats', prestige: 'Secrétariat complet' },
    { feature: 'Fiscalité', essentiel: 'Conseil email', croissance: 'Audit préventif', prestige: 'Optimisation & Défense' },
    { feature: 'Ressources Humaines', essentiel: 'Contrats types (5 emp.)', croissance: 'Paie (15 emp.)', prestige: 'Paie illimitée + Recrutement' },
    { feature: 'Assistance', essentiel: 'Tel (3 appels/mois)', croissance: 'Réunion trimestrielle', prestige: 'Consultant dédié 24/7' },
    { feature: 'Propriété Intellectuelle', essentiel: false, croissance: false, prestige: true },
    { feature: 'Audit Social', essentiel: false, croissance: false, prestige: true },
];

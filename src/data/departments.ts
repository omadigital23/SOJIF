import type { Department } from '@/lib/types';

export const departments: Department[] = [
    {
        slug: 'droit',
        icon: 'Scale',
        title: 'Droit des Affaires',
        subtitle: 'Sécurisez vos opérations juridiques',
        description: 'Notre département juridique accompagne les entreprises dans toutes leurs problématiques de droit des affaires, de la constitution à la restructuration.',
        mission: 'Fournir un cadre juridique solide pour sécuriser chaque étape de la vie de votre entreprise, de sa création à son développement international.',
        services: [
            'Création et structuration de sociétés',
            'Rédaction et négociation de contrats commerciaux',
            'Conformité réglementaire et veille juridique',
            'Droit du travail et relations sociales',
            'Contentieux commercial et arbitrage',
            'Fusions, acquisitions et restructurations',
            'Propriété intellectuelle et protection des marques',
            'Droit OHADA et droit communautaire',
        ],
        pricing: [
            'Constitution de SASU/SAS : À partir de 350 000 FCFA (hors frais de notaire)',
            'Audit de conformité : Sur devis',
            'Abonnement conseil : Sur devis selon besoins',
        ],
        cases: [
            {
                title: 'Restructuration d\'un groupe industriel',
                description: 'Accompagnement d\'un groupe de 5 sociétés dans une opération de fusion-absorption, avec optimisation de la structure juridique et fiscale.',
            },
            {
                title: 'Protection contractuelle à l\'international',
                description: 'Mise en place d\'un cadre contractuel complet pour une entreprise d\'export, couvrant 8 pays de la zone CEDEAO.',
            },
            {
                title: 'Résolution d\'un litige commercial',
                description: 'Gestion d\'un contentieux de 500M FCFA entre partenaires commerciaux, résolu par médiation en 3 mois.',
            },
        ],
    },
    {
        slug: 'fiscalite',
        icon: 'Calculator',
        title: 'Fiscalité & Comptabilité',
        subtitle: 'Optimisez votre performance financière',
        description: 'Notre expertise fiscale et comptable vous permet de maîtriser vos obligations, optimiser votre charge fiscale et piloter votre performance financière.',
        mission: 'Garantir la conformité fiscale tout en identifiant les leviers d\'optimisation financière pour maximiser la rentabilité de votre entreprise.',
        services: [
            'Tenue de comptabilité et états financiers',
            'Déclarations fiscales et sociales',
            'Audit comptable et financier',
            'Optimisation fiscale légale',
            'Conseil en investissement et financement',
            'Évaluation d\'entreprise',
            'Gestion de la paie et charges sociales',
            'Assistance contrôle fiscal',
        ],
        pricing: [
            'Abonnement conseil mensuel : À partir de 150 000 FCFA / mois',
            'Diagnostic fiscal complet : À partir de 500 000 FCFA',
            'Gestion de la paie : À partir de 15 000 FCFA par bulletin',
        ],
        cases: [
            {
                title: 'Optimisation fiscale d\'une PME',
                description: 'Réduction de 30% de la charge fiscale d\'une PME grâce à l\'utilisation optimale des dispositifs d\'incitation fiscale du Code Général des Impôts.',
            },
            {
                title: 'Mise en conformité comptable',
                description: 'Restructuration complète du système comptable d\'une entreprise de 200 employés selon les normes SYSCOHADA révisé.',
            },
            {
                title: 'Accompagnement lors d\'un contrôle fiscal',
                description: 'Assistance d\'une société lors d\'un contrôle fiscal, résultant en une réduction de 85% du redressement initial.',
            },
        ],
    },
    {
        slug: 'rh',
        icon: 'Users',
        title: 'Ressources Humaines',
        subtitle: 'Valorisez votre capital humain',
        description: 'Nous accompagnons les entreprises dans la gestion stratégique de leurs ressources humaines, de la politique RH à la gestion des talents.',
        mission: 'Transformer la gestion RH en levier de performance en développant des pratiques modernes, conformes et alignées avec la stratégie de l\'entreprise.',
        services: [
            'Audit et diagnostic RH',
            'Politique de rémunération et avantages sociaux',
            'Gestion prévisionnelle des emplois et compétences (GPEC)',
            'Formation et développement des talents',
            'Relations sociales et dialogue social',
            'Conformité droit du travail',
            'Mise en place de SIRH',
            'Accompagnement au changement organisationnel',
        ],
        pricing: [
            'Gestion de la paie : À partir de 15 000 FCFA par bulletin',
            'Audit Social : À partir de 400 000 FCFA',
            'Recrutement (profil cadre) : 15% à 20% du salaire annuel brut',
            'Frais de dossier par recrutement cadre : 50 000 FCFA par salarié',
        ],
        cases: [
            {
                title: 'Transformation RH d\'une banque régionale',
                description: 'Refonte complète de la politique RH d\'un établissement bancaire de 400 employés, incluant la mise en place d\'un SIRH et d\'un plan de formation.',
            },
            {
                title: 'Mise en conformité sociale',
                description: 'Audit social complet et plan de mise en conformité pour une entreprise industrielle, évitant des risques de contentieux évalués à 200M FCFA.',
            },
            {
                title: 'Programme de rétention des talents',
                description: 'Conception et déploiement d\'un programme de fidélisation ayant réduit le turnover de 45% en 18 mois.',
            },
        ],
    },
    {
        slug: 'conseil',
        icon: 'TrendingUp',
        title: 'Conseil Stratégique & Performance',
        subtitle: 'Accélérez votre croissance',
        description: 'Nous accompagnons les dirigeants dans leurs décisions stratégiques et la transformation de leur entreprise pour une performance durable.',
        mission: 'Être le partenaire stratégique qui éclaire les décisions, structure la croissance et maximise la performance opérationnelle de votre entreprise.',
        services: [
            'Diagnostic stratégique et organisationnel',
            'Élaboration de business plans et études de marché',
            'Accompagnement à la levée de fonds',
            'Optimisation des processus opérationnels',
            'Pilotage de la performance (KPI, tableaux de bord)',
            'Stratégie de développement et diversification',
            'Gouvernance d\'entreprise',
            'Accompagnement à la certification (ISO, etc.)',
        ],
        pricing: [
            'Consultation stratégique : Sur devis',
            'Élaboration de Business Plan : Sur devis',
        ],
        cases: [
            {
                title: 'Levée de fonds pour une startup tech',
                description: 'Accompagnement d\'une startup fintech dans sa levée de fonds de 1,5 milliard FCFA, de la structuration du dossier à la négociation avec les investisseurs.',
            },
            {
                title: 'Restructuration opérationnelle',
                description: 'Optimisation des processus d\'une entreprise de distribution, générant une amélioration de 25% de la productivité et 15% de réduction des coûts.',
            },
            {
                title: 'Plan stratégique quinquennal',
                description: 'Élaboration et déploiement d\'un plan stratégique pour une coopérative agricole de 3000 membres, doublant le chiffre d\'affaires en 4 ans.',
            },
        ],
    },
    {
        slug: 'digitalisation',
        icon: 'Monitor',
        title: 'Digitalisation & Solutions Tech',
        subtitle: 'Transformez votre activité par le digital',
        description: 'Nous concevons et déployons des solutions digitales sur mesure pour moderniser votre activité et améliorer votre compétitivité.',
        mission: 'Accompagner la transformation digitale des entreprises africaines en concevant des solutions technologiques adaptées, performantes et scalables.',
        services: [
            'Sites vitrines et institutionnels',
            'Plateformes e-commerce',
            'Applications web sur mesure',
            'Applications mobiles (iOS & Android)',
            'CRM et automatisation des processus',
            'Branding et identité visuelle digitale',
            'Hébergement et maintenance',
            'Formation aux outils digitaux',
        ],
        pricing: [
            'Plateformes comptabilité, fiscalité et RH : À partir de 150 000 FCFA / mois',
            'Site vitrine : Sur devis',
            'Application sur mesure : Sur devis',
        ],
        cases: [
            {
                title: 'Plateforme e-commerce B2B',
                description: 'Développement d\'une marketplace B2B connectant 200 fournisseurs et 5000 acheteurs professionnels dans la zone UEMOA.',
            },
            {
                title: 'Digitalisation d\'une mutuelle de santé',
                description: 'Conception d\'une application mobile et web pour la gestion de 50 000 adhérents, intégrant le paiement mobile.',
            },
            {
                title: 'CRM pour réseau de distribution',
                description: 'Mise en place d\'un CRM sur mesure pour un réseau de 150 points de vente, avec automatisation du reporting et suivi des performances.',
            },
        ],
    },
    {
        slug: 'recrutement',
        icon: 'UserPlus',
        title: 'Recrutement & Placement',
        subtitle: 'Trouvez les talents qu\'il vous faut',
        description: 'Notre service de recrutement et placement vous connecte avec les meilleurs talents du marché, avec un processus rigoureux de sélection et d\'intégration.',
        mission: 'Identifier, évaluer et placer les talents les plus adaptés aux besoins spécifiques de chaque entreprise, en garantissant une intégration réussie.',
        services: [
            'Recrutement de cadres et dirigeants',
            'Recrutement de profils techniques spécialisés',
            'Intérim et mise à disposition de personnel',
            'Évaluation de compétences et assessment',
            'Accompagnement à l\'intégration',
            'Gestion d\'une base de talents qualifiés',
            'Conseil en marque employeur',
            'Outplacement et transition de carrière',
        ],
        pricing: [
            'Recrutement (profil cadre) : 15% à 20% du salaire annuel brut',
            'Frais de dossier par salarié (Cadres) : 50 000 FCFA',
            'Intérim : Commission 1 mois de salaire + 20 000 FCFA frais de dossier',
        ],
        cases: [
            {
                title: 'Recrutement massif pour une mine',
                description: 'Sourcing et placement de 150 profils techniques et administratifs pour un projet minier en 6 mois, avec un taux de rétention de 92%.',
            },
            {
                title: 'Recrutement de direction pour une banque',
                description: 'Recherche et placement de 5 directeurs pour une banque régionale, incluant un processus d\'assessment center de 3 jours.',
            },
            {
                title: 'Programme de stages qualifiants',
                description: 'Conception et gestion d\'un programme de stages pour 200 jeunes diplômés par an, avec un taux d\'insertion de 65%.',
            },
        ],
    },
];

export function getDepartmentBySlug(slug: string): Department | undefined {
    return departments.find((d) => d.slug === slug);
}

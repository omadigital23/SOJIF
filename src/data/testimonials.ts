import type { Testimonial } from '@/lib/types';

// Les données réelles sont dans les fichiers i18n (fr.json / en.json) sous home.testimonialsList
// Ce tableau ne contient que les ratings (non traduits) — le nom, rôle, entreprise et contenu
// sont récupérés via useTranslations('home') dans TestimonialsSection.tsx
export const testimonials: Testimonial[] = [
    { name: 'Amadou Diallo',   role: 'Directeur Général',   company: 'Diallo Industries SA',          rating: 5 },
    { name: 'Mariama Sow',     role: 'Fondatrice & CEO',     company: 'TechSen Solutions',             rating: 5 },
    { name: 'Ibrahima Ndiaye', role: 'Directeur Financier',  company: 'Ndiaye & Fils SARL',            rating: 5 },
    { name: 'Aïssatou Ba',     role: 'DRH',                  company: 'Banque de l\'Afrique de l\'Ouest', rating: 4 },
    { name: 'Moussa Camara',   role: 'Fondateur',            company: 'AgriTech Sahel',                rating: 5 },
];

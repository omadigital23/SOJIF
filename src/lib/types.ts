export interface Department {
    slug: string;
    icon: string;
    // Compteurs pour itération i18n (le contenu vient de useTranslations)
    servicesCount: number;
    pricingCount: number;
    casesCount: number;
    // Champs optionnels gardés pour compatibilité si utilisés ailleurs
    title?: string;
    subtitle?: string;
    description?: string;
    mission?: string;
}

export interface PricingPack {
    price: number;
    period: string;
    featuresCount: number;
    highlighted?: boolean;
    // Champs optionnels gardés pour compatibilité
    name?: string;
    description?: string;
    features?: any[];
    cta?: string;
    nameKey?: string;
    descriptionKey?: string;
    ctaKey?: string;
}

export interface Testimonial {
    name: string;
    role: string;
    company: string;
    rating: number;
    // Le contenu traduit vient de useTranslations('home').testimonialsList
    content?: string;
}

export interface DigitalService {
    icon: string;
    featuresCount: number;
    // Champs optionnels gardés pour compatibilité
    title?: string;
    description?: string;
    features?: string[];
}

export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
    subject: string;
    message: string;
    domain?: string;
    turnover?: string;
    employees?: string;
    challenge?: string;
    phase?: string;
    budget?: string;
    meetingPref?: string;
}

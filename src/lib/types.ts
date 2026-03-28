export interface Department {
    slug: string;
    icon: string;
    title?: string;
    subtitle?: string;
    description?: string;
    mission?: string;
    services?: any[];
    pricing?: any[];
    cases?: { title?: string; description?: string }[];
    titleKey?: string;
    subtitleKey?: string;
    descriptionKey?: string;
    missionKey?: string;
}

export interface PricingPack {
    name?: string;
    price: number;
    period: string;
    description?: string;
    features?: any[];
    highlighted?: boolean;
    cta?: string;
    nameKey?: string;
    descriptionKey?: string;
    ctaKey?: string;
}

export interface Testimonial {
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
}

export interface DigitalService {
    icon: string;
    title: string;
    description: string;
    features: string[];
}

export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
    subject: string;
    message: string;
}

export interface Department {
    slug: string;
    icon: string;
    title: string;
    subtitle: string;
    description: string;
    mission: string;
    services: string[];
    cases: { title: string; description: string }[];
}

export interface PricingPack {
    name: string;
    price: number;
    period: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    cta: string;
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

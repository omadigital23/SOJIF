import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import DepartmentsGrid from '@/components/home/DepartmentsGrid';
import PricingSection from '@/components/home/PricingSection';
import WhySection from '@/components/home/WhySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import { buildCanonicalAlternates } from '@/lib/site-url';

type Props = {
    params: Promise<{ locale: 'fr' | 'en' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    return {
        alternates: buildCanonicalAlternates(locale),
    };
}

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <DepartmentsGrid />
            <PricingSection />
            <WhySection />
            <TestimonialsSection />
            <CTASection />
        </>
    );
}

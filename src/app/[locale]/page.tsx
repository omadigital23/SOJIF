import HeroSection from '@/components/home/HeroSection';
import DepartmentsGrid from '@/components/home/DepartmentsGrid';
import PricingSection from '@/components/home/PricingSection';
import WhySection from '@/components/home/WhySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

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

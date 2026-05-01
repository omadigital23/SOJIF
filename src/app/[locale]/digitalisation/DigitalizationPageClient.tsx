'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Globe,
    ShoppingCart,
    Layout,
    Smartphone,
    Settings,
    Palette,
    ArrowRight,
    Check,
} from 'lucide-react';
import { digitalServices } from '@/data/services';
import { DigitalHeroVisual, DigitalServiceVisual } from '@/components/visuals/BusinessVisuals';

const iconMap: Record<string, React.ElementType> = {
    Globe, ShoppingCart, Layout, Smartphone, Settings, Palette,
};

export default function DigitalizationPageClient() {
    const t = useTranslations('digitalisation');
    const { locale } = useParams();

    return (
        <div className="pt-24 lg:pt-32">
            {/* Header */}
            <section className="gradient-dark py-16 lg:py-20">
                <div className="container-custom grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="text-center lg:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl sm:text-5xl font-bold text-white mb-4"
                        >
                            {t('title')}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/70 text-lg max-w-2xl mx-auto lg:mx-0"
                        >
                            {t('description')}
                        </motion.p>
                    </div>
                    <DigitalHeroVisual />
                </div>
            </section>

            {/* Services grid */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {digitalServices.map((service, i) => {
                            const Icon = iconMap[service.icon] || Globe;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group rounded-2xl border border-transparent bg-light-gray p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/15 hover:bg-white hover:shadow-xl"
                                >
                                    <DigitalServiceVisual index={i} />
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                            <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-xl font-bold text-dark transition-colors group-hover:text-primary">
                                            {t(`servicesList.${i}.title`)}
                                        </h3>
                                    </div>
                                    <p className="text-neutral-gray text-sm leading-relaxed mb-5">
                                        {t(`servicesList.${i}.description`)}
                                    </p>
                                    <ul className="space-y-2">
                                        {Array.from({ length: service.featuresCount }).map((_, j) => (
                                            <li key={j} className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                                                <span className="text-dark/70 text-sm">
                                                    {t(`servicesList.${i}.features.${j}`)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 gradient-primary">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">{t('ctaTitle')}</h2>
                    <p className="text-white/80 mb-8 max-w-xl mx-auto">{t('ctaDesc')}</p>
                    <Link
                        href={`/${locale}/contact`}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-bold transition-all hover:shadow-xl hover:scale-105"
                    >
                        {t('ctaButton')}
                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </div>
    );
}

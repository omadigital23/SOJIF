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

const iconMap: Record<string, React.ElementType> = {
    Globe, ShoppingCart, Layout, Smartphone, Settings, Palette,
};

export default function DigitalizationPage() {
    const t = useTranslations('digitalization');
    const { locale } = useParams();

    return (
        <div className="pt-24 lg:pt-32">
            {/* Header */}
            <section className="gradient-dark py-20">
                <div className="container-custom text-center">
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
                        className="text-white/70 text-lg max-w-2xl mx-auto"
                    >
                        {t('description')}
                    </motion.p>
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
                                    key={service.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-light-gray rounded-2xl p-8 group hover:bg-primary transition-all duration-500"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-white/20 flex items-center justify-center mb-5 transition-colors">
                                        <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold text-dark group-hover:text-white mb-3 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-neutral-gray group-hover:text-white/70 text-sm leading-relaxed mb-5 transition-colors">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {service.features.map((f) => (
                                            <li key={f} className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-primary group-hover:text-accent flex-shrink-0 transition-colors" />
                                                <span className="text-dark/70 group-hover:text-white/80 text-sm transition-colors">
                                                    {f}
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
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}

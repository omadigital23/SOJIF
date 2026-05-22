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
    GraduationCap,
    ArrowRight,
    Check,
} from 'lucide-react';
import { digitalServices } from '@/data/services';
import { DigitalHeroVisual, DigitalServiceVisual } from '@/components/visuals/BusinessVisuals';

const iconMap: Record<string, React.ElementType> = {
    Globe, ShoppingCart, Layout, Smartphone, Settings, Palette, GraduationCap,
};

const odooPlans = [
    { key: '0', style: 'border-emerald-200 bg-emerald-50/70 text-emerald-700', cta: 'bg-emerald-700 text-white hover:bg-emerald-800' },
    { key: '1', style: 'border-primary/25 bg-primary text-white shadow-xl shadow-primary/20', cta: 'bg-white text-primary hover:bg-white/90' },
    { key: '2', style: 'border-amber-200 bg-amber-50/80 text-amber-700', cta: 'bg-amber-600 text-white hover:bg-amber-700' },
];

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

            {/* Odoo training offer */}
            <section id="formation-odoo" className="bg-light-gray py-16 lg:py-20">
                <div className="container-custom">
                    <div className="mb-10 max-w-3xl">
                        <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                            {t('odooTraining.label')}
                        </span>
                        <h2 className="text-3xl font-black text-dark sm:text-4xl">
                            {t('odooTraining.title')}
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-neutral-gray sm:text-lg">
                            {t('odooTraining.description')}
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <div className="rounded-2xl bg-dark p-6 text-white shadow-xl shadow-slate-950/10 lg:p-8">
                            <div className="mb-6 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary">
                                    <GraduationCap className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                                        {t('odooTraining.programLabel')}
                                    </p>
                                    <h3 className="mt-1 text-2xl font-black">{t('odooTraining.programTitle')}</h3>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed text-white/70">
                                {t('odooTraining.programDescription')}
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-4">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                                        <span className="text-sm font-medium text-white/85">
                                            {t(`odooTraining.benefits.${i}`)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {odooPlans.map((plan, index) => (
                                <article
                                    key={plan.key}
                                    className={`flex min-h-[25rem] flex-col rounded-2xl border p-5 ${plan.style}`}
                                >
                                    <div className="mb-5">
                                        <p className="text-xs font-bold uppercase tracking-[0.16em] opacity-70">
                                            {t(`odooTraining.plans.${plan.key}.duration`)}
                                        </p>
                                        <h3 className="mt-2 text-xl font-black">
                                            {t(`odooTraining.plans.${plan.key}.name`)}
                                        </h3>
                                        <p className={`mt-4 text-3xl font-black ${index === 1 ? 'text-white' : 'text-dark'}`}>
                                            {t(`odooTraining.plans.${plan.key}.price`)}
                                        </p>
                                    </div>

                                    <ul className="space-y-3">
                                        {Array.from({ length: 4 }).map((_, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start gap-2 text-sm">
                                                <Check className={`mt-0.5 h-4 w-4 shrink-0 ${index === 1 ? 'text-white' : 'text-primary'}`} aria-hidden="true" />
                                                <span className={index === 1 ? 'text-white/85' : 'text-dark/75'}>
                                                    {t(`odooTraining.plans.${plan.key}.features.${featureIndex}`)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={`/${locale}/contact`}
                                        className={`mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 ${plan.cta}`}
                                    >
                                        {t(`odooTraining.plans.${plan.key}.cta`)}
                                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>

                    <p className="mt-5 text-sm text-neutral-gray">
                        {t('odooTraining.terms')}
                    </p>
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

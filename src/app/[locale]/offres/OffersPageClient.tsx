'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X, Star, ArrowRight } from 'lucide-react';
import { pricingPacks, comparisonFeatures } from '@/data/pricing';
import { OfferPackVisual, OffersHeroVisual } from '@/components/visuals/BusinessVisuals';

export default function OffersPageClient() {
    const t = useTranslations('offers');
    const tHome = useTranslations('home');
    const tCommon = useTranslations('common');
    const { locale } = useParams();

    return (
        <div className="overflow-hidden pt-20 lg:pt-24">
            {/* Header */}
            <section className="relative overflow-hidden bg-slate-950 py-16 lg:py-24">
                <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.45)_1px,transparent_1px)] [background-size:42px_42px]" />
                <div className="container-custom relative z-10">
                    <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                        <div className="max-w-2xl">
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-secondary"
                            >
                                {tHome('pricingTerms')}
                            </motion.p>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 }}
                                className="text-4xl font-black tracking-normal text-white sm:text-5xl lg:text-6xl"
                            >
                                {t('title')}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.12 }}
                                className="mt-5 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl"
                            >
                                {t('subtitle')}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.18 }}
                                className="mt-8 flex flex-col gap-3 sm:flex-row"
                            >
                                <Link href={`/${locale}/contact`} className="btn-accent">
                                    {t('ctaButton')}
                                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                                </Link>
                                <a href="#comparatif" className="btn-secondary border-white/15 bg-white/10 text-white hover:border-white/30 hover:bg-white/15 hover:text-white">
                                    {t('comparisonTitle')}
                                </a>
                            </motion.div>
                        </div>
                        <OffersHeroVisual />
                    </div>
                </div>
            </section>

            {/* Pricing cards */}
            <section className="bg-white py-12 lg:py-16">
                <div className="container-custom">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto items-start">
                        {pricingPacks.map((pack, i) => {
                            const isHighlighted = Boolean(pack.highlighted);

                            return (
                                <motion.div
                                    key={pack.translationKey}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className={`relative flex flex-col rounded-2xl p-8 ${isHighlighted
                                        ? 'bg-primary text-white shadow-2xl shadow-primary/25 z-10'
                                        : 'bg-white border-2 border-gray-100 card-hover'
                                        }`}
                                >
                                    {isHighlighted && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent rounded-full text-white text-xs font-bold flex items-center gap-1 whitespace-nowrap">
                                            <Star className="w-3 h-3" />
                                            {tCommon('recommended')}
                                        </div>
                                    )}
                                    <OfferPackVisual index={pack.visualIndex ?? i} highlighted={isHighlighted} />
                                    <h3 className={`text-xl font-bold mb-2 ${isHighlighted ? 'text-white' : 'text-dark'}`}>
                                        {tHome(`packs.${pack.translationKey}.name`)}
                                    </h3>
                                    <p className={`text-sm mb-6 min-h-20 ${isHighlighted ? 'text-white/70' : 'text-neutral-gray'}`}>
                                        {tHome(`packs.${pack.translationKey}.description`)}
                                    </p>
                                    <div className="mb-6 flex flex-wrap items-end gap-x-2 gap-y-1">
                                        <span className={`text-4xl font-black tracking-normal ${isHighlighted ? 'text-white' : 'text-dark'}`}>
                                            {tHome(`packs.${pack.translationKey}.price`)}
                                        </span>
                                        <span className={`pb-1 text-sm font-bold uppercase tracking-wide ${isHighlighted ? 'text-white/70' : 'text-neutral-gray'}`}>
                                            {tHome(`packs.${pack.translationKey}.currency`)}
                                        </span>
                                        <span className={`text-sm font-medium ${isHighlighted ? 'text-white/60' : 'text-neutral-gray'}`}>
                                            {tHome(`packs.${pack.translationKey}.period`)}
                                        </span>
                                    </div>
                                    <ul className="space-y-3 mb-8 flex-1">
                                        {Array.from({ length: pack.featuresCount }).map((_, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start gap-2.5">
                                                <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isHighlighted ? 'text-accent' : 'text-primary'}`} />
                                                <span className={`text-sm ${isHighlighted ? 'text-white/80' : 'text-dark/70'}`}>
                                                    {tHome(`packs.${pack.translationKey}.features.${featureIndex}`)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={`/${locale}/contact`}
                                        className={`text-center py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${isHighlighted ? 'bg-white text-primary hover:bg-white/90' : 'btn-primary'}`}
                                    >
                                        {tHome(`packs.${pack.translationKey}.cta`)}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Comparison table */}
            <section id="comparatif" className="section-padding bg-light-gray">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-dark text-center mb-12">
                        {t('comparisonTitle')}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left p-4 text-sm font-semibold text-dark">{t('feature')}</th>
                                    <th className="p-4 text-sm font-semibold text-dark text-center">{tHome('packs.0.name')}</th>
                                    <th className="p-4 text-sm font-semibold text-primary text-center bg-primary/5">{tHome('packs.1.name')}</th>
                                    <th className="p-4 text-sm font-semibold text-dark text-center">{tHome('packs.2.name')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonFeatures.map((row, i) => (
                                    <tr key={i} className="border-b border-gray-50 last:border-0">
                                        <td className="p-4 text-sm text-dark/70">{t(`comparisonList.${i}.feature`)}</td>
                                        {(['essentiel', 'croissance', 'prestige'] as const).map((plan) => (
                                            <td
                                                key={plan}
                                                className={`p-4 text-center ${plan === 'croissance' ? 'bg-primary/5' : ''}`}
                                            >
                                                {typeof row[plan] === 'boolean' ? (
                                                    row[plan] ? (
                                                        <Check className="w-5 h-5 text-green-500 mx-auto" aria-label={t('included')} />
                                                    ) : (
                                                        <X className="w-5 h-5 text-gray-300 mx-auto" aria-label={t('notIncluded')} />
                                                    )
                                                ) : (
                                                    <span className="text-sm font-medium text-dark">
                                                        {t(`comparisonList.${i}.${plan}`)}
                                                    </span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Custom offer CTA */}
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

'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X, Star, ArrowRight } from 'lucide-react';
import { pricingPacks, comparisonFeatures } from '@/data/pricing';
import { formatPrice } from '@/lib/utils';

export default function OffersPage() {
    const t = useTranslations('offers');
    const tHome = useTranslations('home');
    const { locale } = useParams();

    return (
        <div className="pt-24 lg:pt-32">
            {/* Header */}
            <section className="section-padding bg-light-gray">
                <div className="container-custom text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl font-bold text-dark mb-4"
                    >
                        {t('title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-gray text-lg max-w-2xl mx-auto"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>
            </section>

            {/* Pricing cards */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {pricingPacks.map((pack, i) => (
                            <motion.div
                                key={pack.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className={`relative rounded-2xl p-8 flex flex-col ${pack.highlighted
                                        ? 'bg-primary text-white shadow-2xl shadow-primary/25 scale-105 z-10'
                                        : 'bg-white border-2 border-gray-100 card-hover'
                                    }`}
                            >
                                {pack.highlighted && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent rounded-full text-white text-xs font-bold flex items-center gap-1">
                                        <Star className="w-3 h-3" />
                                        Recommandé
                                    </div>
                                )}
                                <h3 className={`text-xl font-bold mb-2 ${pack.highlighted ? 'text-white' : 'text-dark'}`}>
                                    {pack.name}
                                </h3>
                                <p className={`text-sm mb-6 ${pack.highlighted ? 'text-white/70' : 'text-neutral-gray'}`}>
                                    {pack.description}
                                </p>
                                <div className="mb-6">
                                    <span className={`text-3xl font-black ${pack.highlighted ? 'text-white' : 'text-dark'}`}>
                                        {formatPrice(pack.price)}
                                    </span>
                                    <span className={`text-sm ${pack.highlighted ? 'text-white/60' : 'text-neutral-gray'}`}>
                                        {t('perYear')}
                                    </span>
                                </div>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {pack.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2.5">
                                            <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pack.highlighted ? 'text-accent' : 'text-primary'}`} />
                                            <span className={`text-sm ${pack.highlighted ? 'text-white/80' : 'text-dark/70'}`}>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={`/${locale}/contact`}
                                    className={`text-center py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${pack.highlighted ? 'bg-white text-primary hover:bg-white/90' : 'btn-primary'
                                        }`}
                                >
                                    {pack.cta}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison table */}
            <section className="section-padding bg-light-gray">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-dark text-center mb-12">
                        {t('comparisonTitle')}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left p-4 text-sm font-semibold text-dark">{t('feature')}</th>
                                    <th className="p-4 text-sm font-semibold text-dark text-center">Essentiel</th>
                                    <th className="p-4 text-sm font-semibold text-primary text-center bg-primary/5">Croissance</th>
                                    <th className="p-4 text-sm font-semibold text-dark text-center">Prestige</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonFeatures.map((row) => (
                                    <tr key={row.feature} className="border-b border-gray-50 last:border-0">
                                        <td className="p-4 text-sm text-dark/70">{row.feature}</td>
                                        {(['essentiel', 'croissance', 'prestige'] as const).map((plan) => (
                                            <td
                                                key={plan}
                                                className={`p-4 text-center ${plan === 'croissance' ? 'bg-primary/5' : ''}`}
                                            >
                                                {typeof row[plan] === 'boolean' ? (
                                                    row[plan] ? (
                                                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                                                    ) : (
                                                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                                                    )
                                                ) : (
                                                    <span className="text-sm font-medium text-dark">{row[plan]}</span>
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

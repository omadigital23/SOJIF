'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { pricingPacks } from '@/data/pricing';
import { formatPrice } from '@/lib/utils';

export default function PricingSection() {
    const t = useTranslations('home');
    const { locale } = useParams();

    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold text-dark mb-4"
                    >
                        {t('pricingTitle')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-gray text-lg"
                    >
                        {t('pricingSubtitle')}
                    </motion.p>
                </div>

                {/* Cards */}
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

                            <h3
                                className={`text-xl font-bold mb-2 ${pack.highlighted ? 'text-white' : 'text-dark'
                                    }`}
                            >
                                {pack.name}
                            </h3>

                            <p
                                className={`text-sm mb-6 ${pack.highlighted ? 'text-white/70' : 'text-neutral-gray'
                                    }`}
                            >
                                {pack.description}
                            </p>

                            <div className="mb-6">
                                <span
                                    className={`text-3xl font-black ${pack.highlighted ? 'text-white' : 'text-dark'
                                        }`}
                                >
                                    {formatPrice(pack.price)}
                                </span>
                                <span
                                    className={`text-sm ${pack.highlighted ? 'text-white/60' : 'text-neutral-gray'
                                        }`}
                                >
                                    {t('perYear')}
                                </span>
                            </div>

                            <ul className="space-y-3 mb-8 flex-1">
                                {pack.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2.5">
                                        <Check
                                            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pack.highlighted ? 'text-accent' : 'text-primary'
                                                }`}
                                        />
                                        <span
                                            className={`text-sm ${pack.highlighted ? 'text-white/80' : 'text-dark/70'
                                                }`}
                                        >
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={`/${locale}/contact`}
                                className={`text-center py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${pack.highlighted
                                        ? 'bg-white text-primary hover:bg-white/90'
                                        : 'btn-primary'
                                    }`}
                            >
                                {pack.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

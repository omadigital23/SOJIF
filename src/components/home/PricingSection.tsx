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
        <section className="section-padding bg-white relative overflow-hidden">
            {/* Background blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

            <div className="container-custom relative z-10">
                {/* Heading */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary-700 text-sm font-semibold tracking-wide uppercase"
                    >
                        {t('pricingLabel')}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6 tracking-tight"
                    >
                        {t('pricingTitle')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-neutral-gray text-lg sm:text-xl mb-8 max-w-2xl mx-auto"
                    >
                        {t('pricingSubtitle')}
                    </motion.p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                    {pricingPacks.map((pack, i) => (
                        <motion.div
                            key={pack.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className={`relative rounded-3xl p-8 flex flex-col h-full transition-all duration-300 ${pack.highlighted
                                ? 'bg-dark text-white shadow-2xl shadow-primary/20 scale-105 z-10 ring-4 ring-primary/20'
                                : 'bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1'
                                }`}
                        >
                            {pack.highlighted && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-primary to-primary-light rounded-full text-white text-sm font-bold shadow-lg shadow-primary/30 flex items-center gap-2 whitespace-nowrap">
                                    <Star className="w-4 h-4 fill-current" />
                                    Recommandé
                                </div>
                            )}

                            <div className="mb-8">
                                <h3
                                    className={`text-xl font-bold mb-3 ${pack.highlighted ? 'text-white' : 'text-dark'
                                        }`}
                                >
                                    {pack.name}
                                </h3>
                                <p
                                    className={`text-sm leading-relaxed ${pack.highlighted ? 'text-gray-300' : 'text-neutral-gray'
                                        }`}
                                >
                                    {pack.description}
                                </p>
                            </div>

                            <div className="mb-8 pb-8 border-b border-gray-100/10">
                                <div className="flex items-baseline gap-1">
                                    <span
                                        className={`text-4xl lg:text-5xl font-black ${pack.highlighted ? 'text-white' : 'text-dark'
                                            }`}
                                    >
                                        {formatPrice(pack.price)}
                                    </span>
                                    <span
                                        className={`text-sm font-medium ${pack.highlighted ? 'text-gray-400' : 'text-neutral-gray'
                                            }`}
                                    >
                                        {t('perYear')}
                                    </span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {pack.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pack.highlighted ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                                            }`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span
                                            className={`text-sm font-medium ${pack.highlighted ? 'text-gray-300' : 'text-dark/80'
                                                }`}
                                        >
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={`/${locale}/contact`}
                                className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-300 ${pack.highlighted
                                    ? 'bg-primary text-white hover:bg-primary-light shadow-lg shadow-primary/25'
                                    : 'bg-dark text-white hover:bg-dark/90 hover:shadow-lg'
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

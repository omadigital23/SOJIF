'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight, Shield } from 'lucide-react';

export default function HeroSection() {
    const t = useTranslations('hero');
    const { locale } = useParams();

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 lg:pt-32">
            {/* Background */}
            <div className="absolute inset-0 gradient-dark" />
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent blur-[120px]" />
                <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-primary-500 blur-[100px]" />
            </div>

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="container-custom relative z-10">
                <div className="max-w-4xl">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm mb-8"
                    >
                        <Shield className="w-4 h-4 text-accent" />
                        <span>{t('subtitle')}</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] mb-6"
                    >
                        {t('title')}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mb-10"
                    >
                        {t('description')}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href={`/${locale}/departements/droit`}
                            className="btn-primary text-base px-8 py-4 gap-2"
                        >
                            {t('cta1')}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href={`/${locale}/contact`}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-white/20 text-white font-semibold text-base transition-all duration-300 hover:bg-white/10 hover:border-white/40"
                        >
                            {t('cta2')}
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-16 grid grid-cols-3 gap-8 max-w-lg"
                    >
                        {[
                            { value: '6', label: 'Départements' },
                            { value: '15+', label: 'Clients' },
                            { value: '1', label: 'Année' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div className="text-3xl font-black text-white">{stat.value}</div>
                                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

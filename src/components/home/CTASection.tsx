'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
    const t = useTranslations('home');
    const { locale } = useParams();

    return (
        <section className="relative py-24 lg:py-32 overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light" />

            {/* Animated Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 animate-float" />
            </div>

            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

            <div className="container-custom relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-tight"
                    >
                        {t('ctaTitle')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        {t('ctaDesc')}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link
                            href={`/${locale}/contact`}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-full font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-1 active:scale-[0.98] group"
                        >
                            {t('ctaButton')}
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

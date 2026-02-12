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
        <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 gradient-primary" />
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white blur-[80px]" />
                <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-white blur-[60px]" />
            </div>

            <div className="container-custom relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                >
                    {t('ctaTitle')}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-white/80 text-lg max-w-xl mx-auto mb-10"
                >
                    {t('ctaDesc')}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Link
                        href={`/${locale}/contact`}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:scale-105"
                    >
                        {t('ctaButton')}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

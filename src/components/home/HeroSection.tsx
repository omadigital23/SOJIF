'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';

export default function HeroSection() {
    const t = useTranslations('hero');
    const { locale } = useParams();

    return (
        <section className="relative min-h-[95vh] flex items-center overflow-hidden pt-20 lg:pt-32 bg-dark">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-dark overflow-hidden">
                <div className="absolute -top-[30%] -right-[10%] w-[800px] h-[800px] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
                <div className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-secondary/10 blur-[100px] animate-float decoration-delay-1000" />
                <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="max-w-3xl">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-primary-400 text-sm font-medium mb-8 shadow-glow"
                    >
                        <Shield className="w-4 h-4" />
                        <span>{t('subtitle')}</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight"
                    >
                        {t('title')}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl mb-10"
                    >
                        {t('description')}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-5"
                    >
                        <Link
                            href={`/${locale}/departements/droit`}
                            className="btn-primary text-base gap-2 group"
                        >
                            {t('cta1')}
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href={`/${locale}/contact`}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-base transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 active:scale-[0.98]"
                        >
                            {t('cta2')}
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mt-16 flex flex-wrap gap-12 border-t border-white/10 pt-8"
                    >
                        {[
                            { value: '6', label: 'Départements' },
                            { value: '15+', label: 'Clients Satisfaits' },
                            { value: '24/7', label: 'Support' },
                        ].map((stat) => (
                            <div key={stat.label} className="flex flex-col">
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Visual (Abstract) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="hidden lg:block relative h-[600px] w-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/10 rounded-2xl blur-3xl" />
                    {/* We can add a more concrete image or 3D element here later */}
                    <div className="relative z-10 h-full w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 shadow-2xl overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-30 transition-opacity">
                            <Shield className="w-64 h-64 text-white" />
                        </div>
                        <div className="absolute bottom-10 left-10 space-y-4">
                            {['Expertise Juridique', 'Audit Fiscal', 'Gestion RH'].map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 + i * 0.2 }}
                                    className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10"
                                >
                                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                                    <span className="text-white font-medium text-lg">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

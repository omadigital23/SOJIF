'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Shield, Clock3, ClipboardCheck, ListChecks } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { HeroMotionVisual } from '@/components/visuals/BusinessVisuals';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

export default function HeroSection() {
    const t = useTranslations('hero');

    const sliderTexts = [
        'slider.0',
        'slider.1',
        'slider.2',
        'slider.3',
        'slider.4',
        'slider.5',
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const proofItems = [
        { key: 'proof.response', icon: Clock3 },
        { key: 'proof.diagnostic', icon: ClipboardCheck },
        { key: 'proof.plan', icon: ListChecks },
    ];
    const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
        'Bonjour SOJIF Consulting, je souhaite planifier un diagnostic gratuit.'
    )}`;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderTexts.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [sliderTexts.length]);

    return (
        <section className="relative flex min-h-[92svh] items-start overflow-hidden bg-dark pb-28 pt-28 md:pb-20 lg:min-h-[95vh] lg:items-center lg:pt-32">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#0F172A_0%,#111827_48%,#1E3A8A_100%)]" />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-dark/80 to-transparent" />

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
                        className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.06] mb-6 tracking-tight"
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
                        className="flex flex-col sm:flex-row sm:flex-wrap gap-4"
                    >
                        <Link
                            href="/contact"
                            className="btn-primary text-base gap-2 group"
                        >
                            {t('cta1')}
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center gap-2 overflow-visible rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white shadow-[0_16px_32px_rgba(7,94,84,0.28)] ring-1 ring-white/45 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1FC45C] hover:shadow-[0_20px_40px_rgba(7,94,84,0.34)] active:scale-[0.98]"
                        >
                            <span aria-hidden="true" className="pointer-events-none absolute inset-[-5px] rounded-full bg-[#25D366]/20 blur-md" />
                            <span aria-hidden="true" className="pointer-events-none absolute inset-[-3px] rounded-full border border-[#25D366]/45 shadow-[0_0_22px_rgba(37,211,102,0.46)]" />
                            <WhatsAppIcon className="relative h-5 w-5 drop-shadow-sm" />
                            {t('whatsappCta')}
                        </a>
                        <Link
                            href="/departements/droit"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-base transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 active:scale-[0.98]"
                        >
                            {t('cta2')}
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl"
                    >
                        {proofItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.key}
                                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/85"
                                >
                                    <Icon className="w-4 h-4 text-secondary" aria-hidden="true" />
                                    <span>{t(item.key)}</span>
                                </div>
                            );
                        })}
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-6 lg:mt-16 lg:gap-12 lg:pt-8"
                    >
                        {[
                            { valueKey: 'stats.departmentsValue', labelKey: 'stats.departments' },
                            { valueKey: 'stats.clientsValue', labelKey: 'stats.clients' },
                            { valueKey: 'stats.supportValue', labelKey: 'stats.support' },
                        ].map((stat) => (
                            <div key={stat.labelKey} className="flex flex-col">
                                <div className="text-3xl font-bold text-white mb-1">{t(stat.valueKey)}</div>
                                <div className="text-sm text-gray-400 font-medium">{t(stat.labelKey)}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Visual */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="hidden lg:block"
                >
                    <HeroMotionVisual
                        quote={t(sliderTexts[currentSlide])}
                        labels={[t('labels.legal'), t('labels.audit'), t('labels.hr')]}
                    />
                </motion.div>
            </div>
        </section>
    );
}

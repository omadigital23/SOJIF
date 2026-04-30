'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Award, CheckCircle2, Globe, Layers, Zap } from 'lucide-react';

const icons = [Layers, Zap, Award, Globe];

export default function WhySection() {
    const t = useTranslations('home');

    const reasons = [
        { titleKey: 'why1Title', descKey: 'why1Desc' },
        { titleKey: 'why2Title', descKey: 'why2Desc' },
        { titleKey: 'why3Title', descKey: 'why3Desc' },
        { titleKey: 'why4Title', descKey: 'why4Desc' },
    ];
    const outcomes = [
        { step: '01', titleKey: 'leadSteps.audit.title', descKey: 'leadSteps.audit.desc' },
        { step: '02', titleKey: 'leadSteps.priority.title', descKey: 'leadSteps.priority.desc' },
        { step: '03', titleKey: 'leadSteps.action.title', descKey: 'leadSteps.action.desc' },
    ];

    return (
        <section className="section-padding bg-gradient-to-b from-white to-light-gray relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

            <div className="container-custom relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-semibold tracking-wide uppercase"
                    >
                        {t('whyLabel')}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6 tracking-tight"
                    >
                        {t('whyTitle')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-neutral-gray text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
                    >
                        {t('whySubtitle')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reasons.map((reason, i) => {
                        const Icon = icons[i];
                        return (
                            <motion.div
                                key={reason.titleKey}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center group p-6 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-white shadow-soft flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-gray-100">
                                    <Icon className="w-10 h-10 text-primary-400 group-hover:text-primary transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-dark mb-4 group-hover:text-primary transition-colors">
                                    {t(reason.titleKey)}
                                </h3>
                                <p className="text-neutral-gray leading-relaxed text-balance">
                                    {t(reason.descKey)}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 border-t border-gray-200 pt-12"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-10 items-start">
                        <div>
                            <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-4">
                                <CheckCircle2 className="w-4 h-4" />
                                {t('leadLabel')}
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-dark mb-4">
                                {t('leadTitle')}
                            </h3>
                            <p className="text-neutral-gray leading-relaxed mb-6">
                                {t('leadDesc')}
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors"
                            >
                                {t('leadCta')}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {outcomes.map((outcome) => (
                                <div
                                    key={outcome.step}
                                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                                >
                                    <div className="text-xs font-bold text-primary mb-4">{outcome.step}</div>
                                    <h4 className="font-bold text-dark mb-2">{t(outcome.titleKey)}</h4>
                                    <p className="text-sm text-neutral-gray leading-relaxed">{t(outcome.descKey)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

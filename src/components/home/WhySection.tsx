'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Layers, Zap, Award, Globe } from 'lucide-react';

const icons = [Layers, Zap, Award, Globe];

export default function WhySection() {
    const t = useTranslations('home');

    const reasons = [
        { titleKey: 'why1Title', descKey: 'why1Desc' },
        { titleKey: 'why2Title', descKey: 'why2Desc' },
        { titleKey: 'why3Title', descKey: 'why3Desc' },
    ];

    return (
        <section className="section-padding bg-light-gray">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold text-dark mb-4"
                    >
                        {t('whyTitle')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-gray text-lg"
                    >
                        {t('whySubtitle')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reasons.map((reason, i) => {
                        const Icon = icons[i];
                        return (
                            <motion.div
                                key={reason.titleKey}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                                    <Icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-dark mb-3">
                                    {t(reason.titleKey)}
                                </h3>
                                <p className="text-neutral-gray text-sm leading-relaxed">
                                    {t(reason.descKey)}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

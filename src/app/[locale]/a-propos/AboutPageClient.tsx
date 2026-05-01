'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Target, Eye, Heart, Lightbulb, Handshake, Award } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { AboutIdentityVisual } from '@/components/visuals/BusinessVisuals';

const values = [
    { key: 'value1', icon: Award },
    { key: 'value2', icon: Handshake },
    { key: 'value3', icon: Lightbulb },
    { key: 'value4', icon: Heart },
];

export default function AboutPageClient() {
    const t = useTranslations('about');

    return (
        <div className="overflow-hidden pt-24 lg:pt-32">
            {/* Hero */}
            <section className="relative overflow-hidden bg-light-gray py-16 lg:py-24">
                <div className="container-custom">
                    <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
                        <div className="max-w-2xl">
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-5 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary"
                            >
                                {COMPANY.name}
                            </motion.p>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 }}
                                className="text-4xl font-black tracking-normal text-dark sm:text-5xl lg:text-6xl"
                            >
                                {t('title')}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.12 }}
                                className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-gray sm:text-xl"
                            >
                                {t('subtitle')}
                            </motion.p>
                        </div>
                        <AboutIdentityVisual />
                    </div>
                </div>
            </section>

            {/* History */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-dark mb-6">{t('historyTitle')}</h2>
                            <p className="text-dark/70 leading-relaxed mb-4">{t('historyP1')}</p>
                            <p className="text-dark/70 leading-relaxed">{t('historyP2')}</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="rounded-2xl border border-slate-200 bg-light-gray p-8 sm:p-10"
                        >
                            <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
                                <Image
                                    src="/images/logo-sojif-premium-transparent.png"
                                    alt="SOJIF Consulting"
                                    width={300}
                                    height={92}
                                    className="h-auto w-full max-w-xs"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-2">{COMPANY.director}</h3>
                            <p className="text-primary font-semibold text-sm mb-4">{t('directorTitle')}</p>
                            <p className="text-dark/70 text-sm leading-relaxed">{t('directorBio')}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding bg-light-gray">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-10"
                        >
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                                <Target className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-dark mb-4">{t('missionTitle')}</h3>
                            <p className="text-dark/70 leading-relaxed">{t('missionDesc')}</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="bg-white rounded-2xl p-10"
                        >
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                                <Eye className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-dark mb-4">{t('visionTitle')}</h3>
                            <p className="text-dark/70 leading-relaxed">{t('visionDesc')}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-dark mb-4">{t('valuesTitle')}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => {
                            const Icon = v.icon;
                            return (
                                <motion.div
                                    key={v.key}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-bold text-dark mb-2">{t(v.key)}</h3>
                                    <p className="text-neutral-gray text-sm leading-relaxed">
                                        {t(`${v.key}Desc`)}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Scale,
    Calculator,
    Users,
    TrendingUp,
    Monitor,
    UserPlus,
} from 'lucide-react';
import type { Department } from '@/lib/types';
import { departments } from '@/data/departments';

const iconMap: Record<string, React.ElementType> = {
    Scale, Calculator, Users, TrendingUp, Monitor, UserPlus,
};

interface Props {
    department: Department;
    locale: string;
}

export default function DepartmentPageClient({ department, locale }: Props) {
    const t = useTranslations('departments');
    const Icon = iconMap[department.icon] || Scale;

    const otherDepts = departments.filter((d) => d.slug !== department.slug);

    return (
        <div className="pt-24 lg:pt-32">
            {/* Header */}
            <section className="gradient-dark py-20">
                <div className="container-custom">
                    <Link
                        href={`/${locale}`}
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('backToHome')}
                    </Link>

                    <div className="flex items-start gap-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0"
                        >
                            <Icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl sm:text-5xl font-bold text-white mb-3"
                            >
                                {t(`departmentsList.${department.slug}.title`)}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-white/70 text-lg max-w-2xl"
                            >
                                {t(`departmentsList.${department.slug}.subtitle`)}
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('missionLabel')}</h2>
                        <p className="text-dark/70 text-lg leading-relaxed">{t(`departmentsList.${department.slug}.mission`)}</p>
                    </motion.div>
                </div>
            </section>

            {/* Services */}
            <section className="section-padding bg-light-gray">
                <div className="container-custom max-w-4xl">
                    <h2 className="text-2xl font-bold text-dark mb-8">{t('servicesLabel')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {department.services.map((service, i) => (
                            <motion.div
                                key={service}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-3 bg-white rounded-xl p-5"
                            >
                                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-dark/80 text-sm">{t(`departmentsList.${department.slug}.services.${i}`)}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            {department.pricing && (
                <section className="section-padding bg-white">
                    <div className="container-custom max-w-4xl">
                        <h2 className="text-2xl font-bold text-dark mb-8">Tarifs Indicatifs</h2>
                        <div className="bg-light-gray rounded-2xl p-8 border border-neutral-khaki/20">
                            <ul className="space-y-4">
                                {department.pricing.map((price, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-primary font-bold text-sm">$</span>
                                        </div>
                                        <span className="text-dark font-medium">{t(`departmentsList.${department.slug}.pricing.${i}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            )}

            {/* Case studies */}
            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <h2 className="text-2xl font-bold text-dark mb-8">{t('casesLabel')}</h2>
                    <div className="space-y-6">
                        {department.cases.map((cs, i) => (
                            <motion.div
                                key={cs.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-light-gray rounded-2xl p-8"
                            >
                                <h3 className="text-lg font-bold text-dark mb-3">{t(`departmentsList.${department.slug}.cases.${i}.title`)}</h3>
                                <p className="text-dark/70 text-sm leading-relaxed">{t(`departmentsList.${department.slug}.cases.${i}.description`)}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 gradient-primary">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">{t('ctaTitle')}</h2>
                    <Link
                        href={`/${locale}/contact`}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-bold transition-all hover:shadow-xl hover:scale-105"
                    >
                        {t('ctaButton')}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Other departments */}
            <section className="section-padding bg-light-gray">
                <div className="container-custom">
                    <h2 className="text-2xl font-bold text-dark mb-8 text-center">{t('title')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherDepts.slice(0, 3).map((dept) => {
                            const DeptIcon = iconMap[dept.icon] || Scale;
                            return (
                                <Link
                                    key={dept.slug}
                                    href={`/${locale}/departements/${dept.slug}`}
                                    className="group bg-white rounded-2xl p-6 card-hover"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                                        <DeptIcon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="font-bold text-dark group-hover:text-primary transition-colors">
                                        {t(`departmentsList.${dept.slug}.title`)}
                                    </h3>
                                    <p className="text-neutral-gray text-sm mt-1">{t(`departmentsList.${dept.slug}.subtitle`)}</p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

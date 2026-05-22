'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import {
    Scale,
    Calculator,
    Users,
    TrendingUp,
    Monitor,
    UserPlus,
    ArrowRight,
} from 'lucide-react';
import { departments } from '@/data/departments';
import { DepartmentCardVisual } from '@/components/visuals/BusinessVisuals';

const iconMap: Record<string, React.ElementType> = {
    Scale,
    Calculator,
    Users,
    TrendingUp,
    Monitor,
    UserPlus,
};

export default function DepartmentsGrid() {
    const t = useTranslations('home');
    const tDept = useTranslations('departments');
    const tCommon = useTranslations('common');

    return (
        <section className="section-padding bg-light-gray relative">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-[0.03]" />

            <div className="container-custom relative z-10">
                {/* Heading */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-semibold tracking-wide uppercase"
                    >
                        {t('departmentsLabel')}
                    </motion.div>
                    <motion.h2
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6"
                    >
                        {t('departmentsTitle')}
                    </motion.h2>
                    <motion.p
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-neutral-gray text-lg sm:text-xl leading-relaxed"
                    >
                        {t('departmentsSubtitle')}
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {departments.map((dept, i) => {
                        const IconComponent = iconMap[dept.icon] || Scale;
                        return (
                            <motion.div
                                key={dept.slug}
                                initial={false}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    href={`/departements/${dept.slug}`}
                                    className="group block h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/10 hover:shadow-xl"
                                >
                                    <DepartmentCardVisual slug={dept.slug} />

                                    <div className="p-7">
                                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <IconComponent className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                                        </div>

                                        {/* title & subtitle via i18n */}
                                        <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                                            {tDept(`departmentsList.${dept.slug}.title`)}
                                        </h3>
                                        <p className="text-neutral-gray text-sm leading-relaxed mb-6">
                                            {tDept(`departmentsList.${dept.slug}.subtitle`)}
                                        </p>

                                        <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group/link">
                                            {tCommon('learnMore')}
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

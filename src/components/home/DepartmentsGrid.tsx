'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
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
    const { locale } = useParams();

    return (
        <section className="section-padding bg-light-gray">
            <div className="container-custom">
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold text-dark mb-4"
                    >
                        {t('departmentsTitle')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-gray text-lg"
                    >
                        {t('departmentsSubtitle')}
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departments.map((dept, i) => {
                        const IconComponent = iconMap[dept.icon] || Scale;
                        return (
                            <motion.div
                                key={dept.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    href={`/${locale}/departements/${dept.slug}`}
                                    className="group block bg-white rounded-2xl p-8 card-hover h-full"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <IconComponent className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                                        {dept.title}
                                    </h3>
                                    <p className="text-neutral-gray text-sm leading-relaxed mb-4">
                                        {dept.subtitle}
                                    </p>
                                    <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        En savoir plus
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

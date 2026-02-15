'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    UserPlus,
    Building2,
    Upload,
    CheckCircle,
    Users,
    FileText,
    Search,
    Handshake,
    ArrowRight,
} from 'lucide-react';
import CandidateForm from '@/components/recruitment/CandidateForm';

export default function RecruitmentPage() {
    const t = useTranslations('recruitment');
    const { locale } = useParams();

    const candidateSteps = [
        { icon: UserPlus, text: t('candidateStep1') },
        { icon: Upload, text: t('candidateStep2') },
        { icon: FileText, text: t('candidateStep3') },
        { icon: CheckCircle, text: t('candidateStep4') },
        { icon: Users, text: t('candidateStep5') },
    ];

    const companySteps = [
        { icon: FileText, text: t('companyStep1') },
        { icon: Search, text: t('companyStep2') },
        { icon: Users, text: t('companyStep3') },
        { icon: CheckCircle, text: t('companyStep4') },
        { icon: Handshake, text: t('companyStep5') },
    ];

    return (
        <div className="pt-24 lg:pt-32">
            {/* Header */}
            <section className="gradient-dark py-20">
                <div className="container-custom text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl font-bold text-white mb-4"
                    >
                        {t('title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/70 text-lg max-w-2xl mx-auto"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>
            </section>

            {/* Two columns */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Candidates */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <CandidateForm />
                        </motion.div>

                        {/* Companies */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-dark rounded-2xl p-8 lg:p-10 text-white"
                        >
                            <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                                <Building2 className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold mb-3">{t('companyTitle')}</h2>
                            <p className="text-white/70 mb-8">{t('companyDesc')}</p>

                            <div className="space-y-4">
                                {companySteps.map((step, i) => {
                                    const StepIcon = step.icon;
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center gap-4 bg-white/5 rounded-xl p-4"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                                <StepIcon className="w-5 h-5 text-accent" />
                                            </div>
                                            <div className="flex items-center gap-3 flex-1">
                                                <span className="text-sm font-bold text-accent">{i + 1}.</span>
                                                <span className="text-sm text-white/80">{step.text}</span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}

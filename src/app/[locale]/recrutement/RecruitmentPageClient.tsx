'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Building2, UserCircle } from 'lucide-react';
import CandidateForm from '@/components/recruitment/CandidateForm';
import CompanyRecruitmentForm from '@/components/recruitment/CompanyRecruitmentForm';

export default function RecruitmentPageClient() {
    const t = useTranslations('recruitment');
    const [activeTab, setActiveTab] = useState<'candidate' | 'company'>('candidate');

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

            {/* Tab switcher */}
            <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
                <div className="container-custom">
                    <div className="flex gap-1 py-3 max-w-sm">
                        <button
                            onClick={() => setActiveTab('candidate')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${activeTab === 'candidate'
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-neutral-gray hover:bg-light-gray'
                                }`}
                        >
                            <UserCircle className="w-4 h-4" />
                            {t('candidateTitle')}
                        </button>
                        <button
                            onClick={() => setActiveTab('company')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${activeTab === 'company'
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-neutral-gray hover:bg-light-gray'
                                }`}
                        >
                            <Building2 className="w-4 h-4" />
                            {t('companyTitle')}
                        </button>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {activeTab === 'candidate' ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                                {/* Form */}
                                <CandidateForm />

                                {/* How it works */}
                                <div className="bg-dark rounded-2xl p-8 lg:p-10 text-white">
                                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                                        <UserCircle className="w-7 h-7 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3">{t('candidateTitle')}</h2>
                                    <p className="text-white/70 mb-8">{t('candidateDesc')}</p>
                                    <div className="space-y-4">
                                        {(['candidateStep1', 'candidateStep2', 'candidateStep3', 'candidateStep4', 'candidateStep5'] as const).map((step, i) => (
                                            <div key={step} className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-accent font-bold text-sm">{i + 1}</span>
                                                </div>
                                                <span className="text-sm text-white/80">{t(step)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                                {/* Form */}
                                <CompanyRecruitmentForm />

                                {/* How it works */}
                                <div className="bg-dark rounded-2xl p-8 lg:p-10 text-white">
                                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                                        <Building2 className="w-7 h-7 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3">{t('companyTitle')}</h2>
                                    <p className="text-white/70 mb-8">{t('companyDesc')}</p>
                                    <div className="space-y-4">
                                        {(['companyStep1', 'companyStep2', 'companyStep3', 'companyStep4', 'companyStep5'] as const).map((step, i) => (
                                            <div key={step} className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-accent font-bold text-sm">{i + 1}</span>
                                                </div>
                                                <span className="text-sm text-white/80">{t(step)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

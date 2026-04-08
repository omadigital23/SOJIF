'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const companySchema = z.object({
    companyName: z.string().min(2),
    contactName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    positionTitle: z.string().min(3),
    department: z.string().optional(),
    description: z.string().min(20).max(3000),
    requirements: z.string().optional(),
    salary: z.string().optional(),
    location: z.string().optional(),
    urgency: z.enum(['low', 'medium', 'high']).optional(),
    contractType: z.enum(['cdi', 'cdd', 'interim', 'freelance', 'stage']).optional(),
});

type CompanyFormData = z.infer<typeof companySchema>;

export default function CompanyRecruitmentForm() {
    const t = useTranslations('recruitment');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const inputCls = 'w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white';
    const labelCls = 'block text-sm font-medium text-dark mb-2';

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CompanyFormData>({
        resolver: zodResolver(companySchema),
    });

    const onSubmit = async (data: CompanyFormData) => {
        setStatus('sending');
        try {
            const res = await fetch('/api/recruitment/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (result.success) {
                setStatus('success');
                reset();
            } else {
                setStatus('error');
            }
            setTimeout(() => setStatus('idle'), 8000);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-dark mb-2">{t('companyFormTitle')}</h3>
            <p className="text-sm text-neutral-gray mb-6">{t('companyFormSubtitle')}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Entreprise & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className={labelCls}>{t('companyFormCompany')}</label>
                        <input {...register('companyName')} className={inputCls} placeholder={t('companyFormCompany')} />
                        {errors.companyName && <p className="text-red-500 text-xs mt-1">{t('form.error')}</p>}
                    </div>
                    <div>
                        <label className={labelCls}>{t('companyFormContact')}</label>
                        <input {...register('contactName')} className={inputCls} placeholder={t('companyFormContact')} />
                        {errors.contactName && <p className="text-red-500 text-xs mt-1">{t('form.error')}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className={labelCls}>{t('companyFormEmail')}</label>
                        <input type="email" {...register('email')} className={inputCls} placeholder={t('companyFormEmail')} />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{t('form.error')}</p>}
                    </div>
                    <div>
                        <label className={labelCls}>{t('companyFormPhone')}</label>
                        <input type="tel" {...register('phone')} className={inputCls} placeholder={t('companyFormPhone')} />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{t('form.error')}</p>}
                    </div>
                </div>

                {/* Poste */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className={labelCls}>{t('companyFormPosition')}</label>
                        <input {...register('positionTitle')} className={inputCls} placeholder={t('companyFormPosition')} />
                        {errors.positionTitle && <p className="text-red-500 text-xs mt-1">{t('form.error')}</p>}
                    </div>
                    <div>
                        <label className={labelCls}>{t('companyFormDepartment')}</label>
                        <input {...register('department')} className={inputCls} placeholder={t('companyFormDepartment')} />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className={labelCls}>{t('companyFormDescription')}</label>
                    <textarea {...register('description')} rows={4} className={`${inputCls} resize-none`} placeholder={t('companyFormDescription')} />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{t('form.error')}</p>}
                </div>

                {/* Compétences */}
                <div>
                    <label className={labelCls}>{t('companyFormRequirements')}</label>
                    <textarea {...register('requirements')} rows={2} className={`${inputCls} resize-none`} placeholder={t('companyFormRequirements')} />
                </div>

                {/* Salaire & Lieu */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className={labelCls}>{t('companyFormSalary')}</label>
                        <input {...register('salary')} className={inputCls} placeholder={t('companyFormSalary')} />
                    </div>
                    <div>
                        <label className={labelCls}>{t('companyFormLocation')}</label>
                        <input {...register('location')} className={inputCls} placeholder="Dakar, Sénégal" />
                    </div>
                </div>

                {/* Urgence & Contrat */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className={labelCls}>{t('companyFormUrgency')}</label>
                        <select {...register('urgency')} className={inputCls}>
                            <option value="">{t('companyFormUrgency')}</option>
                            <option value="low">{t('companyFormUrgencyLow')}</option>
                            <option value="medium">{t('companyFormUrgencyMedium')}</option>
                            <option value="high">{t('companyFormUrgencyHigh')}</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelCls}>{t('companyFormContract')}</label>
                        <select {...register('contractType')} className={inputCls}>
                            <option value="">{t('companyFormContract')}</option>
                            <option value="cdi">{t('companyFormContractCdi')}</option>
                            <option value="cdd">{t('companyFormContractCdd')}</option>
                            <option value="interim">{t('companyFormContractInterim')}</option>
                            <option value="freelance">{t('companyFormContractFreelance')}</option>
                            <option value="stage">{t('companyFormContractStage')}</option>
                        </select>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full gap-2 py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {status === 'sending' ? (
                        <><Loader2 className="w-5 h-5 animate-spin" />{t('companyFormSending')}</>
                    ) : (
                        <><Send className="w-5 h-5" />{t('companyFormSubmit')}</>
                    )}
                </button>

                <AnimatePresence>
                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg overflow-hidden"
                        >
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm font-medium">{t('companyFormSuccess')}</span>
                        </motion.div>
                    )}
                    {status === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg overflow-hidden"
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm font-medium">{t('companyFormError')}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
}

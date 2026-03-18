'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Loader2, CheckCircle, AlertCircle, UploadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf'];

const candidateSchema = z.object({
    fullName: z.string().min(2, 'required'),
    email: z.string().email('invalid_email'),
    phone: z.string().min(8, 'invalid_phone'),
    domain: z.string().min(1, 'required'),
    experience: z.string().min(1, 'required'),
    message: z.string().optional(),
    cv: z
        .custom<FileList>()
        .refine((files) => files?.length === 1, 'required')
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, 'max_size')
        .refine(
            (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
            'invalid_type'
        ),
});

type CandidateFormData = z.infer<typeof candidateSchema>;

export default function CandidateForm() {
    const t = useTranslations('recruitment.form');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [fileName, setFileName] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<CandidateFormData>({
        resolver: zodResolver(candidateSchema),
    });

    // Watch files to update fileName state
    const cvFiles = watch('cv');
    if (cvFiles && cvFiles.length > 0 && cvFiles[0].name !== fileName) {
        setFileName(cvFiles[0].name);
    }

    const onSubmit = async (data: CandidateFormData) => {
        setStatus('sending');

        try {
            // 1. Register the candidate
            const signupRes = await fetch('/api/candidates/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: data.fullName.split(' ')[0] || data.fullName,
                    lastName: data.fullName.split(' ').slice(1).join(' ') || data.fullName,
                    email: data.email,
                    phone: data.phone,
                    password: data.phone + data.email.slice(0, 4), // Temp password
                    domain: data.domain,
                    experience: data.experience,
                    message: data.message,
                }),
            });
            const signupResult = await signupRes.json();

            // 2. Upload CV if signup succeeded
            if (signupResult.success && data.cv?.length > 0) {
                const formData = new FormData();
                formData.append('cv', data.cv[0]);
                formData.append('candidateId', signupResult.candidateId || '');

                await fetch('/api/candidates/upload-cv', {
                    method: 'POST',
                    body: formData,
                });
            }

            if (signupResult.success) {
                setStatus('success');
                reset();
                setFileName(null);
            } else {
                setStatus('error');
            }
            setTimeout(() => setStatus('idle'), 8000);
        } catch (error) {
            console.error(error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const domains = [
        'legal',
        'finance',
        'hr',
        'it',
        'management',
        'sales',
        'other',
    ];

    const experiences = [
        'junior',
        'mid',
        'senior',
        'expert',
    ];

    return (
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-dark mb-6">{t('title')}</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-dark mb-2">{t('fullName')}</label>
                    <input
                        {...register('fullName')}
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm ${errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                            }`}
                        placeholder={t('fullName')}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{t('error')}</p>}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-dark mb-2">{t('email')}</label>
                        <input
                            {...register('email')}
                            type="email"
                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                                }`}
                            placeholder={t('email')}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{t('error')}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-dark mb-2">{t('phone')}</label>
                        <input
                            {...register('phone')}
                            type="tel"
                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                                }`}
                            placeholder={t('phone')}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{t('error')}</p>}
                    </div>
                </div>

                {/* Domain & Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-dark mb-2">{t('domain')}</label>
                        <select
                            {...register('domain')}
                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white ${errors.domain ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                                }`}
                        >
                            <option value="">{t('selectDomain')}</option>
                            {domains.map((d) => (
                                <option key={d} value={d}>
                                    {t(`domains.${d}`)}
                                </option>
                            ))}
                        </select>
                        {errors.domain && <p className="text-red-500 text-xs mt-1">{t('error')}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-dark mb-2">{t('experience')}</label>
                        <select
                            {...register('experience')}
                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white ${errors.experience ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                                }`}
                        >
                            <option value="">{t('selectExperience')}</option>
                            {experiences.map((e) => (
                                <option key={e} value={e}>
                                    {t(`experiences.${e}`)}
                                </option>
                            ))}
                        </select>
                        {errors.experience && <p className="text-red-500 text-xs mt-1">{t('error')}</p>}
                    </div>
                </div>

                {/* CV Upload */}
                <div>
                    <label className="block text-sm font-medium text-dark mb-2">{t('cv')}</label>
                    <div className="relative">
                        <input
                            {...register('cv')}
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            id="cv-upload"
                        />
                        <label
                            htmlFor="cv-upload"
                            className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${errors.cv
                                ? 'border-red-300 bg-red-50 text-red-500 hover:bg-red-100'
                                : fileName
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <UploadCloud className={`w-8 h-8 mb-2 ${fileName ? 'text-primary' : 'text-gray-400'}`} />
                            <span className="text-sm font-medium text-center break-all">
                                {fileName || t('cv')}
                            </span>
                            <span className="text-xs opacity-70 mt-1">PDF, max 5MB</span>
                        </label>
                    </div>
                    {errors.cv && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.cv.message === 'max_size'
                                ? 'Fichier trop volumineux (max 5MB)'
                                : errors.cv.message === 'invalid_type'
                                    ? 'Format PDF uniquement'
                                    : t('error')}
                        </p>
                    )}
                </div>

                {/* Message */}
                <div>
                    <label className="block text-sm font-medium text-dark mb-2">{t('message')}</label>
                    <textarea
                        {...register('message')}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white resize-none"
                        placeholder={t('message')}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full gap-2 py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {status === 'sending' ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {t('sending')}
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            {t('submit')}
                        </>
                    )}
                </button>

                {/* Feedback Messages */}
                <AnimatePresence>
                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg overflow-hidden"
                        >
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-medium">{t('success')}</span>
                            </div>
                            <p className="text-xs text-green-700 ml-7">
                                Votre candidature a été enregistrée avec succès. Notre équipe vous contactera dans les 48h.
                            </p>
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
                            <span className="text-sm font-medium">{t('error')}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
}

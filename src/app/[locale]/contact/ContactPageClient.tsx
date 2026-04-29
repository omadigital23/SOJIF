'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    MapPin,
    Phone,
    Mail,
    MessageCircle,
    Send,
    Loader2,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';
import { COMPANY } from '@/lib/constants';

const getContactSchema = (t: (key: string) => string) => z.object({
    firstName: z.string().min(2, t('errors.min2')),
    lastName: z.string().min(2, t('errors.min2')),
    email: z.string().email(t('errors.invalidEmail')),
    phone: z.string().min(8, t('errors.invalidPhone')),
    company: z.string().min(2, t('errors.companyRequired')),
    domain: z.string().min(2, t('errors.domainRequired')),
    turnover: z.string().min(1, t('errors.turnoverRequired')),
    employees: z.string().min(1, t('errors.employeesRequired')),
    challenge: z.enum(['tax', 'accounting', 'hr', 'other']),
    phase: z.enum(['creation', 'growth', 'restructuring']),
    budget: z.string().min(1, t('errors.budgetRequired')),
    meetingPref: z.enum(['video', 'inPerson']),
    subject: z.string().min(1, t('errors.selectSubject')),
    message: z.string().min(10, t('errors.min10')),
});

type ContactFormData = z.infer<ReturnType<typeof getContactSchema>>;

export default function ContactPageClient() {
    const locale = useLocale();
    const t = useTranslations('contact');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const contactSchema = getContactSchema(t);
    const optionFallbacks = locale === 'fr'
        ? {
            challengeOptions: {
                tax: 'Fiscalité',
                accounting: 'Gestion Comptable',
                hr: 'Structure RH',
                other: 'Autre',
            },
            phaseOptions: {
                creation: 'Création',
                growth: 'Croissance',
                restructuring: 'Restructuration',
            },
            meetingOptions: {
                video: 'Appel Visio',
                inPerson: 'Présentiel',
            },
            subjects: {
                general: 'Demande générale',
                consultation: 'Demande de consultation',
                subscription: 'Offres d\'abonnement',
                digitalization: 'Projet de digitalisation',
                recruitment: 'Recrutement & placement',
                other: 'Autre',
            },
        }
        : {
            challengeOptions: {
                tax: 'Taxation',
                accounting: 'Accounting Management',
                hr: 'HR Structure',
                other: 'Other',
            },
            phaseOptions: {
                creation: 'Creation',
                growth: 'Growth',
                restructuring: 'Restructuring',
            },
            meetingOptions: {
                video: 'Video call',
                inPerson: 'In-person',
            },
            subjects: {
                general: 'General inquiry',
                consultation: 'Consultation request',
                subscription: 'Subscription offers',
                digitalization: 'Digitalization project',
                recruitment: 'Recruitment & placement',
                other: 'Other',
            },
        };
    const translateOption = (key: string, fallback: string) => (
        t.has(key) ? t(key) : fallback
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setStatus('sending');
        try {
            const res = await fetch('/api/contact', {
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
            setTimeout(() => setStatus('idle'), 5000);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const subjects = [
        { value: 'general', label: translateOption('subjects.general', optionFallbacks.subjects.general) },
        { value: 'consultation', label: translateOption('subjects.consultation', optionFallbacks.subjects.consultation) },
        { value: 'subscription', label: translateOption('subjects.subscription', optionFallbacks.subjects.subscription) },
        { value: 'digitalization', label: translateOption('subjects.digitalization', optionFallbacks.subjects.digitalization) },
        { value: 'recruitment', label: translateOption('subjects.recruitment', optionFallbacks.subjects.recruitment) },
        { value: 'other', label: translateOption('subjects.other', optionFallbacks.subjects.other) },
    ];

    const challenges = [
        { value: 'tax', label: translateOption('challengeOptions.tax', optionFallbacks.challengeOptions.tax) },
        { value: 'accounting', label: translateOption('challengeOptions.accounting', optionFallbacks.challengeOptions.accounting) },
        { value: 'hr', label: translateOption('challengeOptions.hr', optionFallbacks.challengeOptions.hr) },
        { value: 'other', label: translateOption('challengeOptions.other', optionFallbacks.challengeOptions.other) },
    ];

    const phases = [
        { value: 'creation', label: translateOption('phaseOptions.creation', optionFallbacks.phaseOptions.creation) },
        { value: 'growth', label: translateOption('phaseOptions.growth', optionFallbacks.phaseOptions.growth) },
        { value: 'restructuring', label: translateOption('phaseOptions.restructuring', optionFallbacks.phaseOptions.restructuring) },
    ];

    const meetingPrefs = [
        { value: 'video', label: translateOption('meetingOptions.video', optionFallbacks.meetingOptions.video) },
        { value: 'inPerson', label: translateOption('meetingOptions.inPerson', optionFallbacks.meetingOptions.inPerson) },
    ];

    return (
        <div className="pt-24 lg:pt-32">
            {/* Header */}
            <section className="section-padding bg-light-gray">
                <div className="container-custom text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl font-bold text-dark mb-4"
                    >
                        {t('title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-gray text-lg"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>
            </section>

            {/* Contact info + Form */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* Info column */}
                        <div className="lg:col-span-2">
                            <div className="space-y-8">
                                {/* Address */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-dark mb-1">{t('addressLabel')}</h3>
                                        <p className="text-neutral-gray text-sm">{COMPANY.address}</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-dark mb-1">{t('phoneLabel')}</h3>
                                        <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="text-neutral-gray text-sm hover:text-primary transition-colors">
                                            {COMPANY.phoneDisplay}
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-dark mb-1">{t('emailLabel')}</h3>
                                        <a href={`mailto:${COMPANY.email}`} className="text-neutral-gray text-sm hover:text-primary transition-colors">
                                            {COMPANY.email}
                                        </a>
                                    </div>
                                </div>

                                {/* WhatsApp */}
                                <a
                                    href={`https://wa.me/${COMPANY.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 bg-green-500 text-white px-6 py-4 rounded-xl font-semibold transition-all hover:bg-green-600 hover:shadow-lg"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    {t('whatsappCta')}
                                </a>
                            </div>

                            {/* Map */}
                            <div className="mt-10 rounded-2xl overflow-hidden h-64 bg-light-gray">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.5!2d-17.4441!3d14.7167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQzJzAwLjAiTiAxN8KwMjYnMzkuMCJX!5e0!3m2!1sfr!2ssn!4v1"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="SOJIF Consulting - Dakar, Sénégal"
                                />
                            </div>
                        </div>

                        {/* Form column */}
                        <div className="lg:col-span-3">
                            <div className="bg-light-gray rounded-2xl p-8 lg:p-10">
                                <h2 className="text-2xl font-bold text-dark mb-8">{t('formTitle')}</h2>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                    {/* Section: Director & Contact */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-dark border-b border-gray-100 pb-2">
                                            {t('sectionDirector')}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="contact-firstName" className="block text-sm font-medium text-dark mb-2">{t('firstName')}</label>
                                                <input
                                                    id="contact-firstName"
                                                    {...register('firstName')}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                                                    placeholder={t('firstName')}
                                                />
                                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="contact-lastName" className="block text-sm font-medium text-dark mb-2">{t('lastName')}</label>
                                                <input
                                                    id="contact-lastName"
                                                    {...register('lastName')}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                                                    placeholder={t('lastName')}
                                                />
                                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="contact-email" className="block text-sm font-medium text-dark mb-2">{t('email')}</label>
                                                <input
                                                    id="contact-email"
                                                    type="email"
                                                    {...register('email')}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                                                    placeholder={t('email')}
                                                />
                                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="contact-phone" className="block text-sm font-medium text-dark mb-2">{t('phone')}</label>
                                                <input
                                                    id="contact-phone"
                                                    type="tel"
                                                    {...register('phone')}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                                                    placeholder={t('phone')}
                                                />
                                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section: Company Info */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-dark border-b border-gray-100 pb-2">
                                            {t('sectionCompany')}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="contact-company" className="block text-sm font-medium text-dark mb-2">{t('company')}</label>
                                                <input
                                                    id="contact-company"
                                                    {...register('company')}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                                                    placeholder={t('company')}
                                                />
                                                {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="contact-domain" className="block text-sm font-medium text-dark mb-2">{t('domainLabel')}</label>
                                                <input
                                                    id="contact-domain"
                                                    {...register('domain')}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                                                    placeholder={t('placeholders.domain')}
                                                />
                                                {errors.domain && <p className="text-red-500 text-xs mt-1">{errors.domain.message}</p>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="contact-turnover" className="block text-sm font-medium text-dark mb-2">{t('turnoverLabel')}</label>
                                                <input
                                                    id="contact-turnover"
                                                    {...register('turnover')}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                                                    placeholder={t('placeholders.turnover')}
                                                />
                                                {errors.turnover && <p className="text-red-500 text-xs mt-1">{errors.turnover.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="contact-employees" className="block text-sm font-medium text-dark mb-2">{t('employeesLabel')}</label>
                                                <input
                                                    id="contact-employees"
                                                    {...register('employees')}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                                                    placeholder={t('placeholders.employees')}
                                                />
                                                {errors.employees && <p className="text-red-500 text-xs mt-1">{errors.employees.message}</p>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="contact-phase" className="block text-sm font-medium text-dark mb-2">{t('phaseLabel')}</label>
                                                <select
                                                    id="contact-phase"
                                                    {...register('phase')}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                                                >
                                                    <option value="">{t('placeholders.select')}</option>
                                                    {phases.map((p) => (
                                                        <option key={p.value} value={p.value}>{p.label}</option>
                                                    ))}
                                                </select>
                                                {errors.phase && <p className="text-red-500 text-xs mt-1">{errors.phase.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="contact-budget" className="block text-sm font-medium text-dark mb-2">{t('budgetLabel')}</label>
                                                <input
                                                    id="contact-budget"
                                                    {...register('budget')}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                                                    placeholder={t('placeholders.budget')}
                                                />
                                                {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section: Challenge & Project */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-dark border-b border-gray-100 pb-2">
                                            {t('sectionChallenge')}
                                        </h3>
                                        <div>
                                            <label className="block text-sm font-medium text-dark mb-3">{t('challengeLabel')}</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label={t('challengeLabel')}>
                                                {challenges.map((c) => (
                                                    <label key={c.value} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg cursor-pointer hover:bg-primary/5 transition-colors">
                                                        <input
                                                            type="radio"
                                                            value={c.value}
                                                            {...register('challenge')}
                                                            className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                                                        />
                                                        <span className="text-sm text-dark">{c.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.challenge && <p className="text-red-500 text-xs mt-1">{errors.challenge.message}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="contact-subject" className="block text-sm font-medium text-dark mb-2">{t('subject')}</label>
                                                <select
                                                    id="contact-subject"
                                                    {...register('subject')}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                                                >
                                                    <option value="">{t('subject')}</option>
                                                    {subjects.map((s) => (
                                                        <option key={s.value} value={s.value}>{s.label}</option>
                                                    ))}
                                                </select>
                                                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="contact-meetingPref" className="block text-sm font-medium text-dark mb-2">{t('meetingLabel')}</label>
                                                <select
                                                    id="contact-meetingPref"
                                                    {...register('meetingPref')}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                                                >
                                                    <option value="">{t('placeholders.select')}</option>
                                                    {meetingPrefs.map((m) => (
                                                        <option key={m.value} value={m.value}>{m.label}</option>
                                                    ))}
                                                </select>
                                                {errors.meetingPref && <p className="text-red-500 text-xs mt-1">{errors.meetingPref.message}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="contact-message" className="block text-sm font-medium text-dark mb-2">{t('message')}</label>
                                            <textarea
                                                id="contact-message"
                                                {...register('message')}
                                                rows={4}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white resize-none"
                                                placeholder={t('message')}
                                            />
                                            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="btn-primary w-full gap-2 py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                {t('sending')}
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                {t('send')}
                                            </>
                                        )}
                                    </button>

                                    {status === 'success' && (
                                        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg" role="alert">
                                            <CheckCircle className="w-5 h-5" />
                                            <span className="text-sm font-medium">{t('success')}</span>
                                        </div>
                                    )}
                                    {status === 'error' && (
                                        <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg" role="alert">
                                            <AlertCircle className="w-5 h-5" />
                                            <span className="text-sm font-medium">{t('error')}</span>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

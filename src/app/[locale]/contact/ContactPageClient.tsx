'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    MapPin,
    Phone,
    Mail,
    Clock3,
    Navigation,
    Send,
    Loader2,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { ContactSignalVisual } from '@/components/visuals/BusinessVisuals';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

const emptyToUndefined = (value: unknown) => (
    value === null || (typeof value === 'string' && value.trim() === '') ? undefined : value
);

const optionalText = z.preprocess(emptyToUndefined, z.string().optional());

const optionalMinText = (min: number, message: string) => z.preprocess(
    emptyToUndefined,
    z.string().min(min, message).optional()
);

const optionalEnum = <T extends [string, ...string[]]>(values: T) => z.preprocess(
    emptyToUndefined,
    z.enum(values).optional()
);

const getContactSchema = (t: (key: string) => string) => z.object({
    firstName: z.string().min(2, t('errors.min2')),
    lastName: z.string().min(2, t('errors.min2')),
    email: z.string().email(t('errors.invalidEmail')),
    phone: z.string().min(8, t('errors.invalidPhone')),
    company: optionalMinText(2, t('errors.min2')),
    domain: optionalText,
    turnover: optionalText,
    employees: optionalText,
    challenge: optionalEnum(['tax', 'accounting', 'hr', 'other']),
    phase: optionalEnum(['creation', 'growth', 'restructuring']),
    budget: optionalText,
    meetingPref: optionalEnum(['video', 'inPerson']),
    subject: z.string().min(1, t('errors.selectSubject')),
    message: z.string().min(10, t('errors.min10')),
});

type ContactFormData = z.infer<ReturnType<typeof getContactSchema>>;

export default function ContactPageClient() {
    const t = useTranslations('contact');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const contactSchema = getContactSchema(t);
    const contactHighlights = [
        { icon: Clock3, label: t('highlights.responseLabel'), value: t('highlights.responseValue') },
        { icon: Navigation, label: t('highlights.meetingLabel'), value: t('highlights.meetingValue') },
    ];

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
        { value: 'general', label: t('subjects.general') },
        { value: 'consultation', label: t('subjects.consultation') },
        { value: 'subscription', label: t('subjects.subscription') },
        { value: 'digitalization', label: t('subjects.digitalization') },
        { value: 'odooTraining', label: t('subjects.odooTraining') },
        { value: 'recruitment', label: t('subjects.recruitment') },
        { value: 'other', label: t('subjects.other') },
    ];

    const challenges = [
        { value: 'tax', label: t('challengeOptions.tax') },
        { value: 'accounting', label: t('challengeOptions.accounting') },
        { value: 'hr', label: t('challengeOptions.hr') },
        { value: 'other', label: t('challengeOptions.other') },
    ];

    const phases = [
        { value: 'creation', label: t('phaseOptions.creation') },
        { value: 'growth', label: t('phaseOptions.growth') },
        { value: 'restructuring', label: t('phaseOptions.restructuring') },
    ];

    const meetingPrefs = [
        { value: 'video', label: t('meetingOptions.video') },
        { value: 'inPerson', label: t('meetingOptions.inPerson') },
    ];

    return (
        <div className="pt-20 lg:pt-24">
            {/* Header */}
            <section className="bg-light-gray py-14 lg:py-20">
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
            <section className="bg-white py-12 lg:py-16">
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
                                    className="group relative flex items-center gap-3 overflow-visible rounded-xl bg-[#25D366] px-6 py-4 font-semibold text-white shadow-[0_16px_30px_rgba(7,94,84,0.22)] ring-1 ring-white/40 transition-all hover:-translate-y-0.5 hover:bg-[#1FC45C] hover:shadow-[0_20px_38px_rgba(7,94,84,0.3)]"
                                >
                                    <span aria-hidden="true" className="pointer-events-none absolute inset-[-5px] rounded-xl bg-[#25D366]/15 blur-md" />
                                    <WhatsAppIcon className="relative h-5 w-5 drop-shadow-sm" />
                                    <span className="relative">{t('whatsappCta')}</span>
                                </a>
                            </div>

                            {/* Visit card */}
                            <div className="mt-10 rounded-2xl bg-dark p-6 text-white shadow-xl shadow-slate-950/10">
                                <div className="mb-8 flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                                            SOJIF Consulting
                                        </p>
                                        <h3 className="mt-2 text-2xl font-black">Dakar</h3>
                                        <p className="mt-1 text-sm text-white/65">{COMPANY.address}</p>
                                    </div>
                                    <div className="rounded-full border border-white/10 bg-white/10 p-3">
                                        <MapPin className="h-5 w-5 text-secondary" aria-hidden="true" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {contactHighlights.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div key={item.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-4">
                                                <Icon className="h-4 w-4 text-secondary" aria-hidden="true" />
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.14em] text-white/45">{item.label}</p>
                                                    <p className="text-sm font-semibold">{item.value}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <ContactSignalVisual />
                            </div>
                        </div>

                        {/* Form column */}
                        <div className="lg:col-span-3">
                            <div className="bg-light-gray rounded-2xl p-6 lg:p-8">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-dark">{t('formTitle')}</h2>
                                    <p className="text-sm text-neutral-gray mt-2">{t('formHint')}</p>
                                </div>

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
                                    <details className="group rounded-xl border border-gray-200 bg-white p-4">
                                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-dark">
                                            <span>{t('sectionCompany')}</span>
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary transition-transform group-open:rotate-45">
                                                +
                                            </span>
                                        </summary>
                                        <div className="mt-6 space-y-6">
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
                                    </details>

                                    {/* Section: Challenge & Project */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-dark border-b border-gray-100 pb-2">
                                            {t('sectionChallenge')}
                                        </h3>
                                        <details className="group rounded-xl border border-gray-200 bg-white p-4">
                                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-dark">
                                                <span>{t('challengeLabel')}</span>
                                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary transition-transform group-open:rotate-45">
                                                    +
                                                </span>
                                            </summary>
                                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label={t('challengeLabel')}>
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
                                        </details>

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

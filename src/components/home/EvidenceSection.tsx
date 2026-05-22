'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    CalendarCheck2,
    CheckCircle2,
    FileCheck2,
    FolderCheck,
    GraduationCap,
    ShieldCheck,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';

const metricItems = [0, 1, 2];
const documentItems = [
    { key: 0, icon: FileCheck2, tone: 'bg-amber-100 text-amber-700' },
    { key: 1, icon: CalendarCheck2, tone: 'bg-blue-100 text-blue-700' },
    { key: 2, icon: GraduationCap, tone: 'bg-emerald-100 text-emerald-700' },
];
const checkItems = [0, 1, 2];

export default function EvidenceSection() {
    const t = useTranslations('home');

    return (
        <section className="relative overflow-hidden border-b border-slate-200 bg-white py-16 lg:py-20">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.035]" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
                    <motion.div
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary">
                            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                            {t('evidence.label')}
                        </div>
                        <h2 className="mt-5 max-w-2xl text-3xl font-black leading-tight text-dark sm:text-4xl lg:text-5xl">
                            {t('evidence.title')}
                        </h2>
                        <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-gray sm:text-lg">
                            {t('evidence.desc')}
                        </p>

                        <div className="mt-8 grid grid-cols-3 gap-3 max-[420px]:grid-cols-1">
                            {metricItems.map((item) => (
                                <div key={item} className="border-l-2 border-primary/20 pl-4">
                                    <div className="text-2xl font-black text-dark">
                                        {t(`evidence.metrics.${item}.value`)}
                                    </div>
                                    <div className="mt-1 text-sm font-medium leading-snug text-neutral-gray">
                                        {t(`evidence.metrics.${item}.label`)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/contact"
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-dark px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary active:scale-[0.98]"
                        >
                            {t('evidence.cta')}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </motion.div>

                    <motion.figure
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white shadow-2xl shadow-slate-950/10 sm:p-5"
                    >
                        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:28px_28px]" />
                        <div className="relative z-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                            <div className="rounded-xl bg-white p-5 text-dark">
                                <div className="mb-6 flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                                            {t('evidence.deliverableLabel')}
                                        </p>
                                        <h3 className="mt-2 text-2xl font-black">
                                            {t('evidence.deliverableTitle')}
                                        </h3>
                                    </div>
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
                                        <Image
                                            src="/images/sojif-mark.png"
                                            alt=""
                                            width={32}
                                            height={32}
                                            className="h-8 w-8 object-contain"
                                        />
                                    </div>
                                </div>

                                <p className="max-w-md text-sm leading-relaxed text-slate-600">
                                    {t('evidence.deliverableDesc')}
                                </p>

                                <div className="mt-6 space-y-3">
                                    {documentItems.map(({ key, icon: Icon, tone }) => (
                                        <div
                                            key={key}
                                            className="grid grid-cols-[2.75rem_1fr_auto] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
                                        >
                                            <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${tone}`}>
                                                <Icon className="h-5 w-5" aria-hidden="true" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="truncate text-sm font-black text-dark">
                                                    {t(`evidence.documents.${key}.title`)}
                                                </h4>
                                                <p className="mt-1 truncate text-xs font-medium text-slate-500">
                                                    {t(`evidence.documents.${key}.meta`)}
                                                </p>
                                            </div>
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden="true" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col justify-between gap-4">
                                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-5">
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10">
                                            <FolderCheck className="h-5 w-5 text-secondary" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                                                {t('evidence.checklistLabel')}
                                            </p>
                                            <p className="mt-1 text-lg font-black text-white">
                                                {t('evidence.checklistTitle')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {checkItems.map((item) => (
                                            <div key={item} className="flex items-start gap-3">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                                                <span className="text-sm font-medium leading-relaxed text-white/78">
                                                    {t(`evidence.checks.${item}`)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-xl border border-amber-300/20 bg-amber-300/10 p-5">
                                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-200">
                                        {t('evidence.noteLabel')}
                                    </p>
                                    <p className="mt-2 text-sm font-medium leading-relaxed text-white/82">
                                        {t('evidence.note')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.figure>
                </div>
            </div>
        </section>
    );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import type { ElementType } from 'react';
import {
    BarChart3,
    BriefcaseBusiness,
    Building2,
    CalendarCheck2,
    Calculator,
    CheckCircle2,
    CircleDollarSign,
    ClipboardCheck,
    FileCheck2,
    Globe2,
    GraduationCap,
    LayoutDashboard,
    Monitor,
    Palette,
    Scale,
    Search,
    Settings,
    ShieldCheck,
    ShoppingCart,
    Smartphone,
    TrendingUp,
    UserPlus,
    UserRoundCheck,
    Users,
    Workflow,
} from 'lucide-react';

type DepartmentSlug = 'droit' | 'fiscalite' | 'rh' | 'conseil' | 'digitalisation' | 'recrutement';

const departmentVisuals: Record<DepartmentSlug, {
    icon: ElementType;
    bg: string;
    accent: string;
    line: string;
    label: string;
    bars: string[];
}> = {
    droit: {
        icon: Scale,
        bg: 'bg-slate-950',
        accent: 'bg-amber-400',
        line: 'bg-amber-300/80',
        label: 'OHADA',
        bars: ['w-20', 'w-28', 'w-16'],
    },
    fiscalite: {
        icon: Calculator,
        bg: 'bg-blue-950',
        accent: 'bg-sky-400',
        line: 'bg-sky-300/80',
        label: 'SYSCOHADA',
        bars: ['w-24', 'w-14', 'w-28'],
    },
    rh: {
        icon: Users,
        bg: 'bg-emerald-950',
        accent: 'bg-emerald-400',
        line: 'bg-emerald-300/80',
        label: 'Talents',
        bars: ['w-16', 'w-28', 'w-20'],
    },
    conseil: {
        icon: TrendingUp,
        bg: 'bg-indigo-950',
        accent: 'bg-violet-400',
        line: 'bg-violet-300/80',
        label: 'Pilotage',
        bars: ['w-28', 'w-20', 'w-24'],
    },
    digitalisation: {
        icon: Monitor,
        bg: 'bg-cyan-950',
        accent: 'bg-cyan-300',
        line: 'bg-cyan-200/80',
        label: 'Digital',
        bars: ['w-16', 'w-28', 'w-24'],
    },
    recrutement: {
        icon: UserPlus,
        bg: 'bg-zinc-950',
        accent: 'bg-lime-300',
        line: 'bg-lime-200/80',
        label: 'Matching',
        bars: ['w-20', 'w-14', 'w-28'],
    },
};

const digitalIcons = [Globe2, ShoppingCart, LayoutDashboard, Smartphone, Settings, Palette, GraduationCap];

const visualCopy = {
    fr: {
        diagnostic: 'Diagnostic 360',
        pilotage: 'SOJIF Pilotage',
        plan: 'Plan priorisé',
        workflows: ['Conformité', 'Trésorerie', 'Équipe', 'Digital'],
        brief: 'Brief actif',
        stages: ['Analyse', 'Risques', 'Actions'],
        valid: 'Valide',
        digitalStack: 'Stack digitale',
        talentPipeline: 'Talent pipeline',
        hiringPipeline: 'Hiring pipeline',
        qualifiedProfile: 'Profil qualifié',
        executiveNeed: 'Besoin cadre',
        active: 'Actif',
        candidateCards: ['CV', 'Score', 'Entretien', 'Base'],
        companyCards: ['Brief', 'Shortlist', 'Validation', 'Onboarding'],
        diagnosticCircuit: 'Circuit diagnostic',
        contactSignals: ['Message reçu', 'Analyse du besoin', 'Retour priorisé'],
        offerStudio: 'Pilotage offres',
        offerTracks: ['Juridique', 'Finance', 'Fiscal', 'RH'],
        offerProof: ['Couverture annuelle', 'Suivi trimestriel', 'Support priorisé'],
        aboutStudio: 'Identité SOJIF',
        aboutSignals: ['Dakar', 'Droit', 'Finance', 'Développement'],
        brandSystem: 'Performance structurée',
    },
    en: {
        diagnostic: '360 diagnostic',
        pilotage: 'SOJIF cockpit',
        plan: 'Prioritized plan',
        workflows: ['Compliance', 'Cash flow', 'Team', 'Digital'],
        brief: 'Active brief',
        stages: ['Analysis', 'Risks', 'Actions'],
        valid: 'Ready',
        digitalStack: 'Digital stack',
        talentPipeline: 'Talent pipeline',
        hiringPipeline: 'Hiring pipeline',
        qualifiedProfile: 'Qualified profile',
        executiveNeed: 'Executive need',
        active: 'Active',
        candidateCards: ['CV', 'Score', 'Interview', 'Pool'],
        companyCards: ['Brief', 'Shortlist', 'Validation', 'Onboarding'],
        diagnosticCircuit: 'Diagnostic flow',
        contactSignals: ['Message received', 'Need analysis', 'Priority reply'],
        offerStudio: 'Offer cockpit',
        offerTracks: ['Legal', 'Finance', 'Tax', 'HR'],
        offerProof: ['Annual coverage', 'Quarterly steering', 'Priority support'],
        aboutStudio: 'SOJIF identity',
        aboutSignals: ['Dakar', 'Law', 'Finance', 'Development'],
        brandSystem: 'Structured performance',
    },
};

function useVisualCopy() {
    const locale = useLocale();
    return locale === 'en' ? visualCopy.en : visualCopy.fr;
}

export function HeroMotionVisual({
    quote,
    labels,
}: {
    quote: string;
    labels: string[];
}) {
    const copy = useVisualCopy();
    const tracks = [
        { label: labels[0], value: '92%', color: 'bg-amber-400', icon: ShieldCheck },
        { label: labels[1], value: '78%', color: 'bg-sky-400', icon: BarChart3 },
        { label: labels[2], value: '64%', color: 'bg-emerald-400', icon: UserRoundCheck },
    ];

    return (
        <figure className="relative hidden min-h-[560px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-slate-950/20 lg:block">
            <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:36px_36px]" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">{copy.diagnostic}</p>
                        <p className="mt-2 text-2xl font-black text-white">{copy.pilotage}</p>
                    </div>
                    <div className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-200">
                        24h
                    </div>
                </div>

                <div className="grid grid-cols-[0.8fr_1.2fr] gap-5">
                    <div className="space-y-3">
                        {tracks.map((track, index) => {
                            const Icon = track.icon;

                            return (
                                <motion.div
                                    key={track.label}
                                    initial={{ opacity: 0, x: -18 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + index * 0.12 }}
                                    className="rounded-xl border border-white/10 bg-white/[0.06] p-4"
                                >
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                                            <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{track.label}</p>
                                            <p className="text-xs text-white/45">{track.value}</p>
                                        </div>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: track.value }}
                                            transition={{ duration: 1, delay: 0.45 + index * 0.1 }}
                                            className={`h-full rounded-full ${track.color}`}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="rounded-xl border border-white/10 bg-slate-950/55 p-5">
                        <div className="mb-5 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-bold text-white">
                                <Workflow className="h-4 w-4 text-primary-400" aria-hidden="true" />
                                {copy.plan}
                            </div>
                            <div className="flex gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                <span className="h-2 w-2 rounded-full bg-amber-400" />
                                <span className="h-2 w-2 rounded-full bg-sky-400" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {copy.workflows.map((item, index) => (
                                <div key={item} className="grid grid-cols-[5.5rem_1fr] items-center gap-3">
                                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">{item}</span>
                                    <div className="relative h-8 overflow-hidden rounded-lg bg-white/[0.06]">
                                        <motion.div
                                            animate={{ x: ['-18%', '72%', '-18%'] }}
                                            transition={{ duration: 4.2 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                                            className="absolute top-0 h-full w-16 bg-white/10"
                                        />
                                        <div className="absolute inset-y-2 left-3 right-6 rounded-full bg-white/10">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${58 + index * 9}%` }}
                                                transition={{ duration: 0.9, delay: 0.65 + index * 0.12 }}
                                                className="h-full rounded-full bg-primary-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.05] p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">{copy.brief}</p>
                            <p className="mt-2 text-base leading-relaxed text-white/80">&quot;{quote}&quot;</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {copy.stages.map((item, index) => (
                        <motion.div
                            key={item}
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.35 }}
                            className="rounded-xl border border-white/10 bg-white/[0.06] p-4"
                        >
                            <p className="text-xs uppercase tracking-[0.16em] text-white/45">{item}</p>
                            <div className="mt-3 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                                <span className="text-sm font-bold text-white">{copy.valid}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </figure>
    );
}

export function DepartmentCardVisual({ slug }: { slug: string }) {
    const visualKey: DepartmentSlug = slug in departmentVisuals ? (slug as DepartmentSlug) : 'droit';
    const visual = departmentVisuals[visualKey];
    const Icon = visual.icon;

    return (
        <div className={`relative h-36 overflow-hidden ${visual.bg}`}>
            <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                <Icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white/80">
                {visual.label}
            </div>
            <div className="absolute bottom-5 left-5 right-5 space-y-2">
                {visual.bars.map((bar, index) => (
                    <motion.div
                        key={`${bar}-${index}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: index * 0.08 }}
                        className={`h-2 origin-left rounded-full ${index === 0 ? visual.accent : visual.line} ${bar}`}
                    />
                ))}
            </div>
            <motion.div
                animate={{ x: ['-20%', '115%'] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-y-0 w-16 bg-white/10"
            />
        </div>
    );
}

export function DigitalHeroVisual() {
    const copy = useVisualCopy();

    return (
        <figure className="relative mx-auto mt-12 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 lg:mt-0">
            <div className="rounded-xl bg-slate-950 p-4 shadow-2xl shadow-slate-950/20">
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{copy.digitalStack}</span>
                </div>
                <div className="grid grid-cols-[0.8fr_1.2fr] gap-4">
                    <div className="space-y-3">
                        {['CRM', 'Site', 'App', 'Data'].map((item, index) => (
                            <div key={item} className="rounded-lg bg-white/[0.06] p-3">
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-primary-400" />
                                    <span className="text-xs font-bold text-white">{item}</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-white/10">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${48 + index * 12}%` }}
                                        transition={{ duration: 0.9, delay: 0.2 + index * 0.12 }}
                                        className="h-full rounded-full bg-cyan-300"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="rounded-lg bg-white p-4">
                        <div className="mb-4 grid grid-cols-3 gap-2">
                            {[62, 84, 47].map((height, index) => (
                                <div key={height} className="flex h-24 items-end rounded-lg bg-slate-100 p-2">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ duration: 0.8, delay: 0.4 + index * 0.15 }}
                                        className="w-full rounded-md bg-primary"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 rounded-full bg-slate-200" />
                            <div className="h-2 w-2/3 rounded-full bg-slate-200" />
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <div className="h-10 rounded-lg bg-emerald-100" />
                                <div className="h-10 rounded-lg bg-amber-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </figure>
    );
}

export function DigitalServiceVisual({ index }: { index: number }) {
    const Icon = digitalIcons[index] || Globe2;

    return (
        <div className="relative mb-6 h-32 overflow-hidden rounded-xl bg-slate-950">
            <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-lg bg-white text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                {[50, 72, 60].map((height, itemIndex) => (
                    <div key={`${height}-${itemIndex}`} className="flex h-14 items-end rounded-md bg-white/10 p-1.5">
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${height}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: itemIndex * 0.08 }}
                            className="w-full rounded-sm bg-cyan-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function RecruitmentPipelineVisual({ mode }: { mode: 'candidate' | 'company' }) {
    const copy = useVisualCopy();
    const isCandidate = mode === 'candidate';
    const Icon = isCandidate ? Search : Building2;
    const cards = isCandidate
        ? copy.candidateCards
        : copy.companyCards;

    return (
        <div className="mb-8 rounded-xl border border-white/10 bg-white/[0.05] p-4">
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                            {isCandidate ? copy.talentPipeline : copy.hiringPipeline}
                        </p>
                        <p className="text-sm font-bold text-white">
                            {isCandidate ? copy.qualifiedProfile : copy.executiveNeed}
                        </p>
                    </div>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
                    {copy.active}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {cards.map((card, index) => (
                    <motion.div
                        key={card}
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.2 }}
                        className="rounded-lg bg-white/[0.06] p-3"
                    >
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm font-bold text-white">{card}</span>
                            <CheckCircle2 className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${58 + index * 10}%` }}
                                transition={{ duration: 0.8, delay: 0.25 + index * 0.1 }}
                                className="h-full rounded-full bg-primary-400"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export function ContactSignalVisual() {
    const copy = useVisualCopy();
    const signals = [
        { label: copy.contactSignals[0], icon: FileCheck2 },
        { label: copy.contactSignals[1], icon: Search },
        { label: copy.contactSignals[2], icon: CheckCircle2 },
    ];

    return (
        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.05] p-4">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
                <BriefcaseBusiness className="h-4 w-4 text-secondary" aria-hidden="true" />
                {copy.diagnosticCircuit}
            </div>
            <div className="space-y-3">
                {signals.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div key={item.label} className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                                <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                            </div>
                            <div className="h-1.5 flex-1 rounded-full bg-white/10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${62 + index * 12}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: index * 0.1 }}
                                    className="h-full rounded-full bg-secondary"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export function OffersHeroVisual() {
    const copy = useVisualCopy();
    const planHeights = [46, 72, 92];

    return (
        <figure className="relative mx-auto mt-12 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20 lg:mt-0">
            <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">{copy.offerStudio}</p>
                        <p className="mt-2 text-2xl font-black text-white">Essentiel / Croissance / Prestige</p>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-primary">
                        <CircleDollarSign className="h-6 w-6" aria-hidden="true" />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {planHeights.map((height, index) => (
                        <motion.div
                            key={height}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.12 }}
                            className={`relative flex h-44 flex-col justify-end overflow-hidden rounded-xl p-3 ${index === 1 ? 'bg-primary' : 'bg-white/[0.07]'}`}
                        >
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ duration: 0.8, delay: 0.25 + index * 0.12 }}
                                className={`absolute inset-x-3 bottom-12 rounded-t-lg ${index === 1 ? 'bg-white/35' : 'bg-secondary/80'}`}
                            />
                            <div className="relative z-10">
                                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Pack {index + 1}</p>
                                <p className="mt-1 text-lg font-black text-white">{height}%</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {copy.offerTracks.map((item, index) => (
                        <div key={item} className="flex items-center gap-3 rounded-xl bg-white/[0.06] p-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                                <ClipboardCheck className="h-4 w-4 text-secondary" aria-hidden="true" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-bold text-white">{item}</p>
                                <div className="mt-2 h-1.5 rounded-full bg-white/10">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${58 + index * 10}%` }}
                                        transition={{ duration: 0.75, delay: 0.35 + index * 0.1 }}
                                        className="h-full rounded-full bg-secondary"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                    {copy.offerProof.map((item, index) => (
                        <motion.span
                            key={item}
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.25 }}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-bold text-white/80"
                        >
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                            {item}
                        </motion.span>
                    ))}
                </div>
            </div>
        </figure>
    );
}

export function OfferPackVisual({ index, highlighted }: { index: number; highlighted: boolean }) {
    const Icon = [ClipboardCheck, BarChart3, CalendarCheck2][index] || ClipboardCheck;
    const rows = [56 + index * 8, 72 + index * 7, 48 + index * 12];

    return (
        <div className={`mb-6 overflow-hidden rounded-xl border ${highlighted ? 'border-white/15 bg-white/10' : 'border-slate-200 bg-slate-950'}`}>
            <div className="relative h-32 p-4">
                <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.45)_1px,transparent_1px)] [background-size:20px_20px]" />
                <div className="relative z-10 flex h-full items-end justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="flex flex-1 items-end justify-end gap-2">
                        {rows.map((height, rowIndex) => (
                            <div key={`${height}-${rowIndex}`} className="flex h-20 w-full max-w-12 items-end rounded-md bg-white/10 p-1.5">
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${height}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.65, delay: rowIndex * 0.08 }}
                                    className={`w-full rounded-sm ${rowIndex === 1 ? 'bg-secondary' : 'bg-primary-400'}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AboutIdentityVisual() {
    const copy = useVisualCopy();

    return (
        <figure className="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-5 shadow-2xl shadow-slate-950/10">
            <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:30px_30px]" />
            <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">{copy.aboutStudio}</p>
                        <p className="mt-2 text-xl font-black text-white">{copy.brandSystem}</p>
                    </div>
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
                        2026
                    </span>
                </div>

                <div className="rounded-xl bg-white p-5">
                    <Image
                        src="/images/logo-sojif-premium-transparent.png"
                        alt="SOJIF Consulting"
                        width={420}
                        height={128}
                        className="h-auto w-full"
                        priority
                    />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    {copy.aboutSignals.map((item, index) => (
                        <motion.div
                            key={item}
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                            className="rounded-xl bg-white/[0.06] p-3"
                        >
                            <div className="mb-3 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-secondary" />
                                <p className="text-sm font-bold text-white">{item}</p>
                            </div>
                            <div className="h-1.5 rounded-full bg-white/10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${58 + index * 9}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: index * 0.08 }}
                                    className="h-full rounded-full bg-primary-400"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </figure>
    );
}

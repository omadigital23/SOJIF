'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lock,
    Mail,
    LogOut,
    CreditCard,
    FileText,
    CheckCircle,
    AlertCircle,
    Loader2,
    ArrowRight,
    ExternalLink,
} from 'lucide-react';

interface UserData {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

interface Subscription {
    id: string;
    status: string;
    start_date: string;
    pack_id: string | null;
}

interface Payment {
    id: string;
    amount: number;
    currency: string;
    status: string;
    description: string;
    created_at: string;
}

interface Document {
    id: string;
    type: string;
    file_name: string;
    file_url: string;
    created_at: string;
}

interface DashboardData {
    user: UserData;
    subscription: Subscription | null;
    payments: Payment[];
    documents: Document[];
}

function formatAmount(amount: number, currency: string) {
    return new Intl.NumberFormat('fr-FR', { style: 'decimal' }).format(amount) + ' ' + currency;
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export default function ClientAreaPageClient() {
    const t = useTranslations('clientArea');
    const { locale } = useParams();

    const [token, setToken] = useState<string | null>(null);
    const [dashboard, setDashboard] = useState<DashboardData | null>(null);
    const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const [loginError, setLoginError] = useState('');
    const [dashLoading, setDashLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Load token from sessionStorage on mount
    useEffect(() => {
        const stored = sessionStorage.getItem('sojif_token');
        if (stored) setToken(stored);
    }, []);

    const fetchDashboard = useCallback(async (accessToken: string) => {
        setDashLoading(true);
        try {
            const res = await fetch('/api/auth/dashboard', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const data = await res.json();
            if (data.success) {
                setDashboard(data);
            } else {
                // Token expired or invalid
                sessionStorage.removeItem('sojif_token');
                setToken(null);
            }
        } catch {
            sessionStorage.removeItem('sojif_token');
            setToken(null);
        } finally {
            setDashLoading(false);
        }
    }, []);

    useEffect(() => {
        if (token) fetchDashboard(token);
    }, [token, fetchDashboard]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginStatus('loading');
        setLoginError('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.success) {
                sessionStorage.setItem('sojif_token', data.accessToken);
                setToken(data.accessToken);
                setLoginStatus('idle');
            } else {
                setLoginError(data.message ?? t('errorInvalid'));
                setLoginStatus('error');
            }
        } catch {
            setLoginError(t('errorGeneric'));
            setLoginStatus('error');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('sojif_token');
        setToken(null);
        setDashboard(null);
        setEmail('');
        setPassword('');
    };

    // ─── Dashboard view ──────────────────────────────────────────────────────
    if (token) {
        if (dashLoading) {
            return (
                <div className="pt-24 lg:pt-32 min-h-screen flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            );
        }

        if (!dashboard) return null;

        const { user, subscription, payments, documents } = dashboard;

        return (
            <div className="pt-24 lg:pt-32">
                {/* Header */}
                <section className="gradient-dark py-16">
                    <div className="container-custom flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">{t('dashboardTitle')}</h1>
                            <p className="text-white/70">
                                {user.firstName} {user.lastName} · {user.email}
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            {t('logout')}
                        </button>
                    </div>
                </section>

                <section className="section-padding bg-light-gray">
                    <div className="container-custom space-y-8">

                        {/* Subscription */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-primary" />
                                {t('subscription')}
                            </h2>
                            {subscription ? (
                                <div className="flex flex-wrap gap-6">
                                    <div>
                                        <span className="text-xs text-neutral-gray uppercase tracking-wide">{t('statusLabel')}</span>
                                        <div className={`mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${subscription.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                                            {subscription.status === 'active' ? t('subscriptionActive') : t('subscriptionInactive')}
                                        </div>
                                    </div>
                                    {subscription.pack_id && (
                                        <div>
                                            <span className="text-xs text-neutral-gray uppercase tracking-wide">{t('packLabel')}</span>
                                            <p className="mt-1 font-semibold text-dark">{subscription.pack_id}</p>
                                        </div>
                                    )}
                                    {subscription.start_date && (
                                        <div>
                                            <span className="text-xs text-neutral-gray uppercase tracking-wide">{t('startDate')}</span>
                                            <p className="mt-1 font-semibold text-dark">{formatDate(subscription.start_date)}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <p className="text-neutral-gray">{t('subscriptionNone')}</p>
                                    <Link
                                        href={`/${locale}/offres`}
                                        className="btn-primary gap-2 text-sm py-2.5"
                                    >
                                        Voir les offres <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Documents */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-3">
                                <FileText className="w-5 h-5 text-primary" />
                                {t('documents')}
                            </h2>
                            {documents.length === 0 ? (
                                <p className="text-neutral-gray">{t('noDocuments')}</p>
                            ) : (
                                <ul className="divide-y divide-gray-50">
                                    {documents.map((doc) => (
                                        <li key={doc.id} className="py-3 flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-sm font-medium text-dark">{doc.file_name}</p>
                                                <p className="text-xs text-neutral-gray">{formatDate(doc.created_at)}</p>
                                            </div>
                                            <a
                                                href={doc.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 text-primary text-sm font-medium hover:underline"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Voir
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Payments */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-primary" />
                                {t('payments')}
                            </h2>
                            {payments.length === 0 ? (
                                <p className="text-neutral-gray">{t('noPayments')}</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="text-left py-2 px-3 text-xs text-neutral-gray font-semibold uppercase tracking-wide">{t('date')}</th>
                                                <th className="text-left py-2 px-3 text-xs text-neutral-gray font-semibold uppercase tracking-wide">{t('amount')}</th>
                                                <th className="text-left py-2 px-3 text-xs text-neutral-gray font-semibold uppercase tracking-wide">{t('statusLabel')}</th>
                                                <th className="text-left py-2 px-3 text-xs text-neutral-gray font-semibold uppercase tracking-wide">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payments.map((p) => (
                                                <tr key={p.id} className="border-b border-gray-50 last:border-0">
                                                    <td className="py-3 px-3 text-dark/70">{formatDate(p.created_at)}</td>
                                                    <td className="py-3 px-3 font-semibold text-dark">{formatAmount(p.amount, p.currency)}</td>
                                                    <td className="py-3 px-3">
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${p.status === 'success' ? 'bg-green-50 text-green-700' : p.status === 'pending' ? 'bg-orange-50 text-orange-700' : 'bg-red-50 text-red-700'}`}>
                                                            {t(`paymentStatus.${p.status as 'success' | 'pending' | 'failed'}`)}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 text-dark/70">{p.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                    </div>
                </section>
            </div>
        );
    }

    // ─── Login view ──────────────────────────────────────────────────────────
    return (
        <div className="pt-24 lg:pt-32">
            <section className="section-padding bg-white min-h-[70vh] flex items-center">
                <div className="container-custom max-w-md w-full mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-light-gray rounded-2xl p-10"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                <Lock className="w-8 h-8 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold text-dark text-center mb-2">{t('loginTitle')}</h1>
                            <p className="text-neutral-gray text-center text-sm mb-8">{t('loginSubtitle')}</p>

                            <form onSubmit={handleLogin} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-dark mb-2">{t('email')}</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-gray" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                                            placeholder={t('email')}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium text-dark">{t('password')}</label>
                                        <span className="text-xs text-primary cursor-pointer hover:underline">{t('forgotPassword')}</span>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-gray" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                {loginStatus === 'error' && (
                                    <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg text-sm">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        {loginError}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loginStatus === 'loading'}
                                    className="btn-primary w-full gap-2 py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loginStatus === 'loading' ? (
                                        <><Loader2 className="w-5 h-5 animate-spin" />{t('loggingIn')}</>
                                    ) : (
                                        <><CheckCircle className="w-5 h-5" />{t('login')}</>
                                    )}
                                </button>
                            </form>

                            <p className="text-center text-sm text-neutral-gray mt-6">
                                {t('noAccount')}{' '}
                                <Link href={`/${locale}/contact`} className="text-primary font-semibold hover:underline">
                                    {t('contactUs')}
                                </Link>
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ClientAuth() {
    const t = useTranslations('client');
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || t('auth.error'));
                setIsLoading(false);
                return;
            }

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('userRole', data.user.role || 'client');
            localStorage.setItem('userName', `${data.user.firstName} ${data.user.lastName}`);

            router.refresh();
        } catch (err) {
            console.error('Auth error:', err);
            setError(t('auth.error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">SOJIF</h1>
                        <p className="text-slate-600">
                            {isSignup ? t('auth.signupTitle') : t('auth.loginTitle')}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                {t('auth.email')}
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                {t('auth.password')}
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-2 px-4 rounded-lg transition"
                        >
                            {isLoading ? t('auth.loading') : (isSignup ? t('auth.signup') : t('auth.login'))}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <p className="text-slate-600">
                            {isSignup ? t('auth.haveAccount') : t('auth.noAccount')}
                            <button
                                onClick={() => setIsSignup(!isSignup)}
                                className="ml-2 text-blue-600 hover:underline font-semibold"
                            >
                                {isSignup ? t('auth.login') : t('auth.signup')}
                            </button>
                        </p>
                    </div>

                    <div className="mt-4 text-center text-xs text-slate-500">
                        <Link href="/" className="hover:text-slate-700">
                            ← {t('auth.backHome')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

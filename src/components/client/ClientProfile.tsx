'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    position?: string;
}

export default function ClientProfile() {
    const t = useTranslations('client');
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch('/api/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
        if (!profile) return;
        setIsSaving(true);
        setMessage('');

        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(profile),
            });

            if (res.ok) {
                setMessage(t('profile.saveSuccess'));
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (error) {
            console.error('Save error:', error);
            setMessage(t('profile.saveError'));
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="text-center py-12">{t('loading')}</div>;
    }

    if (!profile) {
        return <div className="text-center py-12 text-red-600">{t('loadingError')}</div>;
    }

    return (
        <div className="max-w-2xl">
            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">{t('profile.title')}</h2>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                {t('profile.firstName')}
                            </label>
                            <input
                                type="text"
                                value={profile.firstName}
                                onChange={(e) =>
                                    setProfile({ ...profile, firstName: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                {t('profile.lastName')}
                            </label>
                            <input
                                type="text"
                                value={profile.lastName}
                                onChange={(e) =>
                                    setProfile({ ...profile, lastName: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            {t('profile.email')}
                        </label>
                        <input
                            type="email"
                            value={profile.email}
                            disabled
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                        />
                        <p className="text-xs text-slate-500 mt-1">{t('profile.emailHelp')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                {t('profile.phone')}
                            </label>
                            <input
                                type="tel"
                                value={profile.phone || ''}
                                onChange={(e) =>
                                    setProfile({ ...profile, phone: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                {t('profile.company')}
                            </label>
                            <input
                                type="text"
                                value={profile.company || ''}
                                onChange={(e) =>
                                    setProfile({ ...profile, company: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            {t('profile.position')}
                        </label>
                        <input
                            type="text"
                            value={profile.position || ''}
                            onChange={(e) =>
                                setProfile({ ...profile, position: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {message && (
                        <div
                            className={`p-3 rounded-lg text-sm ${
                                message === t('profile.saveSuccess')
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : 'bg-red-50 text-red-700 border border-red-200'
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-2 px-6 rounded-lg transition"
                    >
                        {isSaving ? t('profile.saving') : t('profile.save')}
                    </button>
                </div>
            </div>
        </div>
    );
}

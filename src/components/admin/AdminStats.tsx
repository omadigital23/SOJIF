'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Stats {
    totalClients: number;
    activeSubscriptions: number;
    totalRevenue: number;
    pendingPayments: number;
    candidates: number;
    messages: number;
    recentActivity: any[];
}

export default function AdminStats() {
    const t = useTranslations('admin');
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch('/api/admin/stats', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (isLoading) {
        return <div className="text-center py-12">{t('loading')}</div>;
    }

    if (!stats) {
        return <div className="text-center py-12 text-red-600">{t('loadingError')}</div>;
    }

    const statCards = [
        {
            label: t('stats.totalClients'),
            value: stats.totalClients,
            icon: '👥',
            color: 'bg-blue-50 text-blue-600',
        },
        {
            label: t('stats.activeSubscriptions'),
            value: stats.activeSubscriptions,
            icon: '✅',
            color: 'bg-green-50 text-green-600',
        },
        {
            label: t('stats.totalRevenue'),
            value: `${stats.totalRevenue.toLocaleString()} FCFA`,
            icon: '💰',
            color: 'bg-purple-50 text-purple-600',
        },
        {
            label: t('stats.pendingPayments'),
            value: stats.pendingPayments,
            icon: '⏳',
            color: 'bg-orange-50 text-orange-600',
        },
        {
            label: t('stats.candidates'),
            value: stats.candidates,
            icon: '👔',
            color: 'bg-indigo-50 text-indigo-600',
        },
        {
            label: t('stats.messages'),
            value: stats.messages,
            icon: '💬',
            color: 'bg-pink-50 text-pink-600',
        },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow p-6 border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                                <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                            </div>
                            <div className={`text-4xl p-4 rounded-lg ${stat.color}`}>{stat.icon}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">{t('stats.recentActivity')}</h2>
                {stats.recentActivity.length === 0 ? (
                    <p className="text-slate-600 text-center py-8">{t('noData')}</p>
                ) : (
                    <div className="space-y-3">
                        {stats.recentActivity.map((activity, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded">
                                <div>
                                    <p className="text-slate-900 font-medium">{activity.description}</p>
                                    <p className="text-xs text-slate-500">
                                        {new Date(activity.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <span className="text-sm font-semibold text-blue-600">{activity.type}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

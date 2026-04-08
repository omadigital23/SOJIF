'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface ClientData {
    subscription?: string;
    status: 'active' | 'inactive';
    nextBillingDate?: string;
    totalSpent: number;
    invoicesCount: number;
    ticketsCount: number;
}

export default function ClientOverview() {
    const t = useTranslations('client');
    const [clientData, setClientData] = useState<ClientData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch('/api/user/overview', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    const data = await res.json();
                    setClientData(data);
                }
            } catch (error) {
                console.error('Failed to fetch overview:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div className="text-center py-12">{t('loading')}</div>;
    }

    if (!clientData) {
        return <div className="text-center py-12 text-red-600">{t('loadingError')}</div>;
    }

    return (
        <div className="space-y-8">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                    <p className="text-slate-600 text-sm font-medium">{t('overview.subscription')}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-2">
                        {clientData.subscription || 'N/A'}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                        {clientData.status === 'active' ? t('overview.active') : t('overview.inactive')}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                    <p className="text-slate-600 text-sm font-medium">{t('overview.nextBilling')}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-2">
                        {clientData.nextBillingDate
                            ? new Date(clientData.nextBillingDate).toLocaleDateString()
                            : 'N/A'}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                    <p className="text-slate-600 text-sm font-medium">{t('overview.totalSpent')}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-2">
                        {clientData.totalSpent.toLocaleString()} FCFA
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                    <p className="text-slate-600 text-sm font-medium">{t('overview.invoices')}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-2">{clientData.invoicesCount}</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">{t('overview.quickActions')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition text-left">
                        <p className="font-semibold text-slate-900">{t('overview.createTicket')}</p>
                        <p className="text-xs text-slate-600">{t('overview.contactSupport')}</p>
                    </button>
                    <button className="p-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition text-left">
                        <p className="font-semibold text-slate-900">{t('overview.downloadResources')}</p>
                        <p className="text-xs text-slate-600">{t('overview.accessDocuments')}</p>
                    </button>
                    <button className="p-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition text-left">
                        <p className="font-semibold text-slate-900">{t('overview.scheduleCall')}</p>
                        <p className="text-xs text-slate-600">{t('overview.bookMeeting')}</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

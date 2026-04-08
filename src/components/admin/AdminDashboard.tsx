'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import AdminStats from './AdminStats';
import AdminClients from './AdminClients';
import AdminPayments from './AdminPayments';
import AdminCandidates from './AdminCandidates';
import AdminMessages from './AdminMessages';

export type AdminTab = 'overview' | 'clients' | 'payments' | 'candidates' | 'messages';

export default function AdminDashboard() {
    const t = useTranslations('admin');
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<AdminTab>('overview');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('userName');
        if (name) setUserName(name);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        router.push('/');
    };

    const tabs: { id: AdminTab; label: string; icon: string }[] = [
        { id: 'overview', label: t('tabs.overview'), icon: '📊' },
        { id: 'clients', label: t('tabs.clients'), icon: '👥' },
        { id: 'payments', label: t('tabs.payments'), icon: '💳' },
        { id: 'candidates', label: t('tabs.candidates'), icon: '👔' },
        { id: 'messages', label: t('tabs.messages'), icon: '💬' },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">SOJIF Admin</h1>
                        <p className="text-sm text-slate-600">{t('welcome', { name: userName })}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm font-medium"
                    >
                        {t('logout')}
                    </button>
                </div>
            </header>

            {/* Tabs */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-1 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-3 whitespace-nowrap font-medium text-sm border-b-2 transition ${
                                    activeTab === tab.id
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'overview' && <AdminStats />}
                {activeTab === 'clients' && <AdminClients />}
                {activeTab === 'payments' && <AdminPayments />}
                {activeTab === 'candidates' && <AdminCandidates />}
                {activeTab === 'messages' && <AdminMessages />}
            </main>
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Payment {
    id: string;
    clientName: string;
    email: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    method: string;
    reference: string;
    createdAt: string;
}

export default function AdminPayments() {
    const t = useTranslations('admin');
    const [payments, setPayments] = useState<Payment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch('/api/admin/payments', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    const data = await res.json();
                    setPayments(data);
                }
            } catch (error) {
                console.error('Failed to fetch payments:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const filteredPayments = payments.filter(
        (p) => filterStatus === 'all' || p.status === filterStatus
    );

    const totalAmount = filteredPayments
        .filter((p) => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0);

    const statusColors = {
        completed: 'bg-green-100 text-green-700',
        pending: 'bg-yellow-100 text-yellow-700',
        failed: 'bg-red-100 text-red-700',
    };

    if (isLoading) {
        return <div className="text-center py-12">{t('loading')}</div>;
    }

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                    <p className="text-slate-600 text-sm font-medium">{t('payments.totalRevenue')}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">
                        {totalAmount.toLocaleString()} FCFA
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                    <p className="text-slate-600 text-sm font-medium">{t('payments.totalTransactions')}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{filteredPayments.length}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                {(['all', 'completed', 'pending', 'failed'] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                            filterStatus === status
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        {t(`payments.status.${status}`)}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('payments.reference')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('payments.client')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('payments.amount')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('payments.method')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('payments.status')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('payments.date')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {filteredPayments.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-slate-600">
                                    {t('noData')}
                                </td>
                            </tr>
                        ) : (
                            filteredPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-slate-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900">
                                        {payment.reference.slice(-8).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-slate-900">
                                            {payment.clientName}
                                        </div>
                                        <div className="text-xs text-slate-500">{payment.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                                        {payment.amount.toLocaleString()} FCFA
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {payment.method}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[payment.status]}`}>
                                            {t(`payments.status.${payment.status}`)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {new Date(payment.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Invoice {
    id: string;
    number: string;
    date: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
    periodStart?: string;
    periodEnd?: string;
    url?: string;
}

export default function ClientInvoices() {
    const t = useTranslations('client');
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch('/api/user/invoices', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    const data = await res.json();
                    setInvoices(data);
                }
            } catch (error) {
                console.error('Failed to fetch invoices:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    const filteredInvoices = invoices.filter(
        (inv) => filterStatus === 'all' || inv.status === filterStatus
    );

    const totalAmount = invoices
        .filter((inv) => inv.status === 'paid')
        .reduce((sum, inv) => sum + inv.amount, 0);

    const statusColors = {
        paid: 'bg-green-100 text-green-700',
        pending: 'bg-yellow-100 text-yellow-700',
        overdue: 'bg-red-100 text-red-700',
    };

    if (isLoading) {
        return <div className="text-center py-12">{t('loading')}</div>;
    }

    return (
        <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                    <p className="text-slate-600 text-sm font-medium">{t('invoices.total')}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">
                        {totalAmount.toLocaleString()} FCFA
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                    <p className="text-slate-600 text-sm font-medium">{t('invoices.count')}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{invoices.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                    <p className="text-slate-600 text-sm font-medium">{t('invoices.pending')}</p>
                    <p className="text-3xl font-bold text-orange-600 mt-2">
                        {invoices.filter((inv) => inv.status === 'pending').length}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                {(['all', 'paid', 'pending', 'overdue'] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                            filterStatus === status
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        {t(`invoices.status.${status}`)}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('invoices.number')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('invoices.period')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('invoices.amount')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('invoices.statusLabel')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('invoices.date')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('invoices.action')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {filteredInvoices.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-slate-600">
                                    {t('noData')}
                                </td>
                            </tr>
                        ) : (
                            filteredInvoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-slate-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900">
                                        {invoice.number}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {invoice.periodStart && invoice.periodEnd
                                            ? `${new Date(invoice.periodStart).toLocaleDateString()} - ${new Date(invoice.periodEnd).toLocaleDateString()}`
                                            : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                                        {invoice.amount.toLocaleString()} FCFA
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[invoice.status]}`}>
                                            {t(`invoices.status.${invoice.status}`)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {new Date(invoice.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {invoice.url ? (
                                            <a
                                                href={invoice.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {t('invoices.download')}
                                            </a>
                                        ) : (
                                            <span className="text-slate-400">N/A</span>
                                        )}
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

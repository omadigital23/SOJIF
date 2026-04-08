'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Client {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
    subscription?: string;
    status: 'active' | 'inactive';
    createdAt: string;
}

export default function AdminClients() {
    const t = useTranslations('admin');
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch('/api/admin/clients', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    const data = await res.json();
                    setClients(data);
                }
            } catch (error) {
                console.error('Failed to fetch clients:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClients();
    }, []);

    const filteredClients = clients.filter(
        (client) =>
            client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return <div className="text-center py-12">{t('loading')}</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <input
                    type="text"
                    placeholder={t('search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('clients.name')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('clients.email')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('clients.company')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('clients.subscription')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('clients.status')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('clients.joined')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {filteredClients.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-slate-600">
                                    {t('noData')}
                                </td>
                            </tr>
                        ) : (
                            filteredClients.map((client) => (
                                <tr key={client.id} className="hover:bg-slate-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                        {client.firstName} {client.lastName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {client.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {client.company}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                            {client.subscription || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                client.status === 'active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-slate-100 text-slate-700'
                                            }`}
                                        >
                                            {client.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {new Date(client.createdAt).toLocaleDateString()}
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

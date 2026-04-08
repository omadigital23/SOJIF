'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Candidate {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    experience: string;
    status: 'new' | 'reviewed' | 'contacted' | 'rejected';
    cvUrl?: string;
    createdAt: string;
}

export default function AdminCandidates() {
    const t = useTranslations('admin');
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'reviewed' | 'contacted' | 'rejected'>('all');

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch('/api/admin/candidates', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    const data = await res.json();
                    setCandidates(data);
                }
            } catch (error) {
                console.error('Failed to fetch candidates:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCandidates();
    }, []);

    const filteredCandidates = candidates.filter(
        (c) => filterStatus === 'all' || c.status === filterStatus
    );

    const statusColors = {
        new: 'bg-blue-100 text-blue-700',
        reviewed: 'bg-purple-100 text-purple-700',
        contacted: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700',
    };

    if (isLoading) {
        return <div className="text-center py-12">{t('loading')}</div>;
    }

    return (
        <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                    <p className="text-slate-600 text-xs font-semibold uppercase">{t('candidates.new')}</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">
                        {candidates.filter((c) => c.status === 'new').length}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                    <p className="text-slate-600 text-xs font-semibold uppercase">{t('candidates.reviewed')}</p>
                    <p className="text-3xl font-bold text-purple-600 mt-2">
                        {candidates.filter((c) => c.status === 'reviewed').length}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                    <p className="text-slate-600 text-xs font-semibold uppercase">{t('candidates.contacted')}</p>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                        {candidates.filter((c) => c.status === 'contacted').length}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                    <p className="text-slate-600 text-xs font-semibold uppercase">{t('candidates.rejected')}</p>
                    <p className="text-3xl font-bold text-red-600 mt-2">
                        {candidates.filter((c) => c.status === 'rejected').length}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                {(['all', 'new', 'reviewed', 'contacted', 'rejected'] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                            filterStatus === status
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        {t(`candidates.${status}`)}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('candidates.name')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('candidates.email')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('candidates.department')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('candidates.experience')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('candidates.status')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('candidates.applied')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">
                                {t('candidates.cv')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {filteredCandidates.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-slate-600">
                                    {t('noData')}
                                </td>
                            </tr>
                        ) : (
                            filteredCandidates.map((candidate) => (
                                <tr key={candidate.id} className="hover:bg-slate-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                        {candidate.firstName} {candidate.lastName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {candidate.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {candidate.department}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {candidate.experience}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[candidate.status]}`}>
                                            {t(`candidates.${candidate.status}`)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {new Date(candidate.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {candidate.cvUrl ? (
                                            <a
                                                href={candidate.cvUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {t('candidates.download')}
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

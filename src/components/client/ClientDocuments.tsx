'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Document {
    id: string;
    name: string;
    category: string;
    size: number;
    uploadedAt: string;
    url: string;
}

export default function ClientDocuments() {
    const t = useTranslations('client');
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterCategory, setFilterCategory] = useState('all');

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch('/api/user/documents', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    const data = await res.json();
                    setDocuments(data);
                }
            } catch (error) {
                console.error('Failed to fetch documents:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    const categories = Array.from(new Set(documents.map((d) => d.category)));
    const filteredDocuments = documents.filter(
        (doc) => filterCategory === 'all' || doc.category === filterCategory
    );

    const getFileIcon = (name: string) => {
        if (name.endsWith('.pdf')) return '📄';
        if (name.endsWith('.xlsx') || name.endsWith('.xls')) return '📊';
        if (name.endsWith('.docx') || name.endsWith('.doc')) return '📝';
        return '📦';
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    if (isLoading) {
        return <div className="text-center py-12">{t('loading')}</div>;
    }

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex gap-2">
                {['all', ...categories].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                            filterCategory === cat
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        {cat === 'all' ? t('documents.all') : cat}
                    </button>
                ))}
            </div>

            {/* Documents Grid */}
            <div>
                {filteredDocuments.length === 0 ? (
                    <div className="bg-white rounded-lg shadow border border-slate-200 p-12 text-center">
                        <p className="text-slate-600">{t('noData')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDocuments.map((doc) => (
                            <a
                                key={doc.id}
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-lg shadow border border-slate-200 p-6 hover:shadow-lg hover:border-blue-300 transition group"
                            >
                                <div className="text-4xl mb-3">{getFileIcon(doc.name)}</div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition line-clamp-2">
                                    {doc.name}
                                </h3>
                                <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                                    <p className="text-xs text-slate-500">
                                        <span className="font-medium">{t('documents.category')}:</span> {doc.category}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        <span className="font-medium">{t('documents.size')}:</span> {formatBytes(doc.size)}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        <span className="font-medium">{t('documents.uploaded')}:</span>{' '}
                                        {new Date(doc.uploadedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <button className="mt-4 w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition">
                                    {t('documents.download')}
                                </button>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Message {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    status: 'unread' | 'read' | 'replied';
    createdAt: string;
}

export default function AdminMessages() {
    const t = useTranslations('admin');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read' | 'replied'>('all');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch('/api/admin/messages', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    const data = await res.json();
                    setMessages(data);
                }
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessages();
    }, []);

    const filteredMessages = messages.filter(
        (m) => filterStatus === 'all' || m.status === filterStatus
    );

    const statusColors = {
        unread: 'bg-red-100 text-red-700',
        read: 'bg-yellow-100 text-yellow-700',
        replied: 'bg-green-100 text-green-700',
    };

    if (isLoading) {
        return <div className="text-center py-12">{t('loading')}</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1 space-y-4">
                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                    {(['all', 'unread', 'read', 'replied'] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-3 py-1 rounded-lg font-medium text-xs transition ${
                                filterStatus === status
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            {t(`messages.status.${status}`)}
                        </button>
                    ))}
                </div>

                {/* Messages */}
                <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden max-h-96 overflow-y-auto">
                    {filteredMessages.length === 0 ? (
                        <div className="p-6 text-center text-slate-600">{t('noData')}</div>
                    ) : (
                        <div className="divide-y divide-slate-200">
                            {filteredMessages.map((message) => (
                                <button
                                    key={message.id}
                                    onClick={() => setSelectedMessage(message)}
                                    className={`w-full text-left p-4 hover:bg-slate-50 transition border-l-4 ${
                                        selectedMessage?.id === message.id
                                            ? 'bg-blue-50 border-l-blue-600'
                                            : 'border-l-transparent'
                                    }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm text-slate-900">
                                                {message.firstName} {message.lastName}
                                            </p>
                                            <p className="text-xs text-slate-500">{message.email}</p>
                                        </div>
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${statusColors[message.status]}`}
                                        >
                                            {t(`messages.status.${message.status}`)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 truncate">{message.subject}</p>
                                    <p className="text-xs text-slate-500 mt-2">
                                        {new Date(message.createdAt).toLocaleString()}
                                    </p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
                {selectedMessage ? (
                    <div className="bg-white rounded-lg shadow border border-slate-200 p-6 space-y-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">{selectedMessage.subject}</h2>
                            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-200">
                                <div>
                                    <p className="text-sm font-medium text-slate-900">
                                        {selectedMessage.firstName} {selectedMessage.lastName}
                                    </p>
                                    <p className="text-sm text-slate-600">{selectedMessage.email}</p>
                                </div>
                                <span className={`px-3 py-1 rounded text-sm font-medium ${statusColors[selectedMessage.status]}`}>
                                    {t(`messages.status.${selectedMessage.status}`)}
                                </span>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-600 mb-3">{t('messages.message')}</p>
                            <p className="text-slate-700 whitespace-pre-wrap bg-slate-50 p-4 rounded-lg">
                                {selectedMessage.message}
                            </p>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-slate-200">
                            <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium text-sm">
                                {t('messages.reply')}
                            </button>
                            <button className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg transition font-medium text-sm">
                                {t('messages.archive')}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow border border-slate-200 p-12 text-center">
                        <p className="text-slate-600">{t('messages.selectMessage')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

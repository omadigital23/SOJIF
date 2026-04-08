'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import ClientDashboard from '@/components/client/ClientDashboard';
import ClientAuth from '@/components/client/ClientAuth';

export default function ClientPortalPage() {
    const t = useTranslations('client');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('accessToken');

                if (!token) {
                    setIsAuthorized(false);
                    setIsLoading(false);
                    return;
                }

                // Verify token
                const res = await fetch('/api/user/verify', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    setIsAuthorized(true);
                } else {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('userRole');
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setIsAuthorized(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="text-center">
                    <div className="mb-4">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                    <p className="text-slate-700">{t('loading')}</p>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        return <ClientAuth />;
    }

    return <ClientDashboard />;
}

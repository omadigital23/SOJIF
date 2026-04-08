'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminAuth from '@/components/admin/AdminAuth';

export default function AdminPage() {
    const t = useTranslations('admin');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const userRole = localStorage.getItem('userRole');

                if (!token || !userRole || !['admin', 'super_admin'].includes(userRole)) {
                    setIsAuthorized(false);
                    setIsLoading(false);
                    return;
                }

                // Verify token validity with backend
                const res = await fetch('/api/admin/verify', {
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
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="text-white text-center">
                    <div className="mb-4">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                    <p>{t('loading')}</p>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        return <AdminAuth />;
    }

    return <AdminDashboard />;
}

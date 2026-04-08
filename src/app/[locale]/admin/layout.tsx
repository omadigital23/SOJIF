import React from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
    params?: Promise<{ locale: string }>;
}) {
    return <>{children}</>;
}

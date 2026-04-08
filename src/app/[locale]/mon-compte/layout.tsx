import React from 'react';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
    params?: Promise<{ locale: string }>;
}) {
    return <>{children}</>;
}

import React from 'react';

export default function ClientLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    return <>{children}</>;
}

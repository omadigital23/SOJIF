import type { Metadata } from 'next';
import './globals.css';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';

export const metadata: Metadata = {
    title: 'SOJIF Consulting',
    description: 'Cabinet de Structuration & Performance des Entreprises',
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'SOJIF Consulting',
        description: 'Cabinet de Structuration & Performance des Entreprises',
        type: 'website',
        url: process.env.NEXT_PUBLIC_APP_URL || 'https://sojif-consulting.com',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <AnalyticsProvider />
        </>
    );
}

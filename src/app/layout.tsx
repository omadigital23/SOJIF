import type { Metadata } from 'next';
import './globals.css';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';

export const metadata: Metadata = {
    robots: {
        index: true,
        follow: true,
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

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { PUBLIC_SITE_URL } from '@/lib/site-url';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    metadataBase: new URL(PUBLIC_SITE_URL),
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/images/logo_sojif.jpg',
        apple: '/images/logo_sojif.jpg',
    },
    other: {
        'theme-color': '#1E40AF',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${inter.variable} font-sans`}>
            {children}
            <AnalyticsProvider />
        </div>
    );
}

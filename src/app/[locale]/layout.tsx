import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingContactCTA from '@/components/layout/FloatingContactCTA';
import JsonLd from '@/components/seo/JsonLd';
import type { Metadata } from 'next';
import { PUBLIC_SITE_URL } from '@/lib/site-url';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import '../globals.css';

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });

    const title = t('title');
    const description = t('description');
    const url = `${PUBLIC_SITE_URL}/${locale}`;

    return {
        metadataBase: new URL(PUBLIC_SITE_URL),
        title: {
            default: title,
            template: `%s | SOJIF Consulting`,
        },
        description,
        keywords: t('keywords'),
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
            icon: [
                { url: '/favicon.ico', sizes: 'any' },
                { url: '/icon.png', type: 'image/png', sizes: '512x512' },
            ],
            apple: [
                { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
            ],
        },
        authors: [{ name: 'SOJIF Consulting', url: PUBLIC_SITE_URL }],
        creator: 'SOJIF Consulting',
        publisher: 'SOJIF Consulting',
        openGraph: {
            title,
            description,
            url,
            siteName: 'SOJIF Consulting',
            locale: locale === 'fr' ? 'fr_FR' : 'en_US',
            alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
            type: 'website',
            images: [
                {
                    url: `${PUBLIC_SITE_URL}/images/sojif-logo.png`,
                    width: 720,
                    height: 220,
                    alt: 'SOJIF Consulting — Cabinet de Conseil à Dakar, Sénégal',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${PUBLIC_SITE_URL}/images/sojif-logo.png`],
        },
        alternates: {
            canonical: url,
            languages: {
                'fr': `${PUBLIC_SITE_URL}/fr`,
                'en': `${PUBLIC_SITE_URL}/en`,
                'x-default': `${PUBLIC_SITE_URL}/fr`,
            },
        },
        category: 'business',
        other: {
            'theme-color': '#1E40AF',
        },
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as 'fr' | 'en')) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className="min-h-screen flex flex-col font-sans">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <JsonLd locale={locale} />
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <FloatingContactCTA />
                </NextIntlClientProvider>
                <AnalyticsProvider enableVercelAnalytics={process.env.VERCEL === '1'} />
            </body>
        </html>
    );
}

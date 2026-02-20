import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: {
            default: t('title'),
            template: `%s | SOJIF Consulting`,
        },
        description: t('description'),
        keywords: t('keywords'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            siteName: 'SOJIF Consulting',
            locale: locale === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
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
            <body className="min-h-screen flex flex-col">
                <NextIntlClientProvider messages={messages}>
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

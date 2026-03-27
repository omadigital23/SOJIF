'use client';

import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

/**
 * Analytics Component - Configures Google Analytics and Vercel Analytics
 */
export function AnalyticsProvider() {
    const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

    return (
        <>
            {/* Vercel Analytics - Provides Web Vitals and Performance Monitoring */}
            <Analytics />

            {/* Google Analytics */}
            {googleAnalyticsId && (
                <>
                    <Script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
                    />
                    <Script id="google-analytics">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${googleAnalyticsId}', {
                                page_path: window.location.pathname,
                            });
                        `}
                    </Script>
                </>
            )}
        </>
    );
}

import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { withSentryConfig } from '@sentry/nextjs';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
            },
        ],
    },
    // Optimize production builds
    productionBrowserSourceMaps: false,
    // Enable strict mode
    reactStrictMode: true,
};

// Wrap with Sentry
export default withSentryConfig(
    withNextIntl(nextConfig),
    {
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        authToken: process.env.SENTRY_AUTH_TOKEN,
        // Only upload source maps in production
        silent: !process.env.CI,
        // For all available options, see:
        // https://github.com/getsentry/sentry-webpack-plugin/blob/master/README.md#options.

        // Disable sourcemaps in development to suppress Turbopack warning
        sourcemaps: {
            disable: process.env.NODE_ENV === 'development',
            deleteSourcemapsAfterUpload: true,
        },
        // Hides client-side outgoing requests from being traced, if they aren't already filtered by the global filters
        hideSourceMaps: true,
    }
);

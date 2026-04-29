import type { Metadata } from 'next';
import type { Locale } from '@/i18n/routing';

export const PUBLIC_SITE_URL = 'https://www.sojifconsulting.com';

function normalizeRoutePath(pathname = '') {
    if (!pathname || pathname === '/') {
        return '';
    }

    return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function getLocalizedRoute(locale: Locale, pathname = '') {
    const normalizedPath = normalizeRoutePath(pathname);
    return `/${locale}${normalizedPath}`;
}

export function buildCanonicalAlternates(locale: Locale, pathname = ''): Metadata['alternates'] {
    const canonicalPath = getLocalizedRoute(locale, pathname);
    const frenchPath = getLocalizedRoute('fr', pathname);
    const englishPath = getLocalizedRoute('en', pathname);

    return {
        canonical: canonicalPath,
        languages: {
            fr: frenchPath,
            en: englishPath,
            'x-default': frenchPath,
        },
    };
}

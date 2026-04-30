import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);
const INTERNAL_REQUEST_HEADERS = ['x-middleware-subrequest'];

export function proxy(request: NextRequest) {
    if (INTERNAL_REQUEST_HEADERS.some((header) => request.headers.has(header))) {
        return new NextResponse(null, {
            status: 403,
            headers: {
                'Cache-Control': 'no-store',
                'X-Content-Type-Options': 'nosniff',
            },
        });
    }

    return handleI18nRouting(request);
}

export default proxy;

export const config = {
    matcher: ['/', '/(fr|en)/:path*'],
};

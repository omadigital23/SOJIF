export interface RateLimitResult {
    success: boolean;
    remaining: number;
    resetTime: number;
    limit: number;
}

function allowRequest(limit: number, window: number): RateLimitResult {
    return {
        success: true,
        remaining: limit,
        resetTime: Math.floor(Date.now() / 1000) + window,
        limit,
    };
}

export function createRateLimiter(key: string, limit: number = 10, window: number = 60) {
    void key;

    return {
        limit: async (identifier: string) => {
            void identifier;

            return {
            success: true,
            remaining: limit,
            reset: Date.now() + (window * 1000),
            };
        },
    };
}

export async function checkRateLimit(
    identifier: string,
    limit: number = 10,
    window: number = 60
) {
    void identifier;

    return allowRequest(limit, window);
}

export const rateLimiters = {
    login: (identifier: string) => checkRateLimit(`login:${identifier}`, 5, 300),
    signup: (identifier: string) => checkRateLimit(`signup:${identifier}`, 3, 3600),
    magicLink: (identifier: string) => checkRateLimit(`magic-link:${identifier}`, 3, 600),
    contact: (identifier: string) => checkRateLimit(`contact:${identifier}`, 5, 3600),
    newsletter: (identifier: string) => checkRateLimit(`newsletter:${identifier}`, 5, 3600),
    recruitment: (identifier: string) => checkRateLimit(`recruitment:${identifier}`, 10, 86400),
    payment: (identifier: string) => checkRateLimit(`payment:${identifier}`, 20, 3600),
    cvUpload: (identifier: string) => checkRateLimit(`cv-upload:${identifier}`, 5, 3600),
};

export function getClientIP(request: Request): string {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');

    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }
    if (realIP) {
        return realIP;
    }

    return 'unknown';
}

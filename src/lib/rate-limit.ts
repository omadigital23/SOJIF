import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { env } from './env';

// Lazy initialize Redis
function getRedisClient() {
    return new Redis({
        url: env.UPSTASH_REDIS_REST_URL,
        token: env.UPSTASH_REDIS_REST_TOKEN,
    });
}

/**
 * Create a rate limiter for API routes
 * @param key Unique identifier (e.g., user ID, IP address)
 * @param limit Number of requests allowed
 * @param window Time window in seconds
 */
export function createRateLimiter(key: string, limit: number = 10, window: number = 60) {
    return new Ratelimit({
        redis: getRedisClient(),
        limiter: Ratelimit.slidingWindow(limit, `${window}s`),
        analytics: true,
        prefix: `rl:${key}`,
    });
}

/**
 * Generic rate limit checker for API routes
 * @param identifier Unique identifier (IP, user ID, email, etc.)
 * @param limit Number of requests allowed
 * @param window Time window in seconds
 * @returns { success: boolean, remaining: number, resetTime: number }
 */
export async function checkRateLimit(
    identifier: string,
    limit: number = 10,
    window: number = 60
) {
    try {
        const limiter = createRateLimiter(identifier, limit, window);
        const result = await limiter.limit(identifier);

        return {
            success: result.success,
            remaining: result.remaining,
            resetTime: Math.ceil(result.reset / 1000),
            limit: limit,
        };
    } catch (error) {
        console.error('Rate limit check error:', error);
        // Fail open - allow request if Redis is unavailable
        return {
            success: true,
            remaining: limit,
            resetTime: Math.floor(Date.now() / 1000) + window,
            limit: limit,
        };
    }
}

/**
 * Pre-configured rate limiters for different endpoints
 */

export const rateLimiters = {
    // Auth endpoints
    login: (identifier: string) => checkRateLimit(`login:${identifier}`, 5, 300), // 5 requests per 5 min
    signup: (identifier: string) => checkRateLimit(`signup:${identifier}`, 3, 3600), // 3 requests per hour
    magicLink: (identifier: string) => checkRateLimit(`magic-link:${identifier}`, 3, 600), // 3 requests per 10 min

    // API endpoints
    contact: (identifier: string) => checkRateLimit(`contact:${identifier}`, 5, 3600), // 5 per hour
    newsletter: (identifier: string) => checkRateLimit(`newsletter:${identifier}`, 5, 3600), // 5 per hour
    recruitment: (identifier: string) => checkRateLimit(`recruitment:${identifier}`, 10, 86400), // 10 per day
    payment: (identifier: string) => checkRateLimit(`payment:${identifier}`, 20, 3600), // 20 per hour

    // CV upload
    cvUpload: (identifier: string) => checkRateLimit(`cv-upload:${identifier}`, 5, 3600), // 5 per hour
};

/**
 * Get client IP address from request
 */
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

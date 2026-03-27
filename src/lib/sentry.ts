import * as Sentry from '@sentry/nextjs';

/**
 * Initialize Sentry for error monitoring and performance tracking
 * This should be called in your Next.js layout or middleware
 */
export function initializeSentry() {
    if (process.env.SENTRY_DSN) {
        Sentry.init({
            dsn: process.env.SENTRY_DSN,
            environment: process.env.NODE_ENV,
            // Performance Monitoring
            tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
            // Session Replay
            replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
            replaysOnErrorSampleRate: 1.0,
            // Send client-side errors
            allowUrls: [/https?:\/\/(localhost|127\.0\.0\.1|.*\.sojifconsulting\.com)/],
        });
    }
}

/**
 * Capture an exception with Sentry
 * @param error The error to capture
 * @param context Additional context about the error
 */
export function captureException(error: Error, context?: Record<string, unknown>) {
    if (process.env.SENTRY_DSN) {
        Sentry.captureException(error, {
            contexts: {
                ...(context && { custom: context }),
            },
        });
    }
    console.error('Exception captured:', error, context);
}

/**
 * Capture a message with Sentry
 * @param message The message to log
 * @param level Log level (debug, info, warning, error, fatal)
 * @param context Additional context
 */
export function captureMessage(
    message: string,
    level: 'debug' | 'info' | 'warning' | 'error' | 'fatal' = 'info',
    context?: Record<string, unknown>
) {
    if (process.env.SENTRY_DSN) {
        Sentry.captureMessage(message, level);
    }
    console.log(`[${level.toUpperCase()}] ${message}`, context);
}

/**
 * Set user context for error tracking
 * @param userId User ID
 * @param email User email
 * @param username User username (optional)
 */
export function setUserContext(userId: string, email: string, username?: string) {
    if (process.env.SENTRY_DSN) {
        Sentry.setUser({
            id: userId,
            email: email,
            username: username,
        });
    }
}

/**
 * Clear user context
 */
export function clearUserContext() {
    if (process.env.SENTRY_DSN) {
        Sentry.setUser(null);
    }
}

/**
 * Add breadcrumb for debugging
 * @param message Breadcrumb message
 * @param data Additional data
 * @param category Breadcrumb category (default: 'custom')
 */
export function addBreadcrumb(
    message: string,
    data?: Record<string, unknown>,
    category: string = 'custom'
) {
    if (process.env.SENTRY_DSN) {
        Sentry.addBreadcrumb({
            message,
            data,
            category,
        });
    }
}

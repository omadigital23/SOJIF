import { checkRateLimit, getClientIP } from '../lib/rate-limit';

describe('Rate Limit Utilities', () => {
    it('always allows requests without external providers', async () => {
        const result = await checkRateLimit('127.0.0.1', 5, 60);

        expect(result.success).toBe(true);
        expect(result.limit).toBe(5);
    });

    it('should correctly get client IP from request', () => {
        const req = new Request('http://localhost:3000', {
            headers: new Headers({
                'x-forwarded-for': '192.168.1.1, 10.0.0.1',
            }),
        });

        expect(getClientIP(req)).toBe('192.168.1.1');
    });

    it('should fall back to unknown if no IP headers', () => {
        const req = new Request('http://localhost:3000');
        expect(getClientIP(req)).toBe('unknown');
    });
});

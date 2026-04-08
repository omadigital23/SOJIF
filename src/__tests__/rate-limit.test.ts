import { getClientIP } from '../lib/rate-limit';

// Mock Upstash
jest.mock('@upstash/ratelimit', () => {
    return {
        Ratelimit: jest.fn().mockImplementation(() => {
            return {
                limit: jest.fn().mockResolvedValue({
                    success: true,
                    remaining: 9,
                    reset: Date.now() + 10000,
                }),
            };
        }),
    };
});
jest.mock('@upstash/ratelimit', () => ({
    Ratelimit: Object.assign(
        jest.fn().mockImplementation(() => ({
            limit: jest.fn().mockResolvedValue({
                success: true,
                remaining: 5,
                reset: 1000,
            })
        })),
        {
            slidingWindow: jest.fn(),
        }
    )
}));

jest.mock('@upstash/redis', () => ({
    Redis: jest.fn()
}));

describe('Rate Limiter', () => {
    afterEach(() => {
        jest.clearAllMocks();
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

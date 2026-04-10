import { POST } from '../app/api/contact/route';
import { sendContactConfirmation, sendContactNotificationToAdmin } from '../lib/email';

jest.mock('../lib/email', () => ({
    ADMIN_EMAIL: 'contact@sojifconsulting.com',
    sendContactConfirmation: jest.fn().mockResolvedValue(true),
    sendContactNotificationToAdmin: jest.fn().mockResolvedValue({ messageId: 'test-message-id' }),
}));

jest.mock('../lib/rate-limit', () => ({
    rateLimiters: {
        contact: jest.fn().mockResolvedValue({ success: true }),
    },
    getClientIP: jest.fn().mockReturnValue('127.0.0.1'),
}));

jest.mock('../lib/supabase-server', () => ({
    supabaseAdmin: {
        from: jest.fn(() => ({
            insert: jest.fn(() => ({
                select: jest.fn(() => ({
                    single: jest.fn().mockResolvedValue({ error: null }),
                })),
            })),
        })),
    },
}));

jest.mock('../lib/sentry', () => ({
    captureException: jest.fn(),
    addBreadcrumb: jest.fn(),
}));

describe('Contact API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns 400 when Zod validation fails', async () => {
        const request = new Request('http://localhost:3000/api/contact', {
            method: 'POST',
            body: JSON.stringify({ email: 'invalid-email', firstName: '' }),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.success).toBe(false);
    });

    it('returns 200 on successful request', async () => {
        const request = new Request('http://localhost:3000/api/contact', {
            method: 'POST',
            body: JSON.stringify({
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
                phone: '0123456789',
                subject: 'Subject',
                message: 'Valid message content that is long enough',
            }),
        });

        const response = await POST(request);

        expect(response.status).toBe(200);
        expect(sendContactConfirmation).toHaveBeenCalled();
        expect(sendContactNotificationToAdmin).toHaveBeenCalled();
    });
});

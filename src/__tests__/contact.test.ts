import { POST } from '../app/api/contact/route';
import { sendContactConfirmation } from '../lib/email';
import { checkRateLimit } from '../lib/rate-limit';

jest.mock('../lib/email', () => ({
    sendContactConfirmation: jest.fn().mockResolvedValue(true)
}));

jest.mock('../lib/rate-limit', () => ({
    checkRateLimit: jest.fn().mockResolvedValue({ success: true }),
    getClientIP: jest.fn().mockReturnValue('127.0.0.1')
}));

describe('Contact API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns 400 when Zod validation fails', async () => {
        const request = new Request('http://localhost:3000/api/contact', {
            method: 'POST',
            body: JSON.stringify({ email: 'invalid-email', name: '' }),
        });

        const response = await POST(request);
        const data = await response.json();
        
        expect(response.status).toBe(400);
        expect(data.success).toBe(false);
    });

    it('returns 429 when rate limit is exceeded', async () => {
        (checkRateLimit as jest.Mock).mockResolvedValueOnce({ success: false });

        const request = new Request('http://localhost:3000/api/contact', {
            method: 'POST',
            body: JSON.stringify({ name: 'Test', email: 'test@example.com', subject: 'Subject', message: 'Hello World', department: 'rh' }),
        });

        const response = await POST(request);
        expect(response.status).toBe(429);
    });

    it('returns 200 on successful request', async () => {
        const request = new Request('http://localhost:3000/api/contact', {
            method: 'POST',
            body: JSON.stringify({ name: 'Test', email: 'test@example.com', subject: 'Subject', message: 'Valid message content that is long enough' }),
        });

        const response = await POST(request);
        expect(response.status).toBe(200);
        expect(sendContactConfirmation).toHaveBeenCalled();
    });
});

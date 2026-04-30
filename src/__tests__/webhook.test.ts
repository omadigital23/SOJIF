import { POST } from '../app/api/payments/webhook/route';
import { verifyFlutterwavePayment } from '../lib/flutterwave';

jest.mock('../lib/env', () => ({
    env: { FLUTTERWAVE_WEBHOOK_SECRET: 'secret123' }
}));

jest.mock('../lib/supabase-server', () => ({
    supabaseAdmin: {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: { id: 'evt_1', user_id: 'user_1', pack_id: 'pack_1' } }),
        update: jest.fn().mockReturnThis(),
        upsert: jest.fn().mockResolvedValue({ error: null })
    }
}));

jest.mock('../lib/flutterwave', () => ({
    verifyFlutterwavePayment: jest.fn().mockResolvedValue({ success: true, transactionData: {}, amount: 100, currency: 'XOF' })
}));

describe('Webhook API', () => {
    let consoleWarnSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleWarnSpy.mockRestore();
    });

    it('returns 401 on invalid signature', async () => {
        const req = new Request('http://localhost/api/webhook', {
            method: 'POST',
            headers: { 'verif-hash': 'wrong-secret' },
            body: JSON.stringify({ event: 'charge.completed' })
        });
        
        const res = await POST(req);
        expect(res.status).toBe(401);
    });

    it('handles charge.completed event', async () => {
        const req = new Request('http://localhost/api/webhook', {
            method: 'POST',
            headers: { 'verif-hash': 'secret123' },
            body: JSON.stringify({ event: 'charge.completed', data: { id: 'tx_1', tx_ref: 'ref_1' } })
        });
        
        const res = await POST(req);
        expect(res.status).toBe(200);
        expect(verifyFlutterwavePayment).toHaveBeenCalledWith('tx_1');
    });
});

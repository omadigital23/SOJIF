declare module '@upstash/ratelimit' {
    import { Redis } from '@upstash/redis';

    export interface RatelimitConfig {
        redis: Redis;
        limiter: RatelimitLimiter;
        analytics?: boolean;
        prefix?: string;
    }

    export interface RatelimitResult {
        success: boolean;
        limit: number;
        remaining: number;
        reset: number;
        pending?: Promise<void>;
    }

    export interface RatelimitLimiter {
        [key: string]: unknown;
    }

    export class Ratelimit {
        constructor(config: RatelimitConfig);
        limit(identifier: string): Promise<RatelimitResult>;
        static slidingWindow(limit: number, window: string): RatelimitLimiter;
    }
}

declare module 'flutterwave-node-v3' {
    export interface FlutterwavePayload {
        [key: string]: unknown;
    }

    export interface FlutterwaveCustomer {
        email?: string;
        [key: string]: unknown;
    }

    export interface FlutterwaveData {
        link?: string;
        id?: string;
        status?: string;
        amount?: number;
        currency?: string;
        customer?: FlutterwaveCustomer;
        [key: string]: unknown;
    }

    export interface FlutterwaveResponse {
        status: string;
        message?: string;
        data?: FlutterwaveData;
        [key: string]: unknown;
    }

    export interface FlutterwaveTransaction {
        initialize(payload: FlutterwavePayload): Promise<FlutterwaveResponse>;
        verify(payload: FlutterwavePayload): Promise<FlutterwaveResponse>;
    }

    export default class Flutterwave {
        constructor(publicKey: string, secretKey: string);
        Transaction: FlutterwaveTransaction;
    }
}

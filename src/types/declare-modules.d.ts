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

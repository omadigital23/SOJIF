import Flutterwave from 'flutterwave-node-v3';

function getFlutterwaveClient() {
    const publicKey = process.env.FLUTTERWAVE_PUBLIC_KEY;
    const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;

    if (!publicKey || !secretKey) {
        throw new Error('Flutterwave keys are not configured');
    }

    return new Flutterwave(publicKey, secretKey);
}

/**
 * Initialize a Flutterwave payment
 * @param amount Amount in XOF (West African CFA franc)
 * @param email Customer email
 * @param name Customer name
 * @param phone Customer phone
 * @param paymentId Unique payment ID from database
 * @param description Payment description
 * @returns Payment initialization response with checkout URL
 */
export async function initializeFlutterwavePayment(
    amount: number,
    email: string,
    name: string,
    phone: string,
    paymentId: string,
    description: string
) {
    try {
        const payload = {
            tx_ref: `SOJIF-${paymentId.slice(0, 8).toUpperCase()}-${Date.now()}`,
            amount: amount,
            currency: 'XOF',
            payment_options: 'card,banktransfer',
            customer: {
                email: email,
                phonenumber: phone,
                name: name,
            },
            customizations: {
                title: 'SOJIF Consulting',
                description: description,
                logo: `${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`,
            },
            redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-callback`,
            meta: {
                paymentId,
                service: 'consulting',
            },
        };

        const response = await getFlutterwaveClient().Transaction.initialize(payload);

        if (response.status === 'success' && response.data) {
            return {
                success: true,
                checkoutUrl: response.data.link || '',
                txRef: payload.tx_ref,
                flutterwaveId: response.data.id || '',
            };
        } else {
            throw new Error(response.message || 'Flutterwave initialization failed');
        }
    } catch (error) {
        console.error('Flutterwave initialization error:', error);
        throw error;
    }
}

/**
 * Verify a Flutterwave payment
 * @param transactionId Flutterwave transaction ID
 * @returns Transaction details if successful
 */
export async function verifyFlutterwavePayment(transactionId: string) {
    try {
        const response = await getFlutterwaveClient().Transaction.verify({
            id: transactionId,
        });

        if (response.status === 'success' && response.data && response.data.status === 'successful') {
            return {
                success: true,
                transactionData: response.data,
                amount: response.data.amount,
                currency: response.data.currency,
                email: response.data.customer?.email,
            };
        } else {
            return {
                success: false,
                message: 'Payment verification failed',
                status: response.data?.status,
            };
        }
    } catch (error) {
        console.error('Flutterwave verification error:', error);
        throw error;
    }
}

/**
 * Get transaction details
 * @param txRef Transaction reference
 * @returns Transaction details
 */
export async function getFlutterwaveTransaction(txRef: string) {
    try {
        const response = await getFlutterwaveClient().Transaction.verify({
            flw_ref: txRef,
        });

        return response;
    } catch (error) {
        console.error('Flutterwave transaction fetch error:', error);
        throw error;
    }
}

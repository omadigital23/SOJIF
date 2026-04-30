'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';

type PaymentStatus = 'loading' | 'success' | 'failed' | 'cancelled';

export default function PaymentCallbackPage() {
    const searchParams = useSearchParams();
    const { locale } = useParams();
    const [status, setStatus] = useState<PaymentStatus>('loading');
    const [amount, setAmount] = useState<string | null>(null);

    useEffect(() => {
        const statusParam = searchParams.get('status');
        const txRef = searchParams.get('tx_ref');
        const amountParam = searchParams.get('amount');

        if (amountParam) setAmount(amountParam);

        if (statusParam === 'successful' && txRef) {
            setStatus('success');
        } else if (statusParam === 'cancelled') {
            setStatus('cancelled');
        } else {
            setStatus('failed');
        }
    }, [searchParams]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    const isSuccess = status === 'success';

    return (
        <div className="pt-24 lg:pt-32 min-h-screen flex items-center">
            <div className="container-custom max-w-lg mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100"
                >
                    {isSuccess ? (
                        <>
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-dark mb-3">Paiement confirmé !</h1>
                            {amount && (
                                <p className="text-4xl font-black text-primary mb-4">
                                    {new Intl.NumberFormat('fr-FR').format(Number(amount))} FCFA
                                </p>
                            )}
                            <p className="text-neutral-gray mb-8">
                                Votre paiement a été traité avec succès. Notre équipe vous contactera sous 24h pour finaliser votre abonnement.
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                                <XCircle className="w-10 h-10 text-red-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-dark mb-3">
                                {status === 'cancelled' ? 'Paiement annulé' : 'Paiement échoué'}
                            </h1>
                            <p className="text-neutral-gray mb-8">
                                {status === 'cancelled'
                                    ? 'Vous avez annulé le paiement. Vous pouvez réessayer à tout moment.'
                                    : 'Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer ou nous contacter.'}
                            </p>
                        </>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/${locale}`}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-200 text-dark font-semibold text-sm hover:bg-gray-50 transition-colors"
                        >
                            Retour à l&apos;accueil
                        </Link>
                        {isSuccess ? (
                            <Link
                                href={`/${locale}/contact`}
                                className="btn-primary gap-2"
                            >
                                Contacter SOJIF
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        ) : (
                            <Link
                                href={`/${locale}/offres`}
                                className="btn-primary gap-2"
                            >
                                Réessayer
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

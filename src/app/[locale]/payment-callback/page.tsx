'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

type PaymentStatus = 'loading' | 'success' | 'failed' | 'cancelled';

export default function PaymentCallbackPage() {
    const searchParams = useSearchParams();
    const locale = useLocale();
    const t = useTranslations('paymentCallback');
    const statusParam = searchParams.get('status');
    const txRef = searchParams.get('tx_ref');
    const amount = searchParams.get('amount');
    const status: PaymentStatus = statusParam === 'successful' && txRef
        ? 'success'
        : statusParam === 'cancelled'
            ? 'cancelled'
            : 'failed';

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
                            <h1 className="text-2xl font-bold text-dark mb-3">{t('successTitle')}</h1>
                            {amount && (
                                <p className="text-4xl font-black text-primary mb-4">
                                    {new Intl.NumberFormat(locale).format(Number(amount))} FCFA
                                </p>
                            )}
                            <p className="text-neutral-gray mb-8">
                                {t('successDescription')}
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                                <XCircle className="w-10 h-10 text-red-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-dark mb-3">
                                {status === 'cancelled' ? t('cancelledTitle') : t('failedTitle')}
                            </h1>
                            <p className="text-neutral-gray mb-8">
                                {status === 'cancelled'
                                    ? t('cancelledDescription')
                                    : t('failedDescription')}
                            </p>
                        </>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/${locale}`}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-200 text-dark font-semibold text-sm hover:bg-gray-50 transition-colors"
                        >
                            {t('backHome')}
                        </Link>
                        {isSuccess ? (
                            <Link
                                href={`/${locale}/contact`}
                                className="btn-primary gap-2"
                            >
                                {t('contact')}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        ) : (
                            <Link
                                href={`/${locale}/offres`}
                                className="btn-primary gap-2"
                            >
                                {t('retry')}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

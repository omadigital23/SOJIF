'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';

export default function ClientAreaPage() {
    const t = useTranslations('nav');
    const { locale } = useParams();

    return (
        <div className="pt-24 lg:pt-32">
            <section className="section-padding bg-white">
                <div className="container-custom max-w-lg text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-light-gray rounded-2xl p-12"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold text-dark mb-4">{t('clientArea')}</h1>
                        <p className="text-neutral-gray mb-8">
                            L&apos;espace client sera bientôt disponible. Contactez-nous pour plus d&apos;informations.
                        </p>
                        <Link href={`/${locale}/contact`} className="btn-primary gap-2">
                            {t('requestDemo')}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

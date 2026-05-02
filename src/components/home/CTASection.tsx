'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

export default function CTASection() {
    const t = useTranslations('home');

    return (
        <section className="relative overflow-hidden bg-dark py-20 lg:py-24">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.06]" />

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center"
                >
                    <div className="max-w-3xl">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 tracking-tight leading-tight">
                            {t('ctaTitle')}
                        </h2>
                        <p className="text-white/80 text-lg sm:text-xl leading-relaxed">
                            {t('ctaDesc')}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:items-center lg:items-stretch">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-full font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-1 active:scale-[0.98] group"
                        >
                            {t('ctaButton')}
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <div className="grid grid-cols-2 gap-3">
                            <a
                                href={`tel:${COMPANY.phone}`}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                            >
                                <Phone className="h-4 w-4" />
                                {t('ctaCall')}
                            </a>
                            <a
                                href={`https://wa.me/${COMPANY.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative inline-flex items-center justify-center gap-2 overflow-visible rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(7,94,84,0.24)] ring-1 ring-white/30 transition-all hover:-translate-y-0.5 hover:bg-[#1FC45C] hover:shadow-[0_16px_30px_rgba(7,94,84,0.32)]"
                            >
                                <span aria-hidden="true" className="pointer-events-none absolute inset-[-4px] rounded-full bg-[#25D366]/15 blur-md" />
                                <WhatsAppIcon className="relative h-4 w-4 drop-shadow-sm" />
                                <span className="relative">WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

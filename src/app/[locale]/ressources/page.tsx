'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { BookOpen, Mail, ArrowRight } from 'lucide-react';

export default function ResourcesPage() {
    const t = useTranslations('resources');
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        await new Promise((resolve) => setTimeout(resolve, 800));
        setSubscribed(true);
        setEmail('');
    };

    return (
        <div className="pt-24 lg:pt-32">
            <section className="section-padding bg-light-gray">
                <div className="container-custom text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl font-bold text-dark mb-4"
                    >
                        {t('title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-gray text-lg"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-2xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-light-gray rounded-2xl p-12"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-dark mb-4">{t('comingSoon')}</h2>
                        <p className="text-neutral-gray mb-8">{t('comingSoonDesc')}</p>
                        {subscribed ? (
                            <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                                <Mail className="w-5 h-5" />
                                Merci ! Vous serez notifié.
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('newsletterPlaceholder')}
                                    required
                                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                                />
                                <button type="submit" className="btn-primary gap-2">
                                    {t('newsletterButton')}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

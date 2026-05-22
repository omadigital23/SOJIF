'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export default function TestimonialsSection() {
    const t = useTranslations('home');

    return (
        <section className="section-padding bg-light-gray relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-[0.03] pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-semibold tracking-wide uppercase"
                    >
                        {t('testimonialsLabel')}
                    </motion.div>
                    <motion.h2
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6"
                    >
                        {t('testimonialsTitle')}
                    </motion.h2>
                    <motion.p
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-neutral-gray text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
                    >
                        {t('testimonialsSubtitle')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.slice(0, 3).map((review, i) => (
                        <motion.div
                            key={review.name}
                            initial={false}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="bg-white rounded-2xl p-8 relative shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="absolute top-6 right-6 w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center">
                                <Quote className="w-4 h-4 text-primary" />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <Star
                                        key={j}
                                        className={`w-4 h-4 ${j < review.rating ? 'text-secondary fill-secondary' : 'text-gray-200 fill-gray-200'}`}
                                    />
                                ))}
                            </div>

                            <p className="text-dark/80 leading-relaxed mb-8 italic relative z-10">
                                &ldquo;{t(`testimonialsList.${i}.content`)}&rdquo;
                            </p>

                            <div className="flex items-center gap-4 border-t border-gray-50 pt-6 mt-auto">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">
                                    {t(`testimonialsList.${i}.name`).charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-dark">
                                        {t(`testimonialsList.${i}.name`)}
                                    </div>
                                    <div className="text-sm text-neutral-gray font-medium">
                                        {t(`testimonialsList.${i}.role`)}, <span className="text-primary">{t(`testimonialsList.${i}.company`)}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export default function TestimonialsSection() {
    const t = useTranslations('home');

    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold text-dark mb-4"
                    >
                        {t('testimonialsTitle')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-gray text-lg"
                    >
                        {t('testimonialsSubtitle')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.slice(0, 3).map((review, i) => (
                        <motion.div
                            key={review.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="bg-light-gray rounded-2xl p-8 relative"
                        >
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: review.rating }).map((_, j) => (
                                    <Star
                                        key={j}
                                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                                    />
                                ))}
                            </div>

                            <p className="text-dark/80 text-sm leading-relaxed mb-6">
                                &ldquo;{review.content}&rdquo;
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-dark text-sm">
                                        {review.name}
                                    </div>
                                    <div className="text-xs text-neutral-gray">
                                        {review.role}, {review.company}
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

'use client';

import { useTranslations } from 'next-intl';

export default function TermsPage() {
    const t = useTranslations('legal');

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('terms.title')}</h1>
                    <p className="text-slate-600 text-lg">{t('terms.lastUpdated')}</p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
                    {/* Intro */}
                    <section>
                        <p className="text-slate-700 leading-relaxed">{t('terms.intro')}</p>
                    </section>

                    {/* 1. Definitions */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('terms.section1.title')}</h2>
                        <div className="space-y-3 text-slate-700">
                            <p><strong>{t('terms.section1.sojif')}</strong>: {t('terms.section1.sojifDef')}</p>
                            <p><strong>{t('terms.section1.user')}</strong>: {t('terms.section1.userDef')}</p>
                            <p><strong>{t('terms.section1.content')}</strong>: {t('terms.section1.contentDef')}</p>
                            <p><strong>{t('terms.section1.services')}</strong>: {t('terms.section1.servicesDef')}</p>
                        </div>
                    </section>

                    {/* 2. User Obligations */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('terms.section2.title')}</h2>
                        <div className="space-y-3 text-slate-700">
                            <p>{t('terms.section2.intro')}</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>{t('terms.section2.item1')}</li>
                                <li>{t('terms.section2.item2')}</li>
                                <li>{t('terms.section2.item3')}</li>
                                <li>{t('terms.section2.item4')}</li>
                            </ul>
                        </div>
                    </section>

                    {/* 3. Service Description */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('terms.section3.title')}</h2>
                        <div className="space-y-3 text-slate-700">
                            <p>{t('terms.section3.intro')}</p>
                            <p>{t('terms.section3.details')}</p>
                        </div>
                    </section>

                    {/* 4. Subscription & Payment */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('terms.section4.title')}</h2>
                        <div className="space-y-3 text-slate-700">
                            <p>{t('terms.section4.intro')}</p>
                            <p>{t('terms.section4.commitment')}</p>
                            <p>{t('terms.section4.payment')}</p>
                            <p>{t('terms.section4.cancellation')}</p>
                        </div>
                    </section>

                    {/* 5. Intellectual Property */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('terms.section5.title')}</h2>
                        <div className="space-y-3 text-slate-700">
                            <p>{t('terms.section5.intro')}</p>
                            <p>{t('terms.section5.sojifRights')}</p>
                            <p>{t('terms.section5.userLicense')}</p>
                        </div>
                    </section>

                    {/* 6. Limitation of Liability */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('terms.section6.title')}</h2>
                        <div className="space-y-3 text-slate-700">
                            <p>{t('terms.section6.intro')}</p>
                            <p>{t('terms.section6.damaging')}</p>
                            <p>{t('terms.section6.liability')}</p>
                        </div>
                    </section>

                    {/* 7. Governing Law */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('terms.section7.title')}</h2>
                        <div className="space-y-3 text-slate-700">
                            <p>{t('terms.section7.intro')}</p>
                            <p>{t('terms.section7.jurisdiction')}</p>
                        </div>
                    </section>

                    {/* 8. Contact */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('terms.section8.title')}</h2>
                        <div className="space-y-3 text-slate-700">
                            <p>{t('terms.section8.intro')}</p>
                            <div className="bg-slate-100 p-4 rounded-lg">
                                <p className="font-semibold">SOJIF Consulting</p>
                                <p>{t('terms.section8.email')}: contact@sojif.sn</p>
                                <p>{t('terms.section8.phone')}: +221 33 869 39 39</p>
                            </div>
                        </div>
                    </section>

                    {/* Last Updated */}
                    <section className="border-t pt-8">
                        <p className="text-sm text-slate-600">{t('terms.lastUpdatedFull')}</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

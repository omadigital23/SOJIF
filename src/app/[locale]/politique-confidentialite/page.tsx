'use client';

import { useTranslations } from 'next-intl';
import { COMPANY } from '@/lib/constants';

export default function PrivacyPage() {
    const t = useTranslations('legal');

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('privacy.title')}</h1>
                    <p className="text-slate-600 text-lg">{t('privacy.lastUpdated')}</p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
                    {/* Intro */}
                    <section>
                        <p className="text-slate-700 leading-relaxed">{t('privacy.intro')}</p>
                    </section>

                    {/* 1. Data Collection */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.section1.title')}</h2>
                        <div className="space-y-4 text-slate-700">
                            <p>{t('privacy.section1.intro')}</p>
                            <h3 className="text-lg font-semibold text-slate-800">{t('privacy.section1.personal')}</h3>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>{t('privacy.section1.item1')}</li>
                                <li>{t('privacy.section1.item2')}</li>
                                <li>{t('privacy.section1.item3')}</li>
                                <li>{t('privacy.section1.item4')}</li>
                                <li>{t('privacy.section1.item5')}</li>
                            </ul>
                        </div>
                    </section>

                    {/* 2. Data Usage */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.section2.title')}</h2>
                        <div className="space-y-4 text-slate-700">
                            <p>{t('privacy.section2.intro')}</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>{t('privacy.section2.item1')}</li>
                                <li>{t('privacy.section2.item2')}</li>
                                <li>{t('privacy.section2.item3')}</li>
                                <li>{t('privacy.section2.item4')}</li>
                                <li>{t('privacy.section2.item5')}</li>
                            </ul>
                        </div>
                    </section>

                    {/* 3. Data Protection */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.section3.title')}</h2>
                        <div className="space-y-4 text-slate-700">
                            <p>{t('privacy.section3.intro')}</p>
                            <p>{t('privacy.section3.details')}</p>
                        </div>
                    </section>

                    {/* 4. Data Sharing */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.section4.title')}</h2>
                        <div className="space-y-4 text-slate-700">
                            <p>{t('privacy.section4.intro')}</p>
                            <p>{t('privacy.section4.details')}</p>
                        </div>
                    </section>

                    {/* 5. User Rights */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.section5.title')}</h2>
                        <div className="space-y-4 text-slate-700">
                            <p>{t('privacy.section5.intro')}</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>{t('privacy.section5.item1')}</li>
                                <li>{t('privacy.section5.item2')}</li>
                                <li>{t('privacy.section5.item3')}</li>
                                <li>{t('privacy.section5.item4')}</li>
                            </ul>
                        </div>
                    </section>

                    {/* 6. Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.section6.title')}</h2>
                        <div className="space-y-4 text-slate-700">
                            <p>{t('privacy.section6.intro')}</p>
                            <p>{t('privacy.section6.details')}</p>
                        </div>
                    </section>

                    {/* 7. Contact */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.section7.title')}</h2>
                        <div className="space-y-4 text-slate-700">
                            <p>{t('privacy.section7.intro')}</p>
                            <div className="bg-slate-100 p-4 rounded-lg">
                                <p className="font-semibold">SOJIF Consulting</p>
                                <p>{t('privacy.section7.email')}: {COMPANY.email}</p>
                                <p>{t('privacy.section7.phone')}: {COMPANY.phoneDisplay}</p>
                                <p>{t('privacy.section7.address')}: {COMPANY.address}</p>
                            </div>
                        </div>
                    </section>

                    {/* Last Updated */}
                    <section className="border-t pt-8">
                        <p className="text-sm text-slate-600">{t('privacy.lastUpdatedFull')}</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

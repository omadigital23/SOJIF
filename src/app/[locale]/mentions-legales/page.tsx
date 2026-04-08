'use client';

import { useTranslations } from 'next-intl';

export default function LegalNoticePage() {
    const t = useTranslations('legal');

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('legal.title')}</h1>
                    <p className="text-slate-600 text-lg">{t('legal.lastUpdated')}</p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
                    {/* Publisher Info */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('legal.section1.title')}</h2>
                        <div className="bg-slate-100 p-6 rounded-lg space-y-2 text-slate-700">
                            <p><strong>{t('legal.section1.company')}:</strong> SOJIF Consulting</p>
                            <p><strong>{t('legal.section1.legalForm')}:</strong> {t('legal.section1.legalFormValue')}</p>
                            <p><strong>{t('legal.section1.registrationNumber')}:</strong> RCCM Dakar [à compléter]</p>
                            <p><strong>{t('legal.section1.taxId')}:</strong> NIF [à compléter]</p>
                            <p><strong>{t('legal.section1.address')}:</strong> Dakar, Sénégal</p>
                            <p><strong>{t('legal.section1.phone')}:</strong> +221 33 869 39 39</p>
                            <p><strong>{t('legal.section1.email')}:</strong> contact@sojif.sn</p>
                            <p><strong>{t('legal.section1.director')}:</strong> Fatou Guewel MBAYE</p>
                        </div>
                    </section>

                    {/* Website Host */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('legal.section2.title')}</h2>
                        <div className="bg-slate-100 p-6 rounded-lg space-y-2 text-slate-700">
                            <p><strong>{t('legal.section2.provider')}:</strong> Vercel Inc.</p>
                            <p><strong>{t('legal.section2.address')}:</strong> San Francisco, USA</p>
                            <p><strong>{t('legal.section2.website')}:</strong> www.vercel.com</p>
                        </div>
                    </section>

                    {/* Domain Registrar */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('legal.section3.title')}</h2>
                        <div className="space-y-3 text-slate-700">
                            <p>{t('legal.section3.intro')}</p>
                            <div className="bg-slate-100 p-6 rounded-lg space-y-2">
                                <p><strong>{t('legal.section3.domain')}:</strong> sojif.sn</p>
                                <p><strong>{t('legal.section3.registrar')}:</strong> [à compléter]</p>
                            </div>
                        </div>
                    </section>

                    {/* Website Director */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('legal.section4.title')}</h2>
                        <div className="space-y-3 text-slate-700">
                            <p>{t('legal.section4.intro')}</p>
                            <p><strong>{t('legal.section4.name')}:</strong> Fatou Guewel MBAYE</p>
                        </div>
                    </section>

                    {/* Liability */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('legal.section5.title')}</h2>
                        <div className="space-y-3 text-slate-700">
                            <p>{t('legal.section5.content')}</p>
                            <p>{t('legal.section5.links')}</p>
                            <p>{t('legal.section5.interruption')}</p>
                        </div>
                    </section>

                    {/* Intellectual Property */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('legal.section6.title')}</h2>
                        <div className="space-y-3 text-slate-700">
                            <p>{t('legal.section6.intro')}</p>
                            <p>{t('legal.section6.trademarks')}</p>
                            <p>{t('legal.section6.prohibition')}</p>
                        </div>
                    </section>

                    {/* CNIL / Data Protection */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('legal.section7.title')}</h2>
                        <div className="space-y-3 text-slate-700">
                            <p>{t('legal.section7.intro')}</p>
                            <p>{t('legal.section7.senegal')}</p>
                            <p>{t('legal.section7.privacy')}</p>
                        </div>
                    </section>

                    {/* Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('legal.section8.title')}</h2>
                        <div className="space-y-3 text-slate-700">
                            <p>{t('legal.section8.intro')}</p>
                            <p>{t('legal.section8.details')}</p>
                        </div>
                    </section>

                    {/* Amendments */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('legal.section9.title')}</h2>
                        <div className="space-y-3 text-slate-700">
                            <p>{t('legal.section9.intro')}</p>
                        </div>
                    </section>

                    {/* Last Updated */}
                    <section className="border-t pt-8">
                        <p className="text-sm text-slate-600">{t('legal.lastUpdatedFull')}</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

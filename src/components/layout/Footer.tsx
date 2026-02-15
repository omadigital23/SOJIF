import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export default function Footer({ locale }: { locale: string }) {
    const t = useTranslations();
    const year = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white">
            {/* Main footer */}
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0">
                                <NextImage
                                    src="/images/logo.jpg"
                                    alt={COMPANY.name}
                                    fill
                                    className="object-contain p-1"
                                    sizes="48px"
                                />
                            </div>
                            <div>
                                <div className="font-bold text-lg">{COMPANY.name}</div>
                                <div className="text-xs text-white/50 tracking-wider uppercase">
                                    {COMPANY.signature}
                                </div>
                            </div>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">
                            {t('footer.description')}
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider mb-5 text-white/90">
                            {t('footer.quickLinks')}
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: t('nav.home'), href: '/' },
                                { label: t('nav.about'), href: '/a-propos' },
                                { label: t('nav.departments'), href: '/departements/droit' },
                                { label: t('nav.offers'), href: '/offres' },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={`/${locale}${item.href}`}
                                        className="text-white/60 hover:text-white text-sm transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider mb-5 text-white/90">
                            {t('footer.services')}
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: t('nav.digitalization'), href: '/digitalisation' },
                                { label: t('nav.recruitment'), href: '/recrutement' },
                                { label: t('nav.resources'), href: '/ressources' },
                                { label: t('nav.contact'), href: '/contact' },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={`/${locale}${item.href}`}
                                        className="text-white/60 hover:text-white text-sm transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider mb-5 text-white/90">
                            Contact
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                <span className="text-white/60 text-sm">{COMPANY.address}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                <a
                                    href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                                    className="text-white/60 hover:text-white text-sm transition-colors"
                                >
                                    {COMPANY.phoneDisplay}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                <a
                                    href={`mailto:${COMPANY.email}`}
                                    className="text-white/60 hover:text-white text-sm transition-colors"
                                >
                                    {COMPANY.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/40 text-sm">
                        © {year} {COMPANY.name}. {t('footer.allRights')}
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href={`/${locale}`}
                            className="text-white/40 hover:text-white/70 text-xs transition-colors"
                        >
                            {t('footer.legal')}
                        </Link>
                        <Link
                            href={`/${locale}`}
                            className="text-white/40 hover:text-white/70 text-xs transition-colors"
                        >
                            {t('footer.privacy')}
                        </Link>
                        <Link
                            href={`/${locale}`}
                            className="text-white/40 hover:text-white/70 text-xs transition-colors"
                        >
                            {t('footer.terms')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

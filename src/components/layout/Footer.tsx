'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export default function Footer() {
    const t = useTranslations();
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Instagram, href: '#', label: 'Instagram' },
    ];

    const footerLinks = [
        {
            title: 'nav.services',
            items: [
                { label: 'Droit des Affaires', href: '/departements/droit' },
                { label: 'Fiscalité', href: '/departements/fiscalite' },
                { label: 'Ressources Humaines', href: '/departements/rh' },
                { label: 'Conseil Stratégique', href: '/departements/conseil' },
            ],
        },
        {
            title: 'nav.company',
            items: [
                { label: 'nav.about', href: '/a-propos' },
                { label: 'nav.recruitment', href: '/recrutement' },
                { label: 'nav.resources', href: '/ressources' },
                { label: 'nav.contact', href: '/contact' },
            ],
        },
    ];

    return (
        <footer className="bg-dark text-white pt-20 pb-10 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-500/5 blur-3xl pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">{COMPANY.name}</h2>
                            <p className="text-sm text-gray-400 uppercase tracking-widest">{COMPANY.signature}</p>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs text-balance">
                            {t('footer.description')}
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {footerLinks.map((column) => (
                        <div key={column.title} className="space-y-6">
                            <h3 className="font-semibold text-lg border-b border-white/10 pb-2 inline-block">
                                {t(column.title)}
                            </h3>
                            <ul className="space-y-3">
                                {column.items.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="text-gray-400 hover:text-primary-light transition-colors flex items-center gap-2 group text-sm"
                                        >
                                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                                            <span className="transition-transform duration-300 group-hover:translate-x-1">{item.label.startsWith('nav.') ? t(item.label) : item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Column */}
                    <div className="space-y-6">
                        <h3 className="font-semibold text-lg border-b border-white/10 pb-2 inline-block">
                            {t('nav.contact')}
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <a href={`mailto:${COMPANY.email}`} className="flex items-start gap-3 group">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                        <Mail className="w-4 h-4 text-primary-light" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <span className="text-xs text-gray-500 uppercase tracking-wider block">Email</span>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{COMPANY.email}</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href={`tel:${COMPANY.phone}`} className="flex items-start gap-3 group">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                        <Phone className="w-4 h-4 text-primary-light" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <span className="text-xs text-gray-500 uppercase tracking-wider block">Téléphone</span>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{COMPANY.phoneDisplay}</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                        <MapPin className="w-4 h-4 text-primary-light" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <span className="text-xs text-gray-500 uppercase tracking-wider block">Adresse</span>
                                        <span className="text-sm text-gray-300">{COMPANY.address}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {currentYear} {COMPANY.name}. {t('footer.allRights')}</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            {t('footer.privacy')}
                        </Link>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            {t('footer.terms')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { COMPANY } from '@/lib/constants';
import MobileNav from './MobileNav';

const navItems = [
    { label: 'nav.home', href: '/' },
    { label: 'nav.about', href: '/a-propos' },
    {
        label: 'nav.departments',
        href: '/departements/droit',
        children: [
            { label: 'Droit des Affaires', href: '/departements/droit' },
            { label: 'Fiscalité & Comptabilité', href: '/departements/fiscalite' },
            { label: 'Ressources Humaines', href: '/departements/rh' },
            { label: 'Conseil Stratégique', href: '/departements/conseil' },
            { label: 'Digitalisation', href: '/departements/digitalisation' },
            { label: 'Recrutement', href: '/departements/recrutement' },
        ],
    },
    { label: 'nav.offers', href: '/offres' },
    { label: 'nav.digitalization', href: '/digitalisation' },
    { label: 'nav.recruitment', href: '/recrutement' },
    { label: 'nav.resources', href: '/ressources' },
    { label: 'nav.contact', href: '/contact' },
];

export default function Header() {
    const t = useTranslations();
    const params = useParams();
    const locale = params.locale as string;

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    scrolled
                        ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5'
                        : 'bg-transparent'
                )}
            >
                {/* Top bar */}
                <div className="hidden lg:block bg-dark text-white/80 text-xs">
                    <div className="max-w-[95%] mx-auto px-4 flex justify-between items-center py-2">
                        <div className="flex items-center gap-6">
                            <span>{COMPANY.email}</span>
                            <span>{COMPANY.phoneDisplay}</span>
                            <span>{COMPANY.address}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href={`/${locale === 'fr' ? 'en' : 'fr'}`}
                                className="hover:text-white transition-colors"
                            >
                                {locale === 'fr' ? 'EN' : 'FR'}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main nav */}
                <div className="max-w-[95%] mx-auto px-4">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link href={`/${locale}`} className="flex items-center gap-3 group">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden transition-transform group-hover:scale-105 bg-white">
                                <NextImage
                                    src="/images/logo.jpg"
                                    alt={COMPANY.name}
                                    fill
                                    className="object-contain p-1"
                                    sizes="48px"
                                    priority
                                />
                            </div>
                            <div className="hidden sm:block">
                                <div className={cn(
                                    'font-bold text-lg leading-tight transition-colors',
                                    scrolled ? 'text-dark' : 'text-white'
                                )}>
                                    {COMPANY.name}
                                </div>
                                <div className={cn(
                                    'text-[10px] tracking-wider uppercase transition-colors',
                                    scrolled ? 'text-neutral-gray' : 'text-white/70'
                                )}>
                                    {COMPANY.signature}
                                </div>
                            </div>
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="relative"
                                    onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <Link
                                        href={`/${locale}${item.href}`}
                                        className={cn(
                                            'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap',
                                            scrolled
                                                ? 'text-dark/80 hover:text-primary hover:bg-primary/5'
                                                : 'text-white/90 hover:text-white hover:bg-white/10',
                                            'flex items-center gap-1'
                                        )}
                                    >
                                        {t(item.label)}
                                        {item.children && (
                                            <ChevronDown className="w-3.5 h-3.5 transition-transform" />
                                        )}
                                    </Link>

                                    {/* Dropdown */}
                                    <AnimatePresence>
                                        {item.children && openDropdown === item.label && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl shadow-black/10 border border-gray-100 py-2 z-50"
                                            >
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={`/${locale}${child.href}`}
                                                        className="block px-4 py-2.5 text-sm text-dark/70 hover:text-primary hover:bg-primary/5 transition-colors"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </nav>

                        {/* CTA + Mobile toggle */}
                        <div className="flex items-center gap-3">
                            <Link href={`/${locale}/contact`} className="hidden lg:inline-flex btn-primary">
                                {t('nav.requestDemo')}
                            </Link>
                            <button
                                onClick={() => setMobileOpen(true)}
                                className={cn(
                                    "lg:hidden p-2 rounded-lg transition-colors",
                                    scrolled ? "hover:bg-gray-100 text-dark" : "hover:bg-white/10 text-white"
                                )}
                                aria-label="Menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile nav */}
            <MobileNav
                isOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
                items={navItems}
                locale={locale}
            />
        </>
    );
}

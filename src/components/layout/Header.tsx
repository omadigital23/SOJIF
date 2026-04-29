'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import NextImage from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Menu, ChevronDown } from 'lucide-react';
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
            { label: 'departments.departmentsList.droit.title', href: '/departements/droit' },
            { label: 'departments.departmentsList.fiscalite.title', href: '/departements/fiscalite' },
            { label: 'departments.departmentsList.rh.title', href: '/departements/rh' },
            { label: 'departments.departmentsList.conseil.title', href: '/departements/conseil' },
            { label: 'departments.departmentsList.digitalisation.title', href: '/departements/digitalisation' },
            { label: 'departments.departmentsList.recrutement.title', href: '/departements/recrutement' },
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
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
                    scrolled
                        ? 'glass-header py-2'
                        : 'bg-transparent py-4'
                )}
            >
                {/* Top bar - Hide on scroll for cleaner look */}
                <div className={cn(
                    "hidden lg:block transition-all duration-300 overflow-hidden",
                    scrolled ? "h-0 opacity-0" : "h-auto opacity-100 bg-dark/95 text-white/80 text-xs py-2"
                )}>
                    <div className="max-w-[95%] mx-auto px-4 flex justify-between items-center">
                        <div className="flex items-center gap-6">
                            <span className="hover:text-white transition-colors cursor-default">{COMPANY.email}</span>
                            <span className="hover:text-white transition-colors cursor-default">{COMPANY.phoneDisplay}</span>
                            <span className="hover:text-white transition-colors cursor-default">{COMPANY.address}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href={'/'}
                                locale={locale === 'fr' ? 'en' : 'fr'}
                                className="hover:text-white transition-colors font-medium"
                            >
                                {locale === 'fr' ? 'EN' : 'FR'}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main nav */}
                <div className="max-w-[95%] mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href={'/'} className="flex items-center gap-3 group">
                            <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md bg-white">
                                <NextImage
                                    src="/images/logo_sojif.jpg"
                                    alt={COMPANY.name}
                                    fill
                                    className="object-contain p-1"
                                    sizes="48px"
                                    priority
                                />
                            </div>
                            <div className="hidden sm:block">
                                <div className={cn(
                                    'font-bold text-lg leading-tight transition-colors duration-300',
                                    scrolled ? 'text-dark' : 'text-white drop-shadow-md'
                                )}>
                                    {COMPANY.name}
                                </div>
                                <div className={cn(
                                    'text-[10px] tracking-wider uppercase transition-colors duration-300',
                                    scrolled ? 'text-primary font-semibold' : 'text-white/90 drop-shadow-sm'
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
                                        href={item.href}
                                        className={cn(
                                            'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-1',
                                            scrolled
                                                ? 'text-dark/80 hover:text-primary hover:bg-primary/5'
                                                : 'text-white/90 hover:text-white hover:bg-white/10'
                                        )}
                                        aria-haspopup={item.children ? 'true' : undefined}
                                        aria-expanded={item.children ? openDropdown === item.label : undefined}
                                    >
                                        {t(item.label)}
                                        {item.children && (
                                            <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                                        )}
                                    </Link>

                                    {/* Dropdown */}
                                    <AnimatePresence>
                                        {item.children && openDropdown === item.label && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-black/10 border border-white/50 py-2 z-50 overflow-hidden ring-1 ring-black/5"
                                            >
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className="block px-4 py-3 text-sm text-dark/70 hover:text-primary hover:bg-primary/5 transition-colors border-l-2 border-transparent hover:border-primary"
                                                    >
                                                        {t(child.label)}
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
                            <Link
                                href={'/mon-compte'}
                                className={cn(
                                    "hidden md:inline-flex btn-secondary !py-2.5 !px-5",
                                    scrolled
                                        ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                        : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/30"
                                )}
                            >
                                {t('nav.clientArea')}
                            </Link>
                            <Link
                                href={'/contact'}
                                className={cn(
                                    "hidden lg:inline-flex btn-primary !py-2.5 !px-5 shadow-lg shadow-primary/20",
                                    !scrolled && "bg-white text-primary hover:bg-white/90 hover:text-primary-dark shadow-none"
                                )}
                            >
                                {t('nav.requestDemo')}
                            </Link>
                            <button
                                onClick={() => setMobileOpen(true)}
                                className={cn(
                                    "lg:hidden p-2 rounded-lg transition-all duration-300",
                                    scrolled
                                        ? "hover:bg-gray-100 text-dark"
                                        : "hover:bg-white/10 text-white backdrop-blur-sm bg-white/5"
                                )}
                                aria-label="Menu"
                                aria-expanded={mobileOpen}
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

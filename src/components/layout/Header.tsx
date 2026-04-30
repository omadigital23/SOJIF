'use client';

import { useState, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
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

type NavItem = (typeof navItems)[number];

const pathMatches = (href: string, pathname: string) => (
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
);

const isNavItemActive = (item: NavItem, pathname: string) => (
    pathMatches(item.href, pathname) ||
    Boolean(item.children?.some((child) => pathMatches(child.href, pathname)))
);

export default function Header() {
    const t = useTranslations();
    const params = useParams();
    const pathname = usePathname() || '/';
    const locale = params.locale as string;

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const isOverlay = pathname === '/' && !scrolled;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                    isOverlay
                        ? 'bg-transparent border-transparent py-4'
                        : 'bg-white/95 backdrop-blur-md border-gray-100 py-2 shadow-sm shadow-slate-950/5'
                )}
            >
                {/* Top bar */}
                <div className={cn(
                    "hidden xl:block transition-all duration-300 overflow-hidden bg-dark text-white/80 text-xs",
                    scrolled ? "h-0 opacity-0 py-0" : "h-auto opacity-100 py-2"
                )}>
                    <div className="max-w-[95%] mx-auto px-4 flex justify-between items-center">
                        <div className="flex items-center gap-6">
                            <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">{COMPANY.email}</a>
                            <a href={`tel:${COMPANY.phone}`} className="hover:text-white transition-colors">{COMPANY.phoneDisplay}</a>
                            <span className="hover:text-white transition-colors cursor-default">{COMPANY.address}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <a
                                href={`https://wa.me/${COMPANY.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors font-medium"
                            >
                                WhatsApp
                            </a>
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
                            <div className={cn(
                                "relative w-10 h-10 lg:w-12 lg:h-12 overflow-hidden rounded-2xl shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg",
                                isOverlay ? "bg-white/95 ring-1 ring-white/30" : "bg-white ring-1 ring-slate-200"
                            )}>
                                <NextImage
                                    src="/images/sojif-mark.svg"
                                    alt={COMPANY.name}
                                    fill
                                    className="object-contain"
                                    sizes="48px"
                                    priority
                                />
                            </div>
                            <div className="hidden sm:block">
                                <div className={cn(
                                    'font-bold text-lg leading-tight transition-colors duration-300',
                                    isOverlay ? 'text-white drop-shadow-md' : 'text-dark'
                                )}>
                                    {COMPANY.name}
                                </div>
                                <div className={cn(
                                    'text-[10px] tracking-wider uppercase transition-colors duration-300',
                                    isOverlay ? 'text-white/90 drop-shadow-sm' : 'text-primary font-semibold'
                                )}>
                                    {COMPANY.signature}
                                </div>
                            </div>
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden xl:flex items-center gap-1">
                            {navItems.map((item) => {
                                const active = isNavItemActive(item, pathname);
                                const dropdownOpen = openDropdown === item.label;

                                return (
                                    <div
                                        key={item.label}
                                        className="relative"
                                        onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                                        onMouseLeave={() => setOpenDropdown(null)}
                                        onFocus={() => item.children && setOpenDropdown(item.label)}
                                        onBlur={(event) => {
                                            const nextTarget = event.relatedTarget;
                                            if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
                                                setOpenDropdown(null);
                                            }
                                        }}
                                    >
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1.5',
                                                isOverlay
                                                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                                                    : 'text-dark/75 hover:text-primary hover:bg-primary/5',
                                                active && (isOverlay ? 'bg-white/15 text-white' : 'bg-primary/10 text-primary')
                                            )}
                                            aria-haspopup={item.children ? 'true' : undefined}
                                            aria-expanded={item.children ? dropdownOpen : undefined}
                                            aria-current={active ? 'page' : undefined}
                                        >
                                            {t(item.label)}
                                            {item.children && (
                                                <ChevronDown className={cn(
                                                    "w-3.5 h-3.5 transition-transform duration-200",
                                                    dropdownOpen && "rotate-180"
                                                )} />
                                            )}
                                        </Link>

                                        {/* Dropdown */}
                                        <AnimatePresence>
                                            {item.children && dropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                                    transition={{ duration: 0.18, ease: "easeOut" }}
                                                    className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-md rounded-xl shadow-xl shadow-black/10 border border-gray-100 py-2 z-50 overflow-hidden ring-1 ring-black/5"
                                                >
                                                    {item.children.map((child) => {
                                                        const childActive = pathMatches(child.href, pathname);

                                                        return (
                                                            <Link
                                                                key={child.href}
                                                                href={child.href}
                                                                className={cn(
                                                                    "block px-4 py-3 text-sm transition-colors border-l-2",
                                                                    childActive
                                                                        ? "text-primary bg-primary/5 border-primary font-semibold"
                                                                        : "text-dark/70 hover:text-primary hover:bg-primary/5 border-transparent hover:border-primary"
                                                                )}
                                                                aria-current={childActive ? 'page' : undefined}
                                                            >
                                                                {t(child.label)}
                                                            </Link>
                                                        );
                                                    })}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </nav>

                        {/* CTA + Mobile toggle */}
                        <div className="flex items-center gap-3">
                            <Link
                                href={'/contact'}
                                className={cn(
                                    "hidden xl:inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold tracking-wide text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 active:scale-[0.98]",
                                    isOverlay && "bg-white text-primary hover:bg-white/90 hover:text-primary-dark shadow-none"
                                )}
                            >
                                {t('nav.requestDemo')}
                            </Link>
                            <button
                                onClick={() => setMobileOpen(true)}
                                className={cn(
                                    "xl:hidden p-2 rounded-lg transition-all duration-300",
                                    !isOverlay
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

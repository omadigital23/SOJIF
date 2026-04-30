'use client';

import { useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ChevronDown, MessageCircle, Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { COMPANY } from '@/lib/constants';

interface NavItem {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
}

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
    items: NavItem[];
    locale: string;
}

const pathMatches = (href: string, pathname: string) => (
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
);

export default function MobileNav({ isOpen, onClose, items, locale }: MobileNavProps) {
    const t = useTranslations();
    const pathname = usePathname() || '/';
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

    const isItemActive = (item: NavItem) => (
        pathMatches(item.href, pathname) ||
        Boolean(item.children?.some((child) => pathMatches(child.href, pathname)))
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 xl:hidden"
                        onClick={onClose}
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 xl:hidden shadow-2xl"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <div>
                                    <span className="font-bold text-dark text-lg">Menu</span>
                                    <p className="text-xs text-neutral-gray mt-0.5">{COMPANY.name}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    aria-label={t('common.close')}
                                >
                                    <X className="w-5 h-5 text-dark" />
                                </button>
                            </div>

                            {/* Nav items */}
                            <nav className="flex-1 overflow-y-auto py-4">
                                {items.map((item) => {
                                    const active = isItemActive(item);
                                    const sectionOpen = openSections[item.label] ?? active;

                                    return (
                                        <div key={item.label}>
                                            <div className="flex items-center">
                                                <Link
                                                    href={item.href}
                                                    onClick={onClose}
                                                    className={cn(
                                                        "flex-1 px-6 py-3 font-medium transition-colors",
                                                        active
                                                            ? "text-primary bg-primary/5"
                                                            : "text-dark/80 hover:text-primary hover:bg-primary/5"
                                                    )}
                                                    aria-current={active ? 'page' : undefined}
                                                >
                                                    {t(item.label)}
                                                </Link>
                                                {item.children && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpenSections((current) => ({
                                                            ...current,
                                                            [item.label]: !sectionOpen,
                                                        }))}
                                                        className={cn(
                                                            "mr-3 h-9 w-9 rounded-lg flex items-center justify-center transition-colors",
                                                            active ? "text-primary bg-primary/10" : "text-dark/60 hover:bg-gray-100"
                                                        )}
                                                        aria-label={`${t(item.label)} submenu`}
                                                        aria-expanded={sectionOpen}
                                                    >
                                                        <ChevronDown className={cn("w-4 h-4 transition-transform", sectionOpen && "rotate-180")} />
                                                    </button>
                                                )}
                                            </div>

                                            <AnimatePresence initial={false}>
                                                {item.children && sectionOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.18 }}
                                                        className="overflow-hidden bg-slate-50"
                                                    >
                                                        {item.children.map((child) => {
                                                            const childActive = pathMatches(child.href, pathname);

                                                            return (
                                                                <Link
                                                                    key={child.href}
                                                                    href={child.href}
                                                                    onClick={onClose}
                                                                    className={cn(
                                                                        "block pl-10 pr-6 py-2.5 text-sm transition-colors border-l-2",
                                                                        childActive
                                                                            ? "text-primary bg-primary/5 border-primary font-semibold"
                                                                            : "text-neutral-gray hover:text-primary hover:bg-primary/5 border-transparent"
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

                            {/* CTA */}
                            <div className="p-4 border-t border-gray-100">
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                    <a
                                        href={`tel:${COMPANY.phone}`}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-semibold text-dark hover:border-primary hover:text-primary transition-colors"
                                    >
                                        <Phone className="w-4 h-4" />
                                        {locale === 'fr' ? 'Appeler' : 'Call'}
                                    </a>
                                    <a
                                        href={`https://wa.me/${COMPANY.whatsapp}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-3 py-2.5 text-sm font-semibold text-white hover:bg-green-600 transition-colors"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        WhatsApp
                                    </a>
                                </div>
                                <Link
                                    href={'/contact'}
                                    onClick={onClose}
                                    className="btn-primary w-full text-center"
                                >
                                    {t('nav.requestDemo')}
                                </Link>
                                <div className="mt-3 flex justify-center gap-4 text-sm">
                                    <Link
                                        href={'/'} locale="fr"
                                        onClick={onClose}
                                        className={`${locale === 'fr' ? 'text-primary font-semibold' : 'text-neutral-gray'}`}
                                    >
                                        FR
                                    </Link>
                                    <span className="text-gray-300">|</span>
                                    <Link
                                        href={'/'} locale="en"
                                        onClick={onClose}
                                        className={`${locale === 'en' ? 'text-primary font-semibold' : 'text-neutral-gray'}`}
                                    >
                                        EN
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

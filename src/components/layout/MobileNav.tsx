'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function MobileNav({ isOpen, onClose, items, locale }: MobileNavProps) {
    const t = useTranslations();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                        onClick={onClose}
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <span className="font-bold text-dark text-lg">Menu</span>
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
                                {items.map((item) => (
                                    <div key={item.label}>
                                        <Link
                                            href={item.href}
                                            onClick={onClose}
                                            className="block px-6 py-3 text-dark/80 hover:text-primary hover:bg-primary/5 font-medium transition-colors"
                                        >
                                            {t(item.label)}
                                        </Link>
                                        {item.children && (
                                            <div className="pl-4">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        onClick={onClose}
                                                        className="block px-6 py-2 text-sm text-neutral-gray hover:text-primary hover:bg-primary/5 transition-colors"
                                                    >
                                                        {t(child.label)}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>

                            {/* CTA */}
                            <div className="p-4 border-t border-gray-100">
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

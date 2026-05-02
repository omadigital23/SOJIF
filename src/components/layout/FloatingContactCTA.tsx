'use client';

import { useEffect, useState } from 'react';
import { usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { COMPANY } from '@/lib/constants';

type WhatsAppMarkProps = {
    className?: string;
};

function WhatsAppMark({ className }: WhatsAppMarkProps) {
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            className={className}
            aria-hidden="true"
            focusable="false"
        >
            <path
                d="M16 3.5c-6.74 0-12.2 5.2-12.2 11.62 0 2.25.67 4.35 1.84 6.12L4 28.5l7.46-1.9A12.78 12.78 0 0 0 16 27.44c6.74 0 12.2-5.2 12.2-11.62S22.74 3.5 16 3.5Z"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
            <path
                d="M21.28 18.86c-.28-.14-1.63-.77-1.88-.86-.25-.1-.43-.14-.61.14-.18.27-.7.86-.86 1.04-.16.18-.32.2-.6.07-.28-.14-1.17-.42-2.23-1.32-.82-.7-1.38-1.56-1.54-1.82-.16-.27-.02-.42.12-.55.13-.12.28-.32.42-.48.14-.16.18-.27.28-.45.09-.18.05-.34-.02-.48-.07-.13-.61-1.4-.84-1.92-.22-.5-.44-.43-.61-.44h-.52c-.18 0-.47.07-.72.34-.25.27-.95.88-.95 2.15 0 1.27.98 2.5 1.12 2.67.14.18 1.94 2.82 4.7 3.95.66.27 1.17.43 1.57.55.66.2 1.26.17 1.73.1.53-.08 1.63-.64 1.86-1.25.23-.61.23-1.13.16-1.25-.07-.11-.25-.18-.53-.31Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default function FloatingContactCTA() {
    const locale = useLocale();
    const pathname = usePathname() || '/';
    const isHome = pathname === '/';
    const [showMobileBar, setShowMobileBar] = useState(false);

    useEffect(() => {
        if (!isHome) {
            return;
        }

        const handleScroll = () => setShowMobileBar(window.scrollY > 480);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);
    const mobileBarVisible = !isHome || showMobileBar;

    if (pathname.startsWith('/admin') || pathname.startsWith('/contact')) {
        return null;
    }

    const labels = locale === 'fr'
        ? {
            whatsapp: 'Discuter sur WhatsApp',
            message: 'Bonjour SOJIF Consulting, je souhaite planifier un diagnostic gratuit.',
        }
        : {
            whatsapp: 'Chat on WhatsApp',
            message: 'Hello SOJIF Consulting, I would like to schedule a free diagnostic.',
        };
    const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(labels.message)}`;

    return (
        <>
            <div
                className={`fixed bottom-6 right-6 z-40 hidden transition-all duration-300 md:block ${
                    mobileBarVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'
                }`}
            >
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 overflow-visible rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_30px_rgba(7,94,84,0.28)] ring-1 ring-white/45 transition-all hover:-translate-y-0.5 hover:bg-[#1FC45C] hover:shadow-[0_20px_38px_rgba(7,94,84,0.34)]"
                    aria-label={labels.whatsapp}
                >
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-20 motion-safe:animate-ping" />
                    <span aria-hidden="true" className="pointer-events-none absolute inset-[-5px] rounded-full bg-[#25D366]/20 blur-md" />
                    <span aria-hidden="true" className="pointer-events-none absolute inset-[-3px] rounded-full border border-[#25D366]/55 shadow-[0_0_22px_rgba(37,211,102,0.5)]" />
                    <WhatsAppMark className="relative h-6 w-6 drop-shadow-sm" />
                    <span className="relative">WhatsApp</span>
                </a>
            </div>
            <div
                className={`fixed bottom-4 right-4 z-40 transition-all duration-300 md:hidden ${
                    mobileBarVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'
                }`}
            >
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_30px_rgba(7,94,84,0.28)] ring-1 ring-white/45 transition-all hover:-translate-y-0.5 hover:bg-[#1FC45C] hover:shadow-[0_20px_38px_rgba(7,94,84,0.34)]"
                    aria-label={labels.whatsapp}
                >
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-25 motion-safe:animate-ping" />
                    <span aria-hidden="true" className="pointer-events-none absolute inset-[-6px] rounded-full bg-[#25D366]/20 blur-md" />
                    <span aria-hidden="true" className="pointer-events-none absolute inset-[-4px] rounded-full border border-[#25D366]/55 shadow-[0_0_22px_rgba(37,211,102,0.5)]" />
                    <WhatsAppMark className="relative h-7 w-7 drop-shadow-sm" />
                </a>
            </div>
        </>
    );
}

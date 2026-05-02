'use client';

import { useEffect, useState } from 'react';
import { usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { COMPANY } from '@/lib/constants';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

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
                    <WhatsAppIcon className="relative h-6 w-6 drop-shadow-sm" />
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
                    <WhatsAppIcon className="relative h-7 w-7 drop-shadow-sm" />
                </a>
            </div>
        </>
    );
}

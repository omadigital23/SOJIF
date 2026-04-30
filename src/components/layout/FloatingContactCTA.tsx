'use client';

import { useEffect, useState } from 'react';
import { usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

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
                    className="inline-flex items-center gap-3 rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-950/20 ring-1 ring-white/40 transition-all hover:-translate-y-0.5 hover:bg-emerald-600"
                    aria-label={labels.whatsapp}
                >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    <span>WhatsApp</span>
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
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-950/20 ring-1 ring-white/40 transition-colors hover:bg-emerald-600"
                    aria-label={labels.whatsapp}
                >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </a>
            </div>
        </>
    );
}

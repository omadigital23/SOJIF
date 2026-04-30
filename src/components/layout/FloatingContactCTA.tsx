'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { MessageCircle, Phone, Send } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export default function FloatingContactCTA() {
    const locale = useLocale();
    const pathname = usePathname() || '/';

    if (pathname.startsWith('/admin')) {
        return null;
    }

    const labels = locale === 'fr'
        ? {
            diagnostic: 'Diagnostic gratuit',
            whatsapp: 'WhatsApp',
            call: 'Appeler',
            contact: 'Contact',
        }
        : {
            diagnostic: 'Free diagnostic',
            whatsapp: 'WhatsApp',
            call: 'Call',
            contact: 'Contact',
        };

    return (
        <>
            <div className="fixed bottom-5 right-5 z-40 hidden md:flex flex-col items-end gap-2">
                <a
                    href={`https://wa.me/${COMPANY.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-950/15 transition-colors hover:bg-green-600"
                    aria-label={labels.whatsapp}
                >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    {labels.whatsapp}
                </a>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-dark"
                    aria-label={labels.diagnostic}
                >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {labels.diagnostic}
                </Link>
            </div>

            <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-2 rounded-xl border border-gray-200 bg-white/95 p-2 shadow-xl shadow-slate-950/10 backdrop-blur md:hidden">
                <a
                    href={`tel:${COMPANY.phone}`}
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-dark transition-colors hover:bg-slate-100"
                >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {labels.call}
                </a>
                <a
                    href={`https://wa.me/${COMPANY.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-green-500 px-2 text-xs font-semibold text-white transition-colors hover:bg-green-600"
                >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    {labels.whatsapp}
                </a>
                <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-primary px-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {labels.contact}
                </Link>
            </div>
        </>
    );
}

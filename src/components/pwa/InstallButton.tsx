'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

type InstallButtonProps = {
    variant?: 'desktop' | 'mobile';
    onInstalled?: () => void;
};

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let appInstalled = false;
const listeners = new Set<() => void>();

const notifyListeners = () => {
    listeners.forEach((listener) => listener());
};

const isStandalone = () => (
    typeof window !== 'undefined' &&
    window.matchMedia('(display-mode: standalone)').matches ||
    (
        typeof window !== 'undefined' &&
        'standalone' in window.navigator &&
        Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone)
    )
);

export default function InstallButton({ variant = 'desktop', onInstalled }: InstallButtonProps) {
    const t = useTranslations('pwa');
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(() => deferredPrompt);
    const [installed, setInstalled] = useState(() => appInstalled || isStandalone());

    useEffect(() => {
        const syncState = () => {
            setInstallPrompt(deferredPrompt);
            setInstalled(appInstalled || isStandalone());
        };

        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            deferredPrompt = event as BeforeInstallPromptEvent;
            appInstalled = false;
            notifyListeners();
        };

        const handleInstalled = () => {
            appInstalled = true;
            deferredPrompt = null;
            notifyListeners();
            onInstalled?.();
        };

        listeners.add(syncState);
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleInstalled);

        return () => {
            listeners.delete(syncState);
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleInstalled);
        };
    }, [onInstalled]);

    if (installed || !installPrompt) {
        return null;
    }

    const handleInstall = async () => {
        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;

        if (choice.outcome === 'accepted') {
            appInstalled = true;
            onInstalled?.();
        }

        deferredPrompt = null;
        notifyListeners();
    };

    return (
        <button
            type="button"
            onClick={handleInstall}
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 active:scale-[0.98]',
                variant === 'desktop'
                    ? 'hidden xl:inline-flex border border-primary/20 bg-white px-4 py-2.5 text-sm text-primary hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5'
                    : 'w-full rounded-lg border border-primary/15 bg-primary/5 px-3 py-2.5 text-sm text-primary hover:bg-primary/10'
            )}
            aria-label={t('installAria')}
        >
            <Download className="h-4 w-4" aria-hidden="true" />
            {t('install')}
        </button>
    );
}

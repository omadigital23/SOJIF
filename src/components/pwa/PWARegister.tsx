'use client';

import { useEffect } from 'react';

export default function PWARegister() {
    useEffect(() => {
        if (!('serviceWorker' in navigator)) {
            return;
        }

        const register = () => {
            navigator.serviceWorker.register('/sw.js').catch(() => {
                // Service worker registration can fail in private browsing or restricted contexts.
            });
        };

        if (document.readyState === 'complete') {
            register();
            return;
        }

        window.addEventListener('load', register, { once: true });
        return () => window.removeEventListener('load', register);
    }, []);

    return null;
}

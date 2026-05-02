import type { SVGProps } from 'react';

type WhatsAppIconProps = SVGProps<SVGSVGElement>;

export default function WhatsAppIcon({ className, ...props }: WhatsAppIconProps) {
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            className={className}
            aria-hidden="true"
            focusable="false"
            {...props}
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

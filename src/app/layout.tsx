import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'SOJIF Consulting',
    description: 'Cabinet de Structuration & Performance des Entreprises',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

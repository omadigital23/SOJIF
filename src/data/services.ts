import type { DigitalService } from '@/lib/types';

// Le contenu réel (title, description, features) est dans les fichiers i18n
// (fr.json / en.json) sous digitalization.servicesList.<index>.*
// Ici on définit uniquement l'icône et le nombre de features par service
// pour permettre à DigitalizationPage d'itérer correctement

export const digitalServices: DigitalService[] = [
    { icon: 'Globe',         featuresCount: 4 },
    { icon: 'ShoppingCart',  featuresCount: 4 },
    { icon: 'Layout',        featuresCount: 4 },
    { icon: 'Smartphone',    featuresCount: 4 },
    { icon: 'Settings',      featuresCount: 4 },
    { icon: 'Palette',       featuresCount: 4 },
    { icon: 'GraduationCap', featuresCount: 4 },
];

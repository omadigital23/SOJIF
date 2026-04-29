import { COMPANY } from '@/lib/constants';
import { PUBLIC_SITE_URL } from '@/lib/site-url';

type JsonLdProps = {
    locale: string;
    type?: 'LocalBusiness' | 'Service' | 'BreadcrumbList';
    serviceData?: {
        name: string;
        description: string;
        slug: string;
    };
    breadcrumbs?: Array<{
        name: string;
        url: string;
    }>;
};

export default function JsonLd({ locale, type = 'LocalBusiness', serviceData, breadcrumbs }: JsonLdProps) {
    const schemas: object[] = [];

    // Always include Organization + LocalBusiness
    const localBusiness = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${PUBLIC_SITE_URL}/#organization`,
        name: COMPANY.name,
        alternateName: 'SOJIF',
        description: locale === 'fr'
            ? 'Cabinet d\'expertise en droit des affaires, fiscalité, comptabilité, ressources humaines et conseil stratégique à Dakar, Sénégal.'
            : 'Leading business law, taxation, accounting, HR and strategic consulting firm in Dakar, Senegal.',
        url: PUBLIC_SITE_URL,
        logo: `${PUBLIC_SITE_URL}/images/logo_sojif.jpg`,
        image: `${PUBLIC_SITE_URL}/images/logo_sojif.jpg`,
        telephone: COMPANY.phone,
        email: COMPANY.email,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Dakar',
            addressRegion: 'Dakar',
            addressCountry: 'SN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 14.7167,
            longitude: -17.4441,
        },
        areaServed: [
            { '@type': 'Country', name: 'Senegal' },
            { '@type': 'Country', name: 'Côte d\'Ivoire' },
            { '@type': 'Country', name: 'Mali' },
            { '@type': 'Country', name: 'Burkina Faso' },
            { '@type': 'Country', name: 'Guinea' },
            { '@type': 'Country', name: 'Togo' },
            { '@type': 'Country', name: 'Benin' },
            { '@type': 'Country', name: 'Niger' },
        ],
        priceRange: '$$',
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:00',
        },
        founder: {
            '@type': 'Person',
            name: COMPANY.director,
            jobTitle: COMPANY.directorTitle,
        },
        sameAs: [],
    };
    schemas.push(localBusiness);

    // WebSite schema with search
    const website = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: COMPANY.name,
        url: PUBLIC_SITE_URL,
        inLanguage: [locale === 'fr' ? 'fr-FR' : 'en-US'],
        potentialAction: {
            '@type': 'SearchAction',
            target: `${PUBLIC_SITE_URL}/${locale}/recherche?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };
    schemas.push(website);

    // Service schema for department pages
    if (type === 'Service' && serviceData) {
        const service = {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: serviceData.name,
            description: serviceData.description,
            provider: {
                '@type': 'LocalBusiness',
                '@id': `${PUBLIC_SITE_URL}/#organization`,
                name: COMPANY.name,
            },
            areaServed: {
                '@type': 'Country',
                name: 'Senegal',
            },
            url: `${PUBLIC_SITE_URL}/${locale}/departements/${serviceData.slug}`,
        };
        schemas.push(service);
    }

    // Breadcrumb schema
    if (type === 'BreadcrumbList' && breadcrumbs && breadcrumbs.length > 0) {
        const breadcrumbSchema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((crumb, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: crumb.name,
                item: crumb.url,
            })),
        };
        schemas.push(breadcrumbSchema);
    }

    return (
        <>
            {schemas.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </>
    );
}

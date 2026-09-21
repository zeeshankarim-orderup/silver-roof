import type { Metadata } from 'next';
import { localeHreflang, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { SITE_URL, site, socialLinks } from '@/lib/site';
import type { Locale } from '@/types';

/** Built once per locale and reused by the page and the legal routes. */
export function buildMetadata(locale: Locale, path = ''): Metadata {
  const dict = getDictionary(locale);
  const canonical = `${SITE_URL}/${locale}${path}`;

  const languages = Object.fromEntries(
    locales.map((candidate) => [localeHreflang[candidate], `${SITE_URL}/${candidate}${path}`]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: site.companyName,
    alternates: {
      canonical,
      languages: { ...languages, 'x-default': `${SITE_URL}/en${path}` },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: site.companyName,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: locale === 'ar' ? 'ar_SA' : 'en_SA',
      images: [{ url: '/images/hero.jpg', width: 1200, height: 630, alt: dict.meta.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: ['/images/hero.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
      apple: '/apple-icon.png',
    },
    category: 'construction',
  };
}

/**
 * LocalBusiness markup for the Jeddah listing.
 *
 * Deliberately omits aggregateRating, review, foundingDate, numberOfEmployees
 * and priceRange - none of that has been supplied, and inventing it would be
 * both dishonest and a structured-data violation. Add them once they are real.
 */
export function buildLocalBusinessJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  const isAr = locale === 'ar';
  const address = site.address;

  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: isAr ? site.companyNameAr : site.companyName,
    alternateName: isAr ? site.companyName : site.companyNameAr,
    url: `${SITE_URL}/${locale}`,
    description: dict.meta.description,
    image: `${SITE_URL}/images/hero.jpg`,
    logo: `${SITE_URL}/icon.svg`,
    telephone: site.phone,
    email: site.email,
    inLanguage: isAr ? 'ar-SA' : 'en-SA',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: isAr ? address.cityAr : address.city,
      addressRegion: isAr ? address.regionAr : address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: [
      { '@type': 'City', name: isAr ? address.cityAr : address.city },
      { '@type': 'Country', name: isAr ? address.countryNameAr : address.countryName },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    ...(socialLinks.length > 0 ? { sameAs: socialLinks.map((link) => link.url) } : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: dict.services.label,
      itemListElement: Object.values(dict.services.items).map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, description: service.description },
      })),
    },
  };
}

export function buildWebsiteJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/${locale}`,
    name: locale === 'ar' ? site.companyNameAr : site.companyName,
    inLanguage: locale === 'ar' ? 'ar-SA' : 'en-SA',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

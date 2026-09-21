import type { MetadataRoute } from 'next';
import { localeHreflang, locales } from '@/i18n/config';
import { SITE_URL } from '@/lib/site';

/** The landing page in both locales. Legal pages are noindex, so they are out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: locale === 'en' ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        locales.map((candidate) => [localeHreflang[candidate], `${SITE_URL}/${candidate}`]),
      ),
    },
  }));
}

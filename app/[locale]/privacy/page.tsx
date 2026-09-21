import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/LegalPage';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    ...buildMetadata(locale, '/privacy'),
    title: `${dict.legal.privacyTitle} | ${dict.meta.title}`,
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : 'en') as Locale;
  const dict = getDictionary(locale);

  return (
    <LegalPage
      locale={locale}
      dict={dict}
      title={dict.legal.privacyTitle}
      body={dict.legal.privacyBody}
    />
  );
}

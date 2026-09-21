import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Cormorant_Garamond, IBM_Plex_Sans_Arabic, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { DirectionProvider } from '@/components/providers/DirectionProvider';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { getDirection, isLocale, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/types';
import '@/styles/globals.css';

/**
 * Display serif for headlines, neutral grotesk for everything else, and a
 * single Arabic family that covers both roles - there is no serif Arabic
 * equivalent that would read as premium at headline size.
 */
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-arabic',
  display: 'swap',
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBF9F5' },
    { media: '(prefers-color-scheme: dark)', color: '#1B1D1E' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale = raw as Locale;
  const dir = getDirection(locale);
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${display.variable} ${sans.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bone">
        <DirectionProvider locale={locale} dir={dir}>
          <Header locale={locale} dict={dict} />
          <main id="main">{children}</main>
          <Footer locale={locale} dict={dict} />
          <FloatingWhatsApp
            label={dict.common.chatOnWhatsapp}
            message={dict.hero.whatsappMessage}
          />
        </DirectionProvider>
      </body>
    </html>
  );
}

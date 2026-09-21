import type { Locale, Direction } from '@/types';

export const locales: Locale[] = ['en', 'ar'];
export const defaultLocale: Locale = 'ar';

export const localeDirection: Record<Locale, Direction> = {
  en: 'ltr',
  ar: 'rtl',
};

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
};

/** hreflang values for <link rel="alternate">. */
export const localeHreflang: Record<Locale, string> = {
  en: 'en-SA',
  ar: 'ar-SA',
};

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export function getDirection(locale: Locale): Direction {
  return localeDirection[locale];
}

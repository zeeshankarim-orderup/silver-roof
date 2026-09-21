import type { Locale } from '@/types';
import { en, type Dictionary } from './en';
import { ar } from './ar';

const dictionaries: Record<Locale, Dictionary> = { en, ar };

/**
 * Dictionaries are plain modules rather than dynamic imports: the whole site is
 * statically generated per locale, so there is nothing to defer and Server
 * Components can read copy synchronously.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales } from '@/i18n/config';
import type { Locale } from '@/types';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
  tone?: 'dark' | 'light';
  className?: string;
}

/**
 * Swaps the locale segment of the current path, so the visitor stays on the
 * page they were reading. Rendered as a real link - crawlable, and it works
 * without JavaScript.
 */
export function LanguageSwitcher({
  locale,
  label,
  tone = 'dark',
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const other = locales.find((candidate) => candidate !== locale) ?? locale;

  const segments = pathname.split('/');
  segments[1] = other;
  const href = segments.join('/') || `/${other}`;

  return (
    <Link
      href={href}
      hrefLang={other}
      lang={other}
      aria-label={label}
      className={cn(
        'rounded-frame px-2.5 py-1.5 text-sm transition-colors duration-300 ease-architectural',
        tone === 'light'
          ? 'text-bone/75 hover:text-bone'
          : 'text-graphite-500 hover:text-graphite-900',
        className,
      )}
    >
      {other === 'ar' ? 'العربية' : 'English'}
    </Link>
  );
}

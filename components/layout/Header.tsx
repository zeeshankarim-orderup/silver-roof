'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { navigation } from '@/data/navigation';
import type { Dictionary } from '@/i18n/dictionaries';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

/** Sections the scroll spy watches, in document order. */
const SPY_IDS = navigation.filter((item) => item.href.startsWith('#')).map((item) => item.href.slice(1));

export function Header({ locale, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>('top');
  const reduce = useReducedMotion();

  // Solid background once the hero is behind us.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy - a single observer, no scroll handler doing layout reads.
  useEffect(() => {
    const sections = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const onHero = !scrolled && !menuOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[90] focus:rounded-frame focus:bg-graphite-900 focus:px-4 focus:py-2 focus:text-sm focus:text-bone"
      >
        {dict.nav.skipToContent}
      </a>

      <motion.header
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        className={cn(
          'fixed inset-x-0 top-0 z-[60] transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-architectural',
          onHero
            ? 'border-b border-transparent bg-transparent'
            : 'border-b border-graphite-900/8 bg-bone/85 shadow-[0_1px_0_rgba(27,29,30,0.04)] backdrop-blur-xl',
        )}
      >
        <div className="shell flex h-20 items-center justify-between gap-6 lg:h-24">
          <Link
            href={`/${locale}`}
            aria-label={dict.a11y.logoAlt}
            className="rounded-frame transition-opacity duration-300 hover:opacity-80"
          >
            <Logo  />
          </Link>

          <nav aria-label={dict.nav.menu} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const id = item.href.slice(1);
                const isActive = active === id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'relative rounded-frame px-3.5 py-2 text-[0.95rem] transition-colors duration-300 ease-architectural',
                        onHero
                          ? 'text-bone/80 hover:text-bone'
                          : 'text-graphite-500 hover:text-graphite-900',
                        isActive && (onHero ? 'text-bone' : 'text-graphite-900'),
                      )}
                    >
                      {dict.nav[item.id as keyof typeof dict.nav]}
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active"
                          className={cn(
                            'absolute inset-x-3.5 -bottom-0.5 h-px',
                            onHero ? 'bg-bone/70' : 'bg-brass-500',
                          )}
                          transition={{ duration: 0.4, ease: EASE }}
                        />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 lg:gap-3">
            <LanguageSwitcher
              locale={locale}
              label={dict.common.language}
              tone={onHero ? 'light' : 'dark'}
            />

            <Button
              href="#contact"
              size="sm"
              variant={onHero ? 'light' : 'primary'}
              className="hidden sm:inline-flex"
            >
              {dict.nav.quote}
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={dict.nav.openMenu}
              aria-expanded={menuOpen}
              className={cn(
                'rounded-frame p-2.5 transition-colors duration-300 lg:hidden',
                onHero ? 'text-bone' : 'text-graphite-900',
              )}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} dict={dict} />
    </>
  );
}

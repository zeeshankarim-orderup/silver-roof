'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { useDirection } from '@/components/providers/DirectionProvider';
import { navigation } from '@/data/navigation';
import type { Dictionary } from '@/i18n/dictionaries';
import { EASE } from '@/lib/motion';
import { site, telHref, whatsappHref } from '@/lib/site';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  dict: Dictionary;
}

export function MobileMenu({ open, onClose, dict }: MobileMenuProps) {
  const { axis } = useDirection();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock the page behind the panel and wire up Escape.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    // Move focus into the panel so keyboard users are not left behind it.
    const firstLink = panelRef.current?.querySelector<HTMLElement>('a, button');
    firstLink?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label={dict.nav.closeMenu}
            className="absolute inset-0 bg-graphite-950/45 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={dict.nav.menu}
            className="absolute inset-y-0 end-0 flex w-[min(24rem,88vw)] flex-col bg-bone shadow-panel"
            initial={reduce ? { opacity: 0 } : { x: `${100 * axis}%` }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: `${100 * axis}%` }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="flex items-center justify-between border-b rule-hair px-6 py-5">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label={dict.nav.closeMenu}
                className="rounded-frame p-2 text-graphite-500 transition-colors hover:text-graphite-900"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label={dict.nav.menu}>
              <ul className="space-y-1">
                {navigation.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05, ease: EASE }}
                  >
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="block border-b rule-hair py-4 font-display text-2xl text-graphite-900 transition-colors duration-300 hover:text-brass-600"
                    >
                      {dict.nav[item.id as keyof typeof dict.nav]}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 space-y-3">
                <Button href="#contact" onClick={onClose} className="w-full" size="lg">
                  {dict.common.requestQuote}
                </Button>
                <Button
                  href={whatsappHref(dict.hero.whatsappMessage)}
                  variant="whatsapp"
                  size="lg"
                  className="w-full"
                  trackAs="whatsapp_click"
                  onClick={onClose}
                >
                  {dict.common.whatsapp}
                </Button>
              </div>

              <dl className="mt-10 space-y-4 text-sm">
                <div>
                  <dt className="text-graphite-400">{dict.contact.phone}</dt>
                  <dd className="mt-1">
                    <a href={telHref} dir="ltr" className="text-graphite-900 hover:text-brass-600">
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-graphite-400">{dict.contact.email}</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${site.email}`}
                      dir="ltr"
                      className="text-graphite-900 hover:text-brass-600"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </nav>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

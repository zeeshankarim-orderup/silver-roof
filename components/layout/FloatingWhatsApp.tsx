'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { track } from '@/lib/analytics';
import { EASE } from '@/lib/motion';
import { whatsappHref } from '@/lib/site';

interface FloatingWhatsAppProps {
  label: string;
  message: string;
}

/**
 * Appears once the visitor is past the hero - showing it immediately competes
 * with the hero's own WhatsApp button. The pulse runs on a long, low-opacity
 * cycle so it reads as a status light rather than an alert.
 */
export function FloatingWhatsApp({ label, message }: FloatingWhatsAppProps) {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href={whatsappHref(message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          onClick={() => track('whatsapp_click', { source: 'floating_button' })}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.45, ease: EASE }}
          whileHover={reduce ? undefined : { scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="fixed bottom-5 end-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1FA855] text-white shadow-lift sm:bottom-7 sm:end-7"
        >
          {!reduce ? (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[#1FA855] animate-pulse-ring"
            />
          ) : null}

          <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-current" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.13-.27-.2-.57-.35Z" />
            <path d="M12.04 2h-.01C6.5 2 2 6.5 2 12.04c0 1.78.47 3.5 1.35 5.02L2 22l5.08-1.33a10 10 0 0 0 4.96 1.3h.01c5.53 0 10.03-4.5 10.03-10.03C22.08 6.5 17.58 2 12.04 2Zm0 18.13a8.06 8.06 0 0 1-4.1-1.12l-.3-.18-3.02.79.8-2.94-.19-.3a8.03 8.03 0 0 1-1.23-4.29 8.1 8.1 0 0 1 8.09-8.09 8.1 8.1 0 0 1 8.08 8.1c0 4.46-3.63 8.03-8.13 8.03Z" />
          </svg>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}

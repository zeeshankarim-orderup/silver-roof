'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { DURATION, EASE, VIEWPORT } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  /** Wrapper element - use `span` inside headings to keep markup valid. */
  as?: ElementType;
}

/**
 * Masked line reveal: the text slides up from behind a clipped edge.
 * Used for headlines, where a plain fade would feel flat.
 */
export function Reveal({
  children,
  delay = 0,
  duration = DURATION.slow,
  className,
  as: Wrapper = 'span',
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <Wrapper className={className}>{children}</Wrapper>;
  }

  return (
    <Wrapper className={className} style={{ display: 'block', overflow: 'hidden' }}>
      <motion.span
        style={{ display: 'block', willChange: 'transform' }}
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={VIEWPORT}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </Wrapper>
  );
}

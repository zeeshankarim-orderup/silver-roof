'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { DURATION, VIEWPORT, transition } from '@/lib/motion';

interface FadeInProps {
  children: ReactNode;
  /** Vertical travel in px. Set to 0 for a pure cross-fade. */
  y?: number;
  delay?: number;
  duration?: number;
  className?: string;
}

/** The workhorse reveal: a short fade with a little upward travel. */
export function FadeIn({
  children,
  y = 24,
  delay = 0,
  className,
}: FadeInProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={transition(0.55, delay)}
    >
      {children}
    </motion.div>
  );
}

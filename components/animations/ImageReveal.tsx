'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE, VIEWPORT } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** Starting zoom for the inner image. 1 disables the settle. */
  scaleFrom?: number;
}

/**
 * Masked image entrance: the frame wipes open from the bottom while the picture
 * inside settles out of a slight zoom. Two separate transforms, which is what
 * keeps it from looking like a plain scale-in.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  scaleFrom = 1.14,
}: ImageRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={cn('overflow-hidden', className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: scaleFrom }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: duration + 0.35, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

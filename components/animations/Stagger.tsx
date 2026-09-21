'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { DURATION, VIEWPORT, fadeUp, staggerParent, transition } from '@/lib/motion';

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. */
  stagger?: number;
  delayChildren?: number;
}

/** Parent that releases its `StaggerItem` children one after another. */
export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerParent(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  duration?: number;
}

export function StaggerItem({ children, className, duration = DURATION.base }: StaggerItemProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduce ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : fadeUp}
      transition={transition(0.55)}
    >
      {children}
    </motion.div>
  );
}

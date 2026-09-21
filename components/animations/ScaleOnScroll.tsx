'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
}

/** Continuous scale tied to scroll position - used on full-bleed imagery. */
export function ScaleOnScroll({ children, className, from = 1.16, to = 1 }: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [from, to]);

  return (
    <div ref={ref} className={className}>
      <motion.div className="h-full w-full" style={reduce ? undefined : { scale }}>
        {children}
      </motion.div>
    </div>
  );
}

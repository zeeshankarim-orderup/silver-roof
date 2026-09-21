'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Total travel in px across the element's full scroll pass. */
  distance?: number;
}

/**
 * Very light parallax, applied to backgrounds only.
 *
 * `useScroll` drives a MotionValue, so no React re-render happens on scroll and
 * the transform stays on the compositor. Disabled entirely under
 * prefers-reduced-motion.
 */
export function Parallax({ children, className, distance = 70 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div className="h-full w-full" style={reduce ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  );
}

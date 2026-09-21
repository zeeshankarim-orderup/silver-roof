'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { useDirection } from '@/components/providers/DirectionProvider';
import { processSteps } from '@/data/process';
import type { Dictionary } from '@/i18n/dictionaries';
import { EASE, VIEWPORT } from '@/lib/motion';

/**
 * The six steps sit on a rail that draws itself as the section passes through
 * the viewport: vertically on smaller screens, horizontally on desktop. The
 * rail is the only element tied to continuous scroll - the steps themselves use
 * ordinary one-shot reveals, which keeps the scroll work cheap.
 */
export function ProcessTrack({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { dir } = useDirection();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  // In Arabic the horizontal rail grows from the right-hand end.
  const horizontalOrigin = dir === 'rtl' ? 'right' : 'left';

  return (
    <ol ref={ref} className="relative grid gap-9 lg:grid-cols-6 lg:gap-7">
      <span
        aria-hidden="true"
        className="absolute inset-y-2 start-[0.9375rem] w-px bg-graphite-900/12 lg:hidden"
      >
        <motion.span
          className="absolute inset-0 block bg-brass-500"
          style={reduce ? undefined : { scaleY: progress, transformOrigin: 'top' }}
        />
      </span>

      <span
        aria-hidden="true"
        className="absolute start-0 top-4 hidden h-px w-full bg-graphite-900/12 lg:block"
      >
        <motion.span
          className="absolute inset-0 block bg-brass-500"
          style={reduce ? undefined : { scaleX: progress, transformOrigin: horizontalOrigin }}
        />
      </span>

      {processSteps.map((step, index) => {
        const copy = dict.process.steps[step.id as keyof typeof dict.process.steps];
        const Icon = step.icon;

        return (
          <motion.li
            key={step.id}
            className="relative ps-12 lg:ps-0"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.55, delay: (index % 3) * 0.09, ease: EASE }}
          >
            <span className="absolute start-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-graphite-900/15 bg-linen text-graphite-900 lg:relative lg:mb-6">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>

            <p className="text-sm text-graphite-400">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="mt-1.5 font-display text-xl font-normal text-graphite-900">
              {copy.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-graphite-500">{copy.description}</p>
          </motion.li>
        );
      })}
    </ol>
  );
}

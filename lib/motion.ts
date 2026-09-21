import type { Transition, Variants } from 'framer-motion';

/**
 * One easing curve and one duration band for the whole site.
 *
 * Everything sits in the 300-800ms range with a slow-out curve, so section
 * reveals read as a single continuous behaviour rather than a pile of effects.
 */
type Bezier = [number, number, number, number];

export const EASE: Bezier = [0.22, 1, 0.36, 1];
export const EASE_SOFT: Bezier = [0.4, 0, 0.2, 1];

export const DURATION = {
  fast: 0.3,
  base: 0.55,
  slow: 0.8,
} as const;

/** Shared viewport rule: reveal slightly before the element is fully in frame. */
export const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' } as const;

export const transition = (duration = DURATION.base, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE,
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Bottom-up clip reveal. Direction-neutral, so it behaves identically in RTL. */
export const clipUp: Variants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)', y: 12 },
  visible: { clipPath: 'inset(0% 0% 0% 0%)', y: 0 },
};

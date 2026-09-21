'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FadeIn } from '@/components/animations';
import { useDirection } from '@/components/providers/DirectionProvider';
import { projects } from '@/data/projects';
import type { Dictionary } from '@/i18n/dictionaries';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';

export function ProjectGallery({ dict }: { dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { axis } = useDirection();
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const copy = dict.projects;
  const isOpen = openIndex !== null;

  const open = (index: number) => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    setOpenIndex(index);
  };

  const close = useCallback(() => {
    setOpenIndex(null);
    restoreFocusRef.current?.focus();
  }, []);

  const step = useCallback((delta: number) => {
    setOpenIndex((current) =>
      current === null ? current : (current + delta + projects.length) % projects.length,
    );
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      // Arrow keys follow reading direction, so they mirror in Arabic.
      if (event.key === 'ArrowRight') step(axis);
      if (event.key === 'ArrowLeft') step(-axis);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, close, step, axis]);

  const current = openIndex === null ? null : projects[openIndex];
  const currentCategory =
    current && copy.categories[current.category as keyof typeof copy.categories];

  return (
    <>
      {/* Fixed row heights on desktop turn the column spans into a real masonry:
          one tall feature, a stacked pair, a full-height portrait, two wide bands. */}
      <div className="grid grid-cols-2 gap-3 lg:auto-rows-[13rem] lg:grid-cols-12 lg:gap-4 xl:auto-rows-[15rem]">
        {projects.map((project, index) => {
          const category = copy.categories[project.category as keyof typeof copy.categories];

          return (
            <FadeIn
              key={project.id}
              y={28}
              duration={0.7}
              delay={(index % 3) * 0.08}
              className={cn('h-full', project.span)}
            >
              <button
                type="button"
                onClick={() => open(index)}
                aria-label={`${category} — ${copy.viewImage}`}
                className={cn(
                  'group relative block h-full w-full overflow-hidden rounded-frame bg-graphite-800',
                  project.aspect,
                )}
              >
                <Image
                  src={project.image}
                  alt={category}
                  fill
                  sizes="(min-width: 1024px) 45vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-architectural group-hover:scale-[1.06]"
                />

                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-graphite-950/80 via-graphite-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                />

                <span className="absolute inset-x-0 bottom-0 flex items-end p-4 lg:p-5">
                  <span className="translate-y-2 text-start text-sm text-bone opacity-0 transition-[opacity,transform] duration-500 ease-architectural group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    {category}
                  </span>
                </span>
              </button>
            </FadeIn>
          );
        })}
      </div>

      <AnimatePresence>
        {isOpen && current ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[80] flex flex-col bg-graphite-950/96 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-4 text-bone sm:px-8">
              <p className="text-sm text-silver-300">
                {currentCategory}
                <span className="mx-3 text-silver-500" aria-hidden="true">
                  /
                </span>
                {copy.counter
                  .replace('{current}', String((openIndex ?? 0) + 1))
                  .replace('{total}', String(projects.length))}
              </p>

              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label={copy.close}
                className="rounded-frame p-2 text-silver-300 transition-colors hover:text-bone"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-4 pb-8 sm:px-16">
              <motion.div
                key={current.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="relative flex max-h-full w-full items-center justify-center"
              >
                <Image
                  src={current.image}
                  alt={currentCategory ?? ''}
                  width={current.width}
                  height={current.height}
                  sizes="100vw"
                  className="max-h-[75vh] w-auto rounded-frame object-contain"
                />
              </motion.div>

              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={copy.previous}
                className="absolute start-1 top-1/2 -translate-y-1/2 rounded-frame border border-bone/20 bg-graphite-900/70 p-3 text-bone transition-colors hover:bg-graphite-900 sm:start-4"
              >
                <ArrowLeft className="flip-rtl h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label={copy.next}
                className="absolute end-1 top-1/2 -translate-y-1/2 rounded-frame border border-bone/20 bg-graphite-900/70 p-3 text-bone transition-colors hover:bg-graphite-900 sm:end-4"
              >
                <ArrowRight className="flip-rtl h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

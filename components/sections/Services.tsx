import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { FadeIn } from '@/components/animations';
import { Button } from '@/components/ui/Button';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { services } from '@/data/services';
import type { Dictionary } from '@/i18n/dictionaries';
import { cn } from '@/lib/utils';

export function Services({ dict }: { dict: Dictionary }) {
  return (
    <section id="services" className="relative scroll-mt-24 bg-bone py-20 lg:py-32">
      <div className="shell">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <SectionIntro
            className="lg:col-span-7"
            label={dict.services.label}
            heading={dict.services.heading}
            intro={dict.services.intro}
          />

          <FadeIn y={16} delay={0.2} className="lg:col-span-5 lg:justify-self-end">
            <Button href="#contact" variant="outline" size="md">
              {dict.services.cta}
            </Button>
          </FadeIn>
        </div>

        {/* Widths alternate 7/5 - 4/4/4 - 5/7 - 6/6 down the page, so no two rows
            share a rhythm. Cards stretch to their row, images fill absolutely. */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-5">
          {services.map((service, index) => {
            const copy = dict.services.items[service.id as keyof typeof dict.services.items];
            const Icon = service.icon;

            return (
              <FadeIn
                key={service.id}
                y={26}
                duration={0.65}
                // Delay by position within the row, not overall index - otherwise
                // the last cards finish animating long before they are scrolled to.
                delay={(index % 3) * 0.09}
                className={service.span}
              >
                <a
                  href="#contact"
                  className={cn(
                    'group relative flex h-full w-full overflow-hidden rounded-frame bg-graphite-900 shadow-frame',
                    'transition-[transform,box-shadow] duration-500 ease-architectural',
                    'hover:-translate-y-1.5 hover:shadow-lift focus-visible:-translate-y-1.5',
                    service.aspect,
                  )}
                >
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1100ms] ease-architectural group-hover:scale-[1.07]"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-graphite-950/92 via-graphite-950/45 to-graphite-950/5 transition-opacity duration-500 group-hover:opacity-90"
                  />

                  <div className="relative flex h-full w-full flex-col justify-between p-6 lg:p-7">
                    <div className="flex items-start justify-between">
                      <Icon
                        className="h-6 w-6 text-bone/75 transition-colors duration-500 group-hover:text-brass-300"
                        aria-hidden="true"
                      />
                      <ArrowUpRight
                        className="flip-rtl h-5 w-5 text-bone/50 transition-[transform,color] duration-500 ease-architectural group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bone"
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <h3 className="font-display text-2xl font-normal text-bone lg:text-[1.75rem]">
                        {copy.title}
                      </h3>
                      <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-silver-200/90">
                        {copy.description}
                      </p>
                    </div>
                  </div>
                </a>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { FadeIn } from '@/components/animations';
import { Button } from '@/components/ui/Button';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { advantages } from '@/data/advantages';
import type { Dictionary } from '@/i18n/dictionaries';

/**
 * The one dark band between the hero and the footer. It resets the eye halfway
 * down the page and gives the six points somewhere quiet to sit - deliberately
 * not another row of cards, and not numbered, because they are not a sequence.
 */
export function WhyUs({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="why"
      className="relative scroll-mt-24 overflow-hidden bg-graphite-900 py-20 lg:py-32"
    >
      <div aria-hidden="true" className="absolute inset-0 mullion-grid opacity-60" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass-500/40 to-transparent"
      />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionIntro
                tone="light"
                label={dict.why.label}
                heading={dict.why.heading}
                intro={dict.why.intro}
                headingClassName="text-display-md"
              />

              <FadeIn y={16} delay={0.2} className="mt-10">
                <Button href="#contact" variant="light" size="md">
                  {dict.common.requestQuote}
                </Button>
              </FadeIn>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2">
              {advantages.map((advantage, index) => {
                const copy = dict.why.items[advantage.id as keyof typeof dict.why.items];
                const Icon = advantage.icon;

                return (
                  <FadeIn
                    key={advantage.id}
                    y={22}
                    duration={0.6}
                    delay={(index % 2) * 0.1}
                    className="group border-t border-bone/12 py-7 first:border-t-0 sm:px-7 sm:first:border-t sm:[&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(odd)]:ps-0 sm:[&:nth-child(even)]:pe-0"
                  >
                    <Icon
                      className="h-6 w-6 text-brass-400 transition-transform duration-500 ease-architectural group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    <h3 className="mt-5 font-display text-2xl font-normal text-bone">
                      {copy.title}
                    </h3>
                    <p className="mt-2.5 max-w-sm text-[0.95rem] leading-relaxed text-silver-300">
                      {copy.description}
                    </p>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

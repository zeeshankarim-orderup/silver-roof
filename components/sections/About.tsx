import Image from 'next/image';
import { FadeIn, ImageReveal, StaggerContainer, StaggerItem } from '@/components/animations';
import { SectionIntro } from '@/components/ui/SectionIntro';
import type { Dictionary } from '@/i18n/dictionaries';

export function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-linen py-20 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0 mullion-grid-dark opacity-70" />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Portrait plate with a second, smaller frame breaking its corner -
              the composition an architecture monograph would use. */}
          <div className="relative lg:col-span-5">
            <ImageReveal className="rounded-frame shadow-panel" duration={1}>
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/about-main.jpg"
                  alt={dict.about.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </ImageReveal>

            <ImageReveal
              className="absolute -bottom-8 end-[-1.5rem] hidden w-40 rounded-frame border-4 border-linen shadow-lift sm:block lg:w-48"
              delay={0.25}
              duration={0.85}
              scaleFrom={1.2}
            >
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/about-detail.jpg"
                  alt={dict.about.detailAlt}
                  fill
                  sizes="12rem"
                  className="object-cover"
                />
              </div>
            </ImageReveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionIntro
              label={dict.about.label}
              heading={dict.about.heading}
              headingClassName="text-display-sm"
            />

            <div className="mt-7 space-y-5">
              {dict.about.body.map((paragraph, index) => (
                <FadeIn key={paragraph.slice(0, 24)} y={18} delay={0.1 + index * 0.08}>
                  <p className="max-w-prose text-[1.05rem] leading-relaxed text-graphite-500">
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>

            {/* Hairline-separated rows rather than four more cards. */}
            <StaggerContainer className="mt-12 grid gap-px bg-graphite-900/10 sm:grid-cols-2">
              {dict.about.values.map((value) => (
                <StaggerItem key={value.title} className="bg-linen p-6">
                  <h3 className="font-display text-xl font-normal text-graphite-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-graphite-500">
                    {value.description}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

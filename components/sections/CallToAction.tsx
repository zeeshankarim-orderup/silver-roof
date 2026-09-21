import Image from 'next/image';
import { FadeIn, Parallax, Reveal } from '@/components/animations';
import { Button } from '@/components/ui/Button';
import type { Dictionary } from '@/i18n/dictionaries';
import { telHref, whatsappHref } from '@/lib/site';

export function CallToAction({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative isolate overflow-hidden bg-graphite-900">
      <Parallax className="absolute inset-0" distance={60}>
        <div className="relative h-[125%] w-full">
          <Image
            src="/images/hero.jpg"
            alt={dict.cta.imageAlt}
            fill
            sizes="100vw"
            quality={80}
            className="object-cover"
          />
        </div>
      </Parallax>

      <div aria-hidden="true" className="absolute inset-0 bg-graphite-950/72" />
      <div aria-hidden="true" className="absolute inset-0 mullion-grid opacity-45" />

      {/* Inset frame - the aluminium profile motif at architectural scale. */}
      <div
        aria-hidden="true"
        className="absolute inset-6 border border-bone/15 lg:inset-10"
      />

      <div className="shell relative py-24 text-center lg:py-36">
        <h2 className="mx-auto max-w-4xl font-display text-display-md font-light text-bone">
          <Reveal>{dict.cta.heading}</Reveal>
          <Reveal delay={0.12} className="text-brass-300">
            {dict.cta.subheading}
          </Reveal>
        </h2>

        <FadeIn y={18} delay={0.28}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-silver-200">
            {dict.cta.body}
          </p>
        </FadeIn>

        <FadeIn y={18} delay={0.4} className="mt-10">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#contact" size="lg" variant="bone">
              {dict.common.requestQuote}
            </Button>
            <Button
              href={whatsappHref(dict.cta.whatsappMessage)}
              size="lg"
              variant="whatsapp"
              trackAs="whatsapp_click"
            >
              {dict.common.whatsapp}
            </Button>
            <Button href={telHref} size="lg" variant="light" trackAs="phone_click">
              {dict.common.callNow}
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

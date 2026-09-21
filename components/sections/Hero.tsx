import { MapPin, Phone } from "lucide-react";
import { HeroBackdrop } from "./HeroBackdrop";
import { FadeIn } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n/dictionaries";
import { telHref, whatsappHref } from "@/lib/site";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-graphite-900"
    >
      <HeroBackdrop />

      {/* Two overlays: a vertical scrim for text contrast, and the mullion grid
          that recurs through the rest of the page. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-graphite-950/25 via-graphite-950/10 to-graphite-950/5"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 mullion-grid opacity-50"
      />

      <div className="shell relative w-full pb-10 pt-32 lg:pb-14 lg:pt-40">
        <FadeIn y={10} duration={0.5} delay={0.25}>
          <p className="flex items-center gap-2.5 text-sm text-bone/70">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {dict.hero.location}
          </p>
        </FadeIn>

        <FadeIn y={10} duration={0.5} delay={0.25}>
          <h1 className="mt-7 max-w-[19ch] font-display text-display-lg font-light text-bone">
            {dict.hero.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </FadeIn>
        <FadeIn y={20} delay={0.75} className="mt-8 max-w-xl">
          <p className="text-lg leading-relaxed text-silver-200">
            {dict.hero.lead}
          </p>
        </FadeIn>

        <FadeIn y={20} delay={0.9} className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="#contact" size="lg" variant="bone">
              {dict.common.requestQuote}
            </Button>
            <Button href="#contact" size="lg" variant="light">
              {dict.common.contactUs}
            </Button>
            <Button
              href={whatsappHref(dict.hero.whatsappMessage)}
              size="lg"
              variant="whatsapp"
              trackAs="whatsapp_click"
            >
              {dict.common.whatsapp}
            </Button>
          </div>
        </FadeIn>
      </div>

      {/* Frame rail along the foot of the hero - carries the trade keywords and
          the scroll hint without adding another floating element. */}
      <FadeIn y={0} delay={1.05} className="relative border-t border-bone/15">
        <div className="shell flex items-center justify-between gap-6 py-5">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-bone/65 sm:gap-x-8">
            {dict.hero.marquee.map((word) => (
              <li
                key={word}
                className="flex items-center gap-x-5 before:h-3 before:w-px before:bg-bone/25 first:before:hidden sm:gap-x-8"
              >
                {word}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <a
              href={telHref}
              dir="ltr"
              className="hidden items-center gap-2 text-sm text-bone/70 transition-colors duration-300 hover:text-bone md:flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {dict.common.callNow}
            </a>

            <div className="flex items-center gap-3 text-bone/60">
              <span className="text-xs tracking-label">{dict.hero.scroll}</span>
              <span
                aria-hidden="true"
                className="relative block h-8 w-px overflow-hidden bg-bone/20"
              >
                <span className="absolute inset-0 block bg-bone/80 animate-scroll-hint" />
              </span>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

import type { Metadata } from 'next';
import { About } from '@/components/sections/About';
import { CallToAction } from '@/components/sections/CallToAction';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Process } from '@/components/sections/Process';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/Services';
import { WhyUs } from '@/components/sections/WhyUs';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { buildLocalBusinessJsonLd, buildMetadata, buildWebsiteJsonLd } from '@/lib/seo';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? buildMetadata(locale) : {};
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : 'en') as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <script
        type="application/ld+json"
        // Static, locally generated object - no user input reaches this string.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildLocalBusinessJsonLd(locale),
            buildWebsiteJsonLd(locale),
          ]),
        }}
      />

      {/* Rhythm: dark hero, light services, warm about, dark differentiators,
          light gallery, warm process, dark CTA, light contact, dark footer. */}
      <Hero dict={dict} />
      <Services dict={dict} />
      <About dict={dict} />
      <WhyUs dict={dict} />
      <Projects dict={dict} />
      <Process dict={dict} />
      <CallToAction dict={dict} />
      <Contact dict={dict} locale={locale} />
    </>
  );
}

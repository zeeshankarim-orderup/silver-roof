import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { FadeIn } from '@/components/animations';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { SectionIntro } from '@/components/ui/SectionIntro';
import type { Dictionary } from '@/i18n/dictionaries';
import { mailHref, site, telHref, whatsappHref } from '@/lib/site';
import type { Locale } from '@/types';

export function Contact({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const address = site.address;
  const isAr = locale === 'ar';
  const hours = site.openingHours;

  const rows = [
    {
      key: 'phone',
      icon: Phone,
      label: dict.contact.phone,
      value: site.phoneDisplay,
      href: telHref,
      ltr: true,
      track: 'phone_click' as const,
    },
    {
      key: 'whatsapp',
      icon: MessageCircle,
      label: dict.contact.whatsapp,
      value: site.phoneDisplay,
      href: whatsappHref(dict.cta.whatsappMessage),
      ltr: true,
      track: 'whatsapp_click' as const,
    },
    {
      key: 'email',
      icon: Mail,
      label: dict.contact.email,
      value: site.email,
      href: mailHref,
      ltr: true,
      track: 'email_click' as const,
    },
  ];

  return (
    <section id="contact" className="relative scroll-mt-24 bg-bone py-20 lg:py-32">
      <div className="shell">
        <SectionIntro
          label={dict.contact.label}
          heading={dict.contact.heading}
          intro={dict.contact.intro}
          className="max-w-2xl"
          headingClassName="text-display-md"
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <FadeIn y={20}>
              <h3 className="font-display text-xl font-normal text-graphite-900">
                {dict.contact.infoHeading}
              </h3>

              <ul className="mt-6 divide-y divide-graphite-900/10 border-y border-graphite-900/10">
                {rows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <li key={row.key}>
                      <TrackedLink
                        href={row.href}
                        event={row.track}
                        source="contact_section"
                        className="group flex items-start gap-4 py-5 transition-colors duration-300"
                      >
                        <Icon
                          className="mt-1 h-5 w-5 shrink-0 text-graphite-400 transition-colors duration-300 group-hover:text-brass-500"
                          aria-hidden="true"
                        />
                        <span className="block">
                          <span className="block text-sm text-graphite-400">{row.label}</span>
                          <span
                            dir={row.ltr ? 'ltr' : undefined}
                            className="mt-1 block text-start text-lg text-graphite-900 transition-colors duration-300 group-hover:text-brass-600"
                          >
                            {row.value}
                          </span>
                        </span>
                      </TrackedLink>
                    </li>
                  );
                })}

                <li className="flex items-start gap-4 py-5">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-graphite-400" aria-hidden="true" />
                  <span className="block">
                    <span className="block text-sm text-graphite-400">{dict.contact.address}</span>
                    <span className="mt-1 block text-lg leading-relaxed text-graphite-900">
                      {isAr ? address.cityAr : address.city},{' '}
                      {isAr ? address.countryNameAr : address.countryName}
                    </span>
                  </span>
                </li>
              </ul>
            </FadeIn>

            {/* Map: a real embed when the URL is configured, an honest placeholder
                panel until then. */}
            <FadeIn y={20} delay={0.12} className="mt-8">
              <div className="overflow-hidden rounded-frame border border-graphite-900/12">
                {site.googleMapsEmbedUrl ? (
                  <iframe
                    src={site.googleMapsEmbedUrl}
                    title={dict.contact.mapTitle}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-64 w-full border-0"
                  />
                ) : (
                  <div className="relative flex h-48 flex-col items-center justify-center gap-3 bg-linen px-6 text-center">
                    <div aria-hidden="true" className="absolute inset-0 mullion-grid-dark" />
                    <MapPin className="relative h-6 w-6 text-graphite-400" aria-hidden="true" />
                    <p className="relative max-w-xs text-sm text-graphite-500">
                      {dict.contact.mapPlaceholder}
                    </p>
                    <a
                      href={site.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative text-sm text-graphite-900 underline underline-offset-4 transition-colors hover:text-brass-600"
                    >
                      {dict.contact.openInMaps}
                    </a>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          <FadeIn y={26} delay={0.1} className="lg:col-span-7">
            <ContactForm dict={dict} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

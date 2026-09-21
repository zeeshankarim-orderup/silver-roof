import { Ghost, Instagram, Link2, Linkedin, Mail, MapPin, Music2, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { navigation } from '@/data/navigation';
import { services } from '@/data/services';
import type { Dictionary } from '@/i18n/dictionaries';
import { site, socialLinks, telHref, whatsappHref } from '@/lib/site';
import type { Locale } from '@/types';

const socialIcons: Record<string, LucideIcon> = {
  instagram: Instagram,
  x: Twitter,
  linkedin: Linkedin,
  tiktok: Music2,
  snapchat: Ghost,
};

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();
  const address = site.address;
  const city = locale === 'ar' ? address.cityAr : address.city;
  const country = locale === 'ar' ? address.countryNameAr : address.countryName;

  return (
    <footer className="relative overflow-hidden bg-graphite-900 text-silver-200">
      <div aria-hidden="true" className="absolute inset-0 mullion-grid opacity-60" />

      {/* Oversized wordmark bleeding off the bottom edge - the one decorative
          flourish in the footer, and the reason it does not read as a link dump. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 start-0 select-none font-display text-[22vw] leading-none text-bone/[0.035] lg:-bottom-12"
      >
        Silver Roof
      </span>

      <div className="shell relative py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-silver-300">
              {dict.footer.description}
            </p>

            <div className="mt-8">
              <p className="text-sm tracking-label text-silver-400">{dict.footer.followUs}</p>
              {socialLinks.length > 0 ? (
                <ul className="mt-4 flex gap-3">
                  {socialLinks.map(({ platform, url }) => {
                    const Icon = socialIcons[platform] ?? Link2;
                    return (
                      <li key={platform}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={platform}
                          className="flex h-10 w-10 items-center justify-center rounded-frame border border-bone/15 text-silver-200 transition-colors duration-300 ease-architectural hover:border-bone/40 hover:text-bone"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-silver-500">{dict.footer.socialPlaceholder}</p>
              )}
            </div>
          </div>

          <nav className="lg:col-span-2" aria-label={dict.footer.quickLinks}>
            <h2 className="text-sm tracking-label text-silver-400">{dict.footer.quickLinks}</h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-[0.95rem] text-silver-200 transition-colors duration-300 hover:text-bone"
                  >
                    {dict.nav[item.id as keyof typeof dict.nav]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label={dict.footer.servicesHeading}>
            <h2 className="text-sm tracking-label text-silver-400">
              {dict.footer.servicesHeading}
            </h2>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-[0.95rem] text-silver-200 transition-colors duration-300 hover:text-bone"
                  >
                    {dict.services.items[service.id as keyof typeof dict.services.items].title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-sm tracking-label text-silver-400">{dict.footer.contactHeading}</h2>
            <ul className="mt-5 space-y-4 text-[0.95rem]">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-silver-400" aria-hidden="true" />
                <a
                  href={telHref}
                  dir="ltr"
                  className="text-silver-200 transition-colors hover:text-bone"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-silver-400" aria-hidden="true" />
                <a
                  href={`mailto:${site.email}`}
                  dir="ltr"
                  className="break-all text-silver-200 transition-colors hover:text-bone"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-silver-400" aria-hidden="true" />
                <span className="text-silver-200">
                  {address.street}
                  <br />
                  {city}, {country}
                </span>
              </li>
            </ul>

            <a
              href={whatsappHref(dict.hero.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-frame border border-bone/20 px-5 text-sm text-bone transition-colors duration-300 ease-architectural hover:border-bone/50 hover:bg-bone hover:text-graphite-900"
            >
              {dict.common.chatOnWhatsapp}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-bone/10 pt-8 text-sm text-silver-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.companyName}. {dict.footer.rights}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link
                href={`/${locale}/privacy`}
                className="transition-colors hover:text-bone"
              >
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/terms`} className="transition-colors hover:text-bone">
                {dict.footer.terms}
              </Link>
            </li>
            <li>{dict.footer.builtIn}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

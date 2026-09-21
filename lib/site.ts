/**
 * Single source of truth for company details.
 *
 * Everything marked PLACEHOLDER is not real information - replace it before the
 * site goes live or starts receiving paid traffic. Nothing in this file was
 * invented as a factual business claim.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://silverroof.net";

export const site = {
  companyName: "Silver Roof Contracting",
  companyNameAr: "سيلفر روف للمقاولات",
  legalName: "Silver Roof Contracting", // PLACEHOLDER - confirm registered name
  /** E.164, used for tel: links. PLACEHOLDER */
  phone: "+966562654119",
  /** Human readable version shown in the UI. PLACEHOLDER */
  phoneDisplay: "+966 56 265 4119",
  /** Digits only, no plus sign - wa.me requires this format. PLACEHOLDER */
  whatsapp: "966567799727",
  email: "silverroof777@gmail.com", // PLACEHOLDER
  address: {
    street: "Street name, District", // PLACEHOLDER
    city: "Jeddah",
    cityAr: "جدة",
    region: "Makkah Province",
    regionAr: "منطقة مكة المكرمة",
    postalCode: "00000", // PLACEHOLDER
    country: "SA",
    countryName: "Saudi Arabia",
    countryNameAr: "المملكة العربية السعودية",
  },
  /** Approximate Jeddah centre. Replace with the real workshop/office pin. PLACEHOLDER */
  geo: { latitude: 21.485811, longitude: 39.192505 },
  /** Paste the share link from Google Maps. PLACEHOLDER */
  googleMapsUrl: "https://maps.google.com/?q=Jeddah,+Saudi+Arabia",
  /** Paste the src of the Google Maps embed iframe to replace the static panel. PLACEHOLDER */
  googleMapsEmbedUrl: "",
  /** Commercial registration / VAT number, shown in the footer once supplied. PLACEHOLDER */
  commercialRegistration: "",
  vatNumber: "",
  social: {
    instagram: "", // PLACEHOLDER
    x: "", // PLACEHOLDER
    linkedin: "", // PLACEHOLDER
    tiktok: "", // PLACEHOLDER
    snapchat: "", // PLACEHOLDER
  },
  /** Displayed next to opening hours. PLACEHOLDER - confirm before publishing. */
  openingHours: {
    weekdays: "Sunday - Thursday",
    weekdaysAr: "الأحد - الخميس",
    time: "9:00 - 18:00",
    closed: "Friday",
    closedAr: "الجمعة",
  },
} as const;

export const telHref = `tel:${site.phone}`;
export const mailHref = `mailto:${site.email}`;

/** Builds a wa.me link with an optional pre-filled message. */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const socialLinks = Object.entries(site.social)
  .filter(([, url]) => url.length > 0)
  .map(([platform, url]) => ({ platform, url }));

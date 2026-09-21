# Silver Roof Contracting — bilingual landing page

A production-ready Next.js App Router landing page for **Silver Roof Contracting**, a
contracting and aluminum-decoration company in Jeddah, Saudi Arabia. English and Arabic,
with a real RTL layout rather than a translated LTR one.

- Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide
- Server Components by default; client components only where interaction or motion needs them
- Locale routing at `/en` and `/ar`, statically generated
- SEO metadata, hreflang, sitemap, robots, JSON-LD
- Reusable conversion CTAs (quote, WhatsApp, call) with an analytics hook already in place

---

## Running it

Requires Node 18.18+ (Node 20 or 22 recommended).

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000 → redirects to /en
```

Other scripts:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
npm run build       # production build
npm start           # serve the production build
```

> **Run `npm install`, `npm run typecheck`, `npm run lint` and `npm run build` once before
> deploying.** The code was written and statically cross-checked, but it has never been
> compiled — it was authored in a sandbox with no network access, so no dependency could be
> installed. Treat the first local build as the real verification step.

---

## Replace the placeholders before going live

Nothing in this repo makes a factual claim about the business. There are no invented years
of experience, certifications, awards, client names, project counts, reviews or statistics.
Three things need real content before the site takes paid traffic.

### 1. Company details — `lib/site.ts`

Every value marked `PLACEHOLDER` in that file is fake and must be replaced:

| Field | Notes |
| --- | --- |
| `phone` | E.164, used for `tel:` links — e.g. `+9665XXXXXXXX` |
| `phoneDisplay` | The human-readable version shown in the UI |
| `whatsapp` | Digits only, no `+` — `wa.me` requires this format |
| `email` | |
| `address.street`, `address.postalCode` | |
| `geo` | The real office/workshop pin; currently Jeddah city centre |
| `googleMapsUrl` | The share link from Google Maps |
| `googleMapsEmbedUrl` | Paste the `src` of the Maps embed iframe and the static map panel in the contact section is replaced by a live map |
| `commercialRegistration`, `vatNumber` | Shown in the footer once supplied |
| `social` | Fill any of these in and the footer icons appear automatically; while all are empty the footer shows a placeholder line instead of dead icons |
| `openingHours` | Confirm before publishing |
| `legalName` | Confirm the registered name |

`SITE_URL` comes from `NEXT_PUBLIC_SITE_URL` and feeds canonical tags, Open Graph and the
sitemap. Set it to the real domain.

### 2. Imagery — `public/images/`

All 22 images are **generated abstract placeholders** in the brand palette, not photography
and not stock. They exist so the layout can be judged with real proportions. Replace them
with the company's own project photos, keeping the same filenames and roughly the same
aspect ratios:

| File | Size | Used by |
| --- | --- | --- |
| `hero.jpg` | 2400×1400 | hero background |
| `hero.jpg` | 2400×1200 | full-width CTA band |
| `about-main.jpg` | 1400×1750 | About, portrait |
| `about-detail.jpg` | 900×900 | About, inset square |
| `hero.jpg` | 1200×630 | Open Graph / Twitter card |
| `services/*.jpg` | 1200×900 | nine service cards, named by service id |
| `projects/project-01…08.jpg` | mixed | masonry gallery |

The gallery is data-driven: `data/projects.ts` controls the file, alt text and the grid span
of each tile, so you can add or remove projects without touching the layout. Alt text lives
in the data files and in `i18n/en.ts` / `i18n/ar.ts` — update it when the photos change, both
for accessibility and for image SEO.

### 3. Contact form delivery — `CONTACT_WEBHOOK_URL`

**The form does not fake success.** With no delivery endpoint configured,
`app/api/contact/route.ts` returns `501 NOT_CONFIGURED` and the form tells the visitor the
form isn't connected yet and offers WhatsApp and phone instead. That is deliberate — it is
better than showing a thank-you screen for a message nobody will read.

To switch it on, set `CONTACT_WEBHOOK_URL` in `.env.local` to anything that accepts a JSON
`POST` — Formspree, n8n, Zapier, a CRM inbox — or replace the forward inside the route with a
direct provider call (Resend, SES, etc.). Validation runs on both sides using the same rules
in `lib/validation.ts`, and there is a honeypot field that silently absorbs bots.

---

## Adding analytics and ad conversions

`lib/analytics.ts` is a `dataLayer` shim. It is already wired to the CTAs and pushes:

- `quote_request_submit` — form submitted
- `quote_request_success` — delivery confirmed
- `whatsapp_click`
- `phone_click`
- `email_click`

No tags are installed. To turn tracking on:

1. Add the GTM or gtag snippet in `app/[locale]/layout.tsx` using `next/script`.
2. Set `NEXT_PUBLIC_GTM_ID` (and/or `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`) in `.env.local`.
3. Map the event names above to conversions in Google Ads / Meta Events Manager.

Because the events are already fired from components, none of this requires editing sections.

---

## Structure

```
app/
  [locale]/            layout (owns <html lang dir>), page, privacy, terms, not-found
  api/contact/         form endpoint
  sitemap.ts robots.ts icon.svg
components/
  animations/          FadeIn, Reveal, Stagger, ImageReveal, Parallax, ScaleOnScroll
  layout/              Header, MobileMenu, LanguageSwitcher, Footer, FloatingWhatsApp
  sections/            Hero, Services, About, WhyUs, Projects, Process, CTA, Contact
  ui/                  Button, Logo, SectionIntro, TrackedLink
  providers/           DirectionProvider
data/                  services, projects, process, advantages, navigation
i18n/                  en.ts, ar.ts, config.ts, dictionaries.ts
lib/                   site.ts, seo.ts, motion.ts, analytics.ts, validation.ts, utils.ts
styles/globals.css     base layer + the mullion-grid motif
types/                 shared types
```

There is intentionally **no `app/layout.tsx`**. The locale layout owns the `<html>` element so
`lang` and `dir` can change per language; `/` redirects to `/en` via `next.config.ts`.

### Design system

Tokens live in `tailwind.config.ts`: `bone` / `linen` (warm whites), `silver` (cooled, reads
as metal), `graphite` (warmed, so text never looks blue on bone), `brass` (the restrained
warm accent). Headlines use Cormorant Garamond, UI uses Inter, and Arabic uses IBM Plex Sans
Arabic for both roles — loaded through `next/font`, so there is no layout shift and no
external font request.

The recurring motif is the **mullion grid** — the thin aluminum framing line — used as the
hero overlay, the texture on dark panels, section hairlines and the logo mark. Section
backgrounds alternate bone → linen → dark so the page has rhythm instead of one flat scroll.

### Animation

Everything goes through `lib/motion.ts`: one easing curve, one duration band (300–800 ms),
one viewport rule. Section components compose the primitives in `components/animations/`
rather than writing their own variants. All of it respects `prefers-reduced-motion`, and
`styles/globals.css` has a reduced-motion kill switch for CSS animations too.

Reveals are Y-axis and bottom-up only, so they read identically in RTL. The few genuinely
horizontal cases — the mobile menu slide, the process rail origin, lightbox arrow keys — read
direction from `DirectionProvider`.

### Adding a language

1. Add the code to `locales` in `i18n/config.ts` and give it a direction and hreflang.
2. Copy `i18n/en.ts` to the new file and translate. It is typed as `Dictionary`, so a missing
   key is a build error rather than a blank space on the page.
3. Register it in `i18n/dictionaries.ts`.

No component or route changes are needed.

---

## Deploying

Any Node host works; Vercel needs no configuration. Set at minimum:

```
NEXT_PUBLIC_SITE_URL=https://the-real-domain.sa
CONTACT_WEBHOOK_URL=...            # once form delivery is chosen
```

After deploying, submit `/sitemap.xml` in Google Search Console and check the JSON-LD with
the Rich Results Test. The structured data in `lib/seo.ts` describes a
`HomeAndConstructionBusiness` and deliberately omits `aggregateRating`, `review`,
`foundingDate` and `priceRange` — add those only when the company supplies real values.

### Version pinning

Dependencies use caret ranges. For reproducible builds, commit the `package-lock.json` that
your first `npm install` produces, and pin exact versions if this will be handed between
machines.

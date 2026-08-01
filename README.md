# Kikwetu Foundation Website

Production-ready marketing website for **Kikwetu Foundation**, a Kenyan youth-empowerment
NGO. Built to position the Foundation as a credible, transparent partner for international
donors, corporate CSR programs, governments, NGOs, and volunteers.

Live content is sourced entirely from the Foundation's Company Profile (2024) and Brand
Identity Guidelines v1.0, nothing on the site is fabricated. Where the source material didn't
supply something (news articles, a phone number, social links, named current partners), the
site says so honestly instead of inventing it. See [Content Sourcing](#content-sourcing) below.

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Getting Started](#getting-started)
3. [Environment Variables](#environment-variables)
4. [Folder Structure](#folder-structure)
5. [Content Sourcing](#content-sourcing)
6. [Development Workflow](#development-workflow)
7. [CMS Documentation (Sanity)](#cms-documentation-sanity)
8. [Newsletter Documentation](#newsletter-documentation)
9. [Contact Form](#contact-form)
10. [SEO Guide](#seo-guide)
11. [Performance Guide](#performance-guide)
12. [Accessibility Guide](#accessibility-guide)
13. [Security](#security)
14. [Analytics & Conversion Tracking](#analytics--conversion-tracking)
15. [Deployment](#deployment)
16. [Future Enhancements](#future-enhancements)

---

## Technology Stack

- **Next.js 16** (App Router, React Server Components, TypeScript strict mode)
- **Bootstrap 5** + **Bootstrap Icons**, the only CSS/UI framework, per project requirements
- **@fontsource/inter** & **@fontsource/merriweather**, self-hosted brand fonts (see note below)
- Local mock data today, with a data-access layer designed for a drop-in **Sanity CMS**
  migration (see [CMS Documentation](#cms-documentation-sanity))

> **Why self-hosted fonts instead of `next/font/google`?** In some build environments,
> `fonts.googleapis.com` isn't reachable at build time, which breaks `next/font/google`
> entirely. `@fontsource` ships the same Merriweather/Inter font files as an npm package, so
> the build never depends on an external font CDN. If your deployment environment can reach
> Google Fonts and you'd prefer `next/font/google` for its automatic subsetting, it's a
> drop-in swap in `src/app/layout.tsx`.

## Getting Started

```bash
# 1. Clone the repository
git clone <repo-url> kikwetu-foundation
cd kikwetu-foundation

# 2. Install dependencies
npm install

# 3. Copy environment variables and fill in real values (optional for local dev)
cp .env.example .env.local

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint    # ESLint (strict, no warnings allowed in CI)
```

## Environment Variables

All variables are optional for local development, the site works with none of them set. See
`.env.example` for the full list with comments. Highlights:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `_DATASET` / `_API_VERSION` | Sanity CMS connection (future) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID |
| `NEWSLETTER_PROVIDER_API_KEY` | Brevo / Mailchimp / ConvertKit key (future) |

## Folder Structure

```
src/
├── app/                        # Next.js App Router, one folder per route
│   ├── layout.tsx              # Root layout: fonts, navbar, footer, JSON-LD, GA/GTM
│   ├── page.tsx                # Homepage
│   ├── about/page.tsx
│   ├── programs/
│   │   ├── page.tsx            # Programs index
│   │   └── [slug]/page.tsx     # Program detail (generateStaticParams)
│   ├── impact/page.tsx
│   ├── partners/page.tsx
│   ├── team/page.tsx
│   ├── get-involved/page.tsx
│   ├── contact/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── terms-and-conditions/page.tsx
│   ├── api/
│   │   ├── contact/route.ts    # Contact form submission handler (stub)
│   │   └── newsletter/route.ts # Newsletter signup handler (stub)
│   ├── sitemap.ts              # Generates /sitemap.xml
│   ├── robots.ts               # Generates /robots.txt
│   ├── manifest.ts             # Generates /manifest.webmanifest
│   └── not-found.tsx           # Custom 404
│
├── components/
│   ├── layout/                 # Navbar, Footer, appear on every page
│   ├── sections/                # Larger composed sections (hero, CTA, program card, stat card)
│   └── ui/                     # Small reusable primitives (forms, WhatsApp FAB)
│
├── data/                       # Mock content, the current "source of truth"
│   ├── organization.ts         # Story, mission, vision, values, impact stats, focus areas
│   ├── programs.ts             # All 5 programs (K-Hub + 4 past programs)
│   ├── partners.ts             # Partnership opportunities, benefits, collaboration areas
│   ├── team.ts                 # Team member profiles and photos
│   ├── contact.ts              # Email / address (only what was supplied)
│   ├── navigation.ts           # Nav links, footer links, legal links
│   └── social.ts                # Social media links (see Content Sourcing)
│
├── lib/
│   ├── cms/                    # Data-access layer, swap mock data for Sanity here only
│   │   ├── organization.ts
│   │   ├── programs.ts
│   │   ├── partners.ts
│   │   └── team.ts
│   ├── site-config.ts          # Site name, URL, keywords, theme color
│   └── metadata.ts             # buildMetadata(), consistent per-page SEO metadata
│
├── sanity/                     # Inert until Sanity is installed, see CMS Documentation
│   ├── client.ts                # Commented-out client config
│   └── schema.ts                # Draft schema definitions mirroring /types/content.ts
│
└── types/
    └── content.ts               # Shared TypeScript interfaces for all content
```

**Why this separation?** UI components never import from `/data` directly, they call
functions in `/lib/cms`. Today those functions return local mock data; tomorrow they'll call
`client.fetch(...)` against Sanity. No component, page, or type ever needs to change when that
migration happens.

## Content Sourcing

Per project requirements, the site treats the Company Profile and Brand Identity Guidelines as
the only sources of truth. Places where the source material was incomplete, handled honestly
rather than invented:

- **Team (`/team`)**, names and roles are only attached to a supplied photo when it matches a
  named entry in the Company Profile with reasonable confidence (an exact or clearly
  distinctive match). Where a photo's name didn't clearly correspond to a named board member
  (common first names alone aren't treated as a confirmed match), that person is introduced by
  name and photo only, without a fabricated title or biography. See `data/team.ts` for the
  reasoning behind each match.
- **Contact details (`/contact`, footer)**, only the email and office address provided by the
  organization are shown. No phone number is fabricated. Social links are populated only for
  platforms the organization explicitly confirmed; Facebook has no confirmed URL yet and is
  shown as a visible but unlinked placeholder rather than a guessed address, see `data/social.ts`.
- **Partners (`/partners`)**, no named current partner organizations were supplied, so the page
  presents partnership *opportunities* (audiences and engagement models the profile does
  describe: CSR, NGOs, governments, universities, foundations) rather than inventing partner
  logos or names.

## Development Workflow

**Adding a new page**
1. Create `src/app/<route>/page.tsx`.
2. Export `metadata` using `buildMetadata()` from `src/lib/metadata.ts` for consistent SEO.
3. Add the route to `src/app/sitemap.ts`.
4. If it belongs in primary navigation, add it to `src/data/navigation.ts`.

**Creating a reusable component**
- Page-level composed sections (hero, CTA banner, card grids) go in `src/components/sections`.
- Small, generic primitives (a form, a breadcrumb trail) go in `src/components/ui`.
- Navbar/Footer are the only components in `src/components/layout`.

**Updating navigation**, edit `src/data/navigation.ts` (`primaryNav`, `footerLinks`, or
`legalLinks`). Do not hardcode nav links inside `navbar.tsx`/`footer.tsx`.

**Managing assets**, place new images in `public/images/`, using descriptive kebab-case
filenames (e.g. `kikwetu-foundation-k-hub-graduation.jpg`) so they double as SEO signals. Always
render them with `next/image` (`import Image from "next/image"`), and always supply meaningful
`alt` text, never `"image"` or the filename.

**Optimizing images**, before adding a new photo, resize it so its largest dimension doesn't
exceed ~1800px for hero/full-width use, or ~1200px for card use, and compress as JPEG quality
75–85 or convert to WebP. `next/image` will still generate AVIF/WebP variants automatically at
request time, but starting from a reasonably sized source file keeps build output smaller.

**Implementing SEO for a new page**, see [SEO Guide](#seo-guide) below.

## CMS Documentation (Sanity)

The site is **not yet connected to Sanity**, it runs on local mock data in `src/data/`. This
section is a complete guide for making that connection when the organization is ready.

### Architecture recap

```
UI components  →  src/lib/cms/*.ts  →  src/data/*.ts (today)  →  Sanity (future)
```

Only the middle layer (`src/lib/cms/*.ts`) needs to change. Every function there is already
`async` and already returns data shaped by the interfaces in `src/types/content.ts`, the same
interfaces the draft schema in `src/sanity/schema.ts` mirrors field-for-field.

### Step-by-step setup

1. **Create a Sanity project** (from the Studio, not this repo):
   ```bash
   npm create sanity@latest -- --project kikwetu-foundation --dataset production
   ```
   This scaffolds a separate Sanity Studio project. Studios are typically deployed
   independently from the marketing site (e.g. at `studio.kikwetufoundation.org`).

2. **Install the client packages in this project**:
   ```bash
   npm install @sanity/client @sanity/image-url next-sanity
   ```

3. **Configure environment variables** in `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```

4. **Uncomment and complete `src/sanity/client.ts`**:
   ```ts
   import { createClient } from "@sanity/client";

   export const client = createClient({
     projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
     dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
     apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
     useCdn: true,
   });
   ```

5. **Register the schema.** Copy the field definitions in `src/sanity/schema.ts` into your
   Studio project's `schemaTypes` array (Studio config lives in the separate Sanity project
   created in step 1, per Sanity's architecture).

6. **Run Sanity Studio locally** (from the Studio project):
   ```bash
   npm run dev
   ```
   This opens the content editor at `http://localhost:3333` by default.

7. **Fetch data instead of mock data.** In each `src/lib/cms/*.ts` file, replace the mock-data
   return with a GROQ query. Example, `src/lib/cms/programs.ts`:
   ```ts
   import { client } from "@/sanity/client";

   export async function getAllPrograms(): Promise<Program[]> {
     return client.fetch(`*[_type == "program"] | order(status asc)`);
   }
   ```
   Repeat for `getCurrentPrograms`, `getProgram`, `getTeamMembers`, etc. No page or component
   changes are required, they already call these functions.

8. **Replace mock data entirely.** Once every `lib/cms/*.ts` function reads from Sanity, the
   files in `src/data/*.ts` can be deleted (or kept as fixtures for local dev/tests).

### For content editors (once connected)

- **Update the team**, edit the "Team Member" document type, fill in name, role (optional),
  bio, and photo (with alt text), then **Publish**. Omit the role field entirely for a team
  member whose title isn't confirmed, rather than guessing one.
- **Upload images**, drag and drop into any image field; Sanity's CDN handles resizing.
  Always fill in the "Alt text" field for accessibility and SEO.
- **Manage programs**, edit the "Program" document type. `status` (`current`/`past`) controls
  which section of `/programs` an entry appears in.
- **Update partners**, the "Partner" document type holds name, logo, and website. Only
  publish partners the Foundation has confirmed a real relationship with.
- **Modify homepage content**, organization-level copy (story, mission, vision, stats) lives
  in the "Site Settings" / organization singleton documents.
- **Publish and unpublish**, Sanity documents are live once published; unpublishing (or
  deleting) removes them from the site on the next revalidation/build.

### Deploying CMS changes

If using Next.js **Incremental Static Regeneration**, add `revalidate` to data-fetching
functions or use on-demand revalidation via a Sanity webhook calling a Next.js Route Handler
(`/api/revalidate`) on publish. If using pure static export, trigger a new `next build` /
redeploy on publish via the same webhook.

## Newsletter Documentation

**Current state:** `src/components/ui/newsletter-form.tsx` posts to `src/app/api/newsletter/route.ts`,
which validates the email and returns success, no email-marketing platform is connected yet,
by design (see project requirements).

**Form structure**, a single controlled `<input type="email">` plus submit button, client-side
regex validation, `aria-live` status region for success/error messaging.

**Validation**, client-side (basic regex, required field) and server-side (same regex,
returns `400` with an error message on failure) so the API route is safe to call directly.

**API design**, `POST /api/newsletter` accepts `{ "email": string }`, returns
`{ "success": true }` on success or `{ "error": string }` with a `400` status on failure.

**Data flow**, form → `fetch("/api/newsletter")` → API route validates → (future) forwards to
ESP → returns JSON status → form renders success/error state.

**Provider integration guides:**

<details>
<summary>Mailchimp</summary>

```ts
await fetch(`https://<dc>.api.mailchimp.com/3.0/lists/${listId}/members`, {
  method: "POST",
  headers: {
    Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email_address: email, status: "subscribed" }),
});
```
Required env vars: `MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID`, `MAILCHIMP_SERVER_PREFIX` (the
`<dc>` in the URL, e.g. `us21`).
</details>

<details>
<summary>Brevo (formerly Sendinblue)</summary>

```ts
await fetch("https://api.brevo.com/v3/contacts", {
  method: "POST",
  headers: {
    "api-key": process.env.BREVO_API_KEY!,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, listIds: [Number(process.env.BREVO_LIST_ID)] }),
});
```
Required env vars: `BREVO_API_KEY`, `BREVO_LIST_ID`.
</details>

<details>
<summary>ConvertKit</summary>

```ts
await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ api_key: process.env.CONVERTKIT_API_KEY, email }),
});
```
Required env vars: `CONVERTKIT_API_KEY`, `CONVERTKIT_FORM_ID`.
</details>

**Error handling**, wrap the provider call in `try/catch`; on failure return
`NextResponse.json({ error: "..." }, { status: 502 })` so the form can distinguish "bad input"
(400) from "provider unavailable" (502).

**Success messages**, the form already renders an inline confirmation; no redirect needed.

**Production notes**, store all provider keys as server-only environment variables (never
`NEXT_PUBLIC_*`), and add basic rate-limiting (e.g. via middleware or the hosting platform) to
the `/api/newsletter` route before launch to deter abuse.

## Contact Form

`src/components/ui/contact-form.tsx` posts to `src/app/api/contact/route.ts`, which is fully
wired to send real email via [Resend](https://resend.com). This is live, not a stub.

**How it works:**
1. Client-side validation runs first (name, email format, message required, plus the Turnstile
   widget if `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set).
2. The route re-validates everything server-side (never trust the client), then verifies the
   Turnstile token against Cloudflare's `siteverify` endpoint via `src/lib/turnstile.ts`
   **before doing anything else**. If Turnstile isn't configured or the token is invalid, the
   request is rejected with `403` and no email is sent, verification fails closed, not open.
3. On success, `src/lib/email.ts` sends two emails through Resend: a notification to
   `CONTACT_EMAIL` with every submitted field plus submission time, User-Agent, and the
   visitor's IP (read from the `x-forwarded-for` header), and a branded confirmation email
   back to the sender. A failure to send the confirmation doesn't fail the request, the
   notification email reaching the Foundation is the part that matters.
4. On the client, a successful response fires the GA4 `contact_form_submit` event (only on
   success, see `trackContactFormSubmit()` in the form component) and swaps the form for a
   success message.

**Required environment variables** (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key (server-only, never exposed to the client) |
| `CONTACT_EMAIL` | Inbox that receives the notification email |
| `RESEND_FROM_EMAIL` | Optional. The verified "from" address; defaults to Resend's shared test address if unset |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key (public, renders the widget) |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key (server-only, used for verification) |

**Resend domain verification:** emails will send immediately using Resend's shared
`onboarding@resend.dev` address with no setup, useful for testing, but for production, verify
your own sending domain in the Resend dashboard (Domains → Add Domain → add the provided DNS
records), then set `RESEND_FROM_EMAIL` to an address on that domain, e.g.
`"Kikwetu Foundation <no-reply@kikwetufoundation.org>"`.

**Testing checklist:**
- [ ] Submit with a field missing, inline validation errors appear, no request is sent
- [ ] Submit with Turnstile unconfigured (no env vars set), request is rejected with a clear
      on-screen error, no email sends (this is the fail-closed behavior working correctly)
- [ ] Submit with valid Turnstile keys configured, the notification email arrives at
      `CONTACT_EMAIL` with all fields, IP, and User-Agent populated
- [ ] Confirm the sender receives the confirmation email
- [ ] Confirm the GA4 Realtime view shows a `contact_form_submit` event only after a
      **successful** submission, not after a failed one
- [ ] Submit form on mobile, verify the Turnstile widget renders and completes correctly

## SEO Guide

- **Metadata**, every page exports `metadata` via `buildMetadata()` in `src/lib/metadata.ts`,
  which sets a unique title, description, canonical URL, Open Graph tags, and Twitter Card tags
  from a single call site.
- **Structured data (JSON-LD)**, `NGO` + `WebSite` schema in the root layout; `BreadcrumbList`
  schema generated by `src/components/ui/breadcrumbs.tsx` on every inner page.
- **Sitemap**, `src/app/sitemap.ts` uses the Next.js Metadata API sitemap convention to
  generate `/sitemap.xml`, including every static route and every program detail page.
- **robots.txt**, `src/app/robots.ts` allows all crawlers, disallows `/api/`, and points to
  the sitemap.
- **Image SEO**, all images use `next/image`, descriptive kebab-case filenames, and required
  `alt` text props (enforced by the `SiteImage` TypeScript type).
- **Heading hierarchy**, one `<h1>` per page (typically in the hero), `<h2>` for major
  sections, semantic `<nav>`, `<main>`, `<footer>` landmarks throughout.
- **Verification placeholders**, `src/app/layout.tsx` includes `verification.google` and
  `verification.other["msvalidate.01"]` placeholders; replace with real Search Console / Bing
  Webmaster Tools codes before launch.

## Performance Guide

- **Static generation**, nearly every route is statically generated at build time
  (`○` in the `next build` output); only the two API routes are dynamic.
- **Image optimization**, `next.config.ts` enables AVIF/WebP output; the homepage hero image
  is rendered with `priority` to preload it.
- **Font loading**, self-hosted via `@fontsource`, loaded with `font-display: swap`
  equivalents baked into the package's CSS, avoiding invisible-text flashes.
- **Code splitting**, automatic per-route via the App Router; no large client bundles are
  forced onto pages that don't need interactivity (forms and the navbar are the only
  `"use client"` components).
- **CSS**, a single global stylesheet layered over Bootstrap's minified build; no
  component-level CSS-in-JS runtime overhead.

## Accessibility Guide

- **Skip link**, "Skip to main content" is the first focusable element on every page.
- **Keyboard navigation**, all interactive elements are native `<button>`/`<a>`/form controls;
  no custom click handlers on non-interactive elements.
- **Focus indicators**, a global `:focus-visible` style (3px blue outline) ensures visible
  focus everywhere, overriding any framework defaults that suppress it.
- **Color contrast**, brand colors were checked against WCAG AA: white text on Olive Green
  and black text on white/paper backgrounds both exceed 4.5:1; blue/red accents are only used
  at sizes/weights where contrast holds, per the Brand Guidelines' own accessibility note.
  Continue to check contrast on outdoor/gathering photography overlays with GIVEN gradient.
- **Forms**, every input has a associated `<label>`, `aria-invalid` is set on validation
  errors, and error text is linked via visible inline messages plus an `aria-live` status
  region.
- **Reduced motion**, `prefers-reduced-motion: reduce` disables/shortens all transitions and
  smooth scrolling site-wide.
- **Alt text**, required by the `SiteImage` TypeScript type; no image ships without it.

## Security

Configured in `next.config.ts` via response headers on every route:

- `Content-Security-Policy`, restricts script/style/image/frame sources
- `Strict-Transport-Security` (HSTS)
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`, disables camera/microphone/geolocation by default

Update the `script-src`/`connect-src`/`frame-src` CSP directives in `next.config.ts` if you add
new third-party scripts (e.g. a different analytics or CRM widget) so they aren't blocked.

## Analytics & Conversion Tracking

Set `NEXT_PUBLIC_GA_ID` and/or `NEXT_PUBLIC_GTM_ID` in your environment to enable Google
Analytics 4 / Google Tag Manager, both are loaded conditionally in `src/app/layout.tsx` via
`next/script` with `strategy="afterInteractive"` so they never block page rendering.

Recommended events to configure once GA4/GTM is live (the DOM already has stable selectors to
hook into):
- **Partner button clicks**, the "Partner With Us" CTA in the navbar and hero
- **Contact submissions**, successful `POST /api/contact` (fire from the success branch in
  `contact-form.tsx`, or track server-side)
- **Volunteer inquiries**, the "Volunteer" CTA on `/get-involved`
- **Newsletter signups**, successful `POST /api/newsletter`
- **Outbound links**, none currently exist except `mailto:`; add tracking if external links
  (e.g. social profiles) are added later

## Deployment

The project is a standard Next.js app and deploys to any Next.js-compatible host (Vercel,
Netlify, or a self-managed Node server).

```bash
npm run build
npm run start   # or hand the .next/ output to your platform's Next.js adapter
```

Before going live:
1. Set `NEXT_PUBLIC_SITE_URL`-equivalent (currently hardcoded in `src/lib/site-config.ts` as
   `siteConfig.url`) to the real production domain.
2. Set `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` once Search Console / Bing
   Webmaster Tools properties exist for the production domain (these meta tags render only
   when the env vars are set, so nothing placeholder-like ships to production by default).
3. Set `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID` if analytics are ready.
4. Point DNS and confirm HTTPS is enforced (required for the HSTS header to be meaningful).

## Future Enhancements

- **Sanity CMS**, see [CMS Documentation](#cms-documentation-sanity) above.
- **Blog**, the News content type and route (`/news`) are already CMS-ready; extending it to
  a full blog is a matter of adding pagination and category filtering.
- **Donation gateway**, intentionally not built (project brief prioritizes partnerships and
  volunteering over donations); when ready, add a dedicated `/donate` route rather than
  overloading the "Get Involved" page.
- **CRM**, wire `/api/contact` to a real CRM (see [Contact Form](#contact-form)).
- **Multilingual support**, the App Router supports `[locale]` segment routing; content would
  need to move to Sanity first (see CMS Documentation) so translations can be managed as
  document fields rather than hardcoded strings.
- **Alternative headless CMS**, if Sanity isn't the final choice, the same `src/lib/cms/*.ts`
  seam works for Contentful, Strapi, or any other API-driven CMS, only the fetch
  implementation inside those files changes.

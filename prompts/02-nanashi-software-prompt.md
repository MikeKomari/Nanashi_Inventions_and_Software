You are building **Nanashi Software**, the website of Nanashi's website-building service for food and beverage businesses and micro businesses (UMKM) in Indonesia. The visitors are business owners, not tech people. This repository (the Nanashi web repo) holds both Nanashi websites as separate apps: `apps/inventions/` and `apps/software/`. Build this site in `apps/software/`, starting from an empty Next.js project, and don't touch the other app. Each app is deployed as its own Vercel project (Root Directory = its folder).

## 0. Read first (source of truth)
The brand docs live in a **separate repository**, the Nanashi branding repo. Clone it next to this repository as `../nanashi-branding` (read only: never edit or commit there). If you can't find it, ask me for its URL. Everything else is in `apps/software/` in this repository.

Before writing any code, read these, in this order. They hold every decision; do not invent new ones.
1. `../nanashi-branding/nanashi-brand-decisions.md`: brand rules.
2. `../nanashi-branding/nanashi-software-website.md`: what this site does (S-xx) and how it looks (SD-xx).
3. `apps/software/DESIGN.md`: the build spec for the site **and** for the templates.
4. `apps/software/design-references/`: Pleurat Shala screenshots (site) and the Ridged landing page (café template). DESIGN.md §3 says what each is used for.
5. `apps/software/design-system/tokens.json`: the Nanashi design tokens (site only, not templates). Generate CSS variables from it; never hard-code hex values.

`../nanashi-branding/nanashi-software-business-plan.md` is context only. Nothing in it is in scope (no pricing page, no payments, no CMS, no client dashboard).

If the docs and DESIGN.md disagree, or something is missing, stop and ask me. Don't guess.
If a `vibe-web-baseline` skill is available, follow it (it treats DESIGN.md as the source of truth).

## 1. Facts

| Item | Value |
|---|---|
| WhatsApp | 0822-8305-8878 → links use `https://wa.me/6282283058878?text=<url-encoded message>` |
| Email (secondary contact) | michaelk.projects@gmail.com |
| Address | Served at `/software` on the main Nanashi domain (the Nanashi Inventions app rewrites `/software` to this app). Set Next.js `basePath: '/software'`. |
| Domain | Not bought yet. Read the site URL from `NEXT_PUBLIC_SITE_URL` everywhere (canonical, sitemap, OG). |
| Back link | "Nanashi Inventions" in the footer links to the root of the domain. |
| Language | Indonesian first (default), English as a switch. Use "kamu", warm and polite, no jargon; explain any unavoidable technical word in brackets. |

## 2. Stack
- Next.js (App Router, TypeScript, strict), every page statically generated at build time.
- Tailwind CSS v4 with CSS variables from `design-system/tokens.json` for the site. Each template has its own token set.
- Motion for gentle animation only. No Lenis. Everything off under `prefers-reduced-motion`.
- Light mode only. Phones first (design at 375px, then widen).
- Vercel hosting, Vercel Web Analytics with custom events `whatsapp_click` (prop: where: hero, template card name, band) and `demo_view` (prop: template).
- Lucide React for icons (plus a WhatsApp icon).

## 3. Pages
- Beranda (home): a story told by scrolling. Each section quietly answers a business owner's next doubt; the doubts are never written as headings. Order and content are in DESIGN.md §1 "Home".
- Template: the numbered grid. **Only 01 Kafe is live.** 02–05 (restaurant/warung, bakery/catering, UMKM shop, services) show "Segera hadir" with no fake screenshot.
- `/template/kafe`: the full café demo (see below).
- Tentang (about).
- 404. No pricing page yet.

Every WhatsApp button opens a pre-filled Indonesian message. Template cards name the template in the message (for example "Halo Nanashi Software, saya tertarik dengan template Kafe.").

## 4. The template system (most important architecture rule)
Templates are **driven by data**. Build it so a new client means a new content file, never new code:
- `templates/kafe/`: the template's components and its own theme (colors, fonts) in its own CSS scope, so Nanashi styles never leak in and template styles never leak out.
- `content/demo/kopi-elysia.json` (or `.ts` with a typed schema): all business content: name, logo, colors, tagline, story, menu categories with items and prices (IDR), photos, opening hours, WhatsApp number, address, map link, reviews.
- A typed schema (Zod) validated at build time. A content file that does not match the schema fails the build.
- The template renders only from that data. No business text, prices or images hard-coded in components.
- Demo mode: a slim Nanashi bar on top ("Ini demo template Kafe · Pesan template ini →" linking to WhatsApp), `noindex` on the demo page, and a small "Dibuat oleh Nanashi Software" credit in the template footer.

**01 Kafe, demo business "Kopi Elysia" (made up):** hero with a signature drink → short story → menu with categories and prices → atmosphere photos → reviews → location, hours and map → WhatsApp order band → footer. Visual reference: `design-references/ridged-drink-landing.png` (take the layout ideas listed in DESIGN.md, not its content). Choose the template's own fonts and palette to suit a warm Indonesian coffee shop; explain your choice in the plan.
Placeholder images: use clearly placeholder or free-licensed photos (Unsplash/Pexels-style licences) and record their source in `content/demo/CREDITS.md`. No photos of real, identifiable people. Ordering is WhatsApp only; no cart, no payment.

## 5. SEO
- Indonesian is the primary language: `lang="id"`, Indonesian titles and descriptions written for searches like "jasa pembuatan website UMKM" and "website untuk kafe".
- Canonical URLs, `hreflang` id/en pairs, `sitemap.xml` and `robots.txt` at build. Demo pages are `noindex` and excluded from the sitemap.
- JSON-LD: `Organization` (Nanashi Software, part of Nanashi) and `Service` on the home page, `FAQPage` for the FAQ section, `BreadcrumbList` on sub-pages.
- An OG image per page generated at build, in the light Nanashi Software style.

## 6. Logo
The static logo SVGs from the Nanashi design system are in `apps/software/public/brand/`. Use `nanashi-horizontal-color.svg` in the header (light background) and `nanashi-symbol-small-color.svg` for the favicon. Do not redraw, retype, recolor or animate them on this site.

## 7. Illustration
A thin line-art Indonesian street with five shopfronts (café, warung, bakery, small shop, barbershop) as an inline SVG, drawn in `text-muted` lines with small gold accents. It draws its lines once on first view.

## 8. How to work
Work in phases and stop for my review after each one:
1. **Plan.** Summarise what you understood, propose the folder structure and the content schema for templates, propose the café template's fonts and palette, and list every open question. No code yet.
2. **Site shell + home page** (Indonesian), phones first, with the template grid showing 01 Kafe and four "Segera hadir" cards.
3. **The template system + 01 Kafe demo** (Kopi Elysia), driven entirely by the content file.
4. **The rest:** Template page, Tentang, English version, SEO, analytics.
5. **Verify:** `npm run build` passes with no type or lint errors; changing `kopi-elysia.json` (name, a price, a photo) changes the demo with no code change; a broken content file fails the build; Lighthouse mobile on Beranda and the café demo meets LCP ≤ 2.5s, CLS ≤ 0.1, ≤ 150 KB JS; every WhatsApp link opens the right pre-filled message; the demo page has `noindex`. Report the numbers, not "looks good".

Commit in small, clear steps. Do not add features (pricing, payments, CMS, login, client dashboard) or libraries that are not in the docs; if you think something is missing, ask.

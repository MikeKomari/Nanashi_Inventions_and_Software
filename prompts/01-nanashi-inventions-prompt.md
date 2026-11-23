You are building **Nanashi Inventions**, the portfolio website of Nanashi, an independent product lab founded by Michael Kimeison. It is for investors and recruiters. This repository (the Nanashi web repo) holds both Nanashi websites as separate apps: `apps/inventions/` and `apps/software/`. Build this site in `apps/inventions/`, starting from an empty Next.js project, and don't touch the other app. Each app is deployed as its own Vercel project (Root Directory = its folder).

## 0. Read first (source of truth)
The brand docs live in a **separate repository**, the Nanashi branding repo. Clone it next to this repository as `../nanashi-branding` (read only: never edit or commit there). If you can't find it, ask me for its URL. Everything else is in `apps/inventions/` in this repository.

Before writing any code, read these, in this order. They hold every decision; do not invent new ones.
1. `../nanashi-branding/nanashi-brand-decisions.md`: brand rules (name, seven principles, voice, logo, family).
2. `../nanashi-branding/nanashi-inventions-website.md`: what this site does (W-xx) and how it looks (D-xx).
3. `apps/inventions/DESIGN.md`: the build spec: tokens, type, logo, layout, motion, performance budget.
4. `apps/inventions/design-references/`: visual references, with what to take and what to leave in DESIGN.md §9.
5. `apps/inventions/design-system/tokens.json`: the Nanashi design tokens. Generate CSS variables from this file; never hard-code hex values.

If the docs and DESIGN.md disagree, or something is missing, stop and ask me. Don't guess.
If a `vibe-web-baseline` skill is available, follow it (it treats DESIGN.md as the source of truth).

## 1. Facts

| Item | Value |
|---|---|
| Chromiq (live) | https://prism-gamma-three.vercel.app/ |
| Lexi (live) | https://lexi-beta-nine.vercel.app/ ("Try Lexi" must open `/inbox`, not the dashboard) |
| Contact email | michaelk.projects@gmail.com (email is the only contact method) |
| Founder link | "Founded by Michael Kimeison" → https://michaelkimeison.com |
| GitHub repos | github.com/MikeKomari/CHROMIQ, github.com/MikeKomari/LEXI (read their README.md for product copy) |
| Domain | Not bought yet. Read the site URL from one env var (`NEXT_PUBLIC_SITE_URL`) everywhere (canonical, sitemap, OG). |
| Nanashi Software | Separate app, served at `/software` on the same domain via a Vercel rewrite. Read its URL from `SOFTWARE_ORIGIN`. Until it exists, the rewrite and the links may point to a placeholder. |

Products: Chromiq and Lexi are "In production". Nanashi Studio and Nanashi Home are "Coming soon": one shared row on the home page, no page of their own, no screenshots.

Accents (from DESIGN.md §2): Chromiq = comet, Lexi = tide, Studio = nova, Home = orbit. The header "Need a website? → Nanashi Software" button is solid Star Gold.

## 2. Stack
- Next.js (App Router, TypeScript, strict), every page statically generated at build time.
- Tailwind CSS v4 driven by CSS variables generated from `design-system/tokens.json`.
- Motion for animation, Lenis for smooth scrolling. Both off under `prefers-reduced-motion`.
- Content (product pages, Engineering articles) as MDX files in the repo.
- English at `/`, Indonesian at `/id/` (Home, Inventions, product pages, About). Engineering is English only.
- Vercel hosting, Vercel Web Analytics with two custom events: `try_product` (prop: product) and `email_click`.
- Lucide React for icons.

## 3. Pages
Home · `/inventions` · `/inventions/chromiq` · `/inventions/lexi` · `/engineering` + 2 articles · `/about` (seven principles + founder section + one line for investors) · `/privacy` (short; analytics is cookieless) · 404.

Layouts, sections and motion for each are in DESIGN.md §5–6. Follow them exactly.

## 4. SEO (non-negotiable)
- Unique `<title>` and meta description per page, canonical URLs, `hreflang` en/id pairs.
- `sitemap.xml` and `robots.txt` generated at build.
- JSON-LD: `Organization` (Nanashi, founder Michael Kimeison) on every page, `SoftwareApplication` on each product page, `BlogPosting` on articles, `BreadcrumbList` on sub-pages.
- An OG image per page generated at build (Next.js `opengraph-image`), in the Nanashi dark style.
- Semantic HTML: one `h1` per page, real links (not click handlers) for navigation.

## 5. Content
You write all copy; the founder reviews. Voice: calm, clear, confident, plain English, no hype words (see brand decisions B-06). No invented numbers anywhere: the traction block shows real figures or "Pre-launch".
- Product pages: draft from each repo's README, in the order Problem → What it does → Under the hood → Result.
- Engineering articles (W-14): (1) how Chromiq's URL inspector loads other websites safely; (2) why Lexi has no AI connection and uses a copy/paste step instead. Base them on the repos' code and docs; cite files where useful.
- Indonesian versions: translate naturally, not word for word. Mark them for founder review.

## 6. Screenshots
Take real screenshots of the two live apps with Playwright (desktop 1440px and mobile 390px), saved as optimised WebP in `public/screens/`, with a script (`npm run screens`) so they can be re-taken. Never use mockups or AI-generated screens.

## 7. Logo
The static logo SVGs from the Nanashi design system are already in `apps/inventions/public/brand/` (symbol and horizontal lockup, color and reversed, plus the small cut). Do not redraw, retype or recolor them.

**There is no animated logo yet. Creating it is part of your job.** Build it from `nanashi-symbol-reversed.svg` (white orbit, gold star, for the dark site), keeping its exact paths and viewBox:
- The symbol has two filled paths: the **orbit** (a ring with a tapering gap, like a comet trail) and the **star** (gold, breaking out through the gap).
- The orbit is a filled shape, not a stroke. To make it "draw itself", reveal the fill through an SVG mask: a stroked circle on the orbit's centerline, animated with `pathLength` from 0 to 1 in the direction of the trail.
- Loop (6–8s, infinite): the orbit is revealed → the star travels out along the trail to its resting place, scaling up with a short twinkle → hold → fade or rewind smoothly → repeat. The resting frame must match the static logo exactly.
- Make it a reusable `<AnimatedLogo />` component built with Motion, about 1–2 KB of SVG and no images, video, GIF, Lottie, canvas or WebGL (D-03). Under reduced motion, render the static final frame.
- Show me the loop on its own (a `/dev/logo` page is fine, excluded from the build's sitemap) before putting it into the hero. This is phase 2's first deliverable.

## 8. How to work
Work in phases and stop for my review after each one:
1. **Plan.** Summarise what you understood (pages, sections, motion, SEO) and list every open question. Propose the folder structure. No code yet.
2. **Prototype the home page only:** stage with the animated logo, the seven stars (Big Dipper) section, and the invention rows with real screenshots. Desktop and mobile. This is where we judge the experimental look (D-01), so make it easy to tweak.
3. **Build the rest:** remaining pages, i18n, MDX content, SEO, analytics.
4. **Verify:** `npm run build` passes with no type or lint errors; Lighthouse on Home and one product page (mobile) meets the DESIGN.md §7 budget (LCP ≤ 2.5s, CLS ≤ 0.1, ≤ 150 KB JS on Home); keyboard-only navigation works; reduced motion turns off Lenis, parallax and the logo loop; every page has its title, description, canonical, hreflang and JSON-LD. Report the numbers, not "looks good".

Commit in small, clear steps. Do not add features, pages, libraries or animations that are not in the docs; if you think something is missing, ask.

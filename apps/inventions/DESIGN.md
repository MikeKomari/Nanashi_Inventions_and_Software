# DESIGN.md: Nanashi Inventions

Source of truth for how nanashi-inventions looks and moves. Read this before touching any UI. The decisions behind it (and the why) live in the separate branding repository (`nanashi-branding/nanashi-inventions-website.md`); brand rules live in `nanashi-branding/nanashi-brand-decisions.md`. If this file and those disagree, ask, don't guess.

Design system: "Nanashi" design system (Comet Orbit logo, Moon neutrals, Star Gold). Tokens are copied in `design-system/tokens.json`.

---

## 1. Mood

A night-sky showroom with one object under the light: the Nanashi logo. Extravagant, cinematic and calm at the same time. Borrow the *design language* of the references (studio lighting, a single centred object, thin type, restrained UI), never their subject matter (cars, beauty products).

- **Dark only.** No light theme, no toggle.
- **One hero object.** The animated Comet Orbit logo. No giant wordmark behind it.
- **Normal website.** Native scroll, a footer, real sub-pages. Parallax shapes how the home page feels; it never takes over the scroll.

## 2. Color

Use the dark values of the design system. Never hard-code a hex outside the token file.

| Role | Token | Value (dark) |
|---|---|---|
| Page background | `bg` / `night` | #0F0D14 |
| Cards, panels | `surface` | #18161F |
| Raised / hover | `surface-raised` | #221F2D |
| Hairlines | `border` | #2D2A3A |
| Body text | `text` | #EEECF3 |
| Secondary text | `text-muted` | #A29DB2 |
| Actions (buttons, links) | `primary` → `accent-violet` | #A283E6 (hover #B79CF0), text on it `on-primary` #0F0D14 |
| The star, one highlight per screen | `star` | #FFC857 |
| Brand moments (hero light only) | `brand-indigo` | #4B0082 |
| Focus ring | `focus-ring` | #B79CF0 |

**Proportions:** ~80% Moon neutrals, ~15% accent, ≤5% gold.
**Indigo** appears only as the soft light cone/glow behind the hero logo.
**Gold** only on the logo star, the Big Dipper stars and one "new" badge at most.

### Product accents (dark values)
Each product uses its accent only for its labels, edges, highlights and its page's light tint, never for big backgrounds.

| Product | Accent | Dark value |
|---|---|---|
| Chromiq | `accent-comet` (dev tools) | #5EEAD4 |
| Lexi | `accent-tide` (education) | #7DD3FC |
| Nanashi Studio | `accent-nova` (consumer, commerce) | #F9A8D4 |
| Nanashi Home | `accent-orbit` | #A5B4FC |

### Nanashi Software button (the one exception)
The header "Need a website? → Nanashi Software" button must stand out from the violet actions: a solid Star Gold fill (`star` #FFC857) with `on-star` text (#2E1458). It is the only gold button on the site.

## 3. Type

| Use | Family | Notes |
|---|---|---|
| Headings, display | Sora | 600 weight, tight tracking (-0.02em) |
| Body, UI | Plus Jakarta Sans | body 15–17px / 1.6 |
| Code, labels, specs | JetBrains Mono | small uppercase labels with letter-spacing |

Large display type on Home and product pages (around 80–96px desktop, clamp down on mobile). Restrained sizes in Engineering. Headings are always in `text`, never in purple.

**七星 · nana hoshi:** the kanji 七星 followed by "nana hoshi" to its right in muted, small text. Appears above the hero, in the footer and at the top of the principles. Load only those two glyphs (subset a Japanese font or inline them as SVG). Never load a full CJK font.

## 4. Logo

Comet Orbit: a gold star breaking out of an indigo orbit; the wordmark is lowercase "nanashi" with a gold sparkle as the dot of the i.

- The SVGs from the design system's **Logos** group are in `public/brand/`: `nanashi-horizontal-reversed.svg` (header), `nanashi-symbol-reversed.svg` (base for the hero animation), `nanashi-symbol-small-color.svg` (favicon, under 24px), plus the color versions.
- **The animated logo doesn't exist yet; it is built in code from `nanashi-symbol-reversed.svg`** (see §6). Keep the exact paths: the orbit (a filled ring with a tapering gap) and the gold star.
- On this dark site always use the **reversed** files (white orbit and letters, gold star).
- The star is always gold. Never stretch, rotate, recolor, close the orbit's gap, or add glows or shadows to the logo itself (light around it is fine).
- Clear space: a quarter of the symbol's width on every side. Minimum: lockup 120px wide, symbol 24px.

## 5. Layout and pages

Pages: Home, Inventions, `/inventions/chromiq`, `/inventions/lexi`, Engineering (list + articles), About, Privacy, 404. Indonesian under `/id/` (Engineering is English only).

### Header (every page)
Logo · Inventions · Engineering · About · EN/ID · gold "Need a website? → Nanashi Software" button. At the top of the page it is full-width and transparent; after scrolling it shrinks into a slim floating pill.

### Home, top to bottom
1. **Stage.** The animated logo alone under a soft indigo light cone, with a faint reflection on the "floor". Above it: 七星 · nana hoshi. Below: "An independent product lab.", one supporting line, "See the inventions" (primary) and "Email us" (quiet link).
2. **The seven stars.** Section is tall. The Big Dipper (北斗七星) stays sticky on one side; the seven principles scroll past on the other; each gold star lights as its principle passes.
3. **Inventions.** One wide row per live product, alternating sides: large real screenshot on one side; name (in accent), one line, status badge, "Try it" and "Read more →" on the other. The screenshot drifts slower than the text (parallax). Studio and Home share one small "Coming soon" row with no screenshots.
4. **Engineering.** The two latest articles.
5. **Nanashi Software band.** Full-width, high contrast, links to `/software`.
6. **Footer.** Logo + 七星 · nana hoshi, page links, email, GitHub, LinkedIn, "Founded by Michael Kimeison" (links to michaelkimeison.com), EN/ID.

### Product page
Hero (name in accent color, large screenshot, "Try it") → Problem → What it does → Under the hood → Result → screenshot gallery → traction block (real numbers or "Pre-launch") → link to its Engineering article. Lighter motion than Home.
Lexi's "Try it" opens Lexi's Inbox, not its dashboard.

### Engineering article
Calm reading layout inspired by Anthropic's engineering blog: a narrow text column (~65–72 characters), a sticky table of contents on the side (desktop), styled code blocks (JetBrains Mono), diagrams, almost no animation.

### Cards and surfaces
No glassmorphism and no frosted panels. Surfaces are `surface` with a 1px `border`, radius 10px (`radius-md`). Shadows only on menus and modals.

### Phones
Phones get their own layout where it helps: the stage stays full-screen; the seven stars become a vertical sequence (the constellation at the top, the principles below, with stars lighting in order); invention rows stack (screenshot above text). Touch targets at least 44px.

## 6. Motion

Libraries: **Motion** for animation, **Lenis** for smooth scrolling.

| Element | Behavior |
|---|---|
| Hero logo | Infinite loop, 6–8s: the orbit draws itself, the star breaks out and travels along the comet trail, everything settles, repeat. Built as an inline SVG animated with Motion (no GIF, no video, no 3D). The orbit is a filled shape, so "drawing" it means revealing it through a mask whose stroked centerline animates `pathLength` 0→1. The resting frame must match the static logo exactly. |
| Big Dipper | Each star fades and scales in as its principle crosses the viewport center. |
| Invention rows | Screenshot parallax (moves ~15–20% slower than the text). |
| Headlines | Word-by-word reveal on first view. |
| Cards and rows | Lift and brighten the accent edge on hover. |
| Buttons | Slight magnetic pull towards the cursor (desktop only). |
| Sections | Fade and rise on scroll into view. |
| Header | Shrinks into the floating pill on scroll. |
| Page transitions | Short crossfade. |

**Not allowed:** custom cursors, scroll-jacking (taking control of the scroll position), autoplaying sound, animating layout properties (animate only `transform` and `opacity`).

**Reduced motion:** when the visitor's device sets `prefers-reduced-motion: reduce`, turn off Lenis, parallax and reveals; show the logo's final frame without looping.

## 7. Performance budget (hard limits)

On a mid-range phone:
- Largest Contentful Paint ≤ 2.5s
- Cumulative Layout Shift ≤ 0.1
- Home page JavaScript ≤ 150 KB compressed, Motion and Lenis included

If an effect breaks a limit, simplify the effect. Every page is generated at build time (Next.js static generation).

## 8. Accessibility

- All text reaches 4.5:1 on its background (the tokens already do).
- Visible 2px focus ring (`focus-ring`) with a 2px offset on everything clickable.
- Status is never shown by color alone (badge text plus color).
- Screenshots have real alt text describing what the screen shows.

## 9. References

In `design-references/` on your machine only: they are other designers' work and are not committed (see that folder's README). Use them for the *feel*, not the content; the table below is enough to work from if the images are missing.

| File | What to take | What to leave |
|---|---|---|
| `car-showroom-dashboard.png` | One object centre stage under studio light, a floor reflection, thin light type, quiet UI at the edges | The car, the glass cards, the side index, the 360° ring, the dashboard widgets |
| `beauty-brand-hero.png` | The product overlapping its background, confident spacing | The giant wordmark, the pink palette, the beauty theme |

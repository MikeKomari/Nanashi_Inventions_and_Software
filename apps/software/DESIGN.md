# DESIGN.md: Nanashi Software

Source of truth for how nanashi-software looks and moves. Read this before touching any UI. The decisions behind it live in the separate branding repository (`nanashi-branding/nanashi-software-website.md`); brand rules live in `nanashi-branding/nanashi-brand-decisions.md`. If this file and those disagree, ask, don't guess.

This codebase holds two different kinds of UI:
1. **The Nanashi Software site** (home, templates, about). It follows the Nanashi design system (tokens in `design-system/tokens.json`).
2. **The templates** (café first). Each has its own look, colors and fonts. The Nanashi design system does **not** apply inside a template, except for the slim demo bar and the footer credit.

---

## 1. The Nanashi Software site

### Mood
A warm, friendly, well-organized studio for small business owners: like a neat blueprint notebook. Clear, confident, never technical. Reference: the "Pleurat Shala" portfolio (light version, especially its "Themes" page). Take its structure and warmth, not its colors.

- **Light only.** No dark theme, no toggle.
- **Phones first.** Design at 375px wide first, then widen to desktop.
- **Indonesian first** (`/software`), English under `/software/en`.

### Color (light values of the Nanashi design system)

| Role | Token | Value (light) |
|---|---|---|
| Page background | `bg` | #FBFAFD |
| Cards | `surface` | #FFFFFF |
| Raised / hover | `surface-raised` | #F6F5F9 |
| Hairlines and the blueprint grid | `border` | #E0DDE8 |
| Body text | `text` | #1F1A2B |
| Secondary text, second line of headlines | `text-muted` | #5D5870 |
| Buttons and links | `primary` → `accent-violet` | #6A3BC6 (hover #5729A6), white text |
| Small section labels (like Pleurat's "TRACKS") | `star` fill + `on-star` text | #FFC857 / #2E1458 |
| WhatsApp buttons | `success` | #177A55, white text, WhatsApp icon |
| Focus ring | `focus-ring` | #8257D8 |

Gold is only for the small section labels. Indigo (`brand-indigo`) only appears in the logo.

The page may use a slightly warmer paper tone than `bg` if it tests well against Pleurat's warmth. If so, add it as a new token rather than hard-coding it, and keep text contrast at 4.5:1 or higher.

### Type
Sora for headings, Plus Jakarta Sans for everything else (both from the design system). Two-tone headlines like Pleurat: the first line in `text`, the second in `text-muted`. Body text at least 16px on phones.

### Logo
Use `nanashi-horizontal-color.svg` from the design system's Logos group in the header (light background, so the color version). Favicon: `nanashi-symbol-small-color.svg`. Same logo rules as the brand: the star is always gold, no stretching, recoloring or glows.

### Layout language (taken from Pleurat, rebuilt with Nanashi tokens)
- A faint line grid behind the page, like blueprint paper (1px `border` lines, very low contrast).
- Thin borders instead of shadows; small corner brackets on key sections.
- Small uppercase section labels in a gold tag.
- A two-column hero on desktop (headline left; short text and buttons right), stacked on phones.
- Numbered cards (01–05).

### Pages
Beranda (home) · Template (the grid) · one demo page per template · Tentang (about) · link back to Nanashi Inventions. The pricing page comes later.

### Home: a story told by scrolling
Each section quietly answers the visitor's next doubt. The questions are never written as headings; the visitor should simply feel answered. Voice: Indonesian, "kamu", warm and polite, no jargon (explain any unavoidable technical word in brackets).

| Order | Doubt being answered (not shown) | Section |
|---|---|---|
| 1 | Does my business need a website? | Hero: two-tone headline, one line, WhatsApp button, line-art street illustration |
| 2 | Isn't Instagram enough? | Why a website: found on Google, a menu that is always up to date, looks trustworthy |
| 3 | What would it look like? | The template grid |
| 4 | How does it work? | Three steps: pick a template → send your details on WhatsApp → go live |
| 5 | Can I have my own design? | Custom option teaser |
| 6 | I'm still not sure | Short FAQ (accordion) |
| 7 | How do I start? | WhatsApp band, then the footer |

### Illustration
A thin line-art Indonesian street with five shopfronts: a café, a warung, a bakery, a small shop and a barbershop, one per template. Drawn as an inline SVG in `text-muted` lines with a little gold on lamps or signs. It sits under the hero like Pleurat's skyline.

### Template cards
Real screenshot of the demo, number (01–05), business type, "Lihat demo ↗", and "Pesan via WhatsApp" (opens WhatsApp with a message that already names the template). At launch only **01 Kafe** is live; 02–05 show "Segera hadir" with a soft placeholder, no fake screenshot.

### Motion
Calmer than Nanashi Inventions. Motion library only (no Lenis).
- Sections fade and rise gently on scroll into view.
- Cards lift slightly on hover (desktop).
- The street illustration draws its lines once on first view.
- Respect `prefers-reduced-motion` (no animation at all).
- Animate only `transform` and `opacity`.

### Performance budget (same as Inventions)
On a mid-range phone: Largest Contentful Paint ≤ 2.5s, layout shift ≤ 0.1, ≤ 150 KB compressed JavaScript per page. Every page is generated at build time.

---

## 2. Templates

### Rules for every template
- **Driven by data.** All business content comes from one content file per business (name, logo, colors, menu with prices, photos, opening hours, WhatsApp number, address, map). The template code never contains business content. Changing a client means changing the content file, not the code.
- **Own look.** Each template picks its own palette and fonts to suit its business type. Nanashi colors and fonts are not used inside templates.
- **Ordering.** A WhatsApp order button that opens a pre-filled message. No online payment yet.
- **Footer credit.** A small "Dibuat oleh Nanashi Software" link in the footer (removable for custom clients).
- **Phones first** and the same performance budget as above.

### Demo mode (on the Nanashi Software site)
- Each demo is the full template filled with a made-up business and placeholder products.
- A slim Nanashi bar across the top: "Ini demo template Kafe · Pesan template ini →" (links to WhatsApp). This bar uses Nanashi styling.
- Demo pages are hidden from search engines (`noindex`).

### 01 Kafe (first to launch)
- **Demo business:** Kopi Elysia (made up).
- **Reference:** `design-references/ridged-drink-landing.png`. Take: a big product photo as the hero, an outlined giant wordmark behind it, rounded tinted panels, a clear price block, a review quote, a simple footer. Leave: the energy-drink content, the cart and shop flow, the English copy.
- **Sections:** hero (signature drink) → short story of the café → menu with categories and prices → atmosphere photos → reviews → location, hours and map → WhatsApp order band → footer.

### 02–05 (later, one at a time)
Restaurant/warung, bakery/dessert/catering, UMKM product shop, services (laundry, barbershop, salon). Each gets its own section in this file when it is designed.

### 06 Profil Pribadi (personal profile and portfolio)

A one-page site about one person, with their face as the hero. It is for anyone whose name is the business: consultants, coaches, speakers, doctors, lawyers, founders, freelancers and creatives. Many of these people have no "projects" to show, so every section below the hero is optional.

- **Demo person:** Kyouka Bella (made-up placeholder), a public speaking coach. The demo portrait is AI-generated for now: an original face, never a stock face without a licence, and never a face from the references. Replace it with a real photo shoot later if needed.
- **Concept board:** "B2" on the Portfolio template concepts canvas (claude.ai/artifact/EJPhjC5x3sL5W2gavaBjAz).
- **References:** five screenshots of a designer's personal site (`portfolio-ref-*.png`, local only). Take: the face as the hero, a very large name, an "available" pill, social links as pills, a services list, an experience list, and a closing contact band. Leave: the outlined plus solid name running across the top, the slash section labels, tilted previews that follow the cursor, the grey cloud background, the monochrome palette, and all of its copy.

#### Look
- **Colours:** a soft background colour and one accent, both chosen per client. Ink (#16183A or the client's dark colour) for text. White for every pill, card and the header bar. All pairs pass 4.5:1 and are checked at build time (`contrastPairs`, as in Toko).
- **Type:** Bricolage Grotesque only. ExtraBold (800) for the name and section titles, Medium (500) for everything else. Body text at least 16px on phones.
- **Signature shape:** the pill. The header is a floating white pill. Buttons, chips, the "available" tag and the logo strip are pills. Cards use a 24px radius. No borders or shadows except a faint shadow on the header.
- Section titles are plain words in ExtraBold (for example "Program", "Panggung"), with no numbers or slashes.

#### Hero (fixed)
- **Desktop:** the first name on the left and the last name on the right, on one line, very large (sized so each half fits beside the head, at most 168px). The last name is in the accent colour. The cut-out portrait stands centred on the bottom edge, in front of the names, so the head sits between them. There is no frame or shape behind the portrait.
- **Bottom left:** the "available" pill (optional), a one-line intro and one button. **Bottom right:** "Pernah tampil di" or "Dipercaya oleh" with up to three logo pills (optional).
- **Header pill:** a short name or monogram, up to four menu links built from the sections that are on, and one main button (WhatsApp or "Undang", set in the file).
- **Name rules:**
  - Titles such as dr., Ir., H. or S.H. are shown as a small label above the name, not as part of the split.
  - A single name (common in Indonesia) is centred above the portrait, in the accent colour.
  - Three or more words: the first word goes left and the rest go right.
  - The font size is set from the longest word, so no word is ever cut off or wrapped mid-word.
- **Portrait file:** a transparent cut-out (WebP, shoulders up, at least 1200px tall). Removing the background is part of our service, not the client's job.

#### Section library (all optional; the content file decides which ones show and in what order)

| Section | What it shows | Layout |
|---|---|---|
| About | 2–3 short paragraphs and an optional second photo | Text left, photo right; stacked on phones |
| Services or programs | Name, one line and an optional price for each | White cards in a 3-column grid; one column on phones |
| Numbers | 2–4 facts, such as years or clients | Large ExtraBold numbers in a row; 2×2 on phones |
| Work | Title, image and tag for each project, with filter chips when there are 2+ tags | 2-column card grid; one column on phones |
| Experience | Organisation, role and years | Rows on a white panel; the newest first |
| Ventures | Companies the person runs: logo, name, role, link | Logo pills with a line under each |
| Speaking and events | Event, city, date and an optional photo | List rows; upcoming ones get an accent tag |
| Press | Media logos and an optional quote | Logo strip in pills |
| Testimonials | Quote, name, role and an optional small photo | Three cards in a row on desktop; a swipeable row on phones |
| Gallery | 4–8 photos | Simple masonry; 2 columns on phones |
| Contact (fixed) | A short line, a WhatsApp button, email and social pills | Full-width accent band, then the footer with the Nanashi credit |

Each section has its own menu label in the file, so a coach can call Services "Program" and a lawyer can call it "Layanan Hukum".

#### Phones (design at 375px first)
- The header turns into a white pill with the monogram on the left and a menu button on the right. The menu opens as a full-screen sheet.
- **Hero:** the title label, then the first name on the left and the last name aligned right on the next line, then the portrait below, overlapping the bottom of the last name. The intro, the "available" pill and the button come after the portrait. The logo pills move into the next section.
- A WhatsApp button stays fixed at the bottom of the screen once the hero has scrolled away.
- Touch targets are at least 44px. There is no horizontal scrolling except the testimonial swipe.

#### Motion (calm, like the rest of Nanashi Software)
- **On load, once:** the two name halves slide in from their own sides (24px) and fade in, then the portrait rises 24px. The portrait never fades, because it is the largest element on first paint. The whole sequence takes 0.7s at most.
- Sections fade and rise gently when scrolled into view. Pills and cards lift 2px on hover on desktop.
- Only transform and opacity animate. With reduced motion on, nothing moves.

#### Performance
- The portrait is the largest element on first paint. It is preloaded, at most 120 KB on phones, and has a fixed width and height so nothing shifts.
- One font family with two weights, self-hosted. The same budget as the other templates applies: LCP ≤ 2.5s, layout shift ≤ 0.1, ≤ 150 KB of JavaScript.

#### Content file (shape only; checked at build time like the other templates)
```json
{
  "person": { "title": "", "name": "Kyouka Bella", "role": "Pelatih public speaking",
              "intro": "…", "portrait": "kyouka-cutout.webp", "available": "Menerima undangan 2027" },
  "colors": { "background": "#E6E9F5", "text": "#16183A", "accent": "#3C4FD8", "onAccent": "#FFFFFF" },
  "headerButton": { "label": "Undang sebagai pembicara", "action": "whatsapp" },
  "heroLogos": { "label": "Pernah tampil di", "items": [ … ] },
  "sections": [
    { "type": "services", "menu": "Program", "items": [ … ] },
    { "type": "speaking", "menu": "Panggung", "items": [ … ] },
    { "type": "testimonials", "menu": "Testimoni", "items": [ … ] },
    { "type": "gallery", "menu": "Galeri", "items": [ … ] }
  ],
  "contact": { "whatsapp": "62…", "email": "…", "social": [ … ] }
}
```
A section that isn't listed doesn't render, and its menu link disappears with it.

#### Decided (25 Nov 2026)
- It is template **06**, added after the existing 01–05 slots.
- The demo uses an AI-generated portrait and the placeholder name Kyouka Bella.
- The **Business profile** template is designed next, as a sibling of this one.

---

## 3. References

In `design-references/` on your machine only: they are other designers' work and are not committed (see that folder's README). The descriptions in this file are enough to work from if the images are missing.

| File | Used for |
|---|---|
| `pleurat-light-home.png` | Site structure: two-column hero, two-tone headline, skyline illustration |
| `pleurat-light-sections.png` | Section labels, corner brackets, blueprint grid |
| `pleurat-dark-home.png` | Structure only (our site is light) |
| `pleurat-light-work.png` | How work is shown next to its description |
| `pleurat-dark-themes.png` | The numbered template card grid |
| `ridged-drink-landing.png` | The café template (01 Kafe) |
| `portfolio-ref-*.png` | The personal profile template (06): ideas only, never copied |

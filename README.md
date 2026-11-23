# nanashi-web

The code for both Nanashi websites. The reasons behind every design decision live in the separate `nanashi-branding` repository; clone it next to this one as `../nanashi-branding`.

| Folder | What's in it |
|---|---|
| `apps/inventions/` | Nanashi Inventions: `DESIGN.md` (build spec), `design-references/`, `design-system/tokens.json`. The Next.js app is built here. |
| `apps/software/` | Nanashi Software and its templates: same structure. Served at `/software` on the main domain. |
| `prompts/` | The Claude Code prompts that start each build |

Each app is its own Vercel project, with its Root Directory set to its folder. The static logo SVGs from the Nanashi design system are already in each app's `public/brand/`. The animated logo is built by Claude Code (see prompt 01).

// Template demos on the Nanashi Software site. Server only.
// Every live template in the registry is parsed here at module scope, so `npm run build` fails
// with a readable error if a demo's content file does not match its template.
import kopiElysia from "@/content/demo/kopi-elysia.json";
import { id as t } from "@/content/site/id";
import { BASE_PATH } from "@/lib/site";
import { TEMPLATES, type TemplateEntry } from "./registry";
import type { LoadedTemplate, TemplateKind } from "./shared/kind";
import { kafe } from "./kafe";

/** Content files in content/demo/, by name. */
const CONTENT: Record<string, unknown> = {
  "kopi-elysia": kopiElysia,
};

/** Template code, by registry slug. */
const KINDS: Record<string, TemplateKind> = { kafe };

export type Demo = LoadedTemplate & { entry: TemplateEntry };

const credit = { label: t.demo.credit, href: BASE_PATH };

function load(entry: TemplateEntry): Demo {
  const name = entry.demo!.content;
  const kind = KINDS[entry.slug];
  if (!kind) throw new Error(`Template "${entry.slug}" is live but has no template code in templates/demos.tsx`);
  if (!(name in CONTENT)) throw new Error(`Demo content "${name}" for "${entry.slug}" is not listed in templates/demos.tsx`);
  return { ...kind.load(CONTENT[name], `content/demo/${name}.json`, credit), entry };
}

const DEMOS = new Map(
  TEMPLATES.filter((e) => e.status === "live" && e.demo).map((e) => [e.slug, load(e)] as const),
);

export const demoSlugs = () => [...DEMOS.keys()];
export const getDemo = (slug: string) => DEMOS.get(slug);

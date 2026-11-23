// Turns design-system/tokens.json (+ tokens.site.json) into styles/tokens.css,
// a Tailwind v4 @theme block. This site is light only, so light values are used.
// Run automatically before dev and build. Never edit styles/tokens.css by hand.
import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (p) => JSON.parse(readFileSync(new URL(p, root), "utf8"));
const ds = read("design-system/tokens.json");
const site = read("design-system/tokens.site.json");

const colors = new Map(ds.color.tokens.map((t) => [t.name, t.value]));
for (const t of site.color) colors.set(t.name, t.value);

function light(name, seen = new Set()) {
  if (seen.has(name)) throw new Error(`Token cycle at ${name}`);
  seen.add(name);
  const v = colors.get(name);
  if (v === undefined) throw new Error(`Unknown token ${name}`);
  const raw = typeof v === "object" ? v.light : v;
  const ref = /^\{(.+)\}$/.exec(raw);
  return ref ? light(ref[1], seen) : raw;
}

const lines = ["  --color-*: initial;"];
for (const name of colors.keys()) lines.push(`  --color-${name}: ${light(name)};`);
for (const t of ds.radius.tokens) lines.push(`  --${t.name}: ${t.value};`);
for (const t of ds.shadow.tokens) lines.push(`  --${t.name}: ${typeof t.value === "object" ? t.value.light : t.value};`);

const css = `/* Generated from design-system/tokens.json and tokens.site.json by scripts/build-tokens.mjs. Do not edit. */
@theme {
${lines.join("\n")}
}
`;
writeFileSync(new URL("styles/tokens.css", root), css);
console.log(`tokens.css: ${colors.size} colors`);

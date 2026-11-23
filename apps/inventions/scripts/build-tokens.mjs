// Turns design-system/tokens.json into styles/tokens.css,
// a Tailwind v4 @theme block. This site is dark only, so dark values are used.
// Run automatically before dev and build. Never edit styles/tokens.css by hand.
import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (p) => JSON.parse(readFileSync(new URL(p, root), "utf8"));
const ds = read("design-system/tokens.json");

const colors = new Map(ds.color.tokens.map((t) => [t.name, t.value]));

function resolve(name, seen = new Set()) {
  if (seen.has(name)) throw new Error(`Token cycle at ${name}`);
  seen.add(name);
  const v = colors.get(name);
  if (v === undefined) throw new Error(`Unknown token ${name}`);
  const raw = typeof v === "object" ? v.dark : v;
  const ref = /^\{(.+)\}$/.exec(raw);
  return ref ? resolve(ref[1], seen) : raw;
}

const lines = ["  --color-*: initial;"];
for (const name of colors.keys()) lines.push(`  --color-${name}: ${resolve(name)};`);
for (const t of ds.radius.tokens) lines.push(`  --${t.name}: ${t.value};`);
for (const t of ds.shadow.tokens) lines.push(`  --${t.name}: ${typeof t.value === "object" ? t.value.dark : t.value};`);

const css = `/* Generated from design-system/tokens.json by scripts/build-tokens.mjs. Do not edit. */
@theme {
${lines.join("\n")}
}
`;
writeFileSync(new URL("styles/tokens.css", root), css);
console.log(`tokens.css: ${colors.size} colors`);

// Same values for places CSS variables can't reach (metadata themeColor, generated OG images).
const ts = `// Generated from design-system/tokens.json by scripts/build-tokens.mjs. Do not edit.
export const COLOR = {
${[...colors.keys()].map((n) => `  ${JSON.stringify(n)}: ${JSON.stringify(resolve(n))},`).join("\n")}
} as const;
`;
writeFileSync(new URL("styles/tokens.ts", root), ts);

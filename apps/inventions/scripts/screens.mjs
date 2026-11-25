// Real screenshots of the two live products (W-15): no mockups, no seeded statistics.
//
//   npm run screens            # all screens
//   npm run screens -- lexi    # one product
//
// Writes optimised WebP into public/screens/ and their sizes into content/screens.generated.ts,
// so next/image always gets explicit dimensions (no layout shift).
//
// Playwright is not a dependency of this app: the script uses whichever copy the machine has
// (`playwright` on NODE_PATH, or `playwright-core` if installed). Set PW_CHROMIUM to a browser
// binary if Playwright cannot find its own. Images are encoded with sharp, which ships with Next.
//
// LEXI keeps its data in the visitor's browser, so a fresh visit shows an empty Inbox. Before the
// LEXI screenshots, the script types real Chinese words through LEXI's own quick-capture form, then
// runs LEXI's real enrichment flow: select the captures, copy the prompt, paste a JSON answer that
// passes LEXI's validator (domain/enrichment.ts), preview it and apply it. LEXI's Dashboard is never
// captured: it still shows placeholder numbers.
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { LEXI_ENRICHMENT, LEXI_WORDS } from "./lexi-seed.mjs";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

function loadPlaywright() {
  for (const name of ["playwright", "playwright-core"]) {
    try {
      return require(name);
    } catch {
      // try the next one
    }
  }
  throw new Error("Playwright not found. Install playwright-core or put playwright on NODE_PATH.");
}
const { chromium } = loadPlaywright();

const root = new URL("../", import.meta.url);
const OUT = new URL("public/screens/", root);
const CHROMIQ = "https://prism-gamma-three.vercel.app";
const LEXI = "https://lexi-beta-nine.vercel.app";

const DEVICES = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

const shots = []; // { name, width, height, alt }

async function save(page, name, alt, { fullPage = false } = {}) {
  await page.waitForTimeout(600);
  const png = await page.screenshot({ fullPage, animations: "disabled" });
  const info = await sharp(png).webp({ quality: 82, effort: 6 }).toFile(new URL(`${name}.webp`, OUT).pathname);
  shots.push({ name, width: info.width, height: info.height, alt });
  console.log(`  ${name}.webp  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

async function context(browser, device) {
  return browser.newContext({ ...DEVICES[device], colorScheme: "dark", reducedMotion: "reduce", locale: "en-US" });
}

async function chromiq(browser, device) {
  const ctx = await context(browser, device);
  const page = await ctx.newPage();
  const suffix = device;

  await page.goto(`${CHROMIQ}/`, { waitUntil: "networkidle" });
  await save(page, `chromiq-landing-${suffix}`, "CHROMIQ's landing page: the CHROMIQ wordmark and a field to paste any public site and restyle it live.");

  await page.goto(`${CHROMIQ}/workspace`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await save(
    page,
    `chromiq-workspace-${suffix}`,
    "The CHROMIQ workbench: starter systems on the left, a live editorial preview in the middle and the token inspector with type and colour settings on the right.",
  );

  if (device === "desktop") {
    // Contrast: open the inspector's Contrast section and preview a colour-vision simulation.
    const contrast = page.getByRole("button", { name: "Contrast", exact: true });
    if (await contrast.count()) {
      await contrast.first().scrollIntoViewIfNeeded();
      const expanded = await contrast.first().getAttribute("aria-expanded");
      if (expanded === "false") await contrast.first().click();
      await contrast.first().evaluate((el) => el.scrollIntoView({ block: "start" }));
    }
    const vision = page.getByLabel("Color vision simulation");
    if (await vision.count()) await vision.selectOption({ index: 2 }).catch(() => {});
    await save(
      page,
      "chromiq-contrast-desktop",
      "CHROMIQ's inspector grading each colour pair against WCAG contrast, with a colour-vision simulation applied to the preview.",
    );
    if (await vision.count()) await vision.selectOption({ index: 0 }).catch(() => {});

    // Export: the export dialog with generated code.
    await page.getByRole("button", { name: /^Export/ }).first().click();
    await page.waitForTimeout(800);
    await save(page, "chromiq-export-desktop", "CHROMIQ's export dialog showing CSS custom properties generated from the live token system, with other formats one tab away.");
    await page.keyboard.press("Escape");

    // Restyle: a scripts-off copy of example.com, loaded through CHROMIQ's own proxy.
    await page.goto(`${CHROMIQ}/workspace?restyle=${encodeURIComponent("https://example.com/")}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    await save(
      page,
      "chromiq-restyle-desktop",
      "CHROMIQ's restyle view: a scripts-off copy of example.com loaded through CHROMIQ's proxy, with type, colour, accent and radius controls beside it.",
    );
  }
  await ctx.close();
}

async function lexi(browser, device) {
  const ctx = await context(browser, device);
  await ctx.grantPermissions(["clipboard-read", "clipboard-write"], { origin: LEXI });
  const page = await ctx.newPage();
  const suffix = device;

  await page.goto(`${LEXI}/inbox`, { waitUntil: "networkidle" });
  // First visit: LEXI asks how to greet you. Skipping keeps the default.
  const skip = page.getByRole("button", { name: "Skip for now" });
  if (await skip.count()) await skip.click();

  // 1. Capture real words through the quick-capture form, one per line.
  await page.fill("#capture-text", LEXI_WORDS.join("\n"));
  await page.getByRole("button", { name: new RegExp(`Add ${LEXI_WORDS.length} items`) }).click();
  await page.getByText(`${LEXI_WORDS.length} capture items`).waitFor();

  // 2. Select the batch and build LEXI's enrichment prompt.
  await page.getByLabel(new RegExp(`Select all ${LEXI_WORDS.length} words`)).check();
  await page.getByRole("button", { name: "Copy enrichment prompt" }).click();
  const prompt = await page.locator("#prompt-output").inputValue();

  // Bring the captured list into view for the Inbox screenshot.
  await page.getByText(`${LEXI_WORDS.length} capture items`).evaluate((el) => el.scrollIntoView({ block: "start" }));
  await save(
    page,
    `lexi-inbox-${suffix}`,
    "LEXI's Inbox with six captured Chinese words, 咖啡, 图书馆, 朋友, 天气, 学习 and 旅行, selected as a batch for enrichment.",
  );

  // The prompt lists each capture as "N. id: <id>" followed by "word: <text>".
  const ids = {};
  for (const m of prompt.matchAll(/id: (\S+)\s+word: (\S+)/g)) ids[m[2]] = m[1];
  const missing = LEXI_WORDS.filter((w) => !ids[w]);
  if (missing.length) throw new Error(`Prompt is missing ids for ${missing.join(", ")}`);
  const answer = {
    format: "lexi-enrichment",
    schemaVersion: 1,
    results: LEXI_WORDS.map((word) => ({ captureId: ids[word], ...LEXI_ENRICHMENT[word] })),
  };

  // 3. Paste the answer in Enrich, check it, and screenshot the preview before applying.
  await page.goto(`${LEXI}/enrich`, { waitUntil: "networkidle" });
  await page.fill("#enrichment-input", JSON.stringify(answer, null, 2));
  await page.getByRole("button", { name: "Check the response" }).click();
  const apply = page.getByRole("button", { name: "Apply to my vocabulary" });
  await apply.waitFor();
  await page.getByText("3. Review and apply").evaluate((el) => el.scrollIntoView({ block: "center" }));
  await save(
    page,
    `lexi-enrich-${suffix}`,
    "LEXI's Enrich screen after a pasted answer passed validation: a preview of the six concepts it will create, waiting for Apply.",
  );
  await apply.click();
  await page.getByText(/Applied/).first().waitFor();

  // 4. The vocabulary those steps produced.
  await page.goto(`${LEXI}/vocabulary`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await save(
    page,
    `lexi-vocabulary-${suffix}`,
    "LEXI's Vocabulary: each concept with its Chinese, Japanese and Korean entries, readings and meanings.",
  );
  await ctx.close();
}

async function main() {
  const only = process.argv[2];
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
  try {
    for (const device of ["desktop", "mobile"]) {
      if (!only || only === "chromiq") {
        console.log(`CHROMIQ, ${device}`);
        await chromiq(browser, device);
      }
      if (!only || only === "lexi") {
        console.log(`LEXI, ${device}`);
        await lexi(browser, device);
      }
    }
  } finally {
    await browser.close();
  }

  if (only) {
    console.log("Partial run: content/screens.generated.ts left unchanged.");
    return;
  }
  const entries = shots
    .map((s) => `  ${JSON.stringify(s.name)}: { src: "/screens/${s.name}.webp", width: ${s.width}, height: ${s.height}, alt: ${JSON.stringify(s.alt)} },`)
    .join("\n");
  const ts = `// Generated by scripts/screens.mjs (npm run screens). Do not edit.
export const SCREENS = {
${entries}
} as const;

export type ScreenName = keyof typeof SCREENS;
`;
  await writeFile(new URL("content/screens.generated.ts", root), ts);
  console.log(`content/screens.generated.ts: ${shots.length} screens`);
}

await main();

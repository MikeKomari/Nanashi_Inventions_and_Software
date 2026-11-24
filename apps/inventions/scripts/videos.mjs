// Real demo videos of the live products for their invention pages: no mockups, no seeded statistics.
//
//   npm run videos             # all products
//   npm run videos -- lexi     # one product
//
// Records the live apps with Playwright, then encodes MP4 (H.264) and a WebP poster with ffmpeg
// into public/videos/<product>.mp4 and <product>-poster.webp. Needs ffmpeg on PATH.
// Playwright: whichever copy the machine has (`playwright` or `playwright-core`); PW_CHROMIUM picks a binary.
//
// Lexi keeps its data in the visitor's browser, so the Lexi video shows the real first-run flow:
// words typed into Quick capture, the enrichment prompt copied, an answer pasted back, checked,
// applied, and the resulting vocabulary. Lexi's Dashboard (placeholder numbers) is never shown.
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { LEXI_ENRICHMENT, LEXI_WORDS } from "./lexi-seed.mjs";

const require = createRequire(import.meta.url);
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

const OUT = new URL("../public/videos/", import.meta.url).pathname;
const CHROMIQ = "https://prism-gamma-three.vercel.app";
const LEXI = "https://lexi-beta-nine.vercel.app";
const SIZE = { width: 1280, height: 800 };

/** Records `steps` in a fresh browser context and returns the raw .webm path plus when the page was ready. */
async function record(browser, name, steps, origin) {
  const dir = await mkdtemp(path.join(tmpdir(), `video-${name}-`));
  const ctx = await browser.newContext({
    viewport: SIZE,
    recordVideo: { dir, size: SIZE },
    colorScheme: "dark",
    locale: "en-US",
  });
  if (origin) await ctx.grantPermissions(["clipboard-read", "clipboard-write"], { origin });
  const page = await ctx.newPage();
  const t0 = Date.now();
  const ready = await steps(page); // ms after t0 when the first meaningful frame is on screen
  await ctx.close();
  const [file] = await readdir(dir);
  return { raw: path.join(dir, file), dir, trim: Math.max(0, (ready - t0) / 1000) };
}

function encode(name, { raw, trim }) {
  const mp4 = path.join(OUT, `${name}.mp4`);
  const poster = path.join(OUT, `${name}-poster.webp`);
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-ss", trim.toFixed(2), "-i", raw,
    "-c:v", "libx264", "-preset", "slow", "-crf", "28", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", mp4]);
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-ss", "0.3", "-i", mp4, "-frames:v", "1", "-q:v", "80", poster]);
  console.log(`  public/videos/${name}.mp4 and ${name}-poster.webp`);
}

const pause = (page, ms) => page.waitForTimeout(ms);

async function chromiq(page) {
  await page.goto(`${CHROMIQ}/workspace`, { waitUntil: "networkidle" });
  await pause(page, 1200);
  const ready = Date.now();
  await pause(page, 1500);
  // Walk through the starter systems while switching preview surfaces: the same tokens restyle
  // an editorial page, a SaaS page, a dashboard and a shop.
  const surface = page.locator("select").filter({ has: page.locator("option", { hasText: /Dashboard/i }) }).first();
  const surfaces = (await surface.count())
    ? await surface.locator("option").evaluateAll((os) => os.map((o) => o.textContent?.trim() ?? ""))
    : [];
  console.log("  preview surfaces:", surfaces.join(", ") || "(none found)");
  const plan = [
    [/Launch day/, /SaaS/i],
    [/Archive/, /Dashboard/i],
    [/Signal/, /Commerce|Shop/i],
    [/Editorial/, /Editorial/i],
  ];
  for (const [starter, surf] of plan) {
    const btn = page.getByRole("button", { name: starter }).first();
    if (await btn.count()) {
      await btn.hover();
      await pause(page, 300);
      await btn.click();
      await pause(page, 1100);
    }
    const label = surfaces.find((s) => surf.test(s));
    if (label) await surface.selectOption({ label }).catch(() => {});
    await pause(page, 1900);
  }
  // Leave with code: the export dialog.
  const exp = page.getByRole("button", { name: /^Export/ }).first();
  await exp.hover();
  await pause(page, 300);
  await exp.click();
  await pause(page, 3200);
  await page.keyboard.press("Escape");
  await pause(page, 600);
  return ready;
}

async function lexi(page) {
  await page.goto(`${LEXI}/inbox`, { waitUntil: "networkidle" });
  const skip = page.getByRole("button", { name: "Skip for now" });
  if (await skip.count()) await skip.click();
  await pause(page, 600);
  const ready = Date.now();
  await pause(page, 800);

  // 1. Capture: type the words like a person would, one per line.
  await page.click("#capture-text");
  await page.keyboard.type(LEXI_WORDS.join("\n"), { delay: 110 });
  await pause(page, 500);
  await page.getByRole("button", { name: new RegExp(`Add ${LEXI_WORDS.length} items`) }).click();
  await page.getByText(`${LEXI_WORDS.length} capture items`).waitFor();
  await page.getByText(`${LEXI_WORDS.length} capture items`).evaluate((el) => el.scrollIntoView({ behavior: "smooth", block: "start" }));
  await pause(page, 1500);

  // 2. Select the batch and copy Lexi's enrichment prompt.
  await page.getByLabel(new RegExp(`Select all ${LEXI_WORDS.length} words`)).check();
  await pause(page, 700);
  await page.getByRole("button", { name: "Copy enrichment prompt" }).click();
  const prompt = await page.locator("#prompt-output").inputValue();
  await page.locator("#prompt-output").evaluate((el) => el.scrollIntoView({ behavior: "smooth", block: "center" }));
  await pause(page, 1800);

  const ids = {};
  for (const m of prompt.matchAll(/id: (\S+)\s+word: (\S+)/g)) ids[m[2]] = m[1];
  const answer = {
    format: "lexi-enrichment",
    schemaVersion: 1,
    results: LEXI_WORDS.map((word) => ({ captureId: ids[word], ...LEXI_ENRICHMENT[word] })),
  };

  // 3. Paste the answer back, check it, apply.
  await page.goto(`${LEXI}/enrich`, { waitUntil: "networkidle" });
  await pause(page, 800);
  await page.fill("#enrichment-input", JSON.stringify(answer, null, 2));
  await pause(page, 800);
  await page.getByRole("button", { name: "Check the response" }).click();
  const apply = page.getByRole("button", { name: "Apply to my vocabulary" });
  await apply.waitFor();
  await page.getByText("3. Review and apply").evaluate((el) => el.scrollIntoView({ behavior: "smooth", block: "center" }));
  await pause(page, 2200);
  await apply.click();
  await page.getByText(/Applied/).first().waitFor();
  await pause(page, 900);

  // 4. The vocabulary those steps produced.
  await page.goto(`${LEXI}/vocabulary`, { waitUntil: "networkidle" });
  await pause(page, 3200);
  return ready;
}

async function main() {
  const only = process.argv[2];
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
  try {
    if (!only || only === "chromiq") {
      console.log("Chromiq");
      const r = await record(browser, "chromiq", chromiq);
      encode("chromiq", r);
      await rm(r.dir, { recursive: true, force: true });
    }
    if (!only || only === "lexi") {
      console.log("Lexi");
      const r = await record(browser, "lexi", lexi, LEXI);
      encode("lexi", r);
      await rm(r.dir, { recursive: true, force: true });
    }
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

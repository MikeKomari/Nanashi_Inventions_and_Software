// Screenshots of every live template demo, for the template cards on the home page.
//
//   npm run build && npm start          (or npm run dev), in one terminal
//   npm run screens                     in another
//
// The server must already be running. BASE_URL picks it (default http://localhost:3000), e.g.
//   BASE_URL=http://localhost:3300 npm run screens
// Saves each live registry entry's demo.screenshot (e.g. public/screens/kafe.webp), 1200 × 750 WebP.
// Uses playwright-core with the Chromium Playwright installed on this machine; set CHROMIUM_PATH to
// use another Chromium or Chrome binary.
import { existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { chromium } from "playwright-core";
import sharp from "sharp";
import { TEMPLATES } from "../templates/registry.ts";

const BASE_URL = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const BASE_PATH = "/software"; // must match next.config.ts
const root = new URL("../", import.meta.url);

/** Playwright's own browser if it is installed, else the machine's preinstalled Chromium. */
function executablePath() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const bundled = chromium.executablePath();
  if (existsSync(bundled)) return undefined;
  if (existsSync("/opt/pw-browsers/chromium")) return "/opt/pw-browsers/chromium";
  return undefined;
}

const shots = TEMPLATES.filter((t) => t.status === "live" && t.demo?.screenshot);
if (shots.length === 0) {
  console.log("No live templates with a demo screenshot in templates/registry.ts.");
  process.exit(0);
}

const browser = await chromium.launch({ executablePath: executablePath() });
try {
  // Desktop view at 16:10, the card's shape. Reduced motion, so scroll reveals never hide anything.
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  for (const t of shots) {
    const url = `${BASE_URL}${BASE_PATH}/template/${t.slug}`;
    const res = await page.goto(url, { waitUntil: "networkidle" });
    if (!res?.ok()) throw new Error(`${url} answered ${res?.status()}. Is the server running?`);
    await page.evaluate(() => document.fonts.ready);
    // The card shows the template itself, not the Nanashi demo bar.
    await page.evaluate(() => document.querySelector("[data-demo-bar]")?.remove());
    const png = await page.screenshot({ type: "png" });
    const out = new URL(`public${t.demo.screenshot}`, root);
    mkdirSync(dirname(out.pathname), { recursive: true });
    const info = await sharp(png).resize(1200, 750).webp({ quality: 80 }).toFile(out.pathname);
    console.log(`${url} → public${t.demo.screenshot} (${Math.round(info.size / 1024)} KB)`);
  }
} finally {
  await browser.close();
}

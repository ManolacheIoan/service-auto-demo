// Capturi full-page la 375 / 768 / 1280 / 1920. Folosire: node scripts/shots.mjs <url> <prefix>
import { chromium } from "playwright";
const [url, prefix = "shot"] = process.argv.slice(2);
const sizes = [[375, 812, 3], [768, 1024, 2], [1280, 800, 1], [1920, 1080, 1]];
const b = await chromium.launch();
for (const [w, h, dpr] of sizes) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr > 1 ? 1 : 1 });
  await p.goto(url, { waitUntil: "networkidle" });
  for (let y = 0; y < 20000; y += 600) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(60); }
  await p.evaluate(() => { document.querySelectorAll(".reveal").forEach((e) => e.classList.add("in", "instant")); scrollTo(0, 0); });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${prefix}-${w}.png`, fullPage: true });
  console.log("saved", `${prefix}-${w}.png`);
  await p.close();
}
await b.close();

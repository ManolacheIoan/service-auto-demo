// Prelucrează pozele sursă (Unsplash) cu aceeași corecție de culoare (tonuri reci) și le exportă WebP responsive.
// Folosire: node scripts/images.mjs <folder-surse>
import sharp from "sharp";
const src = process.argv[2];
const names = ["hero", "frane", "frane2", "motor", "curea", "anvelope", "roata", "unelte", "banc", "raft", "elevator"];
const widths = [480, 828, 1280, 1920];
const out = {};
for (const name of names) {
  let base = sharp(`${src}/${name}.jpg`).rotate();
  const meta = await base.metadata();
  let buf = await base.toBuffer();
  if (name === "hero") {
    // estompează capacul central al jantei (siglă mică de producător)
    const s = Math.round(meta.width * 0.034), left = Math.round(meta.width * 0.451 - s / 2), top = Math.round(meta.height * 0.713 - s / 2);
    const mask = Buffer.from(`<svg width="${s}" height="${s}"><defs><radialGradient id="g"><stop offset="55%" stop-color="#fff"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><circle cx="${s / 2}" cy="${s / 2}" r="${s / 2}" fill="url(#g)"/></svg>`);
    const patch = await sharp(buf).extract({ left, top, width: s, height: s }).blur(s / 5).ensureAlpha().composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
    buf = await sharp(buf).composite([{ input: patch, left, top }]).toBuffer();
  }
  const graded = await sharp(buf)
    .modulate({ saturation: 0.78, brightness: 0.96 })
    .composite([{ input: { create: { width: meta.width, height: meta.height, channels: 4, background: { r: 24, g: 38, b: 58, alpha: 0.22 } } }, blend: "soft-light" }])
    .toBuffer();
  for (const w of widths) {
    if (w > meta.width) continue;
    await sharp(graded).resize({ width: w }).webp({ quality: 72, effort: 6 }).toFile(`public/images/${name}-${w}.webp`);
  }
  out[name] = { w: meta.width, h: meta.height };
}
console.log(JSON.stringify(out));

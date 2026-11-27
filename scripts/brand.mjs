// Generează apple-icon.png (180×180) și public/og.jpg (1200×630) din logo + poza hero.
import sharp from "sharp";
import fs from "node:fs";
const icon = fs.readFileSync("app/icon.svg");
await sharp({ create: { width: 180, height: 180, channels: 4, background: "#0d0f12" } })
  .composite([{ input: await sharp(icon, { density: 600 }).resize(132, 132).png().toBuffer(), gravity: "center" }])
  .png().toFile("app/apple-icon.png");
const text = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0d0f12" stop-opacity=".97"/><stop offset=".55" stop-color="#0d0f12" stop-opacity=".8"/><stop offset="1" stop-color="#0d0f12" stop-opacity=".15"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="44" fill="#ff5b1f"/>
  <text x="60" y="30" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="#0d0f12">SITE DEMONSTRATIV REALIZAT DE MANOTEK — FIRMĂ FICTIVĂ</text>
  <text x="60" y="300" font-family="Arial Narrow, Arial, sans-serif" font-size="92" font-weight="700" fill="#ffffff">SERVICE AUTO</text>
  <text x="60" y="395" font-family="Arial Narrow, Arial, sans-serif" font-size="92" font-weight="700" fill="#ffffff">ÎN TECUCI</text>
  <text x="60" y="460" font-family="Arial, Helvetica, sans-serif" font-size="32" fill="#9aa4b1">Diagnoză corectă, <tspan fill="#ff5b1f">reparații la timp</tspan></text>
  <text x="60" y="560" font-family="Arial Narrow, Arial, sans-serif" font-size="40" font-weight="700" fill="#ffffff">MOTOR<tspan fill="#ff5b1f">PRO</tspan></text>
</svg>`;
await sharp("public/images/hero-1280.webp").resize(1200, 630, { fit: "cover", position: "right" })
  .composite([{ input: Buffer.from(text) }]).jpeg({ quality: 82 }).toFile("public/og.jpg");
console.log("ok");

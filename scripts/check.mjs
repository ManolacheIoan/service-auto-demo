// Verificare cap-coadă în browser, la 4 lățimi. Folosire: node scripts/check.mjs <url-de-bază-cu-/-la-final>
import { chromium, devices } from "playwright";
const U = process.argv[2] ?? "http://localhost:4377/";
const b = await chromium.launch();
let fails = 0;
const check = (c, m) => { if (!c) fails++; console.log(`${c ? "OK  " : "FAIL"} ${m}`); };

const sizes = [
  ["mobil 375", { ...devices["iPhone 13"], viewport: { width: 375, height: 812 } }],
  ["tabletă 768", { viewport: { width: 768, height: 1024 } }],
  ["desktop 1280", { viewport: { width: 1280, height: 800 } }],
  ["desktop 1920", { viewport: { width: 1920, height: 1080 } }],
];
for (const [name, opts] of sizes) {
  const ctx = await b.newContext(opts);
  const p = await ctx.newPage();
  const errs = []; p.on("pageerror", (e) => errs.push(e.message)); p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  const bad = []; p.on("response", (r) => r.status() >= 400 && !r.url().includes("nu-exista") && bad.push(r.status() + " " + r.url()));
  await p.goto(U, { waitUntil: "networkidle" });
  console.log(`\n== ${name}`);
  const mobile = opts.viewport.width < 1024;

  const sw = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  check(sw <= 0, `fără scroll orizontal (${sw}px)`);
  check(await p.isVisible("text=Site demonstrativ realizat de Manotek — firmă fictivă"), "banda demo vizibilă");
  const hdrH = await p.evaluate(() => document.querySelector("header .bar").getBoundingClientRect().height);
  check(hdrH < 90, `header pe un singur rând (${Math.round(hdrH)}px)`);

  const hrefs = await p.$$eval('a[href*="#"]', (as) => [...new Set(as.filter((a) => new URL(a.href).pathname === location.pathname).map((a) => new URL(a.href).hash))].filter((h) => h.length > 1));
  const missing = await p.evaluate((hs) => hs.filter((h) => !document.getElementById(h.slice(1))), hrefs);
  check(missing.length === 0, `toate ancorele au țintă${missing.length ? " LIPSĂ: " + missing : ""}`);

  for (const id of ["servicii", "de-ce-noi", "cum-lucram", "revizie", "galerie", "intrebari", "contact"]) {
    if (mobile) { await p.click('summary[aria-controls="meniu-mobil"]'); await p.click(`#meniu-mobil a[href$="#${id}"]`); }
    else await p.click(`nav[aria-label="Principal"] a[href$="#${id}"]`);
    await p.waitForTimeout(2200);
    const r = await p.evaluate((i) => {
      const top = document.getElementById(i).getBoundingClientRect().top; const hb = document.querySelector("header").getBoundingClientRect().bottom;
      return { top: Math.round(top), hb: Math.round(hb) };
    }, id);
    const closed = mobile ? !(await p.locator("#meniu-mobil").isVisible()) : true;
    check(r.top >= r.hb - 30 && r.top < r.hb + 60 && closed, `#${id}: sub header (${r.top} vs ${r.hb})${mobile ? ", meniu închis" : ""}`);
  }
  const h = await p.evaluate(() => document.querySelector("header .bar").getBoundingClientRect().height);
  check(h < hdrH - 8, `header micșorat la scroll (${Math.round(hdrH)} → ${Math.round(h)}px)`);
  if (mobile) check(await p.isVisible("text=Sună >> visible=true") && (await p.locator('div.fixed a:has-text("Programează-te")').isVisible()), "bara fixă jos: Sună + Programează-te");

  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); } });
  await p.waitForTimeout(1500);
  const imgs = await p.$$eval("img", (xs) => xs.filter((x) => x.offsetParent !== null).map((x) => ({ s: x.currentSrc, ok: x.complete && x.naturalWidth > 0, alt: x.alt })));
  const broken = imgs.filter((i) => !i.ok || !i.alt);
  check(broken.length === 0, `toate cele ${imgs.length} poze vizibile se încarcă și au alt ${broken.map((x) => x.s).join(" ")}`);
  check(await p.$$eval(".reveal", (xs) => xs.every((x) => getComputedStyle(x).transform === "none" || x.classList.contains("in"))), "toate elementele .reveal au apărut");

  // Formular în pași
  await p.goto(U + "#programare", { waitUntil: "networkidle" }); await p.waitForTimeout(400);
  const form = p.locator("#programare form");
  await form.locator('button[type=submit]').click(); await p.waitForTimeout(250);
  check((await form.locator(".field-err").count()) === 2 && (await p.evaluate(() => document.activeElement?.getAttribute("name"))) === "marca", "pasul 1 gol: 2 erori, focus pe Marcă");
  await form.locator('[name=marca]').fill("Dacia"); await form.locator('[name=model]').fill("Logan"); await form.locator('[name=an]').fill("2016"); await form.locator('[name=km]').fill("145000");
  await form.locator('button[type=submit]').click(); await p.waitForTimeout(400);
  check(await form.locator("h3", { hasText: "Cu ce te putem ajuta" }).isVisible(), "pasul 2 afișat");
  await form.locator('label.choice', { hasText: "Sistem de frânare" }).click();
  await form.locator('[name=descriere]').fill("Scârțâie la frânare dimineața");
  await form.locator('button[type=submit]').click(); await p.waitForTimeout(200);
  // dată: următoarea zi de luni
  const luni = await p.evaluate(() => { const d = new Date(); d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7)); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; });
  const dum = await p.evaluate(() => { const d = new Date(); d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7)); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; });
  await form.locator('[name=data]').fill(dum); await form.locator('button[type=submit]').click(); await p.waitForTimeout(150);
  check(await form.locator(".field-err", { hasText: "Duminica" }).isVisible(), "duminica e respinsă");
  await form.locator('[name=data]').fill(luni);
  const nOre = await form.locator('[name=ora] option').count();
  await form.locator('[name=ora]').selectOption("10:00");
  await form.locator('button[type=submit]').click(); await p.waitForTimeout(200);
  check(nOre === 20, `luni: ${nOre - 1} intervale orare 8:00–17:00`);
  await form.locator('[name=nume]').fill("Ion Test"); await form.locator('[name=telefon]').fill("0722 123 456");
  await form.locator('button[type=submit]').click(); await p.waitForTimeout(150);
  check(await form.locator(".field-err", { hasText: "acordul" }).isVisible(), "fără acord: eroare");
  await form.locator('[name=acord]').check(); await form.locator('button[type=submit]').click(); await p.waitForTimeout(200);
  const rez = await form.locator("dl").innerText();
  check(/Dacia Logan/.test(rez) && /frânare/.test(rez) && /ora 10:00/.test(rez) && /Ion Test/.test(rez), "rezumat complet");
  const wa = decodeURIComponent(await form.locator('a:has-text("WhatsApp")').getAttribute("href"));
  check(wa.startsWith("https://wa.me/?text=") && wa.includes("Dacia Logan") && wa.includes("Scârțâie"), "link WhatsApp precompletat");
  await form.locator('button:has-text("Trimite programarea")').click(); await p.waitForTimeout(200);
  check(await form.locator(".note-demo").isVisible(), "Formspree placeholder: mesaj demo");
  await form.locator('button[aria-label="Modifică: Mașina"]').click(); await p.waitForTimeout(150);
  check((await form.locator('[name=marca]').inputValue()) === "Dacia", "Modifică păstrează datele");

  // Preselectare din cardul de sezon
  await p.goto(U, { waitUntil: "networkidle" });
  await p.click('#sezon a:has-text("Programează schimbul")'); await p.waitForTimeout(900);
  await form.locator('[name=marca]').fill("VW"); await form.locator('[name=model]').fill("Golf"); await form.locator('button[type=submit]').click(); await p.waitForTimeout(200);
  check(await form.locator('input[value="vulcanizare"]').isChecked(), "card sezon preselectează vulcanizarea");

  // Calculator
  await p.fill('#revizie input >> nth=0', "152000"); await p.fill('#revizie input >> nth=1', "140000");
  const calc = await p.locator('#revizie [aria-live]').innerText();
  check(/3\.000 km/.test(calc) && /155\.000/.test(calc), `calculator: ${calc.split("\n")[0]}`);
  await p.fill('#revizie input >> nth=2', "10000");
  check(/depășită/.test(await p.locator('#revizie [aria-live]').innerText()), "calculator: revizie depășită cu interval 10.000");

  // Galerie
  await p.click('#galerie button:has-text("Mărește") >> nth=0'); await p.waitForTimeout(300);
  const open1 = await p.evaluate(() => document.querySelector("dialog")?.open);
  await p.keyboard.press("ArrowRight"); await p.waitForTimeout(200);
  const lbl = await p.textContent("dialog figcaption");
  await p.keyboard.press("Escape"); await p.waitForTimeout(200);
  const back = await p.evaluate(() => document.activeElement?.textContent);
  check(open1 && /2 \/ 8/.test(lbl) && /Mărește/.test(back ?? ""), "lightbox: deschide, săgeată, Esc, focus înapoi");

  // FAQ
  await p.click('#intrebari summary >> nth=0');
  check(await p.locator('#intrebari details >> nth=0').evaluate((d) => d.open), "FAQ: acordeonul se deschide");

  const tels = await p.$$eval('a[href^="tel:"]', (as) => [...new Set(as.map((a) => a.getAttribute("href")))]);
  check(tels.length === 1, `linkuri tel: unitare (${tels})`);
  check(await p.$$eval("a[target=_blank]", (as) => as.every((a) => /noopener/.test(a.rel))), "linkuri externe cu rel=noopener");

  for (const [path, t] of [["servicii/", "Servicii"], ["confidentialitate/", "confidențialitate"], ["cookies/", "cookies"]]) {
    const r = await p.goto(U + path, { waitUntil: "networkidle" });
    const title = await p.title();
    check(r.status() === 200 && title.includes(t) && (await p.isVisible("text=Site demonstrativ realizat de Manotek")), `/${path}: 200, „${title}”, bandă demo`);
  }
  await p.goto(U + "servicii/", { waitUntil: "networkidle" });
  await p.click('#frane a:has-text("Programează")'); await p.waitForURL(/#programare/); await p.waitForTimeout(1200);
  await form.locator('[name=marca]').fill("Opel"); await form.locator('[name=model]').fill("Astra"); await form.locator('button[type=submit]').click(); await p.waitForTimeout(200);
  check(await form.locator('input[value="frane"]').isChecked(), "din /servicii/: preselectează serviciul");

  const r404 = await p.goto(U + "nu-exista/");
  check(r404.status() === 404 && (await p.title()).includes("Pagina nu există"), "404 personalizat");
  check(errs.filter((e) => !/404/.test(e)).length === 0, `fără erori în consolă ${errs.filter((e) => !/404/.test(e)).join(" | ")}`);
  check(bad.length === 0, `fără resurse lipsă ${bad.join(" | ")}`);
  await ctx.close();
}
for (const f of ["sitemap.xml", "robots.txt", "og.jpg", "icon.svg", "apple-icon.png"]) {
  const r = await fetch(U + f); check(r.ok, `/${f} ${r.status}`);
}
console.log(`\n${fails ? fails + " PROBLEME" : "TOTUL OK"}`);
await b.close();
process.exit(fails ? 1 : 0);

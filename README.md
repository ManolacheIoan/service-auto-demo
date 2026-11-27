# MotorPro Service Auto — site demonstrativ

Site demo realizat de **Manotek** pentru un service auto **fictiv** din Tecuci. Toate datele (nume, adresă, telefon, prețuri, program) sunt exemple, marcate pe site cu etichete „exemplu” / „de confirmat cu firma”.

- Next.js 16 (App Router, export static) + TypeScript + Tailwind CSS 4, iconițe lucide-react
- Tot conținutul: `content/site.ts`; imagini: `content/images.ts` + `CREDITS.md`
- Programare online în 5 pași → Formspree (`NEXT_PUBLIC_FORMSPREE_ENDPOINT`) sau WhatsApp precompletat
- Publicare: GitHub Pages prin `.github/workflows/pages.yml` (`BASE_PATH=/service-auto-demo`)

```bash
npm ci && npm run dev               # dezvoltare
npm run lint && npm run typecheck && npm run build
node scripts/serve.mjs 4378         # servește out/ local
node scripts/check.mjs http://localhost:4378/   # test cap-coadă, 4 lățimi
```

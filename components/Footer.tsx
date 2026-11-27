import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { nav, servicii, site } from "@/content/site";
import { BASE } from "@/lib";
import { Logo } from "./Logo";
import { T } from "./T";

export function Footer() {
  const y = 2026;
  return (
    <footer className="blueprint border-t border-otel bg-carbon pb-24 text-white/80 lg:pb-0">
      <div className="metal-line" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-metal">Diagnoză corectă, deviz aprobat de tine și mașina gata la ora promisă. Pentru șoferii din {site.zona}.</p>
          <p className="mt-5 inline-block rounded border border-semnal/40 px-3 py-1.5 text-xs font-semibold text-semnal">{site.bandaDemo}</p>
        </div>
        <nav aria-label="Servicii (subsol)">
          <h2 className="footer-h">Servicii</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            {servicii.slice(0, 7).map((s) => <li key={s.id}><a href={`${BASE}/servicii/#${s.id}`} className="hover:text-white">{s.titlu}</a></li>)}
            <li><a href={`${BASE}/servicii/`} className="font-semibold text-semnal hover:underline">Toate serviciile</a></li>
          </ul>
        </nav>
        <nav aria-label="Pagini (subsol)">
          <h2 className="footer-h">Pagini</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            {nav.map((n) => <li key={n.href}><a href={BASE + n.href} className="hover:text-white">{n.label}</a></li>)}
            <li><a href={`${BASE}/#programare`} className="hover:text-white">Programare online</a></li>
          </ul>
        </nav>
        <div>
          <h2 className="footer-h">Contact</h2>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li className="flex gap-3"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-semnal" strokeWidth={1.8} />{site.adresa.strada}, {site.adresa.localitate}, jud. {site.adresa.judet}</li>
            <li className="flex gap-3"><Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-semnal" strokeWidth={1.8} /><a href={`tel:${site.telefon.tel}`} className="hover:text-white">{site.telefon.afisat}</a></li>
            <li className="flex gap-3"><Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-semnal" strokeWidth={1.8} /><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li className="flex gap-3"><Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-semnal" strokeWidth={1.8} /><span>L–V 8–18 · S 8–14 · D închis <span className="tbd">exemplu</span></span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-otel">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-metal sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>© {y} {site.nume} <T>{"[firmă fictivă]"}</T> · Toate datele de pe site sunt exemple.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><a href={`${BASE}/confidentialitate/`} className="hover:text-white">Confidențialitate</a></li>
            <li><a href={`${BASE}/cookies/`} className="hover:text-white">Cookies</a></li>
            <li><a href={`https://anpc.ro/`} target="_blank" rel="noopener noreferrer" className="hover:text-white">ANPC</a></li>
            <li>Design &amp; dezvoltare: <span className="font-semibold text-white">Manotek</span></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

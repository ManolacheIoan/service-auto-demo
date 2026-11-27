"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CalendarCheck, Info, Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { BASE } from "@/lib";
import { Logo } from "./Logo";
import { BookLink } from "./BookLink";

const href = (h: string) => BASE + h;

export function DemoBand() {
  return (
    <div className="relative z-50 border-b border-semnal/30 bg-semnal px-4 py-1.5 text-center text-[12px] font-semibold tracking-wide text-carbon">
      <Info aria-hidden="true" className="mr-1.5 inline h-3.5 w-3.5 -translate-y-px" strokeWidth={2.2} />
      {site.bandaDemo}
    </div>
  );
}

function MobileMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const close = () => ref.current?.removeAttribute("open");
  useEffect(close, [pathname]);
  useEffect(() => {
    const onDown = (e: PointerEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) close(); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && ref.current?.open) { close(); ref.current.querySelector("summary")?.focus(); } };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, []);
  return (
    <details ref={ref} className="group relative lg:hidden">
      <summary aria-controls="meniu-mobil" className="inline-flex h-11 cursor-pointer list-none items-center gap-2 rounded-md border border-otel px-4 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
        <Menu aria-hidden="true" className="h-4 w-4 group-open:hidden" strokeWidth={2} />
        <X aria-hidden="true" className="hidden h-4 w-4 group-open:block" strokeWidth={2} />
        Meniu
      </summary>
      <nav id="meniu-mobil" aria-label="Navigare mobil" className="absolute right-0 mt-2 w-64 rounded-lg border border-otel bg-grafit p-2 shadow-2xl">
        <ul>
          {nav.map((n) => (
            <li key={n.href}><a href={href(n.href)} onClick={close} className="block rounded-md px-4 py-3 font-medium text-white/90 hover:bg-otel hover:text-white">{n.label}</a></li>
          ))}
          <li className="mt-1 border-t border-otel pt-2"><a href={href("/servicii/")} onClick={close} className="block rounded-md px-4 py-3 font-medium text-semnal hover:bg-otel">Toate serviciile, detaliat</a></li>
        </ul>
      </nav>
    </details>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setScrolled(window.scrollY > 40)); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);
  return (
    <header data-scrolled={scrolled} className="site-header sticky top-0 z-40 border-b border-white/[.06] bg-carbon/95">
      <a href="#continut" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-semnal focus:px-3 focus:py-2 focus:font-semibold focus:text-carbon">Sari la conținut</a>
      <div className="bar mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Logo />
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-5 text-[14px] font-medium whitespace-nowrap text-white/80 xl:gap-7">
            {nav.map((n) => (
              <li key={n.href}><a href={href(n.href)} className="nav-link relative py-2 transition-colors hover:text-white">{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-5 whitespace-nowrap lg:flex">
          <a href={`tel:${site.telefon.tel}`} className="hidden items-center gap-2 text-sm font-semibold text-white hover:text-semnal 2xl:inline-flex">
            <Phone aria-hidden="true" className="h-4 w-4 text-semnal" strokeWidth={2} />{site.telefon.afisat}
          </a>
          <BookLink className="btn btn-primary !py-2.5 text-sm"><CalendarCheck aria-hidden="true" className="h-4 w-4" strokeWidth={2} />Programează-te</BookLink>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}

/** Bara fixă de jos, doar pe mobil / tabletă. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-white/10 bg-carbon/95 p-2 pb-[max(.5rem,env(safe-area-inset-bottom))] lg:hidden">
      <a href={`tel:${site.telefon.tel}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/25 font-display text-lg font-semibold tracking-wide text-white uppercase">
        <Phone aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={2} />Sună
      </a>
      <BookLink className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-semnal font-display text-lg font-semibold tracking-wide text-carbon uppercase">
        <CalendarCheck aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={2} />Programează-te
      </BookLink>
    </div>
  );
}

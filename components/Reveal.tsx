"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveal la scroll (doar transform, ca să nu întârzie LCP) — dezactivat de prefers-reduced-motion (globals.css).
 * Plasă de siguranță: după 2,5 s tot ce e .reveal devine vizibil.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = [...document.querySelectorAll(".reveal:not(.in)")];
    const showAll = () => els.forEach((e) => e.classList.add("in"));
    if (!("IntersectionObserver" in window)) return showAll();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((e) => io.observe(e));
    const t = window.setTimeout(showAll, 2500);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, [pathname]);

  // Efect de lumină pe carduri: poziția cursorului ca variabile CSS (un singur listener, delegat).
  useEffect(() => {
    if (!matchMedia("(hover: hover)").matches) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.(".glow") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}

"use client";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { site } from "@/content/site";

/** Harta Google se încarcă doar la cerere (mai rapid, fără cookie-uri terțe până la click). */
export function MapEmbed() {
  const [on, setOn] = useState(false);
  return (
    <div className="blueprint relative aspect-[4/3] overflow-hidden rounded-xl border border-otel bg-carbon lg:aspect-auto lg:h-full lg:min-h-[26rem]">
      {on ? (
        <iframe title="Hartă Google: Tecuci, județul Galați" src={site.harta.embed} className="absolute inset-0 h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <>
        <svg aria-hidden="true" viewBox="0 0 600 450" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none">
          <path d="M-20 300C120 280 200 200 330 210s200 70 300 40" stroke="#262b33" strokeWidth="18" />
          <path d="M-20 300C120 280 200 200 330 210s200 70 300 40" stroke="#3a414c" strokeWidth="1" strokeDasharray="10 12" />
          <path d="M180 -20c20 120 0 220 40 300s30 140 10 200" stroke="#262b33" strokeWidth="12" />
          <path d="M420 -20c-30 100 10 180-20 260s-60 120-40 230" stroke="#1f242b" strokeWidth="9" />
          <path d="M-20 110h640M-20 390c200-20 400 10 640-30" stroke="#1c2027" strokeWidth="6" />
          <circle cx="300" cy="215" r="70" stroke="#ff5b1f" strokeOpacity=".25" strokeDasharray="3 7" />
        </svg>
        <button type="button" onClick={() => setOn(true)} className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-white transition hover:bg-white/[.03]">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-semnal/60 text-semnal"><MapPin aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} /></span>
          <span className="font-display text-xl font-semibold tracking-wide uppercase">Afișează harta Google</span>
          <span className="text-sm text-metal">Punct generic: centrul orașului Tecuci (adresa firmei e fictivă)</span>
        </button>
        </>
      )}
    </div>
  );
}

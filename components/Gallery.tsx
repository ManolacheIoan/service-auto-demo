"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { stock, type StockKey } from "@/content/images";
import { Photo, src } from "./Photo";

/** Galerie cu lightbox (<dialog>): click / Enter deschide, săgeți navighează, Esc sau click pe fundal închide. */
export function Gallery({ items }: { items: { k: StockKey; span?: string }[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [i, setI] = useState(0);
  const n = items.length;
  const go = (dx: number) => setI((x) => (x + dx + n) % n);
  const open = (x: number, el: HTMLButtonElement) => { opener.current = el; setI(x); ref.current?.showModal(); };

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (!dlg.open) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const onClose = () => opener.current?.focus();
    window.addEventListener("keydown", onKey);
    dlg.addEventListener("close", onClose);
    return () => { window.removeEventListener("keydown", onKey); dlg.removeEventListener("close", onClose); };
  });

  const cur = items[i].k;
  return (
    <>
      <ul className="grid grid-flow-dense auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] md:grid-cols-4">
        {items.map((it, x) => (
          <li key={it.k} className={it.span ?? ""}>
            <button type="button" onClick={(e) => open(x, e.currentTarget)} className="reveal zoom group relative block h-full w-full overflow-hidden rounded-lg text-left">
              <Photo name={it.k} sizes="(min-width: 768px) 25vw, 50vw" className="h-full w-full" />
              <span aria-hidden="true" className="absolute inset-0 bg-carbon/0 transition group-hover:bg-carbon/30" />
              <span aria-hidden="true" className="absolute right-3 bottom-3 grid h-9 w-9 place-items-center rounded-md bg-semnal text-carbon opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="sr-only">Mărește: {stock[it.k].alt}</span>
            </button>
          </li>
        ))}
      </ul>
      <dialog ref={ref} aria-label="Galerie foto" onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
        className="m-auto max-h-[92vh] w-[min(94vw,76rem)] overflow-visible bg-transparent p-0">
        <figure className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src(cur, 1920)} alt={stock[cur].alt} decoding="async" className="max-h-[80vh] w-full rounded-lg object-contain" />
          <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm text-white/85">
            <span>{stock[cur].alt} · <span className="tbd">foto stock, exemplu</span></span>
            <span aria-live="polite" className="shrink-0">{i + 1} / {n}</span>
          </figcaption>
        </figure>
        <button type="button" onClick={() => ref.current?.close()} aria-label="Închide galeria" className="absolute -top-2 right-0 grid h-11 w-11 -translate-y-full place-items-center rounded-md bg-white text-carbon shadow-lg">
          <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => go(-1)} aria-label="Fotografia anterioară" className="absolute top-[40%] left-2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-md bg-white/90 text-carbon shadow-lg">
          <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Fotografia următoare" className="absolute top-[40%] right-2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-md bg-white/90 text-carbon shadow-lg">
          <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
      </dialog>
    </>
  );
}

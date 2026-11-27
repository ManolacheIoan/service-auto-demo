"use client";
import { useId, useState } from "react";
import { Gauge, TriangleAlert } from "lucide-react";
import { revizie } from "@/content/site";
import { T } from "./T";
import { BookLink } from "./BookLink";

const num = (v: string) => { const n = Number(v.replace(/[\s.]/g, "")); return v.trim() && Number.isFinite(n) && n >= 0 ? n : null; };
const fmt = (n: number) => n.toLocaleString("ro-RO");

/** Calculator orientativ: km actuali + km la ultima revizie + interval (editabil) → când urmează revizia. */
export function Calculator() {
  const id = useId();
  const [acum, setAcum] = useState("");
  const [ultima, setUltima] = useState("");
  const [interval, setIv] = useState(String(revizie.intervalImplicit));
  const a = num(acum), u = num(ultima), i = num(interval);
  const invalid = a !== null && u !== null && u > a;
  const ok = a !== null && u !== null && i !== null && i >= 1000 && !invalid;
  const urm = ok ? u! + i! : 0;
  const ramas = ok ? urm - a! : 0;
  const pct = ok ? Math.min(100, Math.max(0, ((a! - u!) / i!) * 100)) : 0;
  const stare = !ok ? null : ramas <= 0 ? "depasit" : ramas <= 1500 ? "aproape" : "ok";

  return (
    <div className="glow rounded-xl border border-ceata-2 bg-white p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-md bg-carbon text-semnal"><Gauge aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} /></span>
        <h3 className="font-display text-2xl font-semibold uppercase">Când urmează revizia?</h3>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div><label htmlFor={`${id}-a`} className="label">Km actuali</label><input id={`${id}-a`} value={acum} onChange={(e) => setAcum(e.target.value)} inputMode="numeric" className="input" placeholder="de ex. 152 000" /></div>
        <div><label htmlFor={`${id}-u`} className="label">Km la ultima revizie</label><input id={`${id}-u`} value={ultima} onChange={(e) => setUltima(e.target.value)} inputMode="numeric" className="input" placeholder="de ex. 140 000" aria-invalid={invalid || undefined} aria-describedby={invalid ? `${id}-err` : undefined} /></div>
        <div><label htmlFor={`${id}-i`} className="label">Interval (km)</label><input id={`${id}-i`} value={interval} onChange={(e) => setIv(e.target.value)} inputMode="numeric" className="input" aria-describedby={`${id}-n`} /></div>
      </div>
      <p id={`${id}-n`} className="mt-2 text-sm text-muted"><T>{revizie.intervalNota}</T></p>
      {invalid && <p id={`${id}-err`} className="field-err">Km de la ultima revizie nu pot fi mai mulți decât cei actuali.</p>}

      <div aria-live="polite" className="mt-6 rounded-lg bg-ceata p-5">
        {ok ? (
          <>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-display text-4xl font-bold sm:text-5xl">{ramas > 0 ? `${fmt(ramas)} km` : "Revizia e depășită"}</p>
              <p className="text-[15px] text-muted">următoarea revizie la <strong className="text-ink">{fmt(urm)} km</strong></p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-ceata-2" role="presentation">
              <div className={`h-full rounded-full ${stare === "ok" ? "bg-ink" : "bg-semnal"}`} style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-3 text-[15px]">
              {stare === "depasit" && <>Ai trecut de interval cu <strong>{fmt(-ramas)} km</strong>. Merită programată revizia cât mai curând.</>}
              {stare === "aproape" && <>Mai ai puțin până la revizie. E un moment bun să te programezi.</>}
              {stare === "ok" && <>Ai parcurs {Math.round(pct)}% din interval. Te așteptăm când se apropie.</>}
            </p>
          </>
        ) : (
          <p className="text-[15px] text-muted">Completează kilometrii de mai sus și îți spunem câți mai ai până la revizie.</p>
        )}
      </div>
      <p className="mt-4 flex items-start gap-2 text-sm font-medium"><TriangleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-semnal-text" strokeWidth={2} />{revizie.atentionare} Calculul este orientativ.</p>
      {(stare === "depasit" || stare === "aproape") && <BookLink serviciu="revizie" className="btn btn-primary mt-5">Programează revizia</BookLink>}
    </div>
  );
}

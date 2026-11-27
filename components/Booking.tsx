"use client";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Car, Check, CalendarClock, MessageCircle, Pencil, Send, UserRound, Wrench } from "lucide-react";
import { servicii, site } from "@/content/site";
import { PRESELECT_KEY } from "./BookLink";

type Data = {
  marca: string; model: string; an: string; km: string;
  serviciu: string; descriere: string;
  data: string; ora: string; flexibil: boolean;
  nume: string; telefon: string; acord: boolean;
};
const EMPTY: Data = { marca: "", model: "", an: "", km: "", serviciu: "", descriere: "", data: "", ora: "", flexibil: false, nume: "", telefon: "", acord: false };

const OPTIUNI = [
  ...servicii.map((s) => ({ id: s.id, label: s.titlu })),
  { id: "nu-stiu", label: "Nu știu ce are — vreau o verificare" },
];
const PASI = [
  { titlu: "Mașina", icon: Car },
  { titlu: "Problema", icon: Wrench },
  { titlu: "Data și ora", icon: CalendarClock },
  { titlu: "Contact", icon: UserRound },
  { titlu: "Rezumat", icon: Check },
];

const pad = (n: number) => String(n).padStart(2, "0");
const isoLocal = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseDay = (v: string) => { const [y, m, d] = v.split("-").map(Number); return new Date(y, m - 1, d); };
const ZILE = ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"];
const fmtData = (v: string) => { if (!v) return ""; const d = parseDay(v); return `${ZILE[d.getDay()]}, ${d.toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}`; };

/** Intervale orare după programul din content/site.ts; ultima programare cu o oră înainte de închidere. */
function sloturi(v: string): string[] {
  if (!v) return [];
  const zi = parseDay(v).getDay();
  const p = zi === 0 ? site.program[2] : zi === 6 ? site.program[1] : site.program[0];
  const out: string[] = [];
  for (let h = p.deschidere; h < p.inchidere - 1 + 0.01; h += 0.5) out.push(`${Math.floor(h)}:${h % 1 ? "30" : "00"}`);
  return out;
}

const serviciuLabel = (id: string) => OPTIUNI.find((o) => o.id === id)?.label ?? "";
const formspreeReady = /^https:\/\/formspree\.io\/f\/(?!X+$)[A-Za-z0-9]+$/.test(site.formspree);

function mesaj(d: Data) {
  return [
    `Bună ziua! Aș dori o programare la ${site.nume}.`,
    `Mașina: ${d.marca} ${d.model}${d.an ? `, ${d.an}` : ""}${d.km ? `, ${d.km} km` : ""}`,
    `Serviciu: ${serviciuLabel(d.serviciu)}`,
    d.descriere && `Ce se întâmplă: ${d.descriere}`,
    `Preferință: ${fmtData(d.data)}, ora ${d.ora}${d.flexibil ? " (sunt flexibil)" : ""}`,
    `Nume: ${d.nume}`,
    `Telefon: ${d.telefon}`,
  ].filter(Boolean).join("\n");
}

export function Booking() {
  const uid = useId();
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(EMPTY);
  const [err, setErr] = useState<Partial<Record<keyof Data, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "fail" | "demo">("idle");
  const [minDate, setMinDate] = useState("");
  const headRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const firstRender = useRef(true);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => { setD((x) => ({ ...x, [k]: v })); setErr((e) => ({ ...e, [k]: undefined })); };

  useEffect(() => {
    // dată minimă = mâine (calculată în browser, nu la build)
    const t = new Date(); t.setDate(t.getDate() + 1);
    const ld = isoLocal(t);
    const pick = (id: string | null) => { if (id && OPTIUNI.some((o) => o.id === id)) { setD((x) => ({ ...x, serviciu: id })); setErr((e) => ({ ...e, serviciu: undefined })); } };
    // eslint-disable-next-line react-hooks/set-state-in-effect -- valoare care depinde de data curentă din browser
    setMinDate(ld);
    try { pick(sessionStorage.getItem(PRESELECT_KEY)); sessionStorage.removeItem(PRESELECT_KEY); } catch {}
    const onPick = (e: Event) => pick((e as CustomEvent<string>).detail);
    window.addEventListener(PRESELECT_KEY, onPick);
    return () => window.removeEventListener(PRESELECT_KEY, onPick);
  }, []);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    headRef.current?.focus({ preventScroll: true });
    const top = formRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 60) formRef.current?.scrollIntoView({ block: "start" });
  }, [step]);

  function validate(s: number) {
    const e: typeof err = {};
    if (s === 0) {
      if (!d.marca.trim()) e.marca = "Scrie marca mașinii.";
      if (!d.model.trim()) e.model = "Scrie modelul.";
      if (d.an && !/^(19[5-9]\d|20[0-3]\d)$/.test(d.an.trim())) e.an = "Anul are 4 cifre, de exemplu 2016.";
      if (d.km && !/^[\d .]{1,9}$/.test(d.km.trim())) e.km = "Scrie doar cifre, de exemplu 145000.";
    }
    if (s === 1) {
      if (!d.serviciu) e.serviciu = "Alege un serviciu sau „Nu știu ce are”.";
      if (d.serviciu === "nu-stiu" && d.descriere.trim().length < 5) e.descriere = "Descrie pe scurt ce simți sau ce auzi.";
    }
    if (s === 2) {
      if (!d.data) e.data = "Alege o dată.";
      else if (parseDay(d.data).getDay() === 0) e.data = "Duminica suntem închiși. Alege altă zi.";
      else if (minDate && d.data < minDate) e.data = "Alege o dată de mâine încolo.";
      if (!d.ora && !e.data) e.ora = "Alege ora preferată.";
    }
    if (s === 3) {
      if (d.nume.trim().length < 2) e.nume = "Scrie numele tău.";
      if (!/^(\+?40|0)7\d{8}$/.test(d.telefon.replace(/[\s.\-()]/g, ""))) e.telefon = "Număr de mobil românesc, de exemplu 0722 123 456.";
      if (!d.acord) e.acord = "Avem nevoie de acordul tău ca să te putem contacta.";
    }
    setErr(e);
    const first = Object.keys(e)[0];
    if (first) requestAnimationFrame(() => (formRef.current?.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus());
    return !first;
  }

  const next = () => { if (validate(step)) setStep((s) => Math.min(s + 1, 4)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  async function trimite() {
    if (!formspreeReady) { setStatus("demo"); return; }
    setStatus("sending");
    try {
      const r = await fetch(site.formspree, {
        method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...d, serviciu: serviciuLabel(d.serviciu), _subject: `Programare: ${d.marca} ${d.model} — ${d.nume}` }),
      });
      setStatus(r.ok ? "ok" : "fail");
    } catch { setStatus("fail"); }
  }
  const waHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mesaj(d))}`;

  const field = (k: keyof Data) => ({
    id: `${uid}-${k}`, name: k, "aria-invalid": err[k] ? true : undefined, "aria-describedby": err[k] ? `${uid}-${k}-err` : undefined,
  });
  const E = (k: keyof Data) => (err[k] ? <p id={`${uid}-${k}-err`} className="field-err">{err[k]}</p> : null);
  const ore = sloturi(d.data);

  return (
    <form ref={formRef} noValidate onSubmit={(e) => { e.preventDefault(); if (step < 4) next(); }} className="scroll-mt-28 rounded-xl border border-ceata-2 bg-white shadow-[0_30px_80px_-40px_rgb(13_15_18/.45)]">
      <ol className="grid grid-cols-5 border-b border-ceata-2" aria-label="Pașii programării">
        {PASI.map((p, i) => {
          const Icon = p.icon; const done = i < step; const cur = i === step;
          return (
            <li key={p.titlu} aria-current={cur ? "step" : undefined} className={`relative flex flex-col items-center gap-1.5 px-1 py-3.5 text-center text-[11px] font-semibold tracking-wide uppercase sm:flex-row sm:justify-center sm:gap-2 sm:text-xs ${cur ? "text-ink" : done ? "text-semnal-text" : "text-muted"}`}>
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${cur ? "border-semnal bg-semnal text-carbon" : done ? "border-semnal-text text-semnal-text" : "border-ceata-2"}`}>
                {done ? <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} /> : <Icon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />}
              </span>
              <span className="hidden sm:inline">{p.titlu}</span>
              <span className="sr-only sm:hidden">{p.titlu}</span>
              <span className="sr-only">{done ? " — completat" : cur ? " — pasul curent" : ""}</span>
              {cur && <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-0.5 bg-semnal" />}
            </li>
          );
        })}
      </ol>

      <div className="p-5 sm:p-8">
        <p className="text-xs font-semibold tracking-[.2em] text-muted uppercase">Pasul {step + 1} din 5</p>
        <h3 ref={headRef} tabIndex={-1} className="mt-1 font-display text-3xl font-semibold uppercase outline-none">
          {["Ce mașină aduci?", "Cu ce te putem ajuta?", "Când ți-ar conveni?", "Cum te contactăm?", "Verifică și trimite"][step]}
        </h3>

        {step === 0 && (
          <fieldset className="mt-6 grid gap-5 sm:grid-cols-2">
            <legend className="sr-only">Datele mașinii</legend>
            <div><label htmlFor={`${uid}-marca`} className="label">Marcă <span className="req">*</span></label><input {...field("marca")} value={d.marca} onChange={(e) => set("marca", e.target.value)} className="input" autoComplete="off" placeholder="de ex. Dacia" required />{E("marca")}</div>
            <div><label htmlFor={`${uid}-model`} className="label">Model <span className="req">*</span></label><input {...field("model")} value={d.model} onChange={(e) => set("model", e.target.value)} className="input" autoComplete="off" placeholder="de ex. Logan" required />{E("model")}</div>
            <div><label htmlFor={`${uid}-an`} className="label">An fabricație</label><input {...field("an")} value={d.an} onChange={(e) => set("an", e.target.value)} className="input" inputMode="numeric" maxLength={4} placeholder="de ex. 2016" />{E("an")}</div>
            <div><label htmlFor={`${uid}-km`} className="label">Kilometri la bord</label><input {...field("km")} value={d.km} onChange={(e) => set("km", e.target.value)} className="input" inputMode="numeric" placeholder="de ex. 145000" />{E("km")}</div>
          </fieldset>
        )}

        {step === 1 && (
          <div className="mt-6 grid gap-6">
            <fieldset aria-describedby={err.serviciu ? `${uid}-serviciu-err` : undefined}>
              <legend className="label">Serviciul de care ai nevoie <span className="req">*</span></legend>
              <div className="mt-1 grid gap-2 sm:grid-cols-2">
                {OPTIUNI.map((o) => (
                  <label key={o.id} className={`choice ${d.serviciu === o.id ? "is-on" : ""}`}>
                    <input type="radio" name="serviciu" value={o.id} checked={d.serviciu === o.id} onChange={() => set("serviciu", o.id)} className="sr-only" />
                    <span aria-hidden="true" className="dot" />{o.label}
                  </label>
                ))}
              </div>
              {E("serviciu")}
            </fieldset>
            <div>
              <label htmlFor={`${uid}-descriere`} className="label">Descrie ce simți / ce auzi {d.serviciu === "nu-stiu" ? <span className="req">*</span> : <span className="font-normal text-muted">(opțional)</span>}</label>
              <textarea {...field("descriere")} value={d.descriere} onChange={(e) => set("descriere", e.target.value)} rows={4} className="input resize-y" placeholder="de ex. „Se aude un scârțâit la frânare, mai ales dimineața” sau „Vibrează volanul peste 90 km/h”." />
              <p className="mt-1.5 text-sm text-muted">Spune-ne când apare (la rece, la viteză, la frânare) — ne ajută la diagnoză.</p>
              {E("descriere")}
            </div>
          </div>
        )}

        {step === 2 && (
          <fieldset className="mt-6 grid gap-5 sm:grid-cols-2">
            <legend className="sr-only">Data și ora preferată</legend>
            <div>
              <label htmlFor={`${uid}-data`} className="label">Data preferată <span className="req">*</span></label>
              <input {...field("data")} type="date" min={minDate || undefined} value={d.data} onChange={(e) => { const v = e.target.value; setD((x) => ({ ...x, data: v, ora: sloturi(v).includes(x.ora) ? x.ora : "" })); setErr((x) => ({ ...x, data: undefined })); }} className="input" required />
              {E("data")}
            </div>
            <div>
              <label htmlFor={`${uid}-ora`} className="label">Ora preferată <span className="req">*</span></label>
              <select {...field("ora")} value={d.ora} onChange={(e) => set("ora", e.target.value)} className="input" disabled={!ore.length} required>
                <option value="">{d.data ? (ore.length ? "Alege ora" : "Închis în această zi") : "Alege întâi data"}</option>
                {ore.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {E("ora")}
            </div>
            <label className="flex items-start gap-3 text-[15px] sm:col-span-2">
              <input type="checkbox" name="flexibil" checked={d.flexibil} onChange={(e) => set("flexibil", e.target.checked)} className="check" />
              <span>Sunt flexibil — pot veni și în altă zi sau la altă oră, dacă e nevoie.</span>
            </label>
            <p className="text-sm text-muted sm:col-span-2">Program: L–V 8:00–18:00, sâmbătă 8:00–14:00 <span className="tbd">exemplu</span>. Ora e o preferință — te sunăm să o confirmăm.</p>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="mt-6 grid gap-5 sm:grid-cols-2">
            <legend className="sr-only">Datele de contact</legend>
            <div><label htmlFor={`${uid}-nume`} className="label">Nume <span className="req">*</span></label><input {...field("nume")} value={d.nume} onChange={(e) => set("nume", e.target.value)} className="input" autoComplete="name" required />{E("nume")}</div>
            <div><label htmlFor={`${uid}-telefon`} className="label">Telefon <span className="req">*</span></label><input {...field("telefon")} type="tel" value={d.telefon} onChange={(e) => set("telefon", e.target.value)} className="input" autoComplete="tel" inputMode="tel" placeholder="07XX XXX XXX" required />{E("telefon")}</div>
            <div className="sm:col-span-2">
              <label className="flex items-start gap-3 text-[15px]">
                <input type="checkbox" {...field("acord")} checked={d.acord} onChange={(e) => set("acord", e.target.checked)} className="check" />
                <span>Sunt de acord să fiu contactat pentru confirmarea programării. Detalii în <a className="link" href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/confidentialitate/`}>Politica de confidențialitate</a>. <span className="req">*</span></span>
              </label>
              {E("acord")}
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <div className="mt-6">
            <dl className="divide-y divide-ceata-2 rounded-lg border border-ceata-2">
              {[
                { t: "Mașina", v: `${d.marca} ${d.model}${d.an ? ` · ${d.an}` : ""}${d.km ? ` · ${d.km} km` : ""}`, s: 0 },
                { t: "Serviciu", v: serviciuLabel(d.serviciu) + (d.descriere ? ` — „${d.descriere}”` : ""), s: 1 },
                { t: "Preferință", v: `${fmtData(d.data)}, ora ${d.ora}${d.flexibil ? " · flexibil" : ""}`, s: 2 },
                { t: "Contact", v: `${d.nume} · ${d.telefon}`, s: 3 },
              ].map((r) => (
                <div key={r.t} className="flex items-start gap-4 p-4">
                  <dt className="w-24 shrink-0 text-xs font-semibold tracking-widest text-muted uppercase sm:w-28">{r.t}</dt>
                  <dd className="min-w-0 flex-1 break-words">{r.v}</dd>
                  <button type="button" onClick={() => setStep(r.s)} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-semnal-text hover:underline" aria-label={`Modifică: ${r.t}`}>
                    <Pencil aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />Modifică
                  </button>
                </div>
              ))}
            </dl>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={trimite} disabled={status === "sending" || status === "ok"} className="btn btn-primary justify-center">
                <Send aria-hidden="true" className="h-4 w-4" strokeWidth={2} />{status === "sending" ? "Se trimite…" : status === "ok" ? "Trimis" : "Trimite programarea"}
              </button>
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-wa justify-center">
                <MessageCircle aria-hidden="true" className="h-4 w-4" strokeWidth={2} />Trimite pe WhatsApp
              </a>
            </div>
            <div aria-live="polite" className="mt-4 text-[15px]">
              {status === "ok" && <p className="note note-ok">Mulțumim, {d.nume.split(" ")[0]}! Am primit cererea și te sunăm pentru confirmare în timpul programului.</p>}
              {status === "fail" && <p className="note note-err">Nu am reușit să trimitem cererea. Încearcă pe WhatsApp sau sună-ne la {site.telefon.afisat}.</p>}
              {status === "demo" && <p className="note note-demo">Site demonstrativ: trimiterea online se activează după ce se configurează formularul Formspree al firmei. Până atunci, folosește butonul WhatsApp — mesajul e deja completat.</p>}
            </div>
            <p className="mt-3 text-sm text-muted">WhatsApp deschide o conversație cu textul gata scris; tu alegi dacă îl trimiți. Numărul firmei: <span className="tbd">de completat</span></p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-ceata-2 pt-5">
          {step > 0 ? (
            <button type="button" onClick={back} className="btn btn-ghost-dark"><ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={2} />Înapoi</button>
          ) : <span />}
          {step < 4 && (
            <button type="submit" className="btn btn-primary btn-arrow">Continuă<ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></button>
          )}
        </div>
      </div>
    </form>
  );
}

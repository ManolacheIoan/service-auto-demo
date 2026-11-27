import type { Metadata } from "next";
import { CalendarCheck, Check, Clock, Tag } from "lucide-react";
import { servicii } from "@/content/site";
import { og } from "@/lib";
import { Art } from "@/components/Art";
import { Photo } from "@/components/Photo";
import { T } from "@/components/T";
import { BookLink } from "@/components/BookLink";
import { serviceIcon } from "@/components/Icons";

const title = "Servicii: diagnoză auto, frâne, revizii, geometrie, ITP";
const description = "Ce include fiecare serviciu la MotorPro, service auto Tecuci: diagnoză auto computerizată pentru județul Galați, distribuție, frâne, suspensie, vulcanizare, climatizare, electrică și pregătire ITP. Durate și prețuri orientative.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "./" },
  openGraph: og(title, description, "./"),
};

export default function ServiciiPage() {
  return (
    <>
      <section className="blueprint bg-carbon pt-16 pb-14 text-white sm:pt-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="kicker text-semnal"><span className="font-mono">01</span><span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />Servicii, pe larg</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[.92] font-bold uppercase sm:text-7xl">Ce facem și ce primești</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-metal">Explicat simplu, fără jargon. Durata și prețurile sunt orientative <span className="tbd">exemplu</span> — prețul exact îl afli din deviz, după diagnoză, înainte să începem lucrul.</p>
          <nav aria-label="Salt la serviciu" className="mt-10">
            <ul className="flex flex-wrap gap-2">
              {servicii.map((s) => (
                <li key={s.id}><a href={`#${s.id}`} className="inline-flex min-h-10 items-center rounded-md border border-otel px-3.5 text-sm font-medium text-white/85 hover:border-semnal hover:text-white">{s.titlu}</a></li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <div className="on-light bg-ceata">
        {servicii.map((s, i) => {
          const I = serviceIcon[s.icon];
          const flip = i % 2 === 1;
          return (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`} className={`py-16 sm:py-20 ${i % 2 ? "bg-white" : ""}`}>
              <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className={`reveal relative ${flip ? "lg:order-2" : ""}`}>
                  {"foto" in s.media
                    ? <Photo name={s.media.foto} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[3/2] rounded-lg" />
                    : <Art name={s.media.art} className="aspect-[3/2] rounded-lg" />}
                  <span aria-hidden="true" className={`absolute -bottom-3 h-20 w-20 border-b-2 border-semnal ${flip ? "-left-3 border-l-2" : "-right-3 border-r-2"}`} />
                </div>
                <div className="reveal">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-md bg-carbon text-semnal"><I aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} /></span>
                    <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")} / {servicii.length}</span>
                  </div>
                  <h2 id={`${s.id}-t`} className="mt-4 font-display text-4xl leading-none font-bold uppercase sm:text-5xl">{s.titlu}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted"><T>{s.explicatie}</T></p>
                  <div className="mt-7 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-xs font-semibold tracking-[.18em] text-ink uppercase">Ce include</h3>
                      <ul className="mt-3 space-y-2 text-[15px]">
                        {s.include.map((x) => <li key={x} className="flex gap-2.5"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-semnal-text" strokeWidth={2.4} /><span><T>{x}</T></span></li>)}
                      </ul>
                    </div>
                    {s.semne && (
                      <div>
                        <h3 className="text-xs font-semibold tracking-[.18em] text-ink uppercase">Când să vii</h3>
                        <ul className="mt-3 space-y-2 text-[15px] text-muted">
                          {s.semne.map((x) => <li key={x} className="flex gap-2.5"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-semnal" />{x}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                  <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-ceata-2 pt-5">
                    <div className="flex items-center gap-2"><Clock aria-hidden="true" className="h-4 w-4 text-semnal-text" strokeWidth={2} /><dt className="text-sm text-muted">Durată estimată:</dt><dd className="font-semibold"><T>{s.durata}</T></dd></div>
                    <div className="flex items-center gap-2"><Tag aria-hidden="true" className="h-4 w-4 text-semnal-text" strokeWidth={2} /><dt className="text-sm text-muted">Preț:</dt><dd className="font-semibold"><T>{s.pret}</T></dd></div>
                  </dl>
                  <BookLink serviciu={s.id} className="btn btn-primary mt-7"><CalendarCheck aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={2} />Programează: {s.titlu.split(" ")[0].toLowerCase()}</BookLink>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

import { preload } from "react-dom";
import { ArrowRight, ArrowUpRight, CalendarCheck, Clock, Mail, MapPin, Phone, Plus, ShieldCheck, Snowflake, Star, Sun } from "lucide-react";
import { deCeNoi, galerie, intrebari, pasi, servicii, sezon, site } from "@/content/site";
import { BASE } from "@/lib";
import { Photo, srcSet, src } from "@/components/Photo";
import { Heading } from "@/components/Section";
import { T } from "@/components/T";
import { BookLink } from "@/components/BookLink";
import { Booking } from "@/components/Booking";
import { Calculator } from "@/components/Calculator";
import { Gallery } from "@/components/Gallery";
import { MapEmbed } from "@/components/MapEmbed";
import { serviceIcon, whyIcon } from "@/components/Icons";

const HERO_SIZES = "100vw";

function Hero() {
  preload(src("hero", 1280), { as: "image", imageSrcSet: srcSet("hero"), imageSizes: HERO_SIZES, fetchPriority: "high" });
  return (
    <section aria-labelledby="hero-titlu" className="relative isolate overflow-hidden bg-carbon text-white">
      <Photo name="hero" priority sizes={HERO_SIZES} className="!absolute inset-0 -z-20" imgClassName="object-[42%_center] sm:object-center" badge={false} />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(13_15_18/.96)_0%,rgb(13_15_18/.82)_42%,rgb(13_15_18/.25)_75%,rgb(13_15_18/.1)_100%)] max-sm:bg-[linear-gradient(180deg,rgb(13_15_18/.3)_0%,rgb(13_15_18/.55)_30%,rgb(13_15_18/.92)_62%,rgb(13_15_18/.98)_100%)]" />
      <div aria-hidden="true" className="blueprint absolute inset-0 -z-10 opacity-60" />
      <div className="mx-auto flex min-h-[calc(100svh-7.5rem)] max-w-7xl flex-col justify-end px-5 pt-40 pb-12 sm:px-8 sm:pb-16 lg:min-h-[min(52rem,calc(100svh-7rem))] lg:justify-center lg:pt-24">
        <p className="kicker text-semnal"><span className="font-mono max-sm:hidden">TEC / GL</span><span aria-hidden="true" className="h-px w-8 bg-current opacity-60 max-sm:hidden" />Atelier auto în Tecuci</p>
        <h1 id="hero-titlu" className="mt-5 max-w-3xl font-display text-[3.3rem] leading-[.9] font-bold tracking-tight uppercase sm:text-7xl lg:text-[6.2rem]">
          Service auto în Tecuci
          <span className="mt-3 block text-[.5em] leading-[1] text-metal">— diagnoză corectă, <span className="text-semnal">reparații la timp</span></span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">Aflăm întâi ce are mașina, îți dăm devizul și lucrăm doar ce aprobi tu. Pentru șoferii din Tecuci și din tot județul Galați.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <BookLink className="btn btn-primary btn-arrow"><CalendarCheck aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={2} />Programează-te<ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></BookLink>
          <a href={`tel:${site.telefon.tel}`} className="btn btn-ghost"><Phone aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={2} />Sună acum</a>
        </div>
        <ul className="mt-12 grid max-w-3xl gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 text-sm sm:grid-cols-3">
          {[
            { i: ShieldCheck, t: "Deviz înainte de reparație" },
            { i: Clock, t: "L–V 8–18 · S 8–14", ex: true },
            { i: MapPin, t: "Tecuci, jud. Galați" },
          ].map(({ i: I, t, ex }) => (
            <li key={t} className="flex items-center gap-3 bg-carbon/80 px-4 py-3.5">
              <I aria-hidden="true" className="h-4.5 w-4.5 shrink-0 text-semnal" strokeWidth={1.8} />
              <span className="text-white/90">{t}{ex && <> <span className="tbd">exemplu</span></>}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="absolute right-4 bottom-3 hidden text-[10px] tracking-[.14em] text-white/60 uppercase sm:block">Foto stock · exemplu</p>
    </section>
  );
}

function Servicii() {
  return (
    <section id="servicii" aria-labelledby="servicii-titlu" className="on-light bg-ceata py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading id="servicii-titlu" nr="01" eticheta="Servicii" titlu={<>Tot ce ține de mașină,<br className="hidden sm:block" /> sub același acoperiș</>} intro="De la diagnoză și revizie până la frâne, suspensie și anvelope. Fiecare lucrare începe cu o verificare și un preț pe care îl știi dinainte." />
          <a href={`${BASE}/servicii/`} className="btn btn-ghost-dark btn-arrow reveal">Toate detaliile<ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></a>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {servicii.map((s, i) => {
            const I = serviceIcon[s.icon];
            const big = i === 0;
            return (
              <li key={s.id} className={`reveal ${big ? "sm:col-span-2" : ""}`}>
                <a href={`${BASE}/servicii/#${s.id}`} className={`glow lift group flex h-full flex-col rounded-lg border p-6 ${big ? "glow-dark border-otel bg-carbon text-white" : "border-ceata-2 bg-white"}`}>
                  <div className="flex items-start justify-between">
                    <span className={`grid h-12 w-12 place-items-center rounded-md ${big ? "bg-semnal text-carbon" : "bg-carbon text-semnal"}`}><I aria-hidden="true" className="h-5.5 w-5.5" strokeWidth={1.7} /></span>
                    <span className={`font-mono text-xs ${big ? "text-metal" : "text-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className={`mt-5 font-display text-[1.6rem] leading-tight font-semibold uppercase ${big ? "sm:text-4xl" : ""}`}>{s.titlu}</h3>
                  <p className={`mt-2 text-[15px] leading-relaxed ${big ? "max-w-md text-white/75" : "text-muted"}`}>{s.scurt}</p>
                  {big && s.semne && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {s.semne.map((x) => <li key={x} className="rounded border border-otel bg-grafit px-2.5 py-1 text-[13px] text-white/80">{x}</li>)}
                    </ul>
                  )}
                  <dl className={`mt-auto grid grid-cols-2 gap-3 border-t pt-4 text-sm ${big ? "border-otel" : "border-ceata-2"} mt-6`}>
                    <div><dt className={`text-[11px] font-semibold tracking-widest uppercase ${big ? "text-metal" : "text-muted"}`}>Durată</dt><dd className="mt-0.5 font-medium"><T>{s.durata}</T></dd></div>
                    <div><dt className={`text-[11px] font-semibold tracking-widest uppercase ${big ? "text-metal" : "text-muted"}`}>Preț</dt><dd className="mt-0.5 font-medium"><T>{s.pret}</T></dd></div>
                  </dl>
                  <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${big ? "text-semnal" : "text-semnal-text"}`}>Ce include<ArrowUpRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} /></span>
                </a>
              </li>
            );
          })}
          <li className="reveal">
            <div className="flex h-full flex-col justify-between rounded-lg border border-dashed border-semnal-text/50 bg-white/60 p-6">
              <div>
                <h3 className="font-display text-[1.6rem] leading-tight font-semibold uppercase">Nu știi ce are?</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">Spune-ne ce simți sau ce auzi. Pornim de la o verificare și îți explicăm pe înțeles.</p>
              </div>
              <BookLink serviciu="nu-stiu" className="btn btn-primary mt-6 justify-center">Cere o verificare</BookLink>
            </div>
          </li>
        </ul>
        <p className="mt-6 text-sm text-muted">Durate estimative, în funcție de mașină. Prețurile sunt orientative <span className="tbd">exemplu</span> — prețul final îl afli din deviz, după diagnoză.</p>
      </div>
    </section>
  );
}

function DeCeNoi() {
  return (
    <section id="de-ce-noi" aria-labelledby="dcn-titlu" className="blueprint relative bg-carbon py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <Heading id="dcn-titlu" dark nr="02" eticheta="De ce noi" titlu="Fără reparații „la noroc”" intro="Lucrăm cum ne-am dori să se lucreze și la mașina noastră: întâi verificăm, apoi îți explicăm, abia apoi reparăm." />
          <div className="reveal relative mt-10 hidden lg:block">
            <Photo name="unelte" sizes="(min-width: 1024px) 40vw, 0px" className="aspect-[4/3] rounded-lg" />
            <span aria-hidden="true" className="absolute -right-3 -bottom-3 h-24 w-24 border-r-2 border-b-2 border-semnal" />
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {deCeNoi.map((p, i) => {
            const I = whyIcon[p.icon];
            return (
              <li key={p.titlu} className="reveal glow glow-dark rounded-lg border border-otel bg-grafit p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <I aria-hidden="true" className="h-7 w-7 text-semnal" strokeWidth={1.5} />
                  <span className="font-mono text-xs text-metal">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl leading-tight font-semibold uppercase">{p.titlu}</h3>
                <p className="mt-3 leading-relaxed text-metal">{p.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Programare() {
  return (
    <section id="programare" aria-labelledby="prog-titlu" className="on-light bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.4fr]">
        <div>
          <Heading id="prog-titlu" nr="03" eticheta="Programare online" titlu="Programează-te în 2 minute" intro="Spune-ne ce mașină ai și ce simți la ea. Te sunăm să confirmăm ora — nu e nevoie de cont și nu plătești nimic online." />
          <ul className="reveal mt-8 space-y-4 text-[15px]">
            <li className="flex gap-3"><span className="font-mono text-semnal-text">01</span>Datele mașinii: marcă, model, an, kilometri</li>
            <li className="flex gap-3"><span className="font-mono text-semnal-text">02</span>Serviciul sau problema, în cuvintele tale</li>
            <li className="flex gap-3"><span className="font-mono text-semnal-text">03</span>Ziua și ora care îți convin</li>
            <li className="flex gap-3"><span className="font-mono text-semnal-text">04</span>Numele și telefonul, ca să te sunăm</li>
          </ul>
          <div className="reveal mt-10 rounded-lg bg-carbon p-6 text-white">
            <p className="text-sm text-metal">Preferi la telefon?</p>
            <a href={`tel:${site.telefon.tel}`} className="mt-1 flex items-center gap-3 font-display text-3xl font-semibold tracking-wide hover:text-semnal"><Phone aria-hidden="true" className="h-6 w-6 text-semnal" strokeWidth={1.8} />{site.telefon.afisat}</a>
            <p className="mt-2 text-sm text-metal">Număr placeholder <span className="tbd">exemplu</span></p>
          </div>
        </div>
        <div className="reveal"><Booking /></div>
      </div>
    </section>
  );
}

function CumLucram() {
  return (
    <section id="cum-lucram" aria-labelledby="cum-titlu" className="relative overflow-hidden bg-grafit py-20 text-white sm:py-28">
      <div className="metal-line absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Heading id="cum-titlu" dark nr="04" eticheta="Cum lucrăm" titlu="Patru pași, fără surprize" intro="Știi în orice moment ce se întâmplă cu mașina ta și cât costă." />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          <span aria-hidden="true" className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-semnal via-metal/50 to-semnal md:block" />
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-7 w-px bg-gradient-to-b from-semnal via-metal/40 to-semnal md:hidden" />
          {pasi.map((p, i) => (
            <li key={p.titlu} className="reveal relative flex gap-5 md:flex-col md:items-center md:text-center">
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-semnal bg-carbon font-display text-2xl font-bold text-semnal">{i + 1}</span>
              <div>
                <h3 className="font-display text-2xl font-semibold uppercase md:mt-6">{p.titlu}</h3>
                <p className="mt-2 leading-relaxed text-metal md:mx-auto md:max-w-[15rem]">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function RevizieSezon() {
  return (
    <section id="revizie" aria-labelledby="rev-titlu" className="on-light bg-ceata py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Heading id="rev-titlu" nr="05" eticheta="Calendar de revizie" titlu="Când îți vine rândul la revizie?" intro="Un calcul rapid, orientativ, din kilometrii de la bord. Intervalul îl poți schimba după cartea service a mașinii tale." />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div className="reveal"><Calculator /></div>
          <article id="sezon" aria-labelledby="sezon-titlu" className="reveal relative isolate flex min-h-[28rem] flex-col justify-end overflow-hidden rounded-xl bg-carbon p-6 text-white sm:p-8">
            <Photo name="anvelope" sizes="(min-width: 1024px) 40vw, 100vw" className="!absolute inset-0 -z-20" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-carbon via-carbon/85 to-carbon/10" />
            <p className="flex items-center gap-2 text-sm font-semibold tracking-[.18em] text-semnal uppercase"><Snowflake aria-hidden="true" className="h-4 w-4" strokeWidth={2} /><span aria-hidden="true">/</span><Sun aria-hidden="true" className="h-4 w-4" strokeWidth={2} />Sezon</p>
            <h3 id="sezon-titlu" className="mt-3 font-display text-4xl leading-none font-bold uppercase">{sezon.titlu}</h3>
            <p className="mt-4 leading-relaxed text-white/80"><T>{sezon.text}</T></p>
            <p className="mt-3 text-sm text-metal">{sezon.nota}</p>
            <BookLink serviciu={sezon.serviciu} className="btn btn-primary btn-arrow mt-6 self-start">Programează schimbul<ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></BookLink>
          </article>
        </div>
      </div>
    </section>
  );
}

function Galerie() {
  return (
    <section id="galerie" aria-labelledby="gal-titlu" className="blueprint bg-carbon py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Heading id="gal-titlu" dark nr="06" eticheta="Atelier" titlu="Un atelier curat, unelte potrivite" intro={<>Imagini stock folosite ca exemplu <span className="tbd">exemplu</span> — se înlocuiesc cu fotografii din atelierul real.</>} />
        <div className="mt-12"><Gallery items={galerie} /></div>
      </div>
    </section>
  );
}

function Intrebari() {
  return (
    <section id="intrebari" aria-labelledby="faq-titlu" className="on-light bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.4fr]">
        <Heading id="faq-titlu" nr="07" eticheta="Întrebări frecvente" titlu="Răspunsuri directe" intro="Ce ne întreabă cel mai des șoferii înainte să vină la service." />
        <div className="reveal divide-y divide-ceata-2 border-y border-ceata-2">
          {intrebari.map((x) => (
            <details key={x.q} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left font-display text-xl font-semibold uppercase sm:text-2xl hover:text-semnal-text">
                {x.q}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-ceata-2 group-open:border-semnal group-open:bg-semnal"><Plus aria-hidden="true" className="faq-icon h-4 w-4" strokeWidth={2.2} /></span>
              </summary>
              <p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-muted"><T>{x.a}</T></p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Recenzii() {
  return (
    <section id="recenzii" aria-labelledby="rec-titlu" className="bg-grafit py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal glow glow-dark grid gap-8 rounded-xl border border-otel bg-carbon p-6 sm:p-10 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="flex items-center gap-5">
            <div className="grid h-24 w-24 shrink-0 place-content-center gap-1 rounded-lg border border-otel bg-grafit text-center">
              <span className="font-display text-4xl leading-none font-bold text-white">–,–</span>
              <span className="tbd">exemplu</span>
            </div>
            <div>
              <p className="flex gap-1 text-semnal" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-5 w-5" strokeWidth={1.6} />)}</p>
              <p className="mt-2 text-sm text-metal">Nota pe Google <span className="tbd">exemplu</span> · <span className="tbd">nr. recenzii</span></p>
            </div>
          </div>
          <div>
            <h2 id="rec-titlu" className="font-display text-3xl leading-tight font-bold uppercase sm:text-4xl">Ce spun clienții — direct pe Google</h2>
            <p className="mt-2 max-w-xl leading-relaxed text-metal">Nu publicăm aici recenzii copiate sau scrise de noi. Le găsești, nefiltrate, pe profilul nostru de Google.</p>
          </div>
          <a href={site.google.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-arrow justify-center">Vezi recenziile pe Google<ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const rows = [
    { i: MapPin, t: "Adresă", v: <>{site.adresa.strada}, {site.adresa.localitate}, jud. {site.adresa.judet} <span className="tbd">fictivă</span></> },
    { i: Phone, t: "Telefon", v: <a href={`tel:${site.telefon.tel}`} className="hover:text-semnal-text">{site.telefon.afisat}</a> },
    { i: Mail, t: "Email", v: <a href={`mailto:${site.email}`} className="hover:text-semnal-text">{site.email}</a> },
  ];
  return (
    <section id="contact" aria-labelledby="contact-titlu" className="on-light bg-ceata py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <Heading id="contact-titlu" nr="08" eticheta="Contact" titlu="Te așteptăm la atelier" intro={`Pentru șoferii din ${site.zona}. Sună-ne înainte, ca să avem un loc liber pe elevator când ajungi.`} />
          <dl className="reveal mt-10 grid gap-4 sm:grid-cols-2">
            {rows.map(({ i: I, t, v }) => (
              <div key={t} className="rounded-lg border border-ceata-2 bg-white p-5">
                <dt className="flex items-center gap-2 text-xs font-semibold tracking-widest text-muted uppercase"><I aria-hidden="true" className="h-4 w-4 text-semnal-text" strokeWidth={2} />{t}</dt>
                <dd className="mt-2 font-medium break-words">{v}</dd>
              </div>
            ))}
            <div className="rounded-lg border border-ceata-2 bg-white p-5">
              <dt className="flex items-center gap-2 text-xs font-semibold tracking-widest text-muted uppercase"><Clock aria-hidden="true" className="h-4 w-4 text-semnal-text" strokeWidth={2} />Program <span className="tbd">exemplu</span></dt>
              <dd className="mt-2">
                <table className="w-full text-[15px]"><tbody>
                  {site.program.map((p) => <tr key={p.zile}><th scope="row" className="py-0.5 pr-3 text-left font-normal text-muted">{p.zile}</th><td className="py-0.5 text-right font-medium">{p.ore}</td></tr>)}
                </tbody></table>
              </dd>
            </div>
          </dl>
          <div className="reveal mt-6 flex flex-wrap gap-3">
            <BookLink className="btn btn-primary"><CalendarCheck aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={2} />Programează-te</BookLink>
            <a href={site.harta.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark">Deschide în Google Maps<ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></a>
          </div>
        </div>
        <div className="reveal"><MapEmbed /></div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Servicii />
      <DeCeNoi />
      <Programare />
      <CumLucram />
      <RevizieSezon />
      <Galerie />
      <Intrebari />
      <Recenzii />
      <Contact />
    </>
  );
}

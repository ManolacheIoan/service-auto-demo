import { legal } from "@/content/site";
import { T } from "./T";

export function Legal({ titlu, children }: { titlu: string; children: React.ReactNode }) {
  return (
    <>
      <section className="blueprint bg-carbon pt-16 pb-12 text-white sm:pt-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h1 className="font-display text-5xl font-bold uppercase sm:text-6xl">{titlu}</h1>
          <p className="mt-4 inline-block rounded border border-semnal/50 px-3 py-1.5 text-sm font-semibold text-semnal">Text exemplu — de verificat de un specialist înainte de folosire</p>
        </div>
      </section>
      <article className="on-light bg-white py-14">
        <div className="legal mx-auto max-w-3xl px-5 text-[16px] leading-relaxed text-muted sm:px-8 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_h2]:uppercase [&_li]:mt-1.5 [&_p]:mt-4 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
          <p className="!mt-0 text-sm">Ultima actualizare: <T>{legal.actualizat}</T> · Operator: <T>{legal.operator}</T></p>
          {children}
        </div>
      </article>
    </>
  );
}

import type { Metadata } from "next";
import { BASE } from "@/lib";

export const metadata: Metadata = { title: "Pagina nu există", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="blueprint grid min-h-[60vh] place-items-center bg-carbon px-5 py-24 text-center text-white">
      <div>
        <p className="font-mono text-semnal">COD EROARE P0404</p>
        <h1 className="mt-3 font-display text-6xl font-bold uppercase">Pagina nu există</h1>
        <p className="mt-4 text-metal">Am făcut diagnoza: linkul nu duce nicăieri.</p>
        <a href={`${BASE}/`} className="btn btn-primary mt-8">Înapoi la prima pagină</a>
      </div>
    </section>
  );
}

/** Antet de secțiune: index tehnic + titlu condensat + intro. */
export function Heading({ nr, eticheta, titlu, intro, dark = false, center = false, id }: {
  nr: string; eticheta: string; titlu: React.ReactNode; intro?: React.ReactNode; dark?: boolean; center?: boolean; id?: string;
}) {
  return (
    <div className={`reveal max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`kicker ${dark ? "text-semnal" : "text-semnal-text"} ${center ? "justify-center" : ""}`}>
        <span className="font-mono">{nr}</span><span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />{eticheta}
      </p>
      <h2 id={id} className={`mt-3 font-display text-[2.5rem] leading-[.95] font-bold tracking-tight uppercase sm:text-6xl ${dark ? "text-white" : "text-ink"}`}>{titlu}</h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-metal" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

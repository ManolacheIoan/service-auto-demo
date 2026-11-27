import { stock, WIDTHS, type StockKey } from "@/content/images";
import { BASE } from "@/lib";

export const srcSet = (k: StockKey) => WIDTHS.map((w) => `${BASE}/images/${k}-${w}.webp ${w}w`).join(", ");
export const src = (k: StockKey, w: (typeof WIDTHS)[number] = 1280) => `${BASE}/images/${k}-${w}.webp`;

/** Fotografie responsive (WebP), lazy implicit. `badge` = eticheta „[exemplu]” pe poză. */
export function Photo({ name, sizes, className = "", imgClassName = "", priority = false, badge = true }: {
  name: StockKey; sizes: string; className?: string; imgClassName?: string; priority?: boolean; badge?: boolean;
}) {
  const s = stock[name];
  return (
    <div className={`relative overflow-hidden bg-grafit ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src(name)} srcSet={srcSet(name)} sizes={sizes} alt={s.alt} width={s.w} height={s.h}
        loading={priority ? "eager" : "lazy"} decoding={priority ? "sync" : "async"} fetchPriority={priority ? "high" : "auto"}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
      {badge && <span className="photo-badge">Foto stock · exemplu</span>}
    </div>
  );
}

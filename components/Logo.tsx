import Link from "next/link";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M20 2.5 35.2 11.25v17.5L20 37.5 4.8 28.75v-17.5z" fill="#16191e" stroke="#ff5b1f" strokeWidth="2" />
      <path d="M11.5 27V13.5l8.5 9 8.5-9V27" fill="none" stroke="#f2f4f7" strokeWidth="3" strokeLinejoin="miter" strokeLinecap="square" />
    </svg>
  );
}

export function Logo({ onDark = true }: { onDark?: boolean }) {
  return (
    <Link href="/" aria-label="MotorPro Service Auto — prima pagină" className="flex items-center gap-2.5">
      <LogoMark className="logo-mark h-10 w-10" />
      <span className="leading-none whitespace-nowrap">
        <span className={`block font-display text-[1.45rem] font-bold tracking-wide uppercase ${onDark ? "text-white" : "text-ink"}`}>Motor<span className="text-semnal">Pro</span></span>
        <span className={`block text-[10px] font-medium tracking-[.32em] uppercase ${onDark ? "text-metal" : "text-muted"}`}>Service auto · Tecuci</span>
      </span>
    </Link>
  );
}

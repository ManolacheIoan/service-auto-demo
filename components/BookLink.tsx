"use client";
import { BASE } from "@/lib";

export const PRESELECT_KEY = "motorpro-serviciu";

/**
 * Link către formularul de programare care preselectează un serviciu.
 * Link nativ <a> (Next Link ignoră un al doilea click pe același hash); funcționează și din /servicii/.
 */
export function BookLink({ serviciu, className, children }: { serviciu?: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href={`${BASE}/#programare`}
      className={className}
      onClick={() => {
        if (!serviciu) return;
        try { sessionStorage.setItem(PRESELECT_KEY, serviciu); } catch {}
        window.dispatchEvent(new CustomEvent(PRESELECT_KEY, { detail: serviciu }));
      }}
    >
      {children}
    </a>
  );
}

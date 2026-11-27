import { Fragment } from "react";

/**
 * Afișează textul și transformă orice „[...]” într-o etichetă vizibilă (ex. „[exemplu]”, „[de confirmat cu firma]”),
 * ca datele fictive să nu poată fi confundate cu informații reale.
 */
export function T({ children }: { children: string }) {
  const parts = children.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[") && p.endsWith("]") ? (
          <span key={i} className="tbd">{p.slice(1, -1)}</span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

/** Text simplu, fără etichete (pentru atribute: alt, aria-label, meta). */
export const plain = (s: string) => s.replace(/\s*\[[^\]]+\]/g, "").trim();

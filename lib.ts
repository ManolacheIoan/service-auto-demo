export const SITE_URL = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Open Graph pentru subpagini (Next înlocuiește tot obiectul, deci repetăm imaginea). */
export const og = (title: string, description: string, url: string) => ({
  type: "website" as const, locale: "ro_RO", siteName: "MotorPro Service Auto (demo)", title, description, url,
  images: [{ url: "og.jpg", width: 1200, height: 630, alt: "MotorPro Service Auto, Tecuci — site demonstrativ" }],
});

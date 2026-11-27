import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const d = new Date("2026-11-27");
  return [
    { url: `${SITE_URL}/`, lastModified: d, priority: 1 },
    { url: `${SITE_URL}/servicii/`, lastModified: d, priority: 0.8 },
    { url: `${SITE_URL}/confidentialitate/`, lastModified: d, priority: 0.2 },
    { url: `${SITE_URL}/cookies/`, lastModified: d, priority: 0.2 },
  ];
}

import type { NextConfig } from "next";

// BASE_PATH = sub-calea de pe GitHub Pages ("/service-auto-demo"). Gol pentru dezvoltare locală.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  ...(basePath ? { basePath } : {}),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;

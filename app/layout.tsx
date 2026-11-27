import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib";
import { DemoBand, Header, MobileBar } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/Reveal";

// next/font descarcă fonturile la build și le servește de pe același domeniu.
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const barlow = Barlow_Condensed({ subsets: ["latin", "latin-ext"], weight: ["600", "700"], variable: "--font-barlow", display: "swap" });

const title = "Service auto Tecuci — diagnoză, reparații, ITP | MotorPro (demo)";
const description = "Service auto Tecuci pentru tot județul: diagnoză auto Galați, mecanică, frâne, revizii, geometrie, vulcanizare și climatizare. Deviz aprobat înainte de reparație. Site demonstrativ, firmă fictivă.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL + "/"),
  title: { default: title, template: "%s | MotorPro Service Auto Tecuci (demo)" },
  description,
  keywords: ["service auto Tecuci", "diagnoză auto Galați", "vulcanizare Tecuci", "geometrie roți Tecuci", "revizie auto Tecuci", "pregătire ITP Tecuci"],
  alternates: { canonical: "./" },
  openGraph: {
    type: "website", locale: "ro_RO", siteName: "MotorPro Service Auto (demo)", title, description, url: "./",
    images: [{ url: "og.jpg", width: 1200, height: 630, alt: "MotorPro Service Auto, Tecuci — site demonstrativ" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["og.jpg"] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#0d0f12", colorScheme: "dark light" };

// schema.org cu datele FICTIVE ale firmei demonstrative.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: site.nume,
  description: "Site demonstrativ realizat de Manotek pentru o firmă fictivă. " + site.descriere,
  url: SITE_URL + "/",
  image: SITE_URL + "/og.jpg",
  logo: SITE_URL + "/icon.svg",
  telephone: site.telefon.afisat,
  email: site.email,
  priceRange: "$$",
  address: { "@type": "PostalAddress", streetAddress: site.adresa.strada, addressLocality: site.adresa.localitate, addressRegion: site.adresa.judet, addressCountry: site.adresa.tara },
  geo: { "@type": "GeoCoordinates", latitude: 45.8667, longitude: 27.4167 },
  areaServed: [{ "@type": "City", name: "Tecuci" }, { "@type": "AdministrativeArea", name: "Județul Galați" }],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "14:00" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${inter.variable} ${barlow.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <DemoBand />
        <Header />
        <main id="continut">{children}</main>
        <Footer />
        <MobileBar />
        <RevealObserver />
      </body>
    </html>
  );
}

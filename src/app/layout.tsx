import "./globals.css";
import "@/components/marketing/homepage/MarketingHomepage.css";

import localFont from "next/font/local";
import type { Metadata } from "next";

import { SITE_ORIGIN } from "@/lib/site";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  /* Makes every URL-based metadata field absolute against the real domain.
     The canonical tag itself is per route (see src/lib/site.ts): a relative
     canonical here would resolve against this base, not the current path,
     and point every page at the homepage. */
  metadataBase: new URL(SITE_ORIGIN),
};

// `fallback` + `adjustFontFallback` (both supported for next/font/local per
// node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md
// — adjustFontFallback takes 'Arial' | 'Times New Roman' | false for local
// fonts) generate a metric-adjusted fallback face, so the fallback font is
// sized/spaced to match the real one and swapping in at `display: "swap"`
// doesn't visibly reflow the layout.
const aspekta = localFont({
  src: "../../public/fonts/AspektaVF.woff2",
  display: "swap",
  variable: "--font-aspekta",
  weight: "100 900",
  fallback: ["Inter", "system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

const fraunces = localFont({
  src: "../../public/fonts/FrauncesVF.woff2",
  display: "swap",
  variable: "--font-fraunces",
  weight: "100 900",
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

// Civic Modern faces (homepage, per DESIGN.md transition state). Aspekta and
// Fraunces stay loaded while other routes remain on the legacy palette; the
// double preload goes away at full rollout.
const inter = localFont({
  src: "../../public/fonts/InterVF.woff2",
  display: "swap",
  variable: "--font-inter",
  weight: "100 900",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

const newsreader = localFont({
  src: "../../public/fonts/NewsreaderVF.woff2",
  display: "swap",
  variable: "--font-newsreader",
  weight: "200 800",
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${aspekta.variable} ${fraunces.variable} ${inter.variable} ${newsreader.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

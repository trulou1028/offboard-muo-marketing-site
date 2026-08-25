import "./globals.css";
import "@/components/marketing/homepage/MarketingHomepage.css";

import localFont from "next/font/local";
import type { Metadata } from "next";
import type { ReactNode } from "react";

// robots stays the literal string form so the rendered meta tag is exactly
// "noindex, nofollow, noarchive" — the e2e suite asserts it verbatim. Every
// route inherits this from the root layout; a route needing different robots
// behavior would override it in its own metadata export (none does today).
export const metadata: Metadata = {
  robots: "noindex, nofollow, noarchive",
};

const aspekta = localFont({
  src: "../../public/fonts/AspektaVF.woff2",
  display: "swap",
  variable: "--font-aspekta",
  weight: "100 900",
});

const fraunces = localFont({
  src: "../../public/fonts/FrauncesVF.woff2",
  display: "swap",
  variable: "--font-fraunces",
  weight: "100 900",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${aspekta.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}

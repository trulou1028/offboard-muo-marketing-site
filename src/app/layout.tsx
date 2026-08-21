import "./globals.css";
import "@/components/marketing/homepage/MarketingHomepage.css";

import localFont from "next/font/local";
import type { ReactNode } from "react";

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

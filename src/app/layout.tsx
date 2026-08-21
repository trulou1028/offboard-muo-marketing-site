import "./globals.css";

import localFont from "next/font/local";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${aspekta.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";

import MarketingHome from "@/components/marketing/homepage/MarketingHome";

// robots stays the literal string form so the rendered meta tag is exactly
// "noindex, nofollow, noarchive" — the e2e suite asserts it verbatim.
export const metadata: Metadata = {
  title: "Offboard | The modern unemployment office",
  description:
    "A private, practical plan for benefits, funded training, and the job search after a layoff.",
  robots: "noindex, nofollow, noarchive",
};

export default function Page() {
  return <MarketingHome />;
}

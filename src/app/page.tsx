import type { Metadata } from "next";

import MarketingHome from "@/components/marketing/homepage/MarketingHome";

// robots stays the literal string form so the rendered meta tag is exactly
// "noindex, nofollow, noarchive" — the e2e suite asserts it verbatim.
export const metadata: Metadata = {
  title: "Offboard | The modern unemployment office",
  description:
    "Offboard is the modern unemployment office: one calm place for your benefits, deadlines, runway, funded training, and next job. Verified facts, AI guidance, and a plan that starts where you are. Independent, not a government agency.",
  robots: "noindex, nofollow, noarchive",
};

export default function Page() {
  return <MarketingHome />;
}

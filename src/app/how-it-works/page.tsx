import type { Metadata } from "next";

import { MarketingHowItWorks } from "@/components/marketing/homepage/MarketingRoutePages";

export const metadata: Metadata = {
  title: "How Offboard works | One plan after a layoff",
  description: "See how Offboard connects financial runway, possible benefits, and the job search in one private transition plan.",
  robots: "noindex, nofollow, noarchive",
};

export default function Page() {
  return <MarketingHowItWorks />;
}

import type { Metadata } from "next";

import { MarketingHowItWorks } from "@/components/marketing/homepage/MarketingRoutePages";
import { DEFERRED_ROBOTS } from "@/lib/launch";

export const metadata: Metadata = {
  title: "How Offboard works | Four steps after a layoff",
  description: "Build your Career Context, talk it through with Lumo, run your search with real tools, and follow your layoff plan. Verified facts, one record, no starting over.",
  // Deferred (plan 045, owner 2026-09-07). Remove this line to un-defer.
  robots: DEFERRED_ROBOTS,
};

export default function Page() {
  return <MarketingHowItWorks />;
}

import type { Metadata } from "next";

import { MarketingHowItWorks } from "@/components/marketing/homepage/MarketingRoutePages";
import { DEFERRED_ROBOTS } from "@/lib/launch";

export const metadata: Metadata = {
  title: "How Offboard works | Four steps after a layoff",
  description: "Steady the first week, build your Career Context, connect it to the AI you already use, and run your search with real tools. Verified facts, one record, no starting over.",
  // Deferred (plan 045, owner 2026-09-07). Remove this line to un-defer.
  robots: DEFERRED_ROBOTS,
};

export default function Page() {
  return <MarketingHowItWorks />;
}

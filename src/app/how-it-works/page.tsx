import { MarketingHowItWorks } from "@/components/marketing/homepage/MarketingRoutePages";
import { DEFERRED_ROBOTS } from "@/lib/launch";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata({
  path: "/how-it-works",
  title: "How Offboard works | Four steps after a layoff",
  description: "Build your Career Context, talk it through with Lumo, run your search with real tools, and follow your layoff plan. Verified facts, one record, no starting over.",
  socialTitle: { parent: "Product", page: "How Offboard Works" },
  // Deferred (plan 045, owner 2026-09-07). Remove this line to un-defer.
  robots: DEFERRED_ROBOTS,
});

export default function Page() {
  return <MarketingHowItWorks />;
}

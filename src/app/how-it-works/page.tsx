import type { Metadata } from "next";

import { MarketingHowItWorks } from "@/components/marketing/homepage/MarketingRoutePages";

export const metadata: Metadata = {
  title: "How Offboard works | Four steps after a layoff",
  description: "Steady the first week, build your Career Context, connect it to the AI you already use, and run your search with real tools. Verified facts, one record, no starting over.",
};

export default function Page() {
  return <MarketingHowItWorks />;
}

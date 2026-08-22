import type { Metadata } from "next";

import { MarketingResources } from "@/components/marketing/homepage/MarketingRoutePages";

export const metadata: Metadata = {
  title: "Guides & resources | Offboard",
  description: "Reported essays, practical guides, and the slow work of making layoffs less brutal.",
  robots: "noindex, nofollow, noarchive",
};

export default function Page() {
  return <MarketingResources />;
}

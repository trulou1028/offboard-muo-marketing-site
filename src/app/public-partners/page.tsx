import type { Metadata } from "next";

import { MarketingPublicPartners } from "@/components/marketing/homepage/MarketingRoutePages";

export const metadata: Metadata = {
  title: "Transition support for public partners | Offboard",
  description: "Help residents organize transition work, identify possible support, and continue to the responsible official source or local provider.",
  robots: "noindex, nofollow, noarchive",
};

export default function Page() {
  return <MarketingPublicPartners />;
}

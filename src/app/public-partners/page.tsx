import type { Metadata } from "next";

import { MarketingPublicPartners } from "@/components/marketing/homepage/MarketingRoutePages";

export const metadata: Metadata = {
  title: "Transition support for public partners | Offboard",
  description: "Public and workforce partner details now live on the employers page. See how Offboard organizes practical transition work for the residents you serve.",
  robots: "noindex, nofollow, noarchive",
};

export default function Page() {
  return <MarketingPublicPartners />;
}

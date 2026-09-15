import type { Metadata } from "next";

import { MarketingPricing } from "@/components/marketing/homepage/MarketingRoutePages";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Pricing and support | Offboard",
  description: "Start an Offboard transition plan for free, then add credits or eligible human support only when you choose.",
};

export default function Page() {
  return <MarketingPricing />;
}

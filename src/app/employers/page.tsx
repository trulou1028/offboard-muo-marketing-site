import type { Metadata } from "next";

import { MarketingEmployers } from "@/components/marketing/homepage/MarketingRoutePages";

export const metadata: Metadata = {
  title: "Transition support for employers | Offboard",
  description: "Give departing employees independent transition support for runway, possible benefits, the job search, and what comes next.",
  robots: "noindex, nofollow, noarchive",
};

export default function Page() {
  return <MarketingEmployers />;
}

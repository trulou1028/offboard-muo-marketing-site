import type { Metadata } from "next";

import { MarketingAct } from "@/components/marketing/homepage/MarketingRoutePages";

export const metadata: Metadata = {
  alternates: { canonical: "/act" },
  title: "ACT pilot | Offboard",
  description:
    "ACT gives eligible Alameda County residents sponsored Offboard access and a same-day job-search start, while programs see aggregate engagement only.",
};

export default function Page() {
  return <MarketingAct />;
}

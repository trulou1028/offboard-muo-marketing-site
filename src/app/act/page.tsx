import type { Metadata } from "next";

import { MarketingAct } from "@/components/marketing/homepage/MarketingRoutePages";

export const metadata: Metadata = {
  alternates: { canonical: "/act" },
  title: "ACT pilot | Offboard",
  description:
    "ACT is a resident-first pilot: eligible residents in Alameda County get sponsored access to Offboard and can start a job search the same day, while the program sees aggregate engagement only.",
};

export default function Page() {
  return <MarketingAct />;
}

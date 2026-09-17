import type { Metadata } from "next";

import { MarketingWorkforce } from "@/components/marketing/homepage/MarketingWorkforce";
import { DEFERRED_ROBOTS } from "@/lib/launch";

export const metadata: Metadata = {
  alternates: { canonical: "/workforce" },
  title: "Workforce & Government | Offboard",
  description:
    "Offboard helps workforce boards, counties, and public programs organize transition work around official systems while agencies keep every eligibility decision.",
  // Deferred at launch (plan 043). Remove this line to un-defer.
  robots: DEFERRED_ROBOTS,
};

export default function Page() {
  return <MarketingWorkforce />;
}

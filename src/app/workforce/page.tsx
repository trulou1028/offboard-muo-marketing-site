import type { Metadata } from "next";

import { MarketingWorkforce } from "@/components/marketing/homepage/MarketingWorkforce";
import { DEFERRED_ROBOTS } from "@/lib/launch";

export const metadata: Metadata = {
  title: "Workforce & Government | Offboard",
  description:
    "For workforce boards, counties, and public programs: Offboard organizes the practical transition work around the official system and routes residents to the responsible agency for decisions. Agencies decide. Offboard helps people prepare and continue.",
  // Deferred at launch (plan 043). Remove this line to un-defer.
  robots: DEFERRED_ROBOTS,
};

export default function Page() {
  return <MarketingWorkforce />;
}

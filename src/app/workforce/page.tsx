import type { Metadata } from "next";

import { MarketingWorkforce } from "@/components/marketing/homepage/MarketingWorkforce";

export const metadata: Metadata = {
  title: "Workforce & Government | Offboard",
  description:
    "For workforce boards, counties, and public programs: Offboard organizes the practical transition work around the official system and routes residents to the responsible agency for decisions. Agencies decide. Offboard helps people prepare and continue.",
};

export default function Page() {
  return <MarketingWorkforce />;
}

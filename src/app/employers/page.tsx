import type { Metadata } from "next";

import { MarketingEmployers } from "@/components/marketing/homepage/MarketingRoutePages";

export const metadata: Metadata = {
  title: "Transition support for employers | Offboard",
  description: "Sponsor outplacement, modernized: self-serve, one-time per-employee access with a private member experience, free job postings, and a public and workforce partner program.",
  robots: "noindex, nofollow, noarchive",
};

export default function Page() {
  return <MarketingEmployers />;
}

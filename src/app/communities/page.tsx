import type { Metadata } from "next";

import { MarketingCommunities } from "@/components/marketing/homepage/MarketingCommunities";
import { DEFERRED_ROBOTS } from "@/lib/launch";

export const metadata: Metadata = {
  alternates: { canonical: "/communities" },
  title: "Universities & Communities | Offboard",
  description:
    "For universities, alumni organizations, associations, and nonprofits: sponsor Offboard so your members keep a career record that outlasts a single workshop, appointment, or program year.",
  // Deferred at launch (plan 043). Remove this line to un-defer.
  robots: DEFERRED_ROBOTS,
};

export default function Page() {
  return <MarketingCommunities />;
}

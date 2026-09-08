import type { Metadata } from "next";

import { MarketingJobSearch } from "@/components/marketing/homepage/MarketingJobSearch";
import { DEFERRED_ROBOTS } from "@/lib/launch";

export const metadata: Metadata = {
  title: "Job Search | Offboard",
  description:
    "A job search that works as one system. Decide whether a role is worth pursuing, build the application, track it, prepare for the interview, and record what happened, with every pass making the next one better.",
  // Deferred at launch (plan 043). Remove this line to un-defer.
  robots: DEFERRED_ROBOTS,
};

export default function Page() {
  return <MarketingJobSearch />;
}

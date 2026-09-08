import type { Metadata } from "next";

import { MarketingLayoffSupport } from "@/components/marketing/homepage/MarketingLayoffSupport";
import { DEFERRED_ROBOTS } from "@/lib/launch";

export const metadata: Metadata = {
  title: "Layoff & Benefits | Offboard",
  description:
    "A layoff is not only a job search. Offboard helps you work out what to do first, what support you may qualify for, how to keep health coverage, whether training is funded, and how long your money lasts.",
  // Deferred at launch (plan 043). Remove this line to un-defer.
  robots: DEFERRED_ROBOTS,
};

export default function Page() {
  return <MarketingLayoffSupport />;
}

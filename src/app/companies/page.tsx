import type { Metadata } from "next";

import { MarketingCompanies } from "@/components/marketing/homepage/MarketingCompanies";
import { DEFERRED_ROBOTS } from "@/lib/launch";

export const metadata: Metadata = {
  alternates: { canonical: "/companies" },
  title: "Company Transition Centers | Offboard",
  description:
    "One page per company that has just had a layoff, built from the public record: what happened, with a source next to every figure, what to do this week, and what your state owes you.",
  // Deferred at launch (plan 043). Remove this line to un-defer.
  robots: DEFERRED_ROBOTS,
};

export default function Page() {
  return <MarketingCompanies />;
}

import type { Metadata } from "next";

import { MarketingCompanies } from "@/components/marketing/homepage/MarketingCompanies";

export const metadata: Metadata = {
  title: "Company Transition Centers | Offboard",
  description:
    "One page per company that has just had a layoff, built from the public record: what happened, with a source next to every figure, what to do this week, and what your state owes you.",
};

export default function Page() {
  return <MarketingCompanies />;
}

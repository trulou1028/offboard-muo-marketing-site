import type { Metadata } from "next";

import { MarketingEmployers } from "@/components/marketing/homepage/MarketingRoutePages";

export const metadata: Metadata = {
  alternates: { canonical: "/employers" },
  title: "Transition support for employers | Offboard",
  description: "Sponsor modern outplacement for $199 per employee, with self-serve setup, private member support, free job postings, and public partner programs.",
};

export default function Page() {
  return <MarketingEmployers />;
}

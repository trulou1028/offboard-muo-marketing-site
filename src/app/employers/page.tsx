import type { Metadata } from "next";

import { MarketingEmployers } from "@/components/marketing/homepage/MarketingRoutePages";

export const metadata: Metadata = {
  alternates: { canonical: "/employers" },
  title: "Transition support for employers | Offboard",
  description: "Sponsor outplacement, modernized: $199 per employee, one-time, with self-serve setup, a private member experience, free job postings, and a public and workforce partner program.",
};

export default function Page() {
  return <MarketingEmployers />;
}

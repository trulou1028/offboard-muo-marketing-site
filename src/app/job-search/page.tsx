import type { Metadata } from "next";

import { MarketingJobSearch } from "@/components/marketing/homepage/MarketingJobSearch";

export const metadata: Metadata = {
  alternates: { canonical: "/job-search" },
  title: "Job Search | Offboard",
  description: "A job search that works as one system: decide, apply, interview, and organize with ten tools that all read from the same Career Context.",
};

export default function Page() {
  return <MarketingJobSearch />;
}

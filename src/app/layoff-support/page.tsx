import type { Metadata } from "next";

import { MarketingLayoffSupport } from "@/components/marketing/homepage/MarketingLayoffSupport";

export const metadata: Metadata = {
  title: "Layoff & Benefits | Offboard",
  description:
    "A layoff is not only a job search. Offboard helps you work out what to do first, what support you may qualify for, how to keep health coverage, whether training is funded, and how long your money lasts.",
};

export default function Page() {
  return <MarketingLayoffSupport />;
}

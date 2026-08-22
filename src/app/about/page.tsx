import type { Metadata } from "next";

import { MarketingAbout } from "@/components/marketing/homepage/MarketingRoutePages";

export const metadata: Metadata = {
  title: "Why Offboard exists | About Offboard",
  description: "Why Offboard exists: a clear plan, verified facts, and human support for the whole moment a layoff changes, not only the resume.",
  robots: "noindex, nofollow, noarchive",
};

export default function Page() {
  return <MarketingAbout />;
}

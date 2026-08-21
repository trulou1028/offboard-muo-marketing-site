import type { Metadata } from "next";

import { MarketingAbout } from "@/components/marketing/homepage/MarketingRoutePages";

export const metadata: Metadata = {
  title: "Why Offboard exists | About Offboard",
  description: "Learn why Offboard was built to make the work after a layoff clearer, more connected, and easier to navigate.",
  robots: "noindex, nofollow, noarchive",
};

export default function Page() {
  return <MarketingAbout />;
}

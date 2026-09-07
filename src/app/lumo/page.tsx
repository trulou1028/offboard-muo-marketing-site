import type { Metadata } from "next";

import { MarketingLumo } from "@/components/marketing/homepage/MarketingLumo";
import { DEFERRED_ROBOTS } from "@/lib/launch";

export const metadata: Metadata = {
  title: "Lumo | The AI that already understands your career",
  description:
    "Lumo is Offboard's AI assistant. It works from your Career Context, your applications, your interviews, and your plan, so you can ask about your search without explaining yourself first.",
  // Deferred at launch (plan 043). Remove this line to un-defer.
  robots: DEFERRED_ROBOTS,
};

export default function Page() {
  return <MarketingLumo />;
}

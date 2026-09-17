import type { Metadata } from "next";

import { MarketingApplicationPacket } from "@/components/marketing/homepage/MarketingApplicationPacket";

export const metadata: Metadata = {
  alternates: { canonical: "/application-packet" },
  title: "Application Packet | Offboard",
  description: "Paste a job link and build one complete Application Packet with company intel, role match, resume tailoring, a cover letter, and a path to a person.",
};

export default function Page() {
  return <MarketingApplicationPacket />;
}

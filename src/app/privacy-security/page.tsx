import type { Metadata } from "next";

import { MarketingPrivacySecurity } from "@/components/marketing/homepage/MarketingPrivacySecurity";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy-security" },
  title: "Privacy & Security | Who can see your Offboard record",
  description:
    "Offboard holds your severance math, your runway, and your career history. This page says plainly who can see it, who cannot, where the honest limits are, and what you can delete.",
};

export default function Page() {
  return <MarketingPrivacySecurity />;
}

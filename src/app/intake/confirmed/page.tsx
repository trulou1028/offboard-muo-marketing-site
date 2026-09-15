import type { Metadata } from "next";

import { MarketingShell } from "@/components/marketing/homepage/MarketingSite";
import { MarketingIntakeConfirmed } from "@/components/marketing/intake/MarketingIntakeConfirmed";

export const metadata: Metadata = {
  alternates: { canonical: "/intake/confirmed" },
  title: "Intake received | Offboard",
  description: "Thanks for filling that out. We'll review your intake and reach out directly.",
};

export default function Page() {
  return (
    <MarketingShell current="intake">
      <MarketingIntakeConfirmed />
    </MarketingShell>
  );
}

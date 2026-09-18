import { MarketingShell } from "@/components/marketing/homepage/MarketingSite";
import { MarketingIntakeConfirmed } from "@/components/marketing/intake/MarketingIntakeConfirmed";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata({
  path: "/intake/confirmed",
  title: "Intake received | Offboard",
  description: "Thanks for filling that out. We'll review your intake and reach out directly.",
  socialTitle: { parent: "Support", page: "Intake Received" },
});

export default function Page() {
  return (
    <MarketingShell current="intake">
      <MarketingIntakeConfirmed />
    </MarketingShell>
  );
}

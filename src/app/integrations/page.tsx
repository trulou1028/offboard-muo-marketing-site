import type { Metadata } from "next";

import { MarketingIntegrations } from "@/components/marketing/homepage/MarketingIntegrations";

export const metadata: Metadata = {
  title: "Offboard Everywhere | Use Offboard from the AI you already use",
  description:
    "Connect Offboard to the AI assistants you already work in. Save opportunities, update applications, and add to your Career Context from wherever the conversation happens. Offboard holds the record, you choose the interface.",
};

export default function Page() {
  return <MarketingIntegrations />;
}

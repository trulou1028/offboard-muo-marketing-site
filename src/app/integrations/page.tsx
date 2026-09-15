import type { Metadata } from "next";

import { MarketingIntegrations } from "@/components/marketing/homepage/MarketingIntegrations";

export const metadata: Metadata = {
  alternates: { canonical: "/integrations" },
  title: "Integrations | Use Offboard from the AI you already use",
  description: "Connect Offboard to ChatGPT, Claude, and the tools you already use. Save roles, update applications, and add to your Career Context from wherever you are working.",
};

export default function Page() {
  return <MarketingIntegrations />;
}

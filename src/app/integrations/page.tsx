import { MarketingIntegrations } from "@/components/marketing/homepage/MarketingIntegrations";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata({
  path: "/integrations",
  title: "Integrations | Use Offboard from the AI you already use",
  description: "Connect Offboard to ChatGPT, Claude, and the tools you already use. Save roles, update applications, and build your Career Context from any conversation.",
});

export default function Page() {
  return <MarketingIntegrations />;
}

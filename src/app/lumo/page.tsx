import { MarketingLumo } from "@/components/marketing/homepage/MarketingLumo";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata({
  path: "/lumo",
  title: "Lumo | The AI that already understands your career",
  description: "Lumo is Offboard's AI assistant. It starts every conversation from your Career Context, your applications, and your plan, so you never explain yourself first.",
});

export default function Page() {
  return <MarketingLumo />;
}

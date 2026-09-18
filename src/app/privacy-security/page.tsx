import { MarketingPrivacySecurity } from "@/components/marketing/homepage/MarketingPrivacySecurity";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata({
  path: "/privacy-security",
  title: "Privacy & Security | Who can see your Offboard record",
  description:
    "See who can access your Offboard record, who cannot, how your data is protected, where the limits are, and what you can delete.",
});

export default function Page() {
  return <MarketingPrivacySecurity />;
}

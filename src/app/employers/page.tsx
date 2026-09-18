import { MarketingEmployers } from "@/components/marketing/homepage/MarketingRoutePages";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata({
  path: "/employers",
  title: "Transition support for employers | Offboard",
  description: "Sponsor modern outplacement for $199 per employee, with self-serve setup, private member support, free job postings, and public partner programs.",
});

export default function Page() {
  return <MarketingEmployers />;
}

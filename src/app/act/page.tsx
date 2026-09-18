import { MarketingAct } from "@/components/marketing/homepage/MarketingRoutePages";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata({
  path: "/act",
  title: "ACT pilot | Offboard",
  description:
    "ACT gives eligible Alameda County residents sponsored Offboard access and a same-day job-search start, while programs see aggregate engagement only.",
  socialTitle: { parent: "Programs", page: "ACT Pilot" },
});

export default function Page() {
  return <MarketingAct />;
}

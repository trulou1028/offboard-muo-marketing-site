import { MarketingAbout } from "@/components/marketing/homepage/MarketingRoutePages";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata({
  path: "/about",
  title: "Why Offboard exists | About Offboard",
  description: "Offboard was built by founders who went through their own layoffs. Independent, private, and built to get you out of here.",
});

export default function Page() {
  return <MarketingAbout />;
}

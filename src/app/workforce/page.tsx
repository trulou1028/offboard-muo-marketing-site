import { MarketingWorkforce } from "@/components/marketing/homepage/MarketingWorkforce";
import { DEFERRED_ROBOTS } from "@/lib/launch";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata({
  path: "/workforce",
  title: "Workforce & Government | Offboard",
  description:
    "Offboard helps workforce boards, counties, and public programs organize transition work around official systems while agencies keep every eligibility decision.",
  socialTitle: { parent: "Partners", page: "Workforce & Government" },
  // Deferred at launch (plan 043). Remove this line to un-defer.
  robots: DEFERRED_ROBOTS,
});

export default function Page() {
  return <MarketingWorkforce />;
}

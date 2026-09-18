import { MarketingLayoffSupport } from "@/components/marketing/homepage/MarketingLayoffSupport";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata({
  path: "/layoff-support",
  title: "Layoff & Benefits | Offboard",
  description: "A layoff is not only a job search. Offboard helps with what to do first, what support you may qualify for, health coverage, and how long your money lasts.",
  socialTitle: { parent: "Layoff Support", page: "Benefits, Coverage & Runway" },
});

export default function Page() {
  return <MarketingLayoffSupport />;
}

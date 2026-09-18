import { MarketingCareerContext } from "@/components/marketing/homepage/MarketingCareerContext";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata({
  path: "/career-context",
  title: "Career Context | Offboard",
  description: "Build your Career Context once: one living record of your experience, applications, interviews, and goals that every Offboard tool and connected AI reads from.",
});

export default function Page() {
  return <MarketingCareerContext />;
}

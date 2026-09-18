import { MarketingApplicationPacket } from "@/components/marketing/homepage/MarketingApplicationPacket";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata({
  path: "/application-packet",
  title: "Application Packet | Offboard",
  description: "Paste a job link and build one complete Application Packet with company intel, role match, resume tailoring, a cover letter, and a path to a person.",
});

export default function Page() {
  return <MarketingApplicationPacket />;
}

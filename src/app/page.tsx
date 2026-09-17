import type { Metadata } from "next";

import MarketingHome from "@/components/marketing/homepage/MarketingHome";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Offboard | The modern unemployment office",
  description:
    "Offboard is the modern unemployment office for benefits, deadlines, runway, funded training, and your next job. Independent, not a government agency.",
};

export default function Page() {
  return <MarketingHome />;
}

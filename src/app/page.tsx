import type { Metadata } from "next";

import MarketingHome from "@/components/marketing/homepage/MarketingHome";

// robots is inherited from the root layout (src/app/layout.tsx).
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Offboard | The modern unemployment office",
  description:
    "Offboard is the modern unemployment office: one calm place for your benefits, deadlines, runway, funded training, and next job. Verified facts, AI guidance, and a plan that starts where you are. Independent, not a government agency.",
};

export default function Page() {
  return <MarketingHome />;
}

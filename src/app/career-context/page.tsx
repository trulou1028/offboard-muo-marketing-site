import type { Metadata } from "next";

import { MarketingCareerContext } from "@/components/marketing/homepage/MarketingCareerContext";

export const metadata: Metadata = {
  title: "Career Context | Offboard",
  description: "Build your Career Context once: one living record of your experience, applications, interviews, and goals that every Offboard tool and connected AI reads from.",
};

export default function Page() {
  return <MarketingCareerContext />;
}

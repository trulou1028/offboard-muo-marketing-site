import type { Metadata } from "next";

import { MarketingCareerContext } from "@/components/marketing/homepage/MarketingCareerContext";

export const metadata: Metadata = {
  title: "Career Context | Offboard",
  description:
    "Build your career context once and use it everywhere: a living record of your experience, applications, companies, interviews, and goals that improves every tool you use, in Offboard and in the AI assistants you already work with.",
};

export default function Page() {
  return <MarketingCareerContext />;
}

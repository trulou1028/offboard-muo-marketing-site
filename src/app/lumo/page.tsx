import type { Metadata } from "next";

import { MarketingLumo } from "@/components/marketing/homepage/MarketingLumo";

export const metadata: Metadata = {
  title: "Lumo | The AI that already understands your career",
  description:
    "Lumo is Offboard's AI assistant. It works from your Career Context, your applications, your interviews, and your plan, so you can ask about your search without explaining yourself first.",
};

export default function Page() {
  return <MarketingLumo />;
}

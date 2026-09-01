import type { Metadata } from "next";

import { MarketingCommunities } from "@/components/marketing/homepage/MarketingCommunities";

export const metadata: Metadata = {
  title: "Universities & Communities | Offboard",
  description:
    "For universities, alumni organizations, associations, and nonprofits: sponsor Offboard so your members keep a career record that outlasts a single workshop, appointment, or program year.",
};

export default function Page() {
  return <MarketingCommunities />;
}

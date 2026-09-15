import type { Metadata } from "next";

import { MarketingResources } from "@/components/marketing/homepage/MarketingRoutePages";

// Publish becomes visible within 5 minutes without a redeploy (plan 016,
// docs/cms-architecture.md contract 1 / "Decisions" #2).
export const revalidate = 300;

export const metadata: Metadata = {
  alternates: { canonical: "/resources" },
  title: "Guides & resources | Offboard",
  description: "Reported essays, practical guides, and the slow work of making layoffs less brutal.",
};

export default async function Page() {
  // Dynamic import, deliberately not a top-level one: src/lib/content/posts.ts
  // imports "server-only" (via supabase-read.ts), which throws immediately on
  // import outside a real Server Component context. A top-level import here
  // would make that throw happen the instant this module is loaded — which
  // src/components/marketing/homepage/MarketingHome.test.tsx does, for this
  // file's `metadata` export alone, under vitest (no "react-server" resolve
  // condition set). Deferring the import into this function body means it
  // only runs when Page() actually executes (real Next.js server rendering),
  // never when a test merely imports the module for `metadata`.
  const { getResourceSections } = await import("@/lib/content/posts");
  const sections = await getResourceSections();
  return <MarketingResources sections={sections} />;
}

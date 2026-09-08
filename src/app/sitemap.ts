import type { MetadataRoute } from "next";

import { getPublishedPosts } from "@/lib/content/posts";
import { DEFERRED_ROUTES, isDeferredRoute } from "@/lib/launch";

// Static, sourced-from-code content routes. /companies/<slug> pages are
// deliberately absent until they leave noindex (plan 038). Deliberately excludes /intake
// and /intake/confirmed: those are a form and its transactional confirmation,
// not content anyone should land on from search.
//
// This sitemap is inert while every route carries `robots: noindex` (see
// src/app/layout.tsx) — it pre-builds the "submit the new sitemap in Search
// Console" step in docs/cutover-checklist.md so flipping robots off is the
// only remaining step, not also writing this file.
const STATIC_ROUTES = ["/", "/how-it-works", "/pricing",
  "/career-context", "/integrations", "/lumo", "/layoff-support", "/job-search", "/about", "/employers", "/workforce", "/communities", "/act", "/resources", "/privacy-security", "/companies"] as const;

// Plan 043 filters the deferred routes out rather than deleting them: the
// list above stays complete, and a page re-enters the sitemap the moment it
// leaves src/lib/launch.ts. DEFERRED_ROUTES is imported (not only the
// predicate) so a route dropped from STATIC_ROUTES while still deferred
// fails typecheck instead of silently vanishing from both.
type StaticRoute = (typeof STATIC_ROUTES)[number];
const DEFERRED_ARE_LISTED_ABOVE: readonly StaticRoute[] = DEFERRED_ROUTES;
void DEFERRED_ARE_LISTED_ABOVE;

const LAUNCH_ROUTES = STATIC_ROUTES.filter((route) => !isDeferredRoute(route));

const BASE_URL = "https://offboard.co";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // getPublishedPosts() reads through the CMS data layer (src/lib/content/posts.ts),
  // which falls back to the committed registry + block files when Supabase
  // isn't configured or the fetch fails — so this never throws and never
  // fails the build either way.
  const posts = await getPublishedPosts();

  return [
    ...LAUNCH_ROUTES.map((route) => ({
      url: `${BASE_URL}${route}`,
    })),
    ...posts.map((post) => ({
      url: `${BASE_URL}/resources/${post.slug}`,
    })),
  ];
}

import type { MetadataRoute } from "next";

import { getPublishedPosts } from "@/lib/content/posts";

// Static, sourced-from-code content routes. Deliberately excludes /intake
// and /intake/confirmed: those are a form and its transactional confirmation,
// not content anyone should land on from search.
//
// This sitemap is inert while every route carries `robots: noindex` (see
// src/app/layout.tsx) — it pre-builds the "submit the new sitemap in Search
// Console" step in docs/cutover-checklist.md so flipping robots off is the
// only remaining step, not also writing this file.
const STATIC_ROUTES = ["/", "/how-it-works", "/pricing",
  "/career-context", "/integrations", "/lumo", "/layoff-support", "/job-search", "/about", "/employers", "/public-partners", "/act", "/resources"] as const;

const BASE_URL = "https://offboard.co";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // getPublishedPosts() reads through the CMS data layer (src/lib/content/posts.ts),
  // which falls back to the committed registry + block files when Supabase
  // isn't configured or the fetch fails — so this never throws and never
  // fails the build either way.
  const posts = await getPublishedPosts();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${BASE_URL}${route}`,
    })),
    ...posts.map((post) => ({
      url: `${BASE_URL}/resources/${post.slug}`,
    })),
  ];
}

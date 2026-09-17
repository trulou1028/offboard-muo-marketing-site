/* The site's real home (canonical origin).
 *
 * The same pages answer at more than one address today: `offboard.co`, and the
 * Vercel production URL, which is publicly reachable and serves the whole site.
 * Without a canonical, a crawl of the Vercel address would compete with the
 * real domain rather than hand it the credit.
 *
 * `metadataBase` in the root layout makes every URL-based metadata field
 * absolute against this. The canonical itself is declared PER ROUTE, because
 * in this version of Next a relative canonical resolves against
 * `metadataBase`, not against the current path: `./` in the root layout would
 * point every page at the homepage rather than at itself
 * (node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md
 * § URL Composition). `e2e/homepage.spec.ts` checks every route's rendered
 * tag against its own path, so a page that forgets one fails there.
 *
 * `src/app/sitemap.ts` holds the same origin for the same reason; both are
 * listed in docs/cutover-checklist.md as things to change together if the
 * domain ever does.
 */
export const SITE_ORIGIN = "https://offboard.co";

/** The canonical URL for a route path, e.g. "/pricing". */
export function canonicalFor(path: string): string {
  return new URL(path, SITE_ORIGIN).toString().replace(/\/$/, "") || SITE_ORIGIN;
}

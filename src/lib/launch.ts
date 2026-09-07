/* The launch split (plan 043, owner decision 2026-09-07).
 *
 * The site goes live with nine routes. Eight more are built, reviewed, and
 * live at their URLs, but the owner is holding them back for a polish pass.
 * They stay routable — the redirect map points at some of them, and nothing
 * should 404 — while leaving the nav, leaving the sitemap, and carrying
 * their own `noindex`.
 *
 * This list is the single source of truth. Un-deferring a page is two edits:
 * remove its entry here, and delete the `robots: DEFERRED_ROBOTS` line from
 * its `page.tsx`. Its nav entry comes back separately (the mega-menu
 * structure before the trim is in git history and docs/site-architecture.md).
 */
export const DEFERRED_ROUTES = [
  "/career-context",
  "/lumo",
  "/integrations",
  "/job-search",
  "/layoff-support",
  "/workforce",
  "/communities",
  "/companies",
] as const;

/* Deliberately NOT the layout's "noindex, nofollow, noarchive".
 *
 * Every route inherits that value today, so an assertion that a deferred page
 * is noindexed would pass whether or not its own override is wired up — the
 * silent-fallback trap in AGENTS.md. A distinct string means
 * e2e/homepage.spec.ts can prove the per-route override is the one rendering,
 * and it keeps proving it after the operator flips the layout value at
 * cutover (docs/cutover-checklist.md).
 */
export const DEFERRED_ROBOTS = "noindex, nofollow";

export function isDeferredRoute(pathname: string): boolean {
  return (DEFERRED_ROUTES as readonly string[]).includes(pathname);
}

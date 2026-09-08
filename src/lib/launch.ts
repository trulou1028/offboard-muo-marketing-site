/* The launch split (plan 043, owner decision 2026-09-07).
 *
 * Owner revision 2026-09-07 (plan 045): the five product pages came back
 * with the Product dropdown, and /how-it-works went the other way - "not
 * valuable enough to be a more in-depth version of the homepage". It stays
 * live because four legacy URLs 301 to it (next.config.ts).
 *
 * The routes below are built, reviewed, and live at their URLs, but the
 * owner is holding them back for a polish pass.
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
  "/how-it-works",
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

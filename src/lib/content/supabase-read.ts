import "server-only";

// Server-only read client for the CMS's public content (categories, posts).
//
// Direct REST, matching the dependency-free style of
// src/lib/intake/supabase-admin.ts — no @supabase/supabase-js. Unlike that
// file, this one reads with the publishable/anon key
// (NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY), which is constrained by the RLS
// policies in supabase/migrations/20260825120000_create_cms_posts.sql
// rather than a key that bypasses them. See docs/cms-architecture.md
// "Key policy" for why these two clients must never merge, and
// src/lib/content/service-role-guard.test.ts for the test that enforces it.
//
// Error logging deliberately does NOT include the raw response body the way
// supabase-admin.ts's `detail` does (that pattern is flagged for plan 017 to
// fix there; this file does not introduce it here). On a non-OK response,
// only the HTTP status plus a parsed `code`/`message` (PostgREST's own error
// shape, when present) are logged.

export type SupabaseReadResult<T> =
  | { ok: true; data: T }
  | { ok: false; reason: "not-configured" | "fetch-failed" };

type SupabaseCredentials = { url: string; key: string };

function readCredentials(): SupabaseCredentials | undefined {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return undefined;
  return { url, key };
}

async function logFetchFailure(context: string, res: Response): Promise<void> {
  let parsed: { code?: unknown; message?: unknown } | undefined;
  try {
    parsed = (await res.json()) as { code?: unknown; message?: unknown };
  } catch {
    parsed = undefined;
  }
  console.error(`${context} failed`, res.status, parsed ? { code: parsed.code, message: parsed.message } : undefined);
}

/**
 * GET against a PostgREST table endpoint (`<table>?<query>`), returning the
 * decoded JSON row array. Never throws: a missing configuration or a fetch
 * failure both come back as a typed `{ ok: false }` result so callers (the
 * data layer in posts.ts) can fall back to committed content instead of
 * failing a build.
 */
export async function supabaseSelect<T>(table: string, query: string): Promise<SupabaseReadResult<T[]>> {
  const credentials = readCredentials();
  if (!credentials) {
    console.error(`supabase read skipped (${table}): NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY not configured`);
    return { ok: false, reason: "not-configured" };
  }

  try {
    const res = await fetch(`${credentials.url}/rest/v1/${table}?${query}`, {
      headers: {
        apikey: credentials.key,
        Authorization: `Bearer ${credentials.key}`,
      },
      // `next: { revalidate: 300 }`, NOT `cache: "no-store"`. This must
      // match the calling route's `export const revalidate = 300`
      // (src/app/resources/page.tsx, src/app/resources/[slug]/page.tsx) —
      // Next.js's ISR contract (docs/cms-architecture.md contract 1) is that
      // article pages PRERENDER at build and refresh on a 300s window, not
      // that every request re-fetches. `cache: "no-store"` (correct for
      // supabase-admin.ts's one-shot write) forces the whole route dynamic
      // the moment a fetch call inside it uses it — confirmed the hard way:
      // the cms-contract CI job's build log showed "Dynamic server usage:
      // Route /resources/[slug] couldn't be rendered statically because it
      // used revalidate: 0 fetch" once real credentials made this fetch
      // actually run. `revalidate: 300` here lets Next fold this fetch into
      // the route's own ISR window instead of opting the route out of static
      // rendering entirely.
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      await logFetchFailure(`supabase read (${table})`, res);
      return { ok: false, reason: "fetch-failed" };
    }

    return { ok: true, data: (await res.json()) as T[] };
  } catch (e) {
    console.error(`supabase read threw (${table})`, e instanceof Error ? e.message : String(e));
    return { ok: false, reason: "fetch-failed" };
  }
}

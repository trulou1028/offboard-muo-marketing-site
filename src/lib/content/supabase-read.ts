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
      // Build-time/ISR reads want fresh rows each time this is called
      // (Next's own `revalidate = 300` on the calling route is what
      // controls staleness, not an inner fetch cache layered on top of it).
      cache: "no-store",
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

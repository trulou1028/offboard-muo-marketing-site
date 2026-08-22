import "server-only";

// Server-only insert helper for the `intake_submissions` table.
//
// Deliberately does NOT depend on @supabase/supabase-js: this is a single
// insert, so a direct REST call keeps the dependency footprint small. The
// service-role key is read from process.env here only, never exposed to a
// client component, and never under a NEXT_PUBLIC_ prefix.
//
// SUPABASE_SERVICE_ROLE_KEY is not available on this machine as of the
// 2026-08-22 port (see plans/010-intake-form-port.md "Key availability").
// When it's absent, insertIntakeRow returns a typed "not-configured" result
// instead of throwing, so the caller can degrade gracefully.

export type IntakeInsertRow = {
  name: string;
  email: string;
  recent_title: string;
  industry: string;
  stay_in_industry: string;
  layoff_recency: string;
  how_news_broke: string;
  job_search_vibe: number;
  brings_you_here: string[];
  superpower: string;
  wish_help: string;
  spirit_animal: string;
  relief: string | null;
  before_we_chat: string | null;
  timezone: string | null;
  general_availability: string | null;
};

export type InsertIntakeResult =
  | { ok: true; id: string }
  | { ok: false; reason: "not-configured" | "insert-failed"; detail?: string };

export async function insertIntakeRow(row: IntakeInsertRow): Promise<InsertIntakeResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    console.error("intake insert skipped: SUPABASE_SERVICE_ROLE_KEY is not configured");
    return { ok: false, reason: "not-configured" };
  }

  try {
    const res = await fetch(`${url}/rest/v1/intake_submissions`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(row),
      cache: "no-store",
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => undefined);
      console.error("intake insert failed", res.status, detail);
      return { ok: false, reason: "insert-failed", detail };
    }

    const inserted = (await res.json()) as Array<{ id: string }>;
    const id = inserted[0]?.id;
    if (!id) {
      console.error("intake insert returned no id");
      return { ok: false, reason: "insert-failed" };
    }
    return { ok: true, id };
  } catch (e) {
    console.error("intake insert threw", e);
    return { ok: false, reason: "insert-failed", detail: e instanceof Error ? e.message : String(e) };
  }
}

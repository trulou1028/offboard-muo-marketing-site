import "server-only";

// Minimal, dependency-free Resend client for the two intake emails.
//
// The source site (retiring TanStack repo) routes email through a Lovable
// connector gateway (`connector-gateway.lovable.dev/resend`) that this repo
// has no equivalent for. This port calls the Resend HTTP API directly with
// RESEND_API_KEY instead, which is the credential the plan documents as
// available to the operator. Content and intent (a submitter confirmation +
// a team notification) are preserved from the source's `submit.functions.ts`.
//
// RESEND_API_KEY is not available on this machine as of the 2026-08-22 port
// (see plans/010-intake-form-port.md "Key availability"). Absence never
// throws: submission success only depends on the Supabase insert.

const FROM = "Offboard <hello@offboard.co>";
const REPLY_TO = "hello@offboard.co";

async function logSendFailure(res: Response): Promise<void> {
  let parsed: { name?: unknown; message?: unknown } | undefined;
  try {
    parsed = (await res.json()) as { name?: unknown; message?: unknown };
  } catch {
    parsed = undefined;
  }
  console.error(
    "resend send failed",
    res.status,
    parsed ? { name: parsed.name, message: parsed.message } : undefined,
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendViaResend(input: { to: string | string[]; subject: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(`intake email skipped (RESEND_API_KEY not configured): ${input.subject}`);
    return { ok: false as const, reason: "not-configured" as const };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: Array.isArray(input.to) ? input.to : [input.to],
        subject: input.subject,
        html: input.html,
        reply_to: REPLY_TO,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      await logSendFailure(res);
      return { ok: false as const, reason: "send-failed" as const };
    }
    return { ok: true as const };
  } catch (e) {
    console.error("resend send threw", e instanceof Error ? e.message : String(e));
    return { ok: false as const, reason: "send-failed" as const };
  }
}

export async function sendIntakeConfirmationEmail(input: { to: string; firstName: string }) {
  const html = `<!doctype html><html><body style="font-family:Georgia,serif;background:#f7f4ec;padding:32px;color:#15211d;">
    <h1 style="font-size:24px;">Thanks for filling that out</h1>
    <p>Hi ${escapeHtml(input.firstName)},</p>
    <p>We got your intake and one of us (probably Steph or Louie) will review it and reach out directly, usually within a few days.</p>
    <p>In the meantime, keep an eye on your inbox. If anything urgent comes up, just reply to this email.</p>
    <p><a href="https://offboard.co" style="color:#004838;">Back to offboard.co</a></p>
  </body></html>`;
  return sendViaResend({ to: input.to, subject: "We got your intake, Offboard", html });
}

export async function sendIntakeNotificationEmail(input: {
  to: string[];
  submitterName: string;
  submitterEmail: string;
  recentTitle: string;
  submissionId: string;
  fields: { label: string; value: string }[];
}) {
  const rows = input.fields
    .map(
      (f) =>
        `<div style="margin-bottom:14px;"><p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#40534c;">${escapeHtml(
          f.label,
        )}</p><p style="margin:0;font-size:15px;line-height:22px;color:#15211d;white-space:pre-wrap;">${escapeHtml(
          f.value || "—",
        )}</p></div>`,
    )
    .join("");

  const html = `<!doctype html><html><body style="font-family:Georgia,serif;background:#f7f4ec;padding:32px;color:#15211d;">
    <h1 style="font-size:24px;">New intake from ${escapeHtml(input.submitterName)}</h1>
    <p>Reply directly to <a href="mailto:${escapeHtml(input.submitterEmail)}" style="color:#004838;">${escapeHtml(
      input.submitterEmail,
    )}</a>.</p>
    <hr style="border-color:#d7d3c8;margin:20px 0;" />
    ${rows}
    <hr style="border-color:#d7d3c8;margin:20px 0 12px;" />
    <p style="font-size:12px;color:#40534c;margin:0;">Submission ID: ${escapeHtml(input.submissionId)}</p>
  </body></html>`;

  return sendViaResend({
    to: input.to,
    subject: `New intake: ${input.submitterName} (${input.recentTitle})`,
    html,
  });
}

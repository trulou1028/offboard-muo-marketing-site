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
const REPLY_TO = "info@offboard.co";

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

/* The branded shell, ported from the app (owner 2026-09-15).
 *
 * `lumo-plan-builder` `origin/main`
 * `supabase/functions/_shared/email-templates/branded-shell.tsx` and its
 * `.lovable/memory/style/email-branded-shell-standard.md`: every Offboard
 * email, auth and transactional, renders inside one shell so they all look
 * like they come from the same company. These two did not, because they were
 * ported from the retiring site before that standard existed.
 *
 * Reproduced as plain HTML rather than imported. The app's version is React
 * Email running in a Deno edge function; this is a Next server module, and two
 * emails do not justify that dependency. The values below are copied from the
 * app's `emailStyles` so the two stay visually identical: page #f4f4f5, a white
 * card at 12px radius and 40px padding, the logo at 140px, #e4e4e7 dividers,
 * 24px headings in #1a1a1a and 15px body in #55575d. If the app's shell moves,
 * this is the file that has to follow, and COPY.md § 9 says so.
 *
 * The logo is the DARK artwork: the card is white, and the light file is the
 * one for the forest header (measured, it sits at 244 luminance on white and
 * would be invisible). The app serves its logo from its own Supabase storage,
 * which this project does not share, so it is served from this site instead.
 *
 * Unsubscribe links are deliberately absent, matching the app's rule: neither
 * of these is marketing, each is a direct reply to something the person did.
 */
const EMAIL_ORIGIN = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : /* Only reached outside Vercel, i.e. a local `next dev` that has a Resend
       key. Written out rather than imported from src/lib/site.ts so this
       change and the canonical-URL change can merge in either order; the two
       collapse into one constant once both are on main, and
       docs/cutover-checklist.md lists every place the domain is written. */
    "https://offboard.co";

/* Vercel's own production domain, which is the `.vercel.app` one until
   offboard.co is attached to the project and the custom domain after. Without
   it every email sent before the domain cutover would show a broken logo,
   because offboard.co still serves the retiring site. */
const LOGO_URL = `${EMAIL_ORIGIN}/marketing/homepage/offboard-logo-dark.png`;

const DARK_MODE_OVERRIDES =
  ":root{color-scheme:light only}body,.email-page{background-color:#f4f4f5}" +
  ".email-card{background-color:#ffffff}@media(prefers-color-scheme:dark){" +
  "body,.email-page{background-color:#f4f4f5!important;color:#1a1a1a!important}" +
  ".email-card{background-color:#ffffff!important;color:#1a1a1a!important}}";

const FONT_STACK =
  "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif";

export const emailStyles = {
  h1: `font-size:24px;font-weight:600;color:#1a1a1a;margin:0 0 16px;line-height:1.3;`,
  text: `font-size:15px;color:#55575d;line-height:1.6;margin:0 0 16px;`,
  subtext: `font-size:13px;color:#71717a;line-height:1.6;margin:0 0 8px;`,
  link: `color:#1a1a1a;text-decoration:underline;`,
  divider: `border-top:1px solid #e4e4e7;font-size:0;line-height:0;margin:24px 0;`,
  noteLabel: `font-size:12px;color:#71717a;text-transform:uppercase;letter-spacing:.06em;margin:0 0 6px;`,
  noteText: `font-size:15px;color:#1a1a1a;line-height:1.5;margin:0;white-space:pre-wrap;`,
} as const;

/** Wraps content in the same white card every Offboard email uses.
 *
 * TABLES, not divs (corrected 2026-09-15). The first port copied the app's
 * style values onto plain `<div>`s and Gmail closed the white card straight
 * after the logo, leaving the heading and body sitting on the client's own
 * background, which in dark mode was black. The app does not have that problem
 * because React Email's `<Container>` and `<Section>` render as tables; that is
 * the reason email templates use them at all. Reproducing the styles without
 * reproducing the markup was the mistake.
 *
 * So the card is a table cell. Nothing can escape a `<td>`, in any client.
 */
function brandedShell(input: { preview: string; body: string; footerText?: string }): string {
  const divider = `<div style="${emailStyles.divider}"></div>`;
  return `<!doctype html><html lang="en" dir="ltr"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-modes" content="light" />
<style>${DARK_MODE_OVERRIDES}</style>
</head>
<body class="email-page" style="margin:0;padding:0;background-color:#f4f4f5;font-family:${FONT_STACK};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(input.preview)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5;">
  <tr>
    <td align="center" style="padding:48px 24px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
        <tr>
          <td class="email-card" style="background-color:#ffffff;border-radius:12px;padding:40px;font-family:${FONT_STACK};">
            <img src="${LOGO_URL}" alt="Offboard" width="140" style="display:block;margin:0 auto 8px;border:0;" />
            ${divider}
            ${input.body}
            ${divider}
            ${input.footerText ? `<div style="font-size:12px;color:#a1a1aa;line-height:1.5;margin:0 0 8px;text-align:center;">${input.footerText}</div>` : ""}
            <div style="font-size:12px;color:#a1a1aa;text-align:center;margin:0;">&copy; ${new Date().getFullYear()} Offboard</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body></html>`;
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
  const html = brandedShell({
    preview: "We got your intake and will reach out directly.",
    body: `
    <h1 style="${emailStyles.h1}">Thanks for filling that out</h1>
    <p style="${emailStyles.text}">Hi ${escapeHtml(input.firstName)},</p>
    <p style="${emailStyles.text}">We got your intake and one of us (probably Steph or Louie) will review it and reach out directly, usually within a few days.</p>
    <p style="${emailStyles.text}">In the meantime, keep an eye on your inbox. If anything urgent comes up, just reply to this email.</p>
    <p style="${emailStyles.text}"><a href="${EMAIL_ORIGIN}" style="${emailStyles.link}">Back to offboard.co</a></p>`,
  });
  /* "We got your intake, Offboard" until 2026-09-15, which read as though it
     was addressing the reader as Offboard. The sender name already says who
     it is from; the subject now greets the person, matching the body's
     "Hi <first name>,". Found by the launch smoke test, which was the first
     time anyone read this email as a recipient. */
  return sendViaResend({ to: input.to, subject: `We got your intake, ${input.firstName}`, html });
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
        `<div style="margin-bottom:16px;"><p style="${emailStyles.noteLabel}">${escapeHtml(
          f.label,
        )}</p><p style="${emailStyles.noteText}">${escapeHtml(f.value || "—")}</p></div>`,
    )
    .join("");

  const html = brandedShell({
    preview: `New intake from ${input.submitterName}.`,
    body: `
    <h1 style="${emailStyles.h1}">New intake from ${escapeHtml(input.submitterName)}</h1>
    <p style="${emailStyles.text}">Reply directly to <a href="mailto:${escapeHtml(
      input.submitterEmail,
    )}" style="${emailStyles.link}">${escapeHtml(input.submitterEmail)}</a>.</p>
    <hr style="${emailStyles.divider}" />
    ${rows}`,
    footerText: `Submission ID: ${escapeHtml(input.submissionId)}`,
  });

  return sendViaResend({
    to: input.to,
    subject: `New intake: ${input.submitterName} (${input.recentTitle})`,
    html,
  });
}

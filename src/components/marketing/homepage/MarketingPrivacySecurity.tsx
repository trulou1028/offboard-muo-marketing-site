import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  FaqSection,
  FinalCta,
  MarketingShell,
  PageHero,
} from "./MarketingSite";

/* Privacy & Security (plan 034, phase 3 of the site-architecture roadmap).
   The strategy doc calls this page mandatory: Career Context only works if a
   person will put their real history into it, and nobody does that without
   knowing who can read it.

   Every claim here is ported from the app repo's claims register,
   SECURITY_CLAIMS.md on lumo-plan-builder origin/main, and from the /security
   page Sprint 119 rewrote from it. The register's rule holds: a sentence
   ships only if §1 names the control that proves it. §3's warnings are
   honored literally - never "impossible", never "we cannot read it", never
   "never shared", and no certification we do not hold. Copy: COPY.md § 15,
   which also carries the one open verification flag (connected assistants).

   Two app-page numbers are deliberately not carried over: the per-endpoint
   rate-limit figures and the server-function count. Both are true and both
   rot without a verified-facts ledger row; the controls ship without them. */

type Access = "yes" | "no" | "limited";

type Row = {
  data: string;
  detail: string;
  cells: readonly (readonly [Access, string])[];
};

const COLUMNS = [
  ["You", ""],
  ["Offboard staff", "through the product"],
  ["Lumo", "our AI guide"],
  ["AI providers", "OpenAI and Anthropic"],
] as const;

const ROWS: readonly Row[] = [
  {
    data: "Your Career Context",
    detail: "work history, projects, and outcomes",
    cells: [
      ["yes", "Always"],
      ["no", "No read path exists in the product"],
      ["yes", "Yes. This is what it works from"],
      ["limited", "Processed to run a feature you asked for, with retention off. Never for training"],
    ],
  },
  {
    data: "Resumes and documents",
    detail: "uploads, drafts, cover letters",
    cells: [
      ["yes", "Always"],
      ["no", "No"],
      ["limited", "Only what you share in a conversation or run through a resume feature"],
      ["limited", "Processed to power tailoring and parsing, with retention off"],
    ],
  },
  {
    data: "Money numbers",
    detail: "severance, runway, budgets",
    cells: [
      ["yes", "Always"],
      ["no", "Not shown in any admin screen. A database admin role exists for account support, and analytics store a risk band only"],
      ["limited", "A computed runway estimate, only if you saved numbers and keep it enabled. Never the raw amounts"],
      ["limited", "Only inside a feature you run, with retention off"],
    ],
  },
  {
    data: "Lumo conversations",
    detail: "what you ask and what it answers",
    cells: [
      ["yes", "Always"],
      ["no", "No read path exists in the product"],
      ["yes", "Yes. It is the conversation"],
      ["limited", "Sent to generate the reply, with retention off. Never for training"],
    ],
  },
  {
    data: "Google Calendar",
    detail: "if you connect it",
    cells: [
      ["yes", "Always"],
      ["no", "No"],
      ["no", "Excluded from AI context entirely"],
      ["no", "Never sent to AI models"],
    ],
  },
];

const RECEIPTS = [
  ["Only your account reaches your rows", "Row-Level Security is enforced on every sensitive table in our database. Your session can only ever query data that belongs to you. Cross-account leakage is prevented at the database layer."],
  ["No admin read paths", "There is no screen, role, or query in the product that shows our team your Career Context, your resume, or your finances. Those are blocked at the database layer, and money numbers are excluded from every admin query and screen."],
  ["Exactly two AI providers", "OpenAI, called with retention disabled on every request, and Anthropic, whose API does not train on customer data. Nothing you write goes to any other AI company."],
  ["Delete means delete", "Deleting your account removes your database rows and your uploaded files, across every storage bucket. Not just the visible parts."],
] as const;

const SPONSOR_SEES = [
  "How many people claimed access",
  "How many are active",
  "Aggregate engagement and outcomes",
] as const;

const SPONSOR_NEVER = [
  "Your resume",
  "Your applications",
  "Your Lumo conversations",
  "Your money numbers",
  "Anything you write",
] as const;

const RIGHTS = [
  "01 See and edit everything you have put in, at any time.",
  "02 Delete a single document, a single entry, or your whole account. Account deletion removes your files too.",
  "03 Export your resumes and documents whenever you want.",
  "04 We do not sell your data. To power AI features it passes through OpenAI and Anthropic only, under the retention and no-training terms above.",
] as const;

const SPECIFICS = [
  ["Sign-in and sessions", "Google sign-in and email magic links, handled by Supabase Auth with the PKCE flow. Sessions use short-lived tokens that refresh automatically. AI provider keys live only on our servers as encrypted secrets, and never reach your browser."],
  ["Your files", "Resumes, documents, and voice notes live in private storage buckets keyed to your account. There are no public links. Files are served through time-limited signed URLs that expire on their own, with random filenames, a size cap, and file-type validation on upload."],
  ["AI, precisely", "Two providers, no more: OpenAI and Anthropic. Every OpenAI request is sent with retention disabled, so your data is not stored or used for training, and Anthropic's API does not train on customer data. Google Calendar data is excluded from AI context entirely, under Google's Limited Use policy. We verified all of this live on 2 July 2026."],
  ["Validation and abuse limits", "Requests are checked against a schema before we act on them. AI and abuse-prone endpoints are rate-limited per account."],
  ["Infrastructure and accountability", "Our database and file storage are managed by Supabase, which encrypts data at rest and in transit at the hosting layer, not end to end. We minimize identifiers in our server logs: user IDs are truncated and emails are masked. Admin actions are written to an audit log. We maintain a claims register that maps every public security claim to the code that enforces it, and we ran a full audit and hardening pass against it in July 2026."],
] as const;

/* The glyph is decorative; the sr-only word is what a screen reader hears,
   because "Always" alone does not say whether the answer is yes or no. */
const ACCESS_WORD: Record<Access, string> = { yes: "Yes.", no: "No.", limited: "Limited." };

function WhoSeesWhat() {
  return (
    <section className="mh-privacy-who mh-section" aria-labelledby="who-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">The short answer</span>
        <h2 id="who-title">Who can see what.</h2>
      </div>
      <div className="mh-privacy-scroll" data-reveal="" tabIndex={0} role="region" aria-labelledby="who-title">
        <table className="mh-privacy-table">
          <thead>
            <tr>
              <th scope="col">What you put in</th>
              {COLUMNS.map(([name, note]) => (
                <th scope="col" key={name}>
                  {name}
                  {note ? <small>{note}</small> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.data}>
                <th scope="row">
                  {row.data}
                  <small>{row.detail}</small>
                </th>
                {row.cells.map(([access, note], index) => (
                  <td key={COLUMNS[index][0]}>
                    <i className={`mh-privacy-mark is-${access}`} aria-hidden="true" />
                    <span>
                      <span className="mh-sr-only">{ACCESS_WORD[access]} </span>
                      {note}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mh-privacy-stack" data-reveal="">
        {ROWS.map((row) => (
          <li key={row.data}>
            <h3>
              {row.data}
              <small>{row.detail}</small>
            </h3>
            <dl>
              {row.cells.map(([access, note], index) => (
                <div key={COLUMNS[index][0]}>
                  <dt>{COLUMNS[index][0]}</dt>
                  <dd>
                    <i className={`mh-privacy-mark is-${access}`} aria-hidden="true" />
                    <span>
                      <span className="mh-sr-only">{ACCESS_WORD[access]} </span>
                      {note}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <p className="mh-privacy-note">Sponsors are not a column here because they see none of it. That rule has its own section below.</p>
    </section>
  );
}

function Receipts() {
  return (
    <section className="mh-ctx mh-section" aria-labelledby="receipts-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">The receipts</span>
        <h2 id="receipts-title">Four things we can show you, not just say.</h2>
      </div>
      <div className="mh-capabilities" data-reveal="">
        {RECEIPTS.map(([title, body]) => (
          <div className="mh-capability" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Sponsors() {
  return (
    <section className="mh-privacy-sponsor mh-section" aria-labelledby="sponsor-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-lime">Sponsored access</span>
        <h2 id="sponsor-title">A sponsor sees a number. A sponsor never sees you.</h2>
        <p>Your former employer, school, or workforce program may cover your Offboard access. That pays for the account. It does not buy a view into it.</p>
        <p className="mh-privacy-contractual">That privacy line is contractual, not a preference. Not the CEO, not HR, nobody.</p>
      </div>
      <div className="mh-privacy-split" data-reveal="">
        <div>
          <h3>What a sponsor sees</h3>
          <ul className="mh-plain-list ruled">
            {SPONSOR_SEES.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </div>
        <div>
          <h3>What a sponsor never sees</h3>
          <ul className="mh-plain-list ruled">
            {SPONSOR_NEVER.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ConnectedAssistants() {
  return (
    <section className="mh-wherever mh-section" aria-labelledby="connected-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">Connected assistants</span>
        <h2 id="connected-title">A connection you authorize sends your record somewhere we do not run.</h2>
        <p>Offboard can connect to assistants you already use. When you authorize one, the parts of your record you allow are read into that conversation, and from that point the conversation lives in your account with that provider, under that provider&apos;s terms. Offboard&apos;s own retention terms cover the requests Offboard makes, not the ones you make inside someone else&apos;s product.</p>
        <p>A connection is scoped to what you authorize, and you can end it at any time. Your record stays with Offboard.</p>
        <Link className="mh-section-link" href="/integrations">See how connections work <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

function HonestPart() {
  return (
    <section className="mh-privacy-honest mh-section" aria-labelledby="honest-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-lime">The honest part</span>
        <h2 id="honest-title">Where the line actually sits.</h2>
      </div>
      <div className="mh-privacy-honest-body" data-reveal="">
        <p>Offboard does not use end-to-end encryption. Our AI features need to read your text as text: a resume tailor cannot rewrite a bullet it cannot see. That means our servers process your data in readable form, and, like every cloud product, the company that hosts our database and the people who hold our service keys could technically reach it.</p>
        <p>We weighed the alternatives. On-device AI is not good enough yet to do this work. A key only you hold would mean one forgotten password erases your record forever, and it would break everything that helps you while you are away, like reminders and weekly summaries. So we chose readable processing plus strict access control, and we tell you exactly where the line sits. If that ever changes, it will change on this page first.</p>
        <p>What stands between that technical possibility and a person reading your record: no admin read paths exist in the product, identifiers are minimized in our server logs, admin actions are written to an audit log, and every sentence on this page is tied to a control in our claims register.</p>
        <p className="mh-privacy-certs">We do not hold a SOC 2 or ISO certification, and we will not imply otherwise. When that changes, it will say so here.</p>
      </div>
    </section>
  );
}

function YourCall() {
  return (
    <section className="mh-route-privacy mh-section" aria-labelledby="rights-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">Your data, your call</span>
        <h2 id="rights-title">These are product features, not legal concessions.</h2>
        <p>You do not need to cite a regulation to use any of them.</p>
      </div>
      <ul className="mh-plain-list ruled" data-reveal="">
        {RIGHTS.map((line) => <li key={line}>{line}</li>)}
      </ul>
      <p className="mh-privacy-note">These map to the rights GDPR and CCPA give you, wherever you live. Found something, or have a question this page does not answer? Email <a href="mailto:hello@offboard.co">hello@offboard.co</a>. A human reads it.</p>
    </section>
  );
}

export function MarketingPrivacySecurity() {
  return (
    <MarketingShell current="privacy-security">
      <main id="main-content">
        <PageHero
          layout="relume-47"
          kicker="Privacy and security"
          title="You are trusting us with more than a resume."
          body="Severance math. Runway numbers. The things you would only write down at 1am. This page answers the question that actually matters: who can see it, and who cannot."
          current="privacy-security"
          aside={false}
          cta="Get started free"
          footnote="Every claim below maps to a specific control in our code. We keep a claims register, audited it in July 2026, and fixed what did not hold up."
        />
        <WhoSeesWhat />
        <Receipts />
        <Sponsors />
        <ConnectedAssistants />
        <HonestPart />
        <FaqSection title="For the reader who wants receipts." items={SPECIFICS} />
        <YourCall />
        <FinalCta
          title="Now you know exactly what you are trusting us with."
          body="Build your Career Context knowing who can see it, who cannot, and what you can delete."
        />
      </main>
    </MarketingShell>
  );
}

import type { ReactNode } from "react";
import {
  AiReply,
  FinalCta,
  LumoMark,
  MarketingShell,
  PageHero,
  SIGN_UP_URL,
  TrackerCard,
  YouBubble,
} from "./MarketingSite";
import { IntegrationLogo, type IntegrationLogoId } from "./IntegrationLogos";

/* Offboard Everywhere (plan 028, rebuilt as a showcase in plan 033) - the
   second pillar of the owner's site-architecture strategy and the
   consumer-facing version of the connected-assistant story. Deliberately
   never says "MCP". Copy: COPY.md § 11.

   Plan 033 (owner direction 2026-09-01): the page leads with the card grid of
   real integrations instead of a long prose section. The "The idea" editorial
   block was cut and its thesis moved onto the grid's own H2. ChatGPT and
   Claude are confirmed live in beta, which closes the first of plan 028's two
   owner-verification flags; the permissions model is still principle-only. */

type Integration = {
  id: IntegrationLogoId;
  name: string;
  status: "Live" | "Beta" | "In progress";
  body: string;
};

const CONNECTED: readonly Integration[] = [
  { id: "google-calendar", name: "Google Calendar", status: "Live", body: "Interviews and deadlines land on the calendar you already keep." },
  { id: "google-drive", name: "Google Drive", status: "Live", body: "Save resumes and cover letters straight to your Drive." },
  { id: "calendly", name: "Calendly", status: "Live", body: "Book networking calls and coffee chats without leaving your search." },
  { id: "chatgpt", name: "ChatGPT", status: "Beta", body: "Save a role, move an application forward, or add to your Career Context from a ChatGPT conversation." },
  { id: "claude", name: "Claude", status: "Beta", body: "Work through a project or an interview in Claude and have what you decide land back in your record." },
];

const IN_PROGRESS: readonly Integration[] = [
  { id: "gmail", name: "Gmail", status: "In progress", body: "Follow application email and replies without hunting through your inbox." },
  { id: "notion", name: "Notion", status: "In progress", body: "Export your job search record to Notion." },
];

const CAPABILITIES = [
  ["Save an opportunity", "Turn a role you are already discussing into a tracked opportunity, without filling out a form."],
  ["Move it forward", "Change a stage, add a recruiter, record what happened in an interview, or leave yourself a note."],
  ["Add to your Career Context", "Capture a project, an outcome, or a story while it is fresh, straight from the conversation."],
  ["Ask across your whole search", "Compare opportunities, or ask what needs attention, against everything Offboard already holds."],
] as const;

const PERMISSIONS = [
  "01 A connection is scoped. An assistant works with the parts of your Career Context you authorize, not everything in your account.",
  "02 You can review and change what a connected assistant can reach.",
  "03 You can disconnect an assistant at any time. Your record stays with Offboard.",
  "04 Sponsors never see your record. Sponsored access reports participation in aggregate only.",
] as const;

function IntegrationCard({ integration }: { integration: Integration }) {
  const { id, name, status, body } = integration;
  return (
    <article className="mh-int-card">
      <div className="mh-int-card-hero">
        <IntegrationLogo id={id} />
        <em className={`mh-int-status is-${status.split(" ")[0].toLowerCase()}`}>{status}</em>
      </div>
      <h4 className="mh-int-name">{name}</h4>
      <p>{body}</p>
    </article>
  );
}

function Showcase() {
  return (
    <section className="mh-int-showcase mh-section" aria-labelledby="showcase-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">What connects</span>
        <h2 id="showcase-title">Offboard holds the record. You choose the interface.</h2>
        <p>Connect the tools you already work in. Offboard keeps one record of your search, and a connection reads and updates it with your permission.</p>
      </div>
      <h3 className="mh-int-grouphead">Connected today</h3>
      <div className="mh-int-grid" data-reveal="">
        {CONNECTED.map((integration) => <IntegrationCard key={integration.id} integration={integration} />)}
      </div>
      <h3 className="mh-int-grouphead">In progress</h3>
      <div className="mh-int-grid is-quiet" data-reveal="">
        {IN_PROGRESS.map((integration) => <IntegrationCard key={integration.id} integration={integration} />)}
      </div>
      <p className="mh-int-note">ChatGPT and Claude are in beta. They work today and we are still refining them. The ones marked in progress are being built, and we do not put dates on them.</p>
    </section>
  );
}

function Demo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <span className="mh-qblock-feature">{label}</span>
      <div className="mh-chat-card" aria-label={`Example ${label} conversation with Offboard connected`}>
        {children}
      </div>
    </div>
  );
}

function Demos() {
  return (
    <section className="mh-wherever mh-section" aria-labelledby="demos-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">In practice</span>
        <h2 id="demos-title">The same record, from wherever you are working.</h2>
      </div>
      <div className="mh-qgrid" data-reveal="">
        <Demo label="ChatGPT">
          <YouBubble>I think I&apos;m going to apply to this. Add it to Offboard.</YouBubble>
          <AiReply highlight="Done." card={<TrackerCard />}>
            I&apos;ve added the role to your Offboard tracker and saved the company context.
          </AiReply>
        </Demo>
        <Demo label="Claude">
          <YouBubble>Add the project outcomes we just discussed to my Career Context.</YouBubble>
          <AiReply highlight="Done.">I&apos;ve added the migration project and its results to your experience.</AiReply>
        </Demo>
        <Demo label="Lumo">
          <YouBubble>Which applications need attention today?</YouBubble>
          <AiReply>Three need follow-up. Tesserac has an interview on Thursday, and two applications have been open for more than two weeks without a reply.</AiReply>
        </Demo>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="mh-ctx mh-section" aria-labelledby="int-caps-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">From a conversation</span>
        <h2 id="int-caps-title">What you can do without switching tabs.</h2>
      </div>
      <div className="mh-capabilities" data-reveal="">
        {CAPABILITIES.map(([title, body]) => (
          <div className="mh-capability" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Permissions() {
  return (
    <section className="mh-route-privacy mh-section" aria-labelledby="permissions-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">Permissions</span>
        <h2 id="permissions-title">You decide what a connected assistant can reach.</h2>
        <p>Connecting an assistant does not hand over your whole account. You authorize what it can read and what it can change, and the connection is yours to end.</p>
      </div>
      <ul className="mh-plain-list ruled" data-reveal="">
        {PERMISSIONS.map((line) => <li key={line}>{line}</li>)}
      </ul>
    </section>
  );
}

function PreferLumo() {
  return (
    <section className="mh-lumo-band mh-section" aria-labelledby="prefer-lumo-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-lime">Or use Lumo</span>
        <h2 id="prefer-lumo-title">Lumo is the assistant that lives inside your record.</h2>
        <p>If you would rather not connect anything, Lumo works from the same Career Context without leaving Offboard. Connecting an outside assistant is an option, not a requirement.</p>
        <a className="mh-ai-cta" href={SIGN_UP_URL}><LumoMark className="is-dot" /><span>Ask Lumo</span></a>
      </div>
    </section>
  );
}

export function MarketingIntegrations() {
  return (
    <MarketingShell current="integrations">
      <main id="main-content">
        <PageHero
          kicker="Offboard everywhere"
          title="Use Offboard from the AI you already use."
          body="Your job search does not live in one tab. Connect Offboard to the assistants you already work in, and save opportunities, update applications, and add to your Career Context from wherever the conversation happens."
          current="integrations"
          aside={false}
          cta="Get started free"
        />
        <Showcase />
        <Demos />
        <Capabilities />
        <Permissions />
        <PreferLumo />
        <FinalCta
          title="Keep your search in one place, wherever you work."
          body="Build your Career Context once, then reach it from Offboard or from the assistants you already use."
        />
      </main>
    </MarketingShell>
  );
}

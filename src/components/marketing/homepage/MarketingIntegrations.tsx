import type { ReactNode } from "react";
import {
  AiReply,
  EditorialGrid,
  FinalCta,
  LumoMark,
  MarketingShell,
  PageHero,
  SIGN_UP_URL,
  TrackerCard,
  YouBubble,
} from "./MarketingSite";

/* Offboard Everywhere (plan 028) - the second pillar of the owner's
   site-architecture strategy and the consumer-facing version of the
   connected-assistant story. Deliberately never says "MCP". Copy: COPY.md
   § 11, which also carries the two owner-verification flags (which
   assistants are live, and the real permissions model). Every section
   reuses an existing pattern; the page mints no new classes. */

const CONTRAST = [
  { title: "Without a shared record", body: "Every assistant starts from nothing. You paste your resume again, re-explain your search, and whatever you work out disappears when the conversation ends." },
  { title: "With Offboard connected", body: "The assistant starts from your Career Context, and the work you do in conversation lands back in your record instead of evaporating." },
  { title: "What that changes", body: "You stop maintaining your job search in two places, and you stop losing the useful parts of conversations you already had." },
] as const;

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

function TheIdea() {
  return (
    <EditorialGrid
      kicker="The idea"
      title="Offboard holds the record. You choose the interface."
      body="Offboard keeps the structured record of your search: your Career Context, the opportunities you are pursuing, the companies you are researching, and what happened with each one. A connected assistant reads and updates that record with your permission. The record stays in one place no matter which tool you happen to be working in."
      items={CONTRAST}
    />
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
        <TheIdea />
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

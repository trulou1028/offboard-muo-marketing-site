import Image from "next/image";
import type { ReactNode } from "react";
import { Eye, Power, ShieldCheck } from "lucide-react";
import {
  AiReply,
  AlsoStrip,
  FinalCta,
  LumoMark,
  MarketingShell,
  PageHero,
  TrackerCard,
  YouBubble,
} from "./MarketingSite";
import { IntegrationLogo, type IntegrationLogoId } from "./IntegrationLogos";

/* Integrations (plan 028, rebuilt as a showcase in plan 033, renamed from
   "Offboard Everywhere" by the owner on 2026-09-13) - the
   second pillar of the owner's site-architecture strategy and the
   consumer-facing version of the connected-assistant story. Deliberately
   never says "MCP". Copy: COPY.md § 11.

   Plan 033 (owner direction 2026-09-01): the page leads with the card grid of
   real integrations instead of a long prose section. The "The idea" editorial
   block was cut and its thesis moved onto the grid's own H2. ChatGPT and
   Claude are confirmed live in beta. The permissions model was verified
   against the app's Full access, Read only, and Off controls on 2026-09-16. */

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

const ALL_INTEGRATIONS: readonly Integration[] = [...CONNECTED, ...IN_PROGRESS];

const PERMISSIONS = [
  "01 Every connected assistant has its own access level.",
  "02 Read only can see your account, but cannot change anything or spend credits.",
  "03 Full access can read, write, and run the tools that spend credits.",
  "04 Turn an assistant off at any time. Your record stays with Offboard.",
  "05 Sponsors never see your record. Sponsored access reports participation in aggregate only.",
] as const;

const ACCESS_LEVELS = [
  { icon: ShieldCheck, name: "Full access", detail: "Read, write, and run tools that spend credits." },
  { icon: Eye, name: "Read only", detail: "See your account without changing it or spending credits." },
  { icon: Power, name: "Off", detail: "No access. Your Offboard record stays in place." },
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
      </div>
      <div className="mh-int-grid" data-reveal="">
        {ALL_INTEGRATIONS.map((integration) => <IntegrationCard key={integration.id} integration={integration} />)}
      </div>
      <p className="mh-int-note">ChatGPT and Claude are in beta. They work today and we are still refining them. The ones marked in progress are being built, and we do not put dates on them.</p>
    </section>
  );
}

function Demo({ label, logo, children }: { label: string; logo: ReactNode; children: ReactNode }) {
  return (
    <div className="mh-int-demo">
      <span className="mh-int-demo-label">{logo}<strong>{label}</strong></span>
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
      <div className="mh-int-demo-stack" data-reveal="">
        <Demo label="ChatGPT" logo={<IntegrationLogo id="chatgpt" />}>
          <YouBubble>I think I&apos;m going to apply to this. Add it to Offboard.</YouBubble>
          <AiReply highlight="Done." card={<TrackerCard />}>
            I&apos;ve added the role to your Offboard tracker and saved the company context.
          </AiReply>
        </Demo>
        <Demo label="Claude" logo={<IntegrationLogo id="claude" />}>
          <YouBubble>Add the project outcomes we just discussed to my Career Context.</YouBubble>
          <AiReply highlight="Done.">I&apos;ve added the migration project and its results to your experience.</AiReply>
        </Demo>
        <Demo label="Lumo" logo={<span className="mh-int-lumo-logo"><LumoMark /></span>}>
          <YouBubble>Which applications need attention today?</YouBubble>
          <AiReply>Three need follow-up. Tesserac has an interview on Thursday, and two applications have been open for more than two weeks without a reply.</AiReply>
        </Demo>
      </div>
    </section>
  );
}

/* "What you can do without switching tabs" left in plan 045's messaging
   pass: its four capabilities restated the three demos directly above it.
   COPY.md § 11 keeps the copy. */
function Permissions() {
  return (
    <section className="mh-route-privacy mh-section" aria-labelledby="permissions-title">
      <div className="mh-split">
        <div className="mh-copy-block">
          <span className="mh-kicker">Permissions</span>
          <h2 id="permissions-title">You decide what a connected assistant can do.</h2>
          <p>Give each connected assistant full access, read-only access, or no access. You can change that level at any time in Settings.</p>
          <ul className="mh-plain-list ruled" data-reveal="">
            {PERMISSIONS.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </div>
        <div className="mh-permission-levels" aria-label="Connected assistant access levels" data-reveal="">
          <span>Access level</span>
          {ACCESS_LEVELS.map(({ icon: Icon, name, detail }) => (
            <article key={name}>
              <Icon aria-hidden="true" />
              <div><strong>{name}</strong><p>{detail}</p></div>
            </article>
          ))}
          <small>Change access any time in Settings.</small>
        </div>
      </div>
    </section>
  );
}

/* "Or use Lumo" became an item in the shared AlsoStrip (plan 046). */
export function MarketingIntegrations() {
  return (
    <MarketingShell current="integrations">
      <main id="main-content" className="mh-page-integrations mh-overlap-page">
        <PageHero
          kicker="Integrations"
          title="Use Offboard from the AI you already use."
          body="Your job search does not live in one tab. Connect Offboard to the assistants you already work in, and save opportunities, update applications, and add to your Career Context from wherever the conversation happens."
          current="integrations"
          aside={false}
          cta="Get started free"
        />
        <div className="mh-product-overlap mh-integrations-preview mh-section"><figure className="mh-lumo-product-shot"><Image src="/marketing/app/integrations-live-v1.png" alt="Offboard integration settings showing Google Calendar, Google Drive, Calendly, and upcoming Gmail and Notion connections" width={3024} height={1620} sizes="(max-width: 1280px) calc(100vw - 48px), 1200px" /></figure></div>
        <Showcase />
        <Demos />
        <Permissions />
        <AlsoStrip items={[
          { title: "Lumo is the assistant that lives inside your record.", body: "If you would rather not connect anything, Lumo works from the same Career Context without leaving Offboard. Connecting an outside assistant is an option, not a requirement.", href: "/lumo", cta: "See how Lumo works" },
          { title: "One record, whichever door you use.", body: "Every connection reads from and writes to your Career Context. Build it once and it is there in Offboard, in ChatGPT, and in Claude.", href: "/career-context", cta: "See what it holds" },
        ]} />
        <FinalCta
          title="Keep your search in one place, wherever you work."
          body="Build your Career Context once, then reach it from Offboard or from the assistants you already use."
        />
      </main>
    </MarketingShell>
  );
}

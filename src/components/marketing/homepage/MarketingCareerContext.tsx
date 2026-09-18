import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  AlsoStrip,
  FinalCta,
  MarketingShell,
  PageHero,
  Shot,
} from "./MarketingSite";
import { CareerContextExample } from "./CareerContextExample";

/* Career Context pillar page (plan 025; restructured by plan 042 around the
   record; visual pass by plan 046). Copy: COPY.md § 10.

   Plan 046 (owner 2026-09-07): the resume-sheet composition and the
   "ContrastSection" that held it are gone; "The problem" is now a photo
   split, so the page shows a person before it shows a card. What the record
   holds renders as the record itself (one card, eight rows), the same shape
   the hero card and the Lumo page use, instead of eight icon tiles. The two
   thin ruled sections (inputs, outputs) are one "In and out" split. The
   sibling promo band became the shared AlsoStrip. */

const HOLDS = [
  ["Experience", "Roles, skills, accomplishments, and outcomes."],
  ["Applications", "Every opportunity and what happened with it."],
  ["Companies", "Research, notes, people, and hiring signals."],
  ["Contacts", "Recruiters, hiring managers, and referrals."],
  ["Documents", "Resumes, job descriptions, and other files."],
  ["Interviews", "Conversations, preparation, notes, and next steps."],
  ["Preferences", "The work you want, where, and on what terms."],
  ["Goals", "What you are working toward and what needs attention."],
] as const;

const IMPORT_CHIPS = ["Resume", "LinkedIn", "ChatGPT history", "Portfolio and documents", "Interview stories"] as const;

const GOES_IN = [
  ["You apply to a role", "The role, the company research, and the materials you used stay connected to the outcome."],
  ["You finish an interview", "Questions asked, answers given, and what to prepare next become part of the record."],
  ["You talk it through", "Decisions and updates you make in conversation, with Lumo or a connected assistant, land in your Career Context instead of vanishing."],
] as const;

const COMES_OUT = [
  ["Tailored resumes", "Resume versions built from your real history, tuned to the role in front of you."],
  ["Application Packets", "The role, the company, your positioning, and your materials in one place."],
  ["Interview preparation", "Prep plans and practice grounded in your actual experience and the actual role."],
  ["Better decisions", "Compare opportunities against your experience, preferences, and how your search is going."],
] as const;

/* Three rows, not four (plan 046): "connected assistants see what you
   authorize" and "sponsors never see your record" were also rows on
   /integrations and the whole answer lives on /privacy-security, which the
   list now hands off to. */
const OWNERSHIP = [
  "You choose what goes in, and you can edit or remove anything.",
  "Connected assistants and sponsors see only what you authorize, never the whole record.",
  "You can export what you have built. It is yours.",
] as const;

function ProblemSection() {
  return (
    <section className="mh-route-story mh-section mh-split" aria-labelledby="problem-title">
      <div className="mh-route-story-photo"><Image src="/marketing/site-imagery/documentary/career-context-reflection-civic-modern-v1.webp" alt="A woman at her dining table with a laptop, an open notebook and printed pages, thinking through what to write down" fill sizes="(max-width: 900px) 100vw, 44vw" /></div>
      <div className="mh-copy-block">
        <span className="mh-kicker">The problem</span>
        <h2 id="problem-title">A resume is a fraction of your career.</h2>
        <p>A resume compresses years of work into one page for one audience. It leaves out the projects that went well, the numbers behind them, the people you worked with, what you learned in interviews, and what you actually want next. So every new tool, and every new conversation, starts from scratch.</p>
        <strong className="mh-payoff">Every time you explain yourself to a new tool or a new chat window, the context evaporates when the tab closes.</strong>
      </div>
    </section>
  );
}

function HoldsSection() {
  return (
    <section className="mh-ctx mh-section" aria-labelledby="holds-title">
      <div className="mh-split">
        <div className="mh-copy-block">
          <span className="mh-kicker">What it holds</span>
          <h2 id="holds-title">Eight kinds of record, one place.</h2>
          <p>Offboard builds the first version from the things you already have, in minutes, and it keeps getting better as you use it.</p>
          <div className="mh-holds-sources">
            <span>Built from what you already have</span>
            <ul>{IMPORT_CHIPS.map((chip) => <li key={chip}>{chip}</li>)}</ul>
          </div>
        </div>
        <div className="mh-record-card mh-holds-card" aria-label="What a Career Context holds" data-reveal="">
          <strong>Your Career Context</strong>
          <p>One living record.</p>
          <ul>
            {HOLDS.map(([title, body]) => (
              <li key={title}><span>{title}</span><em>{body}</em></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function InOutSection() {
  return (
    <section className="mh-morethan mh-section" aria-labelledby="inout-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-sand">In and out</span>
        <h2 id="inout-title">Every step makes it smarter. Every output starts from it.</h2>
        <p>Choose a task to see which parts of one fictional record matter and what they help produce.</p>
      </div>
      <CareerContextExample />
      <div className="mh-inout mh-inout-support" data-reveal="">
        <div>
          <span>What goes in</span>
          <ul>{GOES_IN.map(([title, body]) => <li key={title}><strong>{title}</strong><p>{body}</p></li>)}</ul>
        </div>
        <div>
          <span>What comes out</span>
          <ul>{COMES_OUT.map(([title, body]) => <li key={title}><strong>{title}</strong><p>{body}</p></li>)}</ul>
        </div>
      </div>
    </section>
  );
}

function OwnershipSection() {
  return (
    <section className="mh-route-privacy mh-section" aria-labelledby="ownership-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">Private by default</span>
        <h2 id="ownership-title">Your Career Context belongs to you.</h2>
      </div>
      <ul className="mh-plain-list ruled is-numbered" data-reveal="">
        {OWNERSHIP.map((line) => <li key={line}>{line}</li>)}
      </ul>
      <Link className="mh-section-link" href="/privacy-security">See exactly who can see what <ArrowRight aria-hidden="true" /></Link>
    </section>
  );
}

export function MarketingCareerContext() {
  return (
    <MarketingShell current="career-context">
      <main id="main-content">
        <PageHero
          kicker="Career Context"
          title="Build your Career Context once. Use it everywhere."
          body="One living record of your experience, applications, companies, interviews, and goals. Offboard builds it with you and puts it to work in every tool you use."
          current="career-context"
          visual={<Shot plain src="/marketing/site-imagery/product-compositions/career-context-card-civic-modern-v3-transparent.webp" alt="A layered Career Context card with rows for experience, applications, interviews and goals, built from a resume and interview notes" width={1536} height={1024} />}
          cta="Get started free"
        />
        <ProblemSection />
        <HoldsSection />
        <InOutSection />
        <OwnershipSection />
        <AlsoStrip items={[
          { title: "Lumo starts every conversation already caught up.", body: "Because it works from your Career Context, you never re-upload a resume or re-explain your goals.", href: "/lumo", cta: "See how Lumo works" },
          { title: "Your context goes with you.", body: "Connect ChatGPT or Claude and your Career Context is there too. Save a role or add what you learned from wherever you are working.", href: "/integrations", cta: "See the integrations" },
        ]} />
        <FinalCta
          title="Stop starting from scratch."
          body="Build your Career Context once and every application, interview, and conversation after it starts further ahead."
        />
      </main>
    </MarketingShell>
  );
}

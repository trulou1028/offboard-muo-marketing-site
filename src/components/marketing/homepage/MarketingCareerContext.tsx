import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  ListChecks,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react";
import {
  AiReply,
  ContrastSection,
  FinalCta,
  MarketingShell,
  PageHero,
  YouBubble,
} from "./MarketingSite";

/* Career Context pillar page (plan 025) - the first page of the owner's
   site-architecture strategy. Copy: COPY.md § 10. Every section reuses an
   existing pattern; the page mints no new classes. Band rhythm: deep hero >
   paper > mist > sand > paper > forest > mist > white > forest. */

/* What the record holds. Moved here from the homepage on 2026-09-02: it
   restated the homepage section's own body paragraph, and this page - which
   is where a reader goes to find out what a Career Context actually is - had
   no structured account of it, only seven of the eight named in passing in
   the hero. "Preferences" keeps the wording already used by IMPORT_SOURCES'
   "Goals & preferences" rather than a second phrasing of the same thing. */
const HOLDS = [
  { icon: Briefcase, title: "Experience", body: "Roles, skills, accomplishments, and outcomes." },
  { icon: ListChecks, title: "Applications", body: "Every opportunity and what happened with it." },
  { icon: Building2, title: "Companies", body: "Research, notes, people, and hiring signals." },
  { icon: Users, title: "Contacts", body: "Recruiters, hiring managers, and referrals." },
  { icon: FileText, title: "Documents", body: "Resumes, job descriptions, and other files." },
  { icon: MessageSquare, title: "Interviews", body: "Conversations, preparation, notes, and next steps." },
  { icon: Bookmark, title: "Preferences", body: "The work you want, where, and on what terms." },
  { icon: Sparkles, title: "Goals", body: "What you are working toward and what needs attention." },
] as const;

/* Was a three-cell numbered grid, and the worst instance of it on the site:
   the odd-count rule promoted cell 01, "What a resume holds", to full width,
   making the resume the visual hero of a section arguing the resume is the
   small thing. Cells 1 and 2 are now shown rather than described (plan 042,
   DESIGN.md R13); cell 3 was the consequence and survives verbatim as the
   payoff line. */
function ResumeComposition() {
  return (
    <div className="mh-comp mh-resume-comp">
      <div className="mh-ui-card mh-resume-sheet mh-comp-base" aria-label="A resume, and the career it leaves out">
        <span>Resume.pdf</span>
        <div className="mh-resume-lines" aria-hidden="true">
          <em className="is-name" />
          <em className="is-role" />
          <em /><em /><em />
          <em className="is-role" />
          <em /><em />
        </div>
      </div>
      <ul className="mh-comp-satellite mh-resume-missing" aria-label="What the resume leaves out">
        <li>Project · Billing migration</li>
        <li>Story · Why we cut scope</li>
        <li>Goal · Staff role, remote</li>
      </ul>
    </div>
  );
}

/* The eight import sources used to be their own eight-card grid directly
   above the eight-card HOLDS grid: sixteen identical cards in a row, and the
   two lists overlapped ("Goals & preferences" against "Preferences" plus
   "Goals", "Applications & contacts" against "Applications" plus
   "Contacts"). The sources are now a chip row under the one grid that
   matters, which is what they always were: where the record comes from, not
   a second taxonomy of it. */
const IMPORT_CHIPS = ["Resume", "LinkedIn", "ChatGPT history", "Portfolio and documents", "Interview stories"] as const;

const IMPROVES = [
  ["You apply to a role", "Applications", "The role, the company research, and the materials you used stay connected to the outcome."],
  ["You finish an interview", "Interviews", "Questions asked, answers given, and what to prepare next become part of the record."],
  ["You talk it through", "Conversations", "Decisions and updates you make in conversation, with Lumo or a connected assistant, land in your Career Context instead of vanishing."],
] as const;

const OUTPUTS = [
  ["Tailored resumes", "Resume versions built from your real history, tuned to the role in front of you."],
  ["Application packets", "The role, the company, your positioning, and your materials in one place."],
  ["Interview preparation", "Prep plans and practice grounded in your actual experience and the actual role."],
  ["Better decisions", "Compare opportunities against your experience, preferences, and how your search is going."],
] as const;

/* Numbering is a CSS counter (`.is-numbered`), not a prefix baked into each
   string. It was "01 You choose...", which put presentation in the copy and
   meant COPY.md and the drift test had to carry it too. */
const OWNERSHIP = [
  "You choose what goes in, and you can edit or remove anything.",
  "Connected assistants see what you authorize, not everything.",
  "Sponsors only ever see aggregate participation, never your record.",
  "You can export what you have built. It is yours.",
] as const;

function ImprovesSection() {
  return (
    <section className="mh-morethan mh-section" aria-labelledby="improves-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-sand">Always evolving</span>
        <h2 id="improves-title">Every step of your search makes it smarter.</h2>
      </div>
      <div className="mh-qgrid" data-reveal="">
        {IMPROVES.map(([question, feature, body]) => (
          <article className="mh-qblock" key={question}>
            <h3>{question}</h3>
            <span className="mh-qblock-feature">{feature}</span>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HoldsSection() {
  return (
    <section className="mh-ctx mh-section" aria-labelledby="holds-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">What it holds</span>
        <h2 id="holds-title">Eight kinds of record, one place.</h2>
        <p>Offboard builds the first version from the things you already have, in minutes, and it keeps getting better as you use it.</p>
      </div>
      <div className="mh-ctx-grid" data-reveal="">
        {HOLDS.map(({ icon: IconComponent, title, body }) => (
          <article className="mh-ctx-card" key={title}>
            <IconComponent aria-hidden="true" />
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <div className="mh-holds-sources" data-reveal="">
        <span>Built from what you already have</span>
        <ul>{IMPORT_CHIPS.map((chip) => <li key={chip}>{chip}</li>)}</ul>
      </div>
    </section>
  );
}

function OutputsSection() {
  return (
    <section className="mh-ctx mh-section" aria-labelledby="outputs-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">Put it to work</span>
        <h2 id="outputs-title">One record. Every output.</h2>
      </div>
      <div className="mh-capabilities" data-reveal="">
        {OUTPUTS.map(([title, body]) => (
          <div className="mh-capability" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LumoUsesIt() {
  return (
    <section className="mh-lumo-band mh-section" aria-labelledby="cc-lumo-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-lime">Meet Lumo</span>
        <h2 id="cc-lumo-title">Lumo starts every conversation already caught up.</h2>
        <p>Because Lumo works from your Career Context, you never re-upload a resume, re-explain your goals, or reconstruct what happened with an application. You ask, and the answer starts from everything you have already built.</p>
        <Link className="mh-section-link" href="/lumo">See how Lumo works <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

function AssistantsSection() {
  return (
    <section className="mh-wherever mh-section" aria-labelledby="assistants-title">
      <div className="mh-wherever-grid">
        <div className="mh-copy-block">
          <span className="mh-kicker">Offboard, wherever you work</span>
          <h2 id="assistants-title">Your context goes with you.</h2>
          <p>Connect Offboard to supported AI assistants and your Career Context goes with you. Save an opportunity from a conversation, update an application, or add what you just learned, from whichever tool you are already in.</p>
        </div>
        <div className="mh-chat-card" aria-label="Example conversation updating a Career Context from an AI assistant" data-reveal="">
          <YouBubble>Save the interview questions I just worked through, and what I answered.</YouBubble>
          <AiReply highlight="Done.">I have added them to your interview stories.</AiReply>
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
          aside={<>
            <span>Your Career Context</span>
            <strong>One living record.</strong>
            <ul className="mh-hero-record-list">
              <li><span>Experience</span><em>Roles, projects, and outcomes</em></li>
              <li><span>Applications</span><em>Tesserac · Interviewing</em></li>
              <li><span>Interviews</span><em>Thursday · Prep ready</em></li>
            </ul>
          </>}
          cta="Get started free"
        />
        <ContrastSection
          kicker="The problem"
          title="A resume is a fraction of your career."
          body="A resume compresses years of work into one page for one audience. It leaves out the projects that went well, the numbers behind them, the people you worked with, what you learned in interviews, and what you actually want next. So every new tool, and every new conversation, starts from scratch."
          payoff="Every time you explain yourself to a new tool or a new chat window, the context evaporates when the tab closes."
        >
          <ResumeComposition />
        </ContrastSection>
        <HoldsSection />
        <ImprovesSection />
        <OutputsSection />
        <LumoUsesIt />
        <AssistantsSection />
        <OwnershipSection />
        <FinalCta
          title="Stop starting from scratch."
          body="Build your Career Context once and every application, interview, and conversation after it starts further ahead."
        />
      </main>
    </MarketingShell>
  );
}

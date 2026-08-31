import {
  Briefcase,
  Compass,
  FileText,
  FolderOpen,
  Linkedin,
  ListChecks,
  MessagesSquare,
  Mic,
} from "lucide-react";
import {
  AiReply,
  EditorialGrid,
  FinalCta,
  LumoMark,
  MarketingShell,
  PageHero,
  SIGN_UP_URL,
  YouBubble,
} from "./MarketingSite";

/* Career Context pillar page (plan 025) - the first page of the owner's
   site-architecture strategy. Copy: COPY.md § 10. Every section reuses an
   existing pattern; the page mints no new classes. Band rhythm: deep hero >
   paper > mist > sand > paper > forest > mist > white > forest. */

const RESUME_CONTRAST = [
  { title: "What a resume holds", body: "Titles, dates, and a dozen bullet points, tuned for the last role you applied to." },
  { title: "What your career holds", body: "Projects, outcomes, relationships, decisions, feedback, and direction. The material that makes your next application stronger." },
  { title: "What keeps getting lost", body: "Every time you explain yourself to a new tool or a new chat window, the context evaporates when the tab closes." },
] as const;

const IMPORT_SOURCES = [
  { icon: FileText, title: "Resume import", body: "Start from the document you have. Offboard turns it into structured experience you can build on." },
  { icon: Linkedin, title: "LinkedIn", body: "Bring your profile history in instead of retyping it." },
  { icon: MessagesSquare, title: "AI conversations", body: "Import the career context you have already built up in your ChatGPT history." },
  { icon: FolderOpen, title: "Portfolio & documents", body: "Work samples, case studies, and files that show what you did." },
  { icon: Briefcase, title: "Projects & outcomes", body: "The work behind the bullet points, with the results that made it matter." },
  { icon: Mic, title: "Interview stories", body: "The examples you reach for in interviews, saved once and ready to reuse." },
  { icon: Compass, title: "Goals & preferences", body: "The work you want, where, and on what terms." },
  { icon: ListChecks, title: "Applications & contacts", body: "The opportunities you are pursuing and the people connected to them." },
] as const;

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

const OWNERSHIP = [
  "01 You choose what goes in, and you can edit or remove anything.",
  "02 Connected assistants see what you authorize, not everything.",
  "03 Sponsors only ever see aggregate participation, never your record.",
  "04 You can export what you have built. It is yours.",
] as const;

function ImportsSection() {
  return (
    <section className="mh-wherever mh-section" aria-labelledby="imports-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">Start fast</span>
        <h2 id="imports-title">Bring what you already have.</h2>
        <p>Offboard builds the first version of your Career Context from the things you already have, in minutes. Then it keeps getting better as you use it.</p>
      </div>
      <div className="mh-ctx-grid" data-reveal="">
        {IMPORT_SOURCES.map(({ icon: IconComponent, title, body }) => (
          <article className="mh-ctx-card" key={title}>
            <IconComponent aria-hidden="true" />
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

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
        <a className="mh-ai-cta" href={SIGN_UP_URL}><LumoMark className="is-dot" /><span>Ask Lumo</span></a>
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
          <h2 id="assistants-title">Offboard holds the record. You choose the interface.</h2>
          <p>Connect Offboard to supported AI assistants and your Career Context goes with you. Save an opportunity from a conversation, update an application, or add what you just learned, from whichever tool you are already in.</p>
        </div>
        <div className="mh-chat-card" aria-label="Example conversation updating a Career Context from an AI assistant" data-reveal="">
          <YouBubble>Add the project outcomes we just discussed to my Career Context.</YouBubble>
          <AiReply highlight="Done.">I have added the migration project and its results to your experience.</AiReply>
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
      <ul className="mh-plain-list ruled" data-reveal="">
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
          title="Build your career context once. Use it everywhere."
          body="Your resume is one page about your past. Your Career Context is a living record of your experience, applications, companies, conversations, interviews, preferences, and goals. Offboard builds it with you and puts it to work in every tool you use."
          current="career-context"
          aside={false}
          cta="Create my Career Context"
        />
        <EditorialGrid
          kicker="The problem"
          title="A resume is a fraction of your career."
          body="A resume compresses years of work into one page for one audience. It leaves out the projects that went well, the numbers behind them, the people you worked with, what you learned in interviews, and what you actually want next. So every new tool, and every new conversation, starts from scratch."
          items={RESUME_CONTRAST}
        />
        <ImportsSection />
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

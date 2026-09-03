import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  EditorialGrid,
  FinalCta,
  MarketingShell,
  NumberedRows,
  PageHero,
} from "./MarketingSite";

/* Job Search pillar page (plan 031, the last of phase 2).

   Owner direction 2026-09-02 inverted the split with the homepage: the
   homepage now names the ten tools and THIS page describes them, because a
   reader who wants the detail is already on their way here. The ten
   description sentences below moved from MarketingHome.tsx; COPY.md §§ 1 and
   14 both record the move.

   The page's own argument is unchanged: the loop the tools form, and the
   fact that the loop has a memory, since the eighth step feeds the first.
   Copy: COPY.md § 14. Existing patterns only, no new classes. Bands: deep,
   paper, mist, paper, sand, forest, footer. */

const WHY_ONE_SYSTEM = [
  { title: "Ten tools, ten starting points", body: "Each one asks who you are before it can help, and none of them remembers what the last one learned." },
  { title: "One system, one record", body: "Every step reads from and writes to the same Career Context, so the work compounds instead of resetting." },
  { title: "What that changes", body: "The tenth application takes less effort than the first, because everything the first nine taught the system is still there." },
] as const;

const LOOP = [
  ["Find a role", "Something lands in front of you, from a board, a referral, or a conversation you were already having."],
  ["Decide if it is worth it", "Check the fit against your experience and goals, and look for signals that the posting may not be an actively hiring role."],
  ["Research the company", "What you learn is saved to the company, not to a chat window you will close."],
  ["Build the application", "Resume, cover letter, and positioning built from your record and the specific role."],
  ["Track it", "Stage, dates, contacts, and next steps, without a separate spreadsheet."],
  ["Prepare for the interview", "A prep plan from the company and role context you already gathered, and practice out loud."],
  ["Record what happened", "Questions asked, what you answered, and what to do next."],
  ["Your Career Context improves", "Which is why the next role starts further ahead than this one did."],
] as const;

const STAGES = [
  { name: "Decide", decides: "Whether this one deserves your week.", tools: [
    ["Role Fit", "Understand how an opportunity matches your experience, strengths, and goals."],
    ["Ghost Job Checker", "Look for signals that a posting may not represent an actively hiring role."],
    ["Company Intelligence", "Know who you're applying to before you invest your time."],
  ] },
  { name: "Apply", decides: "What you actually send.", tools: [
    ["Application Packets", "Bring together the role, company, resume strategy, positioning, and application materials in one place."],
    ["Resume Tailoring", "Adapt your resume using the opportunity and your Career Context."],
    ["Cover Letters", "Create relevant application messaging without starting from a blank page."],
  ] },
  { name: "Interview", decides: "Walking in prepared, not rehearsed.", tools: [
    ["Interview Prep", "Turn company and role context into a focused preparation plan."],
    ["Voice Practice", "Practice answering questions in a realistic voice conversation."],
  ] },
  { name: "Organize", decides: "Where all of it is kept.", tools: [
    ["Application Tracker", "Keep your entire pipeline current."],
    ["Career Context", "Connect the history behind every application, interaction, and outcome."],
  ] },
] as const;

function Loop() {
  return (
    <section className="mh-wherever mh-section" aria-labelledby="loop-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">How it runs</span>
        <h2 id="loop-title">Eight steps, and the last one feeds the first.</h2>
      </div>
      <div data-reveal="">
        <NumberedRows rows={LOOP} />
      </div>
    </section>
  );
}

function Stages() {
  return (
    <section className="mh-kit mh-section" aria-labelledby="stages-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">The toolkit</span>
        <h2 id="stages-title">Four stages, and what each one decides.</h2>
      </div>
      <div className="mh-kit-grid" data-reveal="">
        {STAGES.map(({ name, decides, tools }) => (
          <div className="mh-kit-col" key={name}>
            <h3>{name}</h3>
            <p className="mh-kit-decides">{decides}</p>
            {tools.map(([tool, body]) => (
              <div className="mh-kit-tool" key={tool}>
                <strong>{tool}</strong>
                <p>{body}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function TheMemory() {
  return (
    <section className="mh-morethan mh-section" aria-labelledby="memory-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-sand">What makes it compound</span>
        <h2 id="memory-title">The loop only works because something remembers.</h2>
        <p>Every stage reads from your Career Context and writes back to it. That is the difference between a set of tools that happen to sit in one account and a search that gets better the longer you run it.</p>
        <Link className="mh-section-link" href="/career-context">Learn more about Career Context <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

export function MarketingJobSearch() {
  return (
    <MarketingShell current="job-search">
      <main id="main-content">
        <PageHero
          kicker="Job search"
          title="A job search that works as one system."
          body="Most job-search tools solve one step and forget the rest. Offboard connects the whole loop, from the role you just found to the note you write after the interview, so nothing has to be re-explained at the next step."
          current="job-search"
          aside={false}
          cta="Get started free"
        />
        <EditorialGrid
          kicker="The difference"
          title="A bag of tools makes you the integration."
          body="Separately, a resume tool, a tracker, and a chat window each solve one step. Together they leave you carrying context between them: pasting the same history, re-explaining the same goals, and rebuilding the same picture of a company you already researched last week."
          items={WHY_ONE_SYSTEM}
        />
        <Loop />
        <Stages />
        <TheMemory />
        <FinalCta
          title="Run the whole search in one place."
          body="Start with the role in front of you, and let everything you learn stay where the next application can use it."
        />
      </main>
    </MarketingShell>
  );
}

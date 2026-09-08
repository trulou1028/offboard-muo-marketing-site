import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  ContrastSection,
  FinalCta,
  MarketingShell,
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

/* Was a three-cell numbered grid. Cells 1 and 2 described the scattered
   tools and the one system; the section now shows them (plan 042, R13).
   Cell 3 was the consequence and survives verbatim as the payoff line. */
function OneSystemComposition() {
  return (
    <div className="mh-comp mh-onesystem-comp">
      <div className="mh-ui-card mh-packet-mini mh-comp-base" aria-label="An Application Packet, built from one record">
        <div className="mh-packet-mini-head"><strong>Application Packet</strong><b>Tesserac</b></div>
        <ul>
          <li><span>Ghost check</span><em>Clear</em></li>
          <li><span>Fit read</span><em>Strong on platform work</em></li>
          <li><span>Tailored resume</span><em>Ready</em></li>
          <li><span>Warm intro</span><em>Two paths</em></li>
        </ul>
      </div>
      <div className="mh-comp-satellite mh-tool-stack" aria-label="What separate tools ask instead">
        <span>Every other tool</span>
        <p>Who are you?</p>
        <p>Paste your resume.</p>
      </div>
    </div>
  );
}

/* The eight-step "loop" list left in plan 045's messaging pass: it walked
   the same process the four stages below already structure, in different
   words, so the page described its own loop twice. Its one idea, that the
   last step feeds the first, now titles the closing band. COPY.md § 14
   keeps the rows. */
const STAGES = [
  { name: "Decide", decides: "Whether this one deserves your week.", tools: [
    ["Role Match", "Understand how an opportunity matches your experience, strengths, and goals."],
    ["Ghost Job Checker", "Look for signals that a posting may not represent an actively hiring role."],
    ["Company Intel", "Know who you're applying to before you invest your time."],
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
        <h2 id="memory-title">The last step feeds the first.</h2>
        <p>Every stage reads from your Career Context and writes back to it: what you learn in one interview is already there for the next application. That is the difference between tools that happen to sit in one account and a search that gets better the longer you run it.</p>
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
          body="Most job-search tools solve one step and forget the rest. Offboard connects the whole loop, so nothing has to be re-explained at the next step."
          current="job-search"
          aside={false}
          cta="Get started free"
        />
        <ContrastSection
          kicker="The difference"
          title="A bag of tools makes you the integration."
          body="Separately, a resume tool, a tracker, and a chat window each solve one step. Together they leave you carrying context between them: pasting the same history, re-explaining the same goals, and rebuilding the same picture of a company you already researched last week."
          payoff="The tenth application takes less effort than the first, because everything the first nine taught the system is still there."
        >
          <OneSystemComposition />
        </ContrastSection>
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

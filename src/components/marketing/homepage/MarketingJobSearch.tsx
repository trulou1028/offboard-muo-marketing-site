import Image from "next/image";
import { FileText, ListChecks, MessageSquare, Search } from "lucide-react";
import {
  AlsoStrip,
  FinalCta,
  MarketingShell,
  PageHero,
  Shot,
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

/* Plan 048: the hero shows the real Application Packet builder (the step
   picker open) instead of the plan-042 composition, which is retired. */
/* The eight-step "loop" list left in plan 045's messaging pass: it walked
   the same process the four stages below already structure, in different
   words, so the page described its own loop twice. Its one idea, that the
   last step feeds the first, now titles the closing band. COPY.md § 14
   keeps the rows. */
const STAGES = [
  { icon: Search, name: "Decide", decides: "Whether this one deserves your week.", tools: [
    ["Role Match", "Understand how an opportunity matches your experience, strengths, and goals."],
    ["Ghost Job Checker", "Look for signals that a posting may not represent an actively hiring role."],
    ["Company Intel", "Know who you're applying to before you invest your time."],
  ] },
  { icon: FileText, name: "Apply", decides: "What you actually send.", tools: [
    ["Application Packets", "Bring together the role, company, resume strategy, positioning, and application materials in one place."],
    ["Resume Tailoring", "Adapt your resume using the opportunity and your Career Context."],
    ["Cover Letters", "Create relevant application messaging without starting from a blank page."],
  ] },
  { icon: MessageSquare, name: "Interview", decides: "Walking in prepared, not rehearsed.", tools: [
    ["Interview Prep", "Turn company and role context into a focused preparation plan."],
    ["Voice Practice", "Practice answering questions in a realistic voice conversation."],
  ] },
  { icon: ListChecks, name: "Organize", decides: "Where all of it is kept.", tools: [
    ["Application Tracker", "Keep your entire pipeline current."],
    ["Career Context", "Connect the history behind every application, interaction, and outcome."],
  ] },
] as const;


function Stages() {
  return (
    <section className="mh-kit mh-section" aria-labelledby="stages-title">
      <div className="mh-split">
        <div className="mh-copy-block">
          <span className="mh-kicker">The toolkit</span>
          <h2 id="stages-title">Four stages, and what each one decides.</h2>
          <p>The same ten tools the homepage names, described. Every one reads from your Career Context and writes back to it.</p>
        </div>
        {/* Plan 046: the first photograph on this page, at the human moment
            the stages lead to. */}
        <div className="mh-route-story-photo is-short"><Image src="/marketing/homepage/raw/strip-interview-prep.webp" alt="A woman practicing interview answers in front of a mirror, notes taped around it" fill sizes="(max-width: 900px) 100vw, 44vw" /></div>
      </div>
      <div className="mh-kit-grid" data-reveal="">
        {STAGES.map(({ icon: IconComponent, name, decides, tools }) => (
          <div className="mh-kit-col" key={name}>
            <IconComponent aria-hidden="true" />
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

export function MarketingJobSearch() {
  return (
    <MarketingShell current="job-search">
      <main id="main-content">
        <PageHero
          kicker="Job search"
          title="A job search that works as one system."
          body="Most job-search tools solve one step and forget the rest. Offboard connects the whole loop, so nothing has to be re-explained at the next step. The tenth application takes less effort than the first."
          current="job-search"
          visual={<Shot src="/marketing/app/packet-builder.webp" alt="The Application Packet builder in Offboard: a field for a job posting link, and the six steps a packet runs: ghost check, company intel, role match analysis, tailor resume, cover letter, path to a person" width={672} height={690} />}
          cta="Get started free"
        />
        <Stages />
        <AlsoStrip items={[
          { title: "The last step feeds the first.", body: "Every stage reads from your Career Context and writes back to it: what you learn in one interview is already there for the next application.", href: "/career-context", cta: "See what your Career Context holds" },
          { title: "Ask about the whole search, not one application.", body: "Lumo works from every stage at once, so it can tell you what needs attention today and what pattern it sees across your search.", href: "/lumo", cta: "See how Lumo works" },
        ]} />
        <FinalCta
          title="Run the whole search in one place."
          body="Start with the role in front of you, and let everything you learn stay where the next application can use it."
        />
      </main>
    </MarketingShell>
  );
}

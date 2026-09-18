import Image from "next/image";
import { FileText, ListChecks, MessageSquare, Search } from "lucide-react";
import {
  AlsoStrip,
  FaqSection,
  FinalCta,
  MarketingShell,
  PageHero,
} from "./MarketingSite";
import { LayeredProductHero } from "./LayeredProductHero";
import { ApplicationPacketDemo } from "./ApplicationPacketDemo";

/* Application Packet pillar page. It began as the Job Search page in plan
   031, then became the canonical home for the packet in plan 051. The route
   now names the product that already carries most of the page's substance.
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

/* The six steps an Application Packet runs, verbatim from the app
   (`lumo-plan-builder` `origin/main` `src/components/job-packet/packetSteps.ts`,
   read 2026-09-13): the labels, the one-line descriptions, and which of them
   are Pro. Parse Job and Save Application are foundational and never appear in
   the app's own picker, so they are not listed here either. A chip per row
   says what Free covers, per the owner's decision 2026-09-13.

   The Ghost Check row needed the server rather than the picker (corrected
   2026-09-14). `packetSteps.ts` marks it `pro: true`, but that flag describes
   the ENRICHED check. `analyze-ghost-job` runs two products on one endpoint:
   enriched on credits, which is Pro and the one trial packet, and a
   scrape-only BASIC verdict that costs nothing and has its own allowance of
   three a month on Free (`supabase/functions/_shared/entitlements.ts`,
   `DEFAULT_FREE_GHOST_CHECKS_PER_MONTH`). A Free member therefore does get a
   ghost check after the trial packet, three times a month, and the chip says
   so rather than reading `Pro`. */
function PacketBand() {
  return (
    <section className="mh-packet mh-section" aria-labelledby="packet-title">
      <div className="mh-split">
        <div className="mh-copy-block">
          <span className="mh-kicker">Inside the packet</span>
          <h2 id="packet-title">The role, the research, and what you send, connected.</h2>
          <p>One link becomes a company brief, a fit read, and the materials you send, all kept with the role instead of scattered across six tabs.</p>
        </div>
        <div className="mh-packet-band-intro">
          <span>One example role</span>
          <p>See how one example role connects research, fit, and application materials. Nothing here runs a live check or sends an application.</p>
        </div>
      </div>
      <ApplicationPacketDemo />
      <small className="mh-packet-note">Your first complete packet runs every step free. After that the company and fit reads stay free on every packet, basic ghost checks carry on at three a month, and the rest is Offboard Pro.</small>
    </section>
  );
}

/* Plain answers, the pattern /lumo and /layoff-support close on. Every one is
   checked against the app or a COPY.md ledger row: there is no auto-apply
   anywhere in `lumo-plan-builder`, and the tracker has no inbox connection
   (the ledger row "Live integrations" has Gmail in progress, not live). */
const JOB_SEARCH_FAQS = [
  ["Where do the job postings come from?", "You bring them. A board, a referral, a recruiter's email: paste the link and Offboard reads the posting, checks whether it looks real, and builds the application around it."],
  ["Does Offboard apply for me?", "No. It builds what you send and keeps it with the role. You send it, so nothing goes out under your name that you have not read."],
  ["What does Free include?", "Your first complete Application Packet runs every step free. After that, Free keeps the tracker, your Career Context, and the company and fit reads on every packet. Tailored resumes, cover letters, and the path to a person are Pro."],
  ["Where does the tracker get its information?", "From the packets you build and what you add yourself. Offboard does not read your inbox."],
] as const;
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
          <span className="mh-kicker">After you apply</span>
          <h2 id="stages-title">The packet keeps working after you send it.</h2>
          <p>The same record follows the role into interviews and follow-up, so the tenth application starts further ahead than the first.</p>
        </div>
        {/* Plan 046: the first photograph on this page, at the human moment
            the stages lead to. */}
        <div className="mh-route-story-photo is-short"><Image src="/marketing/site-imagery/documentary/interview-prep-at-home-civic-modern-v1.webp" alt="A man at his kitchen table talking through an answer aloud, laptop open and notes in front of him" fill sizes="(max-width: 900px) 100vw, 44vw" /></div>
      </div>
      {/* Rows, not four columns (owner 2026-09-11, the homepage's Step 3 first):
          equal columns read as four unrelated buckets rather than the order a
          search runs in, and 3/3/2/2 tools left two of them ending short.
          `is-detailed` is this page's variant of the homepage row: the tools
          carry their sentence here, so they are a list rather than pills. */}
      <ol className="mh-stage-strip is-detailed" data-reveal="">
        {STAGES.map(({ icon: IconComponent, name, decides, tools }) => (
          <li key={name}>
            <div className="mh-stage-head">
              <h3><IconComponent aria-hidden="true" />{name}</h3>
              <p>{decides}</p>
            </div>
            <ul>
              {tools.map(([tool, body]) => (
                <li key={tool}>
                  <strong>{tool}</strong>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function MarketingApplicationPacket() {
  return (
    <MarketingShell current="application-packet">
      <main id="main-content">
        <PageHero
          kicker="Application Packet"
          title="One job link. An entire Application Packet."
          body="Offboard reads the role, checks the company and fit, and builds the materials around your Career Context. Your first complete packet runs every step free."
          current="application-packet"
          visual={(
            <LayeredProductHero
              variant="application-packet"
              label="A layered Offboard Application Packet with company intel, role match, and a tailored resume"
            />
          )}
          cta="Get started free"
        />
        <PacketBand />
        <Stages />
        <FaqSection title="Straight answers about Application Packets." items={JOB_SEARCH_FAQS} />
        <AlsoStrip items={[
          { title: "The last step feeds the first.", body: "Every stage reads from your Career Context and writes back to it: what you learn in one interview is already there for the next application.", href: "/career-context", cta: "See what your Career Context holds" },
          { title: "Ask about the whole search, not one application.", body: "Lumo works from every stage at once, so it can tell you what needs attention today and what pattern it sees across your search.", href: "/lumo", cta: "See how Lumo works" },
        ]} />
        <FinalCta
          title="Start with one job link."
          body="Build the first complete packet free, then keep every role, decision, and next step connected."
        />
      </main>
    </MarketingShell>
  );
}

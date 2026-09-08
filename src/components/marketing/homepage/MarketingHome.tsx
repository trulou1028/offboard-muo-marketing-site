import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  ListChecks,
  MessageSquare,
  Search,
} from "lucide-react";
import type { ReactNode } from "react";
import { AiReply, CommunityStrip, LumoMark, MarketingShell, SIGN_UP_URL, StartingPlanPreview, YouBubble } from "./MarketingSite";
import { IntegrationLogo } from "./IntegrationLogos";

/* Homepage v3 (plan 039): the same Civic Modern bands, re-sequenced into one
   readable order - build your Career Context, connect it to the AI you use,
   run your search - and rebuilt on the composition rules in DESIGN.md
   ("Composition rules", R1 to R10).

   What changed from v2 (plan 022) and why:
   - Career Context was pitched three times with three filled buttons (the
     8-card grid, the forest inset, and "Built around you"). R3: one idea,
     one section, one CTA. It is now Step 1, once.
   - "Wherever you work" and "Meet Lumo" both said "use AI with your context"
     2,900px apart. They are now Step 2, once.
   - Every literal chat transcript in a bordered box is now a composition
     (R2): a base card with satellites breaking its edges.
   - Three grids left orphan cells (R1): 8 categories in 4 columns, 5
     questions in 3, and a 3/3/2/2 toolkit. All three are now ruled lists or
     a filled 2x2.
   - The photo triptych is gone (R6). The page keeps two photos.

   Copy source: COPY.md § 1.

   Plan 043 briefly removed the trailing "See ..." link from each of the four
   step sections while the pillar pages were deferred; plan 045 (owner
   2026-09-07) brought the pages and the links back. The hero's "See how it
   works" now scrolls to the four-step strip (id="how-it-works") because
   /how-it-works itself is the deferred page. */

function SecondaryCta({ children, href }: { children: ReactNode; href: string }) {
  return href.startsWith("/") ? (
    <Link className="mh-secondary-cta" href={href}>{children}</Link>
  ) : (
    <a className="mh-secondary-cta" href={href}>{children}</a>
  );
}

/* ---------------------------------------------------------------- */
/* 1 · Hero (forest deep). Owner composition 2026-09-07, refined in   */
/* Figma: a full-bleed photograph of one person working late at home  */
/* fills the band, its dark-green wall carrying the headline on the   */
/* left; the Lumo exchange floats over the photo's lower right as one */
/* flat image (see COPY.md § Hero for why it is pixels, not markup).  */
/* The five-image library (docs/marketing-image-library.md, owner 2026-09-08);
   HERO_PHOTO picks the one that ships. Every alt below is the library's own
   suggested text.

   Above 900px there is no wash any more (owner 2026-09-08): each photograph's
   own wall is the green behind the copy. Measured on the bedroom scene with
   the wash gone, worst-case background behind the H1: 10.7:1 at 1440, 9.9:1
   at 1920, 8.7:1 at 2560, 9.6:1 at a tall 1200x1000, 9.1:1 at 901. The floor
   for 44px+ text is 3:1. Swapping HERO_PHOTO now means re-measuring, because
   nothing sits between the copy and the picture. */
/* ---------------------------------------------------------------- */
const HERO_PHOTOS = {
  livingRoom: {
    src: "/marketing/homepage/hero/living-room.webp",
    alt: "A man works on his laptop on a sofa at night, lit by a floor lamp beside a window.",
  },
  bedroom: {
    src: "/marketing/homepage/hero/bedroom.webp",
    alt: "A woman sits cross-legged on her bed with a laptop at dusk, a lamp lit on the nightstand beside her.",
  },
  coffeeShop: {
    src: "/marketing/homepage/hero/coffee-shop.webp",
    alt: "A woman works on her laptop at a wooden table in a brick-and-concrete coffee shop.",
  },
  coworking: {
    src: "/marketing/homepage/hero/coworking.webp",
    alt: "A woman works on her laptop at a communal table in a daylight-filled coworking space.",
  },
  publicLibrary: {
    src: "/marketing/homepage/hero/public-library.webp",
    alt: "A man works on his laptop with notes and reading glasses at a public library table.",
  },
} as const;

const HERO_PHOTO = HERO_PHOTOS.bedroom;

function HomeHero() {
  return (
    <section className="mh-hero2 mh-section" id="top" aria-labelledby="hero-title">
      <Image
        className="mh-hero2-photo"
        src={HERO_PHOTO.src}
        alt={HERO_PHOTO.alt}
        fill
        sizes="100vw"
        priority
      />
      <div className="mh-hero2-copy">
        <h1 id="hero-title"><span>The Modern</span> <span>Unemployment Office</span></h1>
        <p>Your benefits, your job search, and your career context in one system, connected to the AI you already use.</p>
        <div className="mh-hero2-actions">
          <a className="mh-primary-cta" href={SIGN_UP_URL}><span>Get started free</span><ArrowRight aria-hidden="true" /></a>
          <SecondaryCta href="#how-it-works">See how it works</SecondaryCta>
        </div>
        <small className="mh-hero2-trust">Join thousands of people building their next chapter with Offboard.</small>
      </div>
      <div className="mh-hero2-visual">
        <Image
          className="mh-hero2-figure"
          src="/marketing/homepage/hero/lumo-chat.png"
          alt="A conversation floats beside him. He asks Offboard what he should focus on today; Lumo notes it used his profile, applications, interviews, and integrations, and answers that two things deserve his attention: preparing for a senior product design interview, and updating the status of a product engineer application."
          width={1000}
          height={750}
          sizes="(max-width: 900px) 100vw, 500px"
          priority
          unoptimized
        />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 2 · The four steps (paper). Pattern E, the stepped strip: the     */
/* whole page in one row, each step linking to its own section.      */
/*                                                                    */
/* Four, not three (owner 2026-09-03, plan 040 finding 1). The H1     */
/* claims the modern unemployment office; the three-step version      */
/* described an AI job-search tool and carried the benefits story as  */
/* a trailing clause on step three ("with your benefits beside it").  */
/* A first step earns the H1 back, and step four loses that clause    */
/* because step one now says it properly.                             */
/* ---------------------------------------------------------------- */
const STEPS = [
  {
    title: "Steady the first week.",
    body: "Deadlines, health coverage, and how long your money lasts, in the order they matter.",
    href: "#steady",
    link: "See what comes first",
  },
  {
    title: "Build your Career Context.",
    body: "Tell Offboard about your career once. It becomes a record you keep adding to.",
    href: "#build",
    link: "Build your context",
  },
  {
    title: "Connect it to the AI you use.",
    body: "Lumo already knows it. ChatGPT and Claude connect in beta.",
    href: "#connect",
    link: "See the connection",
  },
  {
    title: "Run your search with real tools.",
    body: "Decide, apply, interview, and keep every application straight.",
    href: "#run",
    link: "See the toolkit",
  },
] as const;

function FourSteps() {
  return (
    <section className="mh-steps-band mh-section" id="how-it-works" aria-labelledby="steps-title">
      <div className="mh-intro-split">
        <div>
          <span className="mh-kicker">The short version</span>
          <h2 id="steps-title">How Offboard works.</h2>
        </div>
        <p>Handle what has a deadline, build a record of your career once, connect it to the AI you already use, and run your search from it.</p>
      </div>
      <ol className="mh-steps" data-reveal="">
        {STEPS.map(({ title, body, href, link }, index) => (
          <li key={title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{body}</p>
            <a className="mh-section-link" href={href}>{link} <ArrowRight aria-hidden="true" /></a>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 3 · Step 1, Career Context (mist). The eight category rows moved  */
/* to /career-context (owner, 2026-09-02): they restated this        */
/* section's own body paragraph, which already names all eight, and  */
/* that page had no structured account of what the record holds.     */
/* The homepage names the idea and links out (R5a).                  */
/* ---------------------------------------------------------------- */
/* Composition C. The record card is the base and the three sources fan across
   its top edge. The portrait that used to sit behind it is gone (owner,
   2026-09-02): it was forcing a photograph into a section that did not need
   one, and removing it returns final-cta-portrait.webp to being referenced
   exactly once on the site, in FinalCta. */
function RecordComposition() {
  return (
    <div className="mh-comp mh-record-comp">
      <div className="mh-comp-base mh-record-card">
        <strong>Your Career Context</strong>
        <p>Always evolving. Available wherever you use Offboard.</p>
        <ul>
          <li><span>Experience</span><em>Roles, projects, and outcomes</em></li>
          <li><span>Applications</span><em>Tesserac · Interviewing</em></li>
          <li><span>Interviews</span><em>Thursday · Prep ready</em></li>
        </ul>
      </div>
      <ul className="mh-comp-satellite mh-record-sources" aria-label="What your Career Context is built from">
        <li>Resume</li>
        <li>LinkedIn</li>
        <li>Interview story</li>
      </ul>
    </div>
  );
}

function StepContext() {
  return (
    <section className="mh-ctx mh-section" id="build" aria-labelledby="ctx-title">
      <div className="mh-split">
        <div className="mh-copy-block">
          <span className="mh-kicker">Step 2 · Build your context</span>
          <h2 id="ctx-title">One place that remembers your career.</h2>
          <p>Your resume is only a fraction of your career. Offboard builds a living record of your experience, accomplishments, applications, companies, conversations, documents, interviews, goals, and progress so you don&apos;t have to explain yourself from scratch every time you need help.</p>
          <a className="mh-primary-cta" href={SIGN_UP_URL}><span>Build my Career Context</span><ArrowRight aria-hidden="true" /></a>
          <Link className="mh-section-link" href="/career-context">See what your Career Context holds <ArrowRight aria-hidden="true" /></Link>
        </div>
        <RecordComposition />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 4 · Step 2, connect (mid forest). One CTA, and it goes somewhere  */
/* a reader can picture: "Ask Lumo" was a filled button with no      */
/* obvious destination, so it is gone and the link to /integrations  */
/* is the section's action (owner, 2026-09-02). The five example     */
/* prompts went with it - /lumo already ships eight under the same   */
/* "Ask things like" label, two of them word for word.               */
/* ---------------------------------------------------------------- */
function ConnectComposition() {
  return (
    <div className="mh-comp mh-connect-comp">
      {/* The earlier exchange, cropped by the card in front of it. It stays in
          the DOM at full contrast rather than being faded or removed: the
          conversation reads in order for a screen reader, and COPY.md's
          four-message demo stays whole. */}
      <div className="mh-chat-card mh-comp-ghost">
        <YouBubble>How does this role compare with the other opportunities I&apos;m pursuing?</YouBubble>
        <AiReply>Based on your Offboard context, Tesserac looks like one of your stronger opportunities. It aligns closely with your AI product experience and gives you more technical ownership than several of the other roles you&apos;re considering.</AiReply>
      </div>
      <div className="mh-chat-card mh-comp-base">
        <YouBubble>Move Tesserac to the interview stage and save that Ruben is my recruiter.</YouBubble>
        <AiReply highlight="Done.">Tesserac is now in Interviewing, and I&apos;ve added Ruben to the opportunity.</AiReply>
      </div>
      <div className="mh-comp-satellite mh-comp-marks" aria-hidden="true">
        <LumoMark />
        <IntegrationLogo id="chatgpt" />
        <IntegrationLogo id="claude" />
      </div>
      <div className="mh-comp-satellite mh-comp-chip"><i className="is-sage" aria-hidden="true" />Contact saved · Ruben</div>
    </div>
  );
}

function StepConnect() {
  return (
    <section className="mh-connect mh-section" id="connect" aria-labelledby="connect-title">
      <div className="mh-split">
        <div className="mh-copy-block">
          <span className="mh-kicker is-lime">Step 3 · Connect it to the AI you use</span>
          <h2 id="connect-title">Ask anywhere. The answer is about you.</h2>
          <p>Lumo is Offboard&apos;s own guide and works from your Career Context from the first question. Prefer ChatGPT or Claude? Connect Offboard and take your context with you.</p>
          <SecondaryCta href="/integrations">See how Offboard Everywhere works</SecondaryCta>
          <small>ChatGPT and Claude connections are in beta.</small>
        </div>
        <ConnectComposition />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 5 · Step 3, the toolkit (paper). Ten tools each with a sentence   */
/* was a wall of text. Four stages carry the names; /job-search      */
/* carries the descriptions, which is where a reader who wants them  */
/* is already going (owner, 2026-09-02 - this inverts the split, and */
/* that page's header comment was updated to match).                 */
/*                                                                   */
/* The one-line "what it decides" for each stage is /job-search's    */
/* own approved copy. Every chip is a string the product actually    */
/* produces, checked against lumo-plan-builder origin/main b8cb77ec: */
/*   "Strong fit"       - roleFit label at score >= 80               */
/*   "Ready for review" - job packet status review_ready             */
/*   "Prep ready"       - interview prep kicker                      */
/*   "Saved to tracker" - the save-a-job toast                       */
/* ---------------------------------------------------------------- */
const TOOLKIT_STAGES = [
  { icon: Search, title: "Decide", chip: "Strong fit", decides: "Whether this one deserves your week.", tools: ["Role Match", "Ghost Job Checker", "Company Intel"] },
  { icon: FileText, title: "Apply", chip: "Ready for review", decides: "What you actually send.", tools: ["Application Packets", "Resume Tailoring", "Cover Letters"] },
  { icon: MessageSquare, title: "Interview", chip: "Prep ready", decides: "Walking in prepared, not rehearsed.", tools: ["Interview Prep", "Voice Practice"] },
  { icon: ListChecks, title: "Organize", chip: "Saved to tracker", decides: "Where all of it is kept.", tools: ["Application Tracker", "Career Context"] },
] as const;

function StepSearch() {
  return (
    <section className="mh-kit mh-section" id="run" aria-labelledby="kit-title">
      <div className="mh-intro-split">
        <div>
          <span className="mh-kicker">Step 4 · Run your search</span>
          <h2 id="kit-title">The tools you run your search with.</h2>
        </div>
        <div>
          <p>Ten tools that read from the same context, so nothing is retyped and nothing is forgotten.</p>
          <Link className="mh-section-link" href="/job-search">See what each tool does <ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
      <ol className="mh-stage-strip" data-reveal="">
        {TOOLKIT_STAGES.map(({ icon: IconComponent, title, chip, decides, tools }) => (
          <li key={title}>
            <IconComponent aria-hidden="true" />
            <h3>{title}</h3>
            <em className="mh-state-chip">{chip}</em>
            <p>{decides}</p>
            <ul>{tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 3 · Step 1, steady the first week (sand). Moved above the Career   */
/* Context step (plan 040): the H1 promises an unemployment office,   */
/* so the first step is the deadlines and the money, not the resume.  */
/* Six member questions as a disclosure list (Pattern H), and the     */
/* section now links out to the pillar page that answers them.        */
/* ---------------------------------------------------------------- */
/* The six-question disclosure list left this band on 2026-09-08 (owner):
   the two-column split above it already carries the step, and six closed
   rows under it made the section long without adding an idea. COPY.md § 1
   keeps every question and answer. */

/* Composition D. The plan card is the base; one completed step lifts out of
   the stack and breaks its left edge, which is what the card's own "Show 2
   done" row is telling you exists. "Update your LinkedIn profile" is a real
   step in the product (lumo-plan-builder layoffPlanItems.ts, id `linkedin`)
   and carries no dollar figure or deadline, so it needs no ledger row. */
function PathComposition() {
  return (
    <div className="mh-comp mh-path-comp">
      <StartingPlanPreview />
      <div className="mh-comp-satellite mh-path-done">
        <i aria-hidden="true" />
        <strong>Update your LinkedIn profile</strong>
        <em>Done</em>
      </div>
    </div>
  );
}

function StepSteady() {
  return (
    <section className="mh-morethan mh-section" id="steady" aria-labelledby="morethan-title">
      <div className="mh-split">
        <div className="mh-copy-block">
          <span className="mh-kicker is-sand">Step 1 · Steady the first week</span>
          <h2 id="morethan-title">Losing your job creates more than one problem.</h2>
          <p>Finding another role matters. But so do unemployment benefits, health coverage, finances, career decisions, applications, networking, interviews, and figuring out what to do first. Offboard brings those pieces together.</p>
          <Link className="mh-section-link" href="/layoff-support">See what to do first <ArrowRight aria-hidden="true" /></Link>
        </div>
        <PathComposition />
      </div>
      <small className="mh-morethan-note">Offboard is independent, not a government agency, and claiming your benefits is always free.</small>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 7 · Plans (paper deep). Owner direction 2026-09-02: sponsored access */
/* is the third plan card, as it is on /pricing, rather than its own   */
/* band. Three cards in three columns fill the row (R1). The sponsored */
/* card takes the warm sand tint so it reads as "may be covered"       */
/* rather than as a third thing to buy. Copy is /pricing's deck copy,  */
/* already approved; the homepage's own sponsored band is retired.     */
/* ---------------------------------------------------------------- */
const FREE_FEATURES = [
  "Build your Career Context.",
  "Track opportunities, companies, contacts, and activity.",
  "One complete Application Packet, every step free.",
  "Ask Lumo, 10 messages a day.",
  "Connect ChatGPT or Claude to read your Offboard.",
] as const;

const PRO_FEATURES = [
  "Tailored resumes, cover letters, and interview briefs on every packet.",
  "Enriched ghost checks and a path to a real person.",
  "Ask Lumo without a daily limit, on the advanced model.",
  "Compare opportunities using your complete Career Context.",
  "Your connected assistant can run packets and checks for you.",
] as const;

const SPONSORED_FEATURES = [
  "The full sponsored benefit is delivered to you.",
  "Your private career activity remains yours.",
  "Sponsors receive aggregate reporting only.",
] as const;

function PlansSection() {
  return (
    <section className="mh-pro mh-section" aria-labelledby="pro-title">
      <div className="mh-intro-split">
        <div>
          <span className="mh-kicker">Offboard Pro</span>
          <h2 id="pro-title">Free remembers your search. Pro puts it to work.</h2>
        </div>
        <p>Free is the record: your path, your tracker, your benefit facts, and one complete Application Packet. Pro is Offboard doing the repeated application work for you, on every packet after it.</p>
      </div>
      <div className="mh-pro-cards" data-reveal="">
        <article className="mh-plan-card">
          <h3>Free</h3>
          <p className="mh-plan-price"><b>$0</b><small>forever</small></p>
          <ul>{FREE_FEATURES.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          <small className="mh-plan-note">Don&apos;t pay just to keep your job search organized. Upgrade when you want Offboard to do more with everything it knows.</small>
          <a className="mh-primary-cta" href={SIGN_UP_URL}><span>Start free</span><ArrowRight aria-hidden="true" /></a>
        </article>
        <article className="mh-plan-card is-emphasized">
          <h3>Pro</h3>
          <p className="mh-plan-price"><b>$20</b><small>/month</small></p>
          <ul>{PRO_FEATURES.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          <SecondaryCta href="/pricing">See Pro pricing</SecondaryCta>
        </article>
        <article className="mh-plan-card is-sponsored">
          <h3>Sponsored access</h3>
          <p className="mh-plan-price"><b>May be covered</b></p>
          <p className="mh-plan-lede">Outplacement, modernized. Your former employer, school, or workforce organization may cover your access.</p>
          <ul>{SPONSORED_FEATURES.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          <SecondaryCta href="/employers">Learn about sponsored access</SecondaryCta>
        </article>
      </div>
    </section>
  );
}

function FinalCtaV2() {
  return (
    <section className="mh-final2 mh-section" aria-labelledby="final2-title">
      <h2 id="final2-title">You don&apos;t need another place to start over.</h2>
      <p>Build one Career Context. Keep your job search organized. Get help with what comes next. Use Offboard directly or bring it into the AI tools you already use.</p>
      <a className="mh-lumo-cta" href={SIGN_UP_URL}><span>Get started free</span><ArrowRight aria-hidden="true" /></a>
      <small>No credit card required.</small>
    </section>
  );
}

export default function MarketingHome() {
  return (
    <MarketingShell current="home">
      <main id="main-content">
        <HomeHero />
        <FourSteps />
        <StepSteady />
        <StepContext />
        <StepConnect />
        <StepSearch />
        <PlansSection />
        <CommunityStrip />
        <FinalCtaV2 />
      </main>
    </MarketingShell>
  );
}

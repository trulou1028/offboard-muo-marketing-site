import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  ListChecks,
  MessageSquare,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { AiReply, CommunityStrip, LumoMark, MarketingShell, SIGN_UP_URL, StartingPlanPreview, TrackerCard, YouBubble } from "./MarketingSite";
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

   Copy source: COPY.md § 1. */

function SecondaryCta({ children, href }: { children: ReactNode; href: string }) {
  return href.startsWith("/") ? (
    <Link className="mh-secondary-cta" href={href}>{children}</Link>
  ) : (
    <a className="mh-secondary-cta" href={href}>{children}</a>
  );
}

/* ---------------------------------------------------------------- */
/* 1 · Hero (forest deep). Composition A: the chat card overlaps the */
/* photo's bottom-right corner instead of hanging off the container, */
/* and the tracker card leaves the card to break its bottom-left     */
/* edge. On a phone the whole thing goes static but keeps its        */
/* shadow - v2 dropped to a flat bordered box exactly where most     */
/* visitors first meet it.                                           */
/* ---------------------------------------------------------------- */
function HomeHero() {
  return (
    <section className="mh-hero2 mh-section" id="top" aria-labelledby="hero-title">
      <div className="mh-hero2-copy">
        <h1 id="hero-title">The modern unemployment office.</h1>
        <p>Your job search, benefits, applications, career context, and next steps in one system, connected to the AI you already use.</p>
        <div className="mh-hero2-actions">
          <a className="mh-primary-cta" href={SIGN_UP_URL}><span>Get started free</span><ArrowRight aria-hidden="true" /></a>
          <SecondaryCta href="/how-it-works">See how it works</SecondaryCta>
        </div>
        <small className="mh-hero2-trust">Join thousands of people building their next chapter with Offboard.</small>
      </div>
      <div className="mh-hero2-visual">
        <figure className="mh-photo-frame">
          <Image
            src="/marketing/homepage/raw/hero-kitchen-table.webp"
            alt="A man at his kitchen table, working through his job search on a laptop"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
            preload
          />
        </figure>
        <div className="mh-comp mh-hero-comp">
          <div className="mh-chat-card mh-comp-base" aria-label="Example conversation with an AI assistant">
            <YouBubble>I think I&apos;m going to apply to this. Add it to Offboard.</YouBubble>
            <AiReply highlight="Done.">
              I&apos;ve added the role to your Offboard tracker and saved the company context.
            </AiReply>
          </div>
          <div className="mh-comp-satellite mh-hero-tracker"><TrackerCard /></div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 2 · The three steps (paper). Pattern E, the stepped strip: the    */
/* whole page in one row, each step linking to its own section.      */
/* ---------------------------------------------------------------- */
const STEPS = [
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
    body: "Decide, apply, interview, and keep it all straight, with your benefits beside it.",
    href: "#run",
    link: "See the toolkit",
  },
] as const;

function ThreeSteps() {
  return (
    <section className="mh-steps-band mh-section" aria-labelledby="steps-title">
      <div className="mh-intro-split">
        <div>
          <span className="mh-kicker">The short version</span>
          <h2 id="steps-title">How Offboard works.</h2>
        </div>
        <p>Build your career record once, connect it to the AI you already use, and run your search with tools that read from it.</p>
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
/* 3 · Step 1, Career Context (mist). The eight categories were      */
/* eight identical white cards in a 4x2 grid with hover lifts that   */
/* linked nowhere; they are now one ruled list that fills its rows.  */
/* "Built around you" folds in here as the closing affirmation and   */
/* its portrait, so the concept has one section and one button (R3). */
/* ---------------------------------------------------------------- */
const CONTEXT_CATEGORIES = [
  { icon: Briefcase, title: "Experience", body: "Roles, skills, accomplishments, and outcomes." },
  { icon: ListChecks, title: "Applications", body: "Every opportunity and what happened with it." },
  { icon: Building2, title: "Companies", body: "Research, notes, people, and hiring signals." },
  { icon: Users, title: "Contacts", body: "Recruiters, hiring managers, and referrals." },
  { icon: FileText, title: "Documents", body: "Resumes, job descriptions, and other files." },
  { icon: MessageSquare, title: "Interviews", body: "Conversations, preparation, notes, and next steps." },
  { icon: Bookmark, title: "Preferences", body: "The work you want, where, and on what terms." },
  { icon: Sparkles, title: "Goals", body: "What you are working toward and what needs attention." },
] as const;

/* Composition C. The record card is the base; the three sources fan across
   its top-left edge; the portrait sits behind that corner so the section
   keeps one human photograph (R6) without spending a whole band on it. */
function RecordComposition() {
  return (
    <div className="mh-comp mh-record-comp">
      <figure className="mh-photo-frame mh-record-photo">
        <Image
          src="/marketing/homepage/raw/final-cta-portrait.webp"
          alt="A woman outdoors, looking ahead"
          fill
          sizes="(max-width: 900px) 40vw, 220px"
        />
      </figure>
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
          <span className="mh-kicker">Step 1 · Build your context</span>
          <h2 id="ctx-title">One place that remembers your career.</h2>
          <p>Your resume is only a fraction of your career. Offboard builds a living record of your experience, accomplishments, applications, companies, conversations, documents, interviews, goals, and progress so you don&apos;t have to explain yourself from scratch every time you need help.</p>
          <p className="mh-belong-affirm">Your experience. Your progress. Your context. Available when you need it.</p>
          <a className="mh-primary-cta" href={SIGN_UP_URL}><span>Build my Career Context</span><ArrowRight aria-hidden="true" /></a>
          <Link className="mh-section-link" href="/career-context">Learn more about Career Context <ArrowRight aria-hidden="true" /></Link>
        </div>
        <RecordComposition />
      </div>
      <ul className="mh-ruled is-two" data-reveal="">
        {CONTEXT_CATEGORIES.map(({ icon: IconComponent, title, body }) => (
          <li key={title}>
            <IconComponent aria-hidden="true" />
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 4 · Step 2, connect (mid forest). v2 told this story twice, in a  */
/* four-message transcript box and again in five prompt pills that   */
/* read as a form. It is one section now: composition B on the right */
/* (the earlier exchange sits behind the later one rather than       */
/* stretching the card to full transcript height), and the prompts   */
/* are a ruled list, not buttons.                                    */
/* ---------------------------------------------------------------- */
const LUMO_PROMPTS = [
  "What should I focus on today?",
  "Which of my open applications need follow-up?",
  "Help me prepare for tomorrow's interview.",
  "Why do you think this role is a strong fit for me?",
  "What should I do differently based on how my search has been going?",
] as const;

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
          <span className="mh-kicker is-lime">Step 2 · Connect it to the AI you use</span>
          <h2 id="connect-title">Ask anywhere. The answer is about you.</h2>
          <p>Lumo is Offboard&apos;s own guide and works from your Career Context from the first question. Prefer ChatGPT or Claude? Connect Offboard and take your context with you.</p>
          <a className="mh-ai-cta" href={SIGN_UP_URL}><LumoMark className="is-dot" /><span>Ask Lumo</span></a>
          <small>ChatGPT and Claude connections are in beta.</small>
          <Link className="mh-section-link" href="/integrations">See how Offboard Everywhere works <ArrowRight aria-hidden="true" /></Link>
        </div>
        <ConnectComposition />
      </div>
      <div className="mh-prompt-list" data-reveal="">
        <span>Ask things like</span>
        <ul>
          {LUMO_PROMPTS.map((prompt) => <li key={prompt}>{prompt}</li>)}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 5 · Step 3, the toolkit (paper). v2 ran four ruled columns of     */
/* 3/3/2/2, so the right half ended 180px above the left. Four cells */
/* in a 2x2 fill their rows (R1), and each one carries a real        */
/* product state (R8) rather than being ten lines of text.           */
/*                                                                   */
/* Every chip below is a string the product actually produces,       */
/* checked against lumo-plan-builder origin/main b8cb77ec:           */
/*   "Strong fit"      - roleFit label at score >= 80                */
/*   "Ready for review" - job packet status review_ready             */
/*   "Prep ready"      - interview prep kicker                       */
/*   "Saved to tracker" - the save-a-job toast                       */
/* Plan 039 proposed "Thursday · Prep done" and "12 tracked"; neither */
/* exists in the app, so both were dropped rather than invented.     */
/* ---------------------------------------------------------------- */
const TOOLKIT_GROUPS = [
  { icon: Search, title: "Decide", chip: "Strong fit", tools: [
    ["Role Fit", "Understand how an opportunity matches your experience, strengths, and goals."],
    ["Ghost Job Check", "Look for signals that a posting may not represent an actively hiring role."],
    ["Company Intelligence", "Know who you're applying to before you invest your time."],
  ] },
  { icon: FileText, title: "Apply", chip: "Ready for review", tools: [
    ["Application Packets", "Bring together the role, company, resume strategy, positioning, and application materials in one place."],
    ["Resume Tailoring", "Adapt your resume using the opportunity and your Career Context."],
    ["Cover Letters", "Create relevant application messaging without starting from a blank page."],
  ] },
  { icon: MessageSquare, title: "Interview", chip: "Prep ready", tools: [
    ["Interview Prep", "Turn company and role context into a focused preparation plan."],
    ["Voice Practice", "Practice answering questions in a realistic voice conversation."],
  ] },
  { icon: ListChecks, title: "Organize", chip: "Saved to tracker", tools: [
    ["Application Tracker", "Keep your entire pipeline current."],
    ["Career Context", "Connect the history behind every application, interaction, and outcome."],
  ] },
] as const;

function StepSearch() {
  return (
    <section className="mh-kit mh-section" id="run" aria-labelledby="kit-title">
      <div className="mh-intro-split">
        <div>
          <span className="mh-kicker">Step 3 · Run your search</span>
          <h2 id="kit-title">Everything you need when the next opportunity appears.</h2>
        </div>
        <p>Ten tools that read from the same context, so nothing is retyped and nothing is forgotten.</p>
      </div>
      <div className="mh-kit-grid" data-reveal="">
        {TOOLKIT_GROUPS.map(({ icon: IconComponent, title, chip, tools }) => (
          <div className="mh-kit-col" key={title}>
            <div className="mh-kit-col-head">
              <IconComponent aria-hidden="true" />
              <h3>{title}</h3>
              <em className="mh-state-chip">{chip}</em>
            </div>
            {tools.map(([name, body]) => (
              <div className="mh-kit-tool" key={name}>
                <strong>{name}</strong>
                <p>{body}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 6 · Beside the search (sand). The photo triptych is retired (R6): */
/* three chipped photos sat between the headline and the plan card   */
/* explaining nothing. The five remaining questions were a 3-column  */
/* grid with an empty sixth cell; they are a ruled list now.         */
/* ---------------------------------------------------------------- */
const FIRST_QUESTION = ["What do I do first?", "Your personalized plan", "Tell Offboard what's happening, and we'll help organize what needs your attention now, what can wait, and what comes next."] as const;

const LIFE_QUESTIONS = [
  ["What support might I qualify for?", "Benefits and workforce programs", "Navigate unemployment insurance, training programs, workforce resources, and other forms of support that may be available where you live."],
  ["Is this job worth my time?", "Opportunity intelligence", "Check role fit, investigate possible ghost jobs, research companies, and understand whether an opportunity deserves your energy."],
  ["How do I submit a stronger application?", "Application support", "Turn your Career Context and the opportunity into stronger resumes, application packets, cover letters, and positioning."],
  ["How do I prepare when I hear back?", "Interview preparation", "Research the company, anticipate questions, prepare stories from your experience, and practice interviews with AI."],
  ["How do I keep everything straight?", "Tracker + Career Context", "Keep every opportunity, contact, document, conversation, and next step connected."],
] as const;

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

function BesideTheSearch() {
  return (
    <section className="mh-morethan mh-section" aria-labelledby="morethan-title">
      <div className="mh-split">
        <div className="mh-copy-block">
          <span className="mh-kicker is-sand">More than a job search</span>
          <h2 id="morethan-title">Losing your job creates more than one problem.</h2>
          <p>Finding another role matters. But so do unemployment benefits, health coverage, finances, career decisions, applications, networking, interviews, and figuring out what to do first. Offboard brings those pieces together.</p>
          <article className="mh-qblock">
            <h3>{FIRST_QUESTION[0]}</h3>
            <span className="mh-qblock-feature">{FIRST_QUESTION[1]}</span>
            <p>{FIRST_QUESTION[2]}</p>
          </article>
        </div>
        <PathComposition />
      </div>
      <ul className="mh-ruled is-questions" data-reveal="">
        {LIFE_QUESTIONS.map(([question, feature, body]) => (
          <li key={question}>
            <h3>{question}</h3>
            <div>
              <span className="mh-qblock-feature">{feature}</span>
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ul>
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
  "Track opportunities.",
  "Save companies, contacts, notes, and activity.",
  "Connect supported AI assistants.",
  "Use core job-search tools.",
] as const;

const PRO_FEATURES = [
  "Compare opportunities using your complete context.",
  "Get deeper role and company intelligence.",
  "Create advanced application materials.",
  "Prepare for interviews using everything Offboard knows about you and the opportunity.",
  "Analyze patterns across your job search.",
  "Get more personalized recommendations about what to do next.",
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
        <p>Start free and build the foundation of your Career Context. When you want deeper intelligence, preparation, and personalized help, Offboard Pro uses that context to help you make better decisions and move faster.</p>
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
        <ThreeSteps />
        <StepContext />
        <StepConnect />
        <StepSearch />
        <BesideTheSearch />
        <PlansSection />
        <CommunityStrip />
        <FinalCtaV2 />
      </main>
    </MarketingShell>
  );
}

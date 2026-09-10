import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  FileText,
  ListChecks,
  MessageSquare,
  Search,
} from "lucide-react";
import type { ReactNode } from "react";

import { MarketingMobileMenu, MarketingNav } from "./MarketingNav";
import { MotionController } from "./MotionController";

export const SIGN_UP_URL = "https://app.offboard.co/auth?tab=signup";
export const SIGN_IN_URL = "https://app.offboard.co/auth?tab=signin";
export const HUMAN_SUPPORT_URL = "/intake";

export type MarketingRoute =
  | "home"
  | "how-it-works"
  | "pricing"
  | "resources"
  | "about"
  | "employers"
  | "workforce"
  | "communities"
  | "companies"
  | "intake"
  | "act"
  | "career-context"
  | "integrations"
  | "lumo"
  | "layoff-support"
  | "job-search"
  | "privacy-security";

const HUMAN_STEPS = [
  ["Work independently", "Follow your plan, manage applications, and use the tools at your own pace."],
  ["Ask Lumo", "Get guidance that uses the context already in your Offboard plan."],
  ["Talk with a person", "Book available one-on-one support online or visit the Offboard office in Concord, California."],
] as const;

export const ABOUT_FAQS = [
  ["Isn't calling it 'unemployment' depressing?", "Because pretending is worse. You were just laid off, and a euphemism like 'career transition' reads as marketing at the exact moment you need candor. The word does the targeting. The warmth does the differentiating."],
  ["How is this different from an AI resume tool?", "Those tools help with one document. Offboard is accountable for the whole passage: the money, the programs, the paperwork, the search, and the landing. AI is how it scales. It isn't the product."],
  ["Are you a government website?", "No. Offboard is independent, not a government agency. It helps you organize your transition and reach official sources, and government agencies and providers make the eligibility and benefit decisions."],
  ["What about people who aren't unemployed right now?", "Offboard starts from the laid-off moment on purpose, since that is when the deadlines are most urgent. But transitions are not limited to unemployment, and most people move between jobs while still employed at some point. The office is built for the whole transition, not only the week after a layoff."],
] as const;

export const PRODUCT_FAQS = [
  ["Can Offboard tell me whether I qualify for benefits?", "Offboard can help you find programs that may be relevant and get to the official source. The agency or provider responsible for the program decides eligibility, benefit amounts, and approval."],
  ["Is Offboard only for people in tech?", "No. Offboard is designed for people navigating a layoff or job transition. Some job-search tools may be most developed for professional and knowledge-work roles today, and we will be clear when a feature is better suited to a particular kind of work."],
  ["What if I only need help with one part of my transition?", "Start with what feels most urgent. You can organize a single application, research possible support, or build a broader transition plan. You do not need to complete every part at once."],
  ["Does Offboard guarantee benefits, interviews, offers, or placement?", "No. Offboard helps you organize and improve the work of a transition, but it cannot guarantee eligibility decisions, interviews, offers, or job placement."],
  ["How is Lumo different from a general AI assistant?", "Lumo works inside your Offboard plan, so it can use the transition, role, and application context you choose to save. It is designed to help with the work in Offboard, while still requiring your review and judgment."],
] as const;

export const PRICING_FAQS = [
  ["Do I need a payment method to start?", "No. The Free tier is not a trial. You can build your plan, see your runway and deadlines, track applications, and build your first Application Packet without adding a payment method."],
  ["What happens after my first Application Packet?", "Every packet after it still runs the assessment: whether the job is real, who the company is, and how you fit. Tailored resumes, cover letters, interview briefs, and the path to a person are part of Pro."],
  ["Is there a limit on Pro?", "Pro covers about 30 full packets a month. We email you at 25 and never stop a build without warning. Ask Lumo has no daily limit on Pro."],
  ["Can I cancel Pro any time?", "Yes. Your plan, materials, and history remain yours on the Free tier after you cancel."],
  ["Is human support included?", "Availability, format, eligibility, and pricing vary by support option. The booking page shows the current details before you schedule."],
  ["Does any tier charge for government benefits?", "Never. Claiming your benefits is always free. Offboard charges for its own tools and support, not for access to public programs."],
] as const;

export const EMPLOYER_FAQS = [
  ["Is there a minimum number of seats?", "No minimum. Buy for two people or two hundred, with no contract. Pricing is $199 per employee, one-time, and drops to $169 per seat at 50 or more."],
  ["How fast can this be live?", "Invitations go out the same day you upload a roster. Setup takes minutes, not weeks."],
  ["What exactly can we see?", "Aggregate engagement only. For example, a sponsor can see that 19 of 24 people claimed access and 14 are active, but never anyone's resume, applications, or conversations. Not the CEO, not HR, nobody. That privacy line is contractual, not a preference."],
  ["How do people pay?", "$199 per employee, one-time. Card or NET-30 invoice. No renewal, no SOW, no procurement cycle."],
  ["What does each person get?", "90 days of full Offboard Pro: a personal plan, verified benefit deadlines, resume and application help, interview prep, and a real job feed."],
] as const;

export function Brand() {
  return (
    <Image
      className="mh-brand"
      src="/marketing/homepage/offboard-logo-light.png"
      alt="Offboard"
      width={520}
      height={106}
      loading="eager"
    />
  );
}

export function PrimaryCta({
  /* The sitewide ask (owner 2026-09-03, plan 040 finding 3). Five labels
     pointed at this one URL; a section CTA that names an in-page action may
     still differ, but the nav, every page hero, and every final CTA say this. */
  children = "Get started free",
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a className={`mh-primary-cta ${className}`.trim()} href={SIGN_UP_URL}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" />
    </a>
  );
}

/* The flat NAV_LINKS list became the dropdown structure in plan 037; it now
   lives in MarketingNav.tsx, which owns both presentations. */
export function MarketingHeader({ current }: { current: MarketingRoute }) {
  return (
    <header className="mh-site-header">
      <Link href="/" aria-label="Offboard home">
        <Brand />
      </Link>
      <MarketingNav current={current} />
      <div className="mh-header-actions">
        <MarketingMobileMenu current={current} signInUrl={SIGN_IN_URL} />
        <a className="mh-sign-in" href={SIGN_IN_URL}>Sign In</a>
        <PrimaryCta />
      </div>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="mh-site-footer">
      <div>
        <div>
          <Image
            className="mh-footer-brand"
            src="/marketing/homepage/offboard-logo-light.png"
            alt="Offboard"
            width={520}
            height={106}
            loading="lazy"
          />
          <p>
            Offboard is an independent company, not a government agency. We help you navigate the official programs. Your benefits are yours, and claiming them is always free. Information provided by Offboard is general and does not replace guidance from government agencies or qualified legal, tax, financial, or healthcare professionals.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <div>
            {/* Trimmed to the launch set by plan 043; the deferred pages
                (src/lib/launch.ts) stay live but unadvertised. Each comes
                back to the column it left. */}
            <strong>Product</strong>
            <Link href="/career-context">Career Context</Link>
            <Link href="/lumo">Lumo</Link>
            <Link href="/job-search">Job Search</Link>
            <Link href="/integrations">Offboard Everywhere</Link>
            <Link href="/layoff-support">Layoff &amp; Benefits</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/resources">Guides</Link>
          </div>
          <div>
            <strong>Partners</strong>
            <Link href="/employers">For Employers</Link>
          </div>
          <div>
            <strong>Company</strong>
            <Link href="/about">About</Link>
            <a href={HUMAN_SUPPORT_URL}>Visit Us</a>
            <a href="mailto:hello@offboard.co">Contact</a>
          </div>
          <div>
            <strong>Legal</strong>
            <Link href="/privacy-security">Privacy &amp; Security</Link>
            <a href="https://app.offboard.co/privacy">Privacy Policy</a>
            <a href="https://app.offboard.co/terms">Terms</a>
          </div>
        </nav>
      </div>
      <p>
        <span>© 2026 Offboard</span>
        <span>Independent support for life after a layoff</span>
      </p>
    </footer>
  );
}

export function MarketingShell({
  current,
  children,
}: {
  current: MarketingRoute;
  children: ReactNode;
}) {
  return (
    <div className={`marketing-homepage mh-page-${current}`}>
      <MotionController />
      <a className="mh-skip-link" href="#main-content">Skip to content</a>
      <MarketingHeader current={current} />
      {children}
      <MarketingFooter />
    </div>
  );
}

/* Chat primitives (moved from MarketingHome for reuse on product pages -
   plan 025; no visual change). */
/* The AI avatar. Owner direction 2026-09-02: the avatar is Lumo's face, the
   same asset the app uses (ported from lumo-plan-builder origin/main
   src/assets/lumo-head.png), not the lime disc. The `is-dot` variant on the
   AI button stays a lime dot - it is an accent, not a portrait. */
export function LumoMark({ className = "" }: { className?: string }) {
  if (className.includes("is-dot")) {
    return <i className={`mh-lumo-mark ${className}`.trim()} aria-hidden="true" />;
  }
  return <img className={`mh-lumo-mark ${className}`.trim()} src="/marketing/lumo-head.png" alt="" width={28} height={28} loading="lazy" decoding="async" />;
}

export function YouBubble({ children }: { children: ReactNode }) {
  return (
    <p className="mh-chat-you">
      <span className="mh-chat-speaker">You</span>
      {children}
    </p>
  );
}

export function AiReply({
  highlight,
  children,
  card,
}: {
  highlight?: string;
  children: ReactNode;
  card?: ReactNode;
}) {
  return (
    <div className="mh-chat-ai">
      <LumoMark />
      <div>
        <p>
          {highlight ? <mark className="mh-ai-highlight">{highlight}</mark> : null} {children}
        </p>
        {card}
      </div>
    </div>
  );
}

export function TrackerCard() {
  return (
    <div className="mh-tracker-card" aria-label="Example tracked opportunity">
      <b className="mh-tracker-monogram" aria-hidden="true">T</b>
      <span>
        <strong>Product Designer</strong>
        <small>Tesserac</small>
      </span>
      <em className="mh-tracker-status">Saved</em>
    </div>
  );
}


export function NumberedRows({ rows }: { rows: readonly (readonly [string, string])[] }) {
  return (
    <ol className="mh-numbered-rows">
      {rows.map(([title, body], index) => (
        <li key={title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div><strong>{title}</strong><p>{body}</p></div>
        </li>
      ))}
    </ol>
  );
}

export function PageHero({
  kicker,
  title,
  body,
  current,
  aside,
  cta = "Get started free",
  ctaHref = SIGN_UP_URL,
  footnote,
  eyebrowVisual,
  visual,
}: {
  kicker: string;
  title: string;
  body: string;
  current: MarketingRoute;
  aside?: ReactNode | false;
  /* Plan 046: a product composition in the right column instead of the
     paper aside card. Four product pages opened on 700px of empty green;
     their plan-042 compositions moved up here from the section below. */
  visual?: ReactNode;
  cta?: string | false;
  ctaHref?: string;
  /* A line under the body, above the CTA. Added for /privacy-security, where
     the page has to say what its claims rest on before it makes any. */
  footnote?: string;
  /* Sits above the kicker. Added for /companies/<slug>, where the company's
     own mark identifies the page's subject; the hero's footnote carries the
     "no relationship" line directly beneath it. */
  eyebrowVisual?: ReactNode;
}) {
  const ctaNode = cta === false ? null : ctaHref.startsWith("/") ? (
    <Link className="mh-primary-cta" href={ctaHref}><span>{cta}</span><ArrowRight aria-hidden="true" /></Link>
  ) : (
    <a className="mh-primary-cta" href={ctaHref}><span>{cta}</span><ArrowRight aria-hidden="true" /></a>
  );

  return (
    <section className={`mh-route-hero mh-section${aside === false && !visual ? " is-single" : ""}${visual ? " is-visual" : ""}`}>
      <div>
        {eyebrowVisual ? <span className="mh-hero-eyebrow-visual">{eyebrowVisual}</span> : null}
        <span className="mh-kicker is-lime">{kicker}</span>
        <h1>{title}</h1>
        <p>{body}</p>
        {footnote ? <small className="mh-route-hero-footnote">{footnote}</small> : null}
        {ctaNode}
      </div>
      {visual ? <div className="mh-route-hero-visual">{visual}</div> : null}
      {!visual && aside !== false && (
        <aside aria-label={`${current} summary`}>
          {aside ?? (
            <>
              <span>One connected plan</span>
              <strong>Start with what changed.</strong>
              <p>Offboard organizes what deserves attention now and builds from there.</p>
            </>
          )}
        </aside>
      )}
    </section>
  );
}

export function StartingPlan() {
  return (
    <div className="mh-onboarding-visual" data-reveal="" aria-label="An abstracted preview of Offboard onboarding">
      <Image src="/marketing/homepage/onboarding-atmosphere-v1.png" alt="" fill sizes="(max-width: 900px) 100vw, 44vw" aria-hidden="true" />
      <div className="mh-onboarding-screen">
        <div className="mh-onboarding-progress" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <h3>Where are you right now?</h3>
        <p>This sets your path. You can change it any time, or skip straight to the tools if you already know what you need.</p>
        <div className="mh-onboarding-choices" aria-hidden="true"><span /><span /><span>I&apos;m still employed, but at risk</span><span /></div>
        <small>Private by default. This never appears to employers or recruiters. It only personalizes your path, deadlines, and what you may be entitled to.</small>
        <button type="button">Skip, I&apos;ll decide later</button>
      </div>
      <div className="mh-onboarding-card is-laid-off"><i />I was just laid off</div>
      <div className="mh-onboarding-card is-know"><i />I know what I need</div>
    </div>
  );
}

// Plan 018 phase 3. Every string below is real product state, read from
// lumo-plan-builder origin/main: the stage name from src/journey/stages.ts,
// the step titles and their caption lines from
// src/components/layoff-plan/layoffPlanItems.ts (the caption is the first
// sentence of whyItMatters, which is what rowLineFor() falls back to), and the
// row / stage-group shape from src/components/journey/PathListRow.tsx and
// src/pages/path/YourPath.tsx.
//
// Steps whose caption or stake carries a benefit or severance NUMBER are
// deliberately left out -- "Takes 2-3 weeks to start" and "21 or 45 days to
// decide" are real product copy but are not in COPY.md's verified-facts
// ledger, and this page does not mint a new claim to decorate a screenshot.
// Owner decision 2026-08-26: ship the claim-free subset.
const PLAN_PREVIEW_STEPS = [
  ["Write down your key dates", "Most post-layoff mistakes are missed deadlines."],
  ["Understand your COBRA / health insurance options", "A gap in health coverage can be financially devastating."],
  ["Secure your accounts and access", "Paystubs, tax docs, benefits, and equity portals often live behind work logins that disappear without warning."],
] as const;

export function StartingPlanPreview() {
  return (
    <div className="mh-ui-card mh-plan-preview" aria-label="Example Offboard path">
      <div className="mh-ui-card-heading"><h3>Layoff Plan</h3></div>
      <p className="mh-plan-lede">The steps that fit your situation. Do them in any order.</p>
      <div className="mh-plan-stage"><strong>Protect the first week</strong><span>3 left</span></div>
      <ul className="mh-plan-steps">
        {PLAN_PREVIEW_STEPS.map(([title, line]) => (
          <li key={title}><i aria-hidden="true" /><strong>{title}</strong><p>{line}</p></li>
        ))}
      </ul>
      <span className="mh-plan-done-note">Show 2 done</span>
    </div>
  );
}

/* Plan 044: /how-it-works is the long form of the homepage's four steps.
   This is step 1 (plan 050; was step 2). The onboarding composition is unchanged (its strings are
   product state, verified in lumo-plan-builder origin/main 2026-09-07); what
   changed is what the page says it shows - where the Career Context starts,
   not "step 1 of the product". The chips came from the retired "Your context,
   kept" section. */
const CONTEXT_ADDS = ["Your situation & state", "Roles & resumes", "Network"] as const;
const CONTEXT_IMPROVES = ["Applications", "Interviews", "Runway", "Offers"] as const;

export function HowStepContext() {
  return (
    <section className="mh-how-context mh-section mh-split" id="build" aria-labelledby="how-context-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">Step 1 · Build your Career Context</span>
        <h2 id="how-context-title">A few questions. A record that&apos;s actually yours.</h2>
        <p>Your situation, your state, your dates start it. Your resume, your LinkedIn, and the stories you tell in interviews fill it in. Offboard keeps one living record of your experience, applications, companies, conversations, documents, interviews, goals, and progress, so you never explain yourself from scratch again. Private by default, and you can change any of it.</p>
        <div className="mh-context-chips" data-reveal="">
          <div>
            <span>Adds context</span>
            <ul>{CONTEXT_ADDS.map((chip) => <li key={chip}>{chip}</li>)}</ul>
          </div>
          <div>
            <span>Improves next</span>
            <ul>{CONTEXT_IMPROVES.map((chip) => <li key={chip}>{chip}</li>)}</ul>
          </div>
        </div>
      </div>
      <StartingPlan />
    </section>
  );
}

const VERIFIED_FACTS_COLUMNS = [
  ["A verification date on every rule", "Every state rule in Offboard shows when a person last checked it: \"California rules verified June 2026.\""],
  ["Deepest coverage in California", "Including 4,000+ state-approved training programs, with verified official links for every state."],
  ["Paid partners are disclosed", "If a partner pays us, the recommendation says so, right where it appears."],
] as const;

const VERIFIED_FACTS_STATES = ["CA", "NY", "NJ", "WA"] as const;

export function VerifiedFactsStrip() {
  return (
    <section className="mh-verified mh-section" aria-labelledby="verified-title">
      <div className="mh-verified-heading">
        <div><span className="mh-kicker">Verified facts</span><h2 id="verified-title">Deadlines and dollar figures are checked by people, never generated.</h2></div>
        <div className="mh-verified-states">
          <span>Live states</span>
          <div>
            {VERIFIED_FACTS_STATES.map((state, index) => (
              <span key={state} className={index === 0 ? "is-filled" : undefined}>{state}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mh-verified-grid" data-reveal="">
        {VERIFIED_FACTS_COLUMNS.map(([title, body]) => (
          <article key={title}><h3>{title}</h3><p>{body}</p></article>
        ))}
      </div>
    </section>
  );
}

/* Step 4 of four (plan 050; step 1 under plan 044). The first-week rows are the substance of the
   retired five-step list's steps 2 and 3, under the homepage's own step
   name. While /layoff-support is deferred (plan 043) this is the launch
   set's only first-week page, so it carries the depth (owner 2026-09-07).
   "Benefit deadlines" is the plain phrase, not a product noun (owner
   2026-09-07, plan 044 decision 3); the app's public label is Benefits. */
const FIRST_WEEK_ROWS = [
  ["Runway calculator", "How long your money lasts, and which deadlines change the math."],
  ["Benefit deadlines", "Which unemployment, health coverage, and severance dates are coming, and what each one is worth."],
  ["Funded Training", "State-approved programs that may be paid for while you train, with verified official links."],
  ["Paperwork Review", "A read on your severance or offer paperwork before you sign anything."],
] as const;

export function HowStepFirstWeek() {
  return (
    <section className="mh-how-first-week mh-section" id="steady" aria-labelledby="first-week-title">
      <div className="mh-intro-split">
        <div>
          <span className="mh-kicker">Step 4 · Follow your layoff plan</span>
          <h2 id="first-week-title">See your money clearly, then claim what exists.</h2>
        </div>
        <div>
          <p>Your runway, how long you can go, beside the benefit deadlines that are coming and what each one is worth. Then step-by-step paths to unemployment benefits, health coverage, and state-approved funded training, with verified official links. We never promise funding. We show you the exact path to find out.</p>
        </div>
      </div>
      <ol className="mh-how-first-week-rows" data-reveal="">
        {FIRST_WEEK_ROWS.map(([title, body], index) => (
          <li key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{title}</strong>
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ol>
      <small className="mh-how-first-week-note">Offboard is independent, not a government agency, and claiming your benefits is always free.</small>
    </section>
  );
}

const TOOLKIT_FLAGSHIP_CHIPS = ["Ghost check", "Fit read", "Tailored materials", "Warm intro"] as const;

/* Step 3 of four (plan 050; step 4 under plan 044). The stage strip is the homepage's, name for
   name and chip for chip (every chip is a string the product produces; see
   MarketingHome.tsx). Before this the page listed a different set with no
   stages and could not claim a number; now both pages list the same ten.
   The three cards with renders stay; Ghost Job Checker, Paperwork Review,
   Runway calculator, Funded Training and Ask Lumo left the grid (the last
   four belong to steps 1 and 3, the first is in the strip). The composite
   "Interview prep & practice" card split as the glossary anticipated: it is
   Interview Prep here, Voice Practice sits beside it in the strip. */
const TOOLKIT_STAGES = [
  { icon: Search, title: "Decide", chip: "Strong fit", decides: "Whether this one deserves your week.", tools: ["Role Match", "Ghost Job Checker", "Company Intel"] },
  { icon: FileText, title: "Apply", chip: "Ready for review", decides: "What you actually send.", tools: ["Application Packets", "Resume Tailoring", "Cover Letters"] },
  { icon: MessageSquare, title: "Interview", chip: "Prep ready", decides: "Walking in prepared, not rehearsed.", tools: ["Interview Prep", "Voice Practice"] },
  { icon: ListChecks, title: "Organize", chip: "Saved to tracker", decides: "Where all of it is kept.", tools: ["Application Tracker", "Career Context"] },
] as const;

const TOOLKIT_CARDS: Array<{ title: string; body: string; image: string; alt: string }> = [
  { title: "Resume Tailoring", body: "Build and tailor resumes from your real history, ready for the role in front of you.", image: "/marketing/homepage/renders/toolkit-resumes.webp", alt: "Product render of the Resume Tailoring view, a resume tailored to a role beside the original" },
  { title: "Interview Prep", body: "Drills grounded in the role, the company, and your strongest stories, with practice runs before the real one.", image: "/marketing/homepage/renders/toolkit-interviews.webp", alt: "Product render of interview prep, two message cards exchanging a question and a prepared answer" },
  { title: "Application Tracker", body: "Every application, stage, and follow-up stays current without extra busywork.", image: "/marketing/homepage/renders/toolkit-applications.webp", alt: "Product render of the application tracker, cards filed by stage" },
];

export function ToolkitSection() {
  return (
    <section className="mh-toolkit mh-section" id="toolkit" aria-labelledby="toolkit-title">
      <div className="mh-intro-split">
        <div>
          <span className="mh-kicker">Step 3 · Run your search</span>
          <h2 id="toolkit-title">The tools didn&apos;t go anywhere. Now they show up at the right moment.</h2>
        </div>
        <div>
          <p>Ten tools that read from the same context, so nothing is retyped and nothing is forgotten.</p>
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
      <div className="mh-toolkit-layout" data-reveal="">
        <article className="mh-toolkit-flagship">
          <div className="mh-toolkit-flagship-visual">
            <Image src="/marketing/homepage/renders/toolkit-job-packets.webp" alt="Product render of the Application Packet view, a document linked to its tailored materials" fill sizes="(max-width: 900px) 100vw, 38vw" />
          </div>
          <span className="mh-kicker is-lime">Flagship</span>
          <h3>Application Packet</h3>
          <p>Paste a posting and get a ghost-job check, a fit read, tailored materials, and a warm path to a real person, all kept with the role.</p>
          <ul>
            {TOOLKIT_FLAGSHIP_CHIPS.map((chip) => <li key={chip}>{chip}</li>)}
          </ul>
          <a className="mh-section-link" href={SIGN_UP_URL}>Explore the Application Packet <ArrowRight aria-hidden="true" /></a>
        </article>
        <div className="mh-toolkit-grid">
          {TOOLKIT_CARDS.map(({ title, body, image, alt }) => (
            <article key={title}>
              <div className="mh-toolkit-card-visual">
                <Image src={image} alt={alt} fill sizes="(max-width: 900px) 100vw, 22vw" />
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const LUMO_QUESTIONS = [
  "What deadlines am I coming up on?",
  "Am I eligible for funded training?",
  "Walk me through this severance agreement.",
  "Help me prepare for tomorrow's interview.",
] as const;

export function LumoSection() {
  return (
    <section className="mh-lumo mh-section mh-split" id="connect" aria-labelledby="lumo-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-lime">Step 2 · Talk with Lumo</span>
        <h2 id="lumo-title">An AI guide that knows your actual situation.</h2>
        <p>Lumo works from your Career Context, your benefit facts, your runway, and your search, not a blank chat window. It paces with you: triage in week one, interview drills in month three. Like a caseworker who answers in seconds, remembers everything, and never has a line.</p>
        <div className="mh-lumo-trust">
          <p>When Lumo talks about your benefits, it reads from human-verified state facts. It never invents a dollar figure or a deadline.</p>
        </div>
        {/* The homepage's own sentence (plan 044). The beta line is governed
            by the ledger row "Live integrations" and is not optional. */}
        <p>Prefer ChatGPT or Claude? Connect Offboard and take your context with you.</p>
        <small>ChatGPT and Claude connections are in beta.</small>
      </div>
      <div className="mh-lumo-questions" data-reveal="">
        <span>Ask questions like</span>
        <ol>
          {LUMO_QUESTIONS.map((question, index) => (
            <li key={question}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{question}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function HumanSupportSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`mh-human mh-section mh-split ${compact ? "is-compact" : ""}`.trim()} aria-labelledby="human-title">
      <div className="mh-human-photo"><Image src="/marketing/homepage/raw/strip-call-outside.webp" alt="A man on a balcony, phone to his ear, looking out over the street" fill sizes="(max-width: 900px) 100vw, 42vw" /></div>
      <div className="mh-copy-block">
        <span className="mh-kicker">Use the support that fits the moment</span>
        <h2 id="human-title">You can do this yourself. You should not have to do it alone.</h2>
        <p>Use Offboard on your own, ask Lumo for guidance when you get stuck, or talk with a real person when the situation needs more context.</p>
        <NumberedRows rows={HUMAN_STEPS} />
        <a className="mh-primary-cta" href={HUMAN_SUPPORT_URL}><span>Talk to someone</span><ArrowRight aria-hidden="true" /></a>
        <small>Availability, format, and pricing vary by support option.</small>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section className="mh-pricing mh-section" id="pricing" aria-labelledby="pricing-title">
      <div className="mh-pricing-heading"><div><span className="mh-kicker">A simple place to start</span><h2 id="pricing-title">Start free. Add more support when you need it.</h2></div><p>Begin with a transition plan and the core tools. Add credits or human support only when you choose to go further. You will see the price and what is included before you pay.</p></div>
      <div className="mh-price-deck" data-reveal="">
        <article className="is-primary">
          <header>
            <h3>Free</h3>
          </header>
          <p className="mh-price-value"><b>$0</b><small>forever</small></p>
          <p>Everything you need to run the search, and one complete Application Packet with every step free.</p>
          <ul>
            <li><Check aria-hidden="true" />Layoff Plan, tracker, benefit facts, and documents</li>
            <li><Check aria-hidden="true" />One complete Application Packet, every step free</li>
            <li><Check aria-hidden="true" />The assessment on every packet after that: is it real, who is the company, how you fit</li>
            <li><Check aria-hidden="true" />3 basic ghost checks a month</li>
            <li><Check aria-hidden="true" />Ask Lumo, 10 messages a day</li>
            <li><Check aria-hidden="true" />Connect ChatGPT or Claude to read your Offboard and update your tracker</li>
          </ul>
          <PrimaryCta />
        </article>
        <article>
          <header>
            <h3>Offboard Pro</h3>
            <b className="is-badge">For active searches</b>
          </header>
          <p className="mh-price-value"><b>$20</b><small>/month</small></p>
          <p>Offboard does the repeated application work for you, on every packet.</p>
          <ul>
            <li><Check aria-hidden="true" />Tailored resumes, cover letters, interview briefs, and a path to a person on every packet</li>
            <li><Check aria-hidden="true" />Enriched ghost checks: duplicate postings, employer reviews, salary benchmark</li>
            <li><Check aria-hidden="true" />Ask Lumo without a daily limit, on the advanced model</li>
            <li><Check aria-hidden="true" />Your connected assistant can run packets and checks for you</li>
            <li><Check aria-hidden="true" />About 30 full packets a month. We email you at 25 and never stop a build without warning.</li>
          </ul>
          <small className="mh-price-billing">Or $45 every 3 months, which is $15 a month. Cancel anytime.</small>
          <PrimaryCta>Upgrade to Pro</PrimaryCta>
        </article>
        <article>
          <header>
            <h3>Sponsored access</h3>
            <b className="is-badge">May be covered</b>
          </header>
          <p>Outplacement, modernized. Your former employer, school, or workforce organization may cover your access.</p>
          <ul>
            <li><Check aria-hidden="true" />The full sponsored benefit is delivered to you</li>
            <li><Check aria-hidden="true" />Your private career activity remains yours</li>
            <li><Check aria-hidden="true" />Sponsors receive aggregate reporting only</li>
          </ul>
          <Link className="mh-secondary-cta" href="/employers"><span>Learn about sponsored access</span><ArrowRight aria-hidden="true" /></Link>
        </article>
      </div>
      <p className="mh-price-note">Credits pay for the extras outside your search: headshots, the brand kit, voice practice, and paperwork review. Everything in the Application Packet is covered by your plan. Claiming your government benefits is always free, on any tier.</p>
    </section>
  );
}

/* Pattern H, the disclosure list (DESIGN.md). One implementation for the five
   route FAQs and the homepage's member questions, because the site had been
   about to grow a second accordion.

   Native <details>, no client component: the mobile menu has used the same
   technique since plan 037, and `.marketing-homepage summary:focus-visible`
   already carries the focus ring. The container is a <div> rather than a <ul>
   on purpose - the stylesheet resets `ul` margin at (0,1,1), so a bare-class
   margin on a list would be a dead declaration and e2e/reset-shadowing.spec.ts
   would fail on six routes.

   A closed answer is still in the DOM, so CopyDrift's textContent comparison
   against COPY.md is unaffected by collapsing anything. */
export type DisclosureItem = {
  question: string;
  /* The homepage's questions carry a short feature label between the question
     and its answer; a route FAQ has only the two parts. */
  feature?: string;
  answer: string;
};

export function DisclosureList({
  items,
  openFirst = false,
}: {
  items: readonly DisclosureItem[];
  openFirst?: boolean;
}) {
  return (
    <div className="mh-disclosure-list" data-reveal="">
      {items.map(({ question, feature, answer }, index) => (
        <details className="mh-disclosure" key={question} open={openFirst && index === 0}>
          <summary><h3>{question}</h3></summary>
          <div>
            {feature ? <span className="mh-qblock-feature">{feature}</span> : null}
            <p>{answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export function FaqSection({
  title,
  items,
}: {
  title: string;
  items: readonly (readonly [string, string])[];
}) {
  return (
    <section className="mh-faq mh-section" id="faq" aria-labelledby="faq-title">
      <div><span className="mh-kicker">Good questions</span><h2 id="faq-title">{title}</h2></div>
      <DisclosureList items={items.map(([question, answer]) => ({ question, answer }))} />
    </section>
  );
}

/* Owner direction 2026-09-02: the three-card layout from the live site, with
   each partner's real mark (public/marketing/logos, sourced in COPY.md § 1),
   restyled to Civic Modern. Three cards in three columns fills its row
   (DESIGN.md R1). No filled button: three primaries in one view would break
   the one-primary rule, so all three take the outline treatment. */
const COMMUNITY_ROWS = [
  {
    logo: "/marketing/logos/beehiiv.png",
    icon: true,
    title: "The Offboard Newsletter",
    body: "Weekly job-market analysis and honest takes on tech hiring. 5,000+ subscribers.",
    cta: "Subscribe free",
    href: "https://newsletter.offboard.co",
    note: "Free, weekly, unsubscribe anytime",
  },
  {
    logo: "/marketing/logos/slack.svg",
    icon: false,
    title: "Slack community",
    body: "Job seekers sharing leads, asking questions, and keeping each other accountable.",
    cta: "Join the Slack",
    href: "https://offboard.co/community",
    note: "Free to join",
  },
  {
    logo: "/marketing/logos/offboard-symbol.png",
    icon: true,
    title: "Meet with a human",
    body: "Stuck on your search? Share where you are and our team reaches out directly. Free.",
    cta: "Say hello",
    href: HUMAN_SUPPORT_URL,
    note: "Free, reviewed by our team",
  },
] as const;

export function CommunityStrip() {
  return (
    <section className="mh-community mh-section" id="community" aria-labelledby="community-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">Community</span>
        <h2 id="community-title">Job searching is hard enough without doing it alone.</h2>
        <p>Practical job-market intelligence, people navigating the same uncertainty, and a real person when you feel stuck.</p>
      </div>
      <div className="mh-community-cards" data-reveal="">
        {COMMUNITY_ROWS.map((row) => (
          <article key={row.title}>
            <span className={`mh-community-logo${row.icon ? " is-icon" : ""}`}><img src={row.logo} alt="" width={56} height={56} loading="lazy" decoding="async" /></span>
            <h3>{row.title}</h3>
            <p>{row.body}</p>
            {row.href.startsWith("/") ? (
              <Link className="mh-secondary-cta" href={row.href}><span>{row.cta}</span><ArrowRight aria-hidden="true" /></Link>
            ) : (
              <a className="mh-secondary-cta" href={row.href}><span>{row.cta}</span><ArrowRight aria-hidden="true" /></a>
            )}
            <small>{row.note}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FinalCta({
  title = "Find out first.",
  body = "Bring your situation. In a few minutes you will see how long your money lasts, which deadlines are coming, and what may be waiting for you. Then a clear plan for what to do about it.",
  photo = false,
}: {
  title?: string;
  body?: string;
  /* Plan 018 phase 4: the homepage runs six text-only bands between the hero
     photo and the footer. Only the homepage opts in -- the other three routes
     that share this component render exactly the markup they did before, so
     they neither re-lay-out nor download the image. */
  photo?: boolean;
}) {
  return (
    <section className={`mh-final-cta mh-section${photo ? " is-photo" : ""}`} aria-labelledby="final-title">
      {photo ? (
        <div className="mh-final-cta-photo">
          <Image src="/marketing/homepage/raw/final-cta-portrait.webp" alt="A woman standing in an open doorway with a bag over her shoulder, looking out toward the street" fill sizes="(max-width: 900px) 100vw, 36vw" />
        </div>
      ) : null}
      <div className="mh-final-cta-copy">
      <span className="mh-kicker is-lime">You do not need the whole plan today</span>
      <h2 id="final-title">{title}</h2>
      <p>{body}</p>
      <div><PrimaryCta /><a href={HUMAN_SUPPORT_URL}>Talk to a person</a></div>
      <small>Independent support. Start free.</small>
      <div className="mh-progress-mark" aria-hidden="true"><i /><span /><i /><span /><i /></div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Route content sections (plan 042).                                   */
/*                                                                      */
/* These replace `EditorialGrid`, which rendered every "three or four    */
/* things" moment on ten routes as the same bordered 01/02/03 grid.      */
/* It was wrong three ways at once: the numerals said "steps" over       */
/* content that was a contrast, each 280px cell held a title and one     */
/* sentence with about 60% of the box empty, and the odd-count fix       */
/* (`:nth-last-child`, Pattern B) promoted item 01 to full width - which */
/* on /career-context made "What a resume holds" the visual hero of a    */
/* section arguing that the resume is the small thing.                   */
/*                                                                       */
/* Three shapes replace it, chosen by what the content IS. All three     */
/* keep the `.mh-route-content` band so every caller's band rhythm is    */
/* unchanged; only the inside of the section moves.                      */
/*                                                                       */
/*   Statements  - an argument or a set of principles. Serif lines on    */
/*                 hairlines, no boxes, no numerals.                     */
/*   FeatureRows - what someone gets. Compact rows, body font.           */
/*   Contrast    - "this vs that". Shows the two things as product UI    */
/*                 (R2/R13) instead of describing them in cells.         */
/*                                                                       */
/* A real sequence still takes numerals, and still uses NumberedRows.    */
/* ------------------------------------------------------------------ */

function headingIdFor(title: string) {
  return `${title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-title`;
}

function RouteContentSection({
  title,
  kicker,
  body,
  modifier,
  children,
}: {
  title: string;
  kicker: string;
  body: string;
  modifier?: string;
  children: ReactNode;
}) {
  const headingId = headingIdFor(title);

  return (
    <section className={`mh-route-content mh-section${modifier ? ` ${modifier}` : ""}`} aria-labelledby={headingId}>
      <div className="mh-route-content-heading"><span className="mh-kicker">{kicker}</span><h2 id={headingId}>{title}</h2><p>{body}</p></div>
      {children}
    </section>
  );
}

/* An argument, or a set of principles. Any count: it is one column, so R1
   has nothing to balance. */
export function Statements({
  kicker,
  title,
  body,
  items,
}: {
  kicker: string;
  title: string;
  body: string;
  items: readonly { title: string; body: string }[];
}) {
  return (
    <RouteContentSection kicker={kicker} title={title} body={body}>
      <ul className="mh-statements" data-reveal="">
        {items.map((item) => (
          <li key={item.title}><strong>{item.title}</strong><p>{item.body}</p></li>
        ))}
      </ul>
    </RouteContentSection>
  );
}

/* What a member, resident, or partner actually gets. Lighter than
   Statements on purpose: /employers ships both, and two identical ruled
   lists on one page would be the same defect this plan removed. */
export function FeatureRows({
  kicker,
  title,
  body,
  items,
}: {
  kicker: string;
  title: string;
  body: string;
  items: readonly { title: string; body: string }[];
}) {
  return (
    <RouteContentSection kicker={kicker} title={title} body={body}>
      <ul className="mh-feature-rows" data-reveal="">
        {items.map((item) => (
          <li key={item.title}><strong>{item.title}</strong><p>{item.body}</p></li>
        ))}
      </ul>
    </RouteContentSection>
  );
}

/* A real sequence - things that happen in an order - is the one shape that
   still earns numerals (DESIGN.md R11). */
export function SequenceSection({
  kicker,
  title,
  body,
  items,
}: {
  kicker: string;
  title: string;
  body: string;
  items: readonly { title: string; body: string }[];
}) {
  return (
    <RouteContentSection kicker={kicker} title={title} body={body}>
      <NumberedRows rows={items.map((item) => [item.title, item.body] as const)} />
    </RouteContentSection>
  );
}

/* "This vs that". The section shows the two things rather than describing
   them in equal cells (R13). `payoff` is the line the retired third cell
   used to carry - the consequence - and it reads better as one statement
   under the pair than as a peer of the two things being contrasted. */
/* ContrastSection (plan 042) retired by plan 046: every product page opened
   with the same kicker / H2 / body / payoff / composition move, and the
   compositions now sit in the heroes. The payoff lines moved into the hero
   bodies; COPY.md §§ 10, 12, 14 record each. */

/* Plan 048 (owner 2026-09-07): a real screenshot of the app, cropped to a
   region with no personal data and no figure the ledger does not cover,
   framed by CSS. Sources: public/marketing/app/*.webp, captured from the
   owner's session at 1512x810 on 2026-09-07. They are 1x, so they read a
   little soft on a Retina screen; a 2x capture replaces the file, not the
   markup. */
export function Shot({ src, alt, width, height, tall = false, plain = false, sizes = "(max-width: 900px) 100vw, 44vw" }: { src: string; alt: string; width: number; height: number; tall?: boolean; plain?: boolean; sizes?: string }) {
  return (
    <figure className={`mh-shot${tall ? " is-tall" : ""}${plain ? " is-plain" : ""}`}>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} />
    </figure>
  );
}

/* Plan 046 part B. One shared "also part of the system" strip replaces the
   four different sibling-promo bands the product pages carried. Two items,
   ruled, above the final CTA. */
export function AlsoStrip({ items }: { items: readonly { title: string; body: string; href: string; cta: string }[] }) {
  return (
    <section className="mh-also mh-section" aria-labelledby="also-title">
      <span className="mh-kicker">Also part of the system</span>
      <h2 id="also-title" className="mh-visually-hidden">Also part of the system</h2>
      <ul className="mh-also-list" data-reveal="">
        {items.map(({ title, body, href, cta }) => (
          <li key={href}>
            <h3>{title}</h3>
            <p>{body}</p>
            <Link className="mh-section-link" href={href}>{cta} <ArrowRight aria-hidden="true" /></Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ContactBand({
  kicker,
  title,
  body,
  cta,
  href,
}: {
  kicker: string;
  title: string;
  body: string;
  cta: string;
  href: string;
}) {
  return (
    <section className="mh-route-contact mh-section">
      <div><span className="mh-kicker is-lime">{kicker}</span><h2>{title}</h2><p>{body}</p></div>
      <a className="mh-primary-cta" href={href}><span>{cta}</span><ArrowRight aria-hidden="true" /></a>
    </section>
  );
}

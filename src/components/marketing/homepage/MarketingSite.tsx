import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, GraduationCap, LockKeyhole } from "lucide-react";
import type { ReactNode } from "react";

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
  | "public-partners"
  | "intake"
  | "act";

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
  ["Do I need a payment method to start?", "No. The Free tier is not a trial. You can build your plan, see your runway and deadlines, track applications, and build your first Job Packet without adding a payment method."],
  ["What happens when I run out of credits?", "The core plan, benefit sheets, and tracking keep working. Credits gate the heavier product work, and they refresh monthly on both tiers."],
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
  children = "Build my plan",
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

const NAV_LINKS: ReadonlyArray<{ route: MarketingRoute; href: string; label: string }> = [
  { route: "how-it-works", href: "/how-it-works", label: "How it works" },
  { route: "pricing", href: "/pricing", label: "Pricing" },
  { route: "resources", href: "/resources", label: "Guides" },
  { route: "about", href: "/about", label: "About" },
  { route: "employers", href: "/employers", label: "For employers" },
];

export function MarketingHeader({ current }: { current: MarketingRoute }) {
  return (
    <header className="mh-site-header">
      <Link href="/" aria-label="Offboard home">
        <Brand />
      </Link>
      <nav aria-label="Marketing navigation">
        {NAV_LINKS.map((item) => (
          <Link
            key={item.route}
            href={item.href}
            aria-current={current === item.route ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mh-header-actions">
        <details className="mh-mobile-menu">
          <summary>Menu</summary>
          <div>
            {NAV_LINKS.map((item) => (
              <Link key={item.route} href={item.href} aria-current={current === item.route ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
            <a href={SIGN_IN_URL}>Sign in</a>
          </div>
        </details>
        <a className="mh-sign-in" href={SIGN_IN_URL}>Sign in</a>
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
          <strong>Offboard</strong>
          <p>
            Offboard is an independent company, not a government agency. We help you navigate the official programs. Your benefits are yours, and claiming them is always free. Information provided by Offboard is general and does not replace guidance from government agencies or qualified legal, tax, financial, or healthcare professionals.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <div>
            <strong>Product</strong>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/resources">Guides</Link>
          </div>
          <div>
            <strong>Partners</strong>
            <Link href="/employers">For employers</Link>
            <Link href="/public-partners">For public partners</Link>
          </div>
          <div>
            <strong>Company</strong>
            <Link href="/about">About</Link>
            <a href={HUMAN_SUPPORT_URL}>Visit us</a>
            <a href="mailto:hello@offboard.co">Contact</a>
          </div>
          <div>
            <strong>Legal</strong>
            <a href="https://app.offboard.co/privacy">Privacy</a>
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
      <a className="mh-skip-link" href="#main-content">Skip to content</a>
      <MarketingHeader current={current} />
      {children}
      <MarketingFooter />
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
  cta = "Build my plan",
  ctaHref = SIGN_UP_URL,
}: {
  kicker: string;
  title: string;
  body: string;
  current: Exclude<MarketingRoute, "home">;
  aside?: ReactNode;
  cta?: string;
  ctaHref?: string;
}) {
  const ctaNode = ctaHref.startsWith("/") ? (
    <Link className="mh-primary-cta" href={ctaHref}><span>{cta}</span><ArrowRight aria-hidden="true" /></Link>
  ) : (
    <a className="mh-primary-cta" href={ctaHref}><span>{cta}</span><ArrowRight aria-hidden="true" /></a>
  );

  return (
    <section className="mh-route-hero mh-section">
      <div>
        <span className="mh-kicker is-lime">{kicker}</span>
        <h1>{title}</h1>
        <p>{body}</p>
        {ctaNode}
      </div>
      <aside aria-label={`${current} summary`}>
        {aside ?? (
          <>
            <span>One connected plan</span>
            <strong>Start with what changed.</strong>
            <p>Offboard organizes what deserves attention now and builds from there.</p>
          </>
        )}
      </aside>
    </section>
  );
}

export function HomeHero() {
  return (
    <section className="mh-hero" id="top">
      <div className="mh-hero-inner">
        <div className="mh-hero-copy">
          <span className="mh-kicker is-lime">For the moment work stops</span>
          <h1><span>The Modern</span> <span>Unemployment Office</span></h1>
          <p>Your layoff comes with help nobody tells you about. Offboard turns the weeks after it into one calm plan: the benefits you can claim, the deadlines that matter, how long your money lasts, and what to do next, with tools that help you execute every step.</p>
          <div className="mh-hero-actions">
            <PrimaryCta>Build my free transition plan</PrimaryCta>
            <Link href="/how-it-works">See how Offboard works <ArrowRight aria-hidden="true" /></Link>
          </div>
          <small><LockKeyhole aria-hidden="true" />No credit card required. Benefit facts are verified by people, never generated by AI. Offboard is independent, not a government agency, and claiming your benefits is always free.</small>
        </div>
        <div className="mh-hero-visual">
          <div className="mh-hero-photo">
            <Image src="/marketing/homepage/raw/hero-real-life.webp" alt="A woman at a desk by a window, writing in a notebook as she plans what comes next" fill sizes="(max-width: 900px) 100vw, 42vw" preload />
          </div>
          <div className="mh-hero-note mh-note-one"><CalendarDays aria-hidden="true" /><span><small>Protect my runway</small><strong>Priorities first</strong></span></div>
          <div className="mh-hero-note mh-note-two"><GraduationCap aria-hidden="true" /><span><small>Plan my next move</small><strong>One connected plan</strong></span></div>
          <div className="mh-official-pill"><Check aria-hidden="true" />Official sources only</div>
        </div>
      </div>
    </section>
  );
}

const PROBLEM_QUESTIONS = [
  ["01", "What am I actually entitled to?"],
  ["02", "How long will my money last?"],
  ["03", "Is my severance agreement normal?"],
  ["04", "What happens to my health insurance?"],
  ["05", "Could I get paid to retrain?"],
  ["06", "When do I really need to be back at work?"],
] as const;

export function ProblemSection() {
  return (
    <section className="mh-problem mh-section mh-split" aria-labelledby="problem-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">The real problem</span>
        <h2 id="problem-title">Most people find out what they were entitled to when it&apos;s too late.</h2>
        <p>A layoff comes with a system attached: unemployment benefits, health-coverage windows, severance review periods, and billions of dollars in federal training money. Nobody markets it, the paperwork is hostile, and the deadlines expire silently while you&apos;re busy rewriting your resume.</p>
      </div>
      <div className="mh-problem-list">
        <span>The questions behind every layoff</span>
        <ol className="mh-plain-list ruled">
          {PROBLEM_QUESTIONS.map(([number, question]) => (
            <li key={question}>{number} {question}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const IDENTITY_BODY =
  "The system that catches you after a layoff is real: unemployment insurance, health-coverage windows, and billions of dollars a year in federal retraining money, delivered through 2,000+ job centers. It's also fifty different portals, hostile paperwork, and deadlines that expire silently. Offboard is the modern layer on top: one calm place that knows how the whole system works, watches your clocks, and walks with you to the next job. One situation. One plan. One clear next move.";

const IDENTITY_LEDGER = [
  ["You find out what you were owed after the deadline passes.", "Your entitlements, dollar amounts, and deadlines surface on day one."],
  ["Paperwork written for the agency. Hold music for you.", "Plain-language steps with verified official links."],
  ["A weekly check, then you're on your own.", "Money, paperwork, and the job search connected in one plan."],
  ["Closes at 4 p.m.", "Open whenever you are, with a guide that knows your situation."],
] as const;

export function IdentityContrast() {
  return (
    <section className="mh-identity mh-section" aria-labelledby="identity-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">Why &quot;unemployment office&quot;</span>
        <h2 id="identity-title">There&apos;s an office for this moment. It just hasn&apos;t been modern until now.</h2>
        <p>{IDENTITY_BODY}</p>
      </div>
      <div className="mh-identity-ledger">
        <div className="mh-identity-ledger-head">
          <span>The old office</span>
          <span>The modern one</span>
        </div>
        {IDENTITY_LEDGER.map(([oldRow, newRow]) => (
          <div className="mh-identity-ledger-row" key={oldRow}>
            <p className="mh-identity-old">{oldRow}</p>
            <p className="mh-identity-new">{newRow}</p>
          </div>
        ))}
      </div>
      <small>Offboard is independent and not affiliated with any government agency. We help you navigate the official programs. Your benefits are yours, and claiming them is always free.</small>
    </section>
  );
}

export function HowItWorksOverview() {
  const jobs = [
    ["01", "Claim what you're owed", "Unemployment benefits, health-coverage windows, severance review, and state-approved funded training, with the deadlines watched."],
    ["02", "Make your money last", "Your runway beside your money clock: which benefit deadlines are coming and what each one is worth."],
    ["03", "Land what's next", "Job Packets, resume tailoring, interview prep, and application tracking, kept connected in one search."],
  ] as const;

  return (
    <section className="mh-three-jobs mh-section" id="how-it-works" aria-labelledby="three-jobs-title">
      <div className="mh-jobs-intro">
        <div><span className="mh-kicker">The three jobs</span><h2 id="three-jobs-title">A layoff gives you three jobs at once.</h2></div>
        <p>Claim the support that exists. Make your money last. Land what comes next. Offboard connects all three in one plan.</p>
      </div>
      <div className="mh-jobs-editorial">
        <Image src="/marketing/homepage/three-jobs-editorial-v1.png" alt="A desk scene representing financial planning, benefits research, and a connected job search" fill sizes="(max-width: 900px) 100vw, 90vw" />
        <span className="mh-job-pill is-runway"><b>01</b>Claim</span>
        <span className="mh-job-pill is-support"><b>02</b>Money</span>
        <span className="mh-job-pill is-next-role"><b>03</b>Next role</span>
      </div>
      <div className="mh-jobs-rail">
        {jobs.map(([number, title, body]) => (
          <article key={title}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div></article>
        ))}
      </div>
      <Link className="mh-section-link" href="/how-it-works">Explore the full plan <ArrowRight aria-hidden="true" /></Link>
    </section>
  );
}

export function HookBand() {
  return (
    <section className="mh-hook mh-section mh-split" aria-labelledby="hook-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-lime">One example</span>
        <h2 id="hook-title">There is a deadline worth roughly $12,000 that most people have never heard of.</h2>
        <p>If you were laid off in California, you may be able to keep your unemployment benefits while you train full-time, including an extension worth roughly $12,000. But only if you contact EDD before week 16 of your benefit payments. Most people have never heard of it. Offboard watches that clock for you.</p>
        <small>Amounts and timing vary by situation. We never promise funding, we show you the exact path to find out.</small>
      </div>
      <div className="mh-money-clock" aria-label="Sample benefit payment deadline card">
        <header>
          <span>Benefit payments</span>
          <b>Sample · CA</b>
        </header>
        <strong>Week 12 of 16</strong>
        <div className="mh-money-clock-bar" aria-hidden="true"><i style={{ width: "75%" }} /></div>
        <div className="mh-money-clock-ends">
          <span>Now · week 12</span>
          <span>Deadline · week 16</span>
        </div>
        <div className="mh-money-clock-footer">
          <span>~$12,000 at stake</span>
          <span>4 weeks left to contact EDD</span>
        </div>
      </div>
    </section>
  );
}

export function StartingPlan() {
  return (
    <div className="mh-onboarding-visual" aria-label="An abstracted preview of Offboard onboarding">
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

export function StartingPlanPreview() {
  const rows = [
    ["Priority", "Review severance and save questions", "Money"],
    ["Possible", "Review funded training requirements", "Support"],
    ["Next", "Finish application packet for Northstar", "Job search"],
  ] as const;
  return (
    <div className="mh-ui-card mh-plan-preview" aria-label="Example Offboard starting plan">
      <div className="mh-ui-card-heading"><h3>Your starting plan</h3><span>Week one</span></div>
      <div className="mh-segmented"><b>Now</b><span>This week</span><span>Coming up</span></div>
      <div className="mh-plan-rows">
        {rows.map(([status, title, category]) => <div key={title}><span>{status}</span><strong>{title}</strong><small>{category}</small></div>)}
      </div>
      <div className="mh-lumo-row"><span>Ask Lumo what to do first</span><small>Context already attached</small></div>
    </div>
  );
}

export function ConnectedPlanSummary() {
  return (
    <section className="mh-proof mh-section mh-split" aria-labelledby="connected-plan-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">One connected plan</span>
        <h2 id="connected-plan-title">One place for the decisions, deadlines, and opportunities ahead.</h2>
        <p>Offboard brings the practical work of a transition into one place, so you can spend less time rebuilding context and more time taking the next useful step.</p>
        <ul className="mh-plain-list ruled">
          <li>01 A starting plan organized around your situation</li>
          <li>02 One place connecting each role, application, and next step</li>
          <li>03 Possible support with official sources and clear follow-through</li>
        </ul>
        <Link className="mh-primary-cta" href="/how-it-works"><span>See how Offboard works</span><ArrowRight aria-hidden="true" /></Link>
      </div>
      <div><StartingPlanPreview /><small className="mh-card-note">Example information shown. Your plan will reflect the details you choose to provide.</small></div>
    </section>
  );
}

export function StartingPlanSection() {
  return (
    <section className="mh-starting-plan mh-section mh-split" aria-labelledby="starting-plan-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">The first ten minutes</span>
        <h2 id="starting-plan-title">A few questions. A plan that&apos;s actually yours.</h2>
        <p>Your situation, your state, your dates. That&apos;s enough to build a starting plan around what changed, with the option to skip straight to the tools if you already know what you need. Private by default, and you can change your answers any time.</p>
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
      <div className="mh-verified-grid">
        {VERIFIED_FACTS_COLUMNS.map(([title, body]) => (
          <article key={title}><h3>{title}</h3><p>{body}</p></article>
        ))}
      </div>
    </section>
  );
}

const FIVE_STEPS = [
  {
    title: "Tell us where you are",
    body: "A few questions: your situation, your state, your dates. That's enough to build a plan that's actually yours, not a template.",
    tag: "Your situation & state",
  },
  {
    title: "See your money clearly",
    body: "Your runway, how long you can go, beside your money clock: which benefit deadlines are coming and what each one is worth.",
    tag: "Runway calculator · Money clock",
  },
  {
    title: "Claim what exists",
    body: "Step-by-step paths to unemployment benefits, health coverage, and state-approved funded training, with verified official links. We never promise funding. We show you the exact path to find out.",
    tag: "Benefit sheets · Funded training explorer",
  },
  {
    title: "Get ready, then run the search",
    body: "Resume, story, materials, then Job Packets: paste a posting and get a ghost-job check, a fit read, tailored materials, and a warm path to a real person.",
    tag: "Job Packet · Resume Studio",
  },
  {
    title: "Close it, and make it count",
    body: "Interview prep and practice, a paperwork review before you sign, and when you land: mark it, keep your career ledger, and pass what you learned back.",
    tag: "Interview prep · Paperwork review",
  },
] as const;

export function FiveSteps() {
  return (
    <section className="mh-five-steps mh-section" aria-labelledby="five-steps-title">
      <div className="mh-section-heading">
        <span className="mh-kicker">The plan, start to finish</span>
        <h2 id="five-steps-title">Five steps from &quot;what just happened&quot; to &quot;what&apos;s next.&quot;</h2>
      </div>
      <ol className="mh-five-steps-rows">
        {FIVE_STEPS.map((step, index) => (
          <li key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{step.title}</strong>
              <p>{step.body}</p>
            </div>
            <em>{step.tag}</em>
          </li>
        ))}
      </ol>
    </section>
  );
}

const TOOLKIT_FLAGSHIP_CHIPS = ["Ghost check", "Fit read", "Tailored materials", "Warm intro"] as const;

const TOOLKIT_CARDS: Array<{ title: string; body: string; image?: string; alt?: string }> = [
  { title: "Resume Studio", body: "Build and tailor resumes from your real history, ready for the role in front of you.", image: "/marketing/homepage/renders/toolkit-resumes.webp", alt: "Product render of the Resume Studio view, a resume tailored into role-specific cards" },
  { title: "Interview prep & practice", body: "Drills grounded in the role, the company, and your strongest stories.", image: "/marketing/homepage/renders/toolkit-interviews.webp", alt: "Product render of interview prep, two message cards exchanging practice questions" },
  { title: "Application tracker", body: "Every application, stage, and follow-up stays current without extra busywork.", image: "/marketing/homepage/renders/toolkit-applications.webp", alt: "Product render of the application tracker, cards filed by stage" },
  { title: "Ghost-job checker", body: "Flags fake or stale listings before you waste an application on them." },
  { title: "Paperwork review", body: "A read on your severance or offer paperwork before you sign anything." },
  { title: "Runway calculator", body: "See how long your money lasts and which deadlines change the math." },
  { title: "Funded training explorer", body: "Search state-approved programs that may be paid for while you train." },
  { title: "Ask LUMO", body: "An AI guide that works from your plan, your benefit facts, and your search." },
];

export function ToolkitSection() {
  return (
    <section className="mh-toolkit mh-section" id="toolkit" aria-labelledby="toolkit-title">
      <div className="mh-section-heading">
        <span className="mh-kicker">The toolkit</span>
        <h2 id="toolkit-title">The tools didn&apos;t go anywhere. Now they show up at the right moment.</h2>
      </div>
      <div className="mh-toolkit-layout">
        <article className="mh-toolkit-flagship">
          <div className="mh-toolkit-flagship-visual">
            <Image src="/marketing/homepage/renders/toolkit-job-packets.webp" alt="Product render of the Job Packet view, a document linked to its tailored materials" fill sizes="(max-width: 900px) 100vw, 38vw" />
          </div>
          <span className="mh-kicker is-lime">Flagship</span>
          <h3>Job Packet</h3>
          <p>Paste a posting and get a ghost-job check, a fit read, tailored materials, and a warm path to a real person, all kept with the role.</p>
          <ul>
            {TOOLKIT_FLAGSHIP_CHIPS.map((chip) => <li key={chip}>{chip}</li>)}
          </ul>
          <a className="mh-section-link" href={SIGN_UP_URL}>Explore the Job Packet <ArrowRight aria-hidden="true" /></a>
        </article>
        <div className="mh-toolkit-grid">
          {TOOLKIT_CARDS.map(({ title, body, image, alt }) => (
            <article key={title}>
              {image && (
                <div className="mh-toolkit-card-visual">
                  <Image src={image} alt={alt ?? ""} fill sizes="(max-width: 900px) 100vw, 22vw" />
                </div>
              )}
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
    <section className="mh-lumo mh-section mh-split" aria-labelledby="lumo-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-lime">Meet LUMO</span>
        <h2 id="lumo-title">An AI guide that knows your actual situation.</h2>
        <p>LUMO works from your plan, your benefit facts, your runway, and your search, not a blank chat window. It paces with you: triage in week one, interview drills in month three. Like a caseworker who answers in seconds, remembers everything, and never has a line.</p>
        <div className="mh-lumo-trust">
          <p>When LUMO talks about your benefits, it reads from human-verified state facts. It never invents a dollar figure or a deadline.</p>
        </div>
      </div>
      <div className="mh-lumo-questions">
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

const CONTEXT_ADDS = ["Your situation & state", "Money clock", "Roles & resumes", "Network"] as const;
const CONTEXT_IMPROVES = ["Applications", "Interviews", "Runway", "Offers"] as const;

const INTEGRATIONS = [
  { name: "Calendar", soon: false },
  { name: "Gmail", soon: false },
  { name: "Drive", soon: false },
  { name: "Slack", soon: true },
  { name: "Notion", soon: true },
] as const;

export function ContextSection() {
  return (
    <section className="mh-context mh-section" aria-labelledby="context-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">Your context, kept</span>
        <h2 id="context-title">Stop repeating your story to every new tool.</h2>
        <p>Your situation, state, runway, roles, resumes, applications, interviews, and outcomes stay connected. Every step of the plan, and every tool, starts from your real context instead of a blank page.</p>
      </div>
      <div className="mh-context-chips">
        <div>
          <span>Adds context</span>
          <ul>{CONTEXT_ADDS.map((chip) => <li key={chip}>{chip}</li>)}</ul>
        </div>
        <div>
          <span>Improves next</span>
          <ul>{CONTEXT_IMPROVES.map((chip) => <li key={chip}>{chip}</li>)}</ul>
        </div>
      </div>
      <div className="mh-integrations">
        <p>Connects to your stack. Your tools provide context. Offboard provides the plan.</p>
        <ul>
          {INTEGRATIONS.map((integration) => (
            <li key={integration.name} className={integration.soon ? "is-soon" : undefined}>
              {integration.name}{integration.soon ? " · soon" : ""}
            </li>
          ))}
        </ul>
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

export function PrivacySummary() {
  return (
    <section className="mh-home-trust mh-section" aria-labelledby="trust-summary-title">
      <div><span className="mh-kicker is-lime">Private by default</span><h2 id="trust-summary-title">Your transition is yours.</h2></div>
      <div className="mh-home-trust-grid">
        <article><span>01</span><strong>Independent</strong><p>Offboard is not affiliated with any state or federal agency.</p></article>
        <article><span>02</span><strong>Your choice</strong><p>You choose what enters your plan and which support you request.</p></article>
        <article><span>03</span><strong>Clear sponsor terms</strong><p>Sponsored programs explain what a sponsor can and cannot see before enrollment.</p></article>
      </div>
      <a href="https://app.offboard.co/privacy">Read the privacy policy <ArrowRight aria-hidden="true" /></a>
    </section>
  );
}

export function PricingSection() {
  return (
    <section className="mh-pricing mh-section" id="pricing" aria-labelledby="pricing-title">
      <div className="mh-pricing-heading"><div><span className="mh-kicker">A simple place to start</span><h2 id="pricing-title">Start free. Add more support when you need it.</h2></div><p>Begin with a transition plan and the core tools. Add credits or human support only when you choose to go further. You will see the price and what is included before you pay.</p></div>
      <div className="mh-price-deck">
        <article className="is-primary">
          <header>
            <h3>Free</h3>
          </header>
          <p className="mh-price-value"><b>$0</b><small>forever</small></p>
          <p>See your plan, your runway, and your benefit deadlines. Then build your first Job Packet.</p>
          <ul>
            <li><Check aria-hidden="true" />Transition plan &amp; benefit sheets</li>
            <li><Check aria-hidden="true" />Runway calculator</li>
            <li><Check aria-hidden="true" />First Job Packet free</li>
            <li><Check aria-hidden="true" />Application tracking</li>
            <li><Check aria-hidden="true" />3 LUMO messages per day</li>
            <li><Check aria-hidden="true" />30 monthly credits</li>
          </ul>
          <PrimaryCta>Build my free transition plan</PrimaryCta>
        </article>
        <article>
          <header>
            <h3>Offboard Pro</h3>
            <b className="is-badge">For active transitions</b>
          </header>
          <p className="mh-price-value"><b>$20</b><small>/month</small></p>
          <p>For an active transition that needs more room: research, tailoring, preparation, paperwork review, and unlimited LUMO.</p>
          <ul>
            <li><Check aria-hidden="true" />Unlimited conversations with LUMO</li>
            <li><Check aria-hidden="true" />More room for Job Packets and tailoring</li>
            <li><Check aria-hidden="true" />Deeper application and interview support</li>
            <li><Check aria-hidden="true" />300 monthly credits</li>
          </ul>
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
          <Link className="mh-primary-cta" href="/employers"><span>Learn about sponsored access</span><ArrowRight aria-hidden="true" /></Link>
        </article>
      </div>
      <p className="mh-price-note">Quarterly billing details and the full feature comparison are shown at checkout. Claiming your government benefits is always free, on any tier.</p>
    </section>
  );
}

const PRICING_TEASER_CARDS = [
  {
    name: "Free",
    price: "$0 forever",
    body: "See your plan, your runway, and your benefit deadlines. Then build your first Job Packet.",
    features: "Transition plan & benefit sheets · Runway calculator · First Job Packet free · Application tracking · 3 LUMO messages a day",
  },
  {
    name: "Offboard Pro",
    price: "$20/month",
    body: "For an active transition that needs more room: research, tailoring, preparation, and paperwork review.",
    features: "Unlimited LUMO · More Job Packets and tailoring · Deeper application and interview support",
  },
  {
    name: "Sponsored",
    badge: "May be covered",
    body: "Outplacement, modernized. Your former employer, school, or workforce organization may cover your access.",
    features: "Full benefit delivered to you · Your activity stays private · Sponsors see aggregate reporting only",
  },
] as const;

export function PricingTeaser() {
  return (
    <section className="mh-pricing-teaser mh-section" aria-labelledby="pricing-teaser-title">
      <div className="mh-pricing-teaser-heading">
        <span className="mh-kicker">Pricing</span>
        <h2 id="pricing-teaser-title">Start free. Upgrade when you need more support.</h2>
        <Link className="mh-section-link" href="/pricing">Compare all pricing details <ArrowRight aria-hidden="true" /></Link>
      </div>
      <div className="mh-pricing-teaser-cards">
        {PRICING_TEASER_CARDS.map((card) => (
          <article key={card.name}>
            <header>
              <span>{card.name}</span>
              {"price" in card ? <b>{card.price}</b> : <b className="is-badge">{card.badge}</b>}
            </header>
            <p>{card.body}</p>
            <small>{card.features}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EmployerStrip() {
  return (
    <section className="mh-employer-strip mh-section" aria-labelledby="employer-strip-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">For employers</span>
        <h2 id="employer-strip-title">Letting people go? Hand them the modern unemployment office on the way out.</h2>
        <p>Real, private help for each departing person. Self-serve and one-time per seat, live in under 15 minutes. No enterprise contract, no sales call.</p>
        <Link className="mh-section-link" href="/employers">Offboard for employers <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
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
      <div className="mh-faq-list">{items.map(([question, answer]) => <article key={question}><header><h3>{question}</h3></header><p>{answer}</p></article>)}</div>
    </section>
  );
}

const COMMUNITY_ROWS = [
  {
    title: "The Offboard Newsletter",
    body: "Weekly job-market analysis and honest takes on tech hiring. 5,000+ subscribers.",
    cta: "Subscribe free",
    href: "https://newsletter.offboard.co",
  },
  {
    title: "Slack community",
    body: "Job seekers sharing leads, asking questions, and keeping each other accountable.",
    cta: "Join the Slack",
    href: "https://offboard.co/community",
  },
  {
    title: "Meet with a human",
    body: "Stuck on your search? Share where you are and our team reaches out directly. Free.",
    cta: "Say hello",
    href: HUMAN_SUPPORT_URL,
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
      <div className="mh-community-rows">
        {COMMUNITY_ROWS.map((row) => (
          <article key={row.title}>
            <h3>{row.title}</h3>
            <p>{row.body}</p>
            <a href={row.href}>{row.cta} <ArrowRight aria-hidden="true" /></a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FinalCta({
  title = "Find out first.",
  body = "Bring your situation. In a few minutes you will see how long your money lasts, which deadlines are coming, and what may be waiting for you. Then a clear plan for what to do about it.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="mh-final-cta mh-section" aria-labelledby="final-title">
      <span className="mh-kicker is-lime">You do not need the whole plan today</span>
      <h2 id="final-title">{title}</h2>
      <p>{body}</p>
      <div><PrimaryCta>Build my free transition plan</PrimaryCta><a href={HUMAN_SUPPORT_URL}>Talk to a person</a></div>
      <small>Independent support. Start free.</small>
      <div className="mh-progress-mark" aria-hidden="true"><i /><span /><i /><span /><i /></div>
    </section>
  );
}

export function EditorialGrid({
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
  const headingId = `${title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-title`;

  return (
    <section className="mh-route-content mh-section" aria-labelledby={headingId}>
      <div className="mh-route-content-heading"><span className="mh-kicker">{kicker}</span><h2 id={headingId}>{title}</h2><p>{body}</p></div>
      <div className="mh-route-card-grid">{items.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
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

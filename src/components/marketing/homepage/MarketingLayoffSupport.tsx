import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  AlsoStrip,
  FinalCta,
  Shot,
  MarketingShell,
  PageHero,
  SIGN_UP_URL,
  VerifiedFactsStrip,
} from "./MarketingSite";

/* Layoff & Benefits pillar page (plan 030, rebuilt by plan 041). The strategy
   doc calls this the strategically important one: without it the product
   pages drift toward an AI job-search tool and away from the modern
   unemployment office.

   Plan 041 (2026-09-04) rebuilt the middle of the page. It used to be six
   one-sentence question cards - one of which was the job search - followed by
   four tiles restating the hero. The app ships far more stabilization
   substance than that showed: a first-week checklist, Paperwork Review, the
   runway view, and a path for people who have been out a while. Those are now
   the page.

   It is still the most claim-sensitive page on the site. Every number here
   comes from an existing verified-facts ledger row via the shared
   VerifiedFactsStrip or the CalJOBS hook; the page promises no funding,
   eligibility, or amount; and the independence disclaimer gets its own band.
   Copy: COPY.md § 13.

   OWNER DECISION 2026-09-04, and the reason this file carries no day counts:
   the marketing site does not get granular about benefit or legal deadlines.
   The real figures behind these sections exist in the app (COBRA election
   window, first-payment lag, ADEA consideration and revocation windows) and
   are deliberately NOT rendered here. Every sentence that would have carried
   one is qualitative instead. This is the same call the owner made for the
   homepage plan card on 2026-08-26 - see the note above PLAN_PREVIEW_STEPS in
   MarketingSite.tsx. Do not "improve" these sentences by adding the numbers
   back; that is a claim the ledger does not carry. */


/* Paperwork Review, the canonical name (COPY.md § Tool glossary, app-owned by
   `legalReviewCopy.ts`). Every value is a state word, never a deadline. */
const REVIEW_ROWS = [
  ["Signing deadline", "On your calendar"],
  ["Release of claims", "What you give up"],
  ["Health coverage", "COBRA notice enclosed"],
  ["Equity treatment", "Flagged to check"],
] as const;

const BENEFIT_ROWS = [
  ["File early, then keep certifying.", "Payments do not start the day you are laid off, and a missed weekly certification pauses them. It takes far longer to fix than to prevent."],
  ["Keep health coverage without a gap.", "COBRA is not your only option, and the decision has a deadline. Offboard puts that date in front of you with the alternatives beside it."],
  ["Training money runs on its own clock.", "State-approved programs may be paid for while you train, and that clock is not your benefits clock. Every program links to the official source that decides it."],
  ["Know how long you can search.", "The runway view turns your savings, severance, and benefits into a number of months, and shows which decisions change it."],
] as const;

/* Plan 048: the hero shows the real Runway page; the plan-041 path card
   composition is retired (the Layoff Plan card still ships on the homepage). */
/* Plan 046: the composition moved into the hero, where the page now opens
   on the path card and the runway sample; this band keeps the copy. */
function FirstWeek() {
  return (
    <section className="mh-first-week mh-section mh-split" aria-labelledby="first-week-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-sand">The first week</span>
        <h2 id="first-week-title">Before the search, protect yourself and your paperwork.</h2>
        <p>The first days after a layoff decide more than people expect. Work logins disappear, notices arrive with short windows, and the documents you will need later are easiest to get now. Offboard starts from your state, your dates, and what actually happened, not from a template.</p>
      </div>
      {/* Plan 049: plan 046 moved this band's composition into the hero and
          left it copy only. The photograph is the moment it describes. */}
      <div className="mh-route-story-photo"><Image src="/marketing/site-imagery/documentary/first-week-paperwork-civic-modern-v1.webp" alt="A woman at her kitchen table reading a printed notice, pen in hand, laptop and papers spread in front of her" fill sizes="(max-width: 900px) 100vw, 44vw" /></div>
    </section>
  );
}

/* Composition A again, mirrored above 900px so the pair does not read as one
   repeated unit (R4). DOM order stays copy-first for reading and screen
   reader order; the swap is `order` in the stylesheet. */
function PaperworkComposition() {
  return (
    <div className="mh-comp mh-review-comp">
      <div className="mh-ui-card mh-review-card mh-comp-base" aria-label="Example Paperwork Review summary">
        <div className="mh-review-head">
          <strong>Severance agreement</strong>
          <b>Reviewed</b>
        </div>
        <ul>
          {REVIEW_ROWS.map(([label, value]) => (
            <li key={label}><span>{label}</span><em>{value}</em></li>
          ))}
        </ul>
      </div>
      <div className="mh-comp-satellite mh-comp-chip"><i className="is-sage" aria-hidden="true" />Plain English · every clause</div>
    </div>
  );
}

function Paperwork() {
  return (
    <section className="mh-paperwork mh-section" aria-labelledby="paperwork-title">
      <div className="mh-split">
        <div className="mh-copy-block">
          <span className="mh-kicker">Paperwork Review</span>
          <h2 id="paperwork-title">Read the agreement before you sign it.</h2>
          <p>Severance agreements, offers, PIPs, and NDAs are written for the company that wrote them. Offboard gives you a plain-English breakdown of the deadlines, the money, and the parts worth a second look, so you know what you are agreeing to.</p>
          <small>AI guidance, not legal advice. Offboard does not replace qualified legal, tax, financial, healthcare, or benefits guidance.</small>
        </div>
        <PaperworkComposition />
      </div>
    </section>
  );
}

/* Pattern C, a ruled list. Replaces the six question cards and the four
   "How it helps" tiles: those two sections between them said this in
   fourteen sentences, one of which was about the job search. */
function Benefits() {
  return (
    <section className="mh-benefits mh-section" aria-labelledby="benefits-title">
      <div className="mh-intro-split">
        <div>
          <span className="mh-kicker">The money side</span>
          <h2 id="benefits-title">What you may be owed, and what it takes to keep it.</h2>
        </div>
        <p>Benefits, health coverage, funded training, and runway are four clocks running at once. Offboard tracks them together and tells you which one needs you next.</p>
      </div>
      <ol className="mh-benefit-rows" data-reveal="">
        {BENEFIT_ROWS.map(([title, body]) => (
          <li key={title}>
            <strong>{title}</strong>
            <p>{body}</p>
          </li>
        ))}
      </ol>
      {/* Plan 049. Every value inside is a state word or a label, never a
          dollar figure or a day count: this page's standing rule. */}
      <Shot plain src="/marketing/homepage/graphics-civic-modern/benefits-summary-civic-modern-v1-transparent.webp" alt="A benefits summary card: California training benefits shown as a possible match, a prompt to file the claim first, a time-sensitive marker, and a note that the agency decides eligibility, sourced to California EDD" width={1536} height={1024} />
    </section>
  );
}

/* The CalJOBS hook (plan 033). Retired from the homepage in v2 and held back
   from this page in plan 030 pending an owner call; the owner said yes on
   2026-09-01, and this page is its documented home. The copy is the approved
   v7 wording, shipped with its conditions and the "amounts vary" small print
   attached, per the verified-facts ledger row. */
function HookBand() {
  return (
    <section className="mh-hook mh-section mh-split" aria-labelledby="hook-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-lime">One example</span>
        <h2 id="hook-title">There is a deadline worth roughly $12,000 that most people have never heard of.</h2>
        <p>If you were laid off in California, you may be able to keep your unemployment benefits while you train full-time, including an extension worth roughly $12,000. But only if you contact EDD before week 16 of your benefit payments. Most people have never heard of it. Offboard watches that clock for you.</p>
        <small>Amounts and timing vary by situation. We never promise funding, we show you the exact path to find out.</small>
      </div>
      <div className="mh-money-clock" data-reveal="" aria-label="Sample benefit payment deadline card">
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

/* Placed after the hook, not before it: the hook is a week-16 example, and
   "you may be past that" immediately beforehand would undercut it. The app's
   intake has a whole branch for this reader ("I've been out a while") and the
   page had nothing for them. */
function StillOwed() {
  return (
    <section className="mh-still-owed mh-section" aria-labelledby="still-owed-title">
      <div className="mh-intro-split">
        <div>
          <span className="mh-kicker">Not week one?</span>
          <h2 id="still-owed-title">Been out a while? Start with what you are still owed.</h2>
        </div>
        <div>
          <p>Benefits may be running low or gone. That does not close the door on funded training, or on the rest of the plan. Tell Offboard where you are now and it starts from there, not from the day you were laid off.</p>
          <a className="mh-section-link" href={SIGN_UP_URL}>Start where you are <ArrowRight aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}

function StraightAnswers() {
  return (
    <section className="mh-route-independence mh-section" aria-labelledby="independence-title">
      <div>
        <span className="mh-kicker is-lime">Straight answers</span>
        <h2 id="independence-title">Offboard is not a government agency.</h2>
      </div>
      <div>
        <p>Offboard helps people organize their transition and reach official sources. Government agencies and program providers make eligibility, benefit, and approval decisions. Offboard does not replace qualified legal, tax, financial, healthcare, or benefits guidance.</p>
        <p>We never promise funding. We show you the exact path to find out. Claiming your benefits is always free, and Offboard never charges for access to a public program.</p>
      </div>
    </section>
  );
}

/* "And then the job" became an item in the shared AlsoStrip (plan 046). */
export function MarketingLayoffSupport() {
  return (
    <MarketingShell current="layoff-support">
      <main id="main-content">
        <PageHero
          kicker="Layoff and benefits"
          title="Losing your job creates a lot of problems at once."
          body="The job search is the visible one. Underneath it are benefit deadlines, health coverage decisions, a shrinking runway, and paperwork written for an agency rather than for you. Offboard helps you take them in the order that matters to you."
          current="layoff-support"
          visual={(
            <figure className="mh-hero-image-composition is-layoff" aria-label="A person organizing paperwork at a desk beside an Offboard first-week plan">
              <span className="mh-hero-image-composition-photo">
                <Image src="/marketing/homepage/raw/system-desk.webp" alt="" fill sizes="(max-width: 900px) 100vw, 42vw" priority />
              </span>
              <Image className="mh-hero-image-composition-card" src="/marketing/site-imagery/product-compositions/first-week-plan-civic-modern-v1-transparent.webp" alt="" width={1536} height={1024} priority />
            </figure>
          )}
          cta="Get started free"
        />
        <FirstWeek />
        <Paperwork />
        <Benefits />
        <HookBand />
        <StillOwed />
        <VerifiedFactsStrip />
        <StraightAnswers />
        <AlsoStrip items={[
          { title: "When the paperwork is handled, the search is still there.", body: "Offboard keeps the money side and the search side in the same place, so the work you do on one does not get lost when you turn to the other.", href: "/job-search", cta: "See how the search runs" },
          { title: "It all lands in one record.", body: "Your situation, your dates, your documents, and every decision you make here become part of your Career Context, so the search starts from what actually happened.", href: "/career-context", cta: "See what it holds" },
        ]} />
        <FinalCta
          title="Start with what changed."
          body="Tell Offboard what happened and get a plan that covers the money, the benefits, and the search, in the order they actually matter."
        />
      </main>
    </MarketingShell>
  );
}

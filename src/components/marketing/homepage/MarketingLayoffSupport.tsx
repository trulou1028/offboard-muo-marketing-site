import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  FinalCta,
  MarketingShell,
  PageHero,
  VerifiedFactsStrip,
} from "./MarketingSite";

/* Layoff & Benefits pillar page (plan 030). The strategy doc calls this the
   strategically important one: without it the product pages drift toward an
   AI job-search tool and away from the modern unemployment office.

   It is also the most claim-sensitive page on the site. Every number here
   comes from an existing verified-facts ledger row via the shared
   VerifiedFactsStrip; the page promises no funding, eligibility, or amount;
   and the independence disclaimer gets its own band. Copy: COPY.md § 13. */

const QUESTIONS = [
  ["What do I do first?", "Your transition plan", "Tell Offboard what happened and it organizes what needs attention now, what can wait, and what comes next."],
  ["What am I eligible for?", "Unemployment benefits", "Plain-language steps toward the official process in your state, with the deadlines that matter surfaced early."],
  ["How do I keep health insurance?", "Health coverage", "Understand the windows you are inside, and what your options are before one of them closes."],
  ["Is there funding for training?", "Workforce and retraining programs", "Find state-approved programs that may be paid for while you train, with the official source for each one."],
  ["How long can I afford to search?", "Runway", "See how long your money lasts, and which decisions change that number."],
  ["How do I find another job?", "The search itself", "The tracker, the packets, the interview prep, and the record behind them."],
] as const;

const HOW_IT_HELPS = [
  ["Your situation, not a template", "The plan starts from your state, your dates, and what actually happened."],
  ["Deadlines surfaced early", "The clocks that expire quietly are the expensive ones. Offboard puts them in front of you."],
  ["Official sources, every time", "Every program links to the official source that decides it. You are never asked to take our word for it."],
  ["The search stays connected", "The money side and the job side live in one place instead of two."],
] as const;

function Questions() {
  return (
    <section className="mh-morethan mh-section" aria-labelledby="questions-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-sand">What people actually ask</span>
        <h2 id="questions-title">Six questions, in the order they usually arrive.</h2>
      </div>
      <div className="mh-qgrid" data-reveal="">
        {QUESTIONS.map(([question, feature, body]) => (
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

function HowItHelps() {
  return (
    <section className="mh-ctx mh-section" aria-labelledby="helps-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">How it helps</span>
        <h2 id="helps-title">One plan, in the order that matters.</h2>
      </div>
      <div className="mh-capabilities" data-reveal="">
        {HOW_IT_HELPS.map(([title, body]) => (
          <div className="mh-capability" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
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

function ThenTheSearch() {
  return (
    <section className="mh-wherever mh-section" aria-labelledby="then-search-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">And then the job</span>
        <h2 id="then-search-title">When the paperwork is handled, the search is still there.</h2>
        <p>Offboard keeps the money side and the search side in the same place, so the work you do on one does not get lost when you turn to the other.</p>
        <Link className="mh-section-link" href="/how-it-works">See how Offboard works <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

export function MarketingLayoffSupport() {
  return (
    <MarketingShell current="layoff-support">
      <main id="main-content">
        <PageHero
          kicker="Layoff and benefits"
          title="Losing your job creates a lot of problems at once."
          body="The job search is the visible one. Underneath it are benefit deadlines, health coverage decisions, a shrinking runway, and paperwork written for an agency rather than for you. Offboard helps you take them in order."
          current="layoff-support"
          aside={false}
          cta="Build my free transition plan"
        />
        <Questions />
        <HookBand />
        <HowItHelps />
        <VerifiedFactsStrip />
        <StraightAnswers />
        <ThenTheSearch />
        <FinalCta
          title="Start with what changed."
          body="Tell Offboard what happened and get a plan that covers the money, the benefits, and the search, in the order they actually matter."
        />
      </main>
    </MarketingShell>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  AlsoStrip,
  FinalCta,
  LumoMark,
  MarketingShell,
  PageHero,
  Shot,
  YouBubble,
} from "./MarketingSite";

/* Lumo pillar page (plan 029). Lumo already appears on the homepage,
   /how-it-works, /career-context and /integrations, so this page takes the
   angle none of them do: what it knows, what to ask it, and why that beats
   pasting a resume into a general assistant. Copy: COPY.md § 12. Existing
   patterns only; no new classes. Band order: deep > paper > mist > paper >
   forest > sand > forest > footer, no two adjacent alike. */

/* Plan 045 messaging pass (plan 040 finding 10): the eight-card grid here
   re-listed /career-context's eight kinds of record. The page now says that
   once, links, and spends its cards on the three things only Lumo carries. */
const ONLY_LUMO = [
  ["Your plan", "Your Path", "What needs attention now, what can wait, and what comes next."],
  ["Benefits context", "The practical side", "Where you are with deadlines, coverage, and runway, so the answer fits the week you are actually in."],
  ["Previous conversations", "Memory", "What you already worked out together, so you are not repeating it."],
] as const;

const PROMPTS = [
  "What should I focus on today?",
  "Is this opportunity worth my time?",
  "Help me prepare for tomorrow's interview.",
  "What support might I qualify for?",
  "How do I make this application stronger?",
  "What patterns do you see across my search?",
  "Add what we just worked out to my Career Context.",
  "Move Tesserac to the interview stage.",
] as const;

/* Plan 048: the hero shows the real Ask LUMO panel from the app's home
   screen; the plan-042 record-and-composer composition is retired. */
function WhatItKnows() {
  return (
    <section className="mh-ctx mh-section" aria-labelledby="knows-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">What it knows</span>
        <h2 id="knows-title">It starts from your record, not a blank page.</h2>
        <p>Everything in your Career Context is already there: your experience, applications, companies, interviews, and goals. Lumo also carries three things no other assistant has.</p>
        <Link className="mh-section-link" href="/career-context">See what your Career Context holds <ArrowRight aria-hidden="true" /></Link>
      </div>
      <div className="mh-qgrid" data-reveal="">
        {ONLY_LUMO.map(([title, feature, body]) => (
          <article className="mh-qblock" key={title}>
            <h3>{title}</h3>
            <span className="mh-qblock-feature">{feature}</span>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhatToAsk() {
  return (
    <section className="mh-wherever mh-section" aria-labelledby="ask-title">
      <div className="mh-wherever-grid">
        <div className="mh-copy-block">
          <span className="mh-kicker">What to ask</span>
          <h2 id="ask-title">Questions that would take a stranger an hour to answer.</h2>
          <p>Lumo answers from the record you have already built, so you can skip the setup and get to the decision.</p>
          <span className="mh-context-callout"><LumoMark />Powered by Offboard Career Context</span>
        </div>
        {/* Plan 046: the prompts are things a person would type, so they
            render as the site's chat bubble, two columns. */}
        <div className="mh-lumo-prompts is-bubbles" aria-label="Example questions to ask Lumo" data-reveal="">
          <span>Ask things like</span>
          {PROMPTS.map((prompt) => <YouBubble key={prompt}>{prompt}</YouBubble>)}
        </div>
      </div>
    </section>
  );
}

function Straight() {
  return (
    <section className="mh-lumo-band mh-section mh-split" aria-labelledby="straight-title">
      <div className="mh-route-story-photo"><Image src="/marketing/homepage/raw/hero-kitchen-table.webp" alt="A man at his kitchen table with a laptop, coffee, and a notebook" fill sizes="(max-width: 900px) 100vw, 44vw" /></div>
      <div className="mh-copy-block">
        <span className="mh-kicker is-lime">Straight answers</span>
        <h2 id="straight-title">It works from verified facts, and it does not decide anything for you.</h2>
        <p>When Lumo talks about benefits, it reads from state facts a person verified. It does not invent a dollar figure or a deadline.</p>
        <p>Offboard is independent, not a government agency. Agencies and providers decide eligibility and benefit amounts. Lumo helps you do the work, and it does not replace your review and judgment on anything you send out.</p>
        <Link className="mh-section-link" href="/pricing">Free includes 10 Lumo messages a day. Pro removes the limit. <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

export function MarketingLumo() {
  return (
    <MarketingShell current="lumo">
      <main id="main-content">
        <PageHero
          kicker="Meet Lumo"
          title="The AI that already understands your career."
          body="Lumo is Offboard's assistant. It works from the record you have already built, so a question about your search starts from your actual situation instead of a blank chat window. You spend the conversation on the decision instead of on context."
          current="lumo"
          visual={<Shot tall src="/marketing/app/ask-lumo-panel.webp" alt="The Ask LUMO panel in Offboard. It says it already knows your situation, lists what it knows, and offers four prompts: what should I do first, what benefits am I missing, review my resume, which application needs a follow-up" width={372} height={746} sizes="(max-width: 900px) 80vw, 380px" />}
          cta="Get started free"
        />
        <WhatItKnows />
        <WhatToAsk />
        <Straight />
        <AlsoStrip items={[
          { title: "Prefer ChatGPT or Claude? That works too.", body: "Lumo lives inside Offboard, but it is not the only way in. Connect the assistant you already use and it works from the same record.", href: "/integrations", cta: "See how Offboard Everywhere works" },
          { title: "Everything Lumo knows starts here.", body: "Your Career Context is the record every answer is built from. Build it once and every conversation starts further ahead.", href: "/career-context", cta: "See what it holds" },
        ]} />
        <FinalCta
          title="Ask something only your own record could answer."
          body="Build your Career Context, then ask Lumo what to do about it."
        />
      </main>
    </MarketingShell>
  );
}

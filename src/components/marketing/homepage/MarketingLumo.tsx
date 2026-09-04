import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Compass,
  ListChecks,
  MessageSquare,
  Sparkles,
  Wallet,
} from "lucide-react";
import {
  ContrastSection,
  FinalCta,
  LumoMark,
  MarketingShell,
  PageHero,
} from "./MarketingSite";

/* Lumo pillar page (plan 029). Lumo already appears on the homepage,
   /how-it-works, /career-context and /integrations, so this page takes the
   angle none of them do: what it knows, what to ask it, and why that beats
   pasting a resume into a general assistant. Copy: COPY.md § 12. Existing
   patterns only; no new classes. Band order: deep > paper > mist > paper >
   forest > sand > forest > footer, no two adjacent alike. */

const KNOWS = [
  { icon: Briefcase, title: "Your Career Context", body: "Experience, projects, outcomes, and the stories you reach for in interviews." },
  { icon: ListChecks, title: "Your applications", body: "What you applied to, what stage it is at, and what happened." },
  { icon: Building2, title: "Companies", body: "What you researched and learned about the teams you are talking to." },
  { icon: MessageSquare, title: "Interviews", body: "Questions asked, answers given, and what to prepare next." },
  { icon: Compass, title: "Your goals", body: "The work you want, and what you said you were optimizing for." },
  { icon: Sparkles, title: "Your plan", body: "What needs attention now, what can wait, and what comes next." },
  { icon: Wallet, title: "Benefits context", body: "Where you are in the practical side of a transition." },
  { icon: MessageSquare, title: "Previous conversations", body: "What you already worked out together, so you are not repeating it." },
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

/* Was a three-cell numbered grid. Cells 1 and 2 described the blank box and
   the record; the section now shows them (plan 042, DESIGN.md R13). Cell 3
   was the consequence, and it survives verbatim as the payoff line. */
function StartingPointComposition() {
  return (
    <div className="mh-comp mh-startingpoint-comp">
      <div className="mh-record-card mh-comp-base" aria-label="What Lumo starts every conversation from">
        <strong>Your Career Context</strong>
        <p>What Lumo starts from, every time.</p>
        <ul>
          <li><span>Experience</span><em>Roles, projects, and outcomes</em></li>
          <li><span>Applications</span><em>Tesserac · Interviewing</em></li>
          <li><span>Goals</span><em>Staff role, remote</em></li>
        </ul>
      </div>
      <div className="mh-comp-satellite mh-blank-composer" aria-label="A general assistant's starting point">
        <span>Any other assistant</span>
        <p>Tell me about yourself...</p>
      </div>
    </div>
  );
}

function WhatItKnows() {
  return (
    <section className="mh-ctx mh-section" aria-labelledby="knows-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">What it knows</span>
        <h2 id="knows-title">It starts from your record, not a blank page.</h2>
      </div>
      <div className="mh-ctx-grid" data-reveal="">
        {KNOWS.map(({ icon: IconComponent, title, body }) => (
          <article className="mh-ctx-card" key={title}>
            <IconComponent aria-hidden="true" />
            <h3>{title}</h3>
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
        <div className="mh-lumo-prompts" aria-label="Example questions to ask Lumo" data-reveal="">
          <span>Ask things like</span>
          {PROMPTS.map((prompt) => <p key={prompt}>{prompt}</p>)}
        </div>
      </div>
    </section>
  );
}

function Straight() {
  return (
    <section className="mh-lumo-band mh-section" aria-labelledby="straight-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-lime">Straight answers</span>
        <h2 id="straight-title">It works from verified facts, and it does not decide anything for you.</h2>
        <p>When Lumo talks about benefits, it reads from state facts a person verified. It does not invent a dollar figure or a deadline.</p>
        <p>Offboard is independent, not a government agency. Agencies and providers decide eligibility and benefit amounts. Lumo helps you do the work, and it does not replace your review and judgment on anything you send out.</p>
        <Link className="mh-section-link" href="/pricing">Free includes 3 Lumo messages a day. Pro removes the limit. <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

function BringYourOwn() {
  return (
    <section className="mh-morethan mh-section" aria-labelledby="byo-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-sand">Or bring your own</span>
        <h2 id="byo-title">Prefer ChatGPT or Claude? That works too.</h2>
        <p>Lumo is the assistant that lives inside Offboard, but it is not the only way in. Connect the assistant you already use and it works from the same record.</p>
        <Link className="mh-section-link" href="/integrations">See how Offboard Everywhere works <ArrowRight aria-hidden="true" /></Link>
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
          body="Lumo is Offboard's assistant. It works from the record you have already built, so a question about your search starts from your actual situation instead of a blank chat window."
          current="lumo"
          aside={false}
          cta="Get started free"
        />
        <WhatItKnows />
        <WhatToAsk />
        <ContrastSection
          kicker="The difference"
          title="Not a smarter chatbot. A better starting point."
          body="Lumo is not claiming to out-think a general assistant. The difference is what it is working from: the structured, continuously updated state of your career, rather than whatever you can paste into a message box."
          payoff="You spend the conversation on the decision instead of on context, and the answer is about your search rather than job searching in general."
        >
          <StartingPointComposition />
        </ContrastSection>
        <Straight />
        <BringYourOwn />
        <FinalCta
          title="Ask something only your own record could answer."
          body="Build your Career Context, then ask Lumo what to do about it."
        />
      </main>
    </MarketingShell>
  );
}

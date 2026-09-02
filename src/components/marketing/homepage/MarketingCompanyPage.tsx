import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { CompanyPage } from "@/content/companies/schema";
import { STATE_BENEFITS } from "@/content/companies/schema";

import {
  FinalCta,
  MarketingShell,
  PageHero,
} from "./MarketingSite";

/* Company Transition Centers: the per-company page (plan 038). One template
   for every company. Every figure on the page comes from the company's
   committed JSON, where it carries a source and a checked-on date, and
   CopyDrift asserts that every such figure also appears in COPY.md § 17's
   facts register. The page states the public record and links out; it
   never promises, never editorialises, never names a person, and never
   implies a relationship with the company. Copy: COPY.md § 17. */

const THIS_WEEK = [
  ["Write down your key dates", "Your last day, your final pay date, and the date your health coverage ends. Most expensive mistakes after a layoff are missed deadlines."],
  ["File for unemployment now, not later", "Benefits usually start from the week you file, not the week you were let go. Waiting costs money."],
  ["Get the severance paperwork in writing", "Read it before you sign it. What you are being offered, and what you are giving up."],
  ["Sort out health coverage before the window closes", "You have a limited time to choose. The options and the deadlines are on the guide below."],
] as const;

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function MarketingCompanyPage({ company }: { company: CompanyPage }) {
  const state = STATE_BENEFITS[company.state];
  return (
    <MarketingShell current="companies">
      <main id="main-content">
        <PageHero
          current="companies"
          kicker="Company Transition Center"
          title={`Laid off from ${company.name}? Start here.`}
          body={company.summary}
          cta="Build my free transition plan"
          footnote={`Facts on this page come from the public record, with a source next to each one. Last checked ${formatDate(company.last_checked)}. Offboard has no relationship with ${company.name}.`}
          aside={false}
        />

        <section className="mh-company-record mh-section" aria-labelledby="record-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">What happened</span>
            <h2 id="record-title">The public record.</h2>
            <p>Each figure below is stated as its source states it, with the source next to it. Nothing here is Offboard&apos;s estimate.</p>
          </div>
          <dl className="mh-company-facts" data-reveal="">
            {company.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>
                  <strong>{fact.figure}</strong>
                  {fact.detail ? <p>{fact.detail}</p> : null}
                  <small>Source: <a href={fact.source_url} rel="noopener noreferrer">{fact.source_name}</a> · checked {formatDate(fact.checked_on)}</small>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mh-morethan mh-section" aria-labelledby="week-title">
          <div className="mh-copy-block">
            <span className="mh-kicker is-sand">This week</span>
            <h2 id="week-title">Four things to do before anything else.</h2>
            <p>The job search can wait a few days. These cannot.</p>
          </div>
          <ol className="mh-numbered-rows" data-reveal="">
            {THIS_WEEK.map(([title, body], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><strong>{title}</strong><p>{body}</p></div>
              </li>
            ))}
          </ol>
          <Link className="mh-section-link" href="/resources/first-week-after-a-layoff">The full first-week guide <ArrowRight aria-hidden="true" /></Link>
        </section>

        <section className="mh-company-state mh-section" aria-labelledby="state-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">What {state.name} owes you</span>
            <h2 id="state-title">Claiming your benefits is free. Start with the official source.</h2>
            <p>The {company.name} site on record is in {company.site}, {state.name}. Unemployment benefits there are run by the {state.agency}. File with them directly; Offboard never sits between you and the agency.</p>
          </div>
          <div className="mh-company-state-grid" data-reveal="">
            <a className="mh-company-state-card" href={state.url} rel="noopener noreferrer">
              <span className="mh-kicker">Official source</span>
              <strong>File for unemployment in {state.name}</strong>
              <small>{state.agency}</small>
              <span className="mh-nav-feature-cta">Go to the official page <ArrowRight aria-hidden="true" /></span>
            </a>
            <Link className="mh-company-state-card" href="/resources/health-insurance-after-a-layoff">
              <span className="mh-kicker">Health coverage</span>
              <strong>Your options before the window closes</strong>
              <small>COBRA, the marketplace, and the deadlines that apply.</small>
              <span className="mh-nav-feature-cta">Read the guide <ArrowRight aria-hidden="true" /></span>
            </Link>
            <Link className="mh-company-state-card" href="/layoff-support">
              <span className="mh-kicker">The deadlines that expire quietly</span>
              <strong>What Offboard watches for you</strong>
              <small>{company.state === "CA" ? "Including the California training extension most people have never heard of." : "Benefit deadlines, coverage windows, and your runway, in one place."}</small>
              <span className="mh-nav-feature-cta">See Layoff &amp; Benefits <ArrowRight aria-hidden="true" /></span>
            </Link>
          </div>
        </section>

        <section className="mh-company-severance mh-section" aria-labelledby="severance-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">Severance</span>
            <h2 id="severance-title">Read it before you sign it.</h2>
            {company.severance ? (
              <p>
                {company.name} offered {company.severance.figure}. Source: <a href={company.severance.source_url} rel="noopener noreferrer">{company.severance.source_name}</a>, checked {formatDate(company.severance.checked_on)}. Your own agreement is the only one that applies to you.
              </p>
            ) : (
              <p>No public source states {company.name}&apos;s severance terms for this round, so this page does not guess at them. Your own agreement is the only one that applies to you.</p>
            )}
            <Link className="mh-section-link" href="/resources/negotiating-your-severance">What to check in a severance agreement <ArrowRight aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="mh-route-independence mh-section" aria-labelledby="company-independence-title">
          <div>
            <span className="mh-kicker is-lime">Straight answers</span>
            <h2 id="company-independence-title">Offboard is not a government agency.</h2>
          </div>
          <div>
            <p>Offboard helps people organize their transition and reach official sources. Government agencies and program providers make eligibility, benefit, and approval decisions. Offboard does not replace qualified legal, tax, financial, healthcare, or benefits guidance.</p>
            <p>We never promise funding. We show you the exact path to find out. Offboard is independent of {company.name} and is not affiliated with it.</p>
          </div>
        </section>

        <section className="mh-company-hr mh-section" aria-labelledby="hr-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">If you work in People at {company.name}</span>
            <h2 id="hr-title">Sponsoring your team&apos;s transition is self-serve and priced per person.</h2>
            <Link className="mh-section-link" href="/employers">See sponsored access for employers <ArrowRight aria-hidden="true" /></Link>
          </div>
        </section>

        <FinalCta
          title="Start with what changed."
          body="Tell Offboard what happened and get a plan that covers the money, the benefits, and the search, in the order they actually matter."
        />
      </main>
    </MarketingShell>
  );
}

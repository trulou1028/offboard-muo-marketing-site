import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  ContactBand,
  FeatureRows,
  MarketingShell,
  PageHero,
} from "./MarketingSite";

/* Universities & Communities (plan 036). The third and last For
   Organizations page: /employers for a company running a layoff, /workforce
   for agencies, this one for universities, alumni organizations,
   associations, and nonprofits. Plan 026 asked for it "lighter at first",
   so it is six sections and no FAQ.

   Positioning expands the one approved line about this audience, from the
   homepage's Sponsored access section: tools that stay useful beyond a
   single workshop or program. What this audience has that an employer does
   not is a relationship that outlasts the event.

   Two deliberate omissions, both recorded in COPY.md § 16 and both easy to
   reverse: no prices (the $199 employer figure is approved for employers,
   not for universities) and no category claim (public institutions read as
   B2G-adjacent, and the phrase earns nothing with members who are mostly
   not unemployed yet). Copy: COPY.md § 16. */

const WHAT_CHANGES = [
  ["A record, not a folder", "Work history, projects, and outcomes stay in one place that they keep, whether or not they are searching this month."],
  ["Your program stays in it", "What a member works out in a session lands in the record instead of in notes nobody opens again."],
  ["The full toolkit", "Application Packets, resume tailoring, interview prep, application tracking, and Lumo."],
  ["It works when your office is closed", "Members do this work at 9pm and on weekends. Nothing waits for an appointment."],
] as const;

const YOU_SEE = [
  "How many members claimed access",
  "How many are active",
  "Aggregate engagement and outcomes",
] as const;

const STAYS_PRIVATE = [
  "Resumes",
  "Applications",
  "Lumo conversations",
  "Anything a member writes",
] as const;

function WhatChanges() {
  return (
    /* Sand: the EditorialGrid above is paper, and two paper bands in a row
       read as one section. Same rhythm as /workforce. */
    <section className="mh-morethan mh-section" aria-labelledby="changes-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-sand">What changes</span>
        <h2 id="changes-title">They stop starting over every time.</h2>
        <p>A member builds their Career Context once. Every search after that starts from it instead of from a blank page.</p>
      </div>
      <div className="mh-capabilities" data-reveal="">
        {WHAT_CHANGES.map(([title, body]) => (
          <div className="mh-capability" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReportingBoundary() {
  return (
    <section className="mh-privacy-sponsor mh-section" aria-labelledby="community-boundary-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-lime">Reporting boundary</span>
        <h2 id="community-boundary-title">You see participation. You do not see people.</h2>
        <p>Sponsors receive aggregate participation and outcome reporting, never individual applications, conversations, finances, or reflections. Reporting and visibility are defined before participation begins.</p>
        <p className="mh-privacy-contractual">That privacy line is contractual, not a preference.</p>
      </div>
      <div className="mh-privacy-split" data-reveal="">
        <div>
          <h3>What you see</h3>
          <ul className="mh-plain-list ruled">
            {YOU_SEE.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </div>
        <div>
          <h3>What stays private</h3>
          <ul className="mh-plain-list ruled">
            {STAYS_PRIVATE.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </div>
      </div>
      <Link className="mh-section-link" href="/privacy-security">See exactly who can see what <ArrowRight aria-hidden="true" /></Link>
    </section>
  );
}

function StraightAnswers() {
  return (
    <section className="mh-wherever mh-section" aria-labelledby="community-answers-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">Straight answers</span>
        <h2 id="community-answers-title">What Offboard will not promise.</h2>
        <p>Offboard does not promise placements, interviews, or outcomes, and no sponsorship changes that. What it promises is that a member&apos;s own record is built once, stays theirs, and is there the next time they need it.</p>
        <p>Offboard does not replace your career office. It gives the work your team already does somewhere to live.</p>
      </div>
    </section>
  );
}

export function MarketingCommunities() {
  return (
    <MarketingShell current="communities">
      <main id="main-content">
        <PageHero
          current="communities"
          layout="relume-47"
          kicker="Universities and communities"
          title="The workshop ends. The career does not."
          body="Career offices and member programs do good work in a narrow window: a session, an appointment, a program year. What the member leaves with is a folder and a memory. Offboard gives them a record that keeps working after your program is over, and keeps working when they come back."
          cta="Start a sponsorship conversation"
          ctaHref="mailto:hello@offboard.co?subject=Community%20sponsorship"
          aside={<><span>What sponsorship covers</span><strong>The account, not a view into it.</strong><p>You sponsor access for your members. What they build inside it stays theirs, and your reporting is aggregate only.</p></>}
        />
        <FeatureRows
          kicker="Who this is for"
          title="Programs whose people come back."
          body="The relationship outlasts the event. That is what makes this different from a company running a layoff, and it is what a record built once and kept is actually for."
          items={[
            { title: "Universities and colleges", body: "Career services teams supporting students through a first search, and alumni through every one after it." },
            { title: "Alumni organizations", body: "Members who graduated years ago, arrive with a real history, and need it organized rather than explained again." },
            { title: "Associations and nonprofits", body: "Groups whose members change roles inside one field, where what someone did last still matters to what they do next." },
          ]}
        />
        <WhatChanges />
        <ReportingBoundary />
        <StraightAnswers />
        <ContactBand
          kicker="Sponsorship inquiries"
          title="Talk about sponsoring your members."
          body="Tell us who your members are, how many you would start with, and what your team already runs. We will scope it with you."
          cta="Start a sponsorship conversation"
          href="mailto:hello@offboard.co?subject=Community%20sponsorship"
        />
      </main>
    </MarketingShell>
  );
}

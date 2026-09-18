import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  ContactBand,
  SequenceSection,
  MarketingShell,
  PageHero,
} from "./MarketingSite";

/* Workforce & Government (plan 035, phase 3 of the site IA roadmap). This
   page replaces /public-partners, which is retired and 301'd here, and it
   takes the public-sector material plan 005 had parked on /employers.

   It sits inside the B2G language firewall, the same rules /act runs under:
   no category claim, no endorsement language, and /act's scoped vocabulary
   ("career transition", "workspace") does not travel here - the resident
   section below is rewritten off /act's rather than reused from it. No
   county is named, because on a general agency-facing page a county name
   reads as a signed relationship and none is approved.

   What is NOT here matters as much: the app repo's B2G document set
   describes WIOA/WARN reporting, equity dashboards, cross-agency routing,
   and procurement vehicles, and its own plan 047 records the B2G pilot as
   frozen at one seeded jurisdiction. Every claim below traces instead to
   copy already approved for public display on /act or /employers.
   Copy: COPY.md § 8. */

const RESIDENT_GETS = [
  ["A plan from day one", "Residents start from their own state, dates, and situation, and see what deserves attention first."],
  ["Verified benefit facts", "Deadlines and dollar figures checked by people, with the official link for each one. Claiming benefits is always free."],
  ["The full toolkit", "Application Packets, resume tailoring, interview prep, application tracking, and Lumo."],
  ["It starts the same day", "A resident who claims access can begin that evening, on a phone, without waiting on a callback."],
] as const;

/* Verbatim from the ACT playbook (COPY.md § 7 carries the do-not-soften
   note). The lists travel; the "ACT reporting is aggregate-first" sentence
   does not, because ACT is not the subject here - the body uses the
   approved /employers formulation instead. */
const PROGRAM_SEES = [
  "Application funnel",
  "Approval and claim visibility",
  "Aggregate engagement",
  "Weekly signup trends",
  "Cohort or jurisdiction view",
] as const;

const STAYS_PRIVATE = [
  "Resumes",
  "Documents",
  "Lumo conversations",
  "Individual job-search behavior",
] as const;

const PILOT_SHAPE = [
  "One jurisdiction or cohort",
  "25 to 100 residents",
  "3-month sponsored access",
  "First review after 30 days",
] as const;

function ResidentExperience() {
  return (
    /* Sand, not paper: the EditorialGrid above it is paper, and two paper
       bands in a row read as one section. */
    <section className="mh-morethan mh-section" aria-labelledby="resident-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-sand">What residents get</span>
        <h2 id="resident-title">A plan they can work at 9pm, not an appointment in six weeks.</h2>
        <p>One private place for the whole transition: the benefits side, the money side, and the search, with guidance that already knows their situation.</p>
      </div>
      <div className="mh-capabilities" data-reveal="">
        {RESIDENT_GETS.map(([title, body]) => (
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
    <section className="mh-privacy-sponsor mh-section" aria-labelledby="boundary-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-lime">Reporting boundary</span>
        <h2 id="boundary-title">Aggregate for the program. Private for the resident.</h2>
        <p>Sponsors receive aggregate participation and outcome reporting, never individual applications, conversations, finances, or reflections. Reporting and visibility are defined before participation begins.</p>
        <p className="mh-privacy-contractual">That privacy line is contractual, not a preference.</p>
      </div>
      <div className="mh-privacy-split" data-reveal="">
        <div>
          <h3>What the program sees</h3>
          <ul className="mh-plain-list ruled">
            {PROGRAM_SEES.map((line) => <li key={line}>{line}</li>)}
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

function PilotPath() {
  return (
    <section className="mh-wherever mh-section" aria-labelledby="pilot-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">How a pilot starts</span>
        <h2 id="pilot-title">Small, scoped, and reviewed after 30 days.</h2>
        <p>Nothing here asks you to replace a system or run a procurement cycle first. A pilot is deliberately small enough to evaluate honestly.</p>
      </div>
      <div className="mh-workforce-pilot" data-reveal="">
        <div>
          <h3>Suggested pilot shape</h3>
          <ul className="mh-plain-list ruled">
            {PILOT_SHAPE.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </div>
        <div className="mh-workforce-objection">
          <h3>Is this replacing our workforce system?</h3>
          <p>No. Offboard is a resident-facing support layer and a pilot path. It sits beside existing workforce systems and focuses on faster activation.</p>
        </div>
      </div>
    </section>
  );
}

function StraightAnswers() {
  return (
    <section className="mh-route-independence mh-section" aria-labelledby="workforce-independence-title">
      <div>
        <span className="mh-kicker is-lime">Straight answers</span>
        <h2 id="workforce-independence-title">Offboard is not a government agency.</h2>
      </div>
      <div>
        <p>Offboard helps people organize their transition and reach official sources. Government agencies and program providers make eligibility, benefit, and approval decisions. Offboard does not replace qualified legal, tax, financial, healthcare, or benefits guidance.</p>
        <p>Offboard does not determine eligibility, calculate benefits, or replace case workers. We never promise funding. We show residents the exact path to find out.</p>
      </div>
    </section>
  );
}

export function MarketingWorkforce() {
  return (
    <MarketingShell current="workforce">
      <main id="main-content">
        <PageHero
          current="workforce"
          layout="relume-47"
          kicker="Workforce and government"
          title="Agencies decide. Offboard helps residents prepare and continue."
          body="Residents lose weeks to forms, phone trees, and appointment windows before anyone helps them plan. Offboard gives them a private place to organize the practical work and routes them back to the responsible agency for every official decision."
          cta="Start a partnership conversation"
          ctaHref="mailto:info@offboard.co?subject=Workforce%20partnership"
          aside={<><span>A clear boundary</span><strong>Planning support, not an eligibility authority.</strong><p>Offboard organizes the practical work and routes residents to the responsible agency or provider for official decisions and applications.</p></>}
        />
        <SequenceSection
          kicker="Beside what you already run"
          title="Agencies decide. Offboard helps people prepare and continue."
          body="For workforce boards, education partners, and public programs: Offboard organizes the practical work around the official system and routes residents to the responsible agency or provider for decisions and applications. Offboard does not determine eligibility, calculate benefits, or replace case workers."
          items={[
            { title: "Orient", body: "Start from the resident's situation and surface what may deserve attention now." },
            { title: "Route", body: "Possible programs appear beside their responsible official source or local provider." },
            { title: "Follow through", body: "Deadlines, questions, materials, and next steps stay in one private place." },
          ]}
        />
        <ResidentExperience />
        <ReportingBoundary />
        <PilotPath />
        <StraightAnswers />
        <ContactBand
          kicker="Partnership inquiries"
          title="Build a clearer route through the transition."
          body="Tell us which residents you serve, which systems they navigate, and where the current handoff breaks down."
          cta="Start a partnership conversation"
          href="mailto:info@offboard.co?subject=Workforce%20partnership"
        />
      </main>
    </MarketingShell>
  );
}

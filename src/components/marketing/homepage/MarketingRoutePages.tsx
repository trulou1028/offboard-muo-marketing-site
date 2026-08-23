import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  ContactBand,
  ContextSection,
  EditorialGrid,
  FaqSection,
  FinalCta,
  FiveSteps,
  HUMAN_SUPPORT_URL,
  HumanSupportSection,
  LumoSection,
  MarketingShell,
  NumberedRows,
  PageHero,
  PricingSection,
  PRICING_FAQS,
  PRODUCT_FAQS,
  ToolkitSection,
} from "./MarketingSite";

export function MarketingHowItWorks() {
  return (
    <MarketingShell current="how-it-works">
      <main id="main-content">
        <PageHero
          current="how-it-works"
          kicker="How it works"
          title="One plan that starts where you are."
          body="Whether you were laid off yesterday, have been searching for months, or are still employed and reading the room, your plan starts from your situation and your state, not a template."
          cta="Build my free transition plan"
          aside={<><span>The spine and the muscle</span><strong>The plan is the spine. The tools are the muscle.</strong><p>Every step links straight into the tool that does the heavy lifting. No blank pages, no starting over.</p></>}
        />
        <FiveSteps />
        <ToolkitSection />
        <LumoSection />
        <HumanSupportSection />
        <ContextSection />
        <FaqSection title="What to know about the product." items={PRODUCT_FAQS} />
        <FinalCta />
      </main>
    </MarketingShell>
  );
}

export function MarketingPricing() {
  return (
    <MarketingShell current="pricing">
      <main id="main-content">
        <PageHero
          current="pricing"
          kicker="Pricing"
          title="Start free. Upgrade when you need more support."
          body="Begin with the next role in front of you. Move to Pro when your search needs more room, or see whether an organization can sponsor your access."
          aside={<><span>Clear before you pay</span><strong>No hidden starting fee.</strong><p>Free is a real tier, not a trial. You see every price and what is included before you pay.</p></>}
          cta="Start free"
        />
        <PricingSection />
        <EditorialGrid
          kicker="How credits work"
          title="Pay only for the work that needs more horsepower."
          body="Credits cover the heavier product work: deeper research, tailored materials, and interview preparation. Every credit-spending action shows its cost before you run it."
          items={[
            { title: "Included monthly", body: "Free includes 30 credits a month, Pro includes 300. They refresh monthly." },
            { title: "Clear costs", body: "The price in credits is shown on the button before you spend anything." },
            { title: "Human support", body: "Eligible one-on-one support options are booked separately, with price and scope shown before you schedule." },
          ]}
        />
        <FaqSection title="Pricing and support, without surprises." items={PRICING_FAQS} />
        <FinalCta title="Start free. Decide what else you need later." body="Build the first version of your plan before deciding whether more support would help." />
      </main>
    </MarketingShell>
  );
}

// These guides still live on the current production site. They are
// temporary outbound links until article content migrates into this repo
// (tracked as a separate effort in plans/006); replace with local
// `/resources/:slug` routes at that point.
const RESOURCE_GUIDES = [
  { title: "The first week after a layoff", body: "What to do, and what to skip, in the first seven days.", href: "https://offboard.co/resources/first-week-after-a-layoff" },
  { title: "Negotiating your severance", body: "What is usually negotiable, and how to ask.", href: "https://offboard.co/resources/negotiating-your-severance" },
  { title: "Rebuild your resume after a layoff", body: "Turning a sudden ending into a clear next chapter on paper.", href: "https://offboard.co/resources/rebuild-your-resume-after-a-layoff" },
  { title: "Health insurance after a layoff", body: "COBRA, marketplace plans, and the deadlines that matter.", href: "https://offboard.co/resources/health-insurance-after-a-layoff" },
  { title: "A career changer's guide to job offer negotiations", body: "Negotiating pay and terms when you are also changing direction.", href: "https://offboard.co/resources/career-changers-guide-to-job-offer-negotiations" },
  { title: "The best job application trackers in 2026", body: "A practical comparison for keeping a search organized.", href: "https://offboard.co/resources/best-job-application-trackers-2026" },
] as const;

export function MarketingResources() {
  return (
    <MarketingShell current="resources">
      <main id="main-content">
        <PageHero
          current="resources"
          kicker="The library"
          title="Guides & resources"
          body="Reported essays, practical guides, and the slow work of making layoffs less brutal."
          aside={<><span>Written from experience</span><strong>Practical, not theoretical.</strong><p>Guides drawn from the newsletter, the community, and the questions people actually ask.</p></>}
        />
        <section className="mh-route-resources mh-section" aria-labelledby="resources-list-title">
          <div className="mh-section-heading">
            <span className="mh-kicker">Current guides</span>
            <h2 id="resources-list-title">Start with what applies to you right now.</h2>
          </div>
          <div className="mh-route-resources-grid">
            {RESOURCE_GUIDES.map((guide) => (
              <article key={guide.href}>
                <h3>{guide.title}</h3>
                <p>{guide.body}</p>
                <a className="mh-section-link" href={guide.href}>Read the guide <ArrowRight aria-hidden="true" /></a>
              </article>
            ))}
          </div>
        </section>
        <FinalCta title="Bring your situation. We will help you sort the rest." body="A layoff is rarely just one problem. Build a plan that covers the money, the benefits, and the search, in one place." />
      </main>
    </MarketingShell>
  );
}

export function MarketingAbout() {
  return (
    <MarketingShell current="about">
      <main id="main-content">
        <PageHero
          current="about"
          kicker="Why Offboard exists"
          title="Built for the moment work stops making sense."
          body="Losing a job changes more than a resume. It can change your routine, confidence, finances, relationships, and sense of what comes next. Offboard was built to meet that whole moment with a clear plan, verified facts, and human support."
          cta="Talk to the team"
          ctaHref="mailto:hello@offboard.co"
          aside={<><span>Our role</span><strong>A quiet companion for the work ahead.</strong><p>Independent support that helps you decide what deserves attention next.</p></>}
        />
        <section className="mh-route-story mh-section mh-split" aria-labelledby="about-origin-title">
          <div className="mh-route-story-photo"><Image src="/marketing/homepage/raw/strip-kitchen-table.webp" alt="A man at his desk with coffee and paperwork, looking out the window" fill sizes="(max-width: 900px) 100vw, 44vw" /></div>
          <div className="mh-copy-block">
            <span className="mh-kicker">The origin</span>
            <h2 id="about-origin-title">It started with the same questions, over and over.</h2>
            <p>What should I do first? Which deadlines matter? Where do benefits, training, and the job search fit together? Offboard grew from conversations, a weekly newsletter, and a community for people navigating those questions.</p>
            <p>The product organizes what people were otherwise piecing together across portals, documents, messages, and separate tools.</p>
          </div>
        </section>
        <section className="mh-route-community mh-section" aria-labelledby="about-community-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">Where it grew</span>
            <h2 id="about-community-title">A newsletter and a community came first.</h2>
            <p>Before the product, Offboard was a weekly newsletter on the job market read by 5,000+ subscribers, and a community of people navigating the same uncertainty. The product organizes what those people were piecing together by hand.</p>
          </div>
        </section>
        <EditorialGrid
          kicker="What guides the work"
          title="Calm is part of the product."
          body="People use Offboard during a stressful transition. The experience should reduce noise, preserve choice, and make the next useful action easier to see."
          items={[
            { title: "Clarity before volume", body: "Show what deserves attention now instead of presenting every possible task at once." },
            { title: "Official sources", body: "Use responsible agencies and providers for eligibility, applications, and final decisions." },
            { title: "Private by default", body: "Let people choose what enters their plan and explain sponsor visibility before enrollment." },
            { title: "Human when needed", body: "Software should not pretend every transition can be solved without context or conversation." },
          ]}
        />
        <section className="mh-route-independence mh-section" aria-labelledby="independence-title">
          <div><span className="mh-kicker is-lime">Independent by design</span><h2 id="independence-title">Offboard is not a government agency.</h2></div>
          <p>Offboard helps people organize their transition and reach official sources. Government agencies and program providers make eligibility, benefit, and approval decisions. Offboard does not replace qualified legal, tax, financial, healthcare, or benefits guidance.</p>
        </section>
        <ContactBand kicker="Concord and online" title="Meet Offboard where the work is happening." body="Connect with the team online or review current in-person support availability in Concord, California." cta="Talk to someone" href={HUMAN_SUPPORT_URL} />
      </main>
    </MarketingShell>
  );
}

export function MarketingEmployers() {
  return (
    <MarketingShell current="employers">
      <main id="main-content">
        <PageHero
          current="employers"
          kicker="For employers"
          title="Outplacement, modernized."
          body="Give the people you're letting go a real starting point: the modern unemployment office in their pocket. Sponsored access is self-serve, priced one-time per employee, and private by design for the people who use it."
          cta="Talk about sponsored access"
          ctaHref="mailto:hello@offboard.co?subject=Employer%20support"
          aside={<><span>How sponsorship works</span><strong>Self-serve. One-time per employee.</strong><p>Buy seats for a departing group, send invitations, and see aggregate program reporting. No enterprise contract.</p></>}
        />
        <EditorialGrid
          kicker="The member experience"
          title="Support for the whole transition, not only the resume."
          body="A layoff creates benefits, money, and job-search work all at once. Sponsored members get the full product: a personal plan, verified benefit deadlines, Job Packets, and human support options."
          items={[
            { title: "A plan from day one", body: "Members start from their situation and state, and see what deserves attention first." },
            { title: "Verified benefit facts", body: "Deadlines and dollar figures checked by people, with official links. Claiming benefits is always free." },
            { title: "The full toolkit", body: "Job Packets, resume tailoring, interview prep, application tracking, and LUMO." },
          ]}
        />
        <section className="mh-route-sponsor mh-section mh-split" aria-labelledby="employer-privacy-title">
          <div className="mh-copy-block"><span className="mh-kicker">Clear sponsor terms</span><h2 id="employer-privacy-title">People should know what a sponsor can see.</h2><p>Before a sponsored member enrolls, Offboard explains what the program sponsor can and cannot see. Visibility depends on the program notice. Personal benefit decisions remain with responsible agencies and providers.</p></div>
          <div className="mh-route-sponsor-card"><span>Member view</span><strong>Chosen by the member</strong><p>Transition details, saved roles, documents, and requested support stay in the member experience according to the applicable notice.</p><span>Sponsor view</span><strong>Explained before enrollment</strong><p>Program reporting and visibility are defined before participation begins. Sponsors receive aggregate participation and outcome reporting, never individual applications, conversations, finances, or reflections.</p></div>
        </section>
        <section className="mh-route-hiring mh-section" aria-labelledby="employer-hiring-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">Also for employers</span>
            <h2 id="employer-hiring-title">Hiring? Post roles free.</h2>
            <p>Offboard employers can post open roles at no cost. Postings reach members actively searching, with materials prepared and context attached.</p>
            <a className="mh-section-link" href="mailto:hello@offboard.co?subject=Hiring%20on%20Offboard">Post a role <ArrowRight aria-hidden="true" /></a>
          </div>
        </section>
        <EditorialGrid
          kicker="Public & workforce partners"
          title="Agencies decide. Offboard helps people prepare and continue."
          body="For workforce boards, education partners, and public programs: Offboard organizes the practical work around the official system and routes residents to the responsible agency or provider for decisions and applications. Offboard does not determine eligibility, calculate benefits, or replace case workers."
          items={[
            { title: "Orient", body: "Start from the resident's situation and surface what may deserve attention now." },
            { title: "Route", body: "Possible programs appear beside their responsible official source or local provider." },
            { title: "Follow through", body: "Deadlines, questions, materials, and next steps stay in one private place." },
          ]}
        />
        <ContactBand kicker="Public partnership" title="Build a clearer route through the transition." body="Tell us which residents you serve and where the current handoff breaks down." cta="Discuss a public partnership" href="mailto:hello@offboard.co?subject=Public%20partner%20support" />
      </main>
    </MarketingShell>
  );
}

const ACT_PILOT_STEPS = [
  ["Learn about ACT", "Residents land here, on /act, and see who is eligible and what sponsored access includes."],
  ["Apply through Offboard", "Residents complete a short application on Offboard's app, not a phone tree or a paper form."],
  ["Program review", "The program or admin team reviews the application on their own schedule."],
  ["Approval and a private link", "Approved residents receive a private claim link, sent directly to them."],
  ["Claim sponsored access", "Residents claim sponsored Offboard access, and their workspace is ready the same day."],
  ["Aggregate program review", "The program reviews aggregate activation and engagement, not individual accounts."],
] as const;

export function MarketingAct() {
  return (
    <MarketingShell current="act">
      <main id="main-content">
        <PageHero
          current="act"
          kicker="ACT pilot"
          title="Career support that starts tonight, not in six weeks."
          body="Eligible residents in Alameda County get sponsored access to Offboard and can start a job-search workspace the same day, right after a layoff, instead of waiting on forms, phone trees, and appointment windows while rent is due. Residents work the search on their own schedule: tonight, at 6am, or between school pickups."
          cta="Apply for pilot access"
          ctaHref="https://app.offboard.co/act/apply"
          aside={<><span>In agency terms</span><strong>Resident-first, aggregate-only for the program.</strong><p>Residents apply, claim sponsored access, and use Offboard privately. The agency or partner reviews aggregate program engagement.</p></>}
        />
        <section className="mh-route-content mh-section" aria-labelledby="act-pilot-steps-title">
          <div className="mh-route-content-heading">
            <span className="mh-kicker">How the pilot works</span>
            <h2 id="act-pilot-steps-title">From application to activation, in six steps.</h2>
            <p>A resident-first pilot path: apply, get approved, claim sponsored access, and start working the search the same day.</p>
          </div>
          <NumberedRows rows={ACT_PILOT_STEPS} />
        </section>
        <section className="mh-route-story mh-section mh-split" aria-labelledby="act-story-title">
          <div className="mh-route-story-photo">
            <Image
              src="/marketing/homepage/raw/strip-school-dropoff.webp"
              alt="A parent kneeling to zip up her daughter's jacket at a school drop-off, other children and backpacks in the background"
              fill
              sizes="(max-width: 900px) 100vw, 44vw"
            />
          </div>
          <div className="mh-copy-block">
            <span className="mh-kicker">Built around real schedules</span>
            <h2 id="act-story-title">The search does not wait for office hours.</h2>
            <p>Between drop-off, a shift, and bedtime, most residents do not have room for another appointment window. ACT gives them a plan they can work at 9pm or 6am, on a phone or a laptop, without waiting on a callback.</p>
          </div>
        </section>
        <EditorialGrid
          kicker="What residents get"
          title="The same Offboard workspace, sponsored."
          body="One connected place for the search: jobs, applications, documents, interviews, and guidance that already knows the resident's plan."
          items={[
            { title: "A private job-search workspace", body: "The full Offboard workspace in one place, instead of scattered tools and paperwork." },
            { title: "Jobs and Job Packets", body: "Find roles and build a Job Packet for each one, with fit and next steps included." },
            { title: "Applications, follow-ups, and documents", body: "Track every application and follow-up, and keep resumes and other documents in one place." },
            { title: "Interview prep and Ask LUMO", body: "Practice for interviews and ask LUMO for guidance grounded in the resident's own plan." },
          ]}
        />
        <section className="mh-route-privacy mh-section" aria-labelledby="act-privacy-title">
          <div className="mh-copy-block">
            <span className="mh-kicker is-lime">Worker-controlled privacy</span>
            <h2 id="act-privacy-title">Aggregate for the program. Private for the resident.</h2>
            <p>ACT reporting is aggregate-first. The program can understand applications, approvals, claims, onboarding, and engagement without seeing private resumes, documents, LUMO conversations, or individual job-search behavior.</p>
          </div>
          <div className="mh-route-privacy-columns">
            <div>
              <span>What the program sees</span>
              <ul>
                <li>Application funnel</li>
                <li>Approval and claim visibility</li>
                <li>Aggregate engagement</li>
                <li>Weekly signup trends</li>
                <li>Cohort or jurisdiction view</li>
              </ul>
            </div>
            <div>
              <span>What stays private</span>
              <ul>
                <li>Resumes</li>
                <li>Documents</li>
                <li>LUMO conversations</li>
                <li>Individual job-search behavior</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="mh-route-agency mh-section" aria-labelledby="act-agency-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">For public-sector partners</span>
            <h2 id="act-agency-title">A pilot path that sits beside what you already run.</h2>
            <p>ACT gives the program an application funnel, approval and claim visibility, and aggregate engagement, including weekly signup trends and a cohort or jurisdiction view.</p>
          </div>
          <div className="mh-route-agency-shape">
            <span>Suggested pilot shape</span>
            <ul>
              <li>One jurisdiction or cohort</li>
              <li>25 to 100 residents</li>
              <li>3-month sponsored access</li>
              <li>First review after 30 days</li>
            </ul>
          </div>
          <div className="mh-route-agency-objection">
            <strong>Is this replacing our workforce system?</strong>
            <p>No. ACT is a resident-facing digital support layer and pilot path. It can sit beside existing workforce systems and focus on faster activation.</p>
          </div>
        </section>
        <ContactBand
          kicker="Pilot inquiries"
          title="Bring ACT to your jurisdiction."
          body="Tell us which residents you serve and where sponsored access could help most. We will follow up to scope a pilot."
          cta="Start a pilot conversation"
          href="mailto:hello@offboard.co?subject=ACT%20pilot"
        />
      </main>
    </MarketingShell>
  );
}

export function MarketingPublicPartners() {
  return (
    <MarketingShell current="public-partners">
      <main id="main-content">
        <PageHero
          current="public-partners"
          kicker="For public partners"
          title="Help people move from scattered information to a workable plan."
          body="Offboard helps residents organize transition work, identify possible support, and continue to the responsible agency or local provider for official decisions and applications."
          cta="Discuss a partnership"
          ctaHref="mailto:hello@offboard.co?subject=Public%20partner%20support"
          aside={<><span>A clear boundary</span><strong>Planning support, not an eligibility authority.</strong><p>Offboard organizes information and routes people to official providers.</p></>}
        />
        <section className="mh-route-partners-note mh-section" aria-label="Partner details">
          <p>The full public and workforce partner program, including sponsorship terms and the resident journey, now lives on the employers page alongside our employer sponsorship program.</p>
          <Link className="mh-section-link" href="/employers">See partner details on the employers page <ArrowRight aria-hidden="true" /></Link>
        </section>
        <ContactBand kicker="Public partnership" title="Build a clearer route through the transition." body="Tell us which residents you serve, which systems they navigate, and where the current handoff breaks down." cta="Discuss a public partnership" href="mailto:hello@offboard.co?subject=Public%20partner%20support" />
      </main>
    </MarketingShell>
  );
}

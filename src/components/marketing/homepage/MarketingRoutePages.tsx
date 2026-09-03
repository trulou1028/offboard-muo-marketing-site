import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { categoryMeta, type ResourceSection } from "@/content/resources/registry";

import {
  ABOUT_FAQS,
  ContactBand,
  ContextSection,
  EditorialGrid,
  EMPLOYER_FAQS,
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
  StartingPlanSection,
  ToolkitSection,
  VerifiedFactsStrip,
} from "./MarketingSite";

const RECRUIT_URL = "https://app.offboard.co/workspace/new?intent=recruit";

const SPONSORSHIP_STEPS = [
  ["Upload a roster", "Two people or two hundred. No minimum, no contract."],
  ["Invites go out the same day", "Private invitations to each person. Setup takes minutes, not weeks."],
  ["90 days of full Offboard Pro", "Benefits navigation, resume and application help, interview prep, and a real job feed for each person."],
  ["You see aggregate engagement only", "Individual job-search activity is always private. That privacy line is contractual, not a preference."],
] as const;

const WHY_COMPANIES_ITEMS = [
  { title: "The line item people remember", body: "Glassdoor reviews, boomerang hires, and references are written in the last week of employment." },
  { title: "A product people actually use", body: "It is a product laid-off workers actually use, not a PDF library." },
  { title: "Proof, not promises", body: "No placement guarantees, no inflated promises. You see real aggregate usage and claims activity, so you know the support landed." },
] as const;

export function MarketingHowItWorks() {
  return (
    <MarketingShell current="how-it-works">
      <main id="main-content">
        <PageHero
          current="how-it-works"
          kicker="How it works"
          title="One plan that starts where you are."
          body="Whether you were laid off yesterday, have been searching for months, or are still employed and reading the room, your plan starts from your situation and your state, not a template."
          cta="Get started free"
          aside={<><span>The spine and the muscle</span><strong>The plan is the spine. The tools are the muscle.</strong><p>Every step links straight into the tool that does the heavy lifting. No blank pages, no starting over.</p></>}
        />
        <FiveSteps />
        <StartingPlanSection />
        <ToolkitSection />
        <LumoSection />
        <section className="mh-verified-visual mh-section" aria-hidden="true">
          <div className="mh-verified-visual-frame">
            <Image src="/marketing/homepage/renders/benefits-stack.webp" alt="" fill sizes="(max-width: 900px) 100vw, 1200px" />
          </div>
        </section>
        <VerifiedFactsStrip />
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
          cta="Get started free"
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

function categoryHeadingId(category: string): string {
  return `resources-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-title`;
}

export function MarketingResources({ sections }: { sections: ResourceSection[] }) {
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
        {sections.map(({ category, posts }) => {
          const headingId = categoryHeadingId(category);
          return (
            <section key={category} className="mh-route-resources mh-section" aria-labelledby={headingId}>
              <div className="mh-section-heading">
                <span className="mh-kicker">Guides & resources</span>
                <h2 id={headingId}>{category}</h2>
                <p>{categoryMeta[category].description}</p>
              </div>
              <div className="mh-route-resources-grid">
                {posts.map((post) => (
                  <article key={post.slug}>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="mh-route-resources-reading">{post.readingTime}</span>
                    <Link className="mh-section-link" href={`/resources/${post.slug}`}>Read the guide <ArrowRight aria-hidden="true" /></Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
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
            <h2 id="about-origin-title">It started with our own layoffs.</h2>
            <p>Offboard started with our own layoffs. Going through it, what surprised us was how much you&apos;re left to figure out alone. Unemployment rules that change depending on your state. Retraining money that exists but that nobody tells you about. A resume you haven&apos;t opened in four years. A job market that works differently than it did the last time you were looking.</p>
            <p>There&apos;s an office for this in the physical world. It has fluorescent lights and a line, and most people never go. So we&apos;ve spent the last four years working with job seekers and building what we think that office should be.</p>
            <p>Stephanie, founder and CEO, built Offboard from a family history of helping people navigate that entire transition. Louie, co-founder, leads product and technology.</p>
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
        <section className="mh-route-ethos mh-section mh-split" aria-labelledby="about-ethos-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">The promise</span>
            <h2 id="about-ethos-title">Our job is to get you out of here.</h2>
            <p>We measure ourselves by how fast you leave, which is the opposite of the legacy incentive to bill more months. Landing well, and passing back what you learned, is the proof the office works.</p>
            <small>Some of what we do is software, and some of it is a 1-on-1 call or a chair across a desk in Concord, CA. Both matter.</small>
          </div>
          <div className="mh-route-story-photo"><Image src="/marketing/homepage/raw/maya-walking.webp" alt="A woman walking outside carrying a bag, mid-stride between one thing and the next" fill sizes="(max-width: 900px) 100vw, 44vw" /></div>
        </section>
        <FaqSection title="Fair questions." items={ABOUT_FAQS} />
        <section className="mh-route-privacy mh-section" aria-labelledby="about-privacy-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">Trust and privacy</span>
            <h2 id="about-privacy-title">Your job search is personal. It should remain private.</h2>
          </div>
          <ul className="mh-plain-list ruled">
            <li>You choose what is edited, shared, or submitted.</li>
            <li>Resumes, applications, saved jobs, and career history remain private.</li>
            <li>Lumo conversations and reflections are not sponsor dashboard content.</li>
            <li>Financial planning, severance details, and runway remain private.</li>
            <li>Benefits status and plan are yours alone.</li>
            <li>Sponsored programs see aggregate participation and outcomes, never your individual search.</li>
          </ul>
        </section>
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
          body="A layoff creates benefits, money, and job-search work all at once. Sponsored members get the full product: a personal plan, verified benefit deadlines, Application Packets, and human support options."
          items={[
            { title: "A plan from day one", body: "Members start from their situation and state, and see what deserves attention first." },
            { title: "Verified benefit facts", body: "Deadlines and dollar figures checked by people, with official links. Claiming benefits is always free." },
            { title: "The full toolkit", body: "Application Packets, resume tailoring, interview prep, application tracking, and Lumo." },
          ]}
        />
        <section className="mh-employer-pricing mh-section" aria-labelledby="employer-pricing-title">
          <div className="mh-section-heading">
            <span className="mh-kicker">Pricing</span>
            <h2 id="employer-pricing-title">Real outplacement at $199 a head, not $5,000.</h2>
          </div>
          <div className="mh-employer-pricing-layout">
            <article className="mh-employer-price-card">
              <p className="mh-price-value"><b>$199</b><small>per employee, one-time</small></p>
              <ul>
                <li><Check aria-hidden="true" />$169 per seat at 50 or more</li>
                <li><Check aria-hidden="true" />Card or NET-30 invoice</li>
                <li><Check aria-hidden="true" />No minimum, no renewal, no SOW, no procurement cycle.</li>
              </ul>
            </article>
            <p className="mh-employer-pricing-comparison">For comparison: legacy outplacement runs $3,000 to $7,000 per head, and most firms will not take a layoff under 50 people. The size of your layoff should not determine whether your people get help.</p>
          </div>
        </section>
        <section className="mh-employer-steps mh-section" aria-labelledby="employer-steps-title">
          <div className="mh-section-heading">
            <span className="mh-kicker">How sponsorship works</span>
            <h2 id="employer-steps-title">Setup takes minutes, not weeks.</h2>
          </div>
          <NumberedRows rows={SPONSORSHIP_STEPS} />
        </section>
        <section className="mh-route-sponsor mh-section mh-split" aria-labelledby="employer-privacy-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">Clear sponsor terms</span>
            <h2 id="employer-privacy-title">People should know what a sponsor can see.</h2>
            <p>Before a sponsored member enrolls, Offboard explains what the program sponsor can and cannot see. Visibility depends on the program notice. Personal benefit decisions remain with responsible agencies and providers.</p>
            <blockquote className="mh-employer-privacy-quote"><p>A sponsor can see that 19 of 24 people claimed access and 14 are active. They can&apos;t see anyone&apos;s resume, anyone&apos;s applications, or anyone&apos;s conversations. Not the CEO, not HR, nobody.</p></blockquote>
          </div>
          <div className="mh-route-sponsor-card"><span>Member view</span><strong>Chosen by the member</strong><p>Transition details, saved roles, documents, and requested support stay in the member experience according to the applicable notice.</p><span>Sponsor view</span><strong>Explained before enrollment</strong><p>Program reporting and visibility are defined before participation begins. Sponsors receive aggregate participation and outcome reporting, never individual applications, conversations, finances, or reflections.</p></div>
        </section>
        <EditorialGrid
          kicker="Why companies do this"
          title="The cheapest line item in the layoff, and the one people remember."
          body="Glassdoor reviews, boomerang hires, and references are written in the last week of employment. Sponsorship is the part of a layoff people actually tell other people about."
          items={WHY_COMPANIES_ITEMS}
        />
        <aside className="mh-employer-sb617 mh-section" aria-label="California SB 617">
          <div>
            <span className="mh-kicker">New in California</span>
            <p>Under SB 617, companies filing a WARN notice now have to state in writing whether they&apos;ll coordinate transition services for the people affected. The &quot;severance and silence&quot; default now gets documented as a choice, and you have to write down that the answer is no.</p>
            <p>Making that answer an easy yes is exactly what sponsorship is for.</p>
          </div>
        </aside>
        <section className="mh-route-hiring mh-section mh-split" aria-labelledby="employer-hiring-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">Also for employers</span>
            <h2 id="employer-hiring-title">Hiring? Post roles free.</h2>
            <p>Offboard employers can post open roles at no cost. Postings reach members actively searching, with materials prepared and context attached.</p>
            <a className="mh-section-link" href={RECRUIT_URL}>Post a role <ArrowRight aria-hidden="true" /></a>
            <a className="mh-employer-hiring-secondary" href="mailto:hello@offboard.co?subject=Hiring%20on%20Offboard">or email us</a>
          </div>
          <div className="mh-route-story-photo"><Image src="/marketing/homepage/raw/strip-walking-in.webp" alt="A person walking into an office building for an interview, bag on shoulder" fill sizes="(max-width: 900px) 100vw, 44vw" /></div>
        </section>
        {/* The full public-sector story moved to /workforce in plan 035;
            a workforce board buys differently from a company running a
            layoff, and the reporting boundary is not the same conversation. */}
        <section className="mh-wherever mh-section" aria-labelledby="employer-partners-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">Public and workforce partners</span>
            <h2 id="employer-partners-title">Agencies and workforce programs have their own page.</h2>
            <p>Workforce boards, counties, education partners, and public programs work differently from a company running a layoff. The reporting boundary, the pilot shape, and the agency handoff live on their own page.</p>
            <Link className="mh-section-link" href="/workforce">See Workforce &amp; Government <ArrowRight aria-hidden="true" /></Link>
          </div>
        </section>
        <FaqSection title="What employers ask." items={EMPLOYER_FAQS} />
        <ContactBand kicker="Sponsored access" title="Talk about sponsoring a group." body="Tell us how many people are affected and when. Setup is self-serve, and we can walk you through it." cta="Talk about sponsored access" href="mailto:hello@offboard.co?subject=Employer%20support" />
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
            { title: "Jobs and Application Packets", body: "Find roles and build an Application Packet for each one, with fit and next steps included." },
            { title: "Applications, follow-ups, and documents", body: "Track every application and follow-up, and keep resumes and other documents in one place." },
            { title: "Interview prep and Ask Lumo", body: "Practice for interviews and ask Lumo for guidance grounded in the resident's own plan." },
          ]}
        />
        <section className="mh-act-privacy mh-section" aria-labelledby="act-privacy-title">
          <div className="mh-copy-block">
            <span className="mh-kicker is-lime">Worker-controlled privacy</span>
            <h2 id="act-privacy-title">Aggregate for the program. Private for the resident.</h2>
            <p>ACT reporting is aggregate-first. The program can understand applications, approvals, claims, onboarding, and engagement without seeing private resumes, documents, Lumo conversations, or individual job-search behavior.</p>
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
                <li>Lumo conversations</li>
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


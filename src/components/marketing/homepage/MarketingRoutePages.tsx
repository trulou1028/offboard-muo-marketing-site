import Image from "next/image";

import { SearchShowcase } from "./SearchShowcase";
import {
  BenefitsSection,
  ContactBand,
  EditorialGrid,
  FaqSection,
  FinalCta,
  FragmentedSection,
  HUMAN_SUPPORT_URL,
  HumanSupportSection,
  MarketingShell,
  PageHero,
  PersonalizedSection,
  PricingSection,
  PRICING_FAQS,
  PRODUCT_FAQS,
  RunwaySection,
  SIGN_UP_URL,
  StartingPlanPreview,
} from "./MarketingSite";

export function MarketingHowItWorks() {
  return (
    <MarketingShell current="how-it-works">
      <main id="main-content">
        <PageHero
          current="how-it-works"
          kicker="One connected plan"
          title="Start with your situation. Build from there."
          body="Offboard organizes the work after a layoff around three jobs: protect your runway, find available support, and build what comes next."
          aside={<><span>Three jobs, one plan</span><strong>Runway. Support. Next role.</strong><p>Your answers stay connected to the work you choose to do.</p></>}
        />
        <FragmentedSection />
        <PersonalizedSection />
        <RunwaySection />
        <BenefitsSection />
        <SearchShowcase signUpUrl={SIGN_UP_URL} />
        <HumanSupportSection />
        <section className="mh-proof mh-section mh-split" aria-labelledby="product-proof-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">Built around the work after a layoff</span>
            <h2 id="product-proof-title">One plan that keeps the context attached.</h2>
            <p>Your priorities, possible support, saved roles, materials, and next steps stay connected so you do not have to rebuild the story every time you move.</p>
            <ul className="mh-plain-list ruled"><li>01 A starting plan organized around your situation</li><li>02 One workspace connecting each role and application</li><li>03 Official sources and clear follow-through</li></ul>
          </div>
          <div><StartingPlanPreview /><small className="mh-card-note">Example information shown. Your plan reflects the details you choose to provide.</small></div>
        </section>
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
          kicker="Start free"
          title="Begin with a plan. Add support when it earns its place."
          body="Create your starting plan and organize your search without adding a payment method. Offboard shows the price and what is included before you choose anything paid."
          aside={<><span>Clear before you pay</span><strong>No hidden starting fee.</strong><p>Use the core tools first, then decide whether deeper research, tailored materials, or human support would help.</p></>}
          cta="Start free"
        />
        <PricingSection />
        <EditorialGrid
          kicker="Choose with context"
          title="Pay only when the added support fits the moment."
          body="The free plan is the starting point. Paid options are for moments when you want more capacity or a different kind of help."
          items={[
            { title: "Deeper product work", body: "Use credits for eligible research, tailored materials, and interview preparation." },
            { title: "Human support", body: "Book an available support option when your situation needs more context than software can provide." },
            { title: "A clear decision", body: "Review the price, scope, and availability before you pay or schedule." },
          ]}
        />
        <FaqSection title="Pricing and support, without surprises." items={PRICING_FAQS} />
        <FinalCta title="Start free. Decide what else you need later." body="Build the first version of your plan before deciding whether more support would help." />
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
          title="A layoff should not leave you alone with a search box."
          body="Offboard was built to turn a fragmented, stressful transition into a clear plan with practical tools, official sources, and human support when it matters."
          cta="Talk to the team"
          ctaHref="mailto:hello@offboard.co"
          aside={<><span>Our role</span><strong>A quiet companion for the work ahead.</strong><p>Independent support that helps you decide what deserves attention next.</p></>}
        />
        <section className="mh-route-story mh-section mh-split" aria-labelledby="about-origin-title">
          <div className="mh-route-story-photo"><Image src="/marketing/homepage/raw/hero-real-life.webp" alt="A woman at home planning what comes after a layoff" fill sizes="(max-width: 900px) 100vw, 44vw" /></div>
          <div className="mh-copy-block">
            <span className="mh-kicker">The origin</span>
            <h2 id="about-origin-title">We kept hearing the same questions.</h2>
            <p>What should I do first? Which deadlines matter? Where do benefits, training, and the job search fit together? Offboard grew from conversations, a weekly newsletter, and a community for people navigating those questions.</p>
            <p>The product organizes what people were otherwise piecing together across portals, documents, messages, and separate tools.</p>
          </div>
        </section>
        <EditorialGrid
          kicker="What guides the work"
          title="Calm is part of the product."
          body="People use Offboard during a stressful transition. The experience should reduce noise, preserve choice, and make the next useful action easier to see."
          items={[
            { title: "Clarity before volume", body: "Show what deserves attention now instead of presenting every possible task at once." },
            { title: "Official sources", body: "Use responsible agencies and providers for eligibility, applications, and final decisions." },
            { title: "Private by default", body: "Let people choose what enters their workspace and explain sponsor visibility before enrollment." },
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
          title="Give people a clear place to start after separation."
          body="Offboard provides independent transition support for the practical work that follows a layoff, from runway and possible benefits to the job search and human guidance."
          cta="Talk about sponsored access"
          ctaHref="mailto:hello@offboard.co?subject=Employer%20support"
          aside={<><span>The member experience</span><strong>Private, practical, and independent.</strong><p>People get a starting plan while sponsor visibility is explained before enrollment.</p></>}
        />
        <EditorialGrid
          kicker="A better starting point"
          title="Support the whole transition, not only the resume."
          body="A layoff creates financial, benefits, and job-search work at the same time. Offboard helps members organize all three without positioning the former employer as their case manager."
          items={[
            { title: "A starting plan", body: "Members begin with their own situation and see what may deserve attention first." },
            { title: "Connected job-search tools", body: "Roles, research, materials, interviews, and next steps remain attached to the opportunity." },
            { title: "Human support", body: "Members can use self-serve tools, ask Lumo, or review available support from a person." },
          ]}
        />
        <section className="mh-route-sponsor mh-section mh-split" aria-labelledby="employer-privacy-title">
          <div className="mh-copy-block"><span className="mh-kicker">Clear sponsor terms</span><h2 id="employer-privacy-title">People should know what a sponsor can see.</h2><p>Before a sponsored member enrolls, Offboard explains what the program sponsor can and cannot see. Visibility depends on the program notice. Personal benefit decisions remain with responsible agencies and providers.</p></div>
          <div className="mh-route-sponsor-card"><span>Member workspace</span><strong>Chosen by the member</strong><p>Transition details, saved roles, documents, and requested support stay in the member experience according to the applicable notice.</p><span>Sponsor view</span><strong>Explained before enrollment</strong><p>Program reporting and visibility are defined before participation begins.</p></div>
        </section>
        <EditorialGrid
          kicker="A simple program path"
          title="Make the handoff clear from day one."
          body="A sponsored program should be easy to explain, easy to enter, and explicit about who is responsible for each decision."
          items={[
            { title: "Define the program", body: "Agree on eligibility, access, sponsor visibility, and available support." },
            { title: "Explain it before enrollment", body: "Give members a clear notice before they choose whether to participate." },
            { title: "Let Offboard support the transition", body: "Members use their plan and tools while official agencies remain responsible for program decisions." },
          ]}
        />
        <ContactBand kicker="Sponsored access" title="Design a program people can understand." body="Tell us who you want to support, when the handoff happens, and what your team needs to know." cta="Talk about employer support" href="mailto:hello@offboard.co?subject=Employer%20support" />
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
        <EditorialGrid
          kicker="The member journey"
          title="Connect the practical work around the official system."
          body="Residents often move between state portals, local programs, training providers, healthcare options, and job-search tools. Offboard gives that work one understandable frame."
          items={[
            { title: "Orient", body: "Start with the resident's situation and identify what may deserve attention now." },
            { title: "Route", body: "Present possible programs with the responsible official source or local provider beside the guidance." },
            { title: "Follow through", body: "Keep deadlines, questions, jobs, materials, and next steps in one private workspace." },
          ]}
        />
        <section className="mh-route-independence mh-section" aria-labelledby="public-boundary-title">
          <div><span className="mh-kicker is-lime">Roles stay clear</span><h2 id="public-boundary-title">Agencies decide. Offboard helps people prepare and continue.</h2></div>
          <p>Offboard does not determine eligibility, calculate benefits, approve applications, or replace case workers and qualified professionals. It helps people understand what may be relevant, prepare questions, and reach the correct official destination.</p>
        </section>
        <EditorialGrid
          kicker="Program design"
          title="Make privacy and visibility explicit."
          body="Sponsored access should be understandable before enrollment and limited to the terms of the program."
          items={[
            { title: "Member choice", body: "People choose what they share and which Offboard support they request." },
            { title: "Defined sponsor visibility", body: "The program notice explains what the sponsoring organization can and cannot see." },
            { title: "Official-source handoff", body: "Residents continue to the responsible agency or provider for applications and decisions." },
          ]}
        />
        <ContactBand kicker="Public partnership" title="Build a clearer route through the transition." body="Tell us which residents you serve, which systems they navigate, and where the current handoff breaks down." cta="Discuss a public partnership" href="mailto:hello@offboard.co?subject=Public%20partner%20support" />
      </main>
    </MarketingShell>
  );
}

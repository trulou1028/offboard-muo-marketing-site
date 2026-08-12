import { ArrowDown, ArrowRight, Check, Menu, Plus } from "lucide-react";

import { ComparisonTable } from "@/components/marketing/homepage/ComparisonTable";
import {
  CapabilitiesSection,
  LifeStripSection,
  ProofSection,
  WhatsIncludedSection,
} from "@/components/marketing/homepage/HomeSections";
import {
  BenefitsScene,
  InteractivePathScene,
  ToolkitShowcase,
  TrustScene,
} from "@/components/marketing/homepage/ProductScenes";
import { SystemDiagram } from "@/components/marketing/homepage/SystemDiagram";
import {
  APPROVED_CUSTOMER_STORY,
  HOMEPAGE_FAQS,
  TRANSFORMATION,
  type ApprovedCustomerStory,
} from "@/components/marketing/homepage/fixtures";
import "@/components/marketing/homepage/MarketingHomepage.css";

const SIGN_UP_URL = "https://app.offboard.co/auth?tab=signup";
const SIGN_IN_URL = "https://app.offboard.co/auth?tab=signin";

function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className="mh-brand">
      <img
        src={light ? "/marketing/homepage/offboard-logo-light.png" : "/marketing/homepage/offboard-logo-dark.png"}
        alt="Offboard"
      />
    </span>
  );
}

function PrimaryCta({ className = "" }: { className?: string }) {
  return (
    <a className={`mh-primary-cta ${className}`.trim()} href={SIGN_UP_URL}>
      Build my free plan <ArrowRight aria-hidden="true" />
    </a>
  );
}

function CustomerStorySection({ story }: { story: ApprovedCustomerStory | null }) {
  if (!story) return null;

  return (
    <section className="mh-customer-story mh-cream" aria-labelledby="customer-story-title">
      <div className="mh-customer-story-copy">
        <span className="mh-kicker">Follow Maya's first 30 days</span>
        <h2 id="customer-story-title">Know what to do today, what can wait, and what comes next.</h2>
        <p>{story.layoffContext}</p>
        <ol className="mh-story-timeline">
          {story.timeline.map((entry) => (
            <li key={entry.when}><span>{entry.when}</span><strong>{entry.what}</strong></li>
          ))}
        </ol>
        <small>{story.roleContext}</small>
      </div>
      <img src={story.photoSrc} alt={story.photoAlt} width="1100" height="1650" loading="lazy" />
    </section>
  );
}

const MEMBER_COMPANIES = [
  "Snowflake",
  "Microsoft",
  "Meta",
  "DoorDash",
  "Oracle",
  "Cisco",
  "Starbucks",
] as const;

// Hero collage scraps: decorative torn-paper accents from the approved mockup.
const HERO_COLLAGE = [
  { src: "/marketing/homepage/collage/scrap-calendar.webp", className: "mh-collage-calendar" },
  { src: "/marketing/homepage/collage/scrap-health.webp", className: "mh-collage-health" },
  { src: "/marketing/homepage/collage/scrap-runway.webp", className: "mh-collage-runway" },
  { src: "/marketing/homepage/collage/scrap-path.webp", className: "mh-collage-path" },
] as const;

export default function MarketingHome() {
  return (
    <div className="marketing-homepage">
      <a className="mh-skip-link" href="#main-content">Skip to content</a>

      <header className="mh-site-header">
        <a className="mh-logo-link" href="#top" aria-label="Offboard home"><Brand light /></a>
        <nav aria-label="Marketing navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#benefits">Benefits</a>
          <a href="#job-search">Tools</a>
          <a href="#trust">Privacy</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="mh-header-actions">
          <a className="mh-sign-in" href={SIGN_IN_URL}>Sign in</a>
          <PrimaryCta className="mh-header-cta" />
        </div>
        <a className="mh-mobile-cta" href={SIGN_UP_URL} aria-label="Build my free plan"><Menu aria-hidden="true" /></a>
      </header>

      <main id="main-content">
        {/* 01 — HERO */}
        <section className="mh-hero mh-deep mh-section" id="top">
          <div className="mh-hero-copy">
            <span className="mh-kicker">Life after a layoff</span>
            <h1>The modern unemployment office.</h1>
            <p>
              Everything you need after a layoff, organized into one clear plan. Know what
              you're eligible for, what matters now, and what to do next.
            </p>
            <div className="mh-hero-actions">
              <PrimaryCta />
              <a className="mh-text-link" href="#how-it-works">See how it works <ArrowDown aria-hidden="true" /></a>
            </div>
            <small>Private by default. Independent of government agencies. No credit card required.</small>
          </div>

          <div className="mh-hero-media">
            <img
              src="/marketing/homepage/raw/hero-real-life.webp"
              alt="A woman at her desk by the window, pen in hand, beginning to sort out what comes after a job loss"
              width="1448"
              height="1086"
              loading="eager"
              fetchPriority="high"
            />
            {HERO_COLLAGE.map((scrap) => (
              <img
                key={scrap.src}
                className={`mh-hero-collage ${scrap.className}`}
                src={scrap.src}
                alt=""
                aria-hidden="true"
                width="800"
                height="800"
                loading="lazy"
              />
            ))}
          </div>
        </section>

        <section className="mh-logo-strip" aria-label="Where Offboard members come from">
          <span>Our members come from teams at</span>
          <div className="mh-logo-row" aria-label="Member companies">
            {MEMBER_COMPANIES.map((company) => (
              <span key={company}>{company}</span>
            ))}
          </div>
        </section>

        {/* 02 — TRANSFORMATION */}
        <section className="mh-path-section mh-section" id="sample-path">
          <span id="how-it-works" className="mh-anchor-target" aria-hidden="true" />
          <div className="mh-feature-grid mh-feature-grid-path">
            <div className="mh-feature-copy">
              <span className="mh-kicker">How it works</span>
              <h2>Your next steps, in the right order.</h2>
              <div className="mh-fromto">
                <p className="mh-from">{TRANSFORMATION.fromQuote}</p>
                <p className="mh-to mh-type-sub">{TRANSFORMATION.toQuote}</p>
              </div>
              <ol className="mh-numbered-points">
                {TRANSFORMATION.steps.map((step, index) => (
                  <li key={step.title}>
                    <span>{index + 1}</span>
                    <div><strong>{step.title}</strong><p>{step.body}</p></div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mh-product-canvas"><InteractivePathScene /></div>
          </div>
        </section>

        {/* 03 — DEEP BENEFIT */}
        <section className="mh-help-section mh-cream mh-section" id="benefits">
          <div className="mh-feature-grid">
            <div className="mh-feature-copy">
              <span className="mh-kicker">The benefits counter, rebuilt</span>
              <h2>See what you may qualify for before important deadlines pass.</h2>
              <p>
                Offboard surfaces programs and deadlines that may apply to your situation, shows you
                what to handle first, and keeps the official sources beside each recommendation.
              </p>
              <ul className="mh-feature-points">
                <li><Check aria-hidden="true" /><span><strong>Find programs you may qualify for</strong></span></li>
                <li><Check aria-hidden="true" /><span><strong>Know which deadlines matter</strong></span></li>
                <li><Check aria-hidden="true" /><span><strong>Understand what to do next</strong></span></li>
              </ul>
              <span className="mh-inline-disclaimer">
                Offboard is independent and is not affiliated with, endorsed by, or acting on behalf of any government agency.
              </span>
            </div>
            <div className="mh-product-canvas"><BenefitsScene /></div>
          </div>
        </section>

        {/* 04 — THE SYSTEM */}
        <section className="mh-system-section mh-section" aria-labelledby="system-title">
          <div className="mh-context-story">
            <div className="mh-context-photo">
              <img
                src="/marketing/homepage/raw/system-desk.webp"
                alt="A man at a desk in his home office, writing notes in a notebook beside an open laptop"
                width="1400"
                height="933"
                loading="lazy"
              />
            </div>
            <div className="mh-context-intro">
              <span className="mh-kicker">Built to remember what matters</span>
              <h2 id="system-title">Tell us once. Never start from scratch again.</h2>
              <p>
                Offboard isn't one feature. Everything works from the same understanding of you —
                your role, location, goals, deadlines, and documents stay connected across
                benefits, resumes, applications, and interview preparation.
              </p>
              <SystemDiagram />
              <small>Maya Chen is an illustrative California member used consistently throughout this demo.</small>
            </div>
          </div>
        </section>

        {/* 05 — CAPABILITIES */}
        <CapabilitiesSection />

        {/* 06 — PRODUCT DEEP DIVE */}
        <section className="mh-search-section mh-dark mh-section" id="job-search">
          <div className="mh-section-heading">
            <span className="mh-kicker">The toolkit</span>
            <h2>Every part of your search, connected.</h2>
            <p>
              Build the packet, tailor the resume, track the application, and prepare for the
              interview without starting over.
            </p>
          </div>
          <ToolkitShowcase signUpUrl={SIGN_UP_URL} />
        </section>

        {/* 07 — PROOF + CTA */}
        <ProofSection />

        {/* 08 — WHAT'S INCLUDED */}
        <WhatsIncludedSection />

        {/* 09 — STORY */}
        <CustomerStorySection story={APPROVED_CUSTOMER_STORY} />

        {/* 11 — COMPARISON */}
        <section className="mh-comparison mh-white mh-section" aria-labelledby="comparison-title">
          <div className="mh-section-heading">
            <span className="mh-kicker">Why not piece it together?</span>
            <h2 id="comparison-title">You can do this yourself. You shouldn't have to.</h2>
            <p>
              The unemployment experience is fragmented across agencies, tools, and advice.
              Offboard's job is connecting it.
            </p>
          </div>
          <ComparisonTable />
        </section>

        {/* 12 — PRIVACY */}
        <section className="mh-trust-section mh-dark mh-section" id="trust">
          <div className="mh-section-heading mh-section-heading-split">
            <div>
              <span className="mh-kicker">Your information</span>
              <h2>Private by default. Yours to keep.</h2>
            </div>
            <div>
              <p>
                Everything you share stays in your workspace. Not sold, not shared with your
                former employer, and never visible to anyone you have not chosen.
              </p>
              <span className="mh-inline-disclaimer">
                Government agencies make final eligibility decisions. If an employer or agency
                sponsors your Offboard account, they see anonymous participation counts only.
              </span>
            </div>
          </div>
          <TrustScene />
        </section>

        {/* 13 — PRICING */}
        <section className="mh-pricing-section mh-section" id="pricing">
          <div className="mh-pricing-intro">
            <span className="mh-kicker">Support that grows with you</span>
            <h2>Start free. Add more support when you need it.</h2>
            <p>No setup fee. No hidden trial. Keep your workspace whether or not you upgrade.</p>
          </div>
          <div className="mh-pricing-guide" aria-label="Offboard plans">
            <article className="mh-pricing-row">
              <div className="mh-pricing-label">
                <strong>Start here</strong>
                <span>Free forever</span>
              </div>
              <div className="mh-pricing-summary">
                <h3>Free</h3>
                <p>Everything you need to understand where you stand and make the first strong move.</p>
              </div>
              <div className="mh-pricing-action">
                <p>Navigator · First Application Packet · 30 credits · Daily LUMO</p>
                <PrimaryCta />
              </div>
            </article>
            <article className="mh-pricing-row">
              <div className="mh-pricing-label">
                <strong>Need more help?</strong>
                <span className="mh-pricing-tag">More support</span>
              </div>
              <div className="mh-pricing-summary">
                <div className="mh-pricing-name"><h3>Plus</h3><span>$20 / month</span></div>
                <p>Additional guidance, tools, and support when your search needs more capacity.</p>
              </div>
              <div className="mh-pricing-action">
                <p>Everything in Free · 300 credits · Unlimited LUMO · More packets</p>
                <a className="mh-secondary-cta" href={SIGN_UP_URL}>Choose Plus <ArrowRight aria-hidden="true" /></a>
              </div>
            </article>
          </div>
        </section>

        {/* 14 — HUMAN SUPPORT */}
        <section className="mh-community-section mh-white mh-section" aria-labelledby="community-title">
          <div className="mh-section-heading">
            <span className="mh-kicker">You don't have to do this alone</span>
            <h2 id="community-title">Real people, in it with you.</h2>
          </div>
          <div className="mh-community-grid">
            <article className="mh-community-card">
              <div className="mh-community-number"><span>01</span><i aria-hidden="true" /></div>
              <h3>Find trusted expertise</h3>
              <p>Weekly job-market analysis and honest hiring takes. Read by more than 5,000 people.</p>
              <a href="https://newsletter.offboard.co" target="_blank" rel="noreferrer">Subscribe free <ArrowRight aria-hidden="true" /></a>
            </article>
            <article className="mh-community-card">
              <div className="mh-community-number"><span>02</span><i aria-hidden="true" /></div>
              <h3>Join the community</h3>
              <p>Job seekers share leads, compare notes, and keep each other accountable. Free to join.</p>
              <a href="https://join.slack.com/t/offboardco/shared_invite/zt-34fsjpgfn-BcbibJ3d86P5RztYnHsA9w" target="_blank" rel="noreferrer">Join the Slack <ArrowRight aria-hidden="true" /></a>
            </article>
            <article className="mh-community-card">
              <div className="mh-community-number"><span>03</span><i aria-hidden="true" /></div>
              <h3>Meet with a human</h3>
              <p>When you are stuck, share your situation and a real person on our team will review it.</p>
              <a href="https://offboard.co/intake" target="_blank" rel="noreferrer">Meet with a Human <ArrowRight aria-hidden="true" /></a>
            </article>
          </div>
        </section>

        {/* 15 — FAQ */}
        <section className="mh-faq-section mh-cream mh-section" aria-labelledby="faq-title">
          <div>
            <span className="mh-kicker">Good questions</span>
            <h2 id="faq-title">A few things to know before you start.</h2>
          </div>
          <div className="mh-faq-grid">
            {HOMEPAGE_FAQS.map((item) => (
              <article key={item.question}>
                <div><h3>{item.question}</h3><Plus aria-hidden="true" /></div>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 16 — LIFE AFTER LAYOFF */}
        <LifeStripSection />

        {/* 17 — FINAL CTA */}
        <section className="mh-final-section mh-deep mh-section">
          <div className="mh-final-photo">
            <img
              src="/marketing/homepage/raw/final-cta-portrait.webp"
              alt="A woman stepping out of her front door into soft morning light, looking ahead with quiet determination"
              width="1100"
              height="1650"
              loading="lazy"
            />
          </div>
          <div className="mh-final-copy">
            <Brand light />
            <span className="mh-kicker">Your next chapter can start here</span>
            <h2>Turn uncertainty into a clear plan.</h2>
            <p>Build a private plan for your benefits, deadlines, and job search, then take each next step with confidence.</p>
            <PrimaryCta />
            <small>No credit card. Free plan included.</small>
          </div>
        </section>
      </main>

      <footer className="mh-site-footer mh-deep">
        <Brand light />
        <p>Offboard is an independent company, not a government agency. We help you navigate official programs. Your benefits are yours, and claiming them is always free.</p>
        <div>
          <a href="https://app.offboard.co/privacy">Privacy</a>
          <a href="https://app.offboard.co/terms">Terms</a>
          <a href={SIGN_IN_URL}>Sign in</a>
        </div>
        <span>© {new Date().getFullYear()} Offboard</span>
      </footer>
    </div>
  );
}

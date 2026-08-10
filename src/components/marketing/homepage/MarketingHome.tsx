import { ArrowDown, ArrowRight, Check, Menu } from "lucide-react";

import {
  BenefitsScene,
  InteractivePathScene,
  JobSearchBento,
  TrustScene,
} from "@/components/marketing/homepage/ProductScenes";
import {
  APPROVED_CUSTOMER_STORY,
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
    <section className="mh-customer-story" aria-labelledby="customer-story-title">
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
      <img src={story.photoSrc} alt={story.photoAlt} />
    </section>
  );
}

const HOW_IT_WORKS_STEPS = [
  {
    title: "Tell us what happened",
    body: "Share your role, location, dates, and priorities.",
  },
  {
    title: "See what matters first",
    body: "Offboard organizes deadlines, benefits, and job-search steps around your situation.",
  },
  {
    title: "Work the plan",
    body: "Complete each step with LUMO, your documents, and your saved context beside you.",
  },
];

const LOGO_STRIP = [
  { name: "Snowflake", file: "snowflake.svg" },
  { name: "Microsoft", file: "microsoft.svg" },
  { name: "Meta", file: "meta.svg" },
  { name: "DoorDash", file: "doordash.svg" },
  { name: "Oracle", file: "oracle.svg" },
  { name: "Cisco", file: "cisco.svg" },
  { name: "Starbucks", file: "starbucks.svg" },
  { name: "DocuSign", file: "docusign.svg" },
  { name: "Glassdoor", file: "glassdoor.svg" },
  { name: "General Motors", file: "general-motors.svg" },
];

const FAQS = [
  {
    question: "Is Offboard a government agency?",
    answer: "No. Offboard is an independent company. We organize official information and help you understand the next step, but agencies decide eligibility and benefits.",
  },
  {
    question: "Do I have to follow the path in order?",
    answer: "No. Your path suggests an order based on urgency and context, but every stage stays open. Start wherever your situation needs you.",
  },
  {
    question: "What can a sponsor see?",
    answer: "Only aggregate participation. Sponsors cannot see documents, applications, conversations, personal details, or individual behavior.",
  },
  {
    question: "What is included for free?",
    answer: "The free plan includes the navigator, your first Job Packet, 30 monthly credits, and three Ask LUMO messages each day.",
  },
];

export default function MarketingHome() {
  return (
    <div className="marketing-homepage">
      <a className="mh-skip-link" href="#main-content">Skip to content</a>

      <header className="mh-site-header">
        <a className="mh-logo-link" href="#top" aria-label="Offboard home"><Brand /></a>
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
        <section className="mh-hero" id="top">
          <div className="mh-hero-copy">
            <span className="mh-kicker">Life after a layoff</span>
            <h1>The modern unemployment office.</h1>
            <p>
              Tell us what happened. Offboard turns your layoff into a private, step-by-step
              plan for benefits, deadlines, and finding your next job.
            </p>
            <div className="mh-hero-actions">
              <PrimaryCta />
              <a className="mh-text-link" href="#how-it-works">See how it works <ArrowDown aria-hidden="true" /></a>
            </div>
            <small>Private by default. Independent of government agencies. No credit card required.</small>
          </div>

          <div className="mh-hero-media">
            <img src="/marketing/homepage/hero-editorial-v2.webp" alt="A person beginning the next chapter after a job loss" />
          </div>
        </section>

        <section className="mh-logo-strip" aria-label="Where Offboard members come from">
          <span>Our members come from teams at</span>
          <div className="mh-logo-row">
            {LOGO_STRIP.map((logo) => (
              <img key={logo.name} src={`/marketing/homepage/logos/${logo.file}`} alt={logo.name} loading="lazy" />
            ))}
          </div>
        </section>

        <section className="mh-path-section" id="sample-path">
          <span id="how-it-works" className="mh-anchor-target" aria-hidden="true" />
          <div className="mh-feature-grid mh-feature-grid-path">
            <div className="mh-feature-copy">
              <span className="mh-kicker">How it works</span>
              <h2>Your next steps, in the right order.</h2>
              <p>
                Offboard builds your seven-stage plan in three steps, then stays with you
                while you work it. Every stage stays open; the order is suggested, never gated.
              </p>
              <ol className="mh-numbered-points">
                {HOW_IT_WORKS_STEPS.map((step, index) => (
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

        <section className="mh-help-section" id="benefits">
          <div className="mh-feature-grid">
            <div className="mh-feature-copy">
              <span className="mh-kicker">The benefits counter, rebuilt</span>
              <h2>See what you may qualify for before important deadlines pass.</h2>
              <p>
                Offboard surfaces programs and deadlines that may apply to your situation, shows you
                what to handle first, and keeps the official sources beside each recommendation.
              </p>
              <ul className="mh-feature-points">
                <li><Check aria-hidden="true" /><span><strong>Handle urgent steps first</strong></span></li>
                <li><Check aria-hidden="true" /><span><strong>Know what is confirmed and what still needs review</strong></span></li>
                <li><Check aria-hidden="true" /><span><strong>See the official source behind every recommendation</strong></span></li>
              </ul>
              <span className="mh-inline-disclaimer">
                Offboard is independent and is not affiliated with, endorsed by, or acting on behalf of any government agency.
              </span>
            </div>
            <div className="mh-product-canvas"><BenefitsScene /></div>
          </div>
        </section>

        <section className="mh-search-section" id="job-search">
          <div className="mh-section-heading">
            <span className="mh-kicker">The toolkit</span>
            <h2>Stop rebuilding your application for every role.</h2>
            <p>
              Paste a job link and Offboard assembles the application. Around it, every tool
              for the transition shows up at the right moment, already knowing your situation.
            </p>
          </div>
          <JobSearchBento />
        </section>

        <section className="mh-context-section">
          <div className="mh-context-story">
            <div className="mh-context-photo">
              <img src="/marketing/homepage/journey-editorial-v3.webp" alt="A Black technology professional reflecting and planning his next move" />
            </div>
            <div className="mh-context-intro">
              <span className="mh-kicker">Built to remember what matters</span>
              <h2>Tell us once. Never start from scratch again.</h2>
              <p>
                Your role, location, goals, deadlines, and documents stay connected across
                benefits, resumes, applications, and interview preparation.
              </p>
              <small>Maya Chen is an illustrative California member used consistently throughout this demo.</small>
            </div>
          </div>
        </section>

        <CustomerStorySection story={APPROVED_CUSTOMER_STORY} />

        <section className="mh-trust-section" id="trust">
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

        <section className="mh-pricing-section" id="pricing">
          <div className="mh-pricing-intro">
            <span className="mh-kicker">Support that grows with you</span>
            <h2>Start free. Add more support when you need it.</h2>
            <p>No setup fee. No hidden trial. Keep your workspace whether or not you upgrade.</p>
          </div>
          <div className="mh-pricing-cards">
            <article>
              <span>Free</span>
              <div><strong>$0</strong><small>forever</small></div>
              <p>The essentials for getting oriented and making the first strong move.</p>
              <ul>
                <li><Check aria-hidden="true" /> Full navigator</li>
                <li><Check aria-hidden="true" /> First Job Packet</li>
                <li><Check aria-hidden="true" /> 30 monthly credits</li>
                <li><Check aria-hidden="true" /> Three daily LUMO messages</li>
              </ul>
              <PrimaryCta />
            </article>
            <article className="is-pro">
              <span>Pro</span>
              <div><strong>$20</strong><small>/ month</small></div>
              <p>More capacity for an active search, without losing the shared context.</p>
              <ul>
                <li><Check aria-hidden="true" /> Everything in Free</li>
                <li><Check aria-hidden="true" /> 300 monthly credits</li>
                <li><Check aria-hidden="true" /> Unlimited LUMO</li>
                <li><Check aria-hidden="true" /> More Job Packets and tools</li>
              </ul>
              <a className="mh-primary-cta" href={SIGN_UP_URL}>Choose Pro <ArrowRight aria-hidden="true" /></a>
            </article>
          </div>
        </section>

        <section className="mh-community-section" aria-labelledby="community-title">
          <div className="mh-section-heading">
            <span className="mh-kicker">You don't have to do this alone</span>
            <h2 id="community-title">Real people, in it with you.</h2>
          </div>
          <div className="mh-community-grid">
            <article className="mh-card mh-community-card">
              <h3>The Offboard newsletter</h3>
              <p>Weekly job-market analysis and honest hiring takes. 5,000+ readers.</p>
              <a href="https://newsletter.offboard.co" target="_blank" rel="noreferrer">Subscribe free <ArrowRight aria-hidden="true" /></a>
            </article>
            <article className="mh-card mh-community-card">
              <h3>The Slack community</h3>
              <p>Job seekers sharing leads and keeping each other accountable. Free to join.</p>
              <a href="https://join.slack.com/t/offboardco/shared_invite/zt-34fsjpgfn-BcbibJ3d86P5RztYnHsA9w" target="_blank" rel="noreferrer">Join the Slack <ArrowRight aria-hidden="true" /></a>
            </article>
            <article className="mh-card mh-community-card">
              <h3>Meet with a Human</h3>
              <p>Stuck? Share your situation and a real person on our team reviews it. Free.</p>
              <a href="https://offboard.co/intake" target="_blank" rel="noreferrer">Meet with a Human <ArrowRight aria-hidden="true" /></a>
            </article>
          </div>
        </section>

        <section className="mh-faq-section" aria-labelledby="faq-title">
          <div>
            <span className="mh-kicker">Good questions</span>
            <h2 id="faq-title">A few things to know before you start.</h2>
          </div>
          <div className="mh-faq-grid">
            {FAQS.map((item) => (
              <article key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>
            ))}
          </div>
        </section>

        <section className="mh-final-section">
          <div className="mh-final-photo"><img src="/marketing/homepage/forward-editorial-v2.webp" alt="A South Asian technology professional carrying her laptop toward a new opportunity" /></div>
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

      <footer className="mh-site-footer">
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

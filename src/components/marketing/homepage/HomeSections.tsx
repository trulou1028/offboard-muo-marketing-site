/**
 * Fixture-driven sections new to the conversion architecture. All server
 * components - no state, no handlers.
 */
import { ArrowRight, Check } from "lucide-react";

import { CAPABILITIES, LIFE_STRIP, PROOF, WHATS_INCLUDED } from "./fixtures";

const SIGN_UP_URL = "https://app.offboard.co/auth?tab=signup";

export function CapabilitiesSection() {
  return (
    <section className="mh-capabilities mh-white" aria-labelledby="capabilities-title">
      <div className="mh-section-heading">
        <span className="mh-kicker">The short version</span>
        <h2 id="capabilities-title">Everything you need to move forward.</h2>
      </div>
      <div className="mh-capabilities-grid">
        {CAPABILITIES.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.line}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProofSection() {
  return (
    <section className="mh-proof mh-cream" aria-labelledby="proof-title">
      <div className="mh-proof-lead">
        <span className="mh-kicker">Why we built this</span>
        <h2 id="proof-title">{PROOF.headline}</h2>
        <p>{PROOF.qualitative}</p>
        <a className="mh-primary-cta" href={SIGN_UP_URL}>
          Build my free plan <ArrowRight aria-hidden="true" />
        </a>
      </div>
      <div className="mh-proof-evidence">
        <div className="mh-proof-stat">
          <strong>{PROOF.stat}</strong>
          <span>{PROOF.statLabel}</span>
        </div>
        <figure className="mh-proof-quote">
          <p className="mh-type-sub">{PROOF.quote}</p>
          <figcaption>{PROOF.quoteLabel}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function WhatsIncludedSection() {
  return (
    <section className="mh-included" aria-labelledby="included-title">
      <div className="mh-section-heading">
        <span className="mh-kicker">What you actually get</span>
        <h2 id="included-title">Everything in your Offboard.</h2>
      </div>
      <ul className="mh-included-list">
        {WHATS_INCLUDED.map((item) => (
          <li key={item.title}>
            <Check aria-hidden="true" />
            <div>
              <strong>{item.title}</strong>
              <span>{item.line}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function LifeStripSection() {
  return (
    <section className="mh-life-strip" aria-label="Life after a layoff, in real moments">
      {LIFE_STRIP.map((frame) => (
        <figure key={frame.src}>
          <img src={frame.src} alt={frame.alt} width="1200" height="800" loading="lazy" />
          <figcaption>{frame.caption}</figcaption>
        </figure>
      ))}
    </section>
  );
}

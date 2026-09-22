import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FinalCta, MarketingShell, PageHero } from "./MarketingSite";

// Copy: COPY.md § 10. The illustration is a static example.
const BENEFITS = [
  ["Tailored resumes", "Bring forward the experience that fits each role."],
  ["Application Packets", "Keep research and application materials together."],
  ["Interview prep", "Prepare with examples from your own experience."],
] as const;

export function MarketingCareerContext() {
  const contextGridAlt = "Career Context grid showing Resume, Job search target, Layoff and urgency, Resume or profile source, Email, and ChatGPT cards";

  return (
    <MarketingShell current="career-context">
      <main id="main-content">
        <PageHero
          kicker="Career Context"
          title="Build your Career Context once. Use it everywhere."
          body="Your experience, goals, and job search in one record, ready for your next application or interview."
          current="career-context"
          layout="relume-47"
          aside={false}
          cta="Get started free"
        />
        <div className="mh-context-preview mh-section">
      <figure className="mh-context-product-shot">
        <div className="mh-context-product-shot-frame">
          <Image
            className="is-desktop"
            src="/marketing/app/career-context-grid-v3.webp"
            alt={contextGridAlt}
            width={1672}
            height={941}
            sizes="(max-width: 1280px) calc(100vw - 64px), 1200px"
          />
          <Image
            className="is-mobile"
            src="/marketing/app/career-context-grid-mobile-v3.webp"
            alt={contextGridAlt}
            width={941}
            height={1672}
            sizes="calc(100vw - 40px)"
          />
        </div>
        <figcaption>Illustrative example</figcaption>
      </figure>
        </div>
        <section className="mh-context-benefits mh-section" aria-labelledby="benefits-title">
          <h2 id="benefits-title">Put your experience to work.</h2>
          <ul className="mh-context-benefit-list">
            {BENEFITS.map(([title, body]) => <li key={title}><h3>{title}</h3><p>{body}</p></li>)}
          </ul>
          <div className="mh-context-links">
            <Link className="mh-section-link" href="/lumo">See how Lumo works <ArrowRight aria-hidden="true" /></Link>
            <Link className="mh-section-link" href="/integrations">See the integrations <ArrowRight aria-hidden="true" /></Link>
          </div>
        </section>
        <section className="mh-route-privacy mh-section" aria-labelledby="ownership-title">
          <div className="mh-copy-block">
            <h2 id="ownership-title">Your context. Your control.</h2>
            <p>Choose what you add. Edit, remove, or export it.</p>
          </div>
          <Link className="mh-section-link" href="/privacy-security">See exactly who can see what <ArrowRight aria-hidden="true" /></Link>
        </section>
        <FinalCta title="Stop starting from scratch." body="" />
      </main>
    </MarketingShell>
  );
}

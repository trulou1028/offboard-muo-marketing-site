import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, FolderOpen, MessagesSquare, PencilLine, Download } from "lucide-react";
import { FinalCta, MarketingShell, PageHero } from "./MarketingSite";

// Relume MCP Layout 78 and Layout 27, adapted to Civic Modern without Tailwind.
// Copy: COPY.md § 10. The dashboard is an illustrative, noninteractive example.
const BENEFITS = [
  { title: "Tailored resumes", body: "Bring forward the experience that fits each role.", icon: FileText },
  { title: "Application Packets", body: "Keep research and application materials together.", icon: FolderOpen },
  { title: "Interview prep", body: "Prepare with examples from your own experience.", icon: MessagesSquare },
] as const;

export function MarketingCareerContext() {
  return (
    <MarketingShell current="career-context">
      <main id="main-content" className="mh-page-context">
        <PageHero
          kicker="Career Context"
          title="Build your Career Context once. Use it everywhere."
          titleLines={["Build your Career Context once.", "Use it everywhere."]}
          body="Your experience, goals, and job search in one record, ready for your next application or interview."
          current="career-context"
          aside={false}
          cta="Get started free"
        />
        <div className="mh-context-preview mh-section">
          <figure className="mh-context-product-shot">
            <div className="mh-context-product-shot-frame">
              <Image
                src="/marketing/app/career-context-dashboard-v4.webp"
                alt="Illustrative Offboard dashboard with left navigation, top toolbar, and all six About You and Connected Sources cards"
                width={1586}
                height={992}
                sizes="(max-width: 1280px) calc(100vw - 48px), 1200px"
              />
            </div>
            <figcaption>Illustrative example</figcaption>
          </figure>
        </div>
        <section className="mh-context-benefits mh-section" aria-labelledby="benefits-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">Built from your experience</span>
            <h2 id="benefits-title">Put your experience to work.</h2>
            <p>Bring your resume, add what matters, and use that context across your search.</p>
            <div className="mh-context-links">
              <Link className="mh-section-link" href="/lumo">See how Lumo works <ArrowRight aria-hidden="true" /></Link>
              <Link className="mh-section-link" href="/integrations">See the integrations <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
          <ul className="mh-context-benefit-list">
            {BENEFITS.map(({ title, body, icon: Icon }) => (
              <li key={title}>
                <span className="mh-context-feature-icon"><Icon aria-hidden="true" /></span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </li>
            ))}
          </ul>
        </section>
        <section className="mh-context-ownership mh-section" aria-labelledby="ownership-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">Yours to shape</span>
            <h2 id="ownership-title">Your context.<br />Your control.</h2>
            <p>Choose what you add. Edit, remove, or export it.</p>
            <div className="mh-context-control-points">
              <div><PencilLine aria-hidden="true" /><h3>Keep it current</h3><p>Update your record as your experience and goals change.</p></div>
              <div><Download aria-hidden="true" /><h3>Take it with you</h3><p>Export what you have built. It is yours.</p></div>
            </div>
            <Link className="mh-section-link" href="/privacy-security">See exactly who can see what <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="mh-context-ownership-photo">
            <Image src="/marketing/site-imagery/documentary/career-context-reflection-civic-modern-v1.webp" alt="A woman at her dining table reviewing her experience with a laptop, notebook, and printed pages" fill sizes="(max-width: 800px) calc(100vw - 48px), 44vw" />
          </div>
        </section>
        <FinalCta title="Stop starting from scratch." body="" />
      </main>
    </MarketingShell>
  );
}

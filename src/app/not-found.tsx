import Link from "next/link";

import { MarketingShell } from "@/components/marketing/homepage/MarketingSite";

export default function NotFound() {
  return (
    <MarketingShell current="home">
      <main id="main-content">
        <section className="mh-route-hero mh-section">
          <div>
            <span className="mh-kicker is-lime">Page not found</span>
            <h1>This path does not lead anywhere yet.</h1>
            <p>Return to Offboard or see how the transition plan works.</p>
            <Link className="mh-primary-cta" href="/"><span>Return home</span></Link>
          </div>
          <aside><span>A useful next step</span><strong>Start from where you are.</strong><p>The homepage can point you toward the right part of Offboard.</p></aside>
        </section>
      </main>
    </MarketingShell>
  );
}

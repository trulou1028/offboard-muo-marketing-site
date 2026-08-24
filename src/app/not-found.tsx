import { MarketingShell, PageHero } from "@/components/marketing/homepage/MarketingSite";

export default function NotFound() {
  return (
    <MarketingShell current="home">
      <main id="main-content">
        <PageHero
          current="home"
          kicker="Page not found"
          title="This path does not lead anywhere yet."
          body="Return to Offboard or see how the transition plan works."
          cta="Return home"
          ctaHref="/"
          aside={<><span>A useful next step</span><strong>Start from where you are.</strong><p>The homepage can point you toward the right part of Offboard.</p></>}
        />
      </main>
    </MarketingShell>
  );
}

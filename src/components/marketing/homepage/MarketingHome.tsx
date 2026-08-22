import {
  CommunityStrip,
  ConnectedPlanSummary,
  FinalCta,
  HomeHero,
  HookBand,
  HowItWorksOverview,
  MarketingShell,
  PricingTeaser,
  ProblemSection,
  VerifiedFactsStrip,
} from "./MarketingSite";

export default function MarketingHome() {
  return (
    <MarketingShell current="home">
      <main id="main-content">
        <HomeHero />
        <ProblemSection />
        <HowItWorksOverview />
        <HookBand />
        <ConnectedPlanSummary />
        <VerifiedFactsStrip />
        <PricingTeaser />
        <CommunityStrip />
        <FinalCta />
      </main>
    </MarketingShell>
  );
}

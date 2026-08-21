import {
  ConnectedPlanSummary,
  FinalCta,
  HomeHero,
  HowItWorksOverview,
  HumanSupportSection,
  MarketingShell,
  PricingTeaser,
  PrivacySummary,
} from "./MarketingSite";

export default function MarketingHome() {
  return (
    <MarketingShell current="home">
      <main id="main-content">
        <HomeHero />
        <HowItWorksOverview />
        <ConnectedPlanSummary />
        <PrivacySummary />
        <HumanSupportSection compact />
        <PricingTeaser />
        <FinalCta />
      </main>
    </MarketingShell>
  );
}

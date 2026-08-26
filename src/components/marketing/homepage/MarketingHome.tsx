import {
  CommunityStrip,
  ConnectedPlanSummary,
  EmployerStrip,
  FinalCta,
  HomeHero,
  HookBand,
  HowItWorksOverview,
  IdentityContrast,
  MarketingShell,
  PricingTeaser,
  PrivacySummary,
  ProblemSection,
  VerifiedFactsStrip,
} from "./MarketingSite";

export default function MarketingHome() {
  return (
    <MarketingShell current="home">
      <main id="main-content">
        <HomeHero />
        <ProblemSection />
        <IdentityContrast />
        <HowItWorksOverview />
        <HookBand />
        <ConnectedPlanSummary />
        <VerifiedFactsStrip />
        <PricingTeaser />
        <EmployerStrip />
        <CommunityStrip />
        <PrivacySummary />
        <FinalCta photo />
      </main>
    </MarketingShell>
  );
}

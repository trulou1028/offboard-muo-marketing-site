import type { ComponentType } from "react";

import SevenLevelsAiAgentCapability from "./7-levels-ai-agent-capability";
import BestJobApplicationTrackers2026 from "./best-job-application-trackers-2026";
import CareerChangersGuideNegotiations from "./career-changers-guide-to-job-offer-negotiations";
import FirstWeekAfterALayoff from "./first-week-after-a-layoff";
import HealthInsuranceAfterALayoff from "./health-insurance-after-a-layoff";
import HowAiIsChangingTheJobSearchIn2026 from "./how-ai-is-changing-the-job-search-in-2026";
import HowToAnnounceALayoffOnLinkedin from "./how-to-announce-a-layoff-on-linkedin";
import NegotiatingYourSeverance from "./negotiating-your-severance";
import RebuildYourResumeAfterALayoff from "./rebuild-your-resume-after-a-layoff";
import WhatIsAnAiAgent from "./what-is-an-ai-agent";
import WillEmployersKnowCoverLetterIsAi from "./will-employers-know-cover-letter-is-ai";

// Maps each ported slug to its article body component. Every key here must
// have a matching `ported: true` entry in ../registry.ts.
export const postComponents: Record<string, ComponentType> = {
  "first-week-after-a-layoff": FirstWeekAfterALayoff,
  "negotiating-your-severance": NegotiatingYourSeverance,
  "rebuild-your-resume-after-a-layoff": RebuildYourResumeAfterALayoff,
  "career-changers-guide-to-job-offer-negotiations": CareerChangersGuideNegotiations,
  "health-insurance-after-a-layoff": HealthInsuranceAfterALayoff,
  "how-to-announce-a-layoff-on-linkedin": HowToAnnounceALayoffOnLinkedin,
  "best-job-application-trackers-2026": BestJobApplicationTrackers2026,
  "how-ai-is-changing-the-job-search-in-2026": HowAiIsChangingTheJobSearchIn2026,
  "what-is-an-ai-agent": WhatIsAnAiAgent,
  "7-levels-ai-agent-capability": SevenLevelsAiAgentCapability,
  "will-employers-know-cover-letter-is-ai": WillEmployersKnowCoverLetterIsAi,
};

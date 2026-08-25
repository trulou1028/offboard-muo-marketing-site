import type { Block } from "../schema";
import { parsePostBody } from "../schema";

import sevenLevelsAiAgentCapability from "./7-levels-ai-agent-capability.json";
import bestJobApplicationTrackers2026 from "./best-job-application-trackers-2026.json";
import careerChangersGuideToJobOfferNegotiations from "./career-changers-guide-to-job-offer-negotiations.json";
import firstWeekAfterALayoff from "./first-week-after-a-layoff.json";
import healthInsuranceAfterALayoff from "./health-insurance-after-a-layoff.json";
import howAiIsChangingTheJobSearchIn2026 from "./how-ai-is-changing-the-job-search-in-2026.json";
import howToAnnounceALayoffOnLinkedin from "./how-to-announce-a-layoff-on-linkedin.json";
import negotiatingYourSeverance from "./negotiating-your-severance.json";
import rebuildYourResumeAfterALayoff from "./rebuild-your-resume-after-a-layoff.json";
import whatIsAnAiAgent from "./what-is-an-ai-agent.json";
import willEmployersKnowCoverLetterIsAi from "./will-employers-know-cover-letter-is-ai.json";

// Every ported post's body, as portable JSON blocks (src/content/resources/schema.ts)
// rather than a compiled React component. Validated once at module load, so
// a malformed block file fails immediately and loudly (with the offending
// slug and block index) instead of surfacing as a runtime rendering bug.
const rawBodies: Record<string, unknown> = {
  "7-levels-ai-agent-capability": sevenLevelsAiAgentCapability,
  "best-job-application-trackers-2026": bestJobApplicationTrackers2026,
  "career-changers-guide-to-job-offer-negotiations": careerChangersGuideToJobOfferNegotiations,
  "first-week-after-a-layoff": firstWeekAfterALayoff,
  "health-insurance-after-a-layoff": healthInsuranceAfterALayoff,
  "how-ai-is-changing-the-job-search-in-2026": howAiIsChangingTheJobSearchIn2026,
  "how-to-announce-a-layoff-on-linkedin": howToAnnounceALayoffOnLinkedin,
  "negotiating-your-severance": negotiatingYourSeverance,
  "rebuild-your-resume-after-a-layoff": rebuildYourResumeAfterALayoff,
  "what-is-an-ai-agent": whatIsAnAiAgent,
  "will-employers-know-cover-letter-is-ai": willEmployersKnowCoverLetterIsAi,
};

const postBlocks: Record<string, Block[]> = Object.fromEntries(
  Object.entries(rawBodies).map(([slug, body]) => [slug, parsePostBody(body, slug)]),
);

export function getPostBlocks(slug: string): Block[] | undefined {
  return postBlocks[slug];
}

/** Every slug that has a converted block file, for contract tests (registry.test.ts). */
export const blockSlugs: string[] = Object.keys(postBlocks);

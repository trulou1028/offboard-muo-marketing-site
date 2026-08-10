/**
 * The seven-stage journey model (Sprint 214 / OFF-253, plan 102) — the
 * career-transition spine from the Round 22 strategy
 * (documentation/product/strategy-career-transition-platform.md §4).
 *
 * Slugs are API surface (routes in plan 103, analytics dimensions in plan
 * 104): pick once, never rename. Stage membership is a PRESENTATION mapping
 * over the one plan substrate (layoff_plan_* tables) — DB rows keep their
 * `phase` strings; the manifest assigns each item a stage. No data migration.
 */

export type JourneyStageId =
  | "land-the-blow"
  | "steady-yourself"
  | "choose-your-path"
  | "get-ready"
  | "run-the-search"
  | "close-it"
  | "land-and-give-back";

/**
 * The three situations the journey serves (plan 100's fork answers minus the
 * fast lane). Lives here (the leaf of the journey module graph) so both
 * journeyItems.ts and guides.ts can key per-situation copy off it without an
 * import cycle (plan 186). journeyItems.ts re-exports it for compatibility.
 */
// Inlined from the app repo's EntrySituation (src/lib/situationIntake.ts) minus
// "fast_lane" — standalone so this repo carries no supabase type chain.
export type JourneySituation = "just_laid_off" | "unemployed_a_while" | "employed_at_risk";

export interface JourneyStageMeta {
  id: JourneyStageId;
  /**
   * 1-based display number, DERIVED from array position (plan 195) so a
   * hand-written number can never drift from where the stage actually sits.
   */
  number: number;
  name: string;
  /** One quiet line under the name on the spine. */
  sub: string;
  /** The member's question this stage answers (tooltips, plan-103 headers). */
  question: string;
  /** Situation-specific display overrides (slugs never change). */
  nameBySituation?: Partial<Record<JourneySituation, string>>;
  subBySituation?: Partial<Record<JourneySituation, string>>;
}

/** Stage order and copy. Display numbers come from position, below. */
const STAGE_SEQUENCE: Omit<JourneyStageMeta, "number">[] = [
  {
    id: "land-the-blow",
    // Display name only — the slug `land-the-blow` is API surface (routes,
    // analytics) and never changes. "Land the blow" retired 2026-08-05 (owner
    // standup): it reads as a phrase written at a member, not for one.
    name: "Protect the first week",
    // "know your numbers" left with the runway step (plan 195): stage 1 no
    // longer asks anyone to do money math on day one.
    sub: "Protect yourself and buy breathing room",
    question: "What do I do today?",
    // A member who hasn't been laid off yet has no first week to protect —
    // the stage reads as preparation for them (plan 186).
    nameBySituation: { employed_at_risk: "Get ahead of it" },
    subBySituation: { employed_at_risk: "Protect yourself before anything lands" },
  },
  {
    id: "steady-yourself",
    name: "Steady yourself",
    sub: "Protect the money before the clocks run out",
    question: "Where am I, honestly?",
  },
  {
    id: "choose-your-path",
    name: "Choose your path",
    sub: "Same role, new field, or funded school?",
    question: "Which direction is mine?",
  },
  {
    id: "get-ready",
    name: "Get ready",
    sub: "Resume, brand, story",
    question: "Am I presentable?",
  },
  {
    id: "run-the-search",
    name: "Run the search",
    sub: "Your first job packet is waiting — free",
    question: "Where and how do I apply?",
  },
  {
    id: "close-it",
    name: "Close it",
    sub: "Interviews & the offer",
    question: "How do I convert?",
  },
  {
    id: "land-and-give-back",
    name: "Land & give back",
    sub: "Mark the win, pass it on",
    question: "How do I make this count?",
  },
];

export const JOURNEY_STAGES: JourneyStageMeta[] = STAGE_SEQUENCE.map((stage, i) => ({
  ...stage,
  number: i + 1,
}));

export const JOURNEY_STAGES_BY_ID: Record<JourneyStageId, JourneyStageMeta> =
  JOURNEY_STAGES.reduce(
    (acc, stage) => {
      acc[stage.id] = stage;
      return acc;
    },
    {} as Record<JourneyStageId, JourneyStageMeta>,
  );

/**
 * Display-name resolution for render sites that know the member's situation
 * (plan 186). Sites without a situation in scope keep the default name.
 */
export function stageDisplayName(
  meta: Pick<JourneyStageMeta, "name" | "nameBySituation">,
  situation: JourneySituation,
): string {
  return meta.nameBySituation?.[situation] ?? meta.name;
}

/** Same resolution for the quiet sub-line under the stage name. */
export function stageDisplaySub(
  meta: Pick<JourneyStageMeta, "sub" | "subBySituation">,
  situation: JourneySituation,
): string {
  return meta.subBySituation?.[situation] ?? meta.sub;
}

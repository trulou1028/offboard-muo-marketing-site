"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check, FileText, MessagesSquare, Scale } from "lucide-react";
import { animateContextExample, usePrefersReducedMotion } from "./MarketingMotion";

type FactKey = "experience" | "accomplishment" | "interview" | "preference" | "goal";
type ScenarioId = "resume" | "interview" | "compare";

export const CAREER_CONTEXT_FACTS: ReadonlyArray<{ key: FactKey; label: string; value: string }> = [
  { key: "experience", label: "Experience", value: "Led customer onboarding and coordinated support handoffs." },
  { key: "accomplishment", label: "Accomplishment", value: "Reduced average onboarding time from 14 to 10 days." },
  { key: "interview", label: "Interview story", value: "Resolved a stalled rollout through cross-team coordination." },
  { key: "preference", label: "Preference", value: "Remote work with predictable collaboration hours." },
  { key: "goal", label: "Goal", value: "Move into customer success work with more ownership of adoption." },
] as const;

export const CAREER_CONTEXT_SCENARIOS: ReadonlyArray<{
  id: ScenarioId;
  label: string;
  sourceKeys: ReadonlyArray<FactKey>;
}> = [
  { id: "resume", label: "Tailored resume", sourceKeys: ["experience", "accomplishment"] },
  { id: "interview", label: "Interview preparation", sourceKeys: ["interview", "experience"] },
  { id: "compare", label: "Compare an opportunity", sourceKeys: ["preference", "goal"] },
] as const;

const SCENARIO_ICONS = {
  resume: FileText,
  interview: MessagesSquare,
  compare: Scale,
} as const;

function subscribeToHydration() {
  return () => undefined;
}

function useHasHydrated() {
  return useSyncExternalStore(subscribeToHydration, () => true, () => false);
}

function SourceFact({
  fact,
  isRelevant,
}: {
  fact: (typeof CAREER_CONTEXT_FACTS)[number];
  isRelevant: boolean;
}) {
  return (
    <li className={isRelevant ? "is-relevant" : undefined}>
      <div>
        <span>{fact.label}</span>
        {isRelevant ? <em><Check aria-hidden="true" /> Used here</em> : null}
      </div>
      <p>{fact.value}</p>
    </li>
  );
}

function ScenarioOutput({ scenarioId }: { scenarioId: ScenarioId }) {
  if (scenarioId === "interview") {
    return (
      <>
        <span className="mh-context-output-label">Practice question</span>
        <h3>Tell me about a time you got a stalled customer rollout moving again.</h3>
        <div className="mh-context-output-detail">
          <strong>Answer outline</strong>
          <ul>
            <li><span>Situation</span>A customer rollout had stalled.</li>
            <li><span>Action</span>Coordinated the teams responsible for the handoff.</li>
            <li><span>Result</span>Resolved the rollout and restored a clear path forward.</li>
          </ul>
        </div>
        <p className="mh-context-output-note">Uses the interview story and experience already saved in the record.</p>
      </>
    );
  }

  if (scenarioId === "compare") {
    return (
      <>
        <span className="mh-context-output-label">Fictional role requirement</span>
        <h3>Own customer adoption after onboarding, with three fixed office days each week.</h3>
        <div className="mh-context-comparison">
          <div><span>Alignment</span><p>The ownership of adoption matches Alex&apos;s goal for the next role.</p></div>
          <div><span>Question to resolve</span><p>The role is hybrid. Alex prefers remote work with predictable collaboration hours, so the schedule needs clarification.</p></div>
        </div>
        <p className="mh-context-output-note">Uses the preference and goal to make the tradeoff visible, without deciding for Alex.</p>
      </>
    );
  }

  return (
    <>
      <span className="mh-context-output-label">Illustrative resume bullet</span>
      <h3>Led customer onboarding and coordinated support handoffs, reducing average onboarding time from 14 to 10 days.</h3>
      <p className="mh-context-output-note">Uses the experience and accomplishment. No new result was added.</p>
    </>
  );
}

export function CareerContextExample() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("resume");
  const hasHydrated = useHasHydrated();
  const prefersReducedMotion = usePrefersReducedMotion();
  const outputRef = useRef<HTMLDivElement>(null);
  const previousScenarioRef = useRef<ScenarioId>(scenarioId);
  const scenario = CAREER_CONTEXT_SCENARIOS.find((item) => item.id === scenarioId)!;
  const relevantFacts = CAREER_CONTEXT_FACTS.filter((fact) => scenario.sourceKeys.includes(fact.key));

  useEffect(() => {
    if (previousScenarioRef.current === scenarioId) return;
    previousScenarioRef.current = scenarioId;
    if (prefersReducedMotion || !outputRef.current) return;
    const animation = animateContextExample(outputRef.current);
    return () => animation.stop();
  }, [prefersReducedMotion, scenarioId]);

  return (
    <div className="mh-context-example" data-scenario={scenarioId}>
      <p className="mh-context-example-disclosure">Fictional example. Explore how the same context can inform different tasks.</p>

      {hasHydrated ? (
        <div className="mh-context-example-selectors" role="group" aria-label="Choose an example task">
          {CAREER_CONTEXT_SCENARIOS.map((item) => {
            const Icon = SCENARIO_ICONS[item.id];
            const isSelected = item.id === scenarioId;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isSelected}
                aria-controls="career-context-example-output"
                onClick={() => setScenarioId(item.id)}
              >
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mh-context-example-selectors is-static" aria-label="Example tasks">
          {CAREER_CONTEXT_SCENARIOS.map((item) => {
            const Icon = SCENARIO_ICONS[item.id];
            return <span key={item.id}><Icon aria-hidden="true" />{item.label}</span>;
          })}
        </div>
      )}

      <div className="mh-context-example-layout">
        <section className="mh-context-source" aria-labelledby="career-context-source-title">
          <div className="mh-context-example-card-heading">
            <div>
              <span>Fictional source record</span>
              <h3 id="career-context-source-title">Alex Morgan&apos;s Career Context</h3>
            </div>
            <span>5 saved details</span>
          </div>
          <ul className="mh-context-source-facts is-desktop">
            {CAREER_CONTEXT_FACTS.map((fact) => <SourceFact key={fact.key} fact={fact} isRelevant={scenario.sourceKeys.includes(fact.key)} />)}
          </ul>
          <div className="mh-context-source-mobile">
            <span>Used for this example</span>
            <ul>{relevantFacts.map((fact) => <SourceFact key={fact.key} fact={fact} isRelevant />)}</ul>
            <details>
              <summary>View the full fictional record</summary>
              <ul>{CAREER_CONTEXT_FACTS.map((fact) => <SourceFact key={fact.key} fact={fact} isRelevant={scenario.sourceKeys.includes(fact.key)} />)}</ul>
            </details>
          </div>
        </section>

        <section
          ref={outputRef}
          id="career-context-example-output"
          className="mh-context-output"
          role="region"
          aria-labelledby="career-context-output-title"
        >
          <div className="mh-context-example-card-heading">
            <div>
              <span>Resulting task</span>
              <h3 id="career-context-output-title">{scenario.label}</h3>
            </div>
            <span><Check aria-hidden="true" /> Grounded in context</span>
          </div>
          <div className="mh-context-output-body"><ScenarioOutput scenarioId={scenarioId} /></div>
        </section>
      </div>
    </div>
  );
}

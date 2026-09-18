"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check, CircleAlert, Pause, Play, RotateCcw, Rows3 } from "lucide-react";
import {
  PACKET_DEMO_STEPS,
  PACKET_EXAMPLE,
  PACKET_STEP_CHIP,
  type PacketDemoStep,
  type PacketStepId,
} from "./ApplicationPacketDemoData";
import { animatePacketOutput, usePrefersReducedMotion } from "./MarketingMotion";

const STEP_DWELL_MS = 2400;
const PACKET_OUTPUT_ID = "packet-example-output";

function subscribeToHydration() {
  return () => undefined;
}

function useHasHydrated() {
  return useSyncExternalStore(subscribeToHydration, () => true, () => false);
}

function OutputHeader({ step }: { step: PacketDemoStep }) {
  return (
    <div className="mh-packet-output-head">
      <div>
        <span className="mh-packet-output-kicker">Example output</span>
        <h3>{step.label}</h3>
      </div>
      <em className={`mh-state-chip${step.tier === "pro" ? " is-pro" : ""}`}>
        {PACKET_STEP_CHIP[step.tier]}
      </em>
    </div>
  );
}

function StepOutput({ step }: { step: PacketDemoStep }) {
  if (step.id === "ghost") {
    return (
      <>
        <OutputHeader step={step} />
        <div className="mh-packet-signal">
          <CircleAlert aria-hidden="true" />
          <div>
            <strong>Review carefully</strong>
            <p>This example shows signals to consider, not a guarantee that a role is active.</p>
          </div>
        </div>
        <dl className="mh-packet-facts">
          <div><dt>Posting signal</dt><dd>Specific team and onboarding responsibilities are named.</dd></div>
          <div><dt>Missing signal</dt><dd>No closing date appears in the example listing.</dd></div>
          <div><dt>Source status</dt><dd>Illustrative listing details only.</dd></div>
        </dl>
      </>
    );
  }

  if (step.id === "company") {
    return (
      <>
        <OutputHeader step={step} />
        <div className="mh-packet-prose">
          <strong>Example Co. at a glance</strong>
          <p>A fictional scheduling software company serving local service businesses.</p>
        </div>
        <dl className="mh-packet-facts">
          <div><dt>Role context</dt><dd>The customer team owns onboarding and ongoing account support.</dd></div>
          <div><dt>What to explore</dt><dd>How Success and Support divide onboarding ownership.</dd></div>
        </dl>
      </>
    );
  }

  if (step.id === "match") {
    return (
      <>
        <OutputHeader step={step} />
        <dl className="mh-packet-facts is-evidence">
          <div><dt>Role requirement</dt><dd>Lead onboarding for new accounts.</dd></div>
          <div><dt>Experience evidence</dt><dd>{PACKET_EXAMPLE.sourceExperience}</dd></div>
          <div><dt>Gap to address</dt><dd>No direct ownership of renewal forecasting is recorded.</dd></div>
        </dl>
      </>
    );
  }

  if (step.id === "resume") {
    return (
      <>
        <OutputHeader step={step} />
        <div className="mh-packet-revision">
          <div><span>Before</span><p>Helped improve onboarding and supported customer accounts.</p></div>
          <div className="is-after"><span>Grounded revision</span><p>{PACKET_EXAMPLE.sourceExperience}</p></div>
        </div>
        <small>Every detail in the revision comes from Alex&apos;s example source record.</small>
      </>
    );
  }

  if (step.id === "letter") {
    return (
      <>
        <OutputHeader step={step} />
        <div className="mh-packet-letter">
          <span>Example excerpt</span>
          <p>At Northstar Support, I built an onboarding playbook adopted by a 12-person team and reduced handoff time by 20%. I would bring that same operational focus to customer onboarding at Example Co.</p>
        </div>
        <small>Alex reviews and edits the letter before using it.</small>
      </>
    );
  }

  return (
    <>
      <OutputHeader step={step} />
      <div className="mh-packet-person">
        <span>Relevant path</span>
        <strong>Customer Success Operations leader</strong>
        <p>Ask how onboarding ownership is divided between Success and Support.</p>
      </div>
      <small>No real person or contact details appear in this example.</small>
    </>
  );
}

function CompletePacket() {
  return (
    <>
      <div className="mh-packet-output-head">
        <div>
          <span className="mh-packet-output-kicker">Complete example</span>
          <h3>One role, six connected outputs.</h3>
        </div>
        <span className="mh-packet-complete-mark"><Check aria-hidden="true" /> Ready to review</span>
      </div>
      <ul className="mh-packet-summary">
        {PACKET_DEMO_STEPS.map((step) => (
          <li key={step.id}>
            <div><strong>{step.label}</strong><span>{step.summary}</span></div>
            <em className={`mh-state-chip${step.tier === "pro" ? " is-pro" : ""}`}>
              {PACKET_STEP_CHIP[step.tier]}
            </em>
          </li>
        ))}
      </ul>
      <p className="mh-packet-review-note">Alex reviews and sends every application material.</p>
    </>
  );
}

export function ApplicationPacketDemo() {
  const hydrated = useHasHydrated();
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedId, setSelectedId] = useState<PacketStepId | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const selectedIndex = selectedId
    ? PACKET_DEMO_STEPS.findIndex((step) => step.id === selectedId)
    : -1;
  const selectedStep = selectedIndex >= 0 ? PACKET_DEMO_STEPS[selectedIndex] : null;

  const clearPlaybackTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopPlayback = useCallback(() => {
    clearPlaybackTimer();
    setPlaying(false);
  }, [clearPlaybackTimer]);

  const showStep = (step: PacketDemoStep) => {
    stopPlayback();
    setSelectedId(step.id);
    setAnnouncement(`Showing ${step.label} example.`);
  };

  const showComplete = useCallback((announce = true) => {
    stopPlayback();
    setSelectedId(null);
    if (announce) setAnnouncement("Complete packet shown.");
  }, [stopPlayback]);

  const startPlayback = () => {
    if (reducedMotion) {
      showComplete();
      return;
    }
    clearPlaybackTimer();
    setHasPlayed(true);
    setSelectedId(PACKET_DEMO_STEPS[0].id);
    setPlaying(true);
    setAnnouncement("Example walkthrough started.");
  };

  const pausePlayback = () => {
    stopPlayback();
    setAnnouncement("Example walkthrough paused.");
  };

  useEffect(() => {
    if (!playing || selectedIndex < 0) return;
    timerRef.current = setTimeout(() => {
      if (selectedIndex === PACKET_DEMO_STEPS.length - 1) {
        setSelectedId(null);
        setPlaying(false);
        timerRef.current = null;
        return;
      }
      setSelectedId(PACKET_DEMO_STEPS[selectedIndex + 1].id);
    }, STEP_DWELL_MS);
    return clearPlaybackTimer;
  }, [clearPlaybackTimer, playing, selectedIndex]);

  useEffect(() => {
    if (!playing) return;
    const onVisibilityChange = () => {
      if (document.hidden) stopPlayback();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [playing, stopPlayback]);

  useEffect(() => {
    if (!playing || typeof IntersectionObserver !== "function" || !rootRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) stopPlayback();
    }, { threshold: 0.15 });
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [playing, stopPlayback]);

  useEffect(() => {
    if (!playing || typeof window.matchMedia !== "function") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) stopPlayback();
    };
    mediaQuery.addEventListener("change", onMotionPreferenceChange);
    return () => mediaQuery.removeEventListener("change", onMotionPreferenceChange);
  }, [playing, stopPlayback]);

  useEffect(() => {
    if (!outputRef.current || reducedMotion || typeof outputRef.current.animate !== "function") return;
    const controls = animatePacketOutput(outputRef.current);
    return () => controls.cancel();
  }, [reducedMotion, selectedId]);

  useEffect(() => clearPlaybackTimer, [clearPlaybackTimer]);

  return (
    <div className="mh-packet-demo" ref={rootRef}>
      <div className="mh-packet-demo-stage">
        <aside className="mh-packet-example-role" aria-label="Illustrative candidate and role">
          <span className="mh-packet-example-label">Illustrative example</span>
          <div className="mh-packet-persona">
            <span aria-hidden="true">AM</span>
            <div><strong>{PACKET_EXAMPLE.candidate}</strong><p>{PACKET_EXAMPLE.candidateRole}</p></div>
          </div>
          <dl>
            <div><dt>Role</dt><dd>{PACKET_EXAMPLE.role}</dd></div>
            <div><dt>Company</dt><dd>{PACKET_EXAMPLE.company}</dd></div>
          </dl>
          <p>{PACKET_EXAMPLE.roleSummary}</p>
          <div className="mh-packet-source-record">
            <span>Example source record</span>
            <p>{PACKET_EXAMPLE.sourceExperience}</p>
          </div>
          <small>Illustrative example. No live job is being checked.</small>
        </aside>

        <div
          className="mh-packet-output"
          id={PACKET_OUTPUT_ID}
          ref={outputRef}
          aria-label={selectedStep ? `${selectedStep.label} example output` : "Complete packet example"}
        >
          {selectedStep ? <StepOutput step={selectedStep} /> : <CompletePacket />}
        </div>
      </div>

      <div className="mh-packet-demo-controls" aria-label="Application Packet example controls">
        <ol className="mh-packet-steps">
          {PACKET_DEMO_STEPS.map((step) => (
            <li key={step.id} className={selectedId === step.id ? "is-selected" : undefined}>
              {hydrated ? (
                <button
                  type="button"
                  aria-pressed={selectedId === step.id}
                  aria-controls={PACKET_OUTPUT_ID}
                  onClick={() => showStep(step)}
                >
                  <strong>{step.label}</strong>
                  <p>{step.description}</p>
                </button>
              ) : (
                <div>
                  <strong>{step.label}</strong>
                  <p>{step.description}</p>
                </div>
              )}
              <em className={`mh-state-chip${step.tier === "pro" ? " is-pro" : ""}`}>
                {PACKET_STEP_CHIP[step.tier]}
              </em>
            </li>
          ))}
        </ol>

        {hydrated ? (
          <div className="mh-packet-playback">
            {reducedMotion ? (
              <p>Motion reduced. Choose any step or show the complete packet.</p>
            ) : (
              <button type="button" className="mh-packet-play-button" onClick={playing ? pausePlayback : startPlayback}>
                {playing ? <Pause aria-hidden="true" /> : hasPlayed && selectedId === null ? <RotateCcw aria-hidden="true" /> : <Play aria-hidden="true" />}
                {playing ? "Pause" : hasPlayed && selectedId === null ? "Replay example" : "Play example"}
              </button>
            )}
            {selectedId !== null ? (
              <button type="button" className="mh-packet-complete-button" onClick={() => showComplete()}>
                <Rows3 aria-hidden="true" /> Show complete packet
              </button>
            ) : null}
          </div>
        ) : (
          <div className="mh-packet-playback mh-packet-playback-placeholder" aria-hidden="true" />
        )}
      </div>

      <p className="mh-visually-hidden" aria-live="polite">{announcement}</p>
    </div>
  );
}

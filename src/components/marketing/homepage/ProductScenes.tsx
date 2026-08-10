"use client";

import {
  useState,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
} from "react";
import {
  Briefcase,
  Calculator,
  Check,
  ChevronRight,
  Clock3,
  FileStack,
  FileText,
  GraduationCap,
  LockKeyhole,
  MessagesSquare,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { JOURNEY_STAGES, type JourneyStageId } from "@/journey/stages";
import {
  MARKETING_STAGE_FIXTURES,
  MAYA,
  PACKET_OUTPUTS,
} from "./fixtures";

function handleTabKey<T extends string>(
  event: KeyboardEvent<HTMLButtonElement>,
  values: readonly T[],
  activeValue: T,
  setActiveValue: Dispatch<SetStateAction<T>>,
  idPrefix: string,
) {
  if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;

  event.preventDefault();
  const currentIndex = values.indexOf(activeValue);
  const nextIndex = event.key === "Home"
    ? 0
    : event.key === "End"
      ? values.length - 1
      : event.key === "ArrowRight"
        ? (currentIndex + 1) % values.length
        : (currentIndex - 1 + values.length) % values.length;
  const nextValue = values[nextIndex];
  setActiveValue(nextValue);
  window.requestAnimationFrame(() => document.getElementById(`${idPrefix}${nextValue}`)?.focus());
}

export function BenefitsScene() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mh-scene mh-scene-benefits" aria-label="Illustrative California benefits summary">
      <div className="mh-card mh-benefits-card">
        <div className="mh-card-head">
          <span className="mh-overline">Benefits</span>
          <span className="mh-illustrative-chip">Illustrative</span>
        </div>
        <h3>What you may be entitled to</h3>
        <p className="mh-card-context">{MAYA.state} · Role ended {MAYA.endedOn} · Sources checked Aug 4</p>
        <div className="mh-benefit-rows">
          <article>
            <div className="mh-row-icon"><GraduationCap aria-hidden="true" /></div>
            <div>
              <span>Possible match</span>
              <strong>California Training Benefits</strong>
              <small>Approved training may change work-search requirements.</small>
            </div>
            <b>Review</b>
          </article>
          <article>
            <div className="mh-row-icon"><Clock3 aria-hidden="true" /></div>
            <div>
              <span>Time-sensitive</span>
              <strong>Training extension</strong>
              <small>Contact EDD before week 16 to keep the option open.</small>
            </div>
            <b>11 weeks</b>
          </article>
        </div>
        <button
          className="mh-fine-print-toggle"
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          What “possible match” means <ChevronRight aria-hidden="true" />
        </button>
        {expanded && (
          <p className="mh-fine-print" role="status">
            Offboard matches verified program rules to the details in this sample. The agency decides eligibility and funding.
          </p>
        )}
      </div>

      <div className="mh-card mh-card-accent mh-claim-card">
        <span className="mh-overline">Act now</span>
        <h4>File your claim first.</h4>
        <div className="mh-ready-list">
          <span><Check aria-hidden="true" /> Last day confirmed</span>
          <span><Check aria-hidden="true" /> Employer details saved</span>
        </div>
        <div className="mh-source-stamp">
          <ShieldCheck aria-hidden="true" />
          <span><small>Official source</small><b>California EDD</b><em>Reviewed Aug 4, 2026</em></span>
        </div>
      </div>
    </div>
  );
}

export function InteractivePathScene() {
  const [activeId, setActiveId] = useState<JourneyStageId>("land-the-blow");
  const stageIds = JOURNEY_STAGES.map((item) => item.id);
  const stage = JOURNEY_STAGES.find((item) => item.id === activeId) ?? JOURNEY_STAGES[0];
  const stageName = stage.name;
  const fixture = MARKETING_STAGE_FIXTURES[activeId];

  return (
    <div className="mh-scene mh-scene-path" aria-label="Interactive seven-stage Offboard path">
      <div className="mh-card mh-path-card">
        <div className="mh-card-head">
          <span className="mh-overline">Your path</span>
          <small className="mh-stage-count">Stage {stage.number} of 7</small>
        </div>
        <div className="mh-stage-tabs" role="tablist" aria-label="Choose a stage to preview">
          {JOURNEY_STAGES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`marketing-stage-tab-${item.id}`}
              aria-controls="marketing-stage-panel"
              aria-label={`${item.name}, stage ${item.number}`}
              aria-selected={item.id === activeId}
              className={item.id === activeId ? "is-active" : undefined}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => handleTabKey(event, stageIds, activeId, setActiveId, "marketing-stage-tab-")}
              tabIndex={item.id === activeId ? 0 : -1}
              title={item.name}
            />
          ))}
        </div>
        <div
          id="marketing-stage-panel"
          role="tabpanel"
          aria-labelledby={`marketing-stage-tab-${activeId}`}
          className="mh-stage-panel"
        >
          <span className="mh-stage-marker"><i /> {activeId === "land-the-blow" ? "You are here" : `Stage ${stage.number} preview`}</span>
          <h3>{stageName}</h3>
          <h4>{stage.question}</h4>
          <div className="mh-stage-step-list">
            {fixture.steps.map((step, index) => (
              <article key={step.title} className={step.status ? `is-${step.status}` : undefined}>
                <span>{step.status === "done" ? <Check aria-hidden="true" /> : null}</span>
                <div><strong>{step.title}</strong><small>{step.detail}</small></div>
                {index === 0 && <em>{fixture.timing}</em>}
              </article>
            ))}
          </div>
          <div className="mh-stage-source">
            <ShieldCheck aria-hidden="true" />
            <span><small>Guidance grounded in</small><strong>{fixture.source}</strong></span>
          </div>
          <p className="mh-stage-footnote">Stages open in any order. This is a suggested route, not a gate.</p>
        </div>
      </div>

      <div className="mh-card mh-lumo-card" aria-label="Illustrative page-aware LUMO guidance">
        <span className="mh-lumo-tag"><Sparkles aria-hidden="true" /> LUMO</span>
        <span className="mh-lumo-question">Can you help me with this stage?</span>
        <p>Absolutely, {MAYA.firstName}. In <strong>{stageName}</strong>, the goal is to {fixture.stakes.toLowerCase()}</p>
        <small>It knows the page you are on and your situation.</small>
      </div>
    </div>
  );
}
export function JobSearchBento() {
  return (
    <div className="mh-bento" aria-label="What Offboard gives you for the job search">
      <article className="mh-card mh-bento-card mh-bento-lg">
        <div className="mh-bento-art mh-bento-art-packet" aria-hidden="true">
          {PACKET_OUTPUTS.map((output, index) => (
            <span key={output.id} className={index < 3 ? "is-done" : undefined}>
              {index < 3 ? <Check aria-hidden="true" /> : <i />}
              {output.label}
            </span>
          ))}
        </div>
        <div className="mh-bento-copy">
          <span className="mh-bento-icon" aria-hidden="true"><FileStack /></span>
          <h3>One link becomes an application</h3>
          <p>
            Paste a job link and get the posting, a ghost check, company research, your role
            match, a tailored resume, a cover letter, and a route to a real person. Your first
            packet is free.
          </p>
        </div>
      </article>

      <article className="mh-card mh-bento-card mh-bento-lg">
        <div className="mh-bento-art mh-bento-art-interview" aria-hidden="true">
          <span>Tell me about a launch you owned.</span>
          <span>How do you decide what to cut?</span>
          <span className="is-muted">Where are you weakest here?</span>
          <div className="mh-bento-wave">
            {Array.from({ length: 18 }, (_, index) => <i key={index} />)}
          </div>
        </div>
        <div className="mh-bento-copy">
          <span className="mh-bento-icon" aria-hidden="true"><MessagesSquare /></span>
          <h3>Walk in with the questions already answered</h3>
          <p>
            A briefing with likely questions and your strongest evidence, out-loud practice
            with feedback, and a debrief that drafts the thank-you and follow-up.
          </p>
        </div>
      </article>

      <article className="mh-card mh-bento-card">
        <div className="mh-bento-art mh-bento-art-ghost" aria-hidden="true">
          <strong>83</strong>
          <small>Likely a real, active role</small>
          <div className="mh-bento-bars"><i /><i /><i className="is-low" /><i /></div>
        </div>
        <div className="mh-bento-copy">
          <span className="mh-bento-icon" aria-hidden="true"><ShieldCheck /></span>
          <h3>Know if the job is even real</h3>
          <p>
            Check stale listings, broken apply flows, duplicate job IDs, and other warning
            signs before you spend an hour tailoring.
          </p>
        </div>
      </article>

      <article className="mh-card mh-bento-card">
        <div className="mh-bento-art mh-bento-art-resume" aria-hidden="true">
          <b />
          <i /><i /><i className="is-tailored" /><i className="is-short" />
        </div>
        <div className="mh-bento-copy">
          <span className="mh-bento-icon" aria-hidden="true"><FileText /></span>
          <h3>One master resume, tailored per role</h3>
          <p>
            Upload what you have, edit it in one place, and generate role-specific versions
            without touching your original.
          </p>
        </div>
      </article>

      <article className="mh-card mh-bento-card">
        <div className="mh-bento-art mh-bento-art-pipeline" aria-hidden="true">
          {["Saved", "Applied", "Interview"].map((column, columnIndex) => (
            <div key={column}>
              <small>{column}</small>
              {Array.from({ length: 3 - columnIndex }, (_, index) => <i key={index} />)}
            </div>
          ))}
        </div>
        <div className="mh-bento-copy">
          <span className="mh-bento-icon" aria-hidden="true"><Briefcase /></span>
          <h3>Every role in one place</h3>
          <p>
            Track each opportunity from first save through interview, with checks, materials,
            and follow-ups attached to the same role.
          </p>
        </div>
      </article>

      <article className="mh-card mh-bento-card">
        <div className="mh-bento-art mh-bento-art-paperwork" aria-hidden="true">
          <i /><i />
          <i className="is-flagged"><mark>Non-compete clause</mark></i>
          <i className="is-short" />
        </div>
        <div className="mh-bento-copy">
          <span className="mh-bento-icon" aria-hidden="true"><Scale /></span>
          <h3>Paperwork review</h3>
          <p>
            Understand your severance and offer paperwork before you sign, clause by clause.
          </p>
        </div>
      </article>

      <article className="mh-card mh-bento-card">
        <div className="mh-bento-art mh-bento-art-runway" aria-hidden="true">
          <strong>5.5 months</strong>
          <small>of runway at your current spend</small>
          <div className="mh-bento-months">
            {Array.from({ length: 8 }, (_, index) => <i key={index} className={index < 5 ? "is-covered" : undefined} />)}
          </div>
        </div>
        <div className="mh-bento-copy">
          <span className="mh-bento-icon" aria-hidden="true"><Calculator /></span>
          <h3>Runway calculator</h3>
          <p>
            See how long your money lasts and what each decision changes.
          </p>
        </div>
      </article>

      <article className="mh-card mh-bento-card">
        <div className="mh-bento-art mh-bento-art-training" aria-hidden="true">
          <span><GraduationCap aria-hidden="true" /> Data analytics certificate</span>
          <span><GraduationCap aria-hidden="true" /> Project management</span>
          <span className="is-muted"><GraduationCap aria-hidden="true" /> Cloud fundamentals</span>
        </div>
        <div className="mh-bento-copy">
          <span className="mh-bento-icon" aria-hidden="true"><GraduationCap /></span>
          <h3>Funded training explorer</h3>
          <p>
            Search 27,000+ state-approved program records. Training may be paid for while
            your benefits continue; the agency decides.
          </p>
        </div>
      </article>

      <article className="mh-card mh-bento-card mh-bento-wide">
        <div className="mh-bento-copy">
          <span className="mh-bento-icon" aria-hidden="true"><Sparkles /></span>
          <h3>Ask LUMO</h3>
          <p>
            Ask anything, from "what deadlines am I coming up on?" to "help me prep for
            tomorrow's interview." LUMO answers from your plan and your situation, not a
            blank chat.
          </p>
        </div>
        <div className="mh-bento-art mh-bento-art-lumo" aria-hidden="true">
          <span>What deadlines am I coming up on?</span>
          <span>Walk me through this severance agreement.</span>
          <span>Help me prepare for tomorrow's interview.</span>
        </div>
      </article>
    </div>
  );
}

export function TrustScene() {
  return (
    <div className="mh-scene mh-scene-trust" aria-label="What stays private and who can see it">
      <div className="mh-privacy-grid">
        <article className="mh-card mh-privacy-card">
          <span className="mh-privacy-label">What you share</span>
          <ul>
            <li><Check aria-hidden="true" /> Severance terms</li>
            <li><Check aria-hidden="true" /> Health and coverage details</li>
            <li><Check aria-hidden="true" /> Savings and monthly costs</li>
            <li><Check aria-hidden="true" /> Documents and applications</li>
            <li><Check aria-hidden="true" /> Every LUMO conversation</li>
          </ul>
        </article>

        <article className="mh-card mh-card-accent mh-privacy-card mh-privacy-answer">
          <span className="mh-privacy-label">Who can see it</span>
          <strong>Only you.</strong>
          <p>Offboard never sells member data and never shares it with your former employer.</p>
          <span className="mh-privacy-seal"><LockKeyhole aria-hidden="true" /> Private by default</span>
        </article>

        <article className="mh-card mh-privacy-card">
          <span className="mh-privacy-label">What a sponsor sees</span>
          <span className="mh-sponsor-dots" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
          </span>
          <span className="mh-sponsor-count"><Users aria-hidden="true" /> <strong>48 people</strong> activated their plans</span>
          <small>No names, documents, conversations, or individual behaviour. If your employer paid for Offboard, that number is all they get.</small>
        </article>
      </div>
    </div>
  );
}

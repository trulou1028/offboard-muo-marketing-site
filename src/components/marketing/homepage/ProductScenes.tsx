"use client";

import {
  useState,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
} from "react";
import { ChevronRight, Sparkles } from "lucide-react";

import { JOURNEY_STAGES, type JourneyStageId } from "@/journey/stages";
import { MARKETING_STAGE_FIXTURES } from "./fixtures";

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
    <div className="mh-scene mh-generated-scene" aria-label="Illustrative California benefits summary">
      <img
        className="mh-generated-scene-image"
        src="/marketing/homepage/renders/benefits-stack.webp"
        alt="Benefits illustration showing California Training Benefits, a time-sensitive training extension, and an official California EDD source beside the next action."
        width="1536"
        height="1024"
        loading="lazy"
      />
      <button
        className="mh-generated-disclosure"
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        What “possible match” means <ChevronRight aria-hidden="true" />
      </button>
      {expanded && (
        <p className="mh-generated-note" role="status">
          Offboard matches verified program rules to the details in this sample. The agency decides eligibility and funding.
        </p>
      )}
    </div>
  );
}

export function InteractivePathScene() {
  const [activeId, setActiveId] = useState<JourneyStageId>("land-the-blow");
  const stageIds = JOURNEY_STAGES.map((item) => item.id);
  const stage = JOURNEY_STAGES.find((item) => item.id === activeId) ?? JOURNEY_STAGES[0];
  const fixture = MARKETING_STAGE_FIXTURES[activeId];

  return (
    <div className="mh-scene mh-generated-scene mh-generated-path" aria-label="Interactive seven-stage Offboard path">
      <img
        className="mh-generated-scene-image"
        src="/marketing/homepage/renders/path-stage.webp"
        alt="Seven-stage Offboard path illustration with Protect the first week highlighted and its first three tasks connected to LUMO."
        width="1536"
        height="1024"
        loading="lazy"
      />
      <div className="mh-generated-stage-control">
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
          className="mh-generated-stage-panel"
        >
          <span>{activeId === "land-the-blow" ? "You are here" : `Stage ${stage.number} preview`}</span>
          <h3>{stage.question}</h3>
          <p>{fixture.stakes}</p>
          <div className="mh-generated-stage-steps">
            {fixture.steps.map((step) => <strong key={step.title}>{step.title}</strong>)}
          </div>
          <small>This is a suggested route, not a gate. Guidance grounded in {fixture.source}. Stages stay open in any order.</small>
        </div>
      </div>
    </div>
  );
}

type ToolkitCategory = "packets" | "resumes" | "applications" | "interviews";

type ToolkitScene = {
  id: ToolkitCategory;
  number: string;
  label: string;
  kicker: string;
  title: string;
  body: string;
  cta: string;
  sheetTitle: string;
  actionTitle: string;
  lumo: string;
  imageSrc: string;
  imageAlt: string;
};

const TOOLKIT_SCENES: readonly ToolkitScene[] = [
  {
    id: "packets",
    number: "01",
    label: "Job Packets",
    kicker: "Packet ready",
    title: "Senior Product Designer · Northstar",
    body: "Design products that help small teams do their best work, from first idea to launch and beyond.",
    cta: "Build my first Job Packet",
    sheetTitle: "Your Job Packet",
    actionTitle: "Open your tailored resume",
    lumo: "Strong match. Highlight your end-to-end product design experience and user research impact.",
    imageSrc: "/marketing/homepage/renders/toolkit-job-packets.webp",
    imageAlt: "Your Job Packet for Senior Product Designer at Northstar, shown as three connected layers: Understand the role, Build your materials, and Find your way in, with a tailored resume ready to review.",
  },
  {
    id: "resumes",
    number: "02",
    label: "Resumes",
    kicker: "Version ready",
    title: "Your experience, shaped for Northstar.",
    body: "Keep one master resume and create a focused version without rewriting from scratch.",
    cta: "Create my resume",
    sheetTitle: "Senior Product Designer",
    actionTitle: "Review the Northstar version",
    lumo: "Your strongest evidence is the system work that improved adoption and reduced handoff time.",
    imageSrc: "/marketing/homepage/renders/toolkit-resumes.webp",
    imageAlt: "Resume Studio illustration showing a master Senior Product Designer resume producing a Northstar tailored version that is ready to review.",
  },
  {
    id: "applications",
    number: "03",
    label: "Applications",
    kicker: "Application saved",
    title: "Keep every next move attached to the role.",
    body: "The posting, materials, contacts, and follow-ups stay together as the application moves.",
    cta: "Track my applications",
    sheetTitle: "Senior Product Designer",
    actionTitle: "Prepare for the interview",
    lumo: "Your materials are attached. Next, prepare examples about prioritization and cross-functional work.",
    imageSrc: "/marketing/homepage/renders/toolkit-applications.webp",
    imageAlt: "Northstar application folder showing applied and materials attached, with interview next and a prompt to prepare for the interview.",
  },
  {
    id: "interviews",
    number: "04",
    label: "Interviews",
    kicker: "Prep ready",
    title: "Walk in already knowing what to practice.",
    body: "Use the role, company, and your experience to prepare, rehearse, and follow up.",
    cta: "Prepare for an interview",
    sheetTitle: "Northstar interview",
    actionTitle: "Start interview practice",
    lumo: "Lead with the launch you owned and be ready to explain what you cut, why, and what changed.",
    imageSrc: "/marketing/homepage/renders/toolkit-interviews.webp",
    imageAlt: "Northstar interview preparation folio with likely questions, selected evidence, and a role-specific practice session ready to start.",
  },
];

const TOOLKIT_CATEGORY_IDS = TOOLKIT_SCENES.map((scene) => scene.id);

export function ToolkitShowcase({ signUpUrl }: { signUpUrl: string }) {
  const [activeId, setActiveId] = useState<ToolkitCategory>("packets");
  const activeScene = TOOLKIT_SCENES.find((scene) => scene.id === activeId) ?? TOOLKIT_SCENES[0];

  return (
    <div className="mh-toolkit" aria-label="Connected job-search toolkit">
      <div className="mh-toolkit-tabs" role="tablist" aria-label="Choose a toolkit category">
        {TOOLKIT_SCENES.map((scene) => (
          <button
            key={scene.id}
            type="button"
            role="tab"
            id={`marketing-toolkit-tab-${scene.id}`}
            aria-controls={`marketing-toolkit-panel-${scene.id}`}
            aria-selected={scene.id === activeId}
            className={scene.id === activeId ? "is-active" : undefined}
            onClick={() => setActiveId(scene.id)}
            onKeyDown={(event) => handleTabKey(
              event,
              TOOLKIT_CATEGORY_IDS,
              activeId,
              setActiveId,
              "marketing-toolkit-tab-",
            )}
            tabIndex={scene.id === activeId ? 0 : -1}
            aria-label={scene.label}
          >
            <span aria-hidden="true">{scene.number}</span>
            {scene.label}
          </button>
        ))}
      </div>

      <div
        id={`marketing-toolkit-panel-${activeScene.id}`}
        role="tabpanel"
        aria-labelledby={`marketing-toolkit-tab-${activeScene.id}`}
        className="mh-toolkit-theatre"
      >
        <div key={activeScene.id} className="mh-toolkit-stage-content">
          <div className="mh-toolkit-copy">
            <span>{activeScene.kicker}</span>
            <h3>{activeScene.title}</h3>
            <p>{activeScene.body}</p>
            <a className="mh-primary-cta" href={signUpUrl}>
              {activeScene.cta} <ChevronRight aria-hidden="true" />
            </a>
          </div>

          <figure className="mh-toolkit-visual" aria-label={`${activeScene.label} product preview`}>
            <img
              src={activeScene.imageSrc}
              alt={`${activeScene.imageAlt} ${activeScene.sheetTitle}. ${activeScene.actionTitle}.`}
              width="1536"
              height="1024"
              loading="lazy"
            />
          </figure>

          <div className="mh-toolkit-lumo" aria-label="Category-aware LUMO guidance">
            <Sparkles aria-hidden="true" />
            <strong>LUMO keeps this role in context</strong>
            <i aria-hidden="true" />
            <p>{activeScene.lumo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TrustScene() {
  return (
    <figure className="mh-scene mh-generated-scene mh-scene-trust" aria-label="What stays private and who can see it">
      <img
        className="mh-generated-scene-image"
        src="/marketing/homepage/renders/privacy-three-panel.webp"
        alt="Privacy illustration showing personal information entering a private sleeve visible only to you, while a sponsor sees anonymous activation totals only."
        width="1536"
        height="1024"
        loading="lazy"
      />
      <figcaption className="mh-generated-trust-caption">
        <strong>Only you.</strong>
        <span>Sponsors see anonymous participation totals, never names, documents, or conversations.</span>
      </figcaption>
    </figure>
  );
}

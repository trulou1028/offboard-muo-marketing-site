"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

const SCENES = [
  { id: "research", number: "01", label: "Research", kicker: "Packet ready", title: "Senior Product Designer · Northstar", body: "Design products that help small teams do their best work, from first idea to launch and beyond.", cta: "Start my first application packet", image: "/marketing/homepage/renders/toolkit-job-packets.webp", alt: "Connected job packet materials for a Senior Product Designer role" },
  { id: "fit", number: "02", label: "Fit", kicker: "Fit reviewed", title: "Know where your experience is strongest.", body: "Compare the role with your experience and see what deserves emphasis before you apply.", cta: "Review my fit", image: "/marketing/homepage/renders/path-stage.webp", alt: "A connected role-fit path for an Offboard application" },
  { id: "materials", number: "03", label: "Materials", kicker: "Version ready", title: "Shape your experience for the role.", body: "Keep one source of truth and create focused materials without starting from scratch.", cta: "Build my materials", image: "/marketing/homepage/renders/toolkit-resumes.webp", alt: "A tailored resume version connected to a role" },
  { id: "interview", number: "04", label: "Interview", kicker: "Prep ready", title: "Walk in knowing what to practice.", body: "Use the role, company, and your experience to prepare, rehearse, and follow up.", cta: "Prepare for an interview", image: "/marketing/homepage/renders/toolkit-interviews.webp", alt: "Role-specific interview preparation in Offboard" },
  { id: "next", number: "05", label: "Next step", kicker: "Next move saved", title: "Keep the follow-through attached.", body: "Materials, contacts, notes, and next actions stay with the opportunity as it moves.", cta: "Track my next step", image: "/marketing/homepage/renders/toolkit-applications.webp", alt: "An application with its materials and next actions attached" },
] as const;

type SceneId = (typeof SCENES)[number]["id"];

export function SearchShowcase({ signUpUrl }: { signUpUrl: string }) {
  const [activeId, setActiveId] = useState<SceneId>("research");
  const active = SCENES.find((scene) => scene.id === activeId) ?? SCENES[0];

  return (
    <section className="mh-search" aria-labelledby="search-title">
      <div className="mh-section mh-search-heading">
        <span className="mh-kicker is-lime">Job three</span>
        <h2 id="search-title">Run your search as one connected system.</h2>
        <p>Save a role once and let the rest of your work build around it. Research the company, check the fit, tailor your materials, prepare for interviews, and keep every next step attached to the opportunity.</p>
      </div>
      <div className="mh-search-tabs" role="tablist" aria-label="Job search stages">
        {SCENES.map((scene) => (
          <button key={scene.id} type="button" role="tab" aria-selected={scene.id === activeId} onClick={() => setActiveId(scene.id)}>
            <span>{scene.number}</span>{scene.label}
          </button>
        ))}
      </div>
      <div className="mh-search-stage" role="tabpanel">
        <div className="mh-search-copy"><span>{active.kicker}</span><h3>{active.title}</h3><p>{active.body}</p><a href={signUpUrl}>{active.cta}<ArrowRight aria-hidden="true" /></a></div>
        <figure><Image key={active.image} src={active.image} alt={active.alt} width={1536} height={1024} sizes="(max-width: 900px) 100vw, 56vw" /></figure>
        <div className="mh-search-lumo"><Sparkles aria-hidden="true" /><strong>Ask Lumo with this role attached</strong><i /><p>Research, fit, materials, interview prep, and next actions stay connected to this opportunity.</p></div>
      </div>
    </section>
  );
}

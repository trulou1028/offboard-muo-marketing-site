"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { ZodIssue } from "zod";

import {
  BRINGS_YOU_HERE_OPTIONS,
  intakeSchema,
  LAYOFF_RECENCY_OPTIONS,
  NEWS_BREAK_OPTIONS,
  SPIRIT_ANIMAL_OPTIONS,
  STAY_OPTIONS,
  type IntakeFormValues,
} from "@/lib/intake/schema";
import { submitIntake } from "@/app/intake/actions";

type FormState = {
  name: string;
  email: string;
  recentTitle: string;
  industry: string;
  stayInIndustry: string;
  layoffRecency: string;
  howNewsBroke: string;
  jobSearchVibe: number | undefined;
  bringsYouHere: string[];
  superpower: string;
  wishHelp: string;
  spiritAnimal: string;
  relief: string;
  beforeWeChat: string;
  timezone: string;
  generalAvailability: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  recentTitle: "",
  industry: "",
  stayInIndustry: "",
  layoffRecency: "",
  howNewsBroke: "",
  jobSearchVibe: undefined,
  bringsYouHere: [],
  superpower: "",
  wishHelp: "",
  spiritAnimal: "",
  relief: "",
  beforeWeChat: "",
  timezone: "",
  generalAvailability: "",
};

const VIBE_LABELS: Record<number, string> = {
  1: "I am thriving and manifesting my dream role",
  3: "I apply, I wait, I spiral, I apply again",
  5: "I've rewritten my resume 11 times and still don't know what I do",
};

const SECTION_NAV = [
  { id: "basics", label: "The basics" },
  { id: "story", label: "The offboarding story" },
  { id: "looking", label: "What you're looking for" },
  { id: "fun", label: "The fun part" },
  { id: "logistics", label: "Logistics" },
] as const;

function fieldErrors(issues: ZodIssue[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

function FieldLabel({
  htmlFor,
  required,
  hint,
  children,
}: {
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  children: string;
}) {
  return (
    <div className="mh-intake-field-label">
      <label htmlFor={htmlFor}>
        {children}
        {required && <span className="mh-intake-required">*</span>}
      </label>
      {hint && <p>{hint}</p>}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mh-intake-field-error">{message}</p>;
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mh-intake-option-group">
      {options.map((o) => {
        const checked = value === o.value;
        return (
          <label key={o.value} className={checked ? "is-checked" : ""}>
            <input type="radio" name={name} value={o.value} checked={checked} onChange={() => onChange(o.value)} />
            <span>{o.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function CheckboxGroup({
  options,
  value,
  onChange,
}: {
  options: ReadonlyArray<{ value: string; label: string }>;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="mh-intake-option-group">
      {options.map((o) => {
        const checked = value.includes(o.value);
        return (
          <label key={o.value} className={checked ? "is-checked" : ""}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onChange(checked ? value.filter((v) => v !== o.value) : [...value, o.value])}
            />
            <span>{o.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function VibeField({ value, onChange }: { value: number | undefined; onChange: (v: number) => void }) {
  return (
    <div className="mh-intake-vibe">
      <div className="mh-intake-vibe-buttons">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={value === n ? "is-active" : ""}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mh-intake-vibe-labels">
        <p><strong>1.</strong> {VIBE_LABELS[1]}</p>
        <p><strong>3.</strong> {VIBE_LABELS[3]}</p>
        <p><strong>5.</strong> {VIBE_LABELS[5]}</p>
      </div>
    </div>
  );
}

export function IntakeForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const candidate: IntakeFormValues = {
      name: form.name,
      email: form.email,
      recentTitle: form.recentTitle,
      industry: form.industry,
      stayInIndustry: form.stayInIndustry as IntakeFormValues["stayInIndustry"],
      layoffRecency: form.layoffRecency as IntakeFormValues["layoffRecency"],
      howNewsBroke: form.howNewsBroke as IntakeFormValues["howNewsBroke"],
      jobSearchVibe: form.jobSearchVibe ?? 0,
      bringsYouHere: form.bringsYouHere as IntakeFormValues["bringsYouHere"],
      superpower: form.superpower,
      wishHelp: form.wishHelp,
      spiritAnimal: form.spiritAnimal as IntakeFormValues["spiritAnimal"],
      relief: form.relief,
      beforeWeChat: form.beforeWeChat,
      timezone: form.timezone,
      generalAvailability: form.generalAvailability,
    };

    const parsed = intakeSchema.safeParse(candidate);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error.issues));
      const firstInvalidId = parsed.error.issues[0]?.path[0];
      if (firstInvalidId) {
        document.getElementById(String(firstInvalidId))?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const result = await submitIntake(parsed.data);
      if (result.ok) {
        router.push("/intake/confirmed");
        return;
      }
      setSubmitError(result.error);
    } catch (err) {
      console.error(err);
      setSubmitError("Something went wrong. Please try again, or email info@offboard.co.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mh-intake-grid">
      <aside className="mh-intake-rail">
        <p className="mh-intake-eyebrow">The Soft Landing Zone</p>
        <h1>Tell us where you&apos;re landing</h1>
        <p className="mh-intake-lede">
          A few questions so we actually know who&apos;s on the other end. Your answers help us point the right
          people, playbooks, and intros your way, instead of guessing. Takes about 5 minutes. Be honest, be a
          little weird, there are no wrong answers.
        </p>
        <nav aria-label="Form sections" className="mh-intake-section-nav">
          <ol>
            {SECTION_NAV.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span>{i + 1}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <form onSubmit={onSubmit} className="mh-intake-form" noValidate>
        <section id="basics" className="mh-intake-card">
          <header>
            <p className="mh-intake-card-eyebrow">Section 1</p>
            <h2>The basics</h2>
            <p className="mh-intake-card-subtitle">For the adults in the room.</p>
          </header>
          <div className="mh-intake-card-body">
            <div>
              <FieldLabel htmlFor="name" required hint="First name is fine. You're not on trial. Yet.">
                What&apos;s your name?
              </FieldLabel>
              <input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Jordan" />
              <FieldError message={errors.name} />
            </div>
            <div>
              <FieldLabel htmlFor="email" required hint="We won't spam you. We're not monsters.">
                What&apos;s your email?
              </FieldLabel>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@email.com"
              />
              <FieldError message={errors.email} />
            </div>
            <div>
              <FieldLabel
                htmlFor="recentTitle"
                required
                hint="Your actual title, or what you actually did. Sometimes these differ."
              >
                What was your most recent job title?
              </FieldLabel>
              <input
                id="recentTitle"
                value={form.recentTitle}
                onChange={(e) => update("recentTitle", e.target.value)}
                placeholder="Senior Product Manager"
              />
              <FieldError message={errors.recentTitle} />
            </div>
            <div>
              <FieldLabel htmlFor="industry" required>
                What industry were you in?
              </FieldLabel>
              <input
                id="industry"
                value={form.industry}
                onChange={(e) => update("industry", e.target.value)}
                placeholder="Fintech, healthcare, media..."
              />
              <FieldError message={errors.industry} />
            </div>
            <div>
              <FieldLabel required>And honestly, do you want to stay in it?</FieldLabel>
              <RadioGroup
                name="stayInIndustry"
                options={STAY_OPTIONS}
                value={form.stayInIndustry}
                onChange={(v) => update("stayInIndustry", v)}
              />
              <FieldError message={errors.stayInIndustry} />
            </div>
          </div>
        </section>

        <section id="story" className="mh-intake-card">
          <header>
            <p className="mh-intake-card-eyebrow">Section 2</p>
            <h2>The offboarding story</h2>
          </header>
          <div className="mh-intake-card-body">
            <div>
              <FieldLabel required>How long ago were you laid off?</FieldLabel>
              <RadioGroup
                name="layoffRecency"
                options={LAYOFF_RECENCY_OPTIONS}
                value={form.layoffRecency}
                onChange={(v) => update("layoffRecency", v)}
              />
              <FieldError message={errors.layoffRecency} />
            </div>
            <div>
              <FieldLabel required hint="Choose your villain origin story.">
                How did they break the news?
              </FieldLabel>
              <RadioGroup
                name="howNewsBroke"
                options={NEWS_BREAK_OPTIONS}
                value={form.howNewsBroke}
                onChange={(v) => update("howNewsBroke", v)}
              />
              <FieldError message={errors.howNewsBroke} />
            </div>
            <div>
              <FieldLabel required>Rate your current job search vibe</FieldLabel>
              <VibeField value={form.jobSearchVibe} onChange={(v) => update("jobSearchVibe", v)} />
              <FieldError message={errors.jobSearchVibe} />
            </div>
          </div>
        </section>

        <section id="looking" className="mh-intake-card">
          <header>
            <p className="mh-intake-card-eyebrow">Section 3</p>
            <h2>What you&apos;re actually looking for</h2>
          </header>
          <div className="mh-intake-card-body">
            <div>
              <FieldLabel required hint="Check all that apply.">
                What brings you to Offboard?
              </FieldLabel>
              <CheckboxGroup
                options={BRINGS_YOU_HERE_OPTIONS}
                value={form.bringsYouHere}
                onChange={(v) => update("bringsYouHere", v)}
              />
              <FieldError message={errors.bringsYouHere} />
            </div>
            <div>
              <FieldLabel
                htmlFor="superpower"
                required
                hint="That one thing you're quietly great at. The 'hey, can you take a look at this' that you secretly enjoy."
              >
                What do people always end up coming to you for?
              </FieldLabel>
              <textarea
                id="superpower"
                rows={4}
                value={form.superpower}
                onChange={(e) => update("superpower", e.target.value)}
                placeholder="The thing colleagues pull you into..."
              />
              <FieldError message={errors.superpower} />
            </div>
            <div>
              <FieldLabel htmlFor="wishHelp" required>
                What&apos;s the one thing you wish someone would just help you figure out?
              </FieldLabel>
              <textarea id="wishHelp" rows={4} value={form.wishHelp} onChange={(e) => update("wishHelp", e.target.value)} />
              <FieldError message={errors.wishHelp} />
            </div>
          </div>
        </section>

        <section id="fun" className="mh-intake-card">
          <header>
            <p className="mh-intake-card-eyebrow">Section 4</p>
            <h2>The fun part</h2>
          </header>
          <div className="mh-intake-card-body">
            <div>
              <FieldLabel required>Pick your current spirit animal</FieldLabel>
              <RadioGroup
                name="spiritAnimal"
                options={SPIRIT_ANIMAL_OPTIONS}
                value={form.spiritAnimal}
                onChange={(v) => update("spiritAnimal", v)}
              />
              <FieldError message={errors.spiritAnimal} />
            </div>
            <div>
              <FieldLabel htmlFor="relief" hint="No judgment. Safe space. (Was it the 9am standups?)">
                What was secretly a relief about leaving?
              </FieldLabel>
              <textarea id="relief" rows={3} value={form.relief} onChange={(e) => update("relief", e.target.value)} />
              <FieldError message={errors.relief} />
            </div>
            <div>
              <FieldLabel
                htmlFor="beforeWeChat"
                hint="Dealbreakers, preferred pace, the fact that you're funnier in writing. All valid."
              >
                Anything you want me to know before we chat?
              </FieldLabel>
              <textarea
                id="beforeWeChat"
                rows={3}
                value={form.beforeWeChat}
                onChange={(e) => update("beforeWeChat", e.target.value)}
              />
              <FieldError message={errors.beforeWeChat} />
            </div>
          </div>
        </section>

        <section id="logistics" className="mh-intake-card">
          <header>
            <p className="mh-intake-card-eyebrow">Section 5</p>
            <h2>Almost there. The logistics</h2>
            <p className="mh-intake-card-subtitle">No calendar yet. Just helps us know when to reach out.</p>
          </header>
          <div className="mh-intake-card-body mh-intake-logistics-grid">
            <div>
              <FieldLabel htmlFor="timezone">Timezone</FieldLabel>
              <input id="timezone" value={form.timezone} onChange={(e) => update("timezone", e.target.value)} placeholder="ET, PT, GMT+1..." />
              <FieldError message={errors.timezone} />
            </div>
            <div>
              <FieldLabel htmlFor="generalAvailability">Generally available</FieldLabel>
              <input
                id="generalAvailability"
                value={form.generalAvailability}
                onChange={(e) => update("generalAvailability", e.target.value)}
                placeholder="Weekday afternoons"
              />
              <FieldError message={errors.generalAvailability} />
            </div>
          </div>
        </section>

        <div className="mh-intake-submit">
          {submitError && (
            <p className="mh-intake-submit-error" role="alert">
              {submitError}
            </p>
          )}
          <button type="submit" disabled={submitting}>
            {submitting ? "Sending..." : "Send it, our team will reach out"}
          </button>
          <p>By submitting, you agree to hear from us about your intake. We never share your info.</p>
        </div>
      </form>
    </div>
  );
}

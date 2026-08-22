import { z } from "zod";

// Ported verbatim from the retiring TanStack marketing site's
// src/lib/intake/schema.ts (read-only reference at
// ~/Documents/Codex/offboard-marketing-site). Field structure, option
// copy, and validation rules are unchanged.

export const STAY_OPTIONS = [
  { value: "stay", label: "I want to stay in it" },
  { value: "exit", label: "I'm eyeing the exits" },
  { value: "unsure", label: "Honestly not sure yet" },
] as const;

export const LAYOFF_RECENCY_OPTIONS = [
  { value: "just-happened", label: "Just happened. I'm still in the 'is this real?' phase" },
  { value: "1-3-months", label: "1 to 3 months. I've processed it and I'm ready to move" },
  { value: "3-6-months", label: "3 to 6 months. Okay, things are getting a little spicy" },
  { value: "6-plus-months", label: "6+ months. I have opinions about severance now" },
  { value: "complicated", label: "It's complicated (I'll explain below)" },
] as const;

export const NEWS_BREAK_OPTIONS = [
  { value: "zoom", label: "Zoom call with my camera on and theirs off" },
  { value: "slack", label: "Slack message, then immediate deactivation" },
  { value: "in-person", label: "In person, which was somehow worse" },
  { value: "email", label: "A strongly worded email with way too many words" },
  { value: "other", label: "Other (and yes, I want to hear it)" },
] as const;

export const BRINGS_YOU_HERE_OPTIONS = [
  { value: "meet-people", label: "Meet other people who get it" },
  { value: "strategy", label: "Help with my job search strategy" },
  { value: "pivot", label: "Thinking about a pivot, could use some clarity" },
  { value: "freelance", label: "Explore freelance or consulting" },
  { value: "talk", label: "Talk to someone who won't just say 'network more'" },
  { value: "not-sure", label: "Not sure yet, that's kind of why I'm here" },
] as const;

export const SPIRIT_ANIMAL_OPTIONS = [
  { value: "golden", label: "\u{1F436} Golden Retriever. Excited, optimistic, occasionally confused" },
  { value: "cat", label: "\u{1F431} Cat. Selective, doing things entirely on my own terms" },
  { value: "bear", label: "\u{1F43B} Bear in hibernation. I'll emerge when I'm ready" },
  { value: "raccoon", label: "\u{1F99D} Raccoon. Chaotic, resourceful, operating at odd hours" },
] as const;

const enumFrom = <T extends readonly { value: string }[]>(opts: T) =>
  z.enum(opts.map((o) => o.value) as [string, ...string[]]);

export const intakeSchema = z.object({
  name: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Enter a valid email").max(254),
  recentTitle: z.string().trim().min(1, "Required").max(200),
  industry: z.string().trim().min(1, "Required").max(200),
  stayInIndustry: enumFrom(STAY_OPTIONS),
  layoffRecency: enumFrom(LAYOFF_RECENCY_OPTIONS),
  howNewsBroke: enumFrom(NEWS_BREAK_OPTIONS),
  jobSearchVibe: z.coerce.number().int().min(1).max(5),
  bringsYouHere: z.array(enumFrom(BRINGS_YOU_HERE_OPTIONS)).min(1, "Pick at least one").max(6),
  superpower: z.string().trim().min(1, "Required").max(2000),
  wishHelp: z.string().trim().min(1, "Required").max(2000),
  spiritAnimal: enumFrom(SPIRIT_ANIMAL_OPTIONS),
  relief: z.string().trim().max(2000).optional().or(z.literal("")),
  beforeWeChat: z.string().trim().max(2000).optional().or(z.literal("")),
  timezone: z.string().trim().max(120).optional().or(z.literal("")),
  generalAvailability: z.string().trim().max(200).optional().or(z.literal("")),
});

export type IntakeFormValues = z.infer<typeof intakeSchema>;

export function labelFor<T extends readonly { value: string; label: string }[]>(
  opts: T,
  value: string,
): string {
  return opts.find((o) => o.value === value)?.label ?? value;
}

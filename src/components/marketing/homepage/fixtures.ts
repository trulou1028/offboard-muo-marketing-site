import type { JourneyStageId } from "@/journey/stages";

export interface MarketingStageFixture {
  id: JourneyStageId;
  timing: string;
  stakes: string;
  steps: Array<{ title: string; detail: string; status?: "done" | "current" }>;
  source: string;
}

export const MAYA = {
  name: "Maya Chen",
  firstName: "Maya",
  initials: "MC",
  state: "California",
  endedOn: "July 18",
  role: "Director, Product Strategy",
} as const;

export interface ApprovedCustomerStory {
  roleContext: string;
  layoffContext: string;
  timeline: ReadonlyArray<{ when: string; what: string }>;
  photoSrc: string;
  photoAlt: string;
}

// Prototype walkthrough: Maya is the illustrative member used consistently
// across this page. Presented as a walkthrough, not a testimonial - no
// first-person quote. Replace with a real, approved member story when one
// exists (and reintroduce a quote field only then).
export const APPROVED_CUSTOMER_STORY: ApprovedCustomerStory | null = {
  roleContext: "An illustrative walkthrough, not a member testimonial",
  layoffContext:
    "Maya's role ended July 18. Here is how her first month went with a plan in front of her.",
  timeline: [
    { when: "Day 1", what: "Claim filed" },
    { when: "Week 1", what: "Separation details organized" },
    { when: "Week 2", what: "Training deadline protected" },
    { when: "Week 3", what: "First Job Packet created" },
  ],
  photoSrc: "/marketing/homepage/forward-editorial-v1.webp",
  photoAlt: "A professional carrying her notebook through an open studio door",
};

export const MARKETING_STAGE_FIXTURES: Record<JourneyStageId, MarketingStageFixture> = {
  "land-the-blow": {
    id: "land-the-blow",
    timing: "Start here today",
    stakes: "Handle the deadlines and decisions that arrive first.",
    steps: [
      { title: "Confirm your separation details", detail: "Dates and employer information saved", status: "done" },
      { title: "File your unemployment claim", detail: "Official California application", status: "current" },
      { title: "Review your separation paperwork", detail: "Know the dates and terms before signing" },
    ],
    source: "California EDD and your separation paperwork",
  },
  "steady-yourself": {
    id: "steady-yourself",
    timing: "This week",
    stakes: "Turn the money questions into a number you can use.",
    steps: [
      { title: "Know your runway", detail: "Savings, severance, and monthly costs" },
      { title: "Compare health coverage", detail: "COBRA, marketplace, and partner coverage" },
      { title: "Map the next 30 days", detail: "One calm plan, not a wall of reminders" },
    ],
    source: "Your private financial inputs and official coverage links",
  },
  "choose-your-path": {
    id: "choose-your-path",
    timing: "Before week 16",
    stakes: "See whether funded training changes what is possible next.",
    steps: [
      { title: "Compare three directions", detail: "Same role, new field, or funded school" },
      { title: "Review funded training", detail: "27,000+ eligible-program records nationwide" },
      { title: "Prepare for the job center", detail: "Bring the questions and documents that matter" },
    ],
    source: "CareerOneStop, state ETPL data, and California EDD",
  },
  "get-ready": {
    id: "get-ready",
    timing: "When your direction is clear",
    stakes: "Build one honest career story that every application can reuse.",
    steps: [
      { title: "Create your master resume", detail: "Your verified source document" },
      { title: "Shape your positioning", detail: "Role direction, proof, and voice" },
      { title: "Prepare your brand kit", detail: "Headshot and consistent profile assets" },
    ],
    source: "Your resume, work history, and saved career context",
  },
  "run-the-search": {
    id: "run-the-search",
    timing: "For every serious role",
    stakes: "Research, tailor, and track without rebuilding the context each time.",
    steps: [
      { title: "Build your first Job Packet", detail: "Ghost Check, research, resume, and cover letter" },
      { title: "Save the application", detail: "Keep the role and every artifact together" },
      { title: "Find a path to a person", detail: "Use your network with a specific reason to reach out" },
    ],
    source: "The job posting, company research, and your career record",
  },
  "close-it": {
    id: "close-it",
    timing: "When the interview lands",
    stakes: "Walk in with the role, company, and your strongest evidence already organized.",
    steps: [
      { title: "Open your interview briefing", detail: "Likely questions and role-specific evidence" },
      { title: "Practice out loud", detail: "Voice rehearsal with direct coaching" },
      { title: "Debrief while it is fresh", detail: "Capture signals and the follow-up" },
    ],
    source: "Your Job Packet, interview details, and saved examples",
  },
  "land-and-give-back": {
    id: "land-and-give-back",
    timing: "When you land",
    stakes: "Keep the record, mark the win, and make the path easier for someone else.",
    steps: [
      { title: "Record the landing", detail: "Role, company, date, and time to land" },
      { title: "Keep your career record", detail: "Your documents and progress remain yours" },
      { title: "Pass something useful on", detail: "A referral, a lesson, or a word of support" },
    ],
    source: "Your private record and the Offboard community",
  },
};

// The outputs a Job Packet actually produces, in pipeline order. Mirrors the
// shipped steps in src/hooks/useJobPacket.ts - an interview briefing is NOT one
// of them (briefings generate on the Interview record), so it must not appear
// here. Keep this list in sync with the pipeline before making packet claims.
export const PACKET_OUTPUTS = [
  {
    id: "job-details",
    label: "Job details",
    title: "Director, Product Strategy",
    meta: "Northstar Health · Seattle, hybrid",
    body: "The full posting is preserved as the source for every downstream output.",
  },
  {
    id: "ghost-check",
    label: "Ghost Check",
    title: "Strong signs this role is active",
    meta: "83 / 100 · checked 12 minutes ago",
    body: "Fresh posting signals, a specific hiring team, and an active company careers page support the listing.",
  },
  {
    id: "company-research",
    label: "Company research",
    title: "The operating context",
    meta: "4 sources · citations included",
    body: "Northstar is consolidating two product lines after a growth round and is hiring for portfolio clarity.",
  },
  {
    id: "role-match",
    label: "Role match",
    title: "89% evidence-backed match",
    meta: "6 strengths · 2 gaps to prepare",
    body: "Strategy, platform launches, and cross-functional leadership are strong. Healthcare depth needs an honest bridge.",
  },
  {
    id: "tailored-resume",
    label: "Tailored resume",
    title: "Maya Chen · Product strategy leader",
    meta: "Ready to download · attached to application",
    body: "The tailored version keeps Maya's real scope and outcomes while prioritizing the evidence this role asks for.",
  },
  {
    id: "cover-letter",
    label: "Cover letter",
    title: "A direct note in Maya's voice",
    meta: "Editable · no invented claims",
    body: "The letter connects Northstar's portfolio challenge to Maya's launch and operating-model experience.",
  },
  {
    id: "path-to-a-person",
    label: "Path to a person",
    title: "A specific reason to reach out",
    meta: "Warm route · you approve every message",
    body: "Offboard finds a plausible route to a real person at the company so outreach is not a cold guess.",
  },
] as const;


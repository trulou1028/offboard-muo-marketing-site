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
    { when: "Week 3", what: "First Application Packet created" },
  ],
  photoSrc: "/marketing/homepage/raw/maya-walking.webp",
  photoAlt: "Maya carrying her laptop and a folder of documents through the hallway of her home",
};

// The conversion framework's transformation section: the emotional reframe the
// product performs, then the three-step journey that delivers it.
export const TRANSFORMATION = {
  fromQuote: "“I just lost my job. What the hell do I do?”",
  toQuote: "“I know exactly what matters today, this week, and next.”",
  steps: [
    { title: "Understand where you stand", body: "Benefits, deadlines, finances, and eligibility, organized around your situation." },
    { title: "Build your plan", body: "Prioritized next steps based on what is urgent and what can wait." },
    { title: "Move forward", body: "Applications, interviews, support, and ongoing guidance as things change." },
  ],
} as const;

// Scannable capabilities: the fast answer to "what can Offboard actually do?"
export const CAPABILITIES = [
  { title: "Know what you're eligible for", line: "Benefits, programs, and deadlines." },
  { title: "Build stronger applications", line: "Materials informed by you and the opportunity." },
  { title: "Stay organized", line: "Keep jobs, applications, and next steps together." },
  { title: "Prepare for interviews", line: "Know the company, role, and story you need to tell." },
  { title: "Know what comes next", line: "A plan that changes as your situation changes." },
  { title: "Get human support", line: "Community and people when software isn't enough." },
] as const;

// Mid-page proof: only claims Offboard can verify today. Swap in real product
// numbers (members, applications created) when they exist - never invent them.
export const PROOF = {
  headline: "Thousands of job seekers shouldn't have to figure unemployment out alone.",
  qualitative:
    "Offboard grew out of a weekly newsletter and community for people navigating layoffs. The product organizes what we kept explaining one person at a time.",
  stat: "5,000+",
  statLabel: "people read the Offboard newsletter's job-market analysis every week",
  quote:
    "“The first week after being laid off I was completely overwhelmed. Having one place that said what to do first gave me somewhere to start.”",
  quoteLabel: "An illustrative member quote, not a testimonial",
} as const;

// "What's included": the contents of someone's personalized unemployment
// system, not a software feature list.
export const WHATS_INCLUDED = [
  { title: "Your personalized plan", line: "What matters now and what can wait." },
  { title: "Benefits and deadlines", line: "Programs and actions relevant to you." },
  { title: "Job search workspace", line: "Applications and opportunities in one place." },
  { title: "Application support", line: "Materials tailored to each opportunity." },
  { title: "Interview preparation", line: "Briefings, practice, and follow-ups." },
  { title: "Community and human support", line: "Real people when you need them." },
  { title: "Your information and history", line: "Told once, remembered everywhere, always yours." },
] as const;

// Comparison: the category argument. Offboard's advantage is that the
// unemployment experience is fragmented and Offboard connects it - not that
// every individual feature is unprecedented.
export type ComparisonCell = "yes" | "partial" | "no";
export const COMPARISON_ROWS: ReadonlyArray<{
  need: string;
  onYourOwn: { state: ComparisonCell; note: string };
  pointSolutions: { state: ComparisonCell; note: string };
  offboard: { state: ComparisonCell; note: string };
}> = [
  {
    need: "Benefits and deadlines",
    onYourOwn: { state: "partial", note: "Research it all yourself" },
    pointSolutions: { state: "partial", note: "Varies" },
    offboard: { state: "yes", note: "Organized for your situation" },
  },
  {
    need: "Personalized next steps",
    onYourOwn: { state: "no", note: "You are the plan" },
    pointSolutions: { state: "partial", note: "Varies" },
    offboard: { state: "yes", note: "Prioritized and kept current" },
  },
  {
    need: "Application support",
    onYourOwn: { state: "partial", note: "Separate tools" },
    pointSolutions: { state: "yes", note: "Per tool" },
    offboard: { state: "yes", note: "Connected to your context" },
  },
  {
    need: "Job search organization",
    onYourOwn: { state: "partial", note: "Separate system" },
    pointSolutions: { state: "yes", note: "Per tool" },
    offboard: { state: "yes", note: "One workspace" },
  },
  {
    need: "Ongoing guidance",
    onYourOwn: { state: "no", note: "" },
    pointSolutions: { state: "no", note: "" },
    offboard: { state: "yes", note: "A plan that adapts" },
  },
  {
    need: "Human and community support",
    onYourOwn: { state: "partial", note: "Find it separately" },
    pointSolutions: { state: "partial", note: "Varies" },
    offboard: { state: "yes", note: "Built in" },
  },
];

// Objection-killing FAQ. Compliance notes: agencies decide eligibility;
// sponsors see aggregate participation only; no refund promises.
export const HOMEPAGE_FAQS = [
  {
    question: "Is Offboard a government agency?",
    answer: "No. Offboard is an independent company. Government agencies decide eligibility and pay benefits; we help you navigate them.",
  },
  {
    question: "Is this only for people who were laid off?",
    answer: "No. Offboard also helps if you're still employed but at risk, or have been searching for a while.",
  },
  {
    question: "Can I use Offboard if my employer didn't provide it?",
    answer: "Yes. Anyone can sign up directly - most members do. Employer sponsorship just means someone else paid.",
  },
  {
    question: "What does Offboard actually help with?",
    answer: "Understanding your benefits and deadlines, building a prioritized plan, and running your job search - applications, interviews, and what comes next.",
  },
  {
    question: "How much does it cost?",
    answer: "The free plan includes the navigator, your first Application Packet, 30 credits, and daily LUMO messages. Plus is $20/month for more capacity. Claiming your benefits is always free.",
  },
  {
    question: "What happens to my personal information?",
    answer: "It stays in your workspace. Never sold, never shared with your former employer. Sponsors see anonymous participation counts only.",
  },
  {
    question: "Do I have to use everything?",
    answer: "No. Start with what your situation needs - every part works on its own, and they get better together.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. Cancel whenever you like - your workspace, documents, and history stay yours.",
  },
] as const;

// Life-after-layoff photography strip: unemployment happens inside a person's
// actual life. No UI, no cards, no features.
export const LIFE_STRIP = [
  { src: "/marketing/homepage/raw/strip-kitchen-table.webp", alt: "A man alone at his kitchen table in the early morning with coffee, mail, and a laptop", caption: "At the kitchen table" },
  { src: "/marketing/homepage/raw/strip-school-dropoff.webp", alt: "A mother zipping her daughter's jacket outside an elementary school on an overcast morning", caption: "Dropping the kids at school" },
  { src: "/marketing/homepage/raw/strip-interview-prep.webp", alt: "A woman practicing interview answers out loud in her bedroom mirror with notes taped to its edge", caption: "Preparing for an interview" },
  { src: "/marketing/homepage/raw/strip-call-outside.webp", alt: "A man taking a phone call on his apartment balcony under a gray sky", caption: "Taking the call outside" },
  { src: "/marketing/homepage/raw/strip-walking-in.webp", alt: "A woman walking through the glass door of an office building on her first day at a new job", caption: "Walking into the next job" },
] as const;

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
      { title: "Build your first Application Packet", detail: "Ghost Check, research, resume, and cover letter" },
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
    source: "Your Application Packet, interview details, and saved examples",
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

// The outputs an Application Packet actually produces, in pipeline order. Mirrors the
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

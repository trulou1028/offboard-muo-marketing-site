export type PacketStepId =
  | "ghost"
  | "company"
  | "match"
  | "resume"
  | "letter"
  | "person";

export type PacketTier = "limit" | "free" | "pro";

export interface PacketDemoStep {
  id: PacketStepId;
  label: string;
  description: string;
  tier: PacketTier;
  summary: string;
}

export const PACKET_STEP_CHIP: Record<PacketTier, string> = {
  limit: "3 a month",
  free: "Free",
  pro: "Pro",
};

export const PACKET_DEMO_STEPS: readonly PacketDemoStep[] = [
  {
    id: "ghost",
    label: "Ghost Check",
    description: "Is this posting real and active?",
    tier: "limit",
    summary: "Signals collected for review",
  },
  {
    id: "company",
    label: "Company Intel",
    description: "Research the company",
    tier: "free",
    summary: "Company brief ready",
  },
  {
    id: "match",
    label: "Role Match Analysis",
    description: "Score your fit for the role",
    tier: "free",
    summary: "Alignment and gap identified",
  },
  {
    id: "resume",
    label: "Tailor Resume",
    description: "Adapt your resume to this job",
    tier: "pro",
    summary: "One grounded revision ready",
  },
  {
    id: "letter",
    label: "Cover Letter",
    description: "Draft a cover letter",
    tier: "pro",
    summary: "Short excerpt ready to review",
  },
  {
    id: "person",
    label: "Path to a Person",
    description: "Find someone to reach out to",
    tier: "pro",
    summary: "Relevant outreach path found",
  },
] as const;

export const PACKET_EXAMPLE = {
  candidate: "Alex Morgan",
  candidateRole: "Customer operations specialist",
  role: "Customer Success Manager",
  company: "Example Co.",
  roleSummary:
    "Own onboarding for new accounts, improve customer handoffs, and help the team build repeatable retention practices.",
  sourceExperience:
    "Built an onboarding playbook adopted by a 12-person support team and reduced handoff time by 20%.",
} as const;


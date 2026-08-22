import { describe, expect, it } from "vitest";

import { intakeSchema } from "./schema";

const VALID_SUBMISSION = {
  name: "Jordan",
  email: "jordan@example.com",
  recentTitle: "Senior Product Manager",
  industry: "Fintech",
  stayInIndustry: "unsure",
  layoffRecency: "1-3-months",
  howNewsBroke: "zoom",
  jobSearchVibe: 3,
  bringsYouHere: ["strategy", "talk"],
  superpower: "Untangling messy roadmaps",
  wishHelp: "Knowing which applications actually matter",
  spiritAnimal: "cat",
  relief: "",
  beforeWeChat: "",
  timezone: "",
  generalAvailability: "",
};

describe("intakeSchema", () => {
  it("accepts a fully valid submission", () => {
    const result = intakeSchema.safeParse(VALID_SUBMISSION);
    expect(result.success).toBe(true);
  });

  it("accepts a valid submission with optional fields omitted", () => {
    const { relief, beforeWeChat, timezone, generalAvailability, ...required } = VALID_SUBMISSION;
    void relief;
    void beforeWeChat;
    void timezone;
    void generalAvailability;
    const result = intakeSchema.safeParse(required);
    expect(result.success).toBe(true);
  });

  it("rejects a missing required field", () => {
    const { name, ...rest } = VALID_SUBMISSION;
    void name;
    const result = intakeSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = intakeSchema.safeParse({ ...VALID_SUBMISSION, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects an out-of-range job search vibe", () => {
    const result = intakeSchema.safeParse({ ...VALID_SUBMISSION, jobSearchVibe: 7 });
    expect(result.success).toBe(false);
  });

  it("rejects an empty bringsYouHere selection", () => {
    const result = intakeSchema.safeParse({ ...VALID_SUBMISSION, bringsYouHere: [] });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown enum value", () => {
    const result = intakeSchema.safeParse({ ...VALID_SUBMISSION, spiritAnimal: "dragon" });
    expect(result.success).toBe(false);
  });
});

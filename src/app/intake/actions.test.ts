import { beforeEach, describe, expect, it, vi } from "vitest";

import { insertIntakeRow } from "@/lib/intake/supabase-admin";
import { sendIntakeConfirmationEmail, sendIntakeNotificationEmail } from "@/lib/email/resend";

vi.mock("@/lib/intake/supabase-admin", () => ({
  insertIntakeRow: vi.fn(),
}));

vi.mock("@/lib/email/resend", () => ({
  sendIntakeConfirmationEmail: vi.fn(),
  sendIntakeNotificationEmail: vi.fn(),
}));

// Imported after the mocks above so `submitIntake` picks up the mocked
// module bindings.
import { submitIntake } from "./actions";

const mockInsertIntakeRow = vi.mocked(insertIntakeRow);
const mockSendIntakeConfirmationEmail = vi.mocked(sendIntakeConfirmationEmail);
const mockSendIntakeNotificationEmail = vi.mocked(sendIntakeNotificationEmail);

const VALID_INPUT = {
  name: "Jamie Rivera",
  email: "jamie@example.com",
  recentTitle: "Staff Engineer",
  industry: "Software",
  stayInIndustry: "stay",
  layoffRecency: "1-3-months",
  howNewsBroke: "zoom",
  jobSearchVibe: 3,
  bringsYouHere: ["strategy"],
  superpower: "Debugging gnarly systems",
  wishHelp: "Figuring out what's next",
  spiritAnimal: "cat",
  relief: "",
  beforeWeChat: "",
  timezone: "",
  generalAvailability: "",
};

describe("submitIntake", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSendIntakeConfirmationEmail.mockResolvedValue({ ok: true });
    mockSendIntakeNotificationEmail.mockResolvedValue({ ok: true });
  });

  it("returns the first zod issue message on invalid input, and never inserts", async () => {
    const result = await submitIntake({ ...VALID_INPUT, email: "not-an-email" });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Enter a valid email");
    }
    expect(mockInsertIntakeRow).not.toHaveBeenCalled();
  });

  it("returns a generic error and sends no email when the insert fails", async () => {
    mockInsertIntakeRow.mockResolvedValue({ ok: false, reason: "insert-failed" });

    const result = await submitIntake(VALID_INPUT);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/something went wrong/i);
    }
    expect(mockSendIntakeConfirmationEmail).not.toHaveBeenCalled();
    expect(mockSendIntakeNotificationEmail).not.toHaveBeenCalled();
  });

  it("still returns ok with the id when the insert succeeds but both emails reject", async () => {
    mockInsertIntakeRow.mockResolvedValue({ ok: true, id: "row-123" });
    mockSendIntakeConfirmationEmail.mockRejectedValue(new Error("confirmation email failed"));
    mockSendIntakeNotificationEmail.mockRejectedValue(new Error("notification email failed"));

    const result = await submitIntake(VALID_INPUT);

    expect(result).toEqual({ ok: true, id: "row-123" });
  });

  it("calls both email senders exactly once each when the insert succeeds", async () => {
    mockInsertIntakeRow.mockResolvedValue({ ok: true, id: "row-456" });

    const result = await submitIntake(VALID_INPUT);

    expect(result).toEqual({ ok: true, id: "row-456" });
    expect(mockSendIntakeConfirmationEmail).toHaveBeenCalledTimes(1);
    expect(mockSendIntakeNotificationEmail).toHaveBeenCalledTimes(1);
  });
});

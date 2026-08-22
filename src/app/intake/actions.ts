"use server";

import {
  BRINGS_YOU_HERE_OPTIONS,
  intakeSchema,
  LAYOFF_RECENCY_OPTIONS,
  labelFor,
  NEWS_BREAK_OPTIONS,
  STAY_OPTIONS,
  SPIRIT_ANIMAL_OPTIONS,
  type IntakeFormValues,
} from "@/lib/intake/schema";
import { insertIntakeRow } from "@/lib/intake/supabase-admin";
import { sendIntakeConfirmationEmail, sendIntakeNotificationEmail } from "@/lib/email/resend";

const TEAM_RECIPIENTS = ["louie@offboard.co", "steph@offboard.co"];

export type SubmitIntakeResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

function buildFieldList(values: IntakeFormValues): { label: string; value: string }[] {
  const bringsLabels = values.bringsYouHere.map((v) => labelFor(BRINGS_YOU_HERE_OPTIONS, v)).join("\n- ");
  return [
    { label: "Name", value: values.name },
    { label: "Email", value: values.email },
    { label: "Most recent title", value: values.recentTitle },
    { label: "Industry", value: values.industry },
    { label: "Wants to stay in industry?", value: labelFor(STAY_OPTIONS, values.stayInIndustry) },
    { label: "How long ago laid off", value: labelFor(LAYOFF_RECENCY_OPTIONS, values.layoffRecency) },
    { label: "How they broke the news", value: labelFor(NEWS_BREAK_OPTIONS, values.howNewsBroke) },
    { label: "Job search vibe (1 to 5)", value: String(values.jobSearchVibe) },
    { label: "What brings them to Offboard", value: `- ${bringsLabels}` },
    { label: "What people come to them for", value: values.superpower },
    { label: "What they wish someone would help figure out", value: values.wishHelp },
    { label: "Spirit animal", value: labelFor(SPIRIT_ANIMAL_OPTIONS, values.spiritAnimal) },
    { label: "Secret relief about leaving", value: values.relief || "" },
    { label: "Anything to know before we chat", value: values.beforeWeChat || "" },
    { label: "Timezone", value: values.timezone || "" },
    { label: "Generally available", value: values.generalAvailability || "" },
  ];
}

export async function submitIntake(input: unknown): Promise<SubmitIntakeResult> {
  const parsed = intakeSchema.safeParse(input);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return { ok: false, error: firstIssue ? firstIssue.message : "Please check the form and try again." };
  }
  const data = parsed.data;

  const inserted = await insertIntakeRow({
    name: data.name,
    email: data.email,
    recent_title: data.recentTitle,
    industry: data.industry,
    stay_in_industry: data.stayInIndustry,
    layoff_recency: data.layoffRecency,
    how_news_broke: data.howNewsBroke,
    job_search_vibe: data.jobSearchVibe,
    brings_you_here: data.bringsYouHere,
    superpower: data.superpower,
    wish_help: data.wishHelp,
    spirit_animal: data.spiritAnimal,
    relief: data.relief || null,
    before_we_chat: data.beforeWeChat || null,
    timezone: data.timezone || null,
    general_availability: data.generalAvailability || null,
  });

  if (!inserted.ok) {
    return {
      ok: false,
      error: "Something went wrong. Please try again, or email hello@offboard.co.",
    };
  }

  // Fire both emails. Never let an email failure fail the submission: the
  // row is already saved, that's what matters most.
  try {
    const fields = buildFieldList(data);
    await Promise.allSettled([
      sendIntakeConfirmationEmail({ to: data.email, firstName: data.name.split(" ")[0] ?? data.name }),
      sendIntakeNotificationEmail({
        to: TEAM_RECIPIENTS,
        submitterName: data.name,
        submitterEmail: data.email,
        recentTitle: data.recentTitle,
        submissionId: inserted.id,
        fields,
      }),
    ]);
  } catch (e) {
    console.error("intake email dispatch failed", e);
  }

  return { ok: true, id: inserted.id };
}

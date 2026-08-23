import { GuideH2, GuideP, GuideList, GuideCallout } from "@/components/marketing/resources/GuideArticle";

export default function RebuildYourResumeAfterALayoff() {
  return (
    <>
      <GuideH2>First, settle how you talk about the layoff</GuideH2>
      <GuideP>
        Layoffs are common and recruiters know it. You do not owe an explanation on the resume
        itself. Keep your dates honest, and if you want context, a short, neutral line in a cover
        note or LinkedIn is plenty: a role eliminated in a company-wide reduction is a fact, not a
        flaw. Spend your energy on the work you did, not on defending the exit.
      </GuideP>

      <GuideH2>Build one strong base resume</GuideH2>
      <GuideP>
        Trying to keep ten slightly different resumes in sync is how things go stale. Instead, build
        a single, complete base, then tailor a copy per role. Your base should include:
      </GuideP>
      <GuideList
        items={[
          "A short header that names the role you are targeting, not a generic title.",
          "Every relevant role with dates, scope, and the size of what you owned.",
          "A deep bank of accomplishment bullets, more than any one application needs.",
          "Skills and tools stated plainly, so both humans and keyword filters can find them.",
        ]}
      />

      <GuideH2>Lead with outcomes, not duties</GuideH2>
      <GuideP>
        The difference between a forgettable bullet and a strong one is whether it shows a result. A
        duty describes what you were assigned. An outcome shows what changed because you were there.
        Use a simple shape: action, then impact, then a number wherever you honestly can.
      </GuideP>
      <GuideCallout title="Weak vs. strong">
        Weak: &ldquo;Responsible for managing the onboarding process.&rdquo; Strong:
        &ldquo;Redesigned onboarding, cutting time-to-first-value from 14 days to 5 and lifting
        30-day retention 12%.&rdquo;
      </GuideCallout>
      <GuideP>
        Do not have clean metrics for everything? That is fine. Reach for scale (how many, how
        large), speed (how much faster), or quality (fewer errors, higher satisfaction). A credible
        directional result beats a vague responsibility every time.
      </GuideP>

      <GuideH2>Tailor each application without starting over</GuideH2>
      <GuideP>
        Tailoring is not rewriting. With a strong base, each application is mostly selection and
        emphasis:
      </GuideP>
      <GuideList
        items={[
          "Read the job description and note the 5 to 8 things it clearly cares about most.",
          "Pull the bullets from your base that speak to those priorities, and cut the rest.",
          "Echo the role's own language for skills you genuinely have, so filters and skimmers catch them.",
          "Reorder so the most relevant experience sits highest on the page.",
        ]}
      />
      <GuideP>
        Most applicant tracking systems and recruiters scan, they do not read. Tailoring is how you
        make the relevant ten seconds count, and a base-plus-selection workflow makes it a
        five-minute job instead of an evening.
      </GuideP>

      <GuideH2>Avoid the common traps</GuideH2>
      <GuideList
        items={[
          "Stuffing keywords you cannot back up, it falls apart in the interview.",
          "A dense wall of text, white space and short bullets get read.",
          "Listing duties for senior roles, at that level, impact is the whole point.",
          "One resume for every job, generic reads as generic.",
        ]}
      />

      <GuideH2>Keep it a living document</GuideH2>
      <GuideP>
        Your resume is not a one-time artifact, it is a record you maintain. As outcomes land in the
        search, callbacks, projects, new metrics, fold them back into the base so the next tailored
        copy is even stronger. This is exactly the loop Offboard is built around: upload your resume
        once, then let Resume Tailor reshape it for each role, or paste a job URL and a Job Packet
        tailors your resume, drafts the cover letter, and preps the interview in one pass, always
        starting from everything you have already done rather than a blank page.
      </GuideP>
    </>
  );
}

import { GuideH2, GuideP, GuideList, GuideCallout } from "@/components/marketing/resources/GuideArticle";

export default function FirstWeekAfterALayoff() {
  return (
    <>
      <GuideP>
        Before anything else: a layoff is a budget decision, not a verdict on your worth. You do not
        need to have a plan by Friday. You need to protect a few things that are easy to handle now
        and painful to fix later. Work down this list and then give yourself permission to rest.
      </GuideP>

      <GuideH2>1. Take 48 hours before you sign anything</GuideH2>
      <GuideP>
        You will likely be handed a separation agreement and asked to sign quickly. You almost never
        have to sign on the spot. In the US, if you are 40 or older, you are generally entitled to
        at least 21 days to consider a severance agreement and 7 days to revoke after signing. Ask
        for the deadline in writing, and use the time.
      </GuideP>

      <GuideH2>2. Save everything before access is cut</GuideH2>
      <GuideP>
        Company accounts often disappear within hours. While you still have access, capture what is
        yours to keep:
      </GuideP>
      <GuideList
        items={[
          "Your personal contacts, references, and any non-confidential work samples you are permitted to keep.",
          "A copy of your most recent reviews, wins, and metrics, the raw material for your resume.",
          "Your benefits and payroll documents, plus the HR contact who can answer questions next week.",
          "Forward anything you need to a personal email before your accounts are deactivated.",
        ]}
      />
      <GuideCallout title="One rule">
        Only take what is genuinely yours. Confidential data, customer lists, and proprietary code
        stay behind. The goal is your own record, not risk.
      </GuideCallout>

      <GuideH2>3. Map your runway in real numbers</GuideH2>
      <GuideP>
        Anxiety thrives on vagueness. Replace it with a number. Add up your savings plus any
        severance, then divide by your real monthly spend. That figure, how many months you have, is
        the single most useful thing you can know this week. It tells you whether you are
        negotiating from comfort or urgency, and it makes every later decision less abstract.
      </GuideP>
      <GuideP>
        If you would rather not build the spreadsheet, Offboard&apos;s Financial Runway Calculator
        does it for you. Enter savings, severance, and monthly expenses and it shows the months you
        have left, all calculated privately in your browser, with no AI and nothing shared.
      </GuideP>

      <GuideH2>4. File for unemployment now</GuideH2>
      <GuideP>
        File in your state the week you are let go, even if you received severance. Benefits can
        take weeks to start, and in many states a layoff qualifies you regardless of severance.
        Waiting only delays money you are entitled to.
      </GuideP>

      <GuideH2>5. Decide what happens to health coverage</GuideH2>
      <GuideP>
        Find out exactly when your current coverage ends. Then compare your options before the
        deadline: COBRA continuation, a spouse or partner&apos;s plan, or a marketplace plan (a job
        loss opens a special enrollment window). COBRA is often the most expensive path, so price
        the alternatives before defaulting to it.
      </GuideP>

      <GuideH2>6. Tell a small circle, then pause the announcement</GuideH2>
      <GuideP>
        Let a few trusted people know early, the ones who will think of you when they hear of a
        role. You do not need a polished public post in week one. Word of mouth from people who know
        your work moves faster than a broadcast, and you can announce more widely once you have your
        footing.
      </GuideP>

      <GuideH2>What can wait until week two</GuideH2>
      <GuideList
        items={[
          "Rewriting your whole resume, do the outcomes capture above first, polish later.",
          "Applying to dozens of roles, a scattered week-one spray rarely lands.",
          "Big career-pivot decisions, make those with a clear head and a known runway.",
        ]}
      />
      <GuideP>
        Handle the protective list, then stop. A sustainable search is a marathon, and the people
        who land well are usually the ones who did not burn out in the first week trying to do
        everything at once.
      </GuideP>
    </>
  );
}

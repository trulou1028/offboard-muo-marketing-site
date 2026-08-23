import { GuideH2, GuideP, GuideList, GuideCallout } from "@/components/marketing/resources/GuideArticle";

export default function HealthInsuranceAfterALayoff() {
  return (
    <>
      <GuideP>
        Losing your job usually means losing your health insurance within a few weeks. The good news
        is you have more options than COBRA, and most people who default to COBRA could have paid
        far less for similar or better coverage. Here is the short, practical comparison, plus how
        to decide before the clock runs out.
      </GuideP>

      <GuideH2>First, find your exact coverage end date</GuideH2>
      <GuideP>
        Some employers end coverage on your last day of work. Others run it through the end of the
        month, and a few extend it as part of severance. Ask HR in writing for the exact date your
        medical, dental, and vision coverage ends. Every option below has a deadline tied to that
        date.
      </GuideP>

      <GuideH2>Option 1: A spouse or partner's plan</GuideH2>
      <GuideP>
        If your spouse, domestic partner, or parent (if you are under 26) has employer coverage,
        losing your job triggers a special enrollment window of usually 30 to 60 days. This is
        almost always the cheapest path because the other employer is subsidizing the premium. Ask
        their HR what documentation they need (typically a letter from your old employer confirming
        the coverage end date).
      </GuideP>

      <GuideH2>Option 2: An ACA marketplace plan</GuideH2>
      <GuideP>
        A layoff opens a 60-day special enrollment period on healthcare.gov or your state exchange.
        For most laid-off workers this is the best value, because the same income drop that ended
        your job also makes you eligible for subsidies you could not get while employed.
      </GuideP>
      <GuideList
        items={[
          "Estimate your household income for the rest of the calendar year, not your old salary. If you expect to be on unemployment for several months, your subsidy will be much larger than the calculator first suggests.",
          "Compare on total cost, not just premium. A cheaper Bronze plan with a $7,000 deductible can cost more than a Silver plan if you actually use care.",
          "If you take any prescriptions, check each plan's formulary before enrolling. The same drug can be free on one plan and hundreds of dollars on another.",
        ]}
      />
      <GuideCallout title="Worth knowing">
        Through 2025, enhanced ACA subsidies cap premiums at roughly 8.5% of income for most
        households. After that, rules may shift, so check current subsidy levels when you enroll.
      </GuideCallout>

      <GuideH2>Option 3: COBRA continuation</GuideH2>
      <GuideP>
        COBRA lets you keep your exact employer plan for up to 18 months. The catch is price. You
        now pay the full premium plus a 2% admin fee, which usually lands somewhere between $600
        and $900 a month for an individual and $1,800 to $2,500 for a family. That is often four to
        eight times what a comparable ACA plan would cost with subsidies.
      </GuideP>
      <GuideP>
        COBRA is genuinely the right answer in three cases: you are mid-treatment and cannot change
        networks, you have already hit your deductible for the year, or your employer is paying for
        COBRA as part of severance. You also have 60 days from your coverage end date to elect
        COBRA, and it backdates, so you can wait, see if you need care, and elect retroactively if
        something happens.
      </GuideP>

      <GuideH2>Option 4: A short-term or catastrophic plan</GuideH2>
      <GuideP>
        Short-term medical plans are cheap but exclude pre-existing conditions and many essential
        services. Useful only if you are healthy, expect to land a new job within a few months, and
        want a thin safety net. Treat it as a stopgap, not a real plan.
      </GuideP>

      <GuideH2>Option 5: Medicaid</GuideH2>
      <GuideP>
        If your income drops far enough, you may qualify for Medicaid in your state. Eligibility is
        based on current monthly income, not last year's, so applying right after a layoff is often
        a different answer than applying while employed. There is no annual enrollment window for
        Medicaid, you can apply any time.
      </GuideP>

      <GuideH2>How to decide in 30 minutes</GuideH2>
      <GuideList
        ordered
        items={[
          "Confirm your coverage end date with HR in writing.",
          "Check if you can join a spouse, partner, or parent's plan first.",
          "If not, get an ACA quote at healthcare.gov with your projected post-layoff income, not your old salary. Compare total cost, not premium.",
          "If you are mid-treatment or have hit your deductible, price COBRA against the ACA alternative for the months you actually need.",
          "If your income is very low, check Medicaid eligibility for your state.",
        ]}
      />

      <GuideCallout title="The point">
        For most laid-off workers, an ACA marketplace plan with subsidies is cheaper than COBRA,
        often by hundreds of dollars a month. Always price both before defaulting.
      </GuideCallout>

      <GuideP>
        Health insurance is one line on Offboard's Financial Runway calculator, but it is usually
        the single biggest swing in your monthly budget. Get this number right and the rest of your
        runway plan gets noticeably easier.
      </GuideP>
    </>
  );
}

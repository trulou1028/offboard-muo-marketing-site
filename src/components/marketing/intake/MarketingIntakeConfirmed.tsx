import Link from "next/link";

import { PageHero } from "@/components/marketing/homepage/MarketingSite";

export function MarketingIntakeConfirmed() {
  return (
    <main id="main-content">
      <PageHero
        current="intake"
        kicker="Soft Landing Zone"
        title="Thanks for filling that out."
        body="We'll review your intake and reach out directly, usually within a few days. Keep an eye on your inbox."
        aside={false}
        cta={false}
      />
      <section className="mh-section mh-intake-confirmed">
        <p>
          A confirmation is on its way to your inbox. If it doesn&apos;t land within a few minutes, check spam or
          email <a href="mailto:info@offboard.co">info@offboard.co</a>.
        </p>
        <Link href="/" className="mh-intake-confirmed-back">
          Back to offboard.co
        </Link>
      </section>
    </main>
  );
}

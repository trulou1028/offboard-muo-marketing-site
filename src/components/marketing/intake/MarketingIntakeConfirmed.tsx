import Link from "next/link";

export function MarketingIntakeConfirmed() {
  return (
    <main id="main-content">
      <section className="mh-route-hero mh-section">
        <div>
          <span className="mh-kicker is-lime">Soft Landing Zone</span>
          <h1>Thanks for filling that out.</h1>
          <p>
            We&apos;ll review your intake and reach out directly, usually within a few days. Keep an eye on your
            inbox.
          </p>
        </div>
      </section>
      <section className="mh-section mh-intake-confirmed">
        <p>
          A confirmation is on its way to your inbox. If it doesn&apos;t land within a few minutes, check spam or
          email <a href="mailto:hello@offboard.co">hello@offboard.co</a>.
        </p>
        <Link href="/" className="mh-intake-confirmed-back">
          Back to offboard.co
        </Link>
      </section>
    </main>
  );
}

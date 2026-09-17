import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { COMPANY_PAGES } from "@/content/companies";

import { CompanyLogo } from "./CompanyLogo";

import { FinalCta, MarketingShell, PageHero } from "./MarketingSite";

/* Company Transition Centers: the index (plan 038). Copy: COPY.md § 17. */

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
}

export function MarketingCompanies() {
  return (
    <MarketingShell current="companies">
      <main id="main-content">
        <PageHero
          current="companies"
          layout="relume-49"
          kicker="Company Transition Centers"
          title="Laid off from a company in the news? Start with its page."
          body="One page per company, built from the public record: what happened, with a source next to every figure, what to do this week, and what your state owes you. Nothing here is an estimate and nothing here is a promise."
          cta={false}
          footnote="Offboard has no relationship with any company listed. Each page says when it was last checked."
          aside={false}
        />
        <section className="mh-company-index mh-section" aria-labelledby="companies-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">Pages</span>
            <h2 id="companies-title">Six companies, newest first.</h2>
          </div>
          <ul className="mh-company-list" data-reveal="">
            {COMPANY_PAGES.map((company) => (
              <li key={company.slug}>
                <Link href={`/companies/${company.slug}`}>
                  <CompanyLogo company={company} size={44} />
                  <span className="mh-company-list-date">{formatDate(company.event_date)}</span>
                  <strong>{company.name}</strong>
                  <small>{company.summary}</small>
                  <span className="mh-nav-feature-cta">Open the {company.name} page <ArrowRight aria-hidden="true" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <FinalCta
          title="Start with what changed."
          body="Tell Offboard what happened and get a plan that covers the money, the benefits, and the search, in the order they actually matter."
        />
      </main>
    </MarketingShell>
  );
}

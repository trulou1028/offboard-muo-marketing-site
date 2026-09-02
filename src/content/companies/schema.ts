/* Company Transition Centers (plan 038). One committed JSON file per company.
   Every figure that reaches the page lives in `facts[]` with its source and
   the date it was checked, and CopyDrift asserts each `figure` also appears
   in COPY.md's per-page facts register. A number with no register row cannot
   ship, which is the whole point of the shape. */
export type CompanyFact = {
  /* Short label, e.g. "People affected" */
  label: string;
  /* The figure exactly as the source states it, e.g. "93 people, about 20%" */
  figure: string;
  /* One plain sentence of context, no adjectives about the company */
  detail?: string;
  source_name: string;
  source_url: string;
  /* ISO date the source was read */
  checked_on: string;
};

/* A company's own mark, self-hosted in public/marketing/companies/. Never a
   hotlink: a third-party request on every page load would be both a CDN
   dependency this repo does not take and a tracker on a site that just
   shipped a page about who can see your data. `wide` marks a horizontal
   wordmark rather than a square icon, so the tile can hold both. */
export type CompanyLogo = {
  src: string;
  source_name: string;
  source_url: string;
  checked_on: string;
  wide?: boolean;
};

export type CompanyState = "CA" | "WA" | "IL";

export type CompanyPage = {
  slug: string;
  name: string;
  /* The one-line record statement under the H1, in past tense, sourced */
  summary: string;
  /* The state of the affected site, which decides the benefits block */
  state: CompanyState;
  /* City of the affected site, from the WARN filing or the report */
  site: string;
  /* ISO date of the most recent event the page describes */
  event_date: string;
  /* null renders a monogram instead; no page waits on an asset. */
  logo: CompanyLogo | null;
  facts: readonly CompanyFact[];
  /* Reported severance terms, stated as reported, or null when no source states them */
  severance: { figure: string; source_name: string; source_url: string; checked_on: string } | null;
  /* ISO date the whole page was last re-verified; plan 038's 90-day rule keys off this */
  last_checked: string;
};

export const STATE_BENEFITS: Record<CompanyState, { name: string; agency: string; url: string }> = {
  CA: { name: "California", agency: "Employment Development Department (EDD)", url: "https://edd.ca.gov/en/unemployment/" },
  WA: { name: "Washington", agency: "Employment Security Department", url: "https://esd.wa.gov/unemployment" },
  IL: { name: "Illinois", agency: "Department of Employment Security (IDES)", url: "https://ides.illinois.gov/unemployment.html" },
};

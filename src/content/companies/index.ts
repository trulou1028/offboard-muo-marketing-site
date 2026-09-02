import type { CompanyPage } from "./schema";
import airtable from "./airtable.json";
import chime from "./chime.json";
import coursera from "./coursera.json";
import patreon from "./patreon.json";
import sproutSocial from "./sprout-social.json";
import zillow from "./zillow.json";

/* Newest event first. The index page and generateStaticParams read this;
   nothing else imports the JSON directly. */
export const COMPANY_PAGES: readonly CompanyPage[] = (
  [patreon, sproutSocial, chime, zillow, coursera, airtable] as CompanyPage[]
).sort((a, b) => (a.event_date < b.event_date ? 1 : -1));

export function getCompanyPage(slug: string): CompanyPage | undefined {
  return COMPANY_PAGES.find((page) => page.slug === slug);
}

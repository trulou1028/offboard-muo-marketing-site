import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarketingCompanyPage } from "@/components/marketing/homepage/MarketingCompanyPage";
import { COMPANY_PAGES, getCompanyPage } from "@/content/companies";
import { DEFERRED_ROBOTS } from "@/lib/launch";
import { marketingMetadata } from "@/lib/metadata";

/* Static: the pilot's content is committed JSON, so there is nothing to
   revalidate. When (if) the pages move to the CMS, this route takes the
   same ISR contract /resources/[slug] already carries. */
export function generateStaticParams() {
  return COMPANY_PAGES.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyPage(slug);
  // Deferred at launch with /companies itself (plan 043). Remove the two
  // `robots` lines to un-defer.
  if (!company) {
    return marketingMetadata({
      path: "/companies",
      title: "Company Transition Centers | Offboard",
      description:
        "One page per company that has just had a layoff, built from the public record: what happened, with a source next to every figure, what to do this week, and what your state owes you.",
      socialTitle: { parent: "Layoff Support", page: "Company Transition Centers" },
      robots: DEFERRED_ROBOTS,
    });
  }
  return marketingMetadata({
    path: `/companies/${slug}`,
    title: `Laid off from ${company.name}? Start here | Offboard`,
    description: company.summary,
    socialTitle: { parent: "Company Transition Center", page: company.name },
    robots: DEFERRED_ROBOTS,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = getCompanyPage(slug);
  if (!company) notFound();
  return <MarketingCompanyPage company={company} />;
}

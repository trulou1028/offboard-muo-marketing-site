import Image from "next/image";

import type { CompanyPage } from "@/content/companies/schema";

/* The company's own mark, self-hosted (plan 038, owner call 2026-09-01 that
   reversed the plan's original no-logos line). Two shapes are supported: a
   square app icon and a horizontal wordmark (`wide`), both contained rather
   than cropped, because cropping a trademark alters it. A company with no
   obtainable mark falls back to a monogram, so no page waits on an asset.

   Nominative use only: the mark identifies the company the page is about,
   sits at the same size as every other company's, and never appears next to
   a claim of partnership. The "no relationship" line is in the same block. */
export function CompanyLogo({ company, size = 56 }: { company: CompanyPage; size?: number }) {
  if (!company.logo) {
    return (
      <span className="mh-company-logo is-monogram" style={{ width: size, height: size }} aria-hidden="true">
        {company.name.charAt(0)}
      </span>
    );
  }
  return (
    <span
      className={`mh-company-logo${company.logo.wide ? " is-wide" : ""}`}
      style={{ width: company.logo.wide ? Math.round(size * 1.9) : size, height: size }}
    >
      <Image src={company.logo.src} alt={`${company.name} logo`} fill sizes={`${size * 2}px`} />
    </span>
  );
}

import type { Metadata } from "next";

export const SOCIAL_IMAGE = {
  url: "/marketing/social/offboard-social-card.jpg",
  width: 1200,
  height: 630,
  alt: "A woman sits cross-legged on her bed with a laptop at dusk, with the Offboard logo on the wall beside her.",
} as const;

type MarketingMetadataInput = {
  path: string;
  title: string;
  description: string;
  socialTitle: {
    parent: string;
    page: string;
  };
  robots?: Metadata["robots"];
  type?: "website" | "article";
};

/** Keep browser, Open Graph, and Twitter card copy in one route-owned object. */
export function marketingMetadata({
  path,
  title,
  description,
  socialTitle,
  robots,
  type = "website",
}: MarketingMetadataInput): Metadata {
  const cardTitle = `${socialTitle.parent} | ${socialTitle.page}`;

  return {
    alternates: { canonical: path },
    title,
    description,
    ...(robots === undefined ? {} : { robots }),
    openGraph: {
      type,
      siteName: "Offboard",
      url: path,
      title: cardTitle,
      description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: cardTitle,
      description,
      images: [{ url: SOCIAL_IMAGE.url, alt: SOCIAL_IMAGE.alt }],
    },
  };
}

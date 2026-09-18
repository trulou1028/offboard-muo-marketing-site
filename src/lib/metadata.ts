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
  robots?: Metadata["robots"];
  type?: "website" | "article";
};

/** Keep browser, Open Graph, and Twitter card copy in one route-owned object. */
export function marketingMetadata({
  path,
  title,
  description,
  robots,
  type = "website",
}: MarketingMetadataInput): Metadata {
  return {
    alternates: { canonical: path },
    title,
    description,
    ...(robots === undefined ? {} : { robots }),
    openGraph: {
      type,
      siteName: "Offboard",
      url: path,
      title,
      description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: SOCIAL_IMAGE.url, alt: SOCIAL_IMAGE.alt }],
    },
  };
}

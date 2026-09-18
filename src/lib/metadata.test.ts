import { describe, expect, it } from "vitest";

import { marketingMetadata, SOCIAL_IMAGE } from "./metadata";

describe("marketingMetadata", () => {
  it("keeps descriptions synchronized while giving social cards their own taxonomy title", () => {
    const metadata = marketingMetadata({
      path: "/pricing",
      title: "Pricing | Offboard",
      description: "Start free. Upgrade when you need more support.",
      socialTitle: { parent: "Product", page: "Pricing" },
    });

    expect(metadata.title).toBe("Pricing | Offboard");
    expect(metadata.description).toBe("Start free. Upgrade when you need more support.");
    expect(metadata.alternates).toEqual({ canonical: "/pricing" });
    expect(metadata.openGraph).toMatchObject({
      type: "website",
      siteName: "Offboard",
      url: "/pricing",
      title: "Product | Pricing",
      description: metadata.description,
      images: [SOCIAL_IMAGE],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Product | Pricing",
      description: metadata.description,
      images: [{ url: SOCIAL_IMAGE.url, alt: SOCIAL_IMAGE.alt }],
    });
  });

  it("preserves article and robots metadata", () => {
    const robots = { index: false, follow: true };
    const metadata = marketingMetadata({
      path: "/resources/example",
      title: "Example | Offboard",
      description: "Example description.",
      socialTitle: { parent: "Resources", page: "Example" },
      type: "article",
      robots,
    });

    expect(metadata.robots).toEqual(robots);
    expect(metadata.openGraph).toMatchObject({ type: "article" });
  });
});

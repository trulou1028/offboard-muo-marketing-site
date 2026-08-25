import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GuideArticle } from "@/components/marketing/resources/GuideArticle";
import { RenderBlocks } from "@/components/marketing/resources/RenderBlocks";
import { getPostBlocks } from "@/content/resources/blocks";
import { getResource, portedResources } from "@/content/resources/registry";

export function generateStaticParams() {
  return portedResources.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getResource(slug);
  if (!post || !post.ported) {
    return { title: "Guides & resources | Offboard", robots: "noindex, nofollow, noarchive" };
  }
  return {
    title: `${post.title} | Offboard`,
    description: post.excerpt,
    robots: "noindex, nofollow, noarchive",
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getResource(slug);
  const blocks = getPostBlocks(slug);

  if (!post || !post.ported || !blocks) {
    notFound();
  }

  return (
    <GuideArticle
      category={post.category}
      title={post.title}
      readingTime={post.readingTime}
      date={post.date}
      author={post.author}
      guestAuthor={post.guestAuthor}
    >
      <RenderBlocks blocks={blocks} />
    </GuideArticle>
  );
}

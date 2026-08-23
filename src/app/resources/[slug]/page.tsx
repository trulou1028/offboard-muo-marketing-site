import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GuideArticle } from "@/components/marketing/resources/GuideArticle";
import { getResource, portedResources } from "@/content/resources/registry";
import { postComponents } from "@/content/resources/posts";

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
  const Body = postComponents[slug];

  if (!post || !post.ported || !Body) {
    notFound();
  }

  return (
    <GuideArticle category={post.category} title={post.title} readingTime={post.readingTime} date={post.date} author={post.author}>
      <Body />
    </GuideArticle>
  );
}

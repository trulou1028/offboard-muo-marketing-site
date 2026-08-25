import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { GuideArticle } from "@/components/marketing/resources/GuideArticle";
import { RenderBlocks } from "@/components/marketing/resources/RenderBlocks";
import { getPostBySlug, getPublishedPosts } from "@/lib/content/posts";

// Publish becomes visible within 5 minutes without a redeploy (plan 016,
// docs/cms-architecture.md contract 1 / "Decisions" #2).
export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lookup = await getPostBySlug(slug);
  if (lookup.kind !== "published") {
    return { title: "Guides & resources | Offboard" };
  }
  return {
    title: `${lookup.post.title} | Offboard`,
    description: lookup.post.excerpt,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lookup = await getPostBySlug(slug);

  // Retired: a permanent redirect, not Next's default temporary one — see
  // docs/cms-architecture.md "Decisions" #3 for why permanentRedirect() (308)
  // is required here to preserve the 301 behavior next.config.ts's per-slug
  // entries provided before this route absorbed that logic.
  if (lookup.kind === "retired") {
    permanentRedirect("/resources");
  }

  // Unknown slug or a draft (see getPostBySlug's doc comment: the two are
  // deliberately indistinguishable here).
  if (lookup.kind === "not-found") {
    notFound();
  }

  const { post, body } = lookup;

  return (
    <GuideArticle
      category={post.category}
      title={post.title}
      readingTime={post.readingTime}
      date={post.date}
      author={post.author}
      guestAuthor={post.guestAuthor}
    >
      <RenderBlocks blocks={body} />
    </GuideArticle>
  );
}

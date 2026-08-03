import type { Metadata } from "next";
import { fetchBlogPosts, fetchBlogPost } from "@/lib/blog";
import PostRoute from "./post-route";

export async function generateStaticParams() {
  try {
    const posts = await fetchBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await fetchBlogPost(slug);
    if (post) {
      return {
        title: `${post.title} | H3l!0s_T3k`,
        description: post.description,
        openGraph: {
          title: post.title,
          description: post.description,
          type: "article",
        },
      };
    }
  } catch {
    // fall through
  }
  return { title: "H3l!0s_T3k" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PostRoute slug={slug} />;
}

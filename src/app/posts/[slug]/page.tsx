import type { Metadata } from "next";
import { fetchBlogPosts, fetchBlogPost } from "@/lib/blog";
import PostRoute from "./post-route";

const SITE_URL = "https://ismail-benali.github.io";
const AUTHOR_NAME = "Ismail Benali";
const DISPLAY_NAME = "H3l0s_T3k";

export async function generateStaticParams() {
  try {
    const posts = await fetchBlogPosts();
    const slugs = posts.map((post) => ({ slug: post.slug }));
    if (slugs.length === 0) {
      return [{ slug: "interpol-2026-report-ai-africa-cybercrime" }];
    }
    return slugs;
  } catch {
    return [{ slug: "interpol-2026-report-ai-africa-cybercrime" }];
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
      const url = `${SITE_URL}/posts/${slug}`;
      return {
        title: `${post.title} | ${DISPLAY_NAME}`,
        description: post.description,
        alternates: { canonical: url },
        openGraph: {
          title: post.title,
          description: post.description,
          url,
          type: "article",
          publishedTime: post.date || undefined,
          authors: [AUTHOR_NAME],
          siteName: `${AUTHOR_NAME} (${DISPLAY_NAME})`,
          images: post.coverImage ? [{ url: post.coverImage, alt: post.title }] : [],
        },
        twitter: {
          card: "summary",
          title: post.title,
          description: post.description,
        },
      };
    }
  } catch {
    // fall through
  }
  return { title: DISPLAY_NAME };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let articleJsonLd: object | null = null;
  try {
    const post = await fetchBlogPost(slug);
    if (post) {
      articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        datePublished: post.date || undefined,
        author: {
          "@type": "Person",
          name: AUTHOR_NAME,
          alternateName: DISPLAY_NAME,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Person",
          name: AUTHOR_NAME,
        },
        url: `${SITE_URL}/posts/${slug}`,
        image: post.coverImage || undefined,
        keywords: post.tags.join(", "),
      };
    }
  } catch {
    // fall through
  }

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      <PostRoute slug={slug} />
    </>
  );
}

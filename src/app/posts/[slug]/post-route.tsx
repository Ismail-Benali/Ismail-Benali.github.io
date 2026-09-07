"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogPostPage } from "@/components/blog-post-page";
import { ReadingProgress } from "@/components/reading-progress";

export default function PostRoute({ slug }: { slug: string }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ReadingProgress />
      <Navbar />
      <main className="flex-1">
        <BlogPostPage slug={slug} onBack={() => (window.location.href = "/blog")} />
      </main>
      <Footer />
    </div>
  );
}
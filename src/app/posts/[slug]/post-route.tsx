"use client";

import type { PageView } from "@/components/navbar";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogPostPage } from "@/components/blog-post-page";

export default function PostRoute({ slug }: { slug: string }) {
  const navigate = (page: PageView, href?: string) => {
    if (page === "blog") {
      window.location.href = "/";
    } else if (href && href.startsWith("#")) {
      window.location.href = `/${href}`;
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView="post" onNavigate={navigate} />
      <main className="flex-1">
        <BlogPostPage slug={slug} onBack={() => (window.location.href = "/")} />
      </main>
      <Footer />
    </div>
  );
}

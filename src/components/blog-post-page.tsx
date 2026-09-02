"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Image as ImageIcon,
  Loader2,
  Share2,
  Copy,
  Check,
  Tag,
  X,
  MessageSquare,
  Send,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import { fetchBlogPost, type BlogPostFull } from "@/lib/blog";
import { useToast } from "@/hooks/use-toast";

export function BlogPostPage({
  slug,
  onBack,
}: {
  slug: string;
  onBack?: () => void;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPostFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [views, setViews] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    async function loadPost() {
      try {
        const data = await fetchBlogPost(slug);
        setPost(data);

        // Simulated & LocalStorage view count
        if (data) {
          const storageKey = `post_views_${slug}`;
          let currentViews = parseInt(localStorage.getItem(storageKey) || "0", 10);
          if (currentViews === 0) {
            // Generate deterministic base views from slug length + random 120-450
            currentViews = Math.floor(slug.length * 45 + 180);
          }
          currentViews += 1; // Increment on visit
          localStorage.setItem(storageKey, currentViews.toString());
          setViews(currentViews);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  const handleBack = onBack ?? (() => router.back());

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({
      title: "Link Copied!",
      description: "Article link copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(post?.title || "Check out this article");
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`${post?.title} - ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <p className="text-muted-foreground text-lg mb-4">Post not found.</p>
        <Button variant="outline" onClick={handleBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 flex items-center justify-between"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>

          {/* Quick Share Buttons */}
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={handleCopyLink}
              title="Copy Link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={shareOnTwitter}
              title="Share on X / Twitter"
            >
              <Twitter className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={shareOnLinkedIn}
              title="Share on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </Button>
          </div>
        </motion.div>

        {/* Meta */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-mono bg-primary/5 text-primary border-primary/20"
              >
                <Tag className="w-2.5 h-2.5 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            {post.date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary/70" />
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary/70" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-primary/70" />
              <span>{views > 0 ? `${views} views` : "Loading..."}</span>
            </div>
          </div>
        </motion.div>

        <Separator className="mb-8 bg-border/50" />

        {/* Cover image */}
        {post.coverImage && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mb-8 rounded-xl overflow-hidden border border-border/50 shadow-lg shadow-primary/5"
          >
            <img
              src={post.coverImage}
              alt={`Cover - ${post.title}`}
              className="w-full object-cover max-h-[400px] cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              onClick={() => setLightboxImg(post.coverImage)}
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-sm sm:prose-base max-w-none
            prose-headings:text-foreground prose-headings:font-semibold
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
            prose-pre:bg-secondary prose-pre:border prose-pre:border-border
            prose-blockquote:border-primary prose-blockquote:text-muted-foreground
            prose-li:text-muted-foreground
            prose-table:border-border prose-th:border-border prose-td:border-border
            prose-hr:border-border
            prose-img:rounded-lg prose-img:cursor-pointer prose-img:hover:opacity-90"
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </motion.div>

        {/* Post images gallery */}
        {post.images.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <Separator className="mb-8 bg-border/50" />
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              Gallery Images
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {post.images.map((img, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden border border-border/50 cursor-pointer hover:border-primary/40 transition-colors group shadow-md"
                  onClick={() => setLightboxImg(img)}
                >
                  <img
                    src={img}
                    alt={`Image ${i + 1} - ${post.title}`}
                    className="w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Share & Author Card Footer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-16"
        >
          <Separator className="mb-8 bg-border/50" />
          
          <div className="bg-card border border-border/60 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-primary/5">
            <div>
              <h4 className="font-semibold text-foreground text-lg mb-1">Enjoyed this article?</h4>
              <p className="text-sm text-muted-foreground">Share it with your network or fellow developers.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyLink} className="gap-2">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy Link"}
              </Button>
              <Button variant="outline" size="sm" onClick={shareOnTwitter} className="gap-2">
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>
              <Button variant="outline" size="sm" onClick={shareOnLinkedIn} className="gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
              <Button variant="outline" size="sm" onClick={shareOnWhatsApp} className="gap-2">
                <Send className="w-4 h-4" />
                WhatsApp
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-card/80 border border-border hover:bg-card transition-colors"
            onClick={() => setLightboxImg(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={lightboxImg}
            alt="Full view"
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </div>
  );
}

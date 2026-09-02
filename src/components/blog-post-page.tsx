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
  Copy,
  Check,
  Tag,
  X,
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
            currentViews = Math.floor(slug.length * 45 + 180);
          }
          currentViews += 1;
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
    <div className="min-h-screen pt-24 pb-24">
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
                className="text-xs font-mono bg-primary/10 text-primary border-primary/20 px-2.5 py-0.5"
              >
                <Tag className="w-3 h-3 mr-1.5" />
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight text-foreground">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-4 border-b border-border/50">
            {post.date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-medium">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-medium">{post.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <span className="font-medium">{views > 0 ? `${views} views` : "Loading..."}</span>
            </div>
          </div>
        </motion.div>

        {/* Cover image */}
        {post.coverImage && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mb-10 rounded-2xl overflow-hidden border border-border/60 shadow-2xl shadow-primary/10"
          >
            <img
              src={post.coverImage}
              alt={`Cover - ${post.title}`}
              className="w-full object-cover max-h-[450px] cursor-pointer hover:scale-[1.01] transition-transform duration-500"
              onClick={() => setLightboxImg(post.coverImage)}
            />
          </motion.div>
        )}

        {/* Content with Enhanced Typography */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="markdown-content"
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </motion.div>

        {/* Post images gallery */}
        {post.images.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <Separator className="mb-8 bg-border/50" />
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
              <ImageIcon className="w-6 h-6 text-primary" />
              Gallery Images
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {post.images.map((img, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-border/60 cursor-pointer hover:border-primary/50 transition-colors group shadow-lg"
                  onClick={() => setLightboxImg(img)}
                >
                  <img
                    src={img}
                    alt={`Image ${i + 1} - ${post.title}`}
                    className="w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500"
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
          className="mt-20"
        >
          <Separator className="mb-10 bg-border/50" />
          
          <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-primary/10">
            <div>
              <h4 className="font-bold text-foreground text-xl mb-2">Enjoyed this article?</h4>
              <p className="text-muted-foreground text-base">Share it with your network or fellow developers.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" onClick={handleCopyLink} className="gap-2 font-medium">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy Link"}
              </Button>
              <Button variant="outline" onClick={shareOnTwitter} className="gap-2 font-medium">
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>
              <Button variant="outline" onClick={shareOnLinkedIn} className="gap-2 font-medium">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
              <Button variant="outline" onClick={shareOnWhatsApp} className="gap-2 font-medium">
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
            className="absolute top-4 right-4 p-2.5 rounded-full bg-card/80 border border-border hover:bg-card transition-colors"
            onClick={() => setLightboxImg(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={lightboxImg}
            alt="Full view"
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </div>
  );
}

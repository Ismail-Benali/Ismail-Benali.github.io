"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Github,
  Mail,
  ExternalLink,
  Shield,
  Code2,
  Bot,
  ScanSearch,
  ChevronDown,
  Star,
  GitFork,
  FolderGit2,
  Zap,
  Globe,
  Lock,
  Cpu,
  Terminal,
  BookOpen,
  Calendar,
  Clock,
  Eye,
  ArrowLeft,
  ArrowRight,
  Tag,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar, type PageView } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { fetchBlogPosts, type BlogPostMeta as BlogPostListItem } from "@/lib/blog";
import { InteractiveTerminal } from "@/components/terminal";

const PROJECTS = [
  {
    name: "HELIOS-NET",
    description:
      "A sovereign, self-sufficient cyber warfare and offensive reconnaissance framework. Polyglot core (Python orchestration, Go networking, C low-level evasion) with autonomous daemons, encrypted transactional WAL, kill-chain pathfinding, mutation engine, and pivot proxy — no external dependencies.",
    tech: ["Python", "Go", "C", "Stealth", "Autonomous"],
    icon: Shield,
    stars: null,
    url: "https://github.com/Ismail-Benali/HELIOS-NET",
  },
  {
    name: "InstaSneak",
    description:
      "A powerful Instagram OSINT tool for gathering publicly available information and analyzing social media profiles ethically.",
    tech: ["Python", "OSINT", "API"],
    icon: ScanSearch,
    stars: null,
    url: "https://github.com/Ismail-Benali/InstaSneak",
  },
  {
    name: "InfoMagnet-X",
    description:
      "An information gathering and reconnaissance tool that helps security researchers collect data for authorized penetration testing.",
    tech: ["Python", "Info Gathering", "Security"],
    icon: Zap,
    stars: null,
    url: "https://github.com/Ismail-Benali/InfoMagnet-X",
  },
  {
    name: "KuraiBot",
    description:
      "An advanced Discord bot featuring moderation, automation, and security tools to help communities stay safe and well-managed.",
    tech: ["Python", "Discord API", "Security"],
    icon: Bot,
    stars: null,
    url: "https://github.com/Ismail-Benali/KuraiBot",
  },
  {
    name: "NatsuMacTool",
    description:
      "A comprehensive macOS utility toolkit designed for system optimization, security auditing, and performance enhancement.",
    tech: ["Python", "macOS", "Security"],
    icon: Cpu,
    stars: null,
    url: "https://github.com/Ismail-Benali/NatsuMacTool",
  },
];

const SKILLS = [
  { name: "Python", category: "Language", icon: Terminal },
  { name: "Bash / Shell", category: "Scripting", icon: Terminal },
  { name: "Cybersecurity", category: "Security", icon: Shield },
  { name: "OSINT & Recon", category: "Recon", icon: ScanSearch },
  { name: "Wireshark", category: "Analysis", icon: Globe },
  { name: "Burp Suite", category: "Web Security", icon: Lock },
  { name: "REST APIs", category: "Backend", icon: Code2 },
  { name: "Linux / UNIX", category: "Systems", icon: Terminal },
  { name: "Git & GitHub", category: "DevOps", icon: FolderGit2 },
  { name: "Docker", category: "DevOps", icon: Cpu },
  { name: "Network Security", category: "Security", icon: Shield },
  { name: "TypeScript", category: "Language", icon: Code2 },
];

const TYPING_WORDS = [
  "Offensive Security Researcher",
  "OSINT Expert",
  "Polyglot Engineer",
  "Security Researcher",
  "Sovereign Tool Builder",
];

/* ──────────────────────── Components ──────────────────────── */

function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const typingRef = useRef({ wordIndex: 0, isDeleting: false, timeout: null as ReturnType<typeof setTimeout> | null });

  useEffect(() => {
    const ref = typingRef.current;
    const tick = () => {
      const currentWord = TYPING_WORDS[ref.wordIndex];
      const speed = ref.isDeleting ? 40 : 80;

      if (!ref.isDeleting && displayText === currentWord) {
        ref.timeout = setTimeout(() => {
          ref.isDeleting = true;
          const next = currentWord.substring(0, displayText.length - 1);
          setDisplayText(next);
        }, 2000);
        return;
      }
      if (ref.isDeleting && displayText === "") {
        ref.isDeleting = false;
        ref.wordIndex = (ref.wordIndex + 1) % TYPING_WORDS.length;
        const next = TYPING_WORDS[ref.wordIndex].substring(0, 1);
        setDisplayText(next);
        return;
      }

      ref.timeout = setTimeout(() => {
        const word = TYPING_WORDS[ref.wordIndex];
        const next = ref.isDeleting
          ? word.substring(0, displayText.length - 1)
          : word.substring(0, displayText.length + 1);
        setDisplayText(next);
      }, speed);
    };

    tick();
    return () => {
      if (ref.timeout) clearTimeout(ref.timeout);
    };
  }, [displayText]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden grid-bg"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-primary/30 to-cyan-500/20 p-1">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                <img
                  src="https://avatars.githubusercontent.com/u/90980178?v=4"
                  alt="H3l!0s_T3k"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-ring" />
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-tight flex items-baseline justify-center flex-wrap gap-2 sm:gap-3">
            <span className="text-gradient">H3l!0s_T3k</span>
            <span className="text-base sm:text-lg md:text-2xl text-muted-foreground font-mono font-normal">(Ismail-Benali)</span>
          </h1>
        </motion.div>

        {/* Typing effect */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 h-8"
        >
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-mono">
            <span className="text-primary">&gt;</span>{" "}
            {displayText}
            <span className="text-primary animate-blink">|</span>
          </p>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Offensive security researcher and OSINT expert building sovereign,
          self-sufficient tools that push the boundaries of what open-source
          can do. Creator of HELIOS-NET.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#projects">
            <Button size="lg" className="gap-2 px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
              <FolderGit2 className="w-4 h-4" />
              View Projects
            </Button>
          </a>
          <a href="https://github.com/Ismail-Benali" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="gap-2 px-8">
              <Github className="w-4 h-4" />
              GitHub Profile
            </Button>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: Shield,
      title: "Security Research",
      desc: "Deep focus on offensive security, low-level evasion, and building autonomous reconnaissance frameworks that operate with zero external dependencies.",
    },
    {
      icon: ScanSearch,
      title: "OSINT & Recon",
      desc: "Expert in open-source intelligence gathering and network reconnaissance, crafting ethical tools that surface publicly available information.",
    },
    {
      icon: Code2,
      title: "Polyglot Engineering",
      desc: "Architecting across Python, Go, and C — orchestration, high-performance networking, and kernel-adjacent stealth that few frameworks combine.",
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
            <Globe className="w-3 h-3 mr-1" />
            About Me
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Driven by <span className="text-gradient">Sovereignty</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            I am an offensive security researcher and OSINT expert who builds
            self-sufficient tooling that depends on nothing but itself. From
            HELIOS-NET&apos;s polyglot core — Python orchestration, Go
            networking, C low-level evasion — to social intelligence
            frameworks, my work focuses on sovereign systems that stand alone,
            move undetected, and give researchers full control over the stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <project.icon className="w-5 h-5 text-primary" />
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {project.name}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="text-xs font-mono bg-primary/5 text-primary border-primary/20"
                >
                  {t}
                </Badge>
              ))}
            </div>

            {/* Footer */}
            <Separator className="mb-3 bg-border/50" />
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                <span>Stars</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-3 h-3" />
                <span>Forks</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Open Source</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
}

function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 sm:py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
            <FolderGit2 className="w-3 h-3 mr-1" />
            Projects
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A collection of open-source tools and projects built with passion
            for security, automation, and developer experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

        {/* View all on GitHub */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Ismail-Benali?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2">
              <Github className="w-4 h-4" />
              View All Repositories
              <ExternalLink className="w-3 h-3" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────── Blog Preview (Home) ──────────────────────── */

function BlogPreviewSection({
  onViewAll,
}: {
  onViewAll: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [viewsMap, setViewsMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchBlogPosts();
        setPosts(data.slice(0, 4));
        const vMap: Record<string, number> = {};
        data.forEach((p) => {
          const key = `post_views_${p.slug}`;
          let v = parseInt(localStorage.getItem(key) || "0", 10);
          if (v === 0) {
            v = Math.floor(p.slug.length * 45 + 180);
          }
          vMap[p.slug] = v;
        });
        setViewsMap(vMap);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <section id="blog" className="py-20 sm:py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
            <BookOpen className="w-3 h-3 mr-1" />
            Blog
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Latest <span className="text-gradient">Articles</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Thoughts, tutorials, and insights on cybersecurity, open-source
            development, and technology.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No posts yet. Stay tuned!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {posts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ y: 30, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={`/posts/${post.slug}`}
                    className="block h-full"
                  >
                    <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer group overflow-hidden">
                      {/* Cover image */}
                    <div className="relative aspect-video overflow-hidden bg-muted/30 flex items-center justify-center">
                      {post.coverImage ? (
                        <>
                          <div 
                            className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-30 scale-110"
                            style={{ backgroundImage: `url(${post.coverImage})` }}
                          />
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-cyan-500/5 flex items-center justify-center">
                          <BookOpen className="w-10 h-10 text-primary/20" />
                        </div>
                      )}
                      {post.images.length > 0 && (
                        <div className="absolute bottom-2 right-2 z-20">
                          <Badge className="bg-background/80 backdrop-blur-sm text-foreground text-[10px] gap-1">
                            <ImageIcon className="w-2.5 h-2.5" />
                            {post.images.length}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4">
                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2.5">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-[10px] font-mono bg-primary/5 text-primary border-primary/20 px-1.5"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-sm font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
                        {post.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <div className="flex items-center gap-2">
                          {post.date && (
                            <span>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}
                          <div className="flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            <span>{post.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-2.5 h-2.5" />
                            <span>{viewsMap[post.slug] || 245}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                      </div>
                    </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* View All button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-12"
            >
              <Button
                variant="outline"
                className="gap-2"
                onClick={onViewAll}
              >
                <BookOpen className="w-4 h-4" />
                View All Articles
                <ArrowRight className="w-3 h-3" />
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

/* ──────────────────────── Blog Page ──────────────────────── */

function BlogPage({ onBack }: { onBack: () => void }) {
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchBlogPosts();
        setPosts(data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="gap-2 text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary" className="text-primary border-primary/30">
              <BookOpen className="w-3 h-3 mr-1" />
              Blog
            </Badge>
            <span className="text-sm text-muted-foreground font-mono">
              {posts.length} post{posts.length !== 1 ? "s" : ""}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Latest <span className="text-gradient">Articles</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-6">
            Thoughts, tutorials, and insights on cybersecurity, open-source
            development, and technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <input
              type="text"
              placeholder="Search articles by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card border border-border/80 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary w-full sm:max-w-md text-foreground placeholder:text-muted-foreground/60"
            />
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                <Badge
                  variant={selectedTag === null ? "default" : "secondary"}
                  className="cursor-pointer text-xs font-mono"
                  onClick={() => setSelectedTag(null)}
                >
                  All
                </Badge>
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "secondary"}
                    className="cursor-pointer text-xs font-mono"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Featured / Latest Post (only shown if no active search/filter) */}
        {!loading && !searchQuery && !selectedTag && filteredPosts.length > 0 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <Link
              href={`/posts/${filteredPosts[0].slug}`}
              className="block"
            >
              <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer group overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Cover image */}
                <div className="relative aspect-video md:aspect-auto overflow-hidden bg-muted/30 flex items-center justify-center min-h-[250px]">
                  {filteredPosts[0].coverImage ? (
                    <>
                      <div 
                        className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-30 scale-110"
                        style={{ backgroundImage: `url(${filteredPosts[0].coverImage})` }}
                      />
                      <img
                        src={filteredPosts[0].coverImage}
                        alt={filteredPosts[0].title}
                        className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-primary/20" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 z-20">
                    <Badge className="bg-primary text-primary-foreground text-xs font-mono">
                      Latest
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {filteredPosts[0].tags.map((tag) => (
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
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {filteredPosts[0].description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {filteredPosts[0].date && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {new Date(filteredPosts[0].date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{filteredPosts[0].readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </div>
              </Card>
              </Link>
          </motion.div>
        )}

        {/* Posts Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No matching articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.slice(!searchQuery && !selectedTag ? 1 : 0).map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="block h-full"
                >
                  <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer group overflow-hidden">
                  {/* Card cover image */}
                  <div className="relative aspect-video overflow-hidden bg-muted/30 flex items-center justify-center">
                    {post.coverImage ? (
                      <>
                        <div 
                          className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-30 scale-110"
                          style={{ backgroundImage: `url(${post.coverImage})` }}
                        />
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="relative z-10 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-cyan-500/5 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-primary/20" />
                      </div>
                    )}
                    {post.images.length > 0 && (
                      <div className="absolute bottom-2 right-2 z-20">
                        <Badge className="bg-background/80 backdrop-blur-sm text-foreground text-[10px] gap-1">
                          <ImageIcon className="w-2.5 h-2.5" />
                          {post.images.length}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-5">
                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-[10px] font-mono bg-primary/5 text-primary border-primary/20 px-1.5"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">
                      {post.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        {post.date && (
                          <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    </div>
                  </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* GitHub source */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Ismail-Benali/Ismail-Benali.github.io/tree/main/content/blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2">
              <Github className="w-4 h-4" />
              View Source on GitHub
              <ExternalLink className="w-3 h-3" />
            </Button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}


function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 sm:py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
            <Zap className="w-3 h-3 mr-1" />
            Skills & Tools
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Technologies, frameworks, and security tools I work with on a daily basis.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {SKILLS.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group cursor-default">
                <CardContent className="p-4 sm:p-5 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <skill.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-xs text-muted-foreground font-mono">
                      {skill.category}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-20 sm:py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
            <Mail className="w-3 h-3 mr-1" />
            Contact
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-12 leading-relaxed">
            Interested in collaborating on a project, discussing cybersecurity,
            or just want to chat about technology? Feel free to reach out!
          </p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="https://github.com/Ismail-Benali"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="gap-3 px-8 hover:border-primary/50 hover:bg-primary/5"
              >
                <Github className="w-5 h-5" />
                GitHub
                <ExternalLink className="w-3 h-3 opacity-50" />
              </Button>
            </a>
            <a href="mailto:ismail.benali@proton.me">
              <Button
                size="lg"
                variant="outline"
                className="gap-3 px-8 hover:border-primary/50 hover:bg-primary/5"
              >
                <Mail className="w-5 h-5" />
                Email Me
                <ExternalLink className="w-3 h-3 opacity-50" />
              </Button>
            </a>
          </motion.div>

          {/* Interactive Terminal Widget */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 max-w-xl mx-auto text-left"
          >
            <InteractiveTerminal />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CurrentlyLearningSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const learningItems = [
    {
      icon: Lock,
      title: "Zero-Day Offensive Research",
      desc: "Kernel-adjacent evasion, direct syscalls, and protocol-level exploitation that operate under the radar of modern defenses.",
    },
    {
      icon: Cpu,
      title: "Autonomous Agent Networks",
      desc: "Self-spawning daemons, encrypted transactional WAL, and adaptive learning for frameworks that sustain operations without human supervision.",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
          ref={ref}
        >
          <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
            <BookOpen className="w-3 h-3 mr-1" />
            Continuous Growth
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Currently <span className="text-gradient">Learning</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Exploring cutting-edge topics to stay ahead in cybersecurity and software engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {learningItems.map((item, idx) => (
            <Card key={idx} className="bg-card/50 border-border/50 hover:border-primary/40 transition-all duration-300">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function GitHubStatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "Flagship Project", value: "HELIOS-NET", icon: Shield, href: "https://github.com/Ismail-Benali/HELIOS-NET" },
    { label: "Focus", value: "Security & OSINT", icon: ScanSearch, href: "https://github.com/Ismail-Benali" },
    { label: "Repositories", value: "Open Source", icon: FolderGit2, href: "https://github.com/Ismail-Benali?tab=repositories" },
    { label: "Core Stack", value: "Python / Go / C", icon: Terminal, href: "https://github.com/Ismail-Benali" },
  ];

  const languages = ["Python", "Go", "C", "TypeScript", "Shell", "Markdown", "Git"];

  return (
    <section className="py-16 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-xl font-bold mb-2 text-foreground">GitHub Activity & Ecosystem</h3>
          <p className="text-sm text-muted-foreground">Active open-source contributor and tool developer.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <a key={idx} href={stat.href} target="_blank" rel="noopener noreferrer" className="block">
              <Card className="bg-card/50 border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group h-full">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block font-mono">{stat.label}</span>
                    <span className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors">{stat.value}</span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="bg-card/30 border border-border/40 rounded-2xl p-6 text-center">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">Top Tech Stack & Languages</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {languages.map((lang) => (
              <Badge key={lang} variant="secondary" className="text-xs font-mono bg-primary/10 text-primary border-primary/20 px-3 py-1">
                {lang}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── Main Page ──────────────────────── */

export default function Home() {
  const [view, setView] = useState<PageView>("home");

  const navigate = (newView: PageView) => {
    setView(newView);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={view} onNavigate={navigate} />
      {view === "home" && (
        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <GitHubStatsSection />
          <BlogPreviewSection onViewAll={() => navigate("blog")} />
          <SkillsSection />
          <CurrentlyLearningSection />
          <ContactSection />
        </main>
      )}
      {view === "blog" && <BlogPage onBack={() => navigate("home")} />}
      <Footer />
    </div>
  );
}

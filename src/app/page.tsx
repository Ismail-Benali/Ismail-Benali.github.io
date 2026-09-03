"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Github,
  Mail,
  ExternalLink,
  Shield,
  Code2,
  ScanSearch,
  ChevronDown,
  GitFork,
  FolderGit2,
  Lock,
  Cpu,
  Terminal,
  Brain,
  Network,
  BookOpen,
  Clock,
  Eye,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Loader2,
  Tag,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar, type PageView } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useI18n } from "@/lib/i18n";
import { fetchBlogPosts, type BlogPostMeta as BlogPostListItem } from "@/lib/blog";
import Link from "next/link";

const PROJECTS = [
  {
    name: "HELIOS-NET",
    description:
      "Sovereign cyber warfare & offensive reconnaissance framework. Python orchestration, Go networking, C evasion.",
    tech: ["Python", "Go", "C", "Stealth"],
    icon: Shield,
    url: "https://github.com/Ismail-Benali/HELIOS-NET",
  },
  {
    name: "InstaSneak",
    description:
      "Instagram OSINT tool for surface publicly-available profile intelligence.",
    tech: ["Python", "OSINT", "API"],
    icon: ScanSearch,
    url: "https://github.com/Ismail-Benali/InstaSneak",
  },
  {
    name: "InfoMagnet-X",
    description:
      "Information gathering & recon for authorized penetration testing.",
    tech: ["Python", "Recon", "Security"],
    icon: Network,
    url: "https://github.com/Ismail-Benali/InfoMagnet-X",
  },
];

const ARSENAL = [
  {
    icon: Brain,
    title: "orchestration",
    code: "core/",
    desc: "Planner, state, encrypted transactional WAL, autonomous daemons, mutation engine, pivot proxy.",
  },
  {
    icon: Network,
    title: "engine",
    code: "engine/",
    desc: "kill-chain pathfinding, fingerprinting, pattern matching, adaptive learning, verdict.",
  },
  {
    icon: Terminal,
    title: "modules",
    code: "modules/",
    desc: "service discovery, DNS resolve, fingerprint recon, stealth pacing, exfil collector.",
  },
  {
    icon: Cpu,
    title: "transport",
    code: "transport/",
    desc: "Native binaries — Go networking, C low-level evasion, direct syscalls, kernel filter.",
  },
];

const SKILLS = [
  { name: "Python", category: "orchestration", icon: Code2 },
  { name: "Go", category: "networking", icon: Network },
  { name: "C", category: "low-level", icon: Cpu },
  { name: "OSINT", category: "recon", icon: ScanSearch },
  { name: "Offensive Security", category: "adversary", icon: Shield },
  { name: "Network Analysis", category: "wire", icon: Network },
  { name: "Linux", category: "systems", icon: Terminal },
  { name: "Git / GitHub", category: "devops", icon: FolderGit2 },
];

const TYPING_ROLES = ["hero_role_1", "hero_role_2", "hero_role_3"];

/* ──────────────────────── Components ──────────────────────── */

function HeroSection() {
  const { t } = useI18n();
  const [displayText, setDisplayText] = useState("");
  const typingRef = useRef({
    wordIndex: 0,
    isDeleting: false,
    timeout: null as ReturnType<typeof setTimeout> | null,
  });

  useEffect(() => {
    const ref = typingRef.current;
    const tick = () => {
      const currentWord = t(TYPING_ROLES[ref.wordIndex]);
      const speed = ref.isDeleting ? 35 : 70;

      if (!ref.isDeleting && displayText === currentWord) {
        ref.timeout = setTimeout(() => {
          ref.isDeleting = true;
          setDisplayText(currentWord.substring(0, Math.max(0, currentWord.length - 1)));
        }, 1600);
        return;
      }
      if (ref.isDeleting && displayText === "") {
        ref.isDeleting = false;
        ref.wordIndex = (ref.wordIndex + 1) % TYPING_ROLES.length;
        setDisplayText(t(TYPING_ROLES[ref.wordIndex]).substring(0, 1));
        return;
      }

      ref.timeout = setTimeout(() => {
        const current = t(TYPING_ROLES[ref.wordIndex]);
        const next = ref.isDeleting
          ? current.substring(0, Math.max(0, displayText.length - 1))
          : current.substring(0, displayText.length + 1);
        setDisplayText(next);
      }, speed);
    };

    tick();
    return () => {
      if (ref.timeout) clearTimeout(ref.timeout);
    };
  }, [displayText, t]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden grid-bg"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Terminal prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="font-mono text-sm text-muted-foreground">
            <span className="text-terminal font-bold">{t("hero_prompt")}</span>
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-tight flex items-baseline justify-center flex-wrap gap-2 sm:gap-3">
            <span className="text-primary">H3l!0s_T3k</span>
            <span className="text-base sm:text-lg md:text-2xl text-muted-foreground font-mono font-normal">
              (Ismail-Benali)
            </span>
          </h1>
        </motion.div>

        {/* Typing role */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 h-8"
        >
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-mono">
            <span className="text-primary">&gt;</span> {displayText}
            <span className="text-primary animate-blink">|</span>
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed font-mono"
        >
          {t("hero_tagline")}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#arsenal">
            <Button size="lg" className="gap-2 px-8 font-mono bg-primary text-primary-foreground hover:bg-primary/90">
              <Shield className="w-4 h-4" />
              {t("hero_btn_projects")}
            </Button>
          </a>
          <a href="https://github.com/Ismail-Benali" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="gap-2 px-8 font-mono">
              <Github className="w-4 h-4" />
              {t("hero_btn_github")}
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
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeader({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  return (
    <div className="text-center mb-16">
      <Badge variant="secondary" className="mb-4 text-primary border-primary/30 font-mono">
        {tag}
      </Badge>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-mono">{title}</h2>
      {sub && <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-mono">{sub}</p>}
    </div>
  );
}

function AboutSection() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { icon: Shield, title: t("highlight_1_t"), desc: t("highlight_1_d") },
    { icon: ScanSearch, title: t("highlight_2_t"), desc: t("highlight_2_d") },
    { icon: Code2, title: t("highlight_3_t"), desc: t("highlight_3_d") },
  ];

  return (
    <section id="about" className="py-20 sm:py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-primary border-primary/30 font-mono">
            {t("sec_about")}
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-muted-foreground">$</span> <span className="text-gradient">{t("about_title")}</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed font-mono">
            {t("about_body")}
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
              <Card className="h-full bg-card/50 border-border/50 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group terminal-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 font-mono text-terminal">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-mono">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArsenalSection() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="arsenal" className="py-20 sm:py-32 relative grid-bg" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader tag={t("sec_arsenal")} title={t("arsenal_title")} sub={t("arsenal_sub")} />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARSENAL.map((item, index) => (
            <motion.div
              key={item.code}
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group terminal-border">
                <CardContent className="p-6">
                  <div className="text-xs text-primary/70 font-mono mb-3">
                    <span className="text-muted-foreground">$</span> ls {item.code}
                  </div>
                  <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-terminal font-mono">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-mono">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a href="https://github.com/Ismail-Benali/HELIOS-NET" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2 font-mono">
              <Terminal className="w-4 h-4" />
              {t("arsenal_cta")}
              <ExternalLink className="w-3 h-3" />
            </Button>
          </a>
        </motion.div>
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
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="block group">
        <Card className="h-full bg-card/50 border-border/50 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 terminal-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <project.icon className="w-5 h-5 text-primary" />
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors font-mono">
              {project.name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 font-mono">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tItem) => (
                <Badge
                  key={tItem}
                  variant="secondary"
                  className="text-xs font-mono bg-primary/5 text-primary border-primary/30"
                >
                  {tItem}
                </Badge>
              ))}
            </div>
            <Separator className="mb-3 bg-border/50" />
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
              <div className="flex items-center gap-1">
                <GitFork className="w-3 h-3" />
                <span>open</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>source</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
}

function ProjectsSection() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 sm:py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader tag={t("sec_projects")} title={t("projects_title")} sub={t("projects_sub")} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a href="https://github.com/Ismail-Benali?tab=repositories" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2 font-mono">
              <Github className="w-4 h-4" />
              $ ls ~/repos --all
              <ExternalLink className="w-3 h-3" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function BlogPreviewSection({ onViewAll }: { onViewAll: () => void }) {
  const { t } = useI18n();
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
        >
          <SectionHeader tag={t("sec_blog")} title={t("blog_title")} sub={t("blog_sub")} />
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-mono">{t("blog_no_posts")}</p>
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
                  <Link href={`/posts/${post.slug}`} className="block h-full">
                    <Card className="h-full bg-card/50 border-border/50 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer group overflow-hidden terminal-border">
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
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                            <BookOpen className="w-10 h-10 text-primary/20" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2.5">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-[10px] font-mono bg-primary/5 text-primary border-primary/30 px-1.5"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <h3 className="text-sm font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug font-mono">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2 font-mono">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
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

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-12"
            >
              <Button variant="outline" className="gap-2 font-mono" onClick={onViewAll}>
                <BookOpen className="w-4 h-4" />
                {t("blog_view_all")}
                <ArrowRight className="w-3 h-3" />
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

function BlogPage({ onBack }: { onBack: () => void }) {
  const { t } = useI18n();
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchBlogPosts();
        setPosts(data);
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
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="gap-2 text-muted-foreground hover:text-primary font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("blog_back")}
            </Button>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary" className="text-primary border-primary/30 font-mono">
              <BookOpen className="w-3 h-3 mr-1" />
              {t("sec_blog")}
            </Badge>
            <span className="text-sm text-muted-foreground font-mono">
              {posts.length} {t("blog_posts_label")}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-mono">
            {t("blog_title")}
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-6 font-mono">
            {t("blog_sub")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <input
              type="text"
              placeholder={t("blog_search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card border border-border/80 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary w-full sm:max-w-md text-foreground placeholder:text-muted-foreground/60 font-mono"
            />
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                <Badge
                  variant={selectedTag === null ? "default" : "secondary"}
                  className="cursor-pointer text-xs font-mono"
                  onClick={() => setSelectedTag(null)}
                >
                  {t("blog_all")}
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
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-mono">{t("blog_no_posts")}</p>
          </div>
        ) : (
          <>
            {!searchQuery && !selectedTag && filteredPosts.length > 0 && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-10"
              >
                <Link href={`/posts/${filteredPosts[0].slug}`} className="block">
                  <Card className="bg-card/50 border-border/50 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer group overflow-hidden terminal-border">
                    <div className="grid grid-cols-1 md:grid-cols-2">
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
                            {t("blog_latest")}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6 sm:p-8 flex flex-col justify-center">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {filteredPosts[0].tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs font-mono bg-primary/5 text-primary border-primary/30"
                            >
                              <Tag className="w-2.5 h-2.5 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary transition-colors font-mono">
                          {filteredPosts[0].title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3 font-mono">
                          {filteredPosts[0].description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.slice(!searchQuery && !selectedTag ? 1 : 0).map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                >
                  <Link href={`/posts/${post.slug}`} className="block h-full">
                    <Card className="h-full bg-card/50 border-border/50 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer group overflow-hidden terminal-border">
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
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                            <BookOpen className="w-10 h-10 text-primary/20" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-5">
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-[10px] font-mono bg-primary/5 text-primary border-primary/30 px-1.5"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 font-mono">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2 font-mono">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
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
                              <Clock className="w-3.5 h-3.5" />
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
          </>
        )}

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
            <Button variant="outline" className="gap-2 font-mono">
              <Github className="w-4 h-4" />
              {t("blog_source")}
              <ExternalLink className="w-3 h-3" />
            </Button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}

function SkillsSection() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 sm:py-32 relative grid-bg" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader tag={t("sec_skills")} title={t("skills_title")} sub={t("skills_sub")} />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {SKILLS.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group cursor-default terminal-border">
                <CardContent className="p-4 sm:p-5 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <skill.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors font-mono">
                      {skill.name}
                    </h3>
                    <span className="text-xs text-muted-foreground font-mono">{skill.category}</span>
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
  const { t } = useI18n();
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
          <Badge variant="secondary" className="mb-4 text-primary border-primary/30 font-mono">
            {t("sec_contact")}
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-gradient">{t("contact_title")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-12 leading-relaxed font-mono">
            {t("contact_sub")}
          </p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="https://github.com/Ismail-Benali" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-3 px-8 hover:border-primary/50 hover:bg-primary/5 font-mono">
                <Github className="w-5 h-5" />
                {t("contact_github")}
                <ExternalLink className="w-3 h-3 opacity-50" />
              </Button>
            </a>
            <a href="mailto:ismail.benali@proton.me">
              <Button size="lg" variant="outline" className="gap-3 px-8 hover:border-primary/50 hover:bg-primary/5 font-mono">
                <Mail className="w-5 h-5" />
                {t("contact_email")}
                <ExternalLink className="w-3 h-3 opacity-50" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
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
          <ArsenalSection />
          <ProjectsSection />
          <BlogPreviewSection onViewAll={() => navigate("blog")} />
          <SkillsSection />
          <ContactSection />
        </main>
      )}
      {view === "blog" && <BlogPage onBack={() => navigate("home")} />}
      <Footer />
    </div>
  );
}

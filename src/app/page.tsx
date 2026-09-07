import Link from "next/link";
import {
  Github,
  Mail,
  Shield,
  Code2,
  Bot,
  ScanSearch,
  ChevronDown,
  FolderGit2,
  Zap,
  Globe,
  Lock,
  Cpu,
  Terminal,
  BookOpen,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PROJECTS } from "@/data/projects";
import { PLATFORMS } from "@/data/platforms";
import { PlatformLogo } from "@/components/platform-logo";
import { fetchBlogPosts } from "@/lib/blog";

export default async function Home() {
  const featuredProjects = PROJECTS.slice(0, 4);
  const latestPosts = await fetchBlogPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* ───────────── Hero ───────────── */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center relative overflow-hidden grid-bg"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-primary/30 to-cyan-500/20 p-1 mx-auto mb-8">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                <img
                  src="https://avatars.githubusercontent.com/u/90980178?v=4"
                  alt="H3l0s_T3k"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              <span className="text-gradient">H3l0s_T3k</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-mono mb-4">
              <span className="text-primary">&gt;</span> Cybersecurity
              Researcher &amp; Open-Source Developer
            </p>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Building autonomous red-teaming and attack surface management
              tools. Exploring the depths of technology and making the digital
              world safer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/projects">
                <Button size="lg" className="gap-2 px-8 bg-primary hover:bg-primary/90">
                  <FolderGit2 className="w-4 h-4" />
                  View Projects
                </Button>
              </Link>
              <Link href="/platforms">
                <Button size="lg" variant="outline" className="gap-2 px-8">
                  <Globe className="w-4 h-4" />
                  Platforms &amp; Profiles
                </Button>
              </Link>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
            </div>
          </div>
        </section>

        {/* ───────────── About ───────────── */}
        <section id="about" className="py-20 sm:py-32 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
                <Shield className="w-3 h-3 mr-1" />
                About Me
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Driven by <span className="text-gradient">Curiosity</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                I am a cybersecurity researcher and open-source developer,
                passionate about creating a safer digital environment. As an
                Electrical Engineering student, I bridge a deep understanding of
                physical networking layers with advanced security software — from
                autonomous red-teaming orchestrators to OSINT tools and ethical
                security utilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Cybersecurity",
                  desc: "Focused on making the digital world safer through innovative security tools and research.",
                },
                {
                  icon: Code2,
                  title: "Open Source",
                  desc: "Building tools that empower developers and security researchers — from curated lists to polyglot orchestrators.",
                },
                {
                  icon: Zap,
                  title: "Automation",
                  desc: "Intelligent bots and autonomous systems that streamline security workflows and enhance productivity.",
                },
              ].map((item) => (
                <Card key={item.title} className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Projects preview ───────────── */}
        <section id="projects" className="py-20 sm:py-32 relative border-t border-border/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
                <FolderGit2 className="w-3 h-3 mr-1" />
                Projects
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Featured <span className="text-gradient">Projects</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Autonomous tooling, security research, and curated resources.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProjects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="block group">
                  <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                        <Terminal className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.tagline}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="text-xs font-mono bg-primary/5 text-primary border-primary/20"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/projects">
                <Button variant="outline" className="gap-2">
                  View All Projects
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ───────────── Platforms preview ───────────── */}
        <section id="platforms" className="py-20 sm:py-32 relative border-t border-border/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
                <Globe className="w-3 h-3 mr-1" />
                Platforms
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Find Me <span className="text-gradient">Online</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {PLATFORMS.map((p) => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="block group">
                  <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full">
                    <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                      <PlatformLogo
                        name={p.name}
                        logo={p.logo}
                        initial={p.initial}
                        color={p.color}
                        className="w-12 h-12"
                        small
                      />
                      <div>
                        <h3 className="text-sm font-semibold">{p.name}</h3>
                        <span className="font-mono text-xs text-primary">{p.handle}</span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Skills preview ───────────── */}
        <section id="skills" className="py-20 sm:py-32 relative border-t border-border/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
                <Code2 className="w-3 h-3 mr-1" />
                Skills
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Technical <span className="text-gradient">Expertise</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { name: "Python", category: "Language", icon: Terminal },
                { name: "Bash / Shell", category: "Scripting", icon: Terminal },
                { name: "Cybersecurity", category: "Security", icon: Shield },
                { name: "OSINT & Recon", category: "Recon", icon: ScanSearch },
                { name: "Rust", category: "Systems", icon: Cpu },
                { name: "Go", category: "Systems", icon: Cpu },
                { name: "Network Security", category: "Security", icon: Shield },
                { name: "Linux / UNIX", category: "Systems", icon: Terminal },
              ].map((skill) => (
                <Card key={skill.name} className="bg-card/50 border-border/50 hover:border-primary/40 transition-all duration-300 group cursor-default">
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
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Blog preview ───────────── */}
        <section id="blog" className="py-20 sm:py-32 relative border-t border-border/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
                <BookOpen className="w-3 h-3 mr-1" />
                Blog
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Latest <span className="text-gradient">Articles</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Thoughts, tutorials, and insights on cybersecurity and tech.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.slice(0, 3).map((post) => (
                <Link key={post.slug} href={`/posts/${post.slug}`} className="block group">
                  <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden flex flex-col">
                    {post.coverImage && (
                      <div className="relative aspect-video overflow-hidden bg-muted/30">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <CardContent className="p-5 flex flex-col flex-1">
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
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
                      <h3 className="text-sm font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
                        {post.description}
                      </p>
                      <span className="text-xs text-muted-foreground font-mono">
                        {post.readTime}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/blog">
                <Button variant="outline" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  View All Articles
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ───────────── Contact CTA ───────────── */}
        <section id="contact" className="py-20 sm:py-32 relative border-t border-border/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
              <Mail className="w-3 h-3 mr-1" />
              Contact
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Let&apos;s <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-12 leading-relaxed">
              Interested in collaborating on a project, discussing cybersecurity,
              or just want to chat about technology? Feel free to reach out.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="https://github.com/Ismail-Benali" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-3 px-8">
                  <Github className="w-5 h-5" />
                  GitHub
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" className="gap-3 px-8">
                  <Mail className="w-5 h-5" />
                  Contact Page
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
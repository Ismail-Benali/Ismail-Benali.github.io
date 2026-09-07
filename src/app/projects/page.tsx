import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FolderGit2, Star, ArrowUpRight, Zap, Shield, List, Network, Speech } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PROJECTS } from "@/data/projects";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  network: Network,
  shield: Shield,
  list: List,
  speech: Speech,
  zap: Zap,
};

export const metadata: Metadata = {
  title: "Projects | H3l0s_T3k",
  description:
    "Open-source projects by Ismail Benali (H3l0s_T3k) — autonomous red-teaming, attack surface management, and security tools.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
              <FolderGit2 className="w-3 h-3 mr-1" />
              Projects
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Open-Source <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A collection of security research, autonomous tooling, and curated
              resources built with passion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project) => {
              const Icon = ICONS[project.icon] ?? Zap;
              return (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="block group h-full">
                  <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {project.stars ?? 0}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                        {project.tagline}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.slice(0, 4).map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs font-mono bg-primary/5 text-primary border-primary/20">
                            {t}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                            project.status === "active"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : project.status === "maintained"
                              ? "bg-amber-500/10 text-amber-500"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {project.status}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          View project
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://github.com/Ismail-Benali?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              View all repositories on GitHub
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

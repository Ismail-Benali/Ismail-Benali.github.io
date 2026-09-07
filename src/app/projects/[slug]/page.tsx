import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Star, GitFork, Zap, Shield, List, Network, Speech, Check } from "lucide-react";
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

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project | H3l0s_T3k" };
  return {
    title: `${project.name} | H3l0s_T3k`,
    description: project.tagline,
    keywords: project.tech,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const Icon = ICONS[project.icon] ?? Zap;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-4xl font-bold">{project.name}</h1>
                <p className="text-muted-foreground mt-1">{project.tagline}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                View on GitHub
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Star className="w-4 h-4" /> {project.stars ?? 0} stars
              </span>
              <Badge
                variant="secondary"
                className={`${
                  project.status === "active"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : project.status === "maintained"
                    ? "bg-amber-500/10 text-amber-500"
                    : ""
                }`}
              >
                {project.status}
              </Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tech.map((t) => (
              <Badge key={t} variant="secondary" className="text-xs font-mono bg-primary/5 text-primary border-primary/20">
                {t}
              </Badge>
            ))}
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.longDescription}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Highlights</h2>
                <ul className="space-y-3">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">Repository</h2>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-primary hover:underline"
                >
                  {project.repo.replace("https://github.com/", "")}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

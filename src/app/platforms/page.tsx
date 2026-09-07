import type { Metadata } from "next";
import { ArrowUpRight, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PLATFORMS } from "@/data/platforms";

export const metadata: Metadata = {
  title: "Platforms | H3l0s_T3k",
  description:
    "Where to find Ismail Benali (H3l0s_T3k) — GitHub, Hacker News, Dev.to, daily.dev, and Sh3ll Cloud profiles.",
};

export default function PlatformsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
              <Globe className="w-3 h-3 mr-1" />
              Platforms
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Find Me <span className="text-gradient">Online</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Profiles, communities, and platforms where I write, build, and
              discuss security &amp; open-source software.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PLATFORMS.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                  <CardContent className="p-6 flex items-start gap-5">
                    {/* Platform logo (official site icon) or colored initial badge */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform overflow-hidden"
                      style={{ backgroundColor: p.logo ? "#fff" : p.color }}
                    >
                      {p.logo ? (
                        <img
                          src={p.logo}
                          alt={`${p.name} logo`}
                          loading="lazy"
                          className="w-full h-full object-contain p-1.5"
                        />
                      ) : (
                        <span className="text-lg font-bold text-white">
                          {p.initial}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold">{p.name}</h3>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="font-mono text-sm text-primary mb-2">
                        {p.handle}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

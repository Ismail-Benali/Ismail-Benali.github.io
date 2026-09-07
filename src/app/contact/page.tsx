import type { Metadata } from "next";
import { Mail, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PLATFORMS, EMAIL } from "@/data/platforms";

export const metadata: Metadata = {
  title: "Contact | H3l0s_T3k",
  description:
    "Get in touch with Ismail Benali (H3l0s_T3k) about collaboration, cybersecurity, or open-source projects.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
              <Mail className="w-3 h-3 mr-1" />
              Contact
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Let&apos;s <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Interested in collaborating on a project, discussing cybersecurity,
              or just want to chat about technology? Feel free to reach out.
            </p>
          </div>

          <div className="space-y-6">
            <a href={`mailto:${EMAIL}`} className="block">
              <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6 flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-0.5">Email</h3>
                    <p className="font-mono text-sm text-primary">{EMAIL}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </a>

            {PLATFORMS.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="block">
                <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="p-6 flex items-center gap-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                      style={{ backgroundColor: p.logo ? "#fff" : p.color }}
                    >
                      {p.logo ? (
                        <img
                          src={p.logo}
                          alt={`${p.name} logo`}
                          loading="lazy"
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <span className="text-sm font-bold text-white">
                          {p.initial}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-0.5">{p.name}</h3>
                      <p className="font-mono text-sm text-primary">{p.handle}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
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

"use client";

import Link from "next/link";
import { Github, Mail, Terminal, ArrowUpRight } from "lucide-react";
import { PLATFORMS } from "@/data/platforms";
import { PlatformLogo } from "@/components/platform-logo";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="font-mono font-bold text-sm">
                H3l0s_T3k
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Cybersecurity researcher &amp; open-source developer. Building
              autonomous red-teaming and attack-surface management tools.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Explore
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Projects", href: "/projects" },
                { label: "Blog", href: "/blog" },
                { label: "Platforms", href: "/platforms" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Platforms
            </h4>
            <ul className="space-y-2">
              {PLATFORMS.slice(0, 4).map((p) => (
                <li key={p.name}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <PlatformLogo
                      name={p.name}
                      logo={p.logo}
                      initial={p.initial}
                      color={p.color}
                      className="w-5 h-5"
                      small
                    />
                    {p.name}
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/50 pt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="font-mono">
              &copy; {new Date().getFullYear()} H3l0s_T3k
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Ismail-Benali"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={PLATFORMS[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#ff6600] transition-colors"
              aria-label="Hacker News"
            >
              <PlatformLogo
                name="Hacker News"
                logo={PLATFORMS[1].logo}
                initial={PLATFORMS[1].initial}
                color={PLATFORMS[1].color}
                className="w-5 h-5"
                small
              />
            </a>
            <a
              href="mailto:ismail.benali@proton.me"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground/50 mt-4">
          Built with Next.js &amp; deployed on GitHub Pages
        </p>
      </div>
    </footer>
  );
}

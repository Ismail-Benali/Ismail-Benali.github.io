"use client";

import { Github, Mail, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="font-mono">
              &copy; {new Date().getFullYear()} H3l!0s_T3k
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

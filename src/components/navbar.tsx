"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export type PageView = "home" | "blog" | "post";

const NAV_ITEMS = [
  { label: "Home", href: "#home", page: "home" as PageView },
  { label: "About", href: "#about", page: "home" as PageView },
  { label: "Projects", href: "#projects", page: "home" as PageView },
  { label: "Blog", href: "", page: "blog" as PageView },
  { label: "Skills", href: "#skills", page: "home" as PageView },
  { label: "Contact", href: "#contact", page: "home" as PageView },
];

export function Navbar({
  currentView,
  onNavigate,
}: {
  currentView: PageView;
  onNavigate: (view: PageView, href?: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (page: PageView, href: string) => {
    setMobileOpen(false);
    if (page === "blog") {
      onNavigate("blog");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onNavigate("home");
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => {
              onNavigate("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Terminal className="w-4 h-4 text-primary" />
            </div>
            <span className="font-mono font-bold text-sm text-foreground">
              H3l!0s_T3k
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.page, item.href)}
                className={`px-3 py-2 text-sm transition-colors rounded-md hover:bg-primary/5 ${
                  currentView !== "home" && item.page === "blog"
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a href="https://github.com/Ismail-Benali" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="ml-2 gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <span
                className={`block h-0.5 w-5 bg-current transition-all ${
                  mobileOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-all ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-all ${
                  mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
        >
          <div className="px-4 py-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.page, item.href)}
                className={`block w-full text-left px-3 py-2 text-sm transition-colors rounded-md ${
                  currentView !== "home" && item.page === "blog"
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://github.com/Ismail-Benali"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="outline" size="sm" className="w-full gap-2 mt-2">
                <Github className="w-4 h-4" />
                GitHub Profile
              </Button>
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

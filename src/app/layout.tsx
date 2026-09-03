import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/lib/i18n";

if (typeof window !== "undefined") {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      return child;
    }
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      return newNode;
    }
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "H3l!0s_T3k | Offensive Security & OSINT",
  description:
    "Offensive security researcher and OSINT expert. Creator of HELIOS-NET — a sovereign polyglot cyber framework. Bilingual (English / AR) portfolio.",
  keywords: [
    "H3l!0s_T3k",
    "HELIOS-NET",
    "Offensive Security",
    "OSINT",
    "Python",
    "Go",
    "C",
    "Portfolio",
    "أمن سيبراني",
  ],
  authors: [{ name: "H3l!0s_T3k" }],
  icons: {
    icon: "https://avatars.githubusercontent.com/u/90980178?v=4",
  },
  openGraph: {
    title: "H3l!0s_T3k | Offensive Security & OSINT",
    description:
      "Sovereign, self-sufficient security tooling. Creator of HELIOS-NET.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scanlines vignette" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} antialiased bg-background text-foreground`}
      >
        <LanguageProvider>{children}</LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}

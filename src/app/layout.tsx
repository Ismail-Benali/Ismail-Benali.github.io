import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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

export const metadata: Metadata = {
  title: "H3l!0s_T3k | Cybersecurity Enthusiast & Developer",
  description:
    "Personal portfolio of H3l!0s_T3k (Ismail-Benali) - Exploring the depths of technology and making the digital world safer. Cybersecurity enthusiast, developer, and open-source contributor.",
  keywords: [
    "H3l!0s_T3k",
    "Cybersecurity",
    "Developer",
    "Python",
    "Open Source",
    "Portfolio",
  ],
  authors: [{ name: "H3l!0s_T3k" }],
  icons: {
    icon: "https://avatars.githubusercontent.com/u/90980178?v=4",
  },
  openGraph: {
    title: "H3l!0s_T3k | Portfolio",
    description:
      "Exploring the depths of technology and making the digital world safer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

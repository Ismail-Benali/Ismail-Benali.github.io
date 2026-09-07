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

const SITE_URL = "https://ismail-benali.github.io";
const AUTHOR_NAME = "Ismail Benali";
const DISPLAY_NAME = "H3l0s_T3k";
const NAME_ALIASES = ["H3l0s_T3k", "H3l!0s_T3k", "h3l0st3k", "Helios Tek", "H3l0s"];
export const metadata: Metadata = {
  title: `${DISPLAY_NAME} | Cybersecurity Researcher & Open-Source Developer`,
  description:
    "Personal portfolio and blog of Ismail Benali (H3l0s_T3k) - Cybersecurity researcher, open-source developer, and attacker surface management enthusiast. Exploring autonomous red-teaming, OSINT tools, and secure systems.",
  keywords: [
    AUTHOR_NAME,
    DISPLAY_NAME,
    ...NAME_ALIASES,
    "Cybersecurity",
    "Red Teaming",
    "Attack Surface Management",
    "OSINT",
    "Open Source",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: AUTHOR_NAME }],
  creator: AUTHOR_NAME,
  icons: {
    icon: "https://avatars.githubusercontent.com/u/90980178?v=4",
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${DISPLAY_NAME} | Cybersecurity Researcher & Open-Source Developer`,
    description:
      "Portfolio and blog of Ismail Benali - autonomous red-teaming, OSINT, and open-source security tools.",
    url: SITE_URL,
    siteName: `${AUTHOR_NAME} (${DISPLAY_NAME})`,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/90980178?v=4",
        width: 400,
        height: 400,
        alt: AUTHOR_NAME,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${DISPLAY_NAME} | Cybersecurity Researcher`,
    description:
      "Portfolio and blog of Ismail Benali - autonomous red-teaming, OSINT, and open-source security tools.",
    images: ["https://avatars.githubusercontent.com/u/90980178?v=4"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR_NAME,
  alternateName: NAME_ALIASES,
  additionalName: NAME_ALIASES,
  url: SITE_URL,
  sameAs: [
    "https://github.com/Ismail-Benali",
    "https://github.com/" + DISPLAY_NAME.replace("!", "0"),
    "https://news.ycombinator.com/user?id=H3l0s_T3k",
    "https://news.ycombinator.com/user?id=H3l!0s_T3k",
    "https://news.ycombinator.com/user?id=h3l0st3k",
  ],
  jobTitle: "Cybersecurity Researcher & Open-Source Developer",
  description:
    "Building autonomous red-teaming and attack surface management tools in Python, Go, and Rust. Creator of HELIOS-NET. Also known as H3l0s_T3k, H3l!0s_T3k, and h3l0st3k.",
  worksFor: {
    "@type": "Organization",
    name: "Open Source",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

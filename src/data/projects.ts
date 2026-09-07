export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  tech: string[];
  icon: string;
  repo: string;
  stars?: number | null;
  topics: string[];
  highlights: string[];
  status: "active" | "maintained" | "archived";
  coverImage?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "helios-net",
    name: "HELIOS-NET",
    tagline: "Autonomous Red Teaming & Attack Surface Management Orchestrator",
    description:
      "A polyglot autonomous orchestrator for red-teaming and attack-surface management, combining Python, Go, Rust, and C.",
    longDescription:
      "HELIOS-NET is an autonomous red-teaming and attack surface management (ASM) orchestrator. It coordinates recon, judging, and recovery campaigns across a polyglot codebase (Python control plane + Go/Rust/C modules), with a CLI, a continuous autonomous daemon, and zero pip dependencies — the control plane relies purely on the Python standard library.",
    tech: ["Python", "Go", "Rust", "C", "CLI", "Automation"],
    icon: "network",
    repo: "https://github.com/Ismail-Benali/HELIOS-NET",
    topics: ["red-teaming", "security", "asm", "orchestrator", "rust", "golang"],
    highlights: [
      "Polyglot orchestrator: Python, Go, Rust, and C",
      "Continuous Autonomous Mission Daemon",
      "Zero pip dependencies (stdlib control plane)",
      "CLI + simulation + recovery workflows",
    ],
    status: "active",
    coverImage:
      "https://github.com/user-attachments/assets/eb7d5c73-ee03-4500-bc95-45269d7afec6",
  },
  {
    slug: "awesome-attack-surface-management",
    name: "awesome-attack-surface-management",
    tagline: "Curated tools, techniques & frameworks for ASM",
    description:
      "A curated collection of tools, techniques, frameworks, and learning resources for attack surface management.",
    longDescription:
      "A community-curated list focused on attack surface management — the practice of continuously discovering, inventorying, and assessing an organization's entire digital attack surface. Aggregates tools, techniques, frameworks, and learning resources.",
    tech: ["Security", "ASM", "Curated List", "Research"],
    icon: "list",
    repo: "https://github.com/Ismail-Benali/awesome-attack-surface-management",
    topics: ["awesome-list", "security", "asm", "attack-surface"],
    highlights: [
      "Tools, techniques, frameworks, and learning resources",
      "Security research compilation",
    ],
    status: "active",
  },
  {
    slug: "awesome-pentest",
    name: "awesome-pentest",
    tagline: "Curated penetration testing resources",
    description:
      "A collection of awesome penetration testing resources, tools, and references.",
    longDescription:
      "A curated collection of penetration testing resources, tools, and references, spanning reconnaissance, exploitation, post-exploitation, and reporting for authorized security assessments.",
    tech: ["Security", "Pentesting", "Curated List"],
    icon: "list",
    repo: "https://github.com/Ismail-Benali/awesome-pentest",
    topics: ["awesome-list", "pentest", "security"],
    highlights: [
      "Reconnaissance to reporting coverage",
      "Curated, organized security references",
    ],
    status: "active",
  },
  {
    slug: "natsumactool",
    name: "NatsuMacTool",
    tagline: "Randomize your MAC address on macOS",
    description:
      "A macOS utility that automatically sets a random MAC address for privacy and network security auditing.",
    longDescription:
      "NatsuMacTool is a macOS utility that automatically sets a random MAC address, useful for privacy and for authorized network security auditing. Small Shell-based tool, actively maintained.",
    tech: ["Shell", "macOS", "Security"],
    icon: "shield",
    repo: "https://github.com/Ismail-Benali/NatsuMacTool",
    stars: 1,
    topics: ["macos", "privacy", "shell", "security"],
    highlights: [
      "Automatic random MAC address rotation",
      "Small, dependency-free Shell implementation",
    ],
    status: "active",
  },
  {
    slug: "tts",
    name: "TTS",
    tagline: "Deep learning for Text to Speech",
    description:
      "Deep-learning-based text-to-speech research project (Discussions enabled).",
    longDescription:
      "A deep-learning Text-to-Speech project in Jupyter, exploring neural TTS approaches. Focus on reproducible research and experimentation.",
    tech: ["Python", "Deep Learning", "Jupyter", "NLP"],
    icon: "speech",
    repo: "https://github.com/Ismail-Benali/TTS",
    topics: ["deep-learning", "tts", "nlp", "jupyter"],
    highlights: [
      "Deep learning based TTS research",
      "Jupyter-first reproducible notebooks",
    ],
    status: "maintained",
  },
];

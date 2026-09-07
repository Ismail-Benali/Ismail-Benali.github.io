export interface Platform {
  name: string;
  handle: string;
  url: string;
  color: string;
  description: string;
  /** Rounded initial for the badge (no external logo dependency) */
  initial: string;
  username: string;
}

export const PLATFORMS: Platform[] = [
  {
    name: "GitHub",
    handle: "@Ismail-Benali",
    username: "Ismail-Benali",
    url: "https://github.com/Ismail-Benali",
    color: "#181717",
    description:
      "Open-source projects, repositories, and the HELIOS-NET orchestrator.",
    initial: "GH",
  },
  {
    name: "Hacker News",
    handle: "H3l0s_T3k",
    username: "H3l0s_T3k",
    url: "https://news.ycombinator.com/user?id=H3l0s_T3k",
    color: "#ff6600",
    description: "Community profile, submissions, and discussions on HN.",
    initial: "HN",
  },
  {
    name: "Dev.to",
    handle: "ismail-benali",
    username: "ismail-benali",
    url: "https://dev.to/ismail-benali",
    color: "#0A0A23",
    description: "Developer articles, tutorials, and technical writing.",
    initial: "DEV",
  },
  {
    name: "daily.dev",
    handle: "h3l0st3k",
    username: "h3l0st3k",
    url: "https://daily.dev/h3l0st3k",
    color: "#4B6BFB",
    description: "Developer news and reading-list profile.",
    initial: "dd",
  },
  {
    name: "Sh3ll Cloud",
    handle: "Member #5891",
    username: "sh3ll-cloud",
    url: "https://sh3ll.cloud/xf2/members/5891/",
    color: "#00D26A",
    description: "Community forum profile on the Sh3ll Cloud platform.",
    initial: "S3",
  },
];

export const EMAIL = "ismail.benali@proton.me";

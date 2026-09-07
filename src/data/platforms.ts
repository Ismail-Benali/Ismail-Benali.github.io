export interface Platform {
  name: string;
  handle: string;
  url: string;
  color: string;
  description: string;
  /** Rounded initial for the badge (fallback when no logo) */
  initial: string;
  username: string;
  /** Official site logo URL (favicon); when present it replaces the initial badge */
  logo?: string;
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
    logo: "https://github.githubassets.com/favicons/favicon.svg",
  },
  {
    name: "Hacker News",
    handle: "H3l0s_T3k",
    username: "H3l0s_T3k",
    url: "https://news.ycombinator.com/user?id=H3l0s_T3k",
    color: "#ff6600",
    description: "Community profile, submissions, and discussions on HN.",
    initial: "HN",
    logo: "https://news.ycombinator.com/y18.svg",
  },
  {
    name: "Dev.to",
    handle: "ismail-benali",
    username: "ismail-benali",
    url: "https://dev.to/ismail-benali",
    color: "#0A0A23",
    description: "Developer articles, tutorials, and technical writing.",
    initial: "DEV",
    logo: "https://media2.dev.to/dynamic/image/width=64,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8j7kvp660rqzt99zui8e.png",
  },
  {
    name: "daily.dev",
    handle: "h3l0st3k",
    username: "h3l0st3k",
    url: "https://daily.dev/h3l0st3k",
    color: "#4B6BFB",
    description: "Developer news and reading-list profile.",
    initial: "dd",
    logo: "https://daily.dev/favicon.png",
  },
  {
    name: "Sh3ll Cloud",
    handle: "Member #5891",
    username: "sh3ll-cloud",
    url: "https://sh3ll.cloud/xf2/members/5891/",
    color: "#00D26A",
    description: "Community forum profile on the Sh3ll Cloud platform.",
    initial: "S3",
    logo: "https://sh3ll.cloud/xf2/data/assets/logo/favicon-192.webp",
  },
];

export const EMAIL = "ismail.benali@proton.me";

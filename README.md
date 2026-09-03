# H3l!0s_T3k — Portfolio & Blog

Personal portfolio of **Ismail-Benali** (H3l!0s_T3k) — a cybersecurity enthusiast and open-source developer. Built with Next.js and deployed automatically to GitHub Pages.

🔗 **Live site:** https://ismail-benali.github.io

## ✨ Features

- **Portfolio home** — Hero, About, Projects, Skills, and Contact sections with smooth animations (Framer Motion).
- **Blog** — Articles are written as Markdown files in this repo and rendered automatically. No database or CMS needed.
- **Dark theme** — A modern, terminal-inspired design with monospace accents.
- **Open source** — Links to all featured GitHub projects.

## 🛠 Tech Stack

| Layer      | Technology                                |
|------------|-------------------------------------------|
| Framework  | Next.js 16 (App Router, static export)    |
| Language   | TypeScript                                |
| Styling    | Tailwind CSS 4 + shadcn/ui                |
| Animation  | Framer Motion                             |
| Blog data  | GitHub contents API + Markdown frontmatter|

## 📝 Writing a Blog Post

Each post is a single Markdown file placed in `content/blog/`:

```
content/blog/
├── my-post.md                 ← one file per post
└── images/
    └── my-post/               ← images for that post
        ├── cover.png
        └── photo-1.png
```

Frontmatter format:

```markdown
---
title: "Post Title"
date: 2026-08-03
description: "Short description shown on the card"
tags: ["Cybersecurity", "AI"]
coverImage: "cover.png"
images: ["cover.png", "photo-1.png"]
---

# Write your content in Markdown
```

- The **slug** is the file name without extension (`my-post.md` → `/blog/my-post`).
- `coverImage` and `images` can be a local file name (placed in `content/blog/images/<slug>/`) or a full `https://` URL.
- Push to `main` — the site rebuilds and the post appears automatically in about a minute.

## 🚀 Development

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:3000
npm run build     # static export to ./out
```

## 📦 Deployment

GitHub Actions (`.github/workflows/nextjs.yml`) builds the site as a **static export** and deploys it to GitHub Pages on every push to `main`.

## 📄 License

MIT — free to use and modify. Please attribute the original author.

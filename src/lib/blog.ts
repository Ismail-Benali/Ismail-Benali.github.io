/* ──────────────────────── Blog Data Fetcher ──────────────────────── */

const GITHUB_USERNAME = "Ismail-Benali";
const GITHUB_REPO = "Ismail-Benali.github.io";
const BLOG_FOLDER = "content/blog";
const IMAGES_FOLDER = "content/blog/images";
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/main`;

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readTime: string;
  coverImage: string;
  images: string[];
}

export interface BlogPostFull extends BlogPostMeta {
  content: string;
}

function parseFrontmatter(raw: string): {
  meta: Partial<BlogPostMeta>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const fm = match[1];
  const content = match[2];
  const meta: Partial<BlogPostMeta> = {};

  const get = (key: string) => {
    const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
    return m ? m[1].trim().replace(/^["']|["']$/g, "") : undefined;
  };

  const getList = (key: string): string[] => {
    const m = fm.match(new RegExp(`^${key}:\\s*\\[(.+?)\\]$`, "ms"));
    if (!m) return [];
    return m[1].split(",").map((t) => t.trim().replace(/^["']|["']$/g, ""));
  };

  meta.title = get("title");
  meta.date = get("date");
  meta.description = get("description");
  meta.tags = getList("tags");
  meta.coverImage = get("coverImage") || "";
  meta.images = getList("images");

  return { meta, content: content.trim() };
}

function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function buildImageUrl(imgPath: string, slug: string): string {
  if (!imgPath) return "";
  if (imgPath.startsWith("http")) return imgPath;
  return `${RAW_BASE}/${IMAGES_FOLDER}/${slug}/${imgPath}`;
}

export async function fetchBlogPosts(): Promise<BlogPostMeta[]> {
  const posts: BlogPostMeta[] = [];

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${BLOG_FOLDER}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-Blog-Fetcher",
        },
      }
    );

    if (!res.ok) return [];

    const files = await res.json();
    if (!Array.isArray(files)) return [];

    const mdFiles = files.filter(
      (f: { name: string }) => f.name.endsWith(".md") || f.name.endsWith(".mdx")
    );

    mdFiles.sort((a: { name: string }, b: { name: string }) =>
      b.name.localeCompare(a.name)
    );

    for (const file of mdFiles.slice(0, 10)) {
      try {
        const cRes = await fetch(`${RAW_BASE}/${BLOG_FOLDER}/${file.name}`, {
          headers: { "User-Agent": "Portfolio-Blog-Fetcher" },
        });
        if (!cRes.ok) continue;

        const raw = await cRes.text();
        const { meta, content } = parseFrontmatter(raw);
        const slug = file.name.replace(/\.(md|mdx)$/, "");

        const coverImage = meta.coverImage
          ? buildImageUrl(meta.coverImage, slug)
          : "";

        const images = (meta.images || []).map((img) =>
          buildImageUrl(img, slug)
        );

        posts.push({
          slug,
          title: meta.title || slug.replace(/[-_]/g, " "),
          date: meta.date || "",
          description:
            meta.description ||
            content.substring(0, 150).replace(/[#*_`]/g, "") + "...",
          tags: meta.tags || [],
          readTime: estimateReadTime(content),
          coverImage,
          images,
        });
      } catch {
        continue;
      }
    }

    return posts.length > 0 ? posts : [];
  } catch {
    return [];
  }
}

export async function fetchBlogPost(
  slug: string
): Promise<BlogPostFull | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${BLOG_FOLDER}/${slug}.md`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-Blog-Fetcher",
        },
      }
    );

    if (!res.ok) {
      // Try .mdx
      const res2 = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${BLOG_FOLDER}/${slug}.mdx`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "Portfolio-Blog-Fetcher",
          },
        }
      );
      if (!res2.ok) {
        return null;
      }
      const raw = await (await fetch(`${RAW_BASE}/${BLOG_FOLDER}/${slug}.mdx`, {
        headers: { "User-Agent": "Portfolio-Blog-Fetcher" },
      })).text();
      const { meta, content } = parseFrontmatter(raw);
      return {
        slug,
        title: meta.title || slug.replace(/[-_]/g, " "),
        date: meta.date || "",
        description:
          meta.description ||
          content.substring(0, 150).replace(/[#*_`]/g, "") + "...",
        tags: meta.tags || [],
        readTime: estimateReadTime(content),
        coverImage: meta.coverImage
          ? buildImageUrl(meta.coverImage, slug)
          : "",
        images: (meta.images || []).map((img) =>
          buildImageUrl(img, slug)
        ),
        content,
      };
    }

    const raw = await fetch(`${RAW_BASE}/${BLOG_FOLDER}/${slug}.md`, {
      headers: { "User-Agent": "Portfolio-Blog-Fetcher" },
    }).then((r) => r.text());

    const { meta, content } = parseFrontmatter(raw);
    return {
      slug,
      title: meta.title || slug.replace(/[-_]/g, " "),
      date: meta.date || "",
      description:
        meta.description ||
        content.substring(0, 150).replace(/[#*_`]/g, "") + "...",
      tags: meta.tags || [],
      readTime: estimateReadTime(content),
      coverImage: meta.coverImage
        ? buildImageUrl(meta.coverImage, slug)
        : "",
      images: (meta.images || []).map((img) => buildImageUrl(img, slug)),
      content,
    };
  } catch {
    return null;
  }
}

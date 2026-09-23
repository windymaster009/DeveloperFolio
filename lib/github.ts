import { siteConfig } from "@/data/site";

const GITHUB_API = "https://api.github.com";
const REVALIDATE_SECONDS = 60 * 60 * 6;

type GitHubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  created_at: string;
};

export type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  size: number;
  pushed_at: string;
  updated_at: string;
  default_branch: string;
};

type RootContentItem = {
  name: string;
  path: string;
  type: "file" | "dir";
  download_url: string | null;
};

export type LanguageStat = {
  name: string;
  value: number;
  percent: number;
};

export type TechnologyStat = {
  name: string;
  projects: number;
};

export type GitHubSnapshot = {
  profile: GitHubProfile;
  repositories: GitHubRepo[];
  featured: GitHubRepo[];
  languages: LanguageStat[];
  technologies: TechnologyStat[];
  summary: {
    projects: number;
    languages: number;
    technologies: number;
    githubSince: number;
  };
  generatedAt: string;
  error?: string;
};

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "windy-developer-folio",
};

if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

async function githubFetch<T>(urlOrPath: string): Promise<T> {
  const url = urlOrPath.startsWith("http") ? urlOrPath : `${GITHUB_API}${urlOrPath}`;
  const response = await fetch(url, {
    headers,
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed (${response.status}) for ${url}`);
  }

  return response.json() as Promise<T>;
}

async function textFetch(url: string): Promise<string> {
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) return "";
  return response.text();
}

const repoTechPatterns: Array<[RegExp, string]> = [
  [/\bnext(?:\.js|js)?\b/i, "Next.js"],
  [/\breact(?:js)?\b/i, "React"],
  [/\bvue(?:js)?\b/i, "Vue.js"],
  [/\blaravel\b/i, "Laravel"],
  [/\bfastapi\b/i, "FastAPI"],
  [/\bdjango\b/i, "Django"],
  [/\bflask\b/i, "Flask"],
  [/\btelegram\b/i, "Telegram Bot API"],
  [/\bdiscord\b/i, "Discord API"],
  [/\btailwind(?:css)?\b/i, "Tailwind CSS"],
  [/\bmongo(?:db)?\b/i, "MongoDB"],
  [/\bredis\b/i, "Redis"],
  [/\bdocker\b/i, "Docker"],
  [/\bfirebase\b/i, "Firebase"],
  [/\bvercel\b/i, "Vercel"],
  [/\braspberry(?:-pi| pi)?\b/i, "Raspberry Pi"],
  [/\bselenium\b/i, "Selenium"],
  [/\bplaywright\b/i, "Playwright"],
  [/\belectron\b/i, "Electron"],
  [/\bvite\b/i, "Vite"],
  [/\bsocket(?:\.io|io)\b/i, "Socket.IO"],
];

const manifestPatterns: Array<[RegExp, string]> = [
  [/"next"\s*:/i, "Next.js"],
  [/"react"\s*:/i, "React"],
  [/"vue"\s*:/i, "Vue.js"],
  [/"express"\s*:/i, "Express"],
  [/"@nestjs\//i, "NestJS"],
  [/"tailwindcss"\s*:/i, "Tailwind CSS"],
  [/"vite"\s*:/i, "Vite"],
  [/"mongoose"\s*:/i, "MongoDB"],
  [/"mongodb"\s*:/i, "MongoDB"],
  [/"redis"\s*:/i, "Redis"],
  [/"prisma"\s*:/i, "Prisma"],
  [/"socket\.io"\s*:/i, "Socket.IO"],
  [/"electron"\s*:/i, "Electron"],
  [/"discord\.js"\s*:/i, "Discord.js"],
  [/"telegraf"\s*:/i, "Telegram Bot API"],
  [/"grammy"\s*:/i, "Telegram Bot API"],
  [/\bfastapi\b/i, "FastAPI"],
  [/\bdjango\b/i, "Django"],
  [/\bflask\b/i, "Flask"],
  [/\btelethon\b/i, "Telethon"],
  [/\bpyrogram\b/i, "Pyrogram"],
  [/\baiogram\b/i, "Aiogram"],
  [/\bpython-telegram-bot\b/i, "Telegram Bot API"],
  [/\bpymongo\b/i, "MongoDB"],
  [/\bredis\b/i, "Redis"],
  [/\bselenium\b/i, "Selenium"],
  [/\bplaywright\b/i, "Playwright"],
  [/\bsqlalchemy\b/i, "SQLAlchemy"],
  [/\b(l)aravel\/framework\b/i, "Laravel"],
];

function detectRepoTechnologies(repo: GitHubRepo) {
  const found = new Set<string>();
  const haystack = [
    repo.name,
    repo.description ?? "",
    ...(repo.topics ?? []),
  ].join(" ");

  for (const [pattern, label] of repoTechPatterns) {
    if (pattern.test(haystack)) found.add(label);
  }

  for (const topic of repo.topics ?? []) {
    const normalized = topic.toLowerCase();
    if (normalized === "nodejs" || normalized === "node-js") found.add("Node.js");
    if (normalized === "postgresql" || normalized === "postgres") found.add("PostgreSQL");
    if (normalized === "mysql") found.add("MySQL");
    if (normalized === "sqlite") found.add("SQLite");
    if (normalized === "cloudflare") found.add("Cloudflare");
    if (normalized === "pm2") found.add("PM2");
  }

  return found;
}

async function detectManifestTechnologies(repo: GitHubRepo) {
  const found = new Set<string>();

  try {
    const root = await githubFetch<RootContentItem[]>(
      `/repos/${siteConfig.username}/${encodeURIComponent(repo.name)}/contents?ref=${encodeURIComponent(repo.default_branch)}`,
    );

    const manifestNames = new Set([
      "package.json",
      "requirements.txt",
      "pyproject.toml",
      "composer.json",
      "dockerfile",
      "docker-compose.yml",
      "docker-compose.yaml",
      "compose.yml",
      "compose.yaml",
      "ecosystem.config.js",
      "ecosystem.config.cjs",
      "ecosystem.config.mjs",
      "vercel.json",
    ]);

    const manifests = root
      .filter((item) => item.type === "file" && manifestNames.has(item.name.toLowerCase()))
      .slice(0, 6);

    const settled = await Promise.allSettled(
      manifests.map(async (file) => ({
        name: file.name.toLowerCase(),
        text: file.download_url ? await textFetch(file.download_url) : "",
      })),
    );

    for (const item of settled) {
      if (item.status !== "fulfilled") continue;
      const { name, text } = item.value;

      if (name === "dockerfile") found.add("Docker");
      if (name.includes("docker-compose") || name === "compose.yml" || name === "compose.yaml") {
        found.add("Docker Compose");
      }
      if (name.startsWith("ecosystem.config.")) found.add("PM2");
      if (name === "vercel.json") found.add("Vercel");

      for (const [pattern, label] of manifestPatterns) {
        if (pattern.test(text)) found.add(label);
      }
    }
  } catch {
    // Repo-level manifest analysis is best effort. Basic GitHub stats still render.
  }

  return found;
}

function buildFallbackProfile(): GitHubProfile {
  return {
    login: siteConfig.username,
    name: siteConfig.name,
    avatar_url: `https://github.com/${siteConfig.username}.png`,
    html_url: siteConfig.githubUrl,
    bio: null,
    location: null,
    public_repos: 0,
    followers: 0,
    created_at: new Date().toISOString(),
  };
}

export async function getGitHubData(): Promise<GitHubSnapshot> {
  try {
    const [profile, rawRepos] = await Promise.all([
      githubFetch<GitHubProfile>(`/users/${siteConfig.username}`),
      githubFetch<GitHubRepo[]>(
        `/users/${siteConfig.username}/repos?per_page=100&type=owner&sort=updated`,
      ),
    ]);

    const repositories = rawRepos
      .filter(
        (repo) =>
          !repo.fork &&
          !repo.archived &&
          repo.size > 0 &&
          repo.name.toLowerCase() !== siteConfig.username.toLowerCase(),
      )
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
      );

    const languageValues = new Map<string, number>();

    // Keep every repository's primary language represented, including older projects.
    for (const repo of repositories) {
      if (repo.language) {
        languageValues.set(repo.language, (languageValues.get(repo.language) ?? 0) + 1);
      }
    }

    // Add detailed language byte counts for the most relevant recent repositories.
    const detailedRepos = repositories.slice(0, 18);
    const languageResults = await Promise.allSettled(
      detailedRepos.map((repo) => githubFetch<Record<string, number>>(repo.languages_url)),
    );

    for (const result of languageResults) {
      if (result.status !== "fulfilled") continue;
      for (const [language, bytes] of Object.entries(result.value)) {
        languageValues.set(language, (languageValues.get(language) ?? 0) + bytes);
      }
    }

    const languageTotal = [...languageValues.values()].reduce((sum, value) => sum + value, 0);
    const languages = [...languageValues.entries()]
      .map(([name, value]) => ({
        name,
        value,
        percent: languageTotal ? (value / languageTotal) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);

    const technologyProjects = new Map<string, Set<string>>();
    const addTech = (technology: string, repoName: string) => {
      if (!technologyProjects.has(technology)) technologyProjects.set(technology, new Set());
      technologyProjects.get(technology)?.add(repoName);
    };

    for (const repo of repositories) {
      for (const tech of detectRepoTechnologies(repo)) addTech(tech, repo.name);
    }

    // Inspect common manifests for recent projects. This catches frameworks that GitHub's
    // language statistics cannot see, while keeping the API request count conservative.
    const manifestRepos = repositories.slice(0, 10);
    const manifestResults = await Promise.allSettled(
      manifestRepos.map(async (repo) => ({
        repo: repo.name,
        technologies: await detectManifestTechnologies(repo),
      })),
    );

    for (const result of manifestResults) {
      if (result.status !== "fulfilled") continue;
      for (const tech of result.value.technologies) addTech(tech, result.value.repo);
    }

    const technologies = [...technologyProjects.entries()]
      .map(([name, projects]) => ({ name, projects: projects.size }))
      .sort((a, b) => b.projects - a.projects || a.name.localeCompare(b.name));

    const configuredFeatured = siteConfig.featuredRepositories
      .map((name) => repositories.find((repo) => repo.name === name))
      .filter((repo): repo is GitHubRepo => Boolean(repo));

    const featured = [
      ...configuredFeatured,
      ...repositories.filter(
        (repo) => !configuredFeatured.some((featuredRepo) => featuredRepo.id === repo.id),
      ),
    ].slice(0, 6);

    return {
      profile,
      repositories,
      featured,
      languages,
      technologies,
      summary: {
        projects: repositories.length,
        languages: languages.length,
        technologies: technologies.length,
        githubSince: new Date(profile.created_at).getFullYear(),
      },
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    return {
      profile: buildFallbackProfile(),
      repositories: [],
      featured: [],
      languages: [],
      technologies: [],
      summary: {
        projects: 0,
        languages: 0,
        technologies: 0,
        githubSince: new Date().getFullYear(),
      },
      generatedAt: new Date().toISOString(),
      error: error instanceof Error ? error.message : "GitHub data is temporarily unavailable.",
    };
  }
}

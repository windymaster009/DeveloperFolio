const fs = require("fs");
const https = require("https");
require("dotenv").config();

const USERNAME = process.env.GITHUB_USERNAME || "windymaster009";
const TOKEN = process.env.GITHUB_TOKEN || process.env.REACT_APP_GITHUB_TOKEN || "";
const PROFILE_FILE = "./public/profile.json";
const STATS_FILE = "./public/github-stats.json";

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4F5D95",
  Vue: "#41b883",
  Kotlin: "#A97BFF",
  Java: "#b07219",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Shell: "#89e051",
  Lua: "#000080"
};

const featuredNames = [
  "telegrambot-py-eshop",
  "Telegram-Drive",
  "solarhome",
  "IG-message-automation",
  "Vue-website-ecommerce",
  "laravel-e-shop"
];

const techPatterns = [
  [/next(?:\.js|js)?/i, "Next.js"],
  [/react/i, "React"],
  [/vue/i, "Vue.js"],
  [/laravel/i, "Laravel"],
  [/fastapi/i, "FastAPI"],
  [/django/i, "Django"],
  [/flask/i, "Flask"],
  [/telegram/i, "Telegram Bot API"],
  [/discord/i, "Discord API"],
  [/mongo(?:db)?/i, "MongoDB"],
  [/redis/i, "Redis"],
  [/docker/i, "Docker"],
  [/firebase/i, "Firebase"],
  [/tailwind/i, "Tailwind CSS"],
  [/vite/i, "Vite"],
  [/electron/i, "Electron"],
  [/selenium/i, "Selenium"],
  [/playwright/i, "Playwright"],
  [/raspberry(?:-|\s)?pi/i, "Raspberry Pi"],
  [/cloudflare/i, "Cloudflare"],
  [/pm2/i, "PM2"],
  [/mysql/i, "MySQL"],
  [/postgres/i, "PostgreSQL"],
  [/sqlite/i, "SQLite"],
  [/express/i, "Express"]
];

const manifestPatterns = [
  [/"next"\s*:/i, "Next.js"],
  [/"react"\s*:/i, "React"],
  [/"vue"\s*:/i, "Vue.js"],
  [/"express"\s*:/i, "Express"],
  [/"tailwindcss"\s*:/i, "Tailwind CSS"],
  [/"vite"\s*:/i, "Vite"],
  [/"mongoose"\s*:/i, "MongoDB"],
  [/"mongodb"\s*:/i, "MongoDB"],
  [/"redis"\s*:/i, "Redis"],
  [/"prisma"\s*:/i, "Prisma"],
  [/\bfastapi\b/i, "FastAPI"],
  [/\bdjango\b/i, "Django"],
  [/\bflask\b/i, "Flask"],
  [/\btelethon\b/i, "Telethon"],
  [/\bpyrogram\b/i, "Pyrogram"],
  [/\baiogram\b/i, "Aiogram"],
  [/\bpython-telegram-bot\b/i, "Telegram Bot API"],
  [/\bpymongo\b/i, "MongoDB"],
  [/\bsqlalchemy\b/i, "SQLAlchemy"],
  [/laravel\/framework/i, "Laravel"]
];

function api(path) {
  return new Promise((resolve, reject) => {
    const headers = {
      "User-Agent": "kevin-developerfolio",
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    if (TOKEN) headers.Authorization = "Bearer " + TOKEN;

    https
      .get({hostname: "api.github.com", path, headers}, response => {
        let body = "";
        response.on("data", chunk => (body += chunk));
        response.on("end", () => {
          if (response.statusCode < 200 || response.statusCode >= 300) {
            return reject(new Error("GitHub API " + response.statusCode + ": " + body.slice(0, 180)));
          }
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject);
  });
}

function addTechnology(map, name, repoName) {
  if (!map.has(name)) map.set(name, new Set());
  map.get(name).add(repoName);
}

function inferTechnologies(repo, map) {
  const text = [repo.name, repo.description || "", ...(repo.topics || [])].join(" ");
  techPatterns.forEach(([pattern, name]) => {
    if (pattern.test(text)) addTechnology(map, name, repo.name);
  });

  (repo.topics || []).forEach(topic => {
    const value = topic.toLowerCase();
    if (value === "nodejs" || value === "node-js") addTechnology(map, "Node.js", repo.name);
    if (value === "postgresql") addTechnology(map, "PostgreSQL", repo.name);
    if (value === "mysql") addTechnology(map, "MySQL", repo.name);
    if (value === "sqlite") addTechnology(map, "SQLite", repo.name);
  });
}

async function inspectManifest(repo, map) {
  try {
    const tree = await api(
      "/repos/" + USERNAME + "/" + encodeURIComponent(repo.name) +
      "/git/trees/" + encodeURIComponent(repo.default_branch) + "?recursive=1"
    );
    const files = (tree.tree || []).filter(item => item.type === "blob").map(item => item.path);
    const lower = files.map(path => path.toLowerCase());

    if (lower.some(path => path === "dockerfile" || path.includes("docker-compose") || path === "compose.yml" || path === "compose.yaml")) {
      addTechnology(map, "Docker", repo.name);
    }
    if (lower.some(path => path.startsWith("ecosystem.config."))) {
      addTechnology(map, "PM2", repo.name);
    }

    const manifestPriority = ["package.json", "requirements.txt", "pyproject.toml", "composer.json"];
    const chosen = manifestPriority.find(name => lower.includes(name));
    if (!chosen) return;

    const originalPath = files[lower.indexOf(chosen)];
    const data = await api(
      "/repos/" + USERNAME + "/" + encodeURIComponent(repo.name) +
      "/contents/" + encodeURIComponent(originalPath) +
      "?ref=" + encodeURIComponent(repo.default_branch)
    );
    if (!data.content) return;

    const text = Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8");
    manifestPatterns.forEach(([pattern, name]) => {
      if (pattern.test(text)) addTechnology(map, name, repo.name);
    });
  } catch (error) {
    console.log("Skipping deep scan for " + repo.name + ": " + error.message);
  }
}

function repoNode(repo) {
  return {
    name: repo.name,
    description: repo.description || "A project from my GitHub workspace.",
    forkCount: repo.forks_count,
    stargazers: {totalCount: repo.stargazers_count},
    url: repo.html_url,
    id: String(repo.id),
    diskUsage: repo.size,
    primaryLanguage: repo.language
      ? {name: repo.language, color: languageColors[repo.language] || "#8b949e"}
      : null
  };
}

function writeFallback() {
  if (!fs.existsSync(PROFILE_FILE)) {
    fs.writeFileSync(
      PROFILE_FILE,
      JSON.stringify(
        {
          data: {
            user: {
              name: "Kevin Nhim",
              bio: "Software Developer · Backend · Automation · Systems",
              avatarUrl: "https://github.com/" + USERNAME + ".png",
              location: "Cambodia",
              id: USERNAME,
              pinnedItems: {totalCount: 0, edges: []}
            }
          }
        },
        null,
        2
      )
    );
  }

  if (!fs.existsSync(STATS_FILE)) {
    fs.writeFileSync(
      STATS_FILE,
      JSON.stringify(
        {
          projects: 0,
          languageCount: 0,
          technologyCount: 0,
          githubSince: "",
          languages: [],
          technologies: []
        },
        null,
        2
      )
    );
  }
}

async function run() {
  console.log("Analyzing public GitHub data for " + USERNAME + "...");

  const [profile, rawRepos] = await Promise.all([
    api("/users/" + USERNAME),
    api("/users/" + USERNAME + "/repos?per_page=100&type=owner&sort=updated")
  ]);

  const repos = rawRepos.filter(
    repo =>
      !repo.fork &&
      !repo.archived &&
      repo.size > 0 &&
      repo.name.toLowerCase() !== USERNAME.toLowerCase() &&
      repo.name.toLowerCase() !== "developerfolio"
  );

  const selected = [];
  featuredNames.forEach(name => {
    const found = repos.find(repo => repo.name === name);
    if (found) selected.push(found);
  });
  repos.forEach(repo => {
    if (selected.length < 6 && !selected.some(item => item.id === repo.id)) selected.push(repo);
  });

  const technologies = new Map();
  repos.forEach(repo => inferTechnologies(repo, technologies));

  await Promise.all(repos.slice(0, 8).map(repo => inspectManifest(repo, technologies)));

  const languageMap = new Map();
  repos.forEach(repo => {
    if (repo.language) {
      languageMap.set(repo.language, (languageMap.get(repo.language) || 0) + 1);
    }
  });

  const languages = [...languageMap.entries()]
    .map(([name, projects]) => ({
      name,
      projects,
      percent: repos.length ? (projects / repos.length) * 100 : 0
    }))
    .sort((a, b) => b.projects - a.projects);

  const techList = [...technologies.entries()]
    .map(([name, projectNames]) => ({name, projects: projectNames.size}))
    .sort((a, b) => b.projects - a.projects || a.name.localeCompare(b.name));

  const user = {
    name: profile.name || "Kevin Nhim",
    bio: profile.bio || "Software Developer · Backend · Automation · Systems",
    avatarUrl: profile.avatar_url,
    location: profile.location || "Cambodia",
    id: String(profile.id),
    pinnedItems: {
      totalCount: selected.length,
      edges: selected.map(repo => ({node: repoNode(repo)}))
    }
  };

  fs.writeFileSync(PROFILE_FILE, JSON.stringify({data: {user}}, null, 2));
  fs.writeFileSync(
    STATS_FILE,
    JSON.stringify(
      {
        projects: repos.length,
        languageCount: languages.length,
        technologyCount: techList.length,
        githubSince: new Date(profile.created_at).getFullYear(),
        languages,
        technologies: techList,
        generatedAt: new Date().toISOString()
      },
      null,
      2
    )
  );

  console.log(
    "GitHub analysis complete: " +
      repos.length +
      " projects, " +
      languages.length +
      " languages, " +
      techList.length +
      " technologies."
  );
}

run().catch(error => {
  console.error("GitHub analysis failed: " + error.message);
  console.error("Using the last generated/fallback data so the portfolio can still build.");
  writeFallback();
});

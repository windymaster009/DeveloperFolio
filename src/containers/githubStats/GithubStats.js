import React, {useContext, useEffect, useState} from "react";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import "./GithubStats.scss";

const iconMap = {
  JavaScript: ["javascript", "F7DF1E"],
  TypeScript: ["typescript", "3178C6"],
  Python: ["python", "3776AB"],
  HTML: ["html5", "E34F26"],
  CSS: ["css3", "1572B6"],
  PHP: ["php", "777BB4"],
  Vue: ["vuedotjs", "4FC08D"],
  "Vue.js": ["vuedotjs", "4FC08D"],
  Kotlin: ["kotlin", "7F52FF"],
  Java: ["openjdk", "437291"],
  "C#": ["csharp", "512BD4"],
  "C++": ["cplusplus", "00599C"],
  C: ["c", "A8B9CC"],
  Shell: ["gnubash", "4EAA25"],
  Lua: ["lua", "2C2D72"],
  Blade: ["laravel", "FF2D20"],

  MongoDB: ["mongodb", "47A248"],
  "Telegram Bot API": ["telegram", "26A5E4"],
  "Discord API": ["discord", "5865F2"],
  "Discord.js": ["discord", "5865F2"],
  PM2: ["pm2", "2B037A"],
  Vite: ["vite", "646CFF"],
  Express: ["express", "000000"],
  FastAPI: ["fastapi", "009688"],
  Flask: ["flask", "000000"],
  Laravel: ["laravel", "FF2D20"],
  React: ["react", "61DAFB"],
  Telethon: ["telegram", "26A5E4"],
  Aiogram: ["telegram", "26A5E4"],
  "Next.js": ["nextdotjs", "000000"],
  "Node.js": ["nodedotjs", "339933"],
  Redis: ["redis", "FF4438"],
  Docker: ["docker", "2496ED"],
  Firebase: ["firebase", "DD2C00"],
  "Tailwind CSS": ["tailwindcss", "06B6D4"],
  Electron: ["electron", "47848F"],
  Selenium: ["selenium", "43B02A"],
  Playwright: ["playwright", "2EAD33"],
  "Raspberry Pi": ["raspberrypi", "A22846"],
  Cloudflare: ["cloudflare", "F38020"],
  MySQL: ["mysql", "4479A1"],
  PostgreSQL: ["postgresql", "4169E1"],
  SQLite: ["sqlite", "003B57"],
  Prisma: ["prisma", "2D3748"],
  Django: ["django", "092E20"],
  Pyrogram: ["telegram", "26A5E4"],
  SQLAlchemy: ["sqlalchemy", "D71F00"]
};

function TechIcon({name}) {
  const icon = iconMap[name];
  const [failed, setFailed] = useState(false);

  if (!icon || failed) {
    const initials = name
      .replace(/[^A-Za-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(word => word[0])
      .join("")
      .toUpperCase();

    return <span className="github-icon-fallback">{initials || "•"}</span>;
  }

  const [slug, color] = icon;

  return (
    <img
      className="github-stack-logo"
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function IconTile({item}) {
  return (
    <div
      className="github-icon-tile"
      title={`${item.name} · ${item.projects} project${item.projects === 1 ? "" : "s"}`}
      aria-label={`${item.name}, used in ${item.projects} project${item.projects === 1 ? "" : "s"}`}
      tabIndex="0"
    >
      <div className="github-icon-logo-wrap">
        <TechIcon name={item.name} />
      </div>
      <strong className="github-icon-count">{item.projects}</strong>
      <span className="github-icon-project-word">
        {item.projects === 1 ? "project" : "projects"}
      </span>
    </div>
  );
}

export default function GithubStats() {
  const {isDark} = useContext(StyleContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/github-stats.json")
      .then(response => {
        if (!response.ok) throw new Error("GitHub stats unavailable");
        return response.json();
      })
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  if (!stats) return null;

  const metrics = [
    {label: "Public Projects", value: stats.projects},
    {label: "Languages", value: stats.languageCount},
    {label: "Technologies", value: stats.technologyCount},
    {label: "GitHub Since", value: stats.githubSince}
  ];

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main github-stats-main" id="github-stats">
        <h1 className="skills-heading">GitHub at a Glance</h1>
        <p
          className={
            isDark
              ? "dark-mode subTitle github-stats-subtitle"
              : "subTitle github-stats-subtitle"
          }
        >
          Automatically analyzed from my public GitHub repositories. Forks,
          archived repositories and empty repositories are excluded.
        </p>

        <div className="github-metrics-grid">
          {metrics.map(metric => (
            <div className="github-metric-card" key={metric.label}>
              <span className="github-metric-value">{metric.value}</span>
              <span className="github-metric-label">{metric.label}</span>
            </div>
          ))}
        </div>

        <div className="github-analysis-grid">
          <div className="github-analysis-card">
            <div className="github-analysis-heading">
              <div>
                <h2>Languages used</h2>
                <p>Hover a logo to see its name.</p>
              </div>
              <span>{stats.languageCount}</span>
            </div>
            <div className="github-icon-grid github-language-icon-grid">
              {(stats.languages || []).slice(0, 12).map(language => (
                <IconTile item={language} key={language.name} />
              ))}
            </div>
          </div>

          <div className="github-analysis-card">
            <div className="github-analysis-heading">
              <div>
                <h2>Technologies</h2>
                <p>Detected automatically from my projects.</p>
              </div>
              <span>{stats.technologyCount}</span>
            </div>
            <div className="github-icon-grid">
              {(stats.technologies || []).slice(0, 20).map(technology => (
                <IconTile item={technology} key={technology.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}

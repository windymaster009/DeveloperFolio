import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/data/site";
import { getGitHubData, type GitHubRepo } from "@/lib/github";

function ExternalIcon() {
  return <span aria-hidden="true">↗</span>;
}

function ProjectCard({ repo }: { repo: GitHubRepo }) {
  const tags = [repo.language, ...(repo.topics ?? []).slice(0, 3)].filter(Boolean) as string[];

  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="repo-mark" aria-hidden="true">⌘</span>
        <div className="repo-metrics" aria-label="Repository metrics">
          <span>★ {repo.stargazers_count}</span>
          <span>⑂ {repo.forks_count}</span>
        </div>
      </div>

      <div>
        <p className="eyebrow">GitHub project</p>
        <h3>{repo.name}</h3>
        <p className="project-description">
          {repo.description || "A project from my GitHub workspace."}
        </p>
      </div>

      <div className="project-footer">
        <div className="tag-row">
          {tags.length ? tags.map((tag) => <span className="tag" key={tag}>{tag}</span>) : (
            <span className="tag">Project</span>
          )}
        </div>
        <a href={repo.html_url} target="_blank" rel="noreferrer" className="project-link">
          View repository <ExternalIcon />
        </a>
      </div>
    </article>
  );
}

export default async function Home() {
  const data = await getGitHubData();
  const recentRepos = data.repositories.slice(0, 9);
  const topTechnologies = data.technologies.slice(0, 18);
  const topLanguages = data.languages.slice(0, 8);

  const stats = [
    { value: data.summary.projects, label: "Public projects" },
    { value: data.summary.languages, label: "Languages detected" },
    { value: data.summary.technologies, label: "Technologies detected" },
    { value: data.summary.githubSince, label: "On GitHub since" },
  ];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Back to top">
          <span className="brand-mark">KN</span>
          <span>Kevin Nhim</span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#stack">Stack</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-actions">
          <a className="header-github" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
            GitHub <ExternalIcon />
          </a>
          <ThemeToggle />
        </div>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="status-pill">
            <span className="status-dot" />
            GitHub-powered portfolio
          </div>
          <p className="kicker">HELLO, I&apos;M KEVIN.</p>
          <h1>
            I build software that
            <span> solves real problems.</span>
          </h1>
          <p className="hero-lead">{siteConfig.intro}</p>

          <div className="hero-actions">
            <a className="primary-button" href="#projects">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
            <a className="secondary-button" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
              github.com/{siteConfig.username} <ExternalIcon />
            </a>
          </div>

          {data.error ? (
            <p className="data-warning">
              Live GitHub analysis is temporarily unavailable. The page will retry after the server cache refreshes.
            </p>
          ) : (
            <p className="data-note">
              Stats refresh automatically from public GitHub repositories. Forks, archived repos, and empty repos are excluded.
            </p>
          )}
        </div>

        <aside className="profile-panel" aria-label="Developer profile">
          <div className="avatar-ring">
            {/* GitHub avatar is intentionally loaded directly so it always follows the profile image. */}
            <img
              src={data.profile.avatar_url}
              alt={data.profile.name || siteConfig.name}
              className="avatar"
            />
          </div>
          <p className="profile-name">{data.profile.name || siteConfig.name}</p>
          <p className="profile-role">{siteConfig.headline}</p>
          <div className="profile-mini-grid">
            <div>
              <strong>{data.profile.followers}</strong>
              <span>Followers</span>
            </div>
            <div>
              <strong>{data.summary.projects}</strong>
              <span>Projects</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="stats-strip shell" aria-label="GitHub statistics">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="section shell" id="about">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">WHAT I BUILD</p>
            <h2>From idea to something people can actually use.</h2>
          </div>
          <p>
            My work spans backend services, automation, full-stack products, and small systems.
            I like projects where software has to connect to something real: users, APIs, devices,
            messages, payments, or infrastructure.
          </p>
        </div>

        <div className="focus-grid">
          {siteConfig.focusAreas.map((area) => (
            <article className="focus-card" key={area.title}>
              <span className="focus-icon" aria-hidden="true">{area.icon}</span>
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell" id="stack">
        <div className="section-heading">
          <p className="eyebrow">LIVE GITHUB ANALYSIS</p>
          <h2>The stack I&apos;ve actually used.</h2>
          <p>
            These numbers are detected from repository languages, topics, names, descriptions,
            and common dependency manifests. They update as my public GitHub changes.
          </p>
        </div>

        <div className="stack-layout">
          <div className="stack-card">
            <div className="card-heading">
              <div>
                <p className="eyebrow">TECHNOLOGIES</p>
                <h3>{data.summary.technologies} detected</h3>
              </div>
              <span className="live-badge"><span /> AUTO</span>
            </div>

            {topTechnologies.length ? (
              <div className="tech-grid">
                {topTechnologies.map((tech) => (
                  <div className="tech-item" key={tech.name}>
                    <span>{tech.name}</span>
                    <strong>{tech.projects} {tech.projects === 1 ? "project" : "projects"}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">Technology analysis will appear when GitHub data is available.</p>
            )}
          </div>

          <div className="stack-card">
            <div className="card-heading">
              <div>
                <p className="eyebrow">PROGRAMMING LANGUAGES</p>
                <h3>{data.summary.languages} detected</h3>
              </div>
            </div>

            {topLanguages.length ? (
              <div className="language-list">
                {topLanguages.map((language) => (
                  <div className="language-row" key={language.name}>
                    <div className="language-meta">
                      <span>{language.name}</span>
                      <strong>{language.percent.toFixed(language.percent < 1 ? 1 : 0)}%</strong>
                    </div>
                    <div className="language-track" aria-hidden="true">
                      <span style={{ width: `${Math.max(language.percent, 1.5)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">Language analysis will appear when GitHub data is available.</p>
            )}
          </div>
        </div>
      </section>

      <section className="section shell" id="projects">
        <div className="section-heading project-heading">
          <div>
            <p className="eyebrow">FEATURED WORK</p>
            <h2>Projects worth opening.</h2>
          </div>
          <a className="text-link" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
            All repositories <ExternalIcon />
          </a>
        </div>

        {data.featured.length ? (
          <div className="project-grid featured-grid">
            {data.featured.map((repo) => <ProjectCard key={repo.id} repo={repo} />)}
          </div>
        ) : (
          <div className="empty-card">GitHub projects will appear here when the live data is available.</div>
        )}
      </section>

      {recentRepos.length > 0 && (
        <section className="section shell">
          <div className="section-heading project-heading">
            <div>
              <p className="eyebrow">RECENT ACTIVITY</p>
              <h2>What I&apos;ve been working on lately.</h2>
            </div>
          </div>

          <div className="recent-grid">
            {recentRepos.map((repo) => (
              <a className="recent-repo" href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}>
                <div>
                  <strong>{repo.name}</strong>
                  <span>{repo.language || "Project"}</span>
                </div>
                <ExternalIcon />
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="contact-section shell" id="contact">
        <div>
          <p className="eyebrow">LET&apos;S CONNECT</p>
          <h2>See the code behind the work.</h2>
          <p>
            My GitHub is the source of truth for this portfolio. As I build and publish more,
            the project and technology sections keep evolving with it.
          </p>
        </div>
        <a className="primary-button" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
          Open GitHub profile <ExternalIcon />
        </a>
      </section>

      <footer className="site-footer shell">
        <span>© {new Date().getFullYear()} Kevin Nhim</span>
        <span>Built with Next.js · Powered by GitHub data</span>
      </footer>
    </main>
  );
}

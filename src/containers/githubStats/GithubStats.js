import React, {useContext, useEffect, useState} from "react";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import "./GithubStats.scss";

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
        <p className={isDark ? "dark-mode subTitle github-stats-subtitle" : "subTitle github-stats-subtitle"}>
          Automatically analyzed from my public GitHub repositories. Forks, archived repositories and empty repositories are excluded.
        </p>

        <div className="github-metrics-grid">
          {metrics.map(metric => (
            <div className={isDark ? "dark-mode github-metric-card" : "github-metric-card"} key={metric.label}>
              <span className="github-metric-value">{metric.value}</span>
              <span className="github-metric-label">{metric.label}</span>
            </div>
          ))}
        </div>

        <div className="github-analysis-grid">
          <div className={isDark ? "dark-mode github-analysis-card" : "github-analysis-card"}>
            <h2>Languages used</h2>
            {(stats.languages || []).slice(0, 8).map(language => (
              <div className="github-language-row" key={language.name}>
                <div className="github-language-label">
                  <span>{language.name}</span>
                  <span>{language.projects} project{language.projects === 1 ? "" : "s"}</span>
                </div>
                <div className="github-language-meter">
                  <span style={{width: Math.max(language.percent, 3) + "%"}}></span>
                </div>
              </div>
            ))}
          </div>

          <div className={isDark ? "dark-mode github-analysis-card" : "github-analysis-card"}>
            <h2>Technologies detected</h2>
            <div className="github-tech-grid">
              {(stats.technologies || []).slice(0, 20).map(technology => (
                <div className="github-tech-pill" key={technology.name}>
                  <span>{technology.name}</span>
                  <small>{technology.projects} project{technology.projects === 1 ? "" : "s"}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}

import React, {useContext} from "react";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import {
  greeting,
  workExperiences,
  skillsSection,
  educationInfo,
  openSource,
  blogSection,
  talkSection,
  achievementSection,
  resumeSection
} from "../../portfolio";

function Header() {
  const {isDark} = useContext(StyleContext);
  return (
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
        <a href="/" className="logo">
          <span className="grey-color"> &lt;</span>
          <span className="logo-name">{greeting.username}</span>
          <span className="grey-color">/&gt;</span>
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn" style={{color: "white"}}>
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </label>
        <ul className={isDark ? "dark-menu menu" : "menu"}>
          {skillsSection.display && <li><a href="#skills">Skills</a></li>}
          {educationInfo.display && <li><a href="#education">Education</a></li>}
          <li><a href="#github-stats">GitHub Stats</a></li>
          {workExperiences.display && <li><a href="#experience">Work Experiences</a></li>}
          {openSource.display && <li><a href="#opensource">Open Source</a></li>}
          {achievementSection.display && <li><a href="#achievements">Achievements</a></li>}
          {blogSection.display && <li><a href="#blogs">Blogs</a></li>}
          {talkSection.display && <li><a href="#talks">Talks</a></li>}
          {resumeSection.display && <li><a href="#resume">Resume</a></li>}
          <li><a href="#contact">Contact Me</a></li>
          <li>
            <a href="#theme" onClick={event => event.preventDefault()} aria-label="Toggle dark mode">
              <ToggleSwitch />
            </a>
          </li>
        </ul>
      </header>
    </Headroom>
  );
}
export default Header;

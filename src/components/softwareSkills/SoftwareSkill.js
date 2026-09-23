import React from "react";
import "./SoftwareSkill.scss";
import {skillsSection} from "../../portfolio";

export default function SoftwareSkill() {
  return (
    <div className="software-skills-main-div">
      <ul className="dev-icons">
        {skillsSection.softwareSkills.map((skill, i) => {
          const glowStyle = {
            "--brand-color": skill.brandColor || "#645beb"
          };

          return (
            <li
              key={i}
              className="software-skill-inline"
              title={skill.skillName}
              style={glowStyle}
              tabIndex="0"
            >
              <div className="software-logo-wrap">
                {skill.imageSrc ? (
                  <img
                    src={skill.imageSrc}
                    alt={skill.skillName + " logo"}
                    className="software-logo-image"
                  />
                ) : (
                  <i
                    className={skill.fontAwesomeClassname}
                    style={{color: skill.brandColor}}
                    aria-hidden="true"
                  ></i>
                )}
              </div>
              <p>{skill.skillName}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

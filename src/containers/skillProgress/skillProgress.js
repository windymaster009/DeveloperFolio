import React from "react";
import "./Progress.scss";
import {techStack} from "../../portfolio";
import {Fade} from "react-reveal";

export default function StackProgress() {
  if (!techStack.viewSkillBars) {
    return null;
  }

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="proficiency-section">
        <div className="proficiency-header">
          <h1 className="skills-heading">Proficiency</h1>
          <p>
            A simple view of where I spend most of my development time.
          </p>
        </div>

        <div className="proficiency-grid">
          {techStack.experience.map((exp, i) => {
            const percent = parseInt(exp.progressPercentage, 10) || 0;
            const donutStyle = {
              "--progress": percent,
              "--donut-color": exp.color || "#6c63ff"
            };

            return (
              <div className="proficiency-card" key={i}>
                <div className="donut-wrap">
                  <div className="donut" style={donutStyle}>
                    <div className="donut-center">
                      <strong>{percent}%</strong>
                    </div>
                  </div>
                </div>
                <h3>{exp.Stack}</h3>
                <p>{exp.description || "Hands-on project experience"}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Fade>
  );
}

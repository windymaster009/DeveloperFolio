import React from "react";
import "./Education.scss";
import EducationCard from "../../components/educationCard/EducationCard";
import {educationInfo} from "../../portfolio";
import {Fade} from "react-reveal";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import rocket from "../../assets/lottie/rocket.json";

export default function Education() {
  if (!educationInfo.display) {
    return null;
  }

  return (
    <div className="education-section" id="education">
      <Fade bottom duration={900} distance="20px">
        <div className="education-heading-row">
          <div className="education-heading-copy">
            <h1 className="education-heading">Education</h1>
            <p className="education-kicker">
              Computer Science foundation, practical learning, and continuous self-study.
            </p>
          </div>
          <div className="education-lottie" aria-hidden="true">
            <DisplayLottie animationData={rocket} />
          </div>
        </div>
      </Fade>

      <div className="education-card-container">
        {educationInfo.schools.map((school, index) => (
          <EducationCard key={index} school={school} />
        ))}
      </div>
    </div>
  );
}

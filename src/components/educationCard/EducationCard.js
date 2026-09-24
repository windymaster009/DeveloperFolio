import React from "react";
import {Fade} from "react-reveal";
import "./EducationCard.scss";

export default function EducationCard({school, index = 0}) {
  const GetDescBullets = ({descBullets}) =>
    descBullets
      ? descBullets.map((item, i) => (
          <li key={i} className="education-bullet">
            {item}
          </li>
        ))
      : null;

  const accent = school.accentColor || "#645beb";
  const isPhoto = school.imageType === "photo";
  const cardClass = [
    "education-card",
    isPhoto ? "education-card-photo" : "education-card-logo",
    index % 2 ? "education-card-reverse" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Fade
      bottom
      duration={850}
      delay={index * 130}
      distance="28px"
    >
      <article
        className={cardClass}
        style={{"--school-accent": accent}}
      >
        <span className="education-step" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="education-card-media">
          <div className="education-media-glow" aria-hidden="true"></div>
          <img
            crossOrigin="anonymous"
            className="education-school-image"
            src={school.logo}
            alt={school.schoolName}
          />
        </div>

        <div className="education-card-content">
          <div className="education-card-topline">
            <span className="education-duration">{school.duration}</span>
            <span className="education-stage">
              {school.subHeader}
            </span>
          </div>

          <h3 className="education-text-school">{school.schoolName}</h3>

          <p className="education-text-desc">{school.desc}</p>

          {school.descBullets && school.descBullets.length > 0 && (
            <ul className="education-text-bullets">
              <GetDescBullets descBullets={school.descBullets} />
            </ul>
          )}

          {school.schoolLink && (
            <a
              className="education-school-link"
              href={school.schoolLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit school <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </article>
    </Fade>
  );
}

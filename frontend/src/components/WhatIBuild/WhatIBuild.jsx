import "./WhatIBuild.css";
import GlobeCanvas from "./GlobeCanvas";

const specialties = [
  { icon: "⬡", color: "gold",   label: "Backend Architect"         },
  { icon: "◈", color: "teal",   label: "API & Integration Builder"  },
  { icon: "◆", color: "violet", label: "Full-Stack Product Dev"     },
  { icon: "◉", color: "indigo", label: "Database Systems Expert"    },
];

const pillars = [
  { color: "gold",    label: "Security & Reliability" },
  { color: "teal",    label: "Scalability"             },
  { color: "violet",  label: "Clean Architecture"      },
  { color: "indigo",  label: "Data-Driven Design"      },
  { color: "emerald", label: "Developer Velocity"      },
];

const WhatIBuild = () => (
  <section className="wib-sovereign">
    <div className="wib-container">

      {/* Left — globe with floating pillar labels */}
      <div className="wib-globe-col" aria-hidden="true">
        <GlobeCanvas pillars={pillars} />
      </div>

      {/* Right — content */}
      <div className="wib-content rv d1">
        <p className="section-eyebrow">What I Build</p>
        <h2 className="section-heading">
          Infrastructure that<br />
          <em>Endures.</em>
        </h2>
        <p className="wib-description">
          I engineer systems that stay fast under pressure and scale without
          breaking a sweat — blending thoughtful architecture with pragmatic
          execution to ship products that last.
        </p>

        <ul className="wib-specialties">
          {specialties.map(({ icon, color, label }) => (
            <li key={label} className="wib-specialty">
              <span className={`wib-icon wib-icon--${color}`}>{icon}</span>
              <span className="wib-specialty-label">{label}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  </section>
);

export default WhatIBuild;

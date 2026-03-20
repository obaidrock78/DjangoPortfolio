import "./WhatIBuild.css";
import GlobeCanvas from "./GlobeCanvas";

const specialties = [
  { icon: "⬡", color: "gold",   label: "Backend Architect"        },
  { icon: "◈", color: "teal",   label: "API & Integration Builder" },
  { icon: "◆", color: "violet", label: "Full-Stack Product Dev"    },
  { icon: "◉", color: "indigo", label: "Database Systems Expert"   },
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

    {/* ── animated globe background ── */}
    <div className="wib-globe-wrap" aria-hidden="true">
      <GlobeCanvas />
    </div>

    <div className="wib-container">

      {/* Left column */}
      <div className="wib-left rv d1">
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

      {/* Right column */}
      <div className="wib-right rv d3">
        <div className="wib-pillars-card">
          <p className="wib-pillars-title">Engineering Pillars</p>
          <div className="wib-pillars">
            {pillars.map(({ color, label }) => (
              <div key={label} className="wib-pillar">
                <span className={`wib-dot wib-dot--${color}`} />
                <span className="wib-pillar-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="wib-metric-strip rv d5">
          <div className="wib-metric">
            <span className="wib-metric-value">99%</span>
            <span className="wib-metric-label">Uptime Target</span>
          </div>
          <div className="wib-metric-divider" />
          <div className="wib-metric">
            <span className="wib-metric-value">&lt;200ms</span>
            <span className="wib-metric-label">API Response</span>
          </div>
          <div className="wib-metric-divider" />
          <div className="wib-metric">
            <span className="wib-metric-value">0</span>
            <span className="wib-metric-label">Shortcuts Taken</span>
          </div>
        </div>
      </div>

    </div>
  </section>
);

export default WhatIBuild;

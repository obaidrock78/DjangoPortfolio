import "./progress.css";
import { baseUrlImages, useGetLanguagesIconsQuery } from "../../Api/api";
import { useEffect, useState } from "react";

/* Map API exp_level → bar percentage */
const levelToPct = {
  Experienced:  93,
  Intermediate: 72,
  Junior:       52,
  Beginner:     35,
};

/* Per-level accent color */
const levelColor = {
  Experienced:  "#45DE99",
  Intermediate: "#7B8FEE",
  Junior:       "#D4AF5A",
  Beginner:     "#4EEADE",
};

const categories = [
  {
    icon: "fas fa-server",
    title: "Backend",
    color: "teal",
    skills: ["Django", "DRF", "Flask", "Node.js", "Express", "Celery", "FastAPI"],
  },
  {
    icon: "fas fa-desktop",
    title: "Frontend",
    color: "indigo",
    skills: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    icon: "fas fa-database",
    title: "Data & Cloud",
    color: "emerald",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firestore", "AWS", "REST APIs"],
  },
  {
    icon: "fas fa-link",
    title: "Blockchain",
    color: "gold",
    skills: ["Solidity", "ERC-721", "ERC-3643", "Web3.js", "IPFS", "Hardhat", "LayerZero"],
  },
  {
    icon: "fas fa-tools",
    title: "DevOps & AI",
    color: "violet",
    skills: ["Docker", "Git", "Linux", "Postman", "OpenAI API", "AI/ML", "IoT / MQTT"],
  },
];

const colorMap = {
  teal:    { text: "var(--teal)",     bg: "rgba(78,234,222,0.10)",  border: "rgba(78,234,222,0.25)"  },
  indigo:  { text: "var(--indigo)",   bg: "rgba(123,143,238,0.10)", border: "rgba(123,143,238,0.25)" },
  emerald: { text: "var(--emerald)",  bg: "rgba(69,222,153,0.10)",  border: "rgba(69,222,153,0.25)"  },
  gold:    { text: "var(--gold-warm)",bg: "rgba(212,175,90,0.10)",  border: "rgba(212,175,90,0.25)"  },
  violet:  { text: "var(--violet)",   bg: "rgba(165,133,196,0.12)", border: "rgba(165,133,196,0.28)" },
};

const Progress = () => {
  const { data: langIcons, isFetching } = useGetLanguagesIconsQuery();
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    if (langIcons) setIcons(langIcons);
  }, [langIcons]);

  if (isFetching) return null;

  /* Split API icons: top 6 Experienced → bars; rest → icon grid */
  const experienced = icons.filter(i => i.exp_level === "Experienced");
  const others      = icons.filter(i => i.exp_level !== "Experienced");

  /* Use experienced icons for bars (up to 6), fallback if API empty */
  const barItems = experienced.length > 0
    ? experienced.slice(0, 6)
    : [
        { id: 1, lang_name: "Django",     exp_level: "Experienced",  icon: null },
        { id: 2, lang_name: "Python",     exp_level: "Experienced",  icon: null },
        { id: 3, lang_name: "JavaScript", exp_level: "Experienced",  icon: null },
        { id: 4, lang_name: "React",      exp_level: "Experienced",  icon: null },
        { id: 5, lang_name: "PostgreSQL", exp_level: "Experienced",  icon: null },
        { id: 6, lang_name: "Solidity",   exp_level: "Intermediate", icon: null },
      ];

  /* All other levels go into the icon grid */
  const gridItems = others.length > 0 ? others : [];

  return (
    <section className="skills-sovereign" id="skills">
      <div className="skills-container">

        {/* ── Header ── */}
        <div className="skills-header rv">
          <p className="section-eyebrow">Technical Arsenal</p>
          <div className="skills-header-inner">
            <h2 className="section-heading">
              Built to ship.<br /><em>Skilled to scale.</em>
            </h2>
            <div className="skills-stats">
              <div className="sk-stat">
                <span className="sk-stat-val">5+</span>
                <span className="sk-stat-label">Years</span>
              </div>
              <div className="sk-stat-div" />
              <div className="sk-stat">
                <span className="sk-stat-val">{icons.length || "18"}+</span>
                <span className="sk-stat-label">Technologies</span>
              </div>
              <div className="sk-stat-div" />
              <div className="sk-stat">
                <span className="sk-stat-val">12+</span>
                <span className="sk-stat-label">Projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Top: bars + description ── */}
        <div className="skills-top">

          {/* Left — animated bars from API "Experienced" items */}
          <div className="skills-bars rv d2">
            <p className="skills-bars-label">Core Proficiencies</p>
            {barItems.map((item, i) => {
              const pct   = levelToPct[item.exp_level] || 70;
              const color = levelColor[item.exp_level] || "#D4AF5A";
              const imgSrc = item.icon
                ? (item.icon.startsWith("http") ? item.icon : `${baseUrlImages}${item.icon}`)
                : null;

              return (
                <div className="skbar-row" key={item.id}>
                  <div className="skbar-meta">
                    <div className="skbar-name-group">
                      {imgSrc && (
                        <img className="skbar-icon" src={imgSrc} alt={item.lang_name} />
                      )}
                      <span className="skbar-name">{item.lang_name}</span>
                    </div>
                    <div className="skbar-right">
                      <span
                        className="skbar-level"
                        style={{ color, borderColor: `${color}55`, background: `${color}18` }}
                      >
                        {item.exp_level}
                      </span>
                      <span className="skbar-pct">{pct}%</span>
                    </div>
                  </div>
                  <div className="skbar-track">
                    <div
                      className="skbar-fill"
                      style={{
                        "--bar-width": `${pct}%`,
                        "--bar-delay": `${i * 0.12}s`,
                        background: `linear-gradient(to right, ${color}66, ${color})`,
                      }}
                    />
                    <div
                      className="skbar-glow"
                      style={{
                        "--bar-width": `${pct}%`,
                        "--bar-delay": `${i * 0.12}s`,
                        background: color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right — categorized pills */}
          <div className="skills-cats-col rv d3">
            <p className="skills-bars-label">Full Stack</p>
            <div className="skills-categories">
              {categories.map((cat) => {
                const c = colorMap[cat.color];
                return (
                  <div className="skcat" key={cat.title}>
                    <div className="skcat-header" style={{ color: c.text }}>
                      <i className={cat.icon} />
                      <span>{cat.title}</span>
                    </div>
                    <div className="skcat-pills">
                      {cat.skills.map((s) => (
                        <span
                          className="skcat-pill"
                          key={s}
                          style={{
                            "--pill-color":  c.text,
                            "--pill-bg":     c.bg,
                            "--pill-border": c.border,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── API icon grid (Intermediate / Junior / Beginner) ── */}
        {gridItems.length > 0 && (
          <div className="skills-icon-section rv d4">
            <div className="skills-icon-header">
              <span className="skills-icon-label">Also in the Arsenal</span>
              <div className="skills-icon-line" />
            </div>
            <div className="skills-icon-grid">
              {gridItems.map((item) => {
                const color  = levelColor[item.exp_level] || "#7490B0";
                const imgSrc = item.icon
                  ? (item.icon.startsWith("http") ? item.icon : `${baseUrlImages}${item.icon}`)
                  : null;
                return (
                  <div className="skicon-card" key={item.id}>
                    {imgSrc && <img src={imgSrc} alt={item.lang_name} />}
                    <span className="skicon-name">{item.lang_name}</span>
                    <span
                      className="skicon-badge"
                      style={{ color, borderColor: `${color}55`, background: `${color}18` }}
                    >
                      {item.exp_level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Progress;

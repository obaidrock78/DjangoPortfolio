import "./progress.css";
import { useGetLanguagesIconsQuery } from "../../Api/api";
import { useEffect, useState, useRef } from "react";

const ringData = [
  { name: "Django", pct: 95, color: "#28CA42" },
  { name: "Python", pct: 95, color: "#3776AB" },
  { name: "React", pct: 88, color: "#61DAFB" },
  { name: "JavaScript", pct: 92, color: "#FBBF24" },
  { name: "SQL", pct: 90, color: "#C9A655" },
  { name: "Node.js", pct: 85, color: "#34D399" },
];

const categories = [
  {
    title: "Backend & Frameworks",
    skills: ["Django", "Django REST Framework", "Flask", "Node.js", "Express", "Celery"],
  },
  {
    title: "Frontend & UI",
    skills: ["React", "Next.js", "Vue.js", "JavaScript", "Tailwind CSS", "CSS3", "HTML5"],
  },
  {
    title: "Databases & Cloud",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Firestore", "AWS", "REST APIs", "Redis"],
  },
  {
    title: "DevOps & Tools",
    skills: ["Git", "GitHub", "Docker", "Postman", "VS Code", "Linux"],
  },
  {
    title: "Emerging Tech",
    skills: ["Solidity", "Blockchain", "Smart Contracts", "AI/ML", "IoT", "OpenAI API"],
  },
];

const CIRCUMFERENCE = 2 * Math.PI * 34; // ~213.6

const SkillRing = ({ name, pct, color, animated }) => {
  const offset = animated ? CIRCUMFERENCE * (1 - pct / 100) : CIRCUMFERENCE;

  return (
    <div className="skill-ring-item">
      <svg className="skill-ring-svg" viewBox="0 0 80 80">
        <circle className="skill-ring-bg" cx="40" cy="40" r="34" />
        <circle
          className="skill-ring-progress"
          cx="40"
          cy="40"
          r="34"
          stroke={color}
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <span className="skill-ring-pct">{pct}%</span>
      <span className="skill-ring-name">{name}</span>
    </div>
  );
};

const Progress = () => {
  const { data: langIcons, isFetching } = useGetLanguagesIconsQuery();
  const [icons, setIcons] = useState(langIcons);
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIcons(langIcons);
  }, [langIcons]);

  // IntersectionObserver for ring animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  if (isFetching) return null;

  return (
    <section className="skills-sovereign" id="skills" ref={sectionRef}>
      <div className="skills-grid">
        <div className="skills-header rv">
          <div className="section-eyebrow">Technical Arsenal</div>
          <h2 className="section-heading">
            Skills & <em>Proficiency</em>
          </h2>
        </div>

        {/* Left: SVG Progress Rings */}
        <div className="skills-rings rv d2">
          {ringData.map((r) => (
            <SkillRing key={r.name} {...r} animated={animated} />
          ))}
        </div>

        {/* Right: Categorized Pills */}
        <div className="skills-categories rv d3">
          {categories.map((cat) => (
            <div className="skills-category" key={cat.title}>
              <div className="skills-category-title">{cat.title}</div>
              <div className="skills-pills">
                {cat.skills.map((s) => (
                  <span className="skill-pill" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Icons from API */}
        {icons && icons.length > 0 && (
          <div className="skills-icons-grid rv d4">
            {icons.map((detail) => (
              <div className="skill-icon-card" key={detail.id}>
                <img src={detail.icon} alt={detail.lang_name} />
                <h4>{detail.lang_name}</h4>
                <span className={`exp-badge ${detail.exp_level}`}>
                  {detail.exp_level}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Progress;

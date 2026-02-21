import "./progress.css";
import { useGetLanguagesIconsQuery } from "../../Api/api";
import { useEffect, useState } from "react";

const Progress = () => {
  const { data: langIcons, isFetching } = useGetLanguagesIconsQuery();
  const [icons, setIcons] = useState(langIcons);

  useEffect(() => {
    setIcons(langIcons);
  }, [langIcons]);

  if (isFetching || !icons?.length) return null;

  return (
    <section className="page-section skills-section" id="skills">
      <div className="section-inner">
        <header className="section-head">
          <span className="section-label">What I work with</span>
          <h2 className="section-title">Skills & tools</h2>
          <p className="section-subtitle">
            Technologies and tools I use to build and ship products.
          </p>
        </header>
        <div className="skills-grid">
          {icons.map((item) => (
            <div className="skill-card" key={item.id} title={item.lang_name}>
              <div className="skill-card-icon">
                <img src={item.icon} alt="" />
              </div>
              <span className="skill-card-name">{item.lang_name}</span>
              <span className={`skill-card-level ${(item.exp_level || "").toLowerCase().replace(/\s/g, "-")}`}>
                {item.exp_level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Progress;

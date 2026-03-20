import { baseUrlImages, useGetProjectsQuery } from "../../Api/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./projects.css";

const Projects = () => {
  const { data: projects, isFetching } = useGetProjectsQuery();
  const img_300 = baseUrlImages;

  const [projectsDetails, setProjectsDetails] = useState(projects);

  useEffect(() => {
    setProjectsDetails(projects);
  }, [projectsDetails, projects]);

  if (isFetching) return null;

  // Parse tech tags from language_used string
  const parseTech = (str) => {
    if (!str) return [];
    return str
      .split(/[,·|]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  };

  // Determine platform badges from language/tech string
  const getPlatforms = (str) => {
    if (!str) return [];
    const lower = str.toLowerCase();
    const platforms = [];
    if (lower.includes("ios") || lower.includes("swift")) platforms.push("ios");
    if (lower.includes("android") || lower.includes("kotlin")) platforms.push("android");
    if (lower.includes("react native")) platforms.push("react-native");
    if (
      lower.includes("react") ||
      lower.includes("web") ||
      lower.includes("html") ||
      lower.includes("django")
    )
      platforms.push("web");
    if (platforms.length === 0) platforms.push("web");
    return platforms;
  };

  return (
    <section className="projects-sovereign" id="work">
      <div className="projects-container">
        <div className="projects-header rv">
          <div className="section-eyebrow">Portfolio</div>
          <h2 className="section-heading">
            Selected <em>Work</em>
          </h2>
        </div>

        <div className="projects-grid">
          {projectsDetails?.map((details, idx) => (
            <Link
              to={`/project/${details.id}`}
              className={`project-card rv d${Math.min(idx + 1, 5)} ${
                idx === 0 ? "featured" : ""
              }`}
              key={details.id || idx}
            >
              <div className="project-card-img">
                <img
                  src={`${img_300}${details.image}`}
                  alt={details.Project_title}
                />
              </div>

              <div className="project-card-top">
                <div className="project-card-badges">
                  {getPlatforms(details.language_used).map((p) => (
                    <span className={`platform-pill ${p}`} key={p}>
                      {p === "react-native" ? "RN" : p.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="project-card-title">{details.Project_title}</h3>

              <div className="project-card-tech">
                {parseTech(details.language_used)
                  .slice(0, 4)
                  .map((t) => (
                    <span className="project-tech-tag" key={t}>
                      {t}
                    </span>
                  ))}
              </div>

              <span className="project-card-arrow">
                View Project <i className="fas fa-arrow-right" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

import { Link } from "react-router-dom";
import { baseUrlImages, useGetProjectsQuery } from "../../Api/api";
import { useEffect, useMemo, useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import "./projects.css";

const Projects = () => {
  const { data: projects, isFetching } = useGetProjectsQuery();
  const [projectsDetails, setProjectsDetails] = useState(projects);
  const [brokenImageIds, setBrokenImageIds] = useState(() => new Set());

  useEffect(() => {
    setProjectsDetails(projects);
  }, [projects]);

  const hideBrokenImage = (id) => {
    setBrokenImageIds((prev) => new Set(prev).add(id));
  };

  /* Spans chosen so each row sums to 3 — no empty grid cells */
  const spanClasses = useMemo(() => {
    const n = projectsDetails?.length ?? 0;
    const spans = [];
    let i = 0;
    while (i < n) {
      const left = n - i;
      let row;
      if (left === 1) row = [3];
      else if (left === 2) row = Math.random() < 0.5 ? [2, 1] : [1, 2];
      else {
        const r = Math.random();
        if (r < 0.25) row = [3];
        else if (r < 0.5) row = [2, 1];
        else if (r < 0.75) row = [1, 2];
        else row = [1, 1, 1];
      }
      row.forEach((s) => spans.push(s));
      i += row.length;
    }
    return spans;
  }, [projectsDetails?.length]);

  if (isFetching) return "loading";

  return (
    <section id="work" className="mywork projects-section">
      <SectionHeading label="Check Out My React Projects" title="My Work" />

      <div className="projects-grid">
        {projectsDetails?.map((details, index) => {
          const gradientIndex = (index % 5) + 1;
          const span = spanClasses[index] ?? 1;

          return (
            <Link
              to={`/project/${details.id}`}
              className={`project-card-link span-${span}`}
              key={details.id}
            >
              <article className="project-card" data-aos="fade-up">
                <div className="project-img-area">
                  {details.image && !brokenImageIds.has(details.id) && (
                    <img
                      src={`${baseUrlImages}${details.image}`}
                      alt={details.Project_title || "Project"}
                      className="project-img"
                      onError={() => hideBrokenImage(details.id)}
                    />
                  )}
                  <div className={`proj-bg proj-bg-${gradientIndex}`} />
                  <div className="mock-ui">
                    {details.Project_title || "Project"}
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-tags">
                    {details.language_used && (
                      <span className="tag">{details.language_used}</span>
                    )}
                  </div>
                  <h3 className="project-title">
                    {details.Project_title || "Project"}
                  </h3>
                  {details.Project_info && (
                    <p className="project-desc">{details.Project_info}</p>
                  )}
                  <div className="project-actions">
                    {details.demo_link && (
                      <a
                        href={details.demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        ↗ Live Demo
                      </a>
                    )}
                    <span className="btn-outline">View Details →</span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;

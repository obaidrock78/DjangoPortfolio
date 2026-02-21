import { baseUrlImages, useGetProjectsQuery } from "../../Api/api";
import { useEffect, useState } from "react";
import "./projects.css";

const Projects = () => {
  const { data: projects, isFetching } = useGetProjectsQuery();
  const img_300 = baseUrlImages;
  const [projectsDetails, setProjectsDetails] = useState(projects);

  useEffect(() => {
    setProjectsDetails(projects);
  }, [projects]);

  if (isFetching) return "loading";

  return (
    <div className="mywork" id="work">
      <div className="mywork-title">
        <h2>Check Out My React Projects</h2>
        <h3>My Work</h3>
      </div>
      <div className="project-grid">
        {projectsDetails?.map((details) => (
          <article className="project-card" key={details.id} data-aos="fade-up">
            <div className="project-card-img">
              <img
                src={`${img_300}${details.image}`}
                alt={details.Project_title || "Project"}
                className="work-img"
              />
            </div>
            <div className="project-card-body">
              <p className="project-card-tag">{details.language_used}</p>
              <h3 className="project-card-title">{details.Project_title}</h3>
              {details.Project_info && (
                <p className="project-card-desc">{details.Project_info}</p>
              )}
              <div className="project-card-links">
                {details.demo_link && (
                  <a
                    href={details.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link-demo"
                  >
                    <i className="fa fa-external-link" aria-hidden="true" /> Live Demo
                  </a>
                )}
                {details.project_link && (
                  <a
                    href={details.project_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link-code"
                  >
                    <i className="fa fa-github" aria-hidden="true" /> Source Code
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Projects;

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { baseUrlImages, useGetProjectsQuery } from "../Api/api";
import "./ProjectDetails.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: projects, isFetching } = useGetProjectsQuery();
  const project = projects?.find((p) => String(p.id) === String(id));
  const imgBase = baseUrlImages || "";
  const [imageFailed, setImageFailed] = useState(false);

  if (isFetching) {
    return (
      <div className="project-details-page">
        <div className="project-details-inner">
          <p className="project-details-loading">Loading…</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-details-page">
        <div className="project-details-inner">
          <div className="project-details-not-found">
            <h1>Project not found</h1>
            <p>This project may have been removed or the link is incorrect.</p>
            <Link to="/#work" className="project-details-back">
              ← Back to projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-details-page">
      <div className="project-details-inner">
        <Link to="/#work" className="project-details-back">
          ← Back to projects
        </Link>

        <article className="project-details-card">
          <div className="project-details-image">
            {project.image && !imageFailed && (
              <img
                src={`${imgBase}${project.image}`}
                alt={project.Project_title || "Project"}
                onError={() => setImageFailed(true)}
              />
            )}
            <div className="project-details-image-fallback">
              {project.Project_title || "Project"}
            </div>
          </div>
          <div className="project-details-content">
            <span className="project-details-tag">{project.language_used}</span>
            <h1 className="project-details-title">{project.Project_title}</h1>
            {project.Project_info && (
              <div
                className="project-details-description"
                dangerouslySetInnerHTML={{ __html: project.Project_info }}
              />
            )}
            <div className="project-details-actions">
              {project.demo_link && (
                <a
                  href={project.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-details-btn project-details-btn-primary"
                >
                  <i className="fa fa-external-link" aria-hidden="true" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProjectDetails;

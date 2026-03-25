import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { baseUrlImages, useGetProjectsQuery } from "../../Api/api";
import "./ProjectDetail.css";

const parseTech = (str) => {
  if (!str) return [];
  return str
    .split(/[,·|]+/)
    .map((s) => s.trim())
    .filter(Boolean);
};

const getPlatforms = (str) => {
  if (!str) return [];
  const lower = str.toLowerCase();
  const platforms = [];
  if (lower.includes("ios") || lower.includes("swift")) platforms.push("ios");
  if (lower.includes("android") || lower.includes("kotlin")) platforms.push("android");
  if (lower.includes("react native")) platforms.push("react-native");
  if (lower.includes("react") || lower.includes("web") || lower.includes("html") || lower.includes("django"))
    platforms.push("web");
  if (lower.includes("python") || lower.includes("flask")) platforms.push("web");
  if (lower.includes("solidity") || lower.includes("blockchain")) platforms.push("web");
  if (platforms.length === 0) platforms.push("web");
  return [...new Set(platforms)];
};

const ProjectDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data: projects, isFetching } = useGetProjectsQuery();
  const img_300 = baseUrlImages;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isFetching) return null;

  const project = projects?.find((p) => String(p.id) === String(id));

  if (!project) {
    return (
      <section className="project-detail-page">
        <div className="project-detail-container">
          <div className="project-detail-not-found">
            <h2>Project not found</h2>
            <button className="back-btn" onClick={() => history.goBack()}>
              <i className="fas fa-arrow-left" /> Back
            </button>
          </div>
        </div>
      </section>
    );
  }

  const techTags = parseTech(project.language_used);
  const platforms = getPlatforms(project.language_used);

  return (
    <section className="project-detail-page">
      <div className="project-detail-container">
        {/* Back button */}
        <button className="back-btn" onClick={() => history.goBack()}>
          <i className="fas fa-arrow-left" /> Back
        </button>

        {/* Hero image */}
        <div className="project-detail-hero">
          <img
            src={`${img_300}${project.image}`}
            alt={project.Project_title}
          />
        </div>

        {/* Content */}
        <div className="project-detail-content">
          <div className="project-detail-main">
            {/* Platform badges */}
            <div className="project-detail-badges">
              {platforms.map((p) => (
                <span className={`platform-pill ${p}`} key={p}>
                  {p === "react-native" ? "React Native" : p.toUpperCase()}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="project-detail-title">{project.Project_title}</h1>

            {/* Tech tags */}
            <div className="project-detail-tech">
              {techTags.map((t) => (
                <span className="project-tech-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="project-detail-desc">
              <h3 className="detail-section-label">About the Project</h3>
              <p>{project.Project_info}</p>
            </div>

            {/* Tech stack breakdown */}
            {techTags.length > 0 && (
              <div className="project-detail-stack">
                <h3 className="detail-section-label">Tech Stack</h3>
                <div className="stack-grid">
                  {techTags.map((t) => (
                    <div className="stack-item" key={t}>
                      <span className="stack-dot" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="project-detail-sidebar">
            {/* Action buttons */}
            <div className="project-detail-actions">
              {project.demo_link && (
                <a
                  href={project.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-action-btn primary"
                >
                  <i className="fa fa-external-link" /> Live Demo
                </a>
              )}
              {project.project_link && (
                <a
                  href={project.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-action-btn secondary"
                >
                  <i className="fa fa-github" /> Source Code
                </a>
              )}
            </div>

            {/* Meta info */}
            <div className="project-detail-meta">
              <div className="meta-item">
                <span className="meta-label">Category</span>
                <span className="meta-value">
                  {platforms.map((p) => (p === "react-native" ? "React Native" : p.charAt(0).toUpperCase() + p.slice(1))).join(", ")}
                </span>
              </div>
              {project.updated_on && (
                <div className="meta-item">
                  <span className="meta-label">Last Updated</span>
                  <span className="meta-value">
                    {new Date(project.updated_on).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>
              )}
              <div className="meta-item">
                <span className="meta-label">Technologies</span>
                <span className="meta-value">{techTags.length} used</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;

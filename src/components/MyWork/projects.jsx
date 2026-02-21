import { baseUrlImages, useGetProjectsQuery } from "../../Api/api";
import { useEffect, useState } from "react";
import "./projects.css";
import { Modal } from "react-bootstrap";

const Projects = () => {
  const { data: projects, isFetching } = useGetProjectsQuery();
  const [list, setList] = useState(projects);
  const [modalShow, setModalShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const imgBase = baseUrlImages || "";

  useEffect(() => {
    setList(projects);
  }, [projects]);

  if (isFetching) return null;

  return (
    <>
      <section className="page-section projects-section" id="work">
        <div className="section-inner">
          <header className="section-head">
            <span className="section-label">Selected work</span>
            <h2 className="section-title">Projects</h2>
            <p className="section-subtitle">
              A selection of recent projects and side work.
            </p>
          </header>
          <div className="projects-grid">
            {list?.map((project) => (
              <article
                className="project-card"
                key={project.id}
                onClick={() => {
                  setSelected(project);
                  setModalShow(true);
                }}
              >
                <div className="project-card-image">
                  <img src={`${imgBase}${project.image}`} alt="" />
                </div>
                <div className="project-card-meta">
                  <span className="project-card-tech">{project.language_used}</span>
                </div>
                <h3 className="project-card-title">{project.Project_title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered
        contentClassName="project-modal"
      >
        {selected && (
          <>
            <Modal.Header closeButton className="project-modal-header" />
            <Modal.Body className="project-modal-body">
              <div className="project-modal-image">
                <img src={`${imgBase}${selected.image}`} alt="" />
              </div>
              <span className="project-modal-tech">{selected.language_used}</span>
              <h3 className="project-modal-title">{selected.Project_title}</h3>
              <p className="project-modal-desc">{selected.Project_info}</p>
              <div className="project-modal-links">
                <a
                  href={selected.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-modal-btn"
                >
                  Live demo
                </a>
                <a
                  href={selected.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-modal-btn project-modal-btn-outline"
                >
                  Source code
                </a>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
};

export default Projects;

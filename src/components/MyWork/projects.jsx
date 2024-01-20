import { useGetProjectsQuery } from "../../Api/api";
import { useEffect, useMemo, useState } from "react";
import "./projects.css";
import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Button, Modal } from "react-bootstrap";

const Projects = () => {
  const { data: projects, isFetching } = useGetProjectsQuery();
  const img_300 = "https://globaltechserivce.online";

  
  const [projectsDetails, setProjectsDetails] = useState(projects);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState(null);
  useEffect(() => {
    setProjectsDetails(projects);
  }, [projectsDetails, projects]);

const renderCouresel = useMemo(() => {
  const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    dots: true,
    autoplay: false,
    navText: false,
    smartSpeed: 1000,
    mouseDrag: true,
    touchDrag: true,
    responsive: {
      0: {
        items: 1,
      },
      310: {
        items: 1,
      },
      500: {
        items: 1,
      },
      600: {
        items: 1,
      },
      740: {
        items: 2,
      },
      1000: {
        items: 2.7,
      },
      1300: {
        items: 3,
      },
      1440: {
        items: 3,
      },
    },
  };

return (
  <OwlCarousel className="owl-theme" {...options}>
            {projectsDetails?.map((details) => (
              <div className="project" style={{cursor: 'pointer'}} data-aos="fade-up" onClick={() => {
                setModalData(details);
                setModalShow(true);
              }}>
                <div className="project-img">
                  <img
                    src={`${img_300}${details.image}`}
                    alt=""
                    className="work-img"
                  />
                </div>

                <div className="date-posted">
                  <div className="who-post">
                    <p className="admin">{details.language_used}</p>
                  </div>
                </div>
                <div className="work-details">
                  <h2 style={{marginBottom: 0}}>{details.Project_title}</h2>
                </div>
              </div>
            ))}
          </OwlCarousel>
)
}, [projectsDetails]);
if (isFetching) return "loading";
  return (<>
    <div className="mywork " id="work">
      <div className="mywork-title">
        <h2>Check Out My Reacet Projects</h2>

        <h3>My Work</h3>
      </div>
      <div className="project-row">
        {projectsDetails?.length && renderCouresel}
      </div>
    </div>
    <Modal
      size="md"
      centered
      show={modalShow}
      onHide={() => setModalShow(false)}
      contentClassName="modalStyle"
    >
      <div className="project" data-aos="fade-down">
                <div className="project-img">
                  <img
                    src={`${img_300}${modalData?.image}`}
                    alt=""
                    className="work-img"
                  />
                </div>

                <div className="date-posted">
                  <div className="who-post">
                    <p className="admin">{modalData?.language_used}</p>
                  </div>
                </div>
                <div className="work-details">
                  <h2>{modalData?.Project_title}</h2>
                  <p className="work-info">{modalData?.Project_info}</p>
                  <div className="project-links">
                    <a
                      href={modalData?.demo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h6 className="learnmore">
                        <i class="fa fa-laptop" aria-hidden="true"></i>&nbsp;
                        Live Demo
                      </h6>
                    </a>
                    <a
                      href={modalData?.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h6 className="learnmore">
                        <i class="fa fa-github" aria-hidden="true"></i> &nbsp;
                        Source Code
                      </h6>
                    </a>
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', margin: '-10px 18px 0 0'}}><Button onClick={() => {
                  setModalShow(false);
                }} size="sm"><i class="fa fa-close"></i>&nbsp;Close</Button></div>
              </div>
    </Modal>
    </>
  );
};

export default Projects;

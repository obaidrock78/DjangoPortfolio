import "./AboutMe.css";
import { useGetAboutMeQuery } from "../../Api/api";
import { useEffect, useState } from "react";

const AboutMe = () => {
  const { data: aboutData, isFetching } = useGetAboutMeQuery();
  const [aboutMe, setAboutMe] = useState(aboutData);

  useEffect(() => {
    setAboutMe(aboutData);
  }, [aboutData]);

  if (isFetching || !aboutMe?.length) return null;

  return (
    <main className="page-section about-section" id="about">
      <div className="section-inner">
        <div className="about-grid">
          <div className="about-image-block">
            <img src="/about-me.png" alt="" className="about-photo" />
          </div>
          <div className="about-text-block">
            <header className="section-head section-head-left">
              <span className="section-label">{aboutMe[0].title}</span>
              <h2 className="section-title">{aboutMe[0].title_2}</h2>
            </header>
            <div
              className="about-body"
              dangerouslySetInnerHTML={{ __html: aboutMe[0].description_one }}
            />
            <a
              href="https://drive.google.com/file/d/1vJBEV0fe3hdtsToBDl-h6ZfxewlWyEoM/view"
              download="RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="about-cv-btn"
            >
              Download CV <i className="bx bx-download" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutMe;

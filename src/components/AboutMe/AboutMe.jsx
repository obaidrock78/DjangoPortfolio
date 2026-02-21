import "./AboutMe.css";
import { useGetAboutMeQuery } from "../../Api/api";
import { useEffect, useState } from "react";
import decor1 from "../../images/decoration/dots-1.png";
import reactagle from "../../images/decoration/Rectangle-7.png";
import shady from "../../images/decoration/dots.png";

const AboutMe = () => {
  const { data: aboutData } = useGetAboutMeQuery();
  const [aboutMe, setAboutMe] = useState(aboutData);

  useEffect(() => {
    setAboutMe(aboutData);
  }, [aboutData]);

  return (
    <>
      {aboutMe &&
        aboutMe.map((details) => (
          <main id="about" key={details.id}>
            <div className="aboutMe-container">
              <div className="about-decor">
                <div className="about-dots">
                  <img src={decor1} alt="" />
                </div>
                <div className="about-rect">
                  <img src={reactagle} alt="" />
                </div>
                <div className="about-shady">
                  <img src={shady} alt="" />
                </div>
              </div>
              <div className="abouMe-row">
                <div
                  className=" col-lg-6 col-md-5 col-sm-12 about-img"
                  data-aos="fade-up-right"
                >
                  {/* <img src={`${img_300}${details.about_avatar}`} alt="" /> */}
                  <img className="zoomOnHover" src={`/about-me.png`} alt="" />
                </div>
                <div
                  className=" col-lg-6 col-md-7  col-sm-12 about_myinfo"
                  data-aos="fade-up-left"
                >
                  <div className="title">
                    <h2>{details.title}</h2>
                    <h3>{details.title_2}</h3>
                  </div>
                  <div className="about-description">
                    <div id="foo" unselectable="on" className="unselectable">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `${details.description_one}`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="itscv">
                    <a
                      href="https://drive.google.com/file/d/1vJBEV0fe3hdtsToBDl-h6ZfxewlWyEoM/view"
                      download="RESUME.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button type="button" className="download-cv">
                        Download CV <i className="bx bx-download" aria-hidden="true" />
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        ))}
    </>
  );
};

export default AboutMe;

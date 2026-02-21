import { useEffect, useState } from "react";
import "./Intro.css";
import { useGetHomeDetailsQuery, useGetSocialMediaQuery } from "../../Api/api";

const Intro = () => {
  const { data: conta } = useGetSocialMediaQuery();
  const { data: homeData, isFetching } = useGetHomeDetailsQuery();
  const [homeDetails, setHomeDetails] = useState(homeData);
  const [contacts1Details, setContact2Details] = useState(conta);
  const title_name = homeDetails && homeDetails.map((d) => d.name);

  useEffect(() => {
    setHomeDetails(homeData);
    setContact2Details(conta);
    if (title_name && title_name[0]) document.title = title_name[0];
  }, [homeData, conta, title_name]);

  if (isFetching) return null;

  return (
    <>
      {homeDetails &&
        homeDetails.map((detail) => (
          <section className="intro-page" id="home" key={detail.id}>
            <div className="intro-inner">
              <div className="intro-content">
                <p className="intro-label">{detail.job_title}</p>
                <h1 className="intro-title">{detail.name}</h1>
                <p className="intro-desc">{detail.par_inro}</p>
                <div className="intro-actions">
                  <a href={`mailto:${detail.hireMe_link}`} className="intro-cta">
                    Get in touch
                  </a>
                  <div className="intro-social">
                    {contacts1Details?.map((link) => (
                      <a
                        key={link.id}
                        href={link.link}
                        className="intro-social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.contact_name || "Link"}
                      >
                        <i className={link.social_icon} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="intro-visual">
                <div className="intro-image-wrap">
                  <img
                    src="/welcome-to-portfolio.png"
                    alt="Welcome"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/python-service-1.png";
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
    </>
  );
};

export default Intro;

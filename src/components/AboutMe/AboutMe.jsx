import "./AboutMe.css";
import { useGetAboutMeQuery, useGetHomeDetailsQuery } from "../../Api/api";
import { useEffect, useState } from "react";

const achievements = [
  {
    icon: "fas fa-server",
    title: "Full-Stack Engineering",
    desc: "Django backends, React frontends, REST APIs — end-to-end ownership from database to pixel.",
  },
  {
    icon: "fas fa-layer-group",
    title: "Production-Grade Architecture",
    desc: "PostgreSQL, Celery task queues, API integrations, and cloud deployments built for scale and reliability.",
  },
  {
    icon: "fas fa-link",
    title: "Blockchain & Emerging Tech",
    desc: "Solidity smart contracts, IoT sensor integrations, AI-powered tools — building at the edge of what's possible.",
  },
  {
    icon: "fas fa-rocket",
    title: "12+ Shipped Products",
    desc: "From SaaS platforms to e-commerce stores to DeFi ecosystems — delivering production software that real users depend on.",
  },
];

const AboutMe = () => {
  const { data: aboutData, isFetching } = useGetAboutMeQuery();
  const [aboutMe, setAboutMe] = useState(aboutData);

  const { data: conta2 } = useGetHomeDetailsQuery();
  const [homeDetails, setHomeDetails] = useState(conta2);

  useEffect(() => {
    setAboutMe(aboutData);
    setHomeDetails(conta2);
  }, [aboutData, conta2]);

  if (isFetching) return null;

  const details = aboutMe && aboutMe[0];
  const home = homeDetails && homeDetails[0];

  return (
    <section className="about-sovereign" id="about">
      <div className="about-grid">
        {/* Left: Bio */}
        <div className="about-bio rv">
          <div className="section-eyebrow">About Me</div>
          <h2 className="section-heading">
            Building products that <em>perform.</em>
          </h2>

          <div className="about-bio-text">
            {details ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: details.description_one,
                }}
              />
            ) : (
              <p>
                Started as a frontend developer and never stopped going deeper.
                Today that means owning the entire cross-platform surface —
                <strong> React.js</strong> for the web,{" "}
                <strong>React Native</strong> for iOS and Android — and building
                the state architecture (Redux), real-time infrastructure
                (Firebase), and API layers that make those surfaces fast and
                reliable under production load.
              </p>
            )}
          </div>

          {home && (
            <div className="about-contact-row">
              {home.hireMe_link && (
                <div className="about-contact-item">
                  <i className="fas fa-envelope" />
                  <span>{home.hireMe_link}</span>
                </div>
              )}
            </div>
          )}

          <a
            href={
              home?.cv_link ||
              "https://drive.google.com/file/d/1vJBEV0fe3hdtsToBDl-h6ZfxewlWyEoM/view"
            }
            download="RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="about-cv-btn"
          >
            Download CV <i className="bx bx-download"></i>
          </a>
        </div>

        {/* Right: Achievement cards */}
        <div className="about-achievements">
          {achievements.map((a, i) => (
            <div className={`achievement-card rv d${i + 2}`} key={i}>
              <div className="achievement-icon">
                <i className={a.icon} />
              </div>
              <div className="achievement-content">
                <h4>{a.title}</h4>
                <p>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

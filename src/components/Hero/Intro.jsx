import { useEffect, useState } from "react";
import "./Intro.css";
import TypingEffect from "./TypingEffect";
import { useGetHomeDetailsQuery } from "../../Api/api";
import { useGetSocialMediaQuery } from "../../Api/api";

const Intro = () => {
  const { data: conta } = useGetSocialMediaQuery();
  const { data: homeData, isFetching } = useGetHomeDetailsQuery();
  const [homeDetails, setHomeDetails] = useState(homeData);
  const [contacts1Details, setContact2Details] = useState(conta);
  const title_name = homeDetails && homeDetails.map((d) => d.name);

  useEffect(() => {
    setHomeDetails(homeData);
    setContact2Details(conta);
    document.title = title_name;
  }, [homeData, conta, title_name]);

  if (isFetching) return "loading";

  return (
    <>
      {homeDetails &&
        homeDetails.map((detail) => (
          <section className="intro-page v3-hero" id="home" key={detail.id}>
            <div className="hero-typing-bg" aria-hidden="true">
              <span className="hero-bg-char">0</span>
              <span className="hero-bg-char">1</span>
              <span className="hero-bg-char">{}</span>
            </div>
            <div className="small-intro">
              <div className="intro-row">
                <div className="intro-left">
                  <div className="intro-name terminal-frame">
                    <p className="hello">&gt; {detail.job_title}</p>
                    <p className="name">Hey! I Am</p>
                    <h1 className="job">
                      <span className="bracket-wrap">
                        <span className="bracket-open">{"{"}</span>
                        <TypingEffect text={detail.name} speed={100} delay={400} className="job-text" />
                        <span className="bracket-close">{"}"}</span>
                      </span>
                    </h1>
                    <p className="myinfo">{detail.par_inro}</p>
                  </div>
                  <div className="intro-btns">
                    <a href={`mailto:${detail.hireMe_link}`} className="contactMe">
                      <button type="button" className="contact-me terminal-btn">
                        [ Hire me ]
                      </button>
                    </a>
                  </div>
                  <div className="intro-contact">
                    <span>&gt; Follow Me:</span>
                    <ul>
                      {contacts1Details?.map((data1) => (
                        <a
                          key={data1.id}
                          href={data1.link}
                          className="icon-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className={data1.social_icon} />
                        </a>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="left-img">
                  <div className="ff terminal-frame hero-terminal-img">
                    <img src="/python-service-1.png" alt="Dev" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
    </>
  );
};

export default Intro;

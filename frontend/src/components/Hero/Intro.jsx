import { useEffect, useState } from "react";
import decor3 from "../../images/decoration/Group-31.png";
import "./Intro.css";
import { useGetHomeDetailsQuery } from "../../Api/api";
import { useGetSocialMediaQuery } from "../../Api/api";

const HERO_IMAGES = [
  { src: "/python-service-1.png", alt: "Services" },
  { src: "/welcome-to-portfolio.png", alt: "Welcome" },
];

const SLIDE_INTERVAL_MS = 4500;

const Intro = () => {
  const { data: conta } = useGetSocialMediaQuery();
  const { data: homeData, isFetching } = useGetHomeDetailsQuery();
  const [homeDetails, setHomeDetails] = useState(homeData);
  const [contacts1Details, setContact2Details] = useState(conta);
  const [slideIndex, setSlideIndex] = useState(0);
  const title_name = homeDetails && homeDetails.map((detail2) => detail2.name);

  useEffect(() => {
    setHomeDetails(homeData);
    setContact2Details(conta);
    const name = homeDetails?.[0]?.name || homeData?.[0]?.name;
    if (typeof name === "string" && name.trim()) document.title = name;
  }, [homeData, conta, homeDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  if (isFetching) return "loading";

  return (
    <>
      {homeDetails &&
        homeDetails.map((detail) => (
          <section className=" intro-page" id="home" key={detail.id}>
            <div className="decorations">
              <div className="decor-dot2">
                <img src={decor3} alt="" />
              </div>

              <div className="parcol"></div>
            </div>
            <div className="small-intro">
              <div className="intro-row">
                <div className="col-lg-5  col-md-6 col-sm-12 intro-left">
                  <div className="intro-name">
                    <h3
                      className="hello"
                      data-aos="fade-down"
                      data-aos-duration="1500"
                    >
                      {detail.job_title}
                    </h3>
                    <h3
                      className="name"
                      data-aos="fade-down"
                      data-aos-duration="1600"
                    >
                      Hey! I Am
                    </h3>
                    <h3
                      className="job  text-animate"
                      data-aos="fade-down"
                      data-aos-duration="1700"
                    >
                      {detail.name}
                    </h3>
                    <p
                      className="myinfo"
                      data-aos="fade-down"
                      data-aos-duration="1800"
                    >
                      {detail.par_inro}
                    </p>
                  </div>
                  <div
                    className="intro-btns"
                    data-aos="fade-up"
                    data-aos-duration="1900"
                  >
                    <a
                      href={`mailto:${detail.hireMe_link}`}
                      className="contactMe"
                    >
                      <button type="button" className="contact-me">
                        Hire me <i className="bx bx-send" aria-hidden="true" />
                      </button>
                    </a>
                  </div>
                  <div
                    className="intro-contact"
                    data-aos="fade-up"
                    data-aos-duration="1800"
                  >
                    <span>Follow Me:</span>
                    <ul>
                      <li>
                        {contacts1Details &&
                          contacts1Details.map((data1) => (
                            <a
                              href={data1.link}
                              className="icon-link"
                              target="_blank"
                              rel="noopener noreferrer"
                              key={data1.id}
                            >
                              <i className={data1.social_icon}></i>
                            </a>
                          ))}
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="col-lg-7 col-md-6 col-sm-12 left-img"
                  data-aos="fade-down-left"
                >
                  <div className="ff">
                    <div className="hero-slideshow">
                      {HERO_IMAGES.map((img, i) => (
                        <img
                          key={img.src}
                          src={img.src}
                          alt={img.alt}
                          className={`hero-slideshow-img ${i === slideIndex ? "hero-slideshow-active" : ""}`}
                        />
                      ))}
                    </div>
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

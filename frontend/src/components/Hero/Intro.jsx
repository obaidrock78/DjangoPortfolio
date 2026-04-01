import { useEffect, useState } from "react";
import "./Intro.css";
import { useGetHomeDetailsQuery } from "../../Api/api";

const Intro = () => {
  const { data: homeData, isFetching } = useGetHomeDetailsQuery();
  const [homeDetails, setHomeDetails] = useState(homeData);

  useEffect(() => {
    setHomeDetails(homeData);
    if (homeData) {
      const title_name = homeData.map((d) => d.name);
      document.title = `${title_name} — Portfolio`;
    }
  }, [homeData]);

  if (isFetching) return null;

  const detail = homeDetails && homeDetails[0];
  if (!detail) return null;

  const nameParts = detail.name ? detail.name.split(" ") : ["Obed", "Chaudhry"];
  const firstName = nameParts[0] || "Obed";
  const lastName = nameParts.slice(1).join(" ") || "Chaudhry";

  return (
    <>
    {/* <a
      href="https://wa.me/923034142927"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp" />
    </a> */}
    <section className="hero-sovereign" id="home">
      <div className="hero-grid">
        {/* Left Column */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="pulse-dot" />
            <span>Available for new opportunities</span>
          </div>

          <div className="hero-name">
            <span className="first-name">{firstName}</span>
            <span className="last-name">{lastName}</span>
          </div>

          <div className="hero-role">
            {detail.job_title} · Django · Python · React · Full-Stack
          </div>

          <p className="hero-description">
            {detail.par_inro}
          </p>

          <div className="hero-ctas">
            <a href={`mailto:${detail.hireMe_link}`} className="cta-primary">
              Hire Me
            </a>
            <a href="#work" className="cta-secondary">
              View Work
            </a>
            {/* <a
              href={detail.cv_link || "https://drive.google.com/file/d/1vJBEV0fe3hdtsToBDl-h6ZfxewlWyEoM/view"}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-ghost"
            >
              Download CV
            </a> */}
          </div>

          <div className="hero-socials">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub">
              <i className="fab fa-github" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="Twitter">
              <i className="fab fa-twitter" />
            </a>
            <span className="hero-socials-divider" />
            <span className="hero-socials-label">Find me online</span>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">12+</div>
              <div className="hero-stat-label">Projects</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">7+</div>
              <div className="hero-stat-label">Technologies</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">3+</div>
              <div className="hero-stat-label">Frameworks</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">∞</div>
              <div className="hero-stat-label">Commits</div>
            </div>
          </div>
        </div>

        {/* Right Column — Code Editor Mockup */}
        <div className="hero-visual">
          <div className="editor-frame">
            <div className="editor-titlebar">
              <div className="editor-dots">
                <span className="ed-dot ed-dot-red" />
                <span className="ed-dot ed-dot-yellow" />
                <span className="ed-dot ed-dot-green" />
              </div>
              <span className="editor-filename">portfolio.py</span>
            </div>
            <div className="editor-body">
              <div className="code-line"><span className="code-ln">1</span><span className="code-keyword">class</span> <span className="code-class">SoftwareEngineer</span><span className="code-punc">:</span></div>
              <div className="code-line"><span className="code-ln">2</span>  <span className="code-keyword">def</span> <span className="code-func">__init__</span><span className="code-punc">(</span><span className="code-param">self</span><span className="code-punc">):</span></div>
              <div className="code-line"><span className="code-ln">3</span>    <span className="code-param">self</span><span className="code-punc">.</span><span className="code-var">name</span> <span className="code-punc">=</span> <span className="code-str">"Obed Chaudhry"</span></div>
              <div className="code-line"><span className="code-ln">4</span>    <span className="code-param">self</span><span className="code-punc">.</span><span className="code-var">role</span> <span className="code-punc">=</span> <span className="code-str">"Full-Stack Dev"</span></div>
              <div className="code-line"><span className="code-ln">5</span>    <span className="code-param">self</span><span className="code-punc">.</span><span className="code-var">stack</span> <span className="code-punc">=</span> <span className="code-punc">[</span></div>
              <div className="code-line"><span className="code-ln">6</span>      <span className="code-str">"Django"</span><span className="code-punc">,</span> <span className="code-str">"Python"</span><span className="code-punc">,</span></div>
              <div className="code-line"><span className="code-ln">7</span>      <span className="code-str">"React"</span><span className="code-punc">,</span> <span className="code-str">"JavaScript"</span><span className="code-punc">,</span></div>
              <div className="code-line"><span className="code-ln">8</span>      <span className="code-str">"PostgreSQL"</span><span className="code-punc">,</span> <span className="code-str">"REST APIs"</span></div>
              <div className="code-line"><span className="code-ln">9</span>    <span className="code-punc">]</span></div>
              <div className="code-line"><span className="code-ln">10</span></div>
              <div className="code-line"><span className="code-ln">11</span>  <span className="code-keyword">def</span> <span className="code-func">build</span><span className="code-punc">(</span><span className="code-param">self</span><span className="code-punc">):</span></div>
              <div className="code-line"><span className="code-ln">12</span>    <span className="code-keyword">return</span> <span className="code-str">"Production-ready"</span></div>
              <div className="code-line code-cursor-line"><span className="code-ln">13</span>    <span className="code-cursor">|</span></div>
            </div>
          </div>
          <span className="platform-badge badge-django">Django</span>
          <span className="platform-badge badge-python">Python</span>
          <span className="platform-badge badge-react-web">React</span>
        </div>
      </div>
    </section>
    </>
  );
};

export default Intro;

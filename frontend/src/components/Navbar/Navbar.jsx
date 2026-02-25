import "./Navbar.css";
import { Link } from "react-router-dom";
import Main from "./nav";
import CodeLogo from "./CodeLogo";

const Navbar = () => {
  return (
    <>
      <Main />
      <button type="button" className="mobile-nav-toggle d-lg-none" aria-label="Open menu">
        <i className="fa fa-bars" aria-hidden="true" />
      </button>
      <header id="header" className="fixed-top">
        <div className="container-fluid navbur">
          <div className="navi">
            <div className="col-xl-12 d-flex align-items-center lefty">
              <a href="#home" className="devman">
                <CodeLogo size={28} className="code-logo" />
                <span className="devman-brand">Obed</span>
                <span className="blink">_</span>
              </a>
              <nav className="nav-menu mainMenu">
                <ul>
                  <li
                    className="active"
                    data-aos="fade-down"
                    data-aos-duration="300"
                  >
                    <a href="#home"> Home</a>
                  </li>
                  <li data-aos="fade-down" data-aos-duration="600">
                    <a href="#work">My Work</a>
                  </li>
                  <li data-aos="fade-down" data-aos-duration="900">
                    <a href="#services">Services</a>
                  </li>
                  <li data-aos="fade-down" data-aos-duration="1200">
                    <a href="#skills">Skills</a>
                  </li>
                  <li data-aos="fade-down" data-aos-duration="1500">
                    <a href="#about">About</a>
                  </li>
                  <li data-aos="fade-down" data-aos-duration="1800">
                    <a href="#process">Process</a>
                  </li>
                  <li data-aos="fade-down" data-aos-duration="2100">
                    <a href="#testimonials">Testimonials</a>
                  </li>
                  <li data-aos="fade-down" data-aos-duration="2400">
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              </nav>
              <div className="nav-right-group">
                <div className="nav-social">
                  <a href="https://github.com/obaidrock78/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <i className="fa fa-github" />
                  </a>
                  <a href="https://www.upwork.com/freelancers/~01eb4a1e83b3c6ef9e" target="_blank" rel="noopener noreferrer" aria-label="Upwork">
                    <i className="fa-solid fa-address-card" />
                  </a>
                </div>
                <div className="left-btns">
                  <div className="CvMe">
                    <a href="#contact">
                      <button type="button" className="my-cv">Contact Me</button>
                    </a>
                  </div>
                  <div id="theme-button">
                    <Link to="#" className="menuBtn" aria-label="Toggle menu">
                      <span className="lines"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Floating theme switch (light/dark) - always visible */}
      <div className="theme-switch-floating" id="theme-button2" title="Toggle light/dark theme">
        <label htmlFor="toggle-theme" className="theme-switch-label">
          <input id="toggle-theme" className="toggle" type="checkbox" aria-label="Toggle light/dark theme" />
          <span className="theme-switch-icon theme-switch-dark" aria-hidden="true"><i className="fa fa-moon" /></span>
          <span className="theme-switch-icon theme-switch-light" aria-hidden="true"><i className="fa fa-sun" /></span>
        </label>
      </div>
    </>
  );
};

export default Navbar;

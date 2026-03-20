import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import AboutMe from "./components/AboutMe/AboutMe";
import Footer from "./components/Footer/Footer";
import Home from "./components/Hero/Intro";
import Projects from "./components/MyWork/projects";
import ProjectDetail from "./components/MyWork/ProjectDetail";
import Navbar from "./components/Navbar/Navbar";
import Services from "./components/Services/Services";
import Progress from "./components/SkillBars/progress";
import SkillTicker from "./components/SkillTicker/SkillTicker";
import Email from "./components/EmailMe/Email";
import ConstellationCanvas from "./components/ConstellationCanvas";
import { AnimatedCursor } from "./components/animatedCursor";
import $ from "jquery";
import { useEffect } from "react";

function HomePage() {
  return (
    <>
      <Home />
      <SkillTicker />
      <div className="gradient-abyss-to-navy" />
      <AboutMe />
      <div className="gradient-navy-to-abyss" />
      <Services />
      <div className="gradient-abyss-to-navy" />
      <Progress />
      <div className="gradient-navy-to-abyss" />
      <Projects />
      <div className="gradient-abyss-to-navy" />
      <Email />
      <Footer />
    </>
  );
}

function App() {
  // Preloader
  $(window).on("load", function () {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(500)
        .fadeOut("slow", function () {
          $(this).remove();
        });
    }
  });

  // Scroll reveal observer — uses MutationObserver to catch dynamically added .rv elements
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
          }
        });
      },
      { threshold: 0.12 }
    );

    const observeAll = () => {
      document.querySelectorAll(".rv:not(.on)").forEach((el) => {
        io.observe(el);
      });
    };

    observeAll();

    const mo = new MutationObserver(() => {
      observeAll();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <BrowserRouter>
      {window.innerWidth > 768 && <AnimatedCursor />}
      <ConstellationCanvas />
      <div className="grain-overlay" />

      <div id="preloader">
        <div className="preloader-bar"></div>
        <span className="preloader-text">Loading</span>
      </div>

      <div className="sovereign-app">
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/project/:id" component={ProjectDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

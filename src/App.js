import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "./styles/sections.css";
import { ThemeProvider } from "./context/ThemeContext";
import AboutMe from "./components/AboutMe/AboutMe";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Home from "./components/Hero/Intro";
import Projects from "./components/MyWork/projects";
import Navbar from "./components/Navbar/Navbar";
import Services from "./components/Services/Services";
import Progress from "./components/SkillBars/progress";
import ThemeToggle from "./components/ThemeToggle";
import $ from "jquery";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
  $(window).on("load", function () {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(100)
        .fadeOut("slow", function () {
          $(this).remove();
        });
    }
  });

  useEffect(() => {
    AOS.init({ duration: 1500, once: true });
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="v4-bg-wrap" aria-hidden="true">
          <div className="v4-bg-gradient" />
        </div>
        <div id="preloader">
          <img style={{ height: "100px", width: "130px" }} src="/giphy.webp" alt="" />
          <h2 className="name-load animate-charcter">Loading</h2>
        </div>
        <div className="homepage">
          <Navbar />
          <Home />
        </div>
        <AboutMe />
        <Services />
        <Progress />
        <Projects />
        <Contact />
        <Footer />
        <ThemeToggle />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

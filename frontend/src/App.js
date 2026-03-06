import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import AboutMe from "./components/AboutMe/AboutMe";
import Footer from "./components/Footer/Footer";
import Home from "./components/Hero/Intro";
import Projects from "./components/MyWork/projects";
import Navbar from "./components/Navbar/Navbar";
import Process from "./components/Process/Process";
import Services from "./components/Services/Services";
import Progress from "./components/SkillBars/progress";
import Testimonials from "./components/Testimonials/Testimonials";
import ContactMe from "./components/ContactMe/ContactMe";
import ProjectDetails from "./pages/ProjectDetails";
import $ from "jquery";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { AnimatedCursor } from "./components/animatedCursor";

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
    <BrowserRouter>
      {window.innerWidth > 768 && <AnimatedCursor />}
      <div id="preloader">
        <h2 className="name-load animate-charcter">Loading</h2>
      </div>

      <Switch>
        <Route path="/project/:id">
          <Navbar />
          <ProjectDetails />
          <Footer />
        </Route>
        <Route path="/">
          <div className="homepage">
            <Navbar />
            <Home />
          </div>
          <Progress />
          <Services />
          <Projects />
          <AboutMe />
          <Process />
          <Testimonials />
          <ContactMe />
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

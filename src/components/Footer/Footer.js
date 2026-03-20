import "./Footer.css";
import { useGetSocialMediaQuery } from "../../Api/api";
import { useEffect, useState } from "react";

const Footer = () => {
  const { data: social, isFetching } = useGetSocialMediaQuery();
  const [socialDetails, setSocialDetails] = useState(social);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    setSocialDetails(social);
  }, [socialDetails, social]);

  // Scroll to top visibility
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isFetching) return null;

  return (
    <>
      <footer className="footer-sovereign">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo-mini">OC</div>
            <span className="footer-text">
              © {new Date().getFullYear()} Built with purpose.
            </span>
          </div>

          <div className="footer-col">
            <div className="footer-status">
              <span className="footer-pulse" />
              Open to opportunities
            </div>
          </div>

          <div className="footer-col">
            <span className="footer-role">Senior Frontend Developer</span>
          </div>
        </div>
      </footer>

      <button
        className={`scroll-top-btn ${showScroll ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <i className="bx bx-chevron-up" />
      </button>
    </>
  );
};

export default Footer;

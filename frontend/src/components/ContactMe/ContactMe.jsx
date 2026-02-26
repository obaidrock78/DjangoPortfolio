import "./ContactMe.css";
import SectionHeading from "../SectionHeading/SectionHeading";

const ContactMe = () => {
  return (
    <>
      <section id="contact">
        <div className="contact-me2">
          <div className="contactme-t1 pb-3">
            <SectionHeading title="Newsletter" />
          </div>
          <div className="contact-me2-dec"></div>
          <div className="row align-items-center mb-5">
            <div className="col-lg-5 col-md-12">
              <div className="work-togather-text">
                <h2 className="h2-title text-white">Let&apos;s Work Together</h2>
                <p>
                  Are you impressed and want a project done, give a call or
                  email me any time.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-7">
              <div className="work-togather-form">
                <input
                  type="email"
                  name="Email"
                  className="form-input-one subscribe-input"
                  placeholder="Email Address"
                  required
                  aria-label="Email for newsletter"
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="work-togather-form-btn">
                <button type="submit" className="sec-btn">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactMe;

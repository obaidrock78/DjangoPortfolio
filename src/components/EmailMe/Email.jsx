import React, { useEffect, useRef, useState } from "react";
import "./Email.css";
import { useGetContactsQuery } from "../../Api/api";
import emailjs from "@emailjs/browser";

const Email = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  const { data: contacts, isFetching } = useGetContactsQuery();
  const [contactsDetails, setContactDetails] = useState(contacts);

  useEffect(() => {
    setContactDetails(contacts);
  }, [contactsDetails, contacts]);

  if (isFetching) return null;

  // Find email from contacts for the header link
  const emailContact = contactsDetails?.find(
    (c) => c.contact_name?.toLowerCase().includes("email")
  );

  return (
    <section className="contact-sovereign" id="contact">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header rv">
          <div className="section-eyebrow">Get in Touch</div>
          <h2>
            Let's build something
            <em>extraordinary.</em>
          </h2>
          <p className="contact-subline">
            Open for freelance projects, collaborations, and full-time
            opportunities.
          </p>
          {emailContact && (
            <a
              href={`mailto:${emailContact.contact_info}`}
              className="contact-email-link"
            >
              {emailContact.contact_info}
            </a>
          )}
        </div>

        {/* Contact cards */}
        <div className="contact-cards rv d2">
          {contactsDetails &&
            contactsDetails.map((detail) => (
              <div className="contact-card" key={detail.id}>
                <div className="contact-card-icon">
                  <i className={detail.icon} />
                </div>
                <div className="contact-card-info">
                  <h4>{detail.contact_name}</h4>
                  <p>{detail.contact_info}</p>
                </div>
              </div>
            ))}
        </div>

        {/* Contact form */}
        <div className="rv d3">
          <form
            className="contact-form"
            ref={form}
            onSubmit={sendEmail}
          >
            <div className="contact-form-row">
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                required
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
            />
            <textarea
              name="message"
              rows="6"
              placeholder="Tell me about your project..."
              required
            />
            <button className="contact-submit-btn" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Email;

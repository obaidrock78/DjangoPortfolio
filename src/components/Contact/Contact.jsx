import React, { useRef, useEffect, useState } from "react";
import { useGetContactsQuery } from "../../Api/api";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const formRef = useRef();
  const { data: contacts, isFetching } = useGetContactsQuery();
  const [list, setList] = useState(contacts);

  useEffect(() => {
    setList(contacts);
  }, [contacts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_USER_ID
      )
      .then(() => {}, () => {});
    e.target.reset();
  };

  return (
    <section className="page-section contact-section" id="contact">
      <div className="section-inner">
        <header className="section-head">
          <span className="section-label">Get in touch</span>
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">
            Have a project in mind? Send a message and I’ll get back to you.
          </p>
        </header>
        <div className="contact-layout">
          <div className="contact-info-block">
            {!isFetching && list?.map((item) => (
              <div className="contact-info-card" key={item.id}>
                <i className={item.icon} aria-hidden="true" />
                <div>
                  <strong>{item.contact_name}</strong>
                  <span>{item.contact_info}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="contact-form-block">
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <input type="text" name="user_name" placeholder="Your name" required />
                <input type="email" name="user_email" placeholder="Your email" required />
              </div>
              <input type="text" name="subject" placeholder="Subject" />
              <textarea name="message" rows={5} placeholder="Your message" required />
              <button type="submit" className="contact-form-btn">
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import "./Testimonials.css";
import SectionHeading from "../SectionHeading/SectionHeading";

/* Placeholder testimonials – replace with useGetTestimonialsQuery() when API is ready */
const TESTIMONIALS = [
  {
    id: 1,
    quote: "Delivered exactly what we needed on time. Clear communication and solid technical skills.",
    author: "Client",
    role: "Project lead",
  },
  {
    id: 2,
    quote: "Professional approach from scoping to deployment. Would work with again.",
    author: "Client",
    role: "Startup founder",
  },
  {
    id: 3,
    quote: "Handled complex requirements with ease and kept the codebase clean and maintainable.",
    author: "Client",
    role: "CTO",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <SectionHeading label="What people say" title="Testimonials" />
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.id}
              className="testimonial-card"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <footer className="testimonial-author">
                <cite>{t.author}</cite>
                <span className="testimonial-role">{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

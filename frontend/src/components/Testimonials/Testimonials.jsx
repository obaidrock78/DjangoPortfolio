import "./Testimonials.css";

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
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-title">
          <h2>What people say</h2>
          <h3>Testimonials</h3>
        </div>
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

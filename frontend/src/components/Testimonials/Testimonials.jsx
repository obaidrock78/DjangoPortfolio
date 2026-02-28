import "./Testimonials.css";
import SectionHeading from "../SectionHeading/SectionHeading";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Obed delivered a polished, scalable frontend that aligned perfectly with our product vision. His attention to UI details and performance made a noticeable difference in user engagement. Communication was clear, timelines were respected, and the final result exceeded expectations.",
    author: "Fann",
    role: "Product team",
  },
  {
    id: 2,
    quote:
      "From architecture to execution, Obed handled everything professionally. He translated complex requirements into a clean, responsive interface and ensured smooth integration with backend services. A reliable developer who understands both design and functionality.",
    author: "Viko",
    role: "Founder",
  },
  {
    id: 3,
    quote:
      "Obed helped us build a modern, user-friendly platform that customers love using. His ability to optimize performance and improve UX made our service feel premium. Highly recommended for React-based projects.",
    author: "BookCleany",
    role: "Product owner",
  },
  {
    id: 4,
    quote:
      "Working with Obed was effortless. He delivered a fast, visually appealing website that clearly represents our brand. The project was completed efficiently, and every requested change was handled promptly and professionally.",
    author: "PopSigns",
    role: "Marketing team",
  },
  {
    id: 5,
    quote:
      "Obed built a clean, professional platform that made our services easy to understand and access for clients. Performance, responsiveness, and clarity were all handled exceptionally well.",
    author: "Muse Tax",
    role: "Operations",
  },
  {
    id: 6,
    quote:
      "Obed demonstrated strong technical skills and a deep understanding of performance-driven interfaces. The final product was smooth, engaging, and optimized for scale. A great developer to work with.",
    author: "Hero Gaming",
    role: "Engineering lead",
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

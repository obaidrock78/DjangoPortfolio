import "./SectionHeading.css";

/**
 * Common section heading used across Services, Projects, Process, Testimonials, Contact, etc.
 * @param {string} label - Small uppercase eyebrow text (optional)
 * @param {string} title - Main section title
 */
const SectionHeading = ({ label, title }) => {
  return (
    <div className="section-heading">
      {label && <p className="section-label">{label}</p>}
      <h2 className="section-title">{title}</h2>
    </div>
  );
};

export default SectionHeading;

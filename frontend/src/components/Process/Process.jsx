import "./Process.css";

const STEPS = [
  {
    step: 1,
    title: "Understand & scope",
    description: "I clarify your goals, target users, and constraints so we build the right thing from day one.",
  },
  {
    step: 2,
    title: "Design & architecture",
    description: "I propose a clear structure, APIs, and tech choices so the solution is maintainable and scalable.",
  },
  {
    step: 3,
    title: "Implement & test",
    description: "I ship in iterations with clear deliverables, tests, and feedback loops so we stay on track.",
  },
  {
    step: 4,
    title: "Launch & iterate",
    description: "I help you deploy, monitor, and refine so your product keeps improving after go-live.",
  },
];

const Process = () => {
  return (
    <section id="process" className="process-section">
      <div className="process-container">
        <div className="process-title">
          <h2>How I work</h2>
          <h3>Process</h3>
        </div>
        <div className="process-timeline">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="process-step"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <div className="process-step-number">{item.step}</div>
              <div className="process-step-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

import "./Vision.css";

const values = [
  {
    icon: "fas fa-microchip",
    title: "Engineering-First",
    desc: "Every decision — from database schema to API contract — is made with production scale in mind, not just the happy path.",
  },
  {
    icon: "fas fa-layer-group",
    title: "Ownership Over Tickets",
    desc: "I don't implement requirements. I understand problems, propose solutions, and own outcomes from commit to deployment.",
  },
  {
    icon: "fas fa-link",
    title: "Open Source Ethos",
    desc: "The best ideas compound when shared. I build in public, document what I learn, and give back to the ecosystems I depend on.",
  },
  {
    icon: "fas fa-compass",
    title: "Taste for Emerging Tech",
    desc: "DeFi, IoT, AI integrations — I follow the frontier not for hype, but because the hardest engineering happens there.",
  },
];

const Vision = () => (
  <section className="vision-sovereign" id="vision">

    {/* ── Quote block ── */}
    <div className="vision-quote-block rv">
      <div className="vision-quote-ornament">"</div>
      <blockquote className="vision-quote">
        The best software is invisible. It doesn't just function — it thinks
        ahead, scales under pressure, and disappears into the user's intent.
      </blockquote>
      <div className="vision-quote-author">
        <span className="vision-quote-line" />
        <span className="vision-quote-name">Obed Chaudhry</span>
        <span className="vision-quote-role">Full-Stack & Blockchain Engineer</span>
      </div>
    </div>

    {/* ── Values grid ── */}
    <div className="vision-container">
      <div className="vision-values-header rv d2">
        <p className="section-eyebrow">What I Stand For</p>
      </div>

      <div className="vision-values-grid">
        {values.map((v, i) => (
          <div className={`vision-value rv d${i + 3}`} key={v.title}>
            <div className="vv-icon">
              <i className={v.icon} />
            </div>
            <h4 className="vv-title">{v.title}</h4>
            <p className="vv-desc">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>

  </section>
);

export default Vision;

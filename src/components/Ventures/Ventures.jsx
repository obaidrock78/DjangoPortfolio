import "./Ventures.css";

/* ── Flagship ventures ─────────────────────────────────────── */
const flagships = [
  {
    status:   "Live",
    badge:    "My Venture",
    logo:     "F",
    logoColor:"gold",
    name:     "FANN",
    tagline:  "The Verified Art Marketplace",
    categories: ["Art Tech", "Blockchain", "AI/ML"],
    description:
      "FANN is a next-generation marketplace where artists mint, sell, and certify their work on-chain. I architected the full platform — from the Solidity contracts that guarantee provenance to the React storefront and the AI recommendation layer that surfaces relevant art to collectors.",
    role:     "Founder & Lead Engineer",
    period:   "Jan 2023 – Present",
    location: "Remote · Global",
    highlights: [
      "Designed and deployed ERC-721 smart contracts handling $480k+ in primary sales",
      "Built an AI/ML curation engine that lifted collector engagement by 3.4×",
      "Scaled backend to serve 12k concurrent users across 34 countries at launch",
    ],
    tech: ["React", "Django", "Solidity", "IPFS", "Python", "PostgreSQL", "AI/ML", "Web3"],
    cta:  { label: "Explore FANN →", href: "#" },
  },
  {
    status:   "In Development",
    badge:    "My Venture",
    logo:     "N",
    logoColor:"teal",
    name:     "NEXIO",
    tagline:  "API Infrastructure for Emerging Markets",
    categories: ["FinTech", "API Platform", "Django"],
    description:
      "NEXIO is a unified API layer that lets startups in emerging markets connect to payments, KYC, and logistics providers through a single integration. I own the entire stack — the Django REST framework core, the developer portal, and the sandbox environment that makes onboarding friction-free.",
    role:     "Founder & Backend Architect",
    period:   "Aug 2023 – Present",
    location: "Remote · Africa & ME",
    highlights: [
      "Integrated 18 payment gateways under a single normalised REST contract",
      "Reduced merchant onboarding time from 3 weeks to under 48 hours",
      "Processing 60k+ API calls per day in closed beta with 99.97% uptime",
    ],
    tech: ["Django", "Python", "PostgreSQL", "Redis", "Celery", "Docker", "REST APIs"],
    cta:  { label: "Explore NEXIO →", href: "#" },
  },
];

/* ── Mini ventures ─────────────────────────────────────────── */
const minis = [
  {
    status: "Live",
    name:   "ChainVerify",
    desc:   "On-chain document verification SaaS. Businesses stamp contracts and credentials to an immutable ledger in one click.",
    tech:   ["Solidity", "React", "IPFS"],
    href:   "#",
  },
  {
    status: "Live",
    name:   "ShopFlow",
    desc:   "Headless e-commerce engine built on Django. Powers five multi-vendor stores processing orders across three currencies.",
    tech:   ["Django", "React", "Stripe"],
    href:   "#",
  },
  {
    status: "Soon",
    name:   "SensorLink",
    desc:   "IoT dashboard that ingests real-time sensor streams, runs anomaly detection, and fires automated alerts to field teams.",
    tech:   ["Python", "MQTT", "React"],
    href:   "#",
  },
  {
    status: "Soon",
    name:   "AIReview",
    desc:   "AI-powered code-review bot that plugs into GitHub PRs and surfaces security issues, dead code, and performance regressions.",
    tech:   ["Python", "OpenAI", "GitHub API"],
    href:   "#",
  },
];

/* ── Status pill ───────────────────────────────────────────── */
const StatusPill = ({ label }) => {
  const cls =
    label === "Live"           ? "ventures-status--live" :
    label === "In Development" ? "ventures-status--dev"  :
                                 "ventures-status--soon";
  return (
    <span className={`ventures-status ${cls}`}>
      <span className="ventures-status-dot" />
      {label}
    </span>
  );
};

/* ── Component ─────────────────────────────────────────────── */
const Ventures = () => (
  <section className="ventures-sovereign" id="ventures">
    <div className="ventures-container">

      {/* Header */}
      <div className="ventures-header rv">
        <p className="section-eyebrow">Ventures</p>
        <h2 className="section-heading">
          Built from Scratch.<br />
          <em>Shipped to the World.</em>
        </h2>
        <p className="ventures-subtext">
          Beyond client work — products I conceived, engineered, and launched independently.
        </p>
      </div>

      {/* Flagship cards */}
      <div className="ventures-flagships">
        {flagships.map((v, i) => (
          <div className={`ventures-flagship rv d${i + 2}`} key={v.name}>

            {/* Card top bar */}
            <div className="vf-topbar">
              <StatusPill label={v.status} />
              <span className="vf-badge">{v.badge}</span>
            </div>

            {/* Identity */}
            <div className="vf-identity">
              <div className={`vf-logo vf-logo--${v.logoColor}`}>{v.logo}</div>
              <div>
                <h3 className="vf-name">{v.name}</h3>
                <p className="vf-tagline">{v.tagline}</p>
              </div>
            </div>

            {/* Categories */}
            <div className="vf-categories">
              {v.categories.map(c => (
                <span className="vf-cat" key={c}>{c}</span>
              ))}
            </div>

            {/* Description */}
            <p className="vf-desc">{v.description}</p>

            {/* Role */}
            <div className="vf-role-row">
              <i className="fas fa-user-tie vf-role-icon" />
              <span className="vf-role-text">
                <strong>{v.role}</strong> · {v.period} · {v.location}
              </span>
            </div>

            {/* Highlights */}
            <ul className="vf-highlights">
              {v.highlights.map(h => (
                <li key={h}>
                  <span className="vf-arrow">↳</span>
                  {h}
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="vf-divider" />

            {/* Footer */}
            <div className="vf-footer">
              <div className="vf-tech-tags">
                {v.tech.map(t => (
                  <span className="vf-tech" key={t}>{t}</span>
                ))}
              </div>
              <a href={v.cta.href} className="vf-cta" target="_blank" rel="noopener noreferrer">
                {v.cta.label}
              </a>
            </div>

          </div>
        ))}
      </div>

      {/* Also Building */}
      <div className="ventures-also-header rv d4">
        <span className="ventures-also-label">Also Building</span>
        <div className="ventures-also-line" />
      </div>

      <div className="ventures-minis">
        {minis.map((m, i) => (
          <a
            href={m.href}
            className={`ventures-mini rv d${i + 3}`}
            key={m.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="vm-topbar">
              <StatusPill label={m.status} />
              <i className="fas fa-arrow-right vm-arrow-icon" />
            </div>
            <h4 className="vm-name">{m.name}</h4>
            <p className="vm-desc">{m.desc}</p>
            <div className="vm-tech-tags">
              {m.tech.map(t => (
                <span className="vm-tech" key={t}>{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>

    </div>
  </section>
);

export default Ventures;

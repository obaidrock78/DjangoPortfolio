import "./Writing.css";

const articles = [
  {
    category: "Backend Engineering",
    categoryColor: "teal",
    title: "Building a Multi-Tenant Django API with Row-Level Security",
    excerpt:
      "A deep dive into architecting a Django REST Framework API that serves hundreds of isolated tenants from a single PostgreSQL database, using RLS policies and schema-per-tenant strategies.",
    readTime: "8 min read",
    date: "Mar 2024",
    href: "#",
  },
  {
    category: "Blockchain",
    categoryColor: "gold",
    title: "ERC-3643: The Standard That Makes Security Tokens Compliant",
    excerpt:
      "Why the T-REX protocol is the only credible path for real-world asset tokenisation, and how I implemented it end-to-end for an art marketplace handling $480k+ in primary sales.",
    readTime: "11 min read",
    date: "Jan 2024",
    href: "#",
  },
  {
    category: "Architecture",
    categoryColor: "violet",
    title: "Celery + Redis at Scale: Lessons from 60k Calls/Day",
    excerpt:
      "What breaks first when your task queue hits production load, how to instrument it properly, and the architectural decisions that kept NEXIO at 99.97% uptime through a closed beta.",
    readTime: "6 min read",
    date: "Nov 2023",
    href: "#",
  },
];

const Writing = () => (
  <section className="writing-sovereign" id="writing">
    <div className="writing-container">

      {/* Header */}
      <div className="writing-header rv">
        <p className="section-eyebrow">Writing</p>
        <h2 className="section-heading">
          Thinking out loud.<br />
          <em>Building in public.</em>
        </h2>
        <p className="writing-subtext">
          Technical deep-dives, architecture decisions, and lessons learned shipping
          production systems across DeFi, SaaS, and enterprise backends.
        </p>
      </div>

      {/* Articles grid */}
      <div className="writing-grid">
        {articles.map((a, i) => (
          <a
            key={a.title}
            href={a.href}
            className={`writing-card rv d${i + 2}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="wc-top">
              <span className={`wc-category wc-category--${a.categoryColor}`}>
                {a.category}
              </span>
              <span className="wc-read-time">
                <i className="far fa-clock" /> {a.readTime}
              </span>
            </div>

            <h3 className="wc-title">{a.title}</h3>
            <p className="wc-excerpt">{a.excerpt}</p>

            <div className="wc-footer">
              <span className="wc-date">{a.date}</span>
              <span className="wc-arrow">
                Read more <i className="fas fa-arrow-right" />
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="writing-cta rv d5">
        <a href="#" className="wcta-btn" target="_blank" rel="noopener noreferrer">
          <span>All Articles</span>
          <i className="fas fa-arrow-right" />
        </a>
        <p className="writing-cta-note">
          Also on <a href="#" target="_blank" rel="noopener noreferrer">Hashnode</a> &
          {" "}<a href="#" target="_blank" rel="noopener noreferrer">Dev.to</a>
        </p>
      </div>

    </div>
  </section>
);

export default Writing;

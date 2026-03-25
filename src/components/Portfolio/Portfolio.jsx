import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { baseUrlImages, useGetProjectsQuery } from "../../Api/api";
import "./Portfolio.css";

const parseTech = (str) => {
  if (!str) return [];
  return str.split(/[,·|]+/).map((s) => s.trim()).filter(Boolean);
};

const getCategory = (lang = "") => {
  const l = lang.toLowerCase();
  if (l.includes("solidity") || l.includes("web3") || l.includes("blockchain") || l.includes("ipfs"))
    return "Blockchain";
  if (l.includes("react native") || l.includes("ios") || l.includes("android") || l.includes("swift"))
    return "Mobile";
  if (l.includes("django") || l.includes("python") || l.includes("flask") || l.includes("node"))
    return "Backend";
  if (l.includes("react") || l.includes("next") || l.includes("vue") || l.includes("typescript"))
    return "Frontend";
  return "Full-Stack";
};

const getStatus = (demo, link) => {
  if (demo) return { label: "Live", cls: "proj-status--live" };
  if (link) return { label: "Production", cls: "proj-status--prod" };
  return { label: "In Dev", cls: "proj-status--dev" };
};

const categoryColors = {
  "All":        { color: "var(--gold-warm)", bg: "rgba(212,175,90,0.12)", border: "rgba(212,175,90,0.30)" },
  "Blockchain": { color: "var(--gold-warm)", bg: "rgba(212,175,90,0.10)", border: "rgba(212,175,90,0.28)" },
  "Backend":    { color: "var(--teal)",      bg: "rgba(78,234,222,0.10)", border: "rgba(78,234,222,0.25)" },
  "Frontend":   { color: "var(--indigo)",    bg: "rgba(123,143,238,0.10)", border: "rgba(123,143,238,0.25)" },
  "Mobile":     { color: "var(--violet)",    bg: "rgba(165,133,196,0.12)", border: "rgba(165,133,196,0.28)" },
  "Full-Stack": { color: "var(--emerald)",   bg: "rgba(69,222,153,0.10)", border: "rgba(69,222,153,0.25)" },
};

const FILTERS = ["All", "Blockchain", "Backend", "Frontend", "Mobile", "Full-Stack"];

const Portfolio = () => {
  const history = useHistory();
  const { data: projects, isFetching } = useGetProjectsQuery();
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!projects) return;
    let list = [...projects];
    if (active !== "All") {
      list = list.filter(p => getCategory(p.language_used) === active);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.Project_title?.toLowerCase().includes(q) ||
        p.language_used?.toLowerCase().includes(q) ||
        p.Project_info?.toLowerCase().includes(q)
      );
    }
    setVisible(list);
  }, [projects, active, search]);

  const getCategoryCount = (cat) => {
    if (!projects) return 0;
    if (cat === "All") return projects.length;
    return projects.filter(p => getCategory(p.language_used) === cat).length;
  };

  if (isFetching) return null;

  return (
    <div className="portfolio-page">

      {/* ── Hero header ── */}
      <div className="portfolio-hero">
        <div className="portfolio-hero-inner">
          <button className="portfolio-back-btn" onClick={() => history.push("/")}>
            <i className="fas fa-arrow-left" /> Home
          </button>

          <div className="portfolio-hero-text">
            <p className="section-eyebrow">Full Portfolio</p>
            <h1 className="portfolio-heading">
              {projects?.length || "0"}+ <em>Projects</em><br />Shipped.
            </h1>
            <p className="portfolio-subtext">
              Every project below went to production. From DeFi protocols to enterprise SaaS —
              filtered, searchable, and linked to full case studies.
            </p>
          </div>

          {/* Search */}
          <div className="portfolio-search-wrap">
            <i className="fas fa-search portfolio-search-icon" />
            <input
              className="portfolio-search"
              type="text"
              placeholder="Search projects, technologies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="portfolio-search-clear" onClick={() => setSearch("")}>
                <i className="fas fa-times" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div className="portfolio-filters-wrap">
        <div className="portfolio-filters">
          {FILTERS.map(f => {
            const c = categoryColors[f];
            const isActive = active === f;
            return (
              <button
                key={f}
                className={`pf-filter-btn ${isActive ? "active" : ""}`}
                style={isActive ? { color: c.color, background: c.bg, borderColor: c.border } : {}}
                onClick={() => setActive(f)}
              >
                {f}
                <span className="pf-filter-count">{getCategoryCount(f)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="portfolio-grid-wrap">
        <div className="portfolio-results-info">
          {search
            ? `${visible.length} result${visible.length !== 1 ? "s" : ""} for "${search}"`
            : `${visible.length} project${visible.length !== 1 ? "s" : ""}`}
        </div>

        {visible.length === 0 ? (
          <div className="portfolio-empty">
            <i className="fas fa-search" />
            <p>No projects match your search.</p>
            <button onClick={() => { setSearch(""); setActive("All"); }}>Clear filters</button>
          </div>
        ) : (
          <div className="portfolio-grid">
            {visible.map((p, idx) => {
              const tech = parseTech(p.language_used);
              const visible3 = tech.slice(0, 3);
              const overflow = tech.length > 3 ? tech.length - 3 : 0;
              const cat = getCategory(p.language_used);
              const status = getStatus(p.demo_link, p.project_link);
              const c = categoryColors[cat] || categoryColors["Full-Stack"];

              return (
                <Link
                  to={`/project/${p.id}`}
                  className="port-card"
                  key={p.id || idx}
                >
                  {/* Image */}
                  <div className="port-img-wrap">
                    <img
                      src={`${baseUrlImages}${p.image}`}
                      alt={p.Project_title}
                    />
                    <div className="port-img-overlay" />

                    {/* Top badges on image */}
                    <div className="port-img-top">
                      <span className={`port-status ${status.cls}`}>
                        <span className="port-status-dot" />
                        {status.label}
                      </span>
                      {idx === 0 && active === "All" && (
                        <span className="port-featured">★ Featured</span>
                      )}
                    </div>

                    {/* Category chip */}
                    <span
                      className="port-cat-chip"
                      style={{ color: c.color, background: c.bg, borderColor: c.border }}
                    >
                      {cat}
                    </span>

                    {/* Hover overlay CTA */}
                    <div className="port-hover-cta">
                      <span>View Case Study <i className="fas fa-arrow-right" /></span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="port-body">
                    <h3 className="port-title">{p.Project_title}</h3>

                    {p.Project_info && (
                      <p className="port-desc">{p.Project_info}</p>
                    )}

                    <div className="port-footer">
                      <div className="port-tech-row">
                        {visible3.map(t => (
                          <span className="port-tech" key={t}>{t}</span>
                        ))}
                        {overflow > 0 && (
                          <span className="port-tech port-tech--more">+{overflow}</span>
                        )}
                      </div>
                      <span className="port-arrow">
                        View <i className="fas fa-arrow-right" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default Portfolio;

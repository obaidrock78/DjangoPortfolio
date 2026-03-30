import { baseUrlImages, useGetProjectsQuery } from "../../Api/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./projects.css";

/* ── Static smart-contract data ─────────────────────────────── */
const CONTRACTS = [
  {
    chain: "Arbitrum One",
    chainColor: "indigo",
    name: "RWA Token Factory",
    project: "FANN ArtTech",
    type: "ERC-3643 Factory",
    address: "0xA3F2...8C1D",
    explorerHref: "#",
  },
  {
    chain: "BNB Chain",
    chainColor: "gold",
    name: "NFT Marketplace Core",
    project: "FANN ArtTech",
    type: "ERC-721 Exchange",
    address: "0xB91D...4E7A",
    explorerHref: "#",
  },
  {
    chain: "Ethereum",
    chainColor: "teal",
    name: "Staking Vault V2",
    project: "DeFi Suite",
    type: "ERC-4626 Vault",
    address: "0xC047...9F2B",
    explorerHref: "#",
  },
  {
    chain: "Polygon",
    chainColor: "violet",
    name: "Governance DAO",
    project: "NEXIO Protocol",
    type: "OpenZeppelin Governor",
    address: "0xD1A8...2C5E",
    explorerHref: "#",
  },
  {
    chain: "Arbitrum One",
    chainColor: "indigo",
    name: "Cross-Chain Bridge",
    project: "NEXIO Protocol",
    type: "LayerZero OApp",
    address: "0xE56C...7D3F",
    explorerHref: "#",
  },
];

/* ── Helpers ─────────────────────────────────────────────────── */
const parseTech = (str) => {
  if (!str) return [];
  return str.split(/[,·|]+/).map((s) => s.trim()).filter(Boolean);
};

const getCategory = (lang = "") => {
  const l = lang.toLowerCase();
  if (l.includes("solidity") || l.includes("web3") || l.includes("blockchain") || l.includes("ipfs"))
    return { label: "Blockchain & Web3", color: "gold" };
  if (l.includes("react native") || l.includes("ios") || l.includes("android") || l.includes("swift"))
    return { label: "Mobile Development", color: "violet" };
  if (l.includes("defi") || l.includes("token") || l.includes("nft"))
    return { label: "DeFi & Tokenisation", color: "gold" };
  if (l.includes("django") || l.includes("python") || l.includes("rest") || l.includes("api"))
    return { label: "Backend Engineering", color: "teal" };
  if (l.includes("react") || l.includes("next") || l.includes("vue") || l.includes("typescript"))
    return { label: "Frontend Engineering", color: "indigo" };
  return { label: "Full-Stack", color: "emerald" };
};

const getStatus = (demo, link) => {
  if (demo) return "Live";
  if (link) return "Production";
  return "In Development";
};

/* ── StatusPill ──────────────────────────────────────────────── */
const StatusPill = ({ label }) => {
  const cls =
    label === "Live"           ? "proj-status--live" :
    label === "Production"     ? "proj-status--prod" :
    label === "Soon"           ? "proj-status--soon" :
                                 "proj-status--dev";
  return (
    <span className={`proj-status ${cls}`}>
      <span className="proj-status-dot" />
      {label}
    </span>
  );
};

/* ── Gradient fallback colours per category ─────────────────── */
const fallbackGradients = {
  gold:    "linear-gradient(135deg, #1a2a1a 0%, #2a1f0a 50%, #1f3252 100%)",
  teal:    "linear-gradient(135deg, #0a2020 0%, #0d2e2e 50%, #1f3252 100%)",
  violet:  "linear-gradient(135deg, #1a1030 0%, #251540 50%, #1f3252 100%)",
  indigo:  "linear-gradient(135deg, #0f1830 0%, #182040 50%, #1f3252 100%)",
  emerald: "linear-gradient(135deg, #0a1e14 0%, #102a1e 50%, #1f3252 100%)",
};

const fallbackAccents = {
  gold:    "rgba(212,175,90,0.6)",
  teal:    "rgba(78,234,222,0.6)",
  violet:  "rgba(165,133,196,0.6)",
  indigo:  "rgba(123,143,238,0.6)",
  emerald: "rgba(69,222,153,0.6)",
};

/* ── Projects component ──────────────────────────────────────── */
const Projects = () => {
  const { data: projects, isFetching } = useGetProjectsQuery();
  const img_300 = baseUrlImages;
  const [projectsDetails, setProjectsDetails] = useState(projects);
  const [imgErrors, setImgErrors] = useState({});

  useEffect(() => { setProjectsDetails(projects); }, [projects]);

  const handleImgError = (id) => setImgErrors(prev => ({ ...prev, [id]: true }));

  if (isFetching) return null;

  const flagship = (projectsDetails || []).slice(0, 4);
  const totalCount = (projectsDetails || []).length;

  return (
    <section className="projects-sovereign" id="work">
      <div className="projects-container">

        {/* ── Header ── */}
        <div className="projects-header rv">
          <p className="section-eyebrow">Projects</p>
          <h2 className="section-heading">
            {totalCount > 0 ? `${totalCount}+` : "12+"} <em>Products</em> Shipped.
          </h2>
          <p className="projects-subtext">
            Spanning DeFi protocols, NFT marketplaces, SaaS platforms, mobile apps,
            and enterprise backends — built end-to-end and deployed to production.
          </p>
        </div>

        {/* ── Flagship grid ── */}
        <div className="projects-flagship-grid">
          {flagship.map((d, idx) => {
            const tech    = parseTech(d.language_used);
            const visible = tech.slice(0, 3);
            const overflow = tech.length > 3 ? tech.length - 3 : 0;
            const cat     = getCategory(d.language_used);
            const status  = getStatus(d.demo_link, d.project_link);
            const href    = d.demo_link || d.project_link || null;

            return (
              <Link
                to={`/project/${d.id}`}
                className={`pf-card rv d${Math.min(idx + 1, 4)}`}
                key={d.id || idx}
              >
                {/* Image */}
                <div className="pf-img-wrap">
                  {/* Gradient fallback — always rendered as base layer */}
                  <div
                    className="pf-img-fallback"
                    style={{ background: fallbackGradients[cat.color] }}
                  >
                    <span
                      className="pf-img-fallback-title"
                      style={{ color: fallbackAccents[cat.color] }}
                    >
                      {d.Project_title}
                    </span>
                  </div>

                  {/* Image rendered on top — removed on error */}
                  {d.image && !imgErrors[d.id] && (
                    <img
                      src={`${img_300}${d.image}`}
                      alt={d.Project_title}
                      onError={() => handleImgError(d.id)}
                    />
                  )}
                  <div className="pf-img-overlay" />

                  {/* Floating badges on image */}
                  <div className="pf-img-badges">
                    <StatusPill label={status} />
                    {idx === 0 && <span className="pf-star">★ Flagship</span>}
                  </div>

                  {/* Category chip */}
                  <span className={`pf-category pf-category--${cat.color}`}>
                    {cat.label}
                  </span>
                </div>

                {/* Body */}
                <div className="pf-body">
                  <h3 className="pf-title">{d.Project_title}</h3>

                  {d.Project_info && (
                    <p className="pf-desc">{d.Project_info}</p>
                  )}

                  <div className="pf-footer">
                    <div className="pf-tech-row">
                      {visible.map((t) => (
                        <span className="pf-tech" key={t}>{t}</span>
                      ))}
                      {overflow > 0 && (
                        <span className="pf-tech pf-tech--more">+{overflow}</span>
                      )}
                    </div>

                    <span className="pf-arrow">
                      View <i className="fas fa-arrow-right" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── Smart Contract Highlights ── */}
        <div className="contracts-block rv d3">
          <div className="contracts-header">
            <span className="contracts-label">Smart Contract Highlights</span>
            <div className="contracts-line" />
          </div>

          <div className="contracts-row">
            {CONTRACTS.map((c) => (
              <a
                key={c.name}
                href={c.explorerHref}
                className={`contract-card contract-card--${c.chainColor}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="cc-top">
                  <span className={`cc-chain cc-chain--${c.chainColor}`}>{c.chain}</span>
                  <i className="fas fa-external-link-alt cc-ext" />
                </div>
                <h4 className="cc-name">{c.name}</h4>
                <p className="cc-sub">{c.project} · {c.type}</p>
                <span className="cc-address">{c.address}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── CTAs ── */}
        <div className="projects-ctas rv d4">
          <Link to="/portfolio" className="pcta pcta--primary">
            <span>Explore Full Portfolio</span>
            <span className="pcta-count">{totalCount > 0 ? `${totalCount}+` : "18+"}</span>
            <i className="fas fa-arrow-right" />
          </Link>
          <Link to="/smart-contracts" className="pcta pcta--ghost">
            <span>Smart Contract Portfolio</span>
            <span className="pcta-count">70+</span>
            <i className="fas fa-arrow-right" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Projects;

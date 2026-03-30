import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SmartContracts.css";

/* ── Chain meta ─────────────────────────────────────────────── */
const CHAIN_META = {
  "Arbitrum One": { color: "#6B7FE8", bg: "rgba(107,127,232,0.1)", border: "rgba(107,127,232,0.28)", key: "Arbitrum" },
  "BNB Chain":    { color: "#C9A655", bg: "rgba(201,166,85,0.1)",  border: "rgba(201,166,85,0.28)",  key: "BSC" },
  "Ethereum":     { color: "#9375B5", bg: "rgba(147,117,181,0.1)", border: "rgba(147,117,181,0.28)", key: "Ethereum" },
  "Polygon":      { color: "#8B5CF6", bg: "rgba(139,92,246,0.1)",  border: "rgba(139,92,246,0.28)",  key: "Polygon" },
  "Testnet":      { color: "#45E3D3", bg: "rgba(69,227,211,0.1)",  border: "rgba(69,227,211,0.28)",  key: "Testnets" },
};

/* ── Contract data ──────────────────────────────────────────── */
const CONTRACTS = [
  {
    chain: "Arbitrum One",
    status: "Production",
    project: "FANN ArtTech",
    type: "ERC-3643 Factory",
    name: "RWA Token Factory",
    desc: "Factory contract for minting ERC-3643 compliant real-world asset tokens. Handles token deployment with built-in identity verification, KYC gating, and modular compliance enforcement.",
    addressShort: "0x1a05...EE99",
    addressFull: "0x1a0533ee2e6C4a08eA17ae0CB61Bf68D1CE3EE99",
    explorerUrl: "https://arbiscan.io/address/0x1a0533ee2e6C4a08eA17ae0CB61Bf68D1CE3EE99",
    category: "RWA Infrastructure",
  },
  {
    chain: "Arbitrum One",
    status: "Production",
    project: "FANN ArtTech",
    type: "Marketplace Contract",
    name: "Sale Marketplace",
    desc: "Fixed-price marketplace for tokenized real-world art assets. Handles listing, purchasing, platform fee distribution, and ERC-3643 compliant ownership transfer.",
    addressShort: "0x0556...91Df",
    addressFull: "0x055666C504baaFf95e0eC665BEf47494E3B591Df",
    explorerUrl: "https://arbiscan.io/address/0x055666C504baaFf95e0eC665BEf47494E3B591Df",
    category: "NFT & Marketplace",
  },
  {
    chain: "Arbitrum One",
    status: "Production",
    project: "FANN ArtTech",
    type: "Auction Contract",
    name: "Auction Marketplace",
    desc: "On-chain English auction system for tokenized art assets. Supports timed bidding, reserve prices, automatic settlement, and royalty payments.",
    addressShort: "0x39E5...89f7",
    addressFull: "0x39E5a1C6025771b47fdA464F06285EB7cebC89f7",
    explorerUrl: "https://arbiscan.io/address/0x39E5a1C6025771b47fdA464F06285EB7cebC89f7",
    category: "NFT & Marketplace",
  },
  {
    chain: "Arbitrum One",
    status: "Production",
    project: "FANN ArtTech",
    type: "Identity Registry (ERC-3643)",
    name: "Identity Registry",
    desc: "On-chain identity management mapping wallet addresses to verified DID claims. Core compliance layer for the FANN ArtTech ERC-3643 token ecosystem.",
    addressShort: "0xCBA2...95c0",
    addressFull: "0xCBA2f2d50F9bADB18d726cc685E32213967795c0",
    explorerUrl: "https://arbiscan.io/address/0xCBA2f2d50F9bADB18d726cc685E32213967795c0",
    category: "Compliance & KYC",
  },
  {
    chain: "Arbitrum One",
    status: "Production",
    project: "FANN ArtTech",
    type: "KYC Module",
    name: "KYC Registry",
    desc: "Modular KYC verification contract storing claim hashes for verified investors. Integrates with IdentityRegistry to gate token transfers to compliant wallets only.",
    addressShort: "0x27E0...fAc9",
    addressFull: "0x27E039FD5343c842eee7E848b92C35D3AA05fAc9",
    explorerUrl: "https://arbiscan.io/address/0x27E039FD5343c842eee7E848b92C35D3AA05fAc9",
    category: "Compliance & KYC",
  },
  {
    chain: "Arbitrum One",
    status: "Production",
    project: "FANN ArtTech",
    type: "Compliance Engine",
    name: "Modular Compliance",
    desc: "Pluggable compliance rules engine enforcing transfer restrictions, holding limits, and jurisdictional rules across all FANN RWA token operations.",
    addressShort: "0x784a...8656",
    addressFull: "0x784a466B6723c0F332Eb255C5762451aE8e28656",
    explorerUrl: "https://arbiscan.io/address/0x784a466B6723c0F332Eb255C5762451aE8e28656",
    category: "Compliance & KYC",
  },
  {
    chain: "Arbitrum One",
    status: "Production",
    project: "FANN ArtTech",
    type: "Escrow Contract",
    name: "Sale Escrow",
    desc: "Trustless escrow for fixed-price RWA sales. Holds funds during transaction lifecycle and releases payment to seller on confirmed token delivery.",
    addressShort: "0x7486...A141",
    addressFull: "0x748625E390e366fbe23412404070E7fDba07A141",
    explorerUrl: "https://arbiscan.io/address/0x748625E390e366fbe23412404070E7fDba07A141",
    category: "Payments & Finance",
  },
  {
    chain: "Arbitrum One",
    status: "Production",
    project: "FANN ArtTech",
    type: "Escrow Contract",
    name: "Auction Escrow",
    desc: "Escrow contract for on-chain art auctions. Holds bidder funds throughout the auction lifecycle and executes atomic settlement at auction close.",
    addressShort: "0x9dFA...c70B",
    addressFull: "0x9dFA1b57456a82c086383EA0D660457Ad4e2c70B",
    explorerUrl: "https://arbiscan.io/address/0x9dFA1b57456a82c086383EA0D660457Ad4e2c70B",
    category: "Payments & Finance",
  },
  {
    chain: "BNB Chain",
    status: "Production",
    project: "NFTyART",
    type: "NFT Marketplace",
    name: "NFT Marketplace",
    desc: "Full-stack NFT marketplace contract supporting minting, fixed-price sales, bidding, and royalty distribution. On-chain governance and community whitelisting.",
    addressShort: "0x280A...d859",
    addressFull: "0x280A0B919D802A7d0bDD8222fcBb8d1E4d9Ad859",
    explorerUrl: "https://bscscan.com/address/0x280A0B919D802A7d0bDD8222fcBb8d1E4d9Ad859#readContract",
    category: "NFT & Marketplace",
  },
  {
    chain: "BNB Chain",
    status: "Production",
    project: "NFTyART",
    type: "ERC-721 NFT",
    name: "NFT Collection Contract",
    desc: "ERC-721 NFT collection with on-chain metadata, creator royalty enforcement (EIP-2981), batch minting, and whitelist-gated presale phases.",
    addressShort: "0xf342...5232",
    addressFull: "0xf3422b8e8ea2cd3bbf13aea82786683085f35232",
    explorerUrl: "https://bscscan.com/address/0xf3422b8e8ea2cd3bbf13aea82786683085f35232",
    category: "NFT & Marketplace",
  },
  {
    chain: "BNB Chain",
    status: "Production",
    project: "NFTyART",
    type: "BSC Deployment",
    name: "NFTyART Contract #1",
    desc: "Smart contract deployed as part of the NFTyART ecosystem on BNB Chain mainnet. Handles platform-specific logic for digital art tokenisation.",
    addressShort: "0xaa4d...3877",
    addressFull: "0xaa4ded8cf342f1eb6922594046958f4d42ff387731afa3c3a7261f473fd5d9e5",
    explorerUrl: "https://bscscan.com/tx/0xaa4ded8cf342f1eb6922594046958f4d42ff387731afa3c3a7261f473fd5d9e5",
    category: "NFT & Marketplace",
  },
  {
    chain: "BNB Chain",
    status: "Production",
    project: "NFTyART",
    type: "BSC Deployment",
    name: "NFTyART Contract #2",
    desc: "Secondary contract in the NFTyART BSC deployment suite. Manages platform treasury, fee collection, and artist reward distribution.",
    addressShort: "0xf083...5f60",
    addressFull: "0xf08333f5483186b2686df2f4eda59f62e3a25f6011e4e5211f22ab4ec15bb090",
    explorerUrl: "https://bscscan.com/tx/0xf08333f5483186b2686df2f4eda59f62e3a25f6011e4e5211f22ab4ec15bb090",
    category: "Payments & Finance",
  },
];

const CHAIN_FILTERS   = ["All", "Arbitrum", "BSC", "Ethereum", "Polygon", "Testnets"];
const CAT_FILTERS     = ["All", "RWA Infrastructure", "Compliance & KYC", "NFT & Marketplace", "DeFi & DEX", "Token Contracts", "Payments & Finance"];
const TOTAL_CONTRACTS = 41;
const DEFAULT_VISIBLE = 12;

/* ── SmartContracts page ─────────────────────────────────────── */
const SmartContracts = () => {
  const history = useHistory();
  const [chainFilter, setChainFilter] = useState("All");
  const [catFilter,   setCatFilter]   = useState("All");
  const [showAll,     setShowAll]      = useState(false);
  const [copied,      setCopied]       = useState(null);

  const filtered = CONTRACTS.filter((c) => {
    const chainOk = chainFilter === "All" || CHAIN_META[c.chain]?.key === chainFilter;
    const catOk   = catFilter === "All"   || c.category === catFilter;
    return chainOk && catOk;
  });

  const displayed = showAll ? filtered : filtered.slice(0, DEFAULT_VISIBLE);

  const handleCopy = (contract) => {
    navigator.clipboard.writeText(contract.addressFull).then(() => {
      setCopied(contract.addressFull);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <div className="sc-page">

      {/* ── Hero ── */}
      <div className="sc-hero">
        <div className="sc-hero-inner">

          <button className="sc-back-btn" onClick={() => history.push("/#projects")}>
            <i className="fas fa-arrow-left" /> Back to Portfolio
          </button>

          <p className="sc-eyebrow">On-chain · Verified · Deployed</p>
          <h1 className="sc-heading">
            <span>Smart Contract</span>
            <br />
            <em>Portfolio.</em>
          </h1>
          <p className="sc-subtext">
            70+ smart contracts deployed across Ethereum mainnet (20+), Polygon (20+), Arbitrum,
            BNB Chain, and testnets (30+) — spanning RWA tokenisation, NFT marketplaces, DeFi protocols,
            and compliance infrastructure. Every address is verifiable on-chain.
          </p>

          {/* Chain stats */}
          <div className="sc-stats">
            {[
              { label: "Arbitrum One", count: "8+",  color: "#6B7FE8" },
              { label: "BNB Chain",    count: "13+", color: "#C9A655" },
              { label: "Ethereum",     count: "20+", color: "#9375B5" },
              { label: "Polygon",      count: "20+", color: "#8B5CF6" },
              { label: "Testnets",     count: "30+", color: "#45E3D3" },
            ].map((s) => (
              <div className="sc-stat-card" key={s.label}>
                <span className="sc-stat-count" style={{ color: s.color }}>{s.count}</span>
                <span className="sc-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="sc-filters-wrap">
        <div className="sc-filter-row">
          {CHAIN_FILTERS.map((f) => (
            <button
              key={f}
              className={`sc-filter-btn ${chainFilter === f ? "sc-filter-btn--active-gold" : ""}`}
              onClick={() => { setChainFilter(f); setShowAll(false); }}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="sc-filter-row">
          {CAT_FILTERS.map((f) => (
            <button
              key={f}
              className={`sc-filter-btn ${catFilter === f ? "sc-filter-btn--active-indigo" : ""}`}
              onClick={() => { setCatFilter(f); setShowAll(false); }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="sc-grid-wrap">
        <div className="sc-results-info">
          Showing{" "}
          <span className="sc-count-highlight">{displayed.length}</span>
          {" "}of{" "}
          <span className="sc-count-total">{chainFilter === "All" && catFilter === "All" ? TOTAL_CONTRACTS : filtered.length}</span>
          {" "}contracts
          {(chainFilter !== "All" || catFilter !== "All") && (
            <button
              className="sc-clear-btn"
              onClick={() => { setChainFilter("All"); setCatFilter("All"); setShowAll(false); }}
            >
              Clear filters
            </button>
          )}
        </div>

        {displayed.length === 0 ? (
          <div className="sc-empty">
            <i className="fas fa-search" />
            <p>No contracts match your filters.</p>
          </div>
        ) : (
          <div className="sc-grid">
            {displayed.map((c) => {
              const meta    = CHAIN_META[c.chain] || CHAIN_META["Arbitrum One"];
              const isCopied = copied === c.addressFull;
              return (
                <div className="sc-card" key={c.addressFull + c.name}>
                  <div className="sc-card-shine" style={{ background: `linear-gradient(to right, transparent, ${meta.color}55, transparent)` }} />

                  {/* Top row */}
                  <div className="sc-card-top">
                    <div className="sc-card-badges">
                      <span
                        className="sc-chain-badge"
                        style={{ color: meta.color, background: meta.bg, border: `1px solid ${meta.border}` }}
                      >
                        {c.chain}
                      </span>
                      <span className="sc-status-badge">Production</span>
                    </div>
                    <a
                      href={c.explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sc-explorer-link"
                    >
                      Explorer ↗
                    </a>
                  </div>

                  {/* Sub */}
                  <p className="sc-card-sub">{c.project} · {c.type}</p>

                  {/* Name */}
                  <h3 className="sc-card-name">{c.name}</h3>

                  {/* Desc */}
                  <p className="sc-card-desc">{c.desc}</p>

                  {/* Address copy */}
                  <button
                    className="sc-address-btn"
                    onClick={() => handleCopy(c)}
                    title="Click to copy address"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                    <code className="sc-address-code">{c.addressShort}</code>
                    <span className="sc-copy-label">{isCopied ? "copied!" : "copy"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* View all / collapse */}
        {filtered.length > DEFAULT_VISIBLE && (
          <div className="sc-view-all-wrap">
            <button
              className="sc-view-all-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less ↑" : `View All ${chainFilter === "All" && catFilter === "All" ? TOTAL_CONTRACTS : filtered.length} Contracts →`}
              {!showAll && (
                <span className="sc-view-all-count">
                  {chainFilter === "All" && catFilter === "All" ? TOTAL_CONTRACTS : filtered.length}
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      {/* ── CTA ── */}
      <div className="sc-cta-wrap">
        <div className="sc-cta">
          <div className="sc-cta-line" />
          <p className="sc-cta-eyebrow">Looking to build?</p>
          <h3 className="sc-cta-heading">Let's deploy your next contract.</h3>
          <p className="sc-cta-sub">
            From ERC-20 tokens to full RWA compliance suites — I architect and ship
            production-grade smart contracts across all major chains.
          </p>
          <a href="#contact" className="sc-cta-btn">
            Get in Touch →
          </a>
        </div>
      </div>

    </div>
  );
};

export default SmartContracts;

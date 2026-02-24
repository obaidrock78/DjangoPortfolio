/**
 * SVG "Code" / developer logo (Google Code style: brackets + slash).
 * Use as navbar brand icon.
 */
const CodeLogo = ({ className = "", size = 32, accentColor = "currentColor" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Back plate (rounded rect) */}
    <rect
      x="1"
      y="1"
      width="30"
      height="30"
      rx="6"
      fill="none"
      stroke={accentColor}
      strokeWidth="1.5"
    />
    {/* Left angle bracket < */}
    <path d="M12 10 L8 16 L12 22" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Slash / */}
    <path d="M16 9 L16 23" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" fill="none" transform="rotate(-45 16 16)" />
    {/* Right angle bracket > */}
    <path d="M20 10 L24 16 L20 22" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export default CodeLogo;

// Inline SVG icons for the hero stats row, drawn in the brand palette only.
export default function StatIcon({ name }) {
  switch (name) {
    case "pills":
      return (
        <svg className="stat-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="stat-pill-a" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.38" />
              <stop offset="1" stopColor="#08348C" stopOpacity="0.62" />
            </linearGradient>
            <linearGradient id="stat-pill-b" x1="13" y1="2" x2="24" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#08348C" stopOpacity="0.38" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.62" />
            </linearGradient>
          </defs>
          <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#stat-pill-a)" />
          <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#stat-pill-b)" />
          <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#3071F2" />
        </svg>
      );
    case "launch":
      return (
        <svg className="stat-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#FFFFFF" />
          <path
            d="M12 16.9V9.5M8.15 11.65L12 7.8l3.85 3.85"
            fill="none"
            stroke="#030F26"
            strokeWidth="1.85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "devices":
      return (
        <svg className="stat-icon-wide" width="38" height="21" viewBox="0 0 40 22" aria-hidden="true">
          <rect x="16" y="10" width="8" height="2" rx="1" fill="#2256F2" />
          <rect x="3.6" y="1.2" width="12.4" height="19.6" rx="3.2" fill="#3071F2" />
          <rect x="7.8" y="3.1" width="4" height="1.1" rx="0.55" fill="#030F26" />
          <rect x="24" y="1.2" width="12.4" height="19.6" rx="3.2" fill="#FFFFFF" />
          <rect x="28.2" y="3.1" width="4" height="1.1" rx="0.55" fill="#030F26" />
          <circle cx="9.8" cy="12.6" r="2.6" fill="#FFFFFF" />
          <circle cx="30.2" cy="12.6" r="2.6" fill="#2256F2" />
        </svg>
      );
    case "star":
      return (
        <svg className="stat-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#2256F2" />
          <path
            d="M12 6.4l1.72 3.62 3.96.46-2.94 2.72.78 3.92L12 15.14l-3.52 1.98.78-3.92-2.94-2.72 3.96-.46z"
            fill="#FFFFFF"
          />
        </svg>
      );
    default:
      return null;
  }
}

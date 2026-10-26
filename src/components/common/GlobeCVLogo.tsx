import React from 'react';

export interface GlobeCareerLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  className?: string;
}

export const GlobeCareerLogo: React.FC<GlobeCareerLogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
}) => {
  const sizeMap = {
    xs: { dim: 22, font: 'text-sm' },
    sm: { dim: 28, font: 'text-base' },
    md: { dim: 34, font: 'text-lg' },
    lg: { dim: 42, font: 'text-xl' },
    xl: { dim: 52, font: 'text-2xl' },
  };

  const { dim, font } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Vector Icon Emblem */}
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
        aria-label="GlobeCareer Emblem"
      >
        <defs>
          <linearGradient id="gcBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B132B" />
            <stop offset="50%" stopColor="#1C2541" />
            <stop offset="100%" stopColor="#0B132B" />
          </linearGradient>
          <linearGradient id="gcGlobeArc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
          <linearGradient id="gcCareerAscent" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="40%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#93C5FD" />
          </linearGradient>
          <linearGradient id="gcGoldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <filter id="gcSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Squircle Base Frame */}
        <rect x="24" y="24" width="464" height="464" rx="108" fill="url(#gcBgGrad)" stroke="#334155" strokeWidth="6" />

        {/* Latitude / Longitude Guide Rings */}
        <ellipse cx="256" cy="256" rx="160" ry="80" fill="none" stroke="#38BDF8" strokeWidth="8" strokeOpacity="0.25" strokeDasharray="8 6" transform="rotate(-25 256 256)" />
        <circle cx="256" cy="256" r="168" fill="none" stroke="#2563EB" strokeWidth="10" strokeOpacity="0.3" />

        {/* Global Career Trajectory Arc (Stylized G loop) */}
        <path
          d="M 130 270 A 135 135 0 1 0 350 150 A 140 140 0 0 1 200 370 A 135 135 0 0 1 130 270 Z"
          fill="url(#gcGlobeArc)"
          filter="url(#gcSoftGlow)"
        />

        {/* Ascending Career Chevron / Flight Wing (C Pinnacle) */}
        <path
          d="M 200 340 L 290 190 L 380 140 L 330 230 L 240 375 Z"
          fill="url(#gcCareerAscent)"
        />

        {/* Inner Dynamic Facet */}
        <path
          d="M 235 340 L 290 190 L 330 230 L 255 360 Z"
          fill="#93C5FD"
          fillOpacity="0.65"
        />

        {/* Career Beacon Polaris */}
        <circle cx="388" cy="132" r="14" fill="url(#gcGoldAccent)" />
        <polygon points="388,104 394,124 416,132 394,140 388,160 382,140 360,132 382,124" fill="#FFFFFF" />
      </svg>

      {/* Brand Typography */}
      {showWordmark && (
        <span
          className={`font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 whitespace-nowrap ${font}`}
        >
          Globe<span className="text-blue-600 dark:text-blue-400">Career</span>
        </span>
      )}
    </div>
  );
};

// Backwards-compatible alias for existing imports
export const GlobeCVLogo = GlobeCareerLogo;
export default GlobeCareerLogo;

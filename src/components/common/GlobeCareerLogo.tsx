import React, { useState } from 'react';
import { GLOBECAREER_LOGO_DATA_URI } from './logoDataUri';

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
    xs: { dim: 26, font: 'text-sm' },
    sm: { dim: 32, font: 'text-base' },
    md: { dim: 38, font: 'text-lg' },
    lg: { dim: 48, font: 'text-xl' },
    xl: { dim: 64, font: 'text-2xl' },
  };

  const { dim, font } = sizeMap[size];

  // Resolve initial path based on execution environment (file:// vs web server)
  const getInitialSrc = () => {
    if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
      return './globecareer-logo.png';
    }
    return '/globecareer-logo.png';
  };

  const [imgSrc, setImgSrc] = useState<string>(getInitialSrc);
  const [retryStep, setRetryStep] = useState<number>(0);

  const handleError = () => {
    // Graceful fallback chain for all filesystem / server / standalone environments
    if (retryStep === 0) {
      setRetryStep(1);
      setImgSrc('globecareer-logo.png');
    } else if (retryStep === 1) {
      setRetryStep(2);
      setImgSrc('./assets/globecareer-logo.png');
    } else if (retryStep === 2) {
      setRetryStep(3);
      setImgSrc('./public/globecareer-logo.png');
    } else if (retryStep === 3) {
      setRetryStep(4);
      setImgSrc('/globecareer-logo.png');
    } else {
      // Guaranteed zero-fail fallback: embedded high-resolution data URI of the exact original square logo
      setImgSrc(GLOBECAREER_LOGO_DATA_URI);
    }
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Official GlobeCareer Master Logo Asset — Pure Square Aspect Ratio */}
      <img
        src={imgSrc}
        onError={handleError}
        alt="GlobeCareer Logo"
        width={dim}
        height={dim}
        className="shrink-0 aspect-square rounded-md object-contain shadow-xs transition-transform duration-200 group-hover:scale-105"
      />

      {/* Brand Typography */}
      {showWordmark && (
        <span
          className={`font-black tracking-tight text-neutral-900 dark:text-neutral-100 whitespace-nowrap ${font}`}
        >
          Globe<span className="text-blue-600 dark:text-blue-400">Career</span>
        </span>
      )}
    </div>
  );
};

export default GlobeCareerLogo;

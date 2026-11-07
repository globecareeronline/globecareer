import React, { useEffect, useState } from 'react';

interface AdSlotProps {
  placement: 'home_bottom' | 'guide_sidebar' | 'footer_top';
  format?: 'horizontal' | 'rectangle';
  className?: string;
}

/**
 * AdSlot Component for Google AdSense readiness.
 * - Adheres strictly to AdSense Quality & Policy Guidelines.
 * - Collapses cleanly (zero height/space) when no AdSense Publisher ID is active,
 *   preventing ugly empty boxes or disrupted layouts.
 * - Properly labeled as "Advertisement" without deceptive styling.
 * - Never placed inside or obstructing the resume builder, downloads, or navigation.
 */
export const AdSlot: React.FC<AdSlotProps> = ({
  placement,
  format = 'horizontal',
  className = '',
}) => {
  const [adConfigured, setAdConfigured] = useState<boolean>(false);
  const [publisherId, setPublisherId] = useState<string | null>(null);

  useEffect(() => {
    // Check for runtime AdSense environment variable or global tag
    const pubId = (import.meta as any).env?.VITE_ADSENSE_CLIENT_ID || null;
    const isAdSenseLoaded = typeof window !== 'undefined' && (window as any).adsbygoogle;

    if (pubId) {
      setPublisherId(pubId);
      setAdConfigured(true);
      try {
        if (isAdSenseLoaded) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        }
      } catch (e) {
        // Suppress unhandled ad errors
      }
    } else {
      // Unconfigured slots collapse cleanly to zero DOM footprint
      setAdConfigured(false);
    }
  }, [placement]);

  // If AdSense is not configured with an active publisher account, collapse cleanly
  if (!adConfigured) {
    return null;
  }

  return (
    <div
      className={`my-8 mx-auto w-full max-w-4xl px-4 text-center overflow-hidden transition-all duration-200 ${className}`}
      data-ad-placement={placement}
    >
      <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 dark:text-neutral-500 mb-1.5 select-none">
        Advertisement
      </div>
      <div className="bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-4 min-h-[90px] flex items-center justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: format === 'horizontal' ? '90px' : '250px' }}
          data-ad-client={publisherId || ''}
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

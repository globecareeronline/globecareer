import React, { useState } from 'react';
import { COUNTRIES, searchCountries, getCountriesByRegion } from '../../data/countries';
import { CountryConfig, CountryRegion } from '../../types/country';
import { Search, Globe2, ArrowRight, ShieldCheck, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

interface CountryGuidesPageProps {
  onSelectCountry: (countryId: string) => void;
  onStartResumeForCountry: (countryId: string) => void;
}

const REGIONS: (CountryRegion | 'All')[] = [
  'All',
  'North America',
  'Europe',
  'Asia-Pacific',
  'Middle East',
  'Africa'
];

export const CountryGuidesPage: React.FC<CountryGuidesPageProps> = ({
  onSelectCountry,
  onStartResumeForCountry
}) => {
  const [selectedRegion, setSelectedRegion] = useState<CountryRegion | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = (selectedRegion === 'All' ? COUNTRIES : getCountriesByRegion(selectedRegion))
    .filter(c => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.cvTerminology.toLowerCase().includes(q)
      );
    });

  const getPhotoBadge = (rule: CountryConfig['photoRule']) => {
    switch (rule) {
      case 'discouraged':
        return <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 px-2 py-0.5 rounded">Photo Discouraged</span>;
      case 'standard':
        return <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 px-2 py-0.5 rounded">Photo Standard</span>;
      case 'recommended':
        return <span className="text-[11px] font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-900 px-2 py-0.5 rounded">Photo Recommended</span>;
      case 'optional':
      default:
        return <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 px-2 py-0.5 rounded">Photo Optional</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
          Verified Hiring Norms & Legal Regulations
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Country-Specific CV & Resume Guides (40 Countries)
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          Hiring practices differ radically worldwide. In the US, UK, and Canada, candidate photos risk immediate rejection due to anti-bias laws; in Germany, Switzerland, and the Gulf, photos and personal declarations are customary. Explore verified standards for each jurisdiction.
        </p>
      </div>

      {/* Global Regional Differences Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5">
          <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            North America & Commonwealth
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            US, Canada, UK, Australia: No photos, no age, no marital status. Strictly 1-2 pages. Focus purely on quantifiable business impact.
          </p>
        </div>

        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5">
          <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Continental Europe (DACH & EU)
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Germany, Switzerland, Austria: Tabular Lebenslauf with studio photo, date of birth, and language proficiencies. Poland strictly requires RODO GDPR clause.
          </p>
        </div>

        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5">
          <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            Middle East & Asia-Pacific
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            UAE, Saudi Arabia, Qatar: 2-3 pages with professional headshot, nationality, visa/Iqama status, and notice period. Japan expects formal Rirekisho formatting.
          </p>
        </div>
      </div>

      {/* Search & Region Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country or term (e.g. Germany, Lebenslauf)..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {REGIONS.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedRegion === region
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs'
                  : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* 40 Countries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((country) => (
          <div
            key={country.id}
            className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-neutral-400 dark:hover:border-neutral-600 transition-all flex flex-col justify-between space-y-4 shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                      {country.name}
                    </h3>
                    <span className="text-xs text-neutral-500 font-mono">
                      {country.cvTerminology} · {country.paperSize.toUpperCase()}
                    </span>
                  </div>
                </div>
                {getPhotoBadge(country.photoRule)}
              </div>

              <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-500">Standard Length:</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">{country.standardLength}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-500">Date Format:</span>
                  <span className="font-mono text-neutral-800 dark:text-neutral-200">{country.dateConvention}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-500">Dialing Code:</span>
                  <span className="font-mono text-neutral-800 dark:text-neutral-200">{country.phonePrefix}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-500">Spelling Standard:</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">{country.spellingVariant}</span>
                </div>
              </div>

              <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2 italic">
                "{country.photoNotice}"
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => onSelectCountry(country.id)}
                className="flex-1 py-1.5 px-3 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors text-center"
              >
                View Full Guide
              </button>
              <button
                type="button"
                onClick={() => onStartResumeForCountry(country.id)}
                className="py-1.5 px-3 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 rounded-lg flex items-center gap-1 transition-colors"
              >
                Create CV
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

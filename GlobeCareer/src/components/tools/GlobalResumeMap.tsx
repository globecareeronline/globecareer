import React, { useState, useMemo } from 'react';
import {
  Globe2,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileText,
  Search,
  Filter,
  Layers,
  Sparkles,
  Info,
  ChevronRight,
  Camera,
  FileSpreadsheet
} from 'lucide-react';
import { COUNTRIES } from '../../data/countries';
import { CountryConfig, CountryRegion, PhotoConvention } from '../../types/country';

interface GlobalResumeMapProps {
  onNavigate: (page: string) => void;
  onSelectCountry?: (countryId: string) => void;
  onStartResumeForCountry?: (countryId: string) => void;
}

const REGION_TABS: (CountryRegion | 'All')[] = [
  'All',
  'North America',
  'Europe',
  'Asia-Pacific',
  'Middle East',
  'Latin America',
  'Africa'
];

export const GlobalResumeMap: React.FC<GlobalResumeMapProps> = ({
  onNavigate,
  onSelectCountry,
  onStartResumeForCountry
}) => {
  const [selectedRegion, setSelectedRegion] = useState<CountryRegion | 'All'>('All');
  const [photoFilter, setPhotoFilter] = useState<string>('all');
  const [paperFilter, setPaperFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCountryId, setActiveCountryId] = useState<string>('us');

  // Filtered countries list
  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter(c => {
      const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
      const matchesPhoto = photoFilter === 'all' || c.photoRule === photoFilter;
      const matchesPaper = paperFilter === 'all' || c.paperSize === paperFilter;
      const matchesSearch = !searchQuery || 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.cvTerminology.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesRegion && matchesPhoto && matchesPaper && matchesSearch;
    });
  }, [selectedRegion, photoFilter, paperFilter, searchQuery]);

  const activeCountry = useMemo(() => {
    return COUNTRIES.find(c => c.id === activeCountryId) || COUNTRIES[0];
  }, [activeCountryId]);

  const handleStartCountryResume = (cId: string) => {
    if (onStartResumeForCountry) {
      onStartResumeForCountry(cId);
    } else {
      try {
        const saved = localStorage.getItem('globecareer_resume_data') || '{}';
        const parsed = JSON.parse(saved);
        parsed.country = cId;
        localStorage.setItem('globecareer_resume_data', JSON.stringify(parsed));
      } catch (e) {
        // ignore
      }
      onNavigate('builder');
    }
  };

  const handleViewGuide = (cId: string) => {
    if (onSelectCountry) {
      onSelectCountry(cId);
    } else {
      window.location.href = `/country/${cId}`;
    }
  };

  const getPhotoBadge = (rule: PhotoConvention) => {
    switch (rule) {
      case 'discouraged':
        return (
          <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 px-2 py-0.5 rounded-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Photo Discouraged
          </span>
        );
      case 'standard':
        return (
          <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 px-2 py-0.5 rounded-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Photo Standard
          </span>
        );
      case 'recommended':
        return (
          <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-900 px-2 py-0.5 rounded-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            Photo Recommended
          </span>
        );
      case 'optional':
      default:
        return (
          <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 px-2 py-0.5 rounded-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            Photo Optional
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
            Interactive Global Standards Navigator
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 flex items-center gap-1">
            <Globe2 className="w-3 h-3" />
            47 Countries Mapped
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Online Resume Map – Interactive Global CV & Hiring Standards
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          Navigate country-by-country hiring regulations, photo conventions, page length limits, and paper dimensions across 47 jurisdictions worldwide. Avoid costly mistakes: candidate photos trigger automatic rejection in the US and UK under anti-bias laws, while standard Lebenslauf in Germany and corporate CVs in Japan require professional headshots.
        </p>
      </div>

      {/* Global Comparison & Map Visual Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Interactive Map Matrix (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-base text-neutral-900 dark:text-neutral-100">
                1. Explore by Continent & Region
              </h2>
            </div>
            <span className="text-xs font-semibold text-neutral-500">
              Showing {filteredCountries.length} jurisdictions
            </span>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {REGION_TABS.map(reg => (
              <button
                key={reg}
                type="button"
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Secondary Filters: Photo Rule & Paper Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                Photo Requirement:
              </label>
              <select
                value={photoFilter}
                onChange={e => setPhotoFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-xs font-medium text-neutral-900 dark:text-neutral-100"
              >
                <option value="all">All Photo Conventions</option>
                <option value="discouraged">Photo Strictly Discouraged (US, UK, CA, AU, IE)</option>
                <option value="standard">Photo Customary / Standard (DE, FR, JP, TR, IT)</option>
                <option value="recommended">Photo Recommended (UAE, SA, QA)</option>
                <option value="optional">Photo Optional (NL, SE, ES, IN, PK)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                Paper Size Convention:
              </label>
              <select
                value={paperFilter}
                onChange={e => setPaperFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-xs font-medium text-neutral-900 dark:text-neutral-100"
              >
                <option value="all">All Paper Dimensions</option>
                <option value="letter">US Letter (8.5 × 11 in) - North America</option>
                <option value="a4">International A4 (210 × 297 mm) - Global Standard</option>
              </select>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by country name, ISO code, or terminology (e.g., 'United States', 'Lebenslauf', 'Currículo')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Interactive Country Grid Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
            {filteredCountries.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCountryId(c.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  activeCountryId === c.id
                    ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 bg-neutral-50/50 dark:bg-neutral-950'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl shrink-0">{c.flag}</span>
                  <div className="truncate">
                    <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 truncate">{c.name}</div>
                    <div className="text-[10px] text-neutral-500 truncate">{c.cvTerminology}</div>
                  </div>
                </div>
                {activeCountryId === c.id && <ChevronRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
              </button>
            ))}
          </div>

        </div>

        {/* Right Detail Card for Selected Country (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-neutral-900 text-white p-6 sm:p-7 rounded-3xl space-y-6 border border-neutral-800 shadow-md">
            
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeCountry.flag}</span>
                <div>
                  <h3 className="font-black text-lg text-white">
                    {activeCountry.name}
                  </h3>
                  <span className="text-xs text-neutral-400">
                    {activeCountry.region} • ISO: {activeCountry.code}
                  </span>
                </div>
              </div>
              {getPhotoBadge(activeCountry.photoRule)}
            </div>

            {/* Core Specs Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                <div className="text-[10px] uppercase font-bold text-neutral-400">Standard Term</div>
                <div className="font-bold text-neutral-200">{activeCountry.cvTerminology}</div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                <div className="text-[10px] uppercase font-bold text-neutral-400">Paper Dimension</div>
                <div className="font-bold text-neutral-200 uppercase">{activeCountry.paperSize} ({activeCountry.paperSize === 'letter' ? '8.5×11"' : 'A4 210×297mm'})</div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                <div className="text-[10px] uppercase font-bold text-neutral-400">Standard Length</div>
                <div className="font-bold text-neutral-200">{activeCountry.standardLength}</div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                <div className="text-[10px] uppercase font-bold text-neutral-400">Date Format</div>
                <div className="font-mono text-neutral-200">{activeCountry.dateConvention}</div>
              </div>
            </div>

            {/* Photo Notice */}
            <div className="p-4 rounded-2xl bg-neutral-950/90 border border-neutral-800 space-y-1.5 text-xs">
              <div className="font-bold text-neutral-300 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-blue-400" />
                Photo Regulation Notice
              </div>
              <p className="text-neutral-400 leading-relaxed text-[11px]">
                {activeCountry.photoNotice}
              </p>
            </div>

            {/* Key Hiring Nuances */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-neutral-300">Key Local Recruiter Preferences:</div>
              <ul className="space-y-1.5 text-neutral-400 text-[11px] list-disc list-inside">
                {activeCountry.keyHiringNuances.slice(0, 3).map((nuance, idx) => (
                  <li key={idx} className="leading-relaxed">{nuance}</li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleStartCountryResume(activeCountry.id)}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Format Resume for {activeCountry.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleViewGuide(activeCountry.id)}
                className="w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Read Full {activeCountry.name} Guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Global Regional Differences Comparison Table */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs overflow-x-auto">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            Global Snapshot
          </span>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Regional CV & Resume Standards Matrix
          </h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
            Key formatting rules, legal restrictions, and candidate expectations categorized across major geographic markets:
          </p>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500">
              <th className="py-3 px-3 font-bold">Region</th>
              <th className="py-3 px-3 font-bold">Photo Rule</th>
              <th className="py-3 px-3 font-bold">Standard Length</th>
              <th className="py-3 px-3 font-bold">Paper Size</th>
              <th className="py-3 px-3 font-bold">Primary Legal Framework</th>
              <th className="py-3 px-3 font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            <tr>
              <td className="py-3.5 px-3 font-bold text-neutral-900 dark:text-neutral-100">North America (US & Canada)</td>
              <td className="py-3.5 px-3 text-rose-600 font-semibold">Strictly Discouraged</td>
              <td className="py-3.5 px-3">1 Page (2 max for 10+ yrs)</td>
              <td className="py-3.5 px-3">US Letter</td>
              <td className="py-3.5 px-3 text-neutral-500">EEOC / Canadian Human Rights Act</td>
              <td className="py-3.5 px-3">
                <button
                  type="button"
                  onClick={() => handleStartCountryResume('us')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  US Template →
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-3 font-bold text-neutral-900 dark:text-neutral-100">United Kingdom & Commonwealth</td>
              <td className="py-3.5 px-3 text-rose-600 font-semibold">Discouraged</td>
              <td className="py-3.5 px-3">Strictly 2 Pages</td>
              <td className="py-3.5 px-3">A4</td>
              <td className="py-3.5 px-3 text-neutral-500">Equality Act 2010</td>
              <td className="py-3.5 px-3">
                <button
                  type="button"
                  onClick={() => handleStartCountryResume('uk')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  UK Template →
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-3 font-bold text-neutral-900 dark:text-neutral-100">Continental Europe (DACH & France)</td>
              <td className="py-3.5 px-3 text-blue-600 font-semibold">Standard / Customary</td>
              <td className="py-3.5 px-3">1 to 2 Pages</td>
              <td className="py-3.5 px-3">A4</td>
              <td className="py-3.5 px-3 text-neutral-500">GDPR Compliance Consent</td>
              <td className="py-3.5 px-3">
                <button
                  type="button"
                  onClick={() => handleStartCountryResume('de')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Lebenslauf →
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-3 font-bold text-neutral-900 dark:text-neutral-100">Middle East (UAE, Saudi, Qatar)</td>
              <td className="py-3.5 px-3 text-purple-600 font-semibold">Recommended</td>
              <td className="py-3.5 px-3">2 to 3 Pages</td>
              <td className="py-3.5 px-3">A4</td>
              <td className="py-3.5 px-3 text-neutral-500">Visa / Nationality Disclosure</td>
              <td className="py-3.5 px-3">
                <button
                  type="button"
                  onClick={() => handleStartCountryResume('ae')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Gulf CV →
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-3 font-bold text-neutral-900 dark:text-neutral-100">Asia-Pacific (India, SG, PK, BD)</td>
              <td className="py-3.5 px-3 text-neutral-600 font-semibold">Optional / Sector Dependent</td>
              <td className="py-3.5 px-3">2 Pages</td>
              <td className="py-3.5 px-3">A4</td>
              <td className="py-3.5 px-3 text-neutral-500">Notice Period & Tech Stacks</td>
              <td className="py-3.5 px-3">
                <button
                  type="button"
                  onClick={() => handleStartCountryResume('in')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  India CV →
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-3 font-bold text-neutral-900 dark:text-neutral-100">Latin America (Brazil & Mexico)</td>
              <td className="py-3.5 px-3 text-rose-600 font-semibold">Discouraged</td>
              <td className="py-3.5 px-3">1 to 2 Pages</td>
              <td className="py-3.5 px-3">A4</td>
              <td className="py-3.5 px-3 text-neutral-500">LGPD Compliance</td>
              <td className="py-3.5 px-3">
                <button
                  type="button"
                  onClick={() => handleStartCountryResume('br')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Currículo →
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Internal Linking Strip */}
      <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
            Explore Dedicated Career Documents & Country Guides:
          </div>
          <div className="flex flex-wrap gap-3 text-xs">
            <button
              type="button"
              onClick={() => onNavigate('guides')}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              All 47 Country Guides
            </button>
            <span className="text-neutral-400">•</span>
            <button
              type="button"
              onClick={() => onNavigate('european-cv-format')}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              European CV Format
            </button>
            <span className="text-neutral-400">•</span>
            <button
              type="button"
              onClick={() => onNavigate('cv-vs-resume')}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              CV vs. Resume Difference
            </button>
            <span className="text-neutral-400">•</span>
            <button
              type="button"
              onClick={() => onNavigate('ats-resume-maker')}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              ATS Resume Maker
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('builder')}
          className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
        >
          <span>Open Resume Builder</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

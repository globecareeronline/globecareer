import React, { useRef } from 'react';
import { ResumeData, PersonalInfo } from '../../types/resume';
import { getCountryById } from '../../data/countries';
import { User, Mail, Phone, MapPin, Upload, Trash2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface PersonalEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const PersonalEditor: React.FC<PersonalEditorProps> = ({ data, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const country = getCountryById(data.targetCountryId);
  const personal = data.personal;

  const updatePersonal = (field: keyof PersonalInfo, value: any) => {
    onChange({
      ...data,
      personal: {
        ...data.personal,
        [field]: value
      }
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updatePersonal('photoUrl', reader.result as string);
        updatePersonal('hasPhoto', true);
        // Also enable design showPhoto
        onChange({
          ...data,
          personal: {
            ...data.personal,
            photoUrl: reader.result as string,
            hasPhoto: true
          },
          design: {
            ...data.design,
            showPhoto: true
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updatePersonal('photoUrl', undefined);
    updatePersonal('hasPhoto', false);
    onChange({
      ...data,
      personal: {
        ...data.personal,
        photoUrl: undefined,
        hasPhoto: false
      },
      design: {
        ...data.design,
        showPhoto: false
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
          Personal & Contact Information
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Tailored to hiring regulations and contact conventions for {country.name}.
        </p>
      </div>

      {/* Country Photo Guidance Alert */}
      {country.photoRule === 'discouraged' && (
        <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <span className="font-semibold block mb-0.5">Photo Policy for {country.name}:</span>
            {country.photoNotice}
          </div>
        </div>
      )}

      {/* Headshot Upload Section (if photo template or user wants photo) */}
      <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
            Professional Application Headshot
          </span>
          <span className="text-[11px] text-neutral-500">
            {country.photoRule === 'standard' || country.photoRule === 'recommended' ? 'Recommended in ' + country.name : 'Optional'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {personal.photoUrl ? (
            <div className="relative group">
              <img 
                src={personal.photoUrl} 
                alt="Headshot" 
                className="w-16 h-16 rounded-xl object-cover border border-neutral-300 dark:border-neutral-700 shadow-sm"
              />
              <button
                type="button"
                onClick={removePhoto}
                className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700 transition-colors"
                title="Remove photo"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-400 bg-white dark:bg-neutral-950">
              <User className="w-6 h-6" />
            </div>
          )}

          <div className="space-y-1.5 flex-1">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handlePhotoUpload} 
              accept="image/*" 
              className="hidden" 
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              {personal.photoUrl ? 'Change Photo' : 'Upload Headshot'}
            </button>
            <p className="text-[11px] text-neutral-500">
              Recommended: high-resolution square photo in business attire (JPG, PNG).
            </p>
          </div>
        </div>
      </div>

      {/* Primary Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            value={personal.fullName} 
            onChange={(e) => updatePersonal('fullName', e.target.value)} 
            placeholder="e.g. John Doe"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Target Job Title <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            value={personal.jobTitle} 
            onChange={(e) => updatePersonal('jobTitle', e.target.value)} 
            placeholder="e.g. Senior Software Engineer"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input 
              type="email" 
              value={personal.email} 
              onChange={(e) => updatePersonal('email', e.target.value)} 
              placeholder="e.g. name@domain.com"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input 
              type="tel" 
              value={personal.phone} 
              onChange={(e) => updatePersonal('phone', e.target.value)} 
              placeholder={`${country.phonePrefix} 555-0123`}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 font-mono text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            City <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              value={personal.city} 
              onChange={(e) => updatePersonal('city', e.target.value)} 
              placeholder="e.g. New York or Berlin"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            State / Region / Postal Code
          </label>
          <input 
            type="text" 
            value={personal.stateOrRegion} 
            onChange={(e) => updatePersonal('stateOrRegion', e.target.value)} 
            placeholder="e.g. NY or 10115 Berlin"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
          />
        </div>
      </div>

      {/* Country Specific Fields: Work Authorization, DOB, Nationality, Driving License */}
      <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
        <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-500">
          Country-Specific Regulatory Fields
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Work Authorization Status */}
          {country.personalDataRules.workAuthStatusRecommended && (
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1 flex items-center justify-between">
                <span>{country.personalDataRules.workAuthLabel || 'Employment Authorization / Visa Status'}</span>
                <span className="text-[11px] text-emerald-600 font-semibold">Recommended for {country.name}</span>
              </label>
              <input 
                type="text" 
                value={personal.workAuthorization || ''} 
                onChange={(e) => updatePersonal('workAuthorization', e.target.value)} 
                placeholder={`e.g. Citizen, Permanent Resident, or Sponsored Visa Required`}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
              />
            </div>
          )}

          {/* Date of Birth (If customary in country) */}
          {country.personalDataRules.dobAllowed && (
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                {country.personalDataRules.dobLabel || 'Date of Birth (Optional)'}
              </label>
              <input 
                type="date" 
                value={personal.dateOfBirth || ''} 
                onChange={(e) => updatePersonal('dateOfBirth', e.target.value)} 
                className="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
              />
            </div>
          )}

          {/* Nationality */}
          {country.personalDataRules.nationalityAllowed && (
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Nationality (Customary in Europe/Gulf)
              </label>
              <input 
                type="text" 
                value={personal.nationality || ''} 
                onChange={(e) => updatePersonal('nationality', e.target.value)} 
                placeholder="e.g. French, German, Swiss"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
              />
            </div>
          )}

          {/* Driving License */}
          {country.personalDataRules.drivingLicenseCommon && (
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Driver's License (Commonly listed in {country.name})
              </label>
              <input 
                type="text" 
                value={personal.drivingLicense || ''} 
                onChange={(e) => updatePersonal('drivingLicense', e.target.value)} 
                placeholder="e.g. Class B / Permis B / Clean record"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
              />
            </div>
          )}
        </div>

        {/* Polish RODO / GDPR Consent Clause Box */}
        {country.personalDataRules.requiresGDPRClause && (
          <div className="p-3.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 dark:text-neutral-200">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Mandatory Polish GDPR (RODO) Recruitment Clause
            </div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
              Polish law strictly prohibits employers from reviewing CVs without this clause.
            </p>
            <textarea
              rows={3}
              value={personal.gdprConsentClause || country.personalDataRules.gdprClauseText || ''}
              onChange={(e) => updatePersonal('gdprConsentClause', e.target.value)}
              className="w-full p-2 text-xs font-mono bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Online Profiles & Links */}
      <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
        <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-500">
          Professional Links & Social Portfolios
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              LinkedIn
            </label>
            <input 
              type="text" 
              value={personal.linkedIn || ''} 
              onChange={(e) => updatePersonal('linkedIn', e.target.value)} 
              placeholder="linkedin.com/in/username"
              className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              GitHub / Code Repo
            </label>
            <input 
              type="text" 
              value={personal.github || ''} 
              onChange={(e) => updatePersonal('github', e.target.value)} 
              placeholder="github.com/username"
              className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Portfolio / Website
            </label>
            <input 
              type="text" 
              value={personal.portfolioUrl || ''} 
              onChange={(e) => updatePersonal('portfolioUrl', e.target.value)} 
              placeholder="yourportfolio.com"
              className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

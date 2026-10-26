import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GlobeCareerLogo } from '../common/GlobeCareerLogo';
import {
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  Cloud,
  ShieldCheck,
  FileText,
  Mail,
  Award,
  Search,
  Globe,
  BookmarkPlus,
  HelpCircle,
  Briefcase,
  UserCheck,
  AlignLeft,
  BookOpen,
  MessageSquare
} from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAuth?: () => void;
  onOpenCloudResumes?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
  onOpenAuth,
  onOpenCloudResumes,
}) => {
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Active dropdown on desktop
  const [openDropdown, setOpenDropdown] = useState<'resume' | 'templates' | 'letters' | 'tools' | 'jobs' | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Hover handlers with small graceful buffer to prevent flicker
  const handleMouseEnter = (menu: 'resume' | 'templates' | 'letters' | 'tools' | 'jobs') => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  // Close desktop dropdown on outside click or escape
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setUserDropdownOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setOpenDropdown(null);
  };

  const isResumeActive = ['builder', 'ats-checker', 'guides', 'country-detail'].includes(currentPage);
  const isTemplatesActive = ['templates', 'letter-templates', 'bio-templates', 'summary-templates', 'resignation-letter-templates', 'job-examples'].includes(currentPage);
  const isLettersActive = ['cover-letter', 'cover-letter-templates', 'recommendation-letter', 'email-generator'].includes(currentPage);
  const isToolsActive = ['bio-generator', 'summary-generator', 'resignation-letter', 'interview-prep', 'recommendation-guide'].includes(currentPage);
  const isJobsActive = ['jobs', 'tracker'].includes(currentPage);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div ref={navRef} className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-2.5">
        
        {/* Zone 1: Official Logo & Brand */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="whitespace-nowrap shrink-0 flex items-center text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
          title="GlobeCareer – Build Your Global Career. Stand Out Anywhere."
        >
          <GlobeCareerLogo size="sm" showWordmark={true} />
        </a>

        {/* Zone 2: Desktop Navigation (Zero dropdown arrows, pure hover & accessible focus) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300"
        >
          
          {/* Category 1: Resume & CV (Hover Dropdown, No Arrow) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('resume')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={openDropdown === 'resume'}
              onClick={() => setOpenDropdown(openDropdown === 'resume' ? null : 'resume')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  setOpenDropdown('resume');
                }
              }}
              className={`px-3 py-2 rounded-xl transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isResumeActive
                  ? 'text-neutral-900 dark:text-neutral-100 font-bold bg-neutral-100/70 dark:bg-neutral-800/70'
                  : ''
              }`}
            >
              <span>Resume &amp; CV</span>
            </button>

            {openDropdown === 'resume' && (
              <div
                role="menu"
                className="absolute left-0 top-full pt-1.5 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 py-2 text-xs">
                  {/* 1. Resume Builder */}
                  <a
                    href="/resume-builder"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('builder');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800"
                  >
                    <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Resume Builder</div>
                      <div className="text-[11px] text-neutral-500">Create a country-tailored resume with professional formatting and PDF/DOCX export.</div>
                    </div>
                  </a>

                  {/* 2. Resume Templates */}
                  <a
                    href="/templates"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('templates');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <BookmarkPlus className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Resume Templates</div>
                      <div className="text-[11px] text-neutral-500">Explore 40+ countries' resume formats and professional templates tailored to local hiring standards.</div>
                    </div>
                  </a>

                  {/* 3. ATS Checker */}
                  <a
                    href="/ats-checker"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('ats-checker');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <Search className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">ATS Checker</div>
                      <div className="text-[11px] text-neutral-500">Check your resume against a job description and identify missing skills.</div>
                    </div>
                  </a>

                  {/* 4. Country Guides (40+) */}
                  <a
                    href="/country-guides"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('guides');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <Globe className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Country Guides (40+)</div>
                      <div className="text-[11px] text-neutral-500">Explore country-specific resume rules, photo requirements, paper sizes, and hiring standards.</div>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Category: Templates (Hover Dropdown, No Arrow) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('templates')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={openDropdown === 'templates'}
              onClick={() => setOpenDropdown(openDropdown === 'templates' ? null : 'templates')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  setOpenDropdown('templates');
                }
              }}
              className={`px-3 py-2 rounded-xl transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isTemplatesActive
                  ? 'text-neutral-900 dark:text-neutral-100 font-bold bg-neutral-100/70 dark:bg-neutral-800/70'
                  : ''
              }`}
            >
              <span>Templates</span>
            </button>

            {openDropdown === 'templates' && (
              <div
                role="menu"
                className="absolute left-0 top-full pt-1.5 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 py-2 text-xs">
                  {/* 1. Resume & CV Templates */}
                  <a
                    href="/templates"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('templates');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800"
                  >
                    <BookmarkPlus className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Resume &amp; CV Templates</div>
                      <div className="text-[11px] text-neutral-500">Explore 40+ countries' resume formats and professional templates tailored to local hiring standards.</div>
                    </div>
                  </a>

                  {/* 2. Letter & Email Templates */}
                  <a
                    href="/letter-templates"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('letter-templates');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <Mail className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Letter &amp; Email Templates</div>
                      <div className="text-[11px] text-neutral-500">Cover letter, recommendation letter, and job application email templates for your next career move.</div>
                    </div>
                  </a>

                  {/* 3. Professional Bio Templates */}
                  <a
                    href="/bio-templates"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('bio-templates');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <UserCheck className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Professional Bio Templates</div>
                      <div className="text-[11px] text-neutral-500">15 executive, speaker, and LinkedIn bio templates crafted for senior and emerging leaders.</div>
                    </div>
                  </a>

                  {/* 4. Summary & Objective Templates */}
                  <a
                    href="/summary-templates"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('summary-templates');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <AlignLeft className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Summary &amp; Objective Templates</div>
                      <div className="text-[11px] text-neutral-500">18 high-impact career summaries and objectives tailored across industries and experience levels.</div>
                    </div>
                  </a>

                  {/* 5. Resignation Letter Templates */}
                  <a
                    href="/resignation-letter-templates"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('resignation-letter-templates');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <FileText className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Resignation Letter Templates</div>
                      <div className="text-[11px] text-neutral-500">11 graceful, professional resignation templates covering standard notice, remote, and executive departures.</div>
                    </div>
                  </a>

                  {/* 6. Role-Specific Resume Examples */}
                  <a
                    href="/resume-examples"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('job-examples');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <Briefcase className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Role-Specific Resume Examples</div>
                      <div className="text-[11px] text-neutral-500">Real-world, ATS-optimized resume examples tailored across tech, engineering, healthcare, and finance.</div>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Category 2: Letters & Outreach (Hover Dropdown, No Arrow) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('letters')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={openDropdown === 'letters'}
              onClick={() => setOpenDropdown(openDropdown === 'letters' ? null : 'letters')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  setOpenDropdown('letters');
                }
              }}
              className={`px-3 py-2 rounded-xl transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isLettersActive
                  ? 'text-neutral-900 dark:text-neutral-100 font-bold bg-neutral-100/70 dark:bg-neutral-800/70'
                  : ''
              }`}
            >
              <span>Letters &amp; Outreach</span>
            </button>

            {openDropdown === 'letters' && (
              <div
                role="menu"
                className="absolute left-0 top-full pt-1.5 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 py-2 text-xs">
                  {/* 1. Cover Letter Builder */}
                  <a
                    href="/cover-letter-builder"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('cover-letter');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800"
                  >
                    <FileText className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Cover Letter Builder</div>
                      <div className="text-[11px] text-neutral-500">Create a tailored cover letter for your target role and employer.</div>
                    </div>
                  </a>

                  {/* 2. Recommendation Letter Builder */}
                  <a
                    href="/recommendation-letter"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('recommendation-letter');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Recommendation Letter Builder</div>
                      <div className="text-[11px] text-neutral-500">Prepare professional employment, academic, and reference letters.</div>
                    </div>
                  </a>

                  {/* 3. Job Application Email Generator */}
                  <a
                    href="/email-generator"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('email-generator');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Job Application Email Generator</div>
                      <div className="text-[11px] text-neutral-500">Write professional job application emails, recruiter messages, and follow-ups.</div>
                    </div>
                  </a>

                  {/* 4. Letter & Email Templates */}
                  <a
                    href="/letter-templates"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('letter-templates');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <BookmarkPlus className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Letter &amp; Email Templates</div>
                      <div className="text-[11px] text-neutral-500">Explore cover letter, recommendation letter, and job application email templates for your next career move.</div>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Category 3: Career Tools (Hover Dropdown, No Arrow) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('tools')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={openDropdown === 'tools'}
              onClick={() => setOpenDropdown(openDropdown === 'tools' ? null : 'tools')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  setOpenDropdown('tools');
                }
              }}
              className={`px-3 py-2 rounded-xl transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isToolsActive
                  ? 'text-neutral-900 dark:text-neutral-100 font-bold bg-neutral-100/70 dark:bg-neutral-800/70'
                  : ''
              }`}
            >
              <span>Career Tools</span>
            </button>

            {openDropdown === 'tools' && (
              <div
                role="menu"
                className="absolute left-0 top-full pt-1.5 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 py-2 text-xs">
                  {/* 1. Professional Bio Generator */}
                  <a
                    href="/bio-generator"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('bio-generator');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800"
                  >
                    <UserCheck className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Professional Bio Generator</div>
                      <div className="text-[11px] text-neutral-500">Craft executive biographies, LinkedIn "About" profiles, and speaker bios.</div>
                    </div>
                  </a>

                  {/* 2. Resume Summary & Objective Generator */}
                  <a
                    href="/summary-generator"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('summary-generator');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <AlignLeft className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Summary &amp; Objective Generator</div>
                      <div className="text-[11px] text-neutral-500">Generate targeted professional summaries, career objectives, and headlines.</div>
                    </div>
                  </a>

                  {/* 3. Resignation Letter Generator */}
                  <a
                    href="/resignation-letter"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('resignation-letter');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <LogOut className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Resignation Letter Generator</div>
                      <div className="text-[11px] text-neutral-500">Create formal two weeks' notice, short notice, and transition letters.</div>
                    </div>
                  </a>

                  {/* 4. Interview Preparation */}
                  <a
                    href="/interview-prep"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('interview-prep');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <MessageSquare className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Interview Preparation</div>
                      <div className="text-[11px] text-neutral-500">STAR method frameworks, mock interview practice, and hiring etiquette.</div>
                    </div>
                  </a>

                  {/* 5. Recommendation Letter Guide */}
                  <a
                    href="/recommendation-letter-guide"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('recommendation-guide');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <BookOpen className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Recommendation Letter Guide</div>
                      <div className="text-[11px] text-neutral-500">Master employment, academic, and character reference formats and tips.</div>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Category 4: Jobs (Hover Dropdown, No Arrow) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('jobs')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={openDropdown === 'jobs'}
              onClick={() => setOpenDropdown(openDropdown === 'jobs' ? null : 'jobs')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  setOpenDropdown('jobs');
                }
              }}
              className={`px-3 py-2 rounded-xl transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isJobsActive
                  ? 'text-neutral-900 dark:text-neutral-100 font-bold bg-neutral-100/70 dark:bg-neutral-800/70'
                  : ''
              }`}
            >
              <span>Jobs</span>
            </button>

            {openDropdown === 'jobs' && (
              <div
                role="menu"
                className="absolute left-0 top-full pt-1.5 w-64 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 py-2 text-xs">
                  <a
                    href="/jobs"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('jobs');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Verified Jobs Portal</div>
                      <div className="text-[11px] text-neutral-500">Authenticated global vacancies</div>
                    </div>
                  </a>
                  <a
                    href="/job-tracker"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('tracker');
                    }}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:bg-neutral-100 dark:focus-visible:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <BookmarkPlus className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">Application Tracker</div>
                      <div className="text-[11px] text-neutral-500">Personal Kanban search pipeline</div>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: Dark Mode + User Account / Sign In */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors rounded-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            title="Toggle Light / Dark Mode"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Account / Sign In */}
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 py-1.5 px-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <div className="w-5 h-5 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 flex items-center justify-center text-[10px] font-bold">
                  {(user.displayName || user.email || 'U')[0].toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[120px] truncate">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="font-bold text-neutral-900 dark:text-neutral-100 truncate">
                      {user.displayName || 'GlobeCareer User'}
                    </div>
                    <div className="text-[11px] text-neutral-500 truncate">{user.email}</div>
                  </div>

                  <a
                    href="/job-tracker"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('tracker');
                    }}
                    className="flex items-center gap-2.5 px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    <BookmarkPlus className="w-4 h-4 text-blue-600" />
                    <span>My Application Tracker</span>
                  </a>

                  {onOpenCloudResumes && (
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenCloudResumes();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-left cursor-pointer"
                    >
                      <Cloud className="w-4 h-4 text-indigo-600" />
                      <span>Cloud Saved Resumes</span>
                    </button>
                  )}

                  {isAdmin && (
                    <a
                      href="/admin"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('admin');
                      }}
                      className="flex items-center gap-2.5 px-4 py-2 text-purple-600 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    >
                      <span>Admin Portal</span>
                    </a>
                  )}

                  <div className="border-t border-neutral-100 dark:border-neutral-800 my-1" />

                  <button
                    type="button"
                    onClick={async () => {
                      setUserDropdownOpen(false);
                      await logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 rounded-xl text-xs font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Organized by 4 clear career categories) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-5 space-y-4 text-xs font-semibold max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Category 1: Resume & CV */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block px-2 pb-1">
              Resume &amp; CV
            </span>
            <a
              href="/resume-builder"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('builder');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Resume Builder</span>
            </a>
            <a
              href="/templates"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('templates');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <BookmarkPlus className="w-4 h-4 text-purple-600" />
              <span>Resume Templates</span>
            </a>
            <a
              href="/ats-checker"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('ats-checker');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <Search className="w-4 h-4 text-indigo-600" />
              <span>ATS Resume Checker</span>
            </a>
            <a
              href="/country-guides"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('guides');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>Country Guides (40+)</span>
            </a>
          </div>

          {/* Templates */}
          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block px-2 pb-1">
              Templates
            </span>
            <a
              href="/templates"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('templates');
              }}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                currentPage === 'templates' ? 'bg-neutral-100/80 dark:bg-neutral-800/80 font-bold text-neutral-900 dark:text-neutral-100' : ''
              }`}
            >
              <BookmarkPlus className="w-4 h-4 text-purple-600" />
              <span>Resume &amp; CV Templates</span>
            </a>
            <a
              href="/letter-templates"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('letter-templates');
              }}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                currentPage === 'letter-templates' ? 'bg-neutral-100/80 dark:bg-neutral-800/80 font-bold text-neutral-900 dark:text-neutral-100' : ''
              }`}
            >
              <Mail className="w-4 h-4 text-indigo-600" />
              <span>Letter &amp; Email Templates</span>
            </a>
            <a
              href="/bio-templates"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('bio-templates');
              }}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                currentPage === 'bio-templates' ? 'bg-neutral-100/80 dark:bg-neutral-800/80 font-bold text-neutral-900 dark:text-neutral-100' : ''
              }`}
            >
              <UserCheck className="w-4 h-4 text-cyan-600" />
              <span>Professional Bio Templates</span>
            </a>
            <a
              href="/summary-templates"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('summary-templates');
              }}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                currentPage === 'summary-templates' ? 'bg-neutral-100/80 dark:bg-neutral-800/80 font-bold text-neutral-900 dark:text-neutral-100' : ''
              }`}
            >
              <AlignLeft className="w-4 h-4 text-blue-600" />
              <span>Summary &amp; Objective Templates</span>
            </a>
            <a
              href="/resignation-letter-templates"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('resignation-letter-templates');
              }}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                currentPage === 'resignation-letter-templates' ? 'bg-neutral-100/80 dark:bg-neutral-800/80 font-bold text-neutral-900 dark:text-neutral-100' : ''
              }`}
            >
              <FileText className="w-4 h-4 text-rose-600" />
              <span>Resignation Letter Templates</span>
            </a>
            <a
              href="/resume-examples"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('job-examples');
              }}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                currentPage === 'job-examples' ? 'bg-neutral-100/80 dark:bg-neutral-800/80 font-bold text-neutral-900 dark:text-neutral-100' : ''
              }`}
            >
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>Role-Specific Resume Examples</span>
            </a>
          </div>

          {/* Category 2: Letters & Outreach */}
          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block px-2 pb-1">
              Letters &amp; Outreach
            </span>
            <a
              href="/cover-letter-builder"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('cover-letter');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <FileText className="w-4 h-4 text-purple-600" />
              <span>Cover Letter Builder</span>
            </a>
            <a
              href="/recommendation-letter"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('recommendation-letter');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Recommendation Letter Builder</span>
            </a>
            <a
              href="/email-generator"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('email-generator');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <Mail className="w-4 h-4 text-amber-600" />
              <span>Job Application Email Generator</span>
            </a>
            <a
              href="/letter-templates"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('letter-templates');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <BookmarkPlus className="w-4 h-4 text-indigo-600" />
              <span>Letter &amp; Email Templates</span>
            </a>
          </div>

          {/* Category 3: Career Tools Suite */}
          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block px-2 pb-1">
              Career Tools Suite
            </span>
            <a
              href="/bio-generator"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('bio-generator');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <UserCheck className="w-4 h-4 text-cyan-600" />
              <span>Professional Bio Generator</span>
            </a>
            <a
              href="/summary-generator"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('summary-generator');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <AlignLeft className="w-4 h-4 text-teal-600" />
              <span>Summary &amp; Objective Generator</span>
            </a>
            <a
              href="/resignation-letter"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('resignation-letter');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <LogOut className="w-4 h-4 text-amber-600" />
              <span>Resignation Letter Generator</span>
            </a>
            <a
              href="/interview-prep"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('interview-prep');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <MessageSquare className="w-4 h-4 text-purple-600" />
              <span>Interview Preparation</span>
            </a>
            <a
              href="/recommendation-letter-guide"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('recommendation-guide');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Recommendation Letter Guide</span>
            </a>
          </div>

          {/* Category 4: Jobs & Pipeline */}
          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block px-2 pb-1">
              Jobs &amp; Mobility
            </span>
            <a
              href="/jobs"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('jobs');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Jobs Portal</span>
            </a>
            <a
              href="/job-tracker"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('tracker');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <BookmarkPlus className="w-4 h-4 text-amber-600" />
              <span>Job Application Tracker</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

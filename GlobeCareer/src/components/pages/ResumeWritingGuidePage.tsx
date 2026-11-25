import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, XCircle, BookOpen, Ruler, Award, HeartHandshake } from 'lucide-react';
import { COUNTRIES } from '../../data/countries';

interface ResumeWritingGuidePageProps {
  onStartBuilder: () => void;
  onNavigate?: (page: string, countryId?: string) => void;
}

export const ResumeWritingGuidePage: React.FC<ResumeWritingGuidePageProps> = ({ onStartBuilder, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
          Editorial Standards & International Strategy
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          International Resume Writing Guide
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Crafting a compelling resume requires moving past passive job descriptions and presenting concrete evidence of your professional value. Learn the formulas used by top international candidates.
        </p>
      </div>

      {/* The Google XYZ Formula */}
      <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
          <Sparkles className="w-4 h-4" />
          The Gold Standard Achievement Formula
        </div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          The XYZ Formula: "Accomplished [X], as measured by [Y], by doing [Z]"
        </h2>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Pioneered by former Google SVP of People Operations Laszlo Bock, this structure ensures every bullet point proves your tangible business impact rather than listing ordinary duties.
        </p>

        {/* Before / After Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-2xl space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-400">
              <XCircle className="w-4 h-4" />
              Weak (Duty-Oriented):
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 italic">
              "Responsible for managing cloud servers and fixing performance issues in the system."
            </p>
            <p className="text-[11px] text-neutral-500">
              States a duty, but gives zero evidence of scale, methodology, or business outcome.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              Strong (XYZ Impact Formula):
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 font-medium">
              "Decreased average API response latency by 42% across 14 million daily requests by implementing multi-region Redis cache clustering and optimizing PostgreSQL database queries."
            </p>
            <p className="text-[11px] text-neutral-500">
              States outcome [X] (42% latency cut), metric [Y] (14M daily requests), method [Z] (Redis & SQL tuning).
            </p>
          </div>
        </div>

        {/* Contextual Link Callout to Bullet Point Generator */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-xs space-y-0.5">
            <span className="font-bold text-blue-900 dark:text-blue-200 block">Want to automate this formula?</span>
            <p className="text-neutral-600 dark:text-neutral-300">
              Use our interactive <a href="/resume-bullet-generator" onClick={(e) => { e.preventDefault(); onNavigate?.('resume-bullet-generator'); }} className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">Resume Bullet Point Generator</a> to transform your tasks into quantifiable achievements across 8 industries.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate?.('resume-bullet-generator')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold whitespace-nowrap shadow-xs shrink-0"
          >
            Launch Bullet Generator
          </button>
        </div>
      </div>

      {/* Action Verb Bank */}
      <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Executive Action Verb Directory
        </h2>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          Begin every bullet point with a decisive action verb. Avoid weak phrases like "Assisted with" or "Helped to".
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="space-y-2">
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 border-b pb-1">
              Leadership & Strategy
            </h4>
            <div className="flex flex-col gap-1 text-neutral-600 dark:text-neutral-400 font-medium">
              <span>• Spearheaded</span>
              <span>• Orchestrated</span>
              <span>• Championed</span>
              <span>• Directed</span>
              <span>• Steered</span>
              <span>• Mentored</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 border-b pb-1">
              Engineering & Building
            </h4>
            <div className="flex flex-col gap-1 text-neutral-600 dark:text-neutral-400 font-medium">
              <span>• Architected</span>
              <span>• Engineered</span>
              <span>• Deployed</span>
              <span>• Automated</span>
              <span>• Migrated</span>
              <span>• Overhauled</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 border-b pb-1">
              Optimization & Growth
            </h4>
            <div className="flex flex-col gap-1 text-neutral-600 dark:text-neutral-400 font-medium">
              <span>• Accelerated</span>
              <span>• Scaled</span>
              <span>• Maximized</span>
              <span>• Streamlined</span>
              <span>• Standardized</span>
              <span>• Eliminated</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 border-b pb-1">
              Research & Analysis
            </h4>
            <div className="flex flex-col gap-1 text-neutral-600 dark:text-neutral-400 font-medium">
              <span>• Formulated</span>
              <span>• Evaluated</span>
              <span>• Forecasted</span>
              <span>• Benchmarked</span>
              <span>• Audited</span>
              <span>• Validated</span>
            </div>
          </div>
        </div>
      </div>

      {/* International Relocation Advice */}
      <div className="p-6 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
          Applying Across Borders: The Relocation Rule
        </h3>
        <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
          When applying for positions outside your home country, ambiguity about your work eligibility is the #1 reason international applications are immediately discarded. Always state your exact legal status right in your contact header:
        </p>
        <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
          <div>• <strong>If you hold citizenship or permanent residency:</strong> State it explicitly (e.g., <em>"Status: US Citizen"</em> or <em>"Right to work in UK without visa sponsorship"</em>).</div>
          <div>• <strong>If you need sponsorship:</strong> State your target visa (e.g., <em>"Seeking UK Skilled Worker Visa"</em> or <em>"Eligible for EU Blue Card"</em>). Recruiters respect transparent candidates.</div>
          <div>• <strong>State your relocation availability:</strong> e.g., <em>"Available to relocate within 30 days."</em></div>
        </div>
      </div>

      {/* Resume Length: targets "how long should a resume be" & "how many pages should a resume be" */}
      <section id="resume-length" className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Ruler className="w-4 h-4" />
            Document Length
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            How Long Should a Resume Be?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Resume length is not one global rule — it is a local convention. The short answer is one page for the United States and Canada, and two pages for the United Kingdom, Ireland, Australia and most of continental Europe. Recruiters do not reward extra pages; they reward relevance per line, so the correct length is the shortest document that still proves your fit for the role.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 block">1 page</span>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              United States, Canada, Philippines. Standard for early and mid-career candidates; the second page is only justified past roughly ten years of directly relevant experience.
            </p>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 block">2 pages</span>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              United Kingdom, Ireland, Australia, New Zealand and most EU markets. A full career history, personal profile and language levels usually need the second page.
            </p>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 block">3+ pages</span>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Academic CVs (publications, grants, teaching) and US federal resumes (USAJOBS), which list hours per week, salary history and supervisor contacts.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            How Many Pages Should a Resume Be by Experience?
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
              <thead className="bg-neutral-100 dark:bg-neutral-800 text-left">
                <tr>
                  <th scope="col" className="p-2.5 font-bold">Experience</th>
                  <th scope="col" className="p-2.5 font-bold">US / Canada</th>
                  <th scope="col" className="p-2.5 font-bold">UK / EU / Australia</th>
                  <th scope="col" className="p-2.5 font-bold">What to cut first</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
                <tr>
                  <td className="p-2.5 font-semibold">Student / 0–2 years</td>
                  <td className="p-2.5">1 page</td>
                  <td className="p-2.5">1 page</td>
                  <td className="p-2.5">Coursework lists, hobby sections, unrelated part-time jobs</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold">3–9 years</td>
                  <td className="p-2.5">1 page</td>
                  <td className="p-2.5">2 pages</td>
                  <td className="p-2.5">Oldest roles reduced to one line, generic duties</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold">10–19 years</td>
                  <td className="p-2.5">1–2 pages</td>
                  <td className="p-2.5">2 pages</td>
                  <td className="p-2.5">Roles older than 15 years condensed into an “Earlier career” line</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold">20+ years / executive</td>
                  <td className="p-2.5">2 pages</td>
                  <td className="p-2.5">2–3 pages</td>
                  <td className="p-2.5">Chronological detail; keep board roles and headline results</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            A dense, well-edited page holds roughly 400–650 words. If you are unsure whether your draft fits, paste it into the{' '}
            <a href="/resume-word-counter" onClick={(e) => { e.preventDefault(); onNavigate?.('resume-word-counter'); }} className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">Resume Word Counter</a>{' '}
            to check word count and estimated page fit before exporting.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            Standard Resume Length by Country
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Length conventions published in our country hiring guides. Select a country to see its full formatting rules, photo guidance and paper size.
          </p>
          <div className="max-h-80 overflow-y-auto border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <table className="w-full text-xs">
              <thead className="bg-neutral-100 dark:bg-neutral-800 text-left sticky top-0">
                <tr>
                  <th scope="col" className="p-2.5 font-bold">Country</th>
                  <th scope="col" className="p-2.5 font-bold">CV term</th>
                  <th scope="col" className="p-2.5 font-bold">Standard length</th>
                  <th scope="col" className="p-2.5 font-bold">Paper</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
                {COUNTRIES.map((c) => (
                  <tr key={c.id}>
                    <td className="p-2.5 font-semibold whitespace-nowrap">
                      <a
                        href={`/country/${c.id}`}
                        onClick={(e) => { e.preventDefault(); onNavigate?.('country-detail', c.id); }}
                        className="hover:text-blue-600 hover:underline"
                        title={`${c.name} CV and resume guide`}
                      >
                        {c.flag} {c.name}
                      </a>
                    </td>
                    <td className="p-2.5 whitespace-nowrap">{c.cvTerminology}</td>
                    <td className="p-2.5">{c.standardLength}</td>
                    <td className="p-2.5 whitespace-nowrap uppercase">{c.paperSize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Certifications: targets "how to put certifications on resume" */}
      <section id="certifications" className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-5 scroll-mt-24">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Award className="w-4 h-4" />
            Credentials
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            How to Put Certifications on a Resume
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Certifications belong in their own section directly after Education when they are job-critical (nursing licences, CPA, PMP, cloud certifications), or near the top under your summary when a licence is a hard hiring requirement. Each entry needs four elements: the credential name written out in full, the issuing body, the year awarded, and the expiry or licence number where a recruiter would expect to verify it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              Complete entry:
            </div>
            <p className="text-neutral-700 dark:text-neutral-300">
              “AWS Certified Solutions Architect – Associate — Amazon Web Services, 2024. Valid to 2027.”
            </p>
            <p className="text-[11px] text-neutral-500">
              Full name, issuer, year and validity — every field an ATS or licence check can index.
            </p>
          </div>
          <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-2xl space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-400">
              <XCircle className="w-4 h-4" />
              Incomplete entry:
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 italic">
              “AWS certified, advanced computer skills.”
            </p>
            <p className="text-[11px] text-neutral-500">
              No issuer, no year and no verifiable title — it reads as filler rather than proof.
            </p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            Rules That Survive ATS Parsing
          </h3>
          <div className="space-y-1.5">
            <div>• <strong>Spell out the acronym once:</strong> “Project Management Professional (PMP)” so both the abbreviation and the full phrase match a job description.</div>
            <div>• <strong>Use one line per credential:</strong> name, issuer, year. Avoid logos, badge images and multi-column boxes that parsers skip.</div>
            <div>• <strong>List in-progress certifications with an expected date:</strong> “CFA Level II — candidate, exam scheduled 2027” rather than leaving them out.</div>
            <div>• <strong>Drop expired certifications</strong> unless they are foundational, and never label an unaccredited course as a certification.</div>
            <div>• <strong>Match the job description wording</strong> where both forms are correct — the same credential can appear as “CompTIA Security+” or “Security Plus”.</div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            Check whether the certifications a job description asks for actually appear in your document with the{' '}
            <a href="/ats-checker" onClick={(e) => { e.preventDefault(); onNavigate?.('ats-checker'); }} className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">ATS Resume Checker</a>.
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.('ats-checker')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold whitespace-nowrap shadow-xs shrink-0"
          >
            Scan My Resume
          </button>
        </div>
      </section>

      {/* Volunteer work: targets "how to put volunteer work on resume" */}
      <section id="volunteer-work" className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-5 scroll-mt-24">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <HeartHandshake className="w-4 h-4" />
            Experience
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            How to Put Volunteer Work on a Resume
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Volunteer work earns a place on your resume when it proves a skill the job asks for, fills a gap in your paid history, or shows sustained commitment. If it is directly relevant, list it inside your Work Experience section with the same structure as a paid role. If it is supporting evidence rather than core experience, give it a short “Volunteer Experience” section after your employment history.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 block">Include it when…</span>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              You are a recent graduate or career changer, the volunteering used the same tools as the target role, you held a coordinating or fundraising responsibility, or the commitment spans a year or more.
            </p>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 block">Leave it out when…</span>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              The document is already at its market length limit, the activity was a one-off event, or it reveals a personal affiliation (religious, political or health-related) that many employers instruct recruiters to ignore.
            </p>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            Format It Like a Job, Not a Hobby
          </h3>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2 text-neutral-700 dark:text-neutral-300">
            <p><strong>Role, organisation, city — dates.</strong> “Volunteer Tutor, Community Learning Centre, Manchester — 2023–Present.”</p>
            <p className="italic">
              “Tutored 12 GCSE students weekly in mathematics, raising mock-exam pass rates from 58% to 83% over two terms.”
            </p>
            <p className="text-[11px] text-neutral-500">
              Notice the XYZ pattern: outcome, measurement, method. The same framing applies whether the work was paid or unpaid — see the action verb bank above for openers.
            </p>
          </div>
        </div>
      </section>

      {/* Cross-Link Tools & Free Template Libraries */}
      <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-4 shadow-xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
          Related Free Career Tools &amp; Libraries
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onNavigate?.('summary-templates')}
            className="p-4 text-left bg-neutral-50 dark:bg-neutral-950 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 rounded-2xl transition-all cursor-pointer group"
          >
            <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 flex items-center justify-between">
              <span>Summary &amp; Objectives</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              18+ ATS-tested professional summaries and career objectives.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('bio-templates')}
            className="p-4 text-left bg-neutral-50 dark:bg-neutral-950 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 rounded-2xl transition-all cursor-pointer group"
          >
            <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 flex items-center justify-between">
              <span>Bio Templates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              15+ professional biographies in first and third-person POV.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('reverse-chronological')}
            className="p-4 text-left bg-white dark:bg-neutral-900 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 rounded-2xl transition-all cursor-pointer group shadow-2xs"
          >
            <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 flex items-center justify-between">
              <span>Reverse Chronological Format</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Master the layout structure preferred by 95% of international hiring teams.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('resume-skills')}
            className="p-4 text-left bg-white dark:bg-neutral-900 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 rounded-2xl transition-all cursor-pointer group shadow-2xs"
          >
            <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 flex items-center justify-between">
              <span>Top Skills for Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Browse vetted hard &amp; soft skills categorized across 6 primary industries.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('references-on-resume')}
            className="p-4 text-left bg-white dark:bg-neutral-900 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 rounded-2xl transition-all cursor-pointer group shadow-2xs"
          >
            <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 flex items-center justify-between">
              <span>References on Resume Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Why references should never be on the resume &amp; how to format a reference sheet.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('resume-word-counter')}
            className="p-4 text-left bg-white dark:bg-neutral-900 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 rounded-2xl transition-all cursor-pointer group shadow-2xs"
          >
            <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 flex items-center justify-between">
              <span>Resume Word Counter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Check action verb density, reading time, and 1-page vs 2-page fit.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('templates')}
            className="p-4 text-left bg-white dark:bg-neutral-900 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 rounded-2xl transition-all cursor-pointer group shadow-2xs"
          >
            <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 flex items-center justify-between">
              <span>Resume Templates (47 Countries)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              International photo CV and single-column ATS layouts.
            </p>
          </button>
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={onStartBuilder}
          className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-xl hover:bg-neutral-800 shadow-md transition-colors inline-flex items-center gap-2"
        >
          Put These Principles into Practice in Builder
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

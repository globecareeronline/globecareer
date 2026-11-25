import React, { useState } from 'react';
import { Mail, Shield, CheckCircle2, Trash2, Send } from 'lucide-react';
import { TurnstileWidget } from '../TurnstileWidget';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
          Our Mission & Architecture
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          About GlobeCareer
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          GlobeCareer was built on a single observation: talent is global, but hiring conventions are local. An
          outstanding engineer from Europe applying to a US employer should not be discarded because their resume
          carries a photo, and an experienced marketing manager applying in Germany should not be overlooked because
          their application lacks a Tabellarischer Lebenslauf. The site exists to remove that formatting gap.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block">47 Country Guides</span>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Each profile collects local CV terminology, expected length, photo conventions, personal-data rules and
            ATS notes, with the public bodies and careers services behind each claim listed on the page.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block">Privacy by Default</span>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Resume content, letters and generated documents are produced in your browser. The core tools need no
            account, and account sign-in is optional: it syncs the job tracker across devices and governs the internal administrator console.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block">Genuine Exports</span>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Selectable-text vector PDFs and native Microsoft Word (.docx) files, produced on your device rather than
            rendered as screenshots of a document.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Who GlobeCareer is for
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <li><strong>People applying outside their home country</strong>, who need to know whether a photo, date of birth or nationality belongs on the document at all.</li>
          <li><strong>Relocating professionals</strong> who have one strong CV in one convention and need a credible version in another.</li>
          <li><strong>Students and first-time applicants</strong> who need a defensible structure before they have a long work history to fill it.</li>
          <li><strong>Career changers</strong> who need to reframe existing experience for a different market or sector without inventing anything.</li>
          <li><strong>Recommenders and referees</strong> asked to produce a letter and unsure what a useful one contains.</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          What is inside the site
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The site is a set of free tools plus the reference material needed to use them well:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-1">
            <span className="font-bold text-neutral-900 dark:text-neutral-100">Document builders</span>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Resume and CV builder, cover letter builder, recommendation letter builder, resignation letter generator,
              and the job application email generator.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-1">
            <span className="font-bold text-neutral-900 dark:text-neutral-100">Writing helpers</span>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Resume bullet generator, summary and objective generator, professional bio generator, and the resume word
              counter.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-1">
            <span className="font-bold text-neutral-900 dark:text-neutral-100">Checking and organisation</span>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              ATS resume checker, interview preparation, and a job application tracker that keeps a search in one board.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-1">
            <span className="font-bold text-neutral-900 dark:text-neutral-100">Reference material</span>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Country-specific CV guides, resume and role examples, letter and email templates, and ATS and formatting
              guides.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          How the country guidance is put together
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Every country profile answers the same practical questions in a fixed order: what the document is called
          locally, how long it usually runs, whether a photo is customary, which personal details belong on it, which
          paper size and date format to use, and what automated screening typically expects. The profiles try to keep
          three different things apart, because applicants routinely confuse them:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <li><strong>Legal requirements</strong>, such as data-protection rules that limit what an employer may collect.</li>
          <li><strong>Common conventions</strong>, such as a photo being customary in one market and discouraged in another. These are habits, not laws.</li>
          <li><strong>General recommendations</strong>, which are our editorial judgement and can reasonably be ignored when an employer asks for something specific.</li>
        </ul>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Where practice varies by industry, employer size or region, the guide says so rather than presenting one
          rule as universal. Each page links the public bodies and university careers services behind its claims so
          you can check them yourself, starting from the{" "}
          <a href="/country-guides" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700 dark:hover:text-blue-300">complete country guide directory</a>.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          What GlobeCareer deliberately does not do
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <li>It does not guarantee interviews, offers or visa outcomes, and it does not promise that a formatted document will pass every screening system.</li>
          <li>It does not give legal, immigration or tax advice. Country pages describe hiring conventions and cite public sources; they are not a substitute for an official checklist.</li>
          <li>It does not write claims about you that you did not provide, and it does not invent employers, dates, degrees or achievements.</li>
          <li>It does not sell resume data, and the core tools require no payment details.</li>
          <li>It is not a recruiter or staffing agency, and it has no influence over any employer's decision.</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Corrections and feedback
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Hiring conventions change, and country guidance goes stale faster than most content on a careers site. If a
          page describes a practice that no longer matches what you are seeing in a market, tell us which page and what
          changed: <a href="/contact" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700 dark:hover:text-blue-300">contact GlobeCareer</a>. The{" "}
          <a href="/privacy" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700 dark:hover:text-blue-300">privacy policy</a> explains what the site stores and where.
        </p>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [savedWithoutNotice, setSavedWithoutNotice] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;
    setError(null);

    if (!token) {
      setError('Please complete the verification check before sending.');
      return;
    }

    setPending(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, turnstileToken: token }),
      });

      let payload: { error?: string; notified?: boolean } | null = null;
      try {
        payload = (await response.json()) as { error?: string; notified?: boolean };
      } catch {
        payload = null;
      }

      if (!response.ok) {
        setError(payload?.error || 'We could not send your message right now. Please try again.');
        setToken(null);
        setResetKey((value) => value + 1);
        return;
      }

      setSavedWithoutNotice(payload?.notified === false);
      setSubmitted(true);
    } catch {
      setError('We could not reach the server. Please check your connection and try again.');
      setToken(null);
      setResetKey((value) => value + 1);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Contact GlobeCareer Support
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Have questions about country guidelines, legal compliance, or document exports? Reach out to our team.
        </p>
      </div>

      <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm">
        {submitted ? (
          <div className="p-6 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Message Received
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
              Thank you for contacting GlobeCareer. Your message has been received and saved, and our team
              reviews all inquiries promptly.
            </p>
            {savedWithoutNotice && (
              <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                Our email notification is delayed right now, but your message is stored safely and will be
                reviewed. If you need a reply sooner, write to info@globecareer.online.
              </p>
            )}
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-xs font-semibold text-blue-600 hover:underline pt-2"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Inquiry or Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your inquiry or suggested country guideline update..."
                className="w-full p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none leading-relaxed"
              />
            </div>
            <div className="pt-1">
              <TurnstileWidget onToken={setToken} resetKey={resetKey} />
            </div>
            {error ? (
              <p role="alert" className="text-xs font-medium text-red-600 dark:text-red-400 leading-relaxed">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={pending}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  const [cleared, setCleared] = useState(false);

  const handleClearData = () => {
    // Purge every key this app owns (current "globecareer_*" and legacy "globecv_*"
    // prefixes: resume draft, tracker applications, interview answers, preferences),
    // leaving data owned by other origins/apps untouched.
    Object.keys(localStorage)
      .filter((key) => key.startsWith('globecareer_') || key.startsWith('globecv_'))
      .forEach((key) => localStorage.removeItem(key));
    setCleared(true);
    setTimeout(() => setCleared(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
          Client-Side Privacy Guarantee
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Last updated: November 2026.
        </p>
      </div>

      <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-5 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          1. Data Minimization & Local Storage Architecture
        </h2>
        <p>
          GlobeCareer operates under strict privacy-by-design standards. We do not require registration or personal account creation. Any information you input into the resume or cover letter builder—including your full name, contact information, work history, education, and uploaded photos—is stored strictly within your browser’s local client storage (<code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">window.localStorage</code>).
        </p>

        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          2. No Third-Party Sales or Brokerage
        </h2>
        <p>
          We never sell, rent, or monetize your resume data, employment credentials, or contact details with data brokers, recruiters, or advertisers.
        </p>

        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          3. Document Generation
        </h2>
        <p>
          Both PDF print output and Microsoft Word (.docx) generation occur directly in-memory on your device using client-side JavaScript libraries. No copies of your documents are stored on remote web servers.
        </p>

        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          4. What is stored on your device
        </h2>
        <p>
          Local storage is used for the documents and preferences you create, not for advertising profiles. The keys
          currently in use are <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">globecareer_resume_data</code> for the
          resume draft (a legacy <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">globecv_resume_data</code> key may
          also exist from an earlier version), <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">globecareer_applications</code> for
          the job application tracker, <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">globecareer_interview_answers</code> for
          saved interview practice answers, <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">globecareer_offline_reports</code> for
          reports queued while you are offline, and small preference keys for language and theme. Because this data lives
          in your browser, it is available to anyone who uses the same browser profile on this device. Clearing site
          data, or using the purge control below, removes it permanently.
        </p>

        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          5. Optional account and cross-device sync
        </h2>
        <p>
          Account sign-in is optional and is used to synchronise the job application tracker between devices.
          Administrator accounts additionally control access to the internal contact-message console. If you choose to
          sign in, your account email address and your tracker entries are stored in our Firebase (Google Cloud) database
          under your user ID, so that the same board appears on each device you sign in from. Resume
          drafts, generated letters, bios and emails are not uploaded as part of this sync. Signing out stops further
          synchronisation and leaves the most recent copy in your browser. If you never sign in, no account record is
          created.
        </p>

        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          6. The contact form
        </h2>
        <p>
          The contact form collects the name, email address and message you type, plus a Cloudflare Turnstile
          verification token used to distinguish people from automated submissions. The message is stored in our
          Cloudflare KV namespace and a notification is then sent to our support inbox through a Google Apps Script web
          app, so that a person can reply to you. The message is stored before the notification is attempted, which means
          a mail outage does not lose a submission, and accepted messages remain readable to authorised administrators in
          an internal console. Turnstile is operated by Cloudflare and processes technical signals needed to decide
          whether the request looks automated. Do not send sensitive personal data, identity documents or full CVs
          through the contact form.
        </p>

        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          7. Cookies and similar technologies
        </h2>
        <p>
          GlobeCareer does not run advertising or retargeting trackers, and does not sell audiences. Browser storage is
          used for the functionality described above, and cookies may be set by the infrastructure that serves the site
          or by the anti-bot check on the contact form. The types of cookies in use, and how to control them in your
          browser, are set out in the <a href="/cookie-policy" className="text-blue-600 dark:text-blue-400 font-semibold underline">Cookie Policy</a>.
        </p>

        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          8. Retention and deletion
        </h2>
        <p>
          Data in your browser remains until you delete it, either through your browser settings or the purge control
          below. Data associated with an optional account remains while the account exists; signing out ends
          synchronisation but does not delete the stored copy. Contact messages accepted from the form remain in our KV store until an administrator removes them. If you want a synced copy removed and cannot do it from
          your account, write to <span className="font-mono">info@globecareer.online</span> from the address associated
          with the account and we will action the request.
        </p>

        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          9. Questions about this policy
        </h2>
        <p>
          Questions about how the site handles data, or a request concerning your information, can be sent through the{" "}
          <a href="/contact" className="text-blue-600 dark:text-blue-400 font-semibold underline">contact page</a> or to{" "}
          <span className="font-mono">info@globecareer.online</span>. This policy describes the current implementation of
          the site; when a feature changes how data is handled, this page is updated with it.
        </p>

        {/* Clear Data Control Button */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-bold text-neutral-900 dark:text-neutral-100 block">
                Manage Your Local Resume Data
              </span>
              <span className="text-[11px] text-neutral-500">
                You can permanently purge all stored draft resumes and preferences from this device at any time.
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearData}
              className="px-4 py-2 text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {cleared ? 'All Stored Data Cleared!' : 'Purge All Local Data'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
          Legal Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Last updated: October 2026.
        </p>
      </div>

      <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-5 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          1. Terms of Acceptance
        </h2>
        <p>
          By accessing or using GlobeCareer, you agree to comply with and be bound by these Terms of Service. If you disagree with any portion of these terms, please discontinue using the service.
        </p>

        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          2. Accuracy of Representation
        </h2>
        <p>
          GlobeCareer provides formatting templates, regulatory guidelines, and structural recommendations. Users are solely responsible for ensuring the truthfulness and accuracy of all employment histories, qualifications, degrees, licenses, and achievements entered into their documents. GlobeCareer strictly condemns fabricated resumes.
        </p>

        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          3. No Employment Guarantee
        </h2>
        <p>
          GlobeCareer does not warrant or guarantee that utilizing our templates, ATS optimizations, or country-specific recommendations will guarantee job interviews, employment offers, or specific recruitment outcomes.
        </p>

        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          4. Intellectual Property
        </h2>
        <p>
          You retain complete ownership of all personal content and text you create. GlobeCareer retains all rights to its application code, formatting algorithms, and design templates.
        </p>

        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          5. 100% Free Access & Usage Terms
        </h2>
        <p>
          GlobeCareer provides 100% free access to all core career tools: the Resume Builder, Cover Letter Builder, Recommendation Letter Builder, Job Application Email Generator, Interview Preparation Toolkit, and ATS Resume Checker. No subscriptions, credit cards, or payment credentials are required to generate, edit, or download documents in PDF or Microsoft Word DOCX formats.
        </p>

        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          6. Verified Job Opportunities & Anti-Scam Standards
        </h2>
        <p>
          Verified job listings in the GlobeCareer portal are audited against official employer career systems, direct ATS gateways, and verified corporate sources without placement fees or paywalls. GlobeCareer is not an employer, recruiter, or staffing firm, and cannot guarantee hiring decisions, interviews, or employment offers.
        </p>

        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          7. Responsible Tool Usage
        </h2>
        <p>
          Users agree to provide truthful, accurate career information when generating resumes, letters of recommendation, and application materials. Automated scraping or abusive bot submissions to third-party employer portals are strictly prohibited.
        </p>
      </div>
    </div>
  );
};

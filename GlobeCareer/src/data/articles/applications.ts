import type { Article } from './types';

/**
 * Applications and mobility cluster.
 *
 * Cover letters are Europass's highest-volume generic keyword in the export
 * (~320) and a natural sibling of the CV articles. The two mobility pieces
 * answer questions US-based readers ask when applying to Europe, which the
 * export shows Europass ranking for at low difficulty.
 */
export const APPLICATION_ARTICLES: Article[] = [
  {
    slug: 'cover-letter-for-european-cv',
    cluster: 'applications',
    h1: 'Cover Letter for a European CV: Structure, Tone and Real Openings',
    seoTitle: 'Cover Letter for a European CV: Structure and Examples',
    description:
      'When European employers expect a cover letter, what each paragraph should do, and original opening lines you can adapt instead of copying a template.',
    primaryKeyword: 'cover letter for european cv',
    keywords: ['european cover letter', 'cover letter europass', 'motivation letter europe', 'lettre de motivation'],
    intent: 'informational',
    published: '2026-11-20',
    updated: '2026-11-20',
    readingMinutes: 8,
    keyTakeaways: [
      'Germany, France and Austria commonly expect a letter; the UK, Ireland and the Netherlands often do not.',
      'Three or four short paragraphs beat one dense page.',
      'Open with the role and one concrete reason you fit, not with a statement about yourself.',
      'Never restate the CV. Add the reasoning the CV cannot carry.',
    ],
    intro: [
      'Whether a European application needs a cover letter depends entirely on where you are sending it. In Germany a Bewerbungsschreiben is a standard component of the application; in the UK it is often an optional box nobody opens.',
      'This guide covers where letters are expected, what each part should accomplish, and how to open one without sounding like every other applicant.',
    ],
    sections: [
      {
        id: 'where-expected',
        heading: 'Where a letter is expected',
        table: {
          caption: 'Cover letter expectations by market',
          headers: ['Market', 'Expected?', 'Notes'],
          rows: [
            ['Germany, Austria, Switzerland', 'Usually yes', 'Formal letter, one page, addressed to a named person where possible'],
            ['France', 'Usually yes', 'Lettre de motivation; formal register, structured paragraphs'],
            ['Belgium, Luxembourg', 'Often', 'Common in both French and Dutch-language processes'],
            ['Italy, Spain, Portugal', 'Sometimes', 'More common in smaller companies and public-sector applications'],
            ['Netherlands', 'Sometimes', 'A short motivation letter is common; brevity is valued'],
            ['United Kingdom, Ireland', 'Optional', 'Often a free-text box rather than a formal letter'],
            ['Nordics', 'Optional', 'Plain application and CV usually suffice; formality is low'],
          ],
        },
        callout: {
          title: 'When the system offers a box, use it',
          body: 'If the application form has a free-text field for a motivation statement, an empty box is a missed opportunity even in a market where letters are optional. Two short paragraphs are enough.',
          tone: 'tip',
        },
      },
      {
        id: 'structure',
        heading: 'The structure that works in every language',
        paragraphs: [
          'European cover letters are shorter and more formal than US ones. Four paragraphs, one page, no bullet lists, and no repetition of the CV.',
        ],
        steps: [
          'Opening (two sentences). Name the role and where you saw it, then give the single strongest reason you are a credible applicant. Skip the "I am writing to apply" formula where you can.',
          'Fit (three to four sentences). Take the two or three requirements that matter most in the advert and answer each with evidence — a specific project, a number, a comparable situation.',
          'Context (two to three sentences). Explain the thing the CV cannot: why this company, why this country, why now. If you are relocating, state your authorisation status plainly here.',
          'Close (two sentences). Say what you would like to happen next and thank the reader. No "I look forward to hearing from you at your earliest convenience".',
        ],
      },
      {
        id: 'openings',
        heading: 'Original openings you can adapt',
        paragraphs: [
          'The example lines below are written for this guide. Adapt the substance to your own history rather than pasting them — a letter that could have been sent by anyone is the most common reason letters are ignored.',
        ],
        bullets: [
          'Role-first: "You are looking for a logistics coordinator who can hold a 40-vehicle schedule together through peak season. I ran that schedule for a regional distributor in Valencia for three years."',
          'Evidence-first: "The ad asks for someone who has cut reporting time without losing accuracy. In my last role I took a 40-hour monthly close down to 11 hours by rebuilding the reconciliation in Power Query."',
          'Relocation-first: "I am a Portuguese national moving to Munich in March, so I need no permit and can start on the date in your advert."',
          'Problem-first: "Most warehouse teams lose a week every quarter to stock reconciliation. I built the process that removed that week at two sites."',
        ],
        callout: {
          title: 'The test to apply',
          body: 'Cover the company name and read the opening again. If it could be sent to a different employer without changing a word, it is not doing any work.',
          tone: 'info',
        },
      },
      {
        id: 'formality',
        heading: 'Formality, titles and language',
        bullets: [
          'Use the formal register of the language. German letters use "Sehr geehrte Frau Dr. Müller"; French use "Madame, Monsieur". Getting this wrong is the most visible error in a foreign-language letter.',
          'Address a named person whenever the advert gives one. "Dear Hiring Manager" is acceptable; "To whom it may concern" reads as mass mailing.',
          'Keep the letter to one page in every language. German letters can run slightly longer than French or Dutch ones.',
          'Have a native speaker check the letter. A letter is judged on language in a way that a CV is not, because it is the one place you are writing prose.',
          'Do not translate your letter mechanically. Idioms and connectives do not survive it, and the register collapses.',
        ],
      },
      {
        id: 'mistakes',
        heading: 'Mistakes that get letters discarded',
        bullets: [
          'Restating the CV in sentences. The letter should add reasoning, not repeat bullets.',
          'Opening with a self-description: "I am a highly motivated professional with excellent communication skills."',
          'Omitting work authorisation when relocating. It is the first question the reader has.',
          'Writing a page and a half. European readers expect one page.',
          'Using a generic salutation when the advert named the hiring manager.',
          'Making claims the CV cannot support. The two documents are read together.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do I need a cover letter for a Europass CV application?',
        a: 'Usually yes when the vacancy asks for one, and it is common in EU institution applications. Where the advert does not ask, attaching a short one-page letter rarely hurts and occasionally helps.',
      },
      {
        q: 'How long should a European cover letter be?',
        a: 'One page, typically 250 to 350 words in four short paragraphs. German letters can run slightly longer; Dutch and Nordic letters are usually shorter.',
      },
      {
        q: 'Should the cover letter be in the same language as the CV?',
        a: 'Yes. Send both documents in the same language unless the advert says otherwise. A mismatch suggests one of the two was machine-translated.',
      },
      {
        q: 'Can I reuse one letter for several applications?',
        a: 'Keep a master version with your strongest evidence, but rewrite the opening and the fit paragraph for each employer. Those two paragraphs are what a reader actually judges.',
      },
    ],
    related: ['european-cv-template', 'europass-cv-format-explained', 'job-in-switzerland'],
    cta: {
      heading: 'Draft the letter next to the CV',
      body: 'GlobeCareer\'s cover letter builder generates a structured one-page letter that pulls the role, company and your key evidence from the same profile, so the two documents always agree.',
      label: 'Open the cover letter builder',
      page: 'cover-letter',
    },
  },

  {
    slug: 'job-in-switzerland',
    cluster: 'applications',
    h1: 'How to Get a Job in Switzerland as a Foreign Applicant',
    seoTitle: 'Getting a Job in Switzerland: Permits, CV Rules and Realistic Steps',
    description:
      'The Swiss permit categories, why EU and non-EU applicants face different routes, what a Swiss CV looks like, and the practical order to do things in.',
    primaryKeyword: 'how to get a job in switzerland',
    keywords: ['job in switzerland', 'swiss work permit', 'switzerland cv format', 'working in switzerland'],
    intent: 'informational',
    published: '2026-11-20',
    updated: '2026-11-20',
    readingMinutes: 9,
    keyTakeaways: [
      'EU/EFTA citizens have free access to the labour market; non-EU nationals face quotas and a labour-market test.',
      'Swiss CVs are detailed and often include a photo, date of birth and permit status.',
      'Language requirements follow the region: German, French or Italian.',
      'Applying without addressing permit status is the most common avoidable failure.',
    ],
    intro: [
      'Switzerland is one of the most competitive job markets in Europe, and the rules that govern who may take a job there are stricter than in the surrounding EU. The difference between an application that gets a reply and one that disappears is usually not the CV design — it is whether the employer can see, immediately, that hiring you is legally simple.',
      'This guide covers the permit landscape, the Swiss CV conventions, and a realistic order of operations.',
    ],
    sections: [
      {
        id: 'permits',
        heading: 'The permit landscape',
        paragraphs: [
          'Switzerland is not in the EU, but it has a bilateral agreement with it. That single fact determines almost everything about your route.',
        ],
        table: {
          caption: 'Main Swiss permit categories',
          headers: ['Permit', 'Who it is for', 'Notes'],
          rows: [
            ['L', 'Short-term residents', 'Fixed duration, typically up to one year; for project and seasonal work'],
            ['B', 'Residence permit', 'Longer-term; for employed residents and for EU/EFTA job seekers who have a contract'],
            ['C', 'Settlement permit', 'Permanent residence, normally after a sustained period of residence'],
            ['G', 'Cross-border commuter', 'For residents of a neighbouring country who work in Switzerland and return regularly'],
          ],
        },
        bullets: [
          'EU/EFTA citizens: free movement applies. With a job offer you register and receive a permit as a formality, so the employer faces little administrative burden.',
          'Non-EU/EFTA nationals: admission is quota-limited and subject to a labour-market test, meaning the employer must generally show that no equally qualified candidate from Switzerland or the EU/EFTA area was found.',
          'Highly qualified specialists, managers and researchers have clearer routes than general applicants, but "highly qualified" is assessed against the role, not against your ambition.',
        ],
        callout: {
          title: 'Say your status in the first three lines',
          body: '"EU citizen — permit on registration, no quota applies" is the most valuable sentence an EU applicant can write to a Swiss employer. For non-EU applicants, state the permit you hold or that you would need sponsorship. Concealing it wastes everyone\'s time.',
          tone: 'warning',
        },
      },
      {
        id: 'cv',
        heading: 'What a Swiss CV looks like',
        paragraphs: [
          'Swiss CVs are more detailed than UK or US resumes and closer to the German tradition. Personal data that would be removed elsewhere is normal here.',
        ],
        bullets: [
          'A professional photograph is commonly included.',
          'Date of birth and nationality are frequently stated, and permit status is often noted explicitly.',
          'Education and vocational training carry real weight; the Swiss system values apprenticeships and formal credentials highly.',
          'Languages are a first-class section, with levels, because regional language ability determines whether you can work in a given office.',
          'References or a note that they are available are expected; Swiss employers do contact them.',
          'Two pages is normal; three is acceptable for senior profiles.',
        ],
      },
      {
        id: 'language',
        heading: 'Language follows the region, not the country',
        paragraphs: [
          'Switzerland has four national languages and the working language changes within an hour\'s drive. German-speaking Zurich and Zug operate in German (often Swiss German in speech, standard German in writing); Geneva and Lausanne operate in French; Ticino operates in Italian.',
          'Applying in English to a German-speaking SME is usually a wasted application, even when the role is technical. Applying in English to the Swiss subsidiary of a multinational, or to a research institution, is often fine. Read the advert\'s language as the signal.',
        ],
      },
      {
        id: 'steps',
        heading: 'A realistic order of operations',
        steps: [
          'Decide the region first, and with it the working language. This determines your CV language, your letter language and your interview preparation.',
          'Assess your permit route honestly before applying. If you are a non-EU national without an in-demand specialism, plan for a longer search or a different entry route.',
          'Build a Swiss-format CV: two pages, A4, photo and personal details included where the convention expects them, languages with levels.',
          'Write a one-page letter in the local language, addressed to a named person, stating permit status in the opening paragraph.',
          'Target employers directly rather than only job boards. A large share of Swiss vacancies are filled through direct applications and referrals.',
          'Prepare for a formal, structured interview process. Decisions are evidence-based and references are taken seriously.',
          'Register with the commune once you have a contract; the permit paperwork follows the employment, not the other way around for EU/EFTA citizens.',
        ],
      },
      {
        id: 'mistakes',
        heading: 'Common reasons applications fail',
        bullets: [
          'Not stating permit status, leaving the employer to assume the worst.',
          'Sending a one-page US-style resume with no photo and no personal details to a traditional Swiss employer.',
          'Applying in English to a German-speaking SME.',
          'Understating vocational qualifications because they are not degrees. Swiss readers value them.',
          'Ignoring the reference system. Referees who cannot be reached cost offers.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can a non-EU citizen get a job in Switzerland?',
        a: 'Yes, but admission is quota-limited and subject to a labour-market test, so employers must generally show they could not fill the role from Switzerland or the EU/EFTA area. Specialists in shortage occupations, senior managers and researchers have the clearest routes.',
      },
      {
        q: 'Do I need a job offer before applying for a permit?',
        a: 'For employment-based permits the job offer comes first; the employer is involved in the application. You cannot generally obtain a work permit before securing a role.',
      },
      {
        q: 'Is English enough to work in Switzerland?',
        a: 'In multinationals, research institutions and some tech companies, often yes. In most SMEs and in public-facing roles, the regional language is required. Treat the language of the job advert as the answer.',
      },
      {
        q: 'Should my Swiss CV include a photo?',
        a: 'Commonly yes. Switzerland follows the German-speaking convention here, and a professional headshot is standard rather than unusual.',
      },
    ],
    related: ['european-cv-template', 'cv-photo-europe', 'eu-work-visa-us-citizens'],
    cta: {
      heading: 'Build a Swiss-format CV',
      body: 'Select Switzerland in GlobeCareer and the builder applies A4 paper, the Swiss two-page convention and the photo default, then exports a clean PDF with a languages block that reads correctly to a Swiss recruiter.',
      label: 'Start your Swiss CV',
      page: 'builder',
    },
  },

  {
    slug: 'eu-work-visa-us-citizens',
    cluster: 'applications',
    h1: 'Working in the EU as a US Citizen: Visas, CVs and Realistic Expectations',
    seoTitle: 'Working in the EU as a US Citizen: Routes, Permits and CV Changes',
    description:
      'There is no EU-wide work visa. Here are the real routes for US citizens — the EU Blue Card, national permits, transfers and study — plus the CV changes Europe expects.',
    primaryKeyword: 'eu work visa for us citizens',
    keywords: ['working in europe as an american', 'eu blue card', 'europe jobs for americans', 'us citizen work permit europe'],
    intent: 'informational',
    published: '2026-11-20',
    updated: '2026-11-20',
    readingMinutes: 9,
    keyTakeaways: [
      'Each EU country issues its own work permit; there is no single EU work visa.',
      'The EU Blue Card is the main route for highly qualified non-EU professionals.',
      'Most routes require a job offer first, so the search and the permit are one process.',
      'European employers expect a longer CV with languages, permit status and often a photo.',
    ],
    intro: [
      'The most common misconception about working in Europe is that a single application grants access to the whole continent. It does not. Immigration for work is national: a German permit does not authorise employment in France, and each country sets its own rules, quotas and processing times.',
      'This guide sets out the routes that actually exist for US citizens, in the order most people encounter them, and the CV changes that make a European application credible.',
    ],
    sections: [
      {
        id: 'no-eu-visa',
        heading: 'There is no EU work visa',
        paragraphs: [
          'The EU sets common frameworks and minimum standards, but the permit itself is issued by a member state. What the EU does provide is coordination: the Blue Card scheme for highly qualified workers, rules on intra-corporate transfers, and the principle that a permit obtained in one country does not automatically work in another.',
          'Practically, this means your job search is a search in one country. Choosing "Europe" as a target is the first thing to fix: pick a country, learn its permit rules, and apply there.',
        ],
      },
      {
        id: 'routes',
        heading: 'The routes that exist for US citizens',
        table: {
          caption: 'Main routes to employment in the EU',
          headers: ['Route', 'Who it suits', 'Key characteristic'],
          rows: [
            ['EU Blue Card', 'Highly qualified professionals with a degree or equivalent experience and a salary above the national threshold', 'Fast-tracked, family reunification included, mobility between member states after a qualifying period'],
            ['National skilled-worker permit', 'Professionals in shortage occupations', 'Country-specific lists of eligible roles; often faster than the general route'],
            ['Intra-corporate transfer', 'Employees of a multinational moving to an EU affiliate', 'Employer-led; requires prior employment with the group'],
            ['Study then work', 'People willing to obtain a European qualification first', 'Student residence permits usually include limited work rights and a post-study job-search period'],
            ['Self-employment or freelance', 'Consultants and founders', 'Separate national routes, often with capital and business-plan requirements'],
          ],
        },
        callout: {
          title: 'The salary threshold is the real filter',
          body: 'Blue Card eligibility depends on a salary above a national threshold that is updated annually and differs by country. A role that qualifies in one member state may not qualify in another. Check the current threshold for the specific country before building a plan around it.',
          tone: 'warning',
        },
      },
      {
        id: 'order',
        heading: 'The order of operations',
        steps: [
          'Pick one country. Use language, sector demand and permit practicality, not climate.',
          'Check whether your occupation appears on that country\'s shortage list. If it does, your route is materially easier.',
          'Apply for roles that meet the salary threshold for the relevant permit. A great job below the threshold cannot be sponsored.',
          'State your situation in the application: US citizen, will require sponsorship, available from a stated date. Hiding it only costs time.',
          'Once you have an offer, the employer initiates the permit application. The permit follows the contract.',
          'Prepare for recognition procedures if your profession is regulated — medicine, law, engineering, teaching and accounting commonly are.',
        ],
      },
      {
        id: 'cv',
        heading: 'The CV changes Europe expects',
        paragraphs: [
          'A US resume sent to a European employer is one of the most reliable ways to get no reply. The differences below are the ones that matter most for a cross-border application.',
        ],
        bullets: [
          'Two pages, A4. One page reads as thin outside the US.',
          'Remove the photo, date of birth, marital status and full street address from your US version — but be aware that some European markets (Germany, Austria, Spain, Switzerland) expect a photo if you are adapting to them.',
          'Add a languages section with CEFR levels. Being a native English speaker is a genuine asset and should be stated as C1/C2 on the scale.',
          'Add your permit situation in one line under the contact block.',
          'Name the country against each employer. A European reader will not know where your previous companies were.',
          'Gloss your degree with its level. An American bachelor is broadly comparable to EQF level 6, but say "comparable to" rather than asserting an official placement.',
          'Reframe achievements with European context: revenue in euros, headcount, and the regulatory environment you worked in.',
        ],
      },
      {
        id: 'expectations',
        heading: 'Realistic expectations',
        bullets: [
          'Sponsorship is uncommon for early-career roles. Employers sponsor when the skill is scarce, not when the candidate is enthusiastic.',
          'Language ability is usually decisive outside multinationals and tech. "Everyone speaks English" is true in Amsterdam boardrooms and false in most SMEs.',
          'Timelines are long. Permit processing alone can take weeks to several months after an offer.',
          'A local address and a local phone number materially improve reply rates, even when you are still abroad.',
          'Volunteering, studying or interning in the target country first is a common and effective route to a sponsored role.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can a US citizen just move to the EU and look for work?',
        a: 'Not for employment. Visa-free travel is for short visits, not work or job search. Most member states require you to secure a job offer and a permit before you can take up employment, though some offer specific job-seeker visas for qualified applicants — check the individual country.',
      },
      {
        q: 'What salary do I need for an EU Blue Card?',
        a: 'It depends on the member state. Each country sets its own annual threshold, and some apply a lower threshold to shortage occupations and to recent graduates. Check the current figure for your target country before applying.',
      },
      {
        q: 'Does a Blue Card let me work anywhere in the EU?',
        a: 'Not immediately. It is issued by one member state, and moving to another requires a further application under mobility rules after a qualifying period of residence. It is not a portable EU-wide permit.',
      },
      {
        q: 'Do I need to translate my documents?',
        a: 'Usually for the permit application, and often into the language of the member state, sometimes with a certified translation. For the initial job application, English is normally accepted.',
      },
    ],
    related: ['eu-cv-format-vs-us-resume', 'eqf-levels-explained', 'job-in-switzerland'],
    cta: {
      heading: 'Produce the European version of your resume',
      body: 'GlobeCareer converts a US-style profile into an A4, two-page European CV with CEFR language levels, a permit-status line and the right photo default for your target country.',
      label: 'Build your European CV',
      page: 'builder',
    },
  },
];

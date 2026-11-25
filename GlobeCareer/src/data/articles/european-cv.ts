import type { Article } from './types';

/**
 * European CV cluster.
 *
 * These are the keywords Europass ranks for with generic (non-brand)
 * informational intent: European CV templates, the Europass format itself, the
 * EU-vs-US comparison, the Italian "curriculum vitae europeo" and CV photo
 * conventions. Each article targets a distinct intent so none competes with
 * another or with the existing /european-cv-format landing page.
 */
export const EUROPEAN_CV_ARTICLES: Article[] = [
  {
    slug: 'europass-cv-format-explained',
    cluster: 'european-cv',
    h1: 'The Europass CV Format Explained, and How to Build an Equivalent One',
    seoTitle: 'Europass CV Format Explained: Structure, Sections and Alternatives',
    description:
      'How the Europass CV is organised section by section, when European employers actually expect it, and how to produce an equivalent CV in a normal template.',
    primaryKeyword: 'europass cv format',
    keywords: ['europass cv', 'europass template', 'europass cv structure', 'european cv format'],
    intent: 'informational',
    published: '2026-11-20',
    updated: '2026-11-20',
    readingMinutes: 9,
    keyTakeaways: [
      'Europass is an EU initiative that publishes a standard CV structure; the format is not mandatory for most jobs.',
      'The layout is a chronological, section-labelled CV that puts languages and digital skills on the page explicitly.',
      'Any clean reverse-chronological CV that covers the same sections is functionally equivalent.',
      'Genuine Europass documents are free. Paid sites charging for them are not the official service.',
    ],
    intro: [
      'Search for help with a European CV and Europass comes up first, usually with a screenshot of a very recognisable grey-and-blue layout. What that search rarely explains is whether you are supposed to use that exact document, who actually requires it, and what to do if you would rather use your own template.',
      'This guide is an independent explanation. It walks through how the Europass CV is structured, where it is genuinely expected, and how to build a CV that satisfies the same expectations without copying anyone\'s design. GlobeCareer is not affiliated with Europass or the European Commission.',
    ],
    sections: [
      {
        id: 'what-europass-is',
        heading: 'What Europass is, precisely',
        paragraphs: [
          'Europass is a European Union initiative that provides a set of standard documents and, since its 2020 relaunch, an online platform with a CV editor. The CV is the best-known part of it, but the family also includes a language passport, certificate supplements for vocational qualifications and a mobility document for study or work placements abroad.',
          'The important word is standard, not official. Europass gives European qualifications, languages and mobility a shared vocabulary. It does not certify your experience, it does not rank you, and holding a Europass-formatted CV does not make an application stronger than an equally clear CV in another layout.',
        ],
        callout: {
          title: 'Not affiliated',
          body: 'GlobeCareer is an independent tool. This page explains a public format for the benefit of job seekers and is not published, endorsed or reviewed by Europass or the European Commission.',
          tone: 'info',
        },
      },
      {
        id: 'structure',
        heading: 'How the format is organised',
        paragraphs: [
          'The Europass CV is a reverse-chronological CV with fixed section labels. The labels are the point: a recruiter in another country can find languages or digital skills in a predictable place, which is why the format travels well.',
        ],
        table: {
          caption: 'The sections of a Europass-style CV, in order',
          headers: ['Section', 'What goes in it', 'Notes'],
          rows: [
            ['Personal information', 'Name, contact details, address, nationality, date of birth', 'Optional fields: include only where the local market expects them'],
            ['Work experience', 'Dates, role, employer, city, responsibilities and results', 'Most recent first'],
            ['Education and training', 'Dates, qualification, institution, city', 'Include the level where it aids comparison'],
            ['Language skills', 'Each language with a self-assessed CEFR level (A1 to C2)', 'The five-skill breakdown is optional; one overall level is usually enough'],
            ['Digital skills', 'Tools and systems with a stated level of competence', 'Name the tools; "IT literate" tells a reader nothing'],
            ['Other skills', 'Driving licence, memberships, volunteering, interests', 'Keep it short and relevant'],
            ['Additional information', 'Publications, projects, references, attachments', 'Use for anything that does not fit above'],
          ],
        },
        paragraphsAfter: [
          'Two details do most of the work in this layout. The first is that languages are a first-class section rather than an afterthought at the bottom. The second is that every entry is dated, which makes career gaps visible by design. That visibility is deliberate: the format was built for transparency across borders, not for hiding a non-linear path.',
        ],
      },
      {
        id: 'who-requires-it',
        heading: 'Who actually requires a Europass CV',
        paragraphs: [
          'In practice, very few private employers ask for the exact document. The format is most often requested by public-sector bodies, EU institutions and agencies, some universities and a number of mobility programmes and traineeships that need a comparable application across many countries.',
        ],
        bullets: [
          'EU institutions, agencies and many EU-funded programmes: commonly requested, and worth using exactly as specified.',
          'Public administrations in some member states: sometimes requested for open competitions.',
          'Private employers in most sectors: almost never specify the document, but do expect the same information.',
          'Recruiters and staffing agencies: rarely care about the layout, always care that languages and work authorisation are stated clearly.',
        ],
        callout: {
          title: 'Read the advert, not the internet',
          body: 'If a vacancy says "Europass CV required", use it. If it says "CV in English, two pages maximum", a Europass document that runs to four pages is the wrong answer.',
          tone: 'tip',
        },
      },
      {
        id: 'equivalent',
        heading: 'Building an equivalent CV in your own template',
        paragraphs: [
          'You do not need the official editor to produce a CV that meets the same expectations. What matters is that the information is present, labelled clearly and easy to scan.',
        ],
        steps: [
          'Use a reverse-chronological structure with dated entries. Recruiters across Europe expect the most recent role first.',
          'Give languages their own block with CEFR levels. "Fluent" means different things to different readers; B2 does not.',
          'List digital tools by name with a short competence note, rather than a percentage bar or a star rating.',
          'State your work authorisation or permit status when applying across a border. It is the first thing an international recruiter checks.',
          'Keep the layout single-column with real text rather than tables and text boxes, so applicant tracking systems can read it.',
          'Set the page to A4 unless you are applying to the US or Canada, where Letter is the norm.',
        ],
        paragraphsAfter: [
          'A single-column, A4, reverse-chronological CV with an explicit languages section will pass every check that a Europass document passes, and usually reads better because it is not constrained by a decades-old grid.',
        ],
      },
      {
        id: 'mistakes',
        heading: 'Common mistakes when adapting to the European market',
        bullets: [
          'Padding the personal information block. Date of birth, marital status and a photograph are optional at best and counterproductive in the UK, Ireland and the Netherlands.',
          'Translating your job titles into something grander than the original. Keep the official title and gloss it in the description.',
          'Using adjective-heavy self-assessment for languages instead of a CEFR level.',
          'Leaving out the country of each employer. In a cross-border application, "Berlin" and "Berlin, Germany" are not the same signal.',
          'Paying a third-party site for a "certified Europass CV". The official service does not charge for the basic document.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a Europass CV mandatory in Europe?',
        a: 'No. It is a standardised format, not a legal requirement. Some EU institutions and public programmes ask for it specifically; most private employers simply expect the same information in any clear layout.',
      },
      {
        q: 'Is Europass free?',
        a: 'The official Europass service and its CV editor are provided free of charge by the European Union. Sites that charge for a "Europass CV" are independent businesses, not the official service.',
      },
      {
        q: 'Can I use a Europass CV for a job in the United States?',
        a: 'You can, but you should not. US employers expect a one-page resume with no photo, no date of birth and no nationality, on Letter paper. Sending the European document signals that you have not adapted to the market.',
      },
      {
        q: 'Does the format hurt my chances with applicant tracking systems?',
        a: 'The official editor produces a reasonably parseable document, but PDFs generated by any online editor can lose structure. A plain single-column layout with real headings is the safer choice for large employers that screen automatically.',
      },
    ],
    related: ['european-cv-template', 'eu-cv-format-vs-us-resume', 'cv-photo-europe'],
    cta: {
      heading: 'Build the equivalent, without the grid',
      body: 'GlobeCareer gives you a single-column A4 CV with dedicated language (CEFR) and digital-skills blocks, country-aware photo rules and vector PDF export, so the information a European recruiter looks for is always in the expected place.',
      label: 'Create a European CV',
      page: 'builder',
    },
  },

  {
    slug: 'european-cv-template',
    cluster: 'european-cv',
    h1: 'European CV Template: Every Section, in the Order Recruiters Read Them',
    seoTitle: 'European CV Template: Section Order, Length and Format Rules',
    description:
      'A section-by-section European CV template: what to put in each block, how long it should be, A4 setup, and the details EU recruiters check first.',
    primaryKeyword: 'european cv template',
    keywords: ['eu cv template', 'cv template european', 'european resume template', 'cv european style', 'european cv format'],
    intent: 'informational',
    published: '2026-11-20',
    updated: '2026-11-20',
    readingMinutes: 9,
    keyTakeaways: [
      'Two pages is the working norm in most of continental Europe; one page is a US habit.',
      'A4 paper, single column, reverse chronological, with a dated entry for every role.',
      'Languages with CEFR levels belong in their own section, not in a skills list.',
      'Work authorisation is the first fact an international recruiter looks for.',
    ],
    intro: [
      'A European CV is less a document style than a set of reader expectations. Recruiters across the continent have spent decades reading reverse-chronological, dated, section-labelled CVs, and they scan for the same handful of facts in the same order every time.',
      'This template walks through that order. Adapt the wording to your own history; keep the structure, because the structure is what makes the document fast to read.',
    ],
    sections: [
      {
        id: 'page-setup',
        heading: 'Page setup before you write a word',
        bullets: [
          'A4 paper (210 × 297 mm). US Letter is the wrong size for a European application and will print with uneven margins.',
          'Margins of roughly 1.5 to 2 cm. Enough white space that the page does not look like a form.',
          'One column of text. Tables, text boxes and sidebars break automated parsing and make the reading order ambiguous.',
          'A single professional typeface at 10 to 11.5 points. No decorative fonts, no coloured backgrounds behind body text.',
          'A date of birth is optional. A photograph is country-dependent, and actively discouraged in the UK, Ireland and the Netherlands.',
        ],
      },
      {
        id: 'section-order',
        heading: 'The section order that works',
        paragraphs: [
          'The order below is the one that survives contact with real recruiters in most European markets. Move education above experience only if you graduated within the last year or two and have no substantial work history.',
        ],
        table: {
          caption: 'European CV sections in reading order',
          headers: ['Order', 'Section', 'Length', 'What the recruiter is checking'],
          rows: [
            ['1', 'Header and contact', '3-4 lines', 'Can I reach this person, and where are they based?'],
            ['2', 'Profile', '2-4 sentences', 'Does this person match the role in one glance?'],
            ['3', 'Work experience', 'Half to two-thirds of the page count', 'Have they done this job, at what level, for how long?'],
            ['4', 'Education and training', '3-6 lines', 'Is the qualification at the level the role requires?'],
            ['5', 'Languages', '1-3 lines', 'Can they work in the language of the office?'],
            ['6', 'Digital and technical skills', '3-6 lines', 'Can they use the tools the team uses?'],
            ['7', 'Certifications and additional training', '0-4 lines', 'Any regulated or role-specific credential?'],
            ['8', 'Additional information', '0-3 lines', 'Driving licence, mobility, volunteering — only if relevant'],
          ],
        },
      },
      {
        id: 'header',
        heading: 'Header and contact block',
        paragraphs: [
          'Your name, a professional title that matches the job you are applying for, and contact details a recruiter can use without effort. Include city and country — in a cross-border application, the country is information, not decoration.',
        ],
        bullets: [
          'Include: name, target job title, email, phone with international prefix, city and country, LinkedIn or portfolio if genuinely relevant.',
          'Include if applicable: work authorisation or permit status, in one short line.',
          'Leave out: full street address, multiple phone numbers, a second email address, and any ID number.',
        ],
        callout: {
          title: 'One line that changes the conversation',
          body: '"EU citizen — no permit required" or "Requires sponsorship" placed under the contact block saves everyone a screening call. Hiding it does not improve your chances; it just delays the question.',
          tone: 'tip',
        },
      },
      {
        id: 'profile',
        heading: 'Profile: four sentences maximum',
        paragraphs: [
          'The profile answers one question: why this person, for this role. Write it last, when you already know which achievements you are leading with. Name the role, the years and domain of experience, one concrete strength with evidence, and what you are moving toward.',
          'Avoid the standard opening — "motivated professional with excellent communication skills seeking a challenging opportunity". It could belong to anyone, which is exactly the problem.',
        ],
      },
      {
        id: 'experience',
        heading: 'Work experience: dates, scope, results',
        paragraphs: [
          'Each entry needs four things: dates (month and year), job title, employer with city and country, and three to five lines of substance. Put the most recent first and keep the formatting identical across entries.',
        ],
        bullets: [
          'Lead each bullet with a verb and include a number wherever one exists: volume, budget, headcount, percentage, timeframe.',
          'State the scope explicitly — team size, region, revenue — because job titles mean different things in different countries.',
          'Explain a gap plainly in one line if it is longer than a few months, rather than stretching dates. European readers are used to seeing them and resent inference.',
          'Keep the official job title. If it was internal jargon, gloss it in brackets.',
        ],
      },
      {
        id: 'languages',
        heading: 'Languages: why CEFR beats adjectives',
        paragraphs: [
          'Europe has a shared six-level language scale, the Common European Framework of Reference: A1 and A2 (basic), B1 and B2 (independent), C1 and C2 (proficient). Using it removes the ambiguity of "fluent", which one candidate uses for C1 and another for B2.',
        ],
        table: {
          caption: 'What each CEFR level claims',
          headers: ['Level', 'Working description', 'Typical claim'],
          rows: [
            ['C2', 'Understands virtually everything; expresses precisely in complex situations', 'Near-native or native'],
            ['C1', 'Fluent and flexible; produces well-structured detailed text', 'Full professional proficiency'],
            ['B2', 'Interacts fluently; writes clear detailed text on most subjects', 'Professional working proficiency'],
            ['B1', 'Handles most everyday and travel situations; describes experience', 'Limited working proficiency'],
            ['A2', 'Simple routine exchanges on familiar topics', 'Basic'],
            ['A1', 'Familiar everyday expressions and very basic phrases', 'Beginner'],
          ],
        },
        paragraphsAfter: [
          'Do not list every language you have ever touched. List the ones you would accept a meeting in, with an honest level, and add the certificate if you have one (DELF, Goethe-Zertifikat, DELE, IELTS and similar).',
        ],
      },
      {
        id: 'skills',
        heading: 'Digital and technical skills',
        paragraphs: [
          'Name the tools. "Advanced Excel (pivot tables, Power Query)" is information; a five-dot rating is decoration. Group them if the list is long: analysis, design, project management, programming languages.',
          'Do not describe yourself as "IT literate". Every reader assumes baseline competence and none of them counts it as a skill.',
        ],
      },
      {
        id: 'mistakes',
        heading: 'Mistakes that cost European applications',
        bullets: [
          'Three or four pages of unedited history. Two pages is the working norm; three is the ceiling for senior academic or executive profiles.',
          'A photo on an application to the UK, Ireland or the Netherlands, where anti-discrimination practice keeps it off the page.',
          'No country named against employers. Cross-border readers cannot place a company from its name alone.',
          'Language claims without a level, or inflated levels that collapse at the first interview.',
          'Decorative sidebars and skill charts that an applicant tracking system reads as noise.',
          'A US Letter page sent to a European employer, which prints with a clipped margin.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How long should a European CV be?',
        a: 'Two pages is the norm in most of continental Europe. One page is acceptable for a recent graduate with limited experience; three pages is acceptable for senior, academic or executive profiles with a long publication or project record.',
      },
      {
        q: 'Should a European CV include a photo?',
        a: 'It depends on the country. Photos are customary in Germany, Austria, Spain and parts of Italy and Switzerland, and discouraged or actively avoided in the UK, Ireland and the Netherlands. Never include one for a US employer.',
      },
      {
        q: 'Should I include my date of birth and nationality?',
        a: 'Both are optional and increasingly omitted. Nationality or permit status is worth stating when applying across a border because it answers a screening question. Date of birth adds nothing and creates discrimination risk in several markets.',
      },
      {
        q: 'Does a European CV need references?',
        a: 'No. Provide referees when asked. Writing "references available on request" at the bottom is harmless but adds no information.',
      },
      {
        q: 'Should I write the CV in English or the local language?',
        a: 'For a role that requires the local language, write in the local language and have a native speaker check it. For international companies, English is usually accepted. When in doubt, ask the recruiter — a two-line email is cheaper than a rejected application.',
      },
    ],
    related: ['europass-cv-format-explained', 'eu-cv-format-vs-us-resume', 'eqf-levels-explained'],
    cta: {
      heading: 'Start from a template that already gets this right',
      body: 'GlobeCareer\'s builder sets A4 by default, keeps a single readable column, gives languages and digital skills their own blocks with CEFR levels, and applies the photo rule for your target country automatically.',
      label: 'Open the CV builder',
      page: 'builder',
    },
  },

  {
    slug: 'eu-cv-format-vs-us-resume',
    cluster: 'european-cv',
    h1: 'EU CV Format vs a US Resume: What Actually Changes',
    seoTitle: 'EU CV vs US Resume: The Real Differences That Matter',
    description:
      'A side-by-side comparison of the European CV and the US resume — length, photo, personal data, education, languages, paper size — and what to change before applying.',
    primaryKeyword: 'eu cv format',
    keywords: ['european union cv format', 'eu resume format', 'eu resume', 'european resume', 'us resume vs european cv'],
    intent: 'informational',
    published: '2026-11-20',
    updated: '2026-11-20',
    readingMinutes: 8,
    keyTakeaways: [
      'The US resume is a one-page marketing document; the European CV is a two-page record.',
      'Personal data that is normal in parts of Europe is a liability in the US, and the reverse is also true.',
      'US applications rarely ask for languages or work authorisation; European ones usually expect both.',
      'Converting is mostly subtraction on one side and addition on the other — not translation.',
    ],
    intro: [
      'The words CV and resume are often used interchangeably, but the documents built for the European and US markets have drifted apart for decades. Sending one where the other is expected is one of the most common reasons a strong candidate gets no reply.',
      'Here is what actually differs, and the specific edits to make when moving from one market to the other.',
    ],
    sections: [
      {
        id: 'side-by-side',
        heading: 'Side by side',
        table: {
          caption: 'European CV compared with a US resume',
          headers: ['Element', 'European CV', 'US resume'],
          rows: [
            ['Length', 'Two pages standard; three for senior profiles', 'One page strongly preferred; two for long careers'],
            ['Paper size', 'A4 (210 × 297 mm)', 'US Letter (8.5 × 11 in)'],
            ['Photograph', 'Customary in DE, AT, ES, CH; avoided in UK, IE, NL', 'Never included'],
            ['Date of birth', 'Optional, still common in some markets', 'Never included'],
            ['Nationality / permit', 'Often stated when applying across borders', 'Not stated; work authorisation discussed later'],
            ['Marital status', 'Optional; declining', 'Never included'],
            ['Education placement', 'Before experience for recent graduates', 'After experience, or omitted once established'],
            ['Languages', 'Dedicated section with CEFR levels', 'Usually omitted unless the role requires it'],
            ['Grades and coursework', 'Frequently included for early-career candidates', 'Rarely included'],
            ['References', 'Provided on request', 'Provided on request; "references available" is common'],
            ['Tone', 'Factual, understated, dated record', 'Achievement-led, quantified, self-promotional'],
            ['Gap explanation', 'Stated briefly and honestly', 'Usually framed as a period of skill-building'],
          ],
        },
      },
      {
        id: 'the-real-difference',
        heading: 'The real difference is purpose, not layout',
        paragraphs: [
          'A US resume is a persuasion document. It is written to make a case in six seconds, and every line is shaped toward impact: numbers, scope, results. The European CV is closer to a record. It is expected to be complete, dated and verifiable, and it is read as evidence of a career rather than as an argument for hiring someone.',
          'That difference explains most of the surface rules. Length follows from completeness. Dates follow from verifiability. The absence of a photo in the US follows from anti-discrimination practice in hiring. Once you know which document you are writing, the individual choices stop being arbitrary.',
        ],
        callout: {
          title: 'The conversion in one sentence',
          body: 'Going to the US: subtract personal data, compress to one page, lead every bullet with a number. Going to Europe: add the languages, state the permit status, and let the record be complete.',
          tone: 'tip',
        },
      },
      {
        id: 'to-europe',
        heading: 'Moving from a US resume to a European CV',
        steps: [
          'Switch the page size to A4. This is not cosmetic; Letter pages print with a clipped margin across most of Europe.',
          'Allow yourself two pages. Cutting a relevant role to fit one page is a US constraint, not a European one.',
          'Add a languages section with CEFR levels. This is the single most commonly missing element in US-origin applications.',
          'Add your work authorisation or citizenship status in one line. European recruiters screen on it early.',
          'Reformat to a single column with clear section headings. Multi-column US resume designs parse badly in European systems too.',
          'Add employer cities and countries. A European reader may not recognise your company.',
          'Remove any photo, date of birth or marital status if you had included them.',
        ],
      },
      {
        id: 'to-us',
        heading: 'Moving from a European CV to a US resume',
        steps: [
          'Cut to one page. Keep the most recent ten to fifteen years and summarise the rest.',
          'Remove the photo, date of birth, nationality, marital status and full street address.',
          'Convert dates to a consistent month/year format and drop anything that reads as a personal record.',
          'Rewrite responsibilities as achievements with numbers. European CVs describe scope; US resumes assert impact.',
          'Move education below experience unless you graduated recently.',
          'Keep a short languages line only if the role needs it; otherwise drop the section.',
          'Set the page to Letter.',
        ],
      },
      {
        id: 'ats',
        heading: 'Both systems care about automated screening',
        paragraphs: [
          'Applicant tracking systems are used heavily in both markets, but European employers also review CVs manually far more often, especially in smaller companies and in Germany, where the CV is read closely. That means a European CV can afford slightly more detail, but never a layout that a parser cannot follow.',
        ],
        bullets: [
          'Use real text, not text inside images.',
          'Keep headings conventional: Work Experience, Education, Languages, Skills.',
          'Avoid tables that split a single entry across cells.',
          'Submit PDF unless the posting explicitly asks for Word. If a portal warns about parsing, send DOCX.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a CV the same as a resume in Europe?',
        a: 'In most of Europe the two words mean the same document. In the US, a CV specifically means an academic document with publications and no page limit, while a resume is the one-page hiring document.',
      },
      {
        q: 'Can I use one CV for both markets?',
        a: 'Not well. Keep two masters: a two-page A4 European CV and a one-page Letter US resume. Maintaining both takes an hour and prevents the most common cross-border rejection.',
      },
      {
        q: 'Do European employers expect a photo?',
        a: 'Only in some countries. Germany, Austria, Spain and Switzerland commonly see one; the UK, Ireland and the Netherlands generally do not. When unsure, leaving it out is the safer choice.',
      },
      {
        q: 'Should I translate my degree title?',
        a: 'Keep the official title and add a plain-language gloss or the EQF level in brackets. Inventing an English equivalent that sounds grander than the original is a common and damaging habit.',
      },
    ],
    related: ['european-cv-template', 'eqf-levels-explained', 'cv-photo-europe'],
    cta: {
      heading: 'One profile, two formats',
      body: 'GlobeCareer switches page size, photo rules and section order based on the country you target, so the same history can be presented as a European CV or a US resume without rebuilding it.',
      label: 'Build both versions',
      page: 'builder',
    },
  },

  {
    slug: 'italian-cv-format',
    cluster: 'european-cv',
    h1: 'Italian CV Format (Curriculum Vitae Europeo): A Practical Guide',
    seoTitle: 'Italian CV Format: Structure, Privacy Clause and Photo Rules',
    description:
      'How an Italian curriculum vitae is structured, the privacy authorisation line Italian recruiters expect, photo conventions, and how to apply in Italian or English.',
    primaryKeyword: 'curriculum vitae europeo',
    keywords: ['cv europeo', 'cv italiano', 'italian cv format', 'curriculum vitae formato europeo'],
    intent: 'informational',
    published: '2026-11-20',
    updated: '2026-11-20',
    readingMinutes: 8,
    keyTakeaways: [
      'Italian CVs are reverse chronological and commonly include a short data-processing consent line.',
      'A photo is common but not required, and should be omitted when the employer does not ask for one.',
      'Education often comes first for candidates with limited experience.',
      'Writing in Italian is expected unless the vacancy is explicitly in English.',
    ],
    intro: [
      'The Italian curriculum vitae has a recognisable shape: dated, reverse chronological, usually two pages, and often ending with a one-line authorisation for the processing of personal data. Getting that shape right matters more than any single word choice.',
      'This guide covers the structure, the conventions that surprise non-Italian applicants, and how to decide between an Italian and an English version.',
    ],
    sections: [
      {
        id: 'structure',
        heading: 'Standard structure',
        table: {
          caption: 'Sections of an Italian CV',
          headers: ['Section', 'Italian heading', 'Notes'],
          rows: [
            ['Personal details', 'Dati personali', 'Name, address, phone, email; date and place of birth are still common'],
            ['Photo', 'Foto', 'Optional; a professional headshot is common in traditional sectors'],
            ['Profile', 'Profilo professionale', 'Three to four lines; many CVs omit this and go straight to experience'],
            ['Work experience', 'Esperienze professionali', 'Reverse chronological with month and year'],
            ['Education', 'Formazione / Istruzione', 'Qualification, institution, final grade where strong'],
            ['Languages', 'Lingue', 'Language with a level; Italian CVs often use the European scale'],
            ['IT skills', 'Competenze informatiche', 'Named tools and systems'],
            ['Additional', 'Altre informazioni', 'Driving licence, certifications, availability to travel'],
            ['Consent line', 'Autorizzazione / Consenso', 'Short data-processing authorisation, usually the last line'],
          ],
        },
      },
      {
        id: 'privacy',
        heading: 'The data-processing line',
        paragraphs: [
          'Italian CVs very commonly end with a short sentence authorising the recipient to process the applicant\'s personal data for recruitment purposes. The convention predates the GDPR and survives because Italian employers and recruiters expect to see it.',
          'Under the GDPR a lawful basis for processing is needed regardless of whether a consent line appears, and recruitment processing is often justified by legitimate interest or by steps taken before entering a contract. A consent sentence is therefore a convention rather than a legal prerequisite, but it costs one line and removes a reason for a cautious HR office to set your application aside.',
        ],
        callout: {
          title: 'Keep it short and neutral',
          body: 'One sentence is enough: that you authorise the processing of your personal data for the purposes of this selection process. Do not paste a long legal paragraph, and do not include special-category data such as health information anywhere on the CV.',
          tone: 'info',
        },
      },
      {
        id: 'photo',
        heading: 'Photo conventions',
        paragraphs: [
          'A photograph is common on Italian CVs, particularly in traditional sectors and in smaller companies, but it is not required. Data-minimisation principles under the GDPR argue for including only what is relevant to the role, and a growing number of Italian recruiters explicitly ask applicants to leave it out.',
        ],
        bullets: [
          'Include a professional headshot if the sector conventionally expects one — for example hospitality, retail or client-facing roles.',
          'Omit it for international companies, for technical and engineering roles, and whenever the advert asks for a CV without a photo.',
          'Never include a full-body photo, a holiday picture or anything cropped from a group shot.',
        ],
      },
      {
        id: 'signature',
        heading: 'Date and signature',
        paragraphs: [
          'Many Italian CVs are dated at the end and some are signed. Both practices are inherited from a paper application culture. They are optional now that most applications are submitted through portals, but including the place and date at the foot of the document is still unremarkable and occasionally expected in public-sector applications.',
          'Read the specific competition notice before deciding. Italian public competitions often prescribe the exact format, and where they do, follow it precisely.',
        ],
      },
      {
        id: 'education-first',
        heading: 'Education first, or experience first?',
        paragraphs: [
          'Italian CVs traditionally put education near the top. For a neolaureato — a recent graduate with little or no professional experience — education first is the right call, and the final grade is worth including if it is strong.',
          'Once you have two or more years of relevant experience, move experience above education. The reader is now hiring for demonstrated capability, and the degree becomes a credential rather than the main event.',
        ],
      },
      {
        id: 'language',
        heading: 'Italian or English?',
        paragraphs: [
          'Write in Italian for Italian employers, and have a native speaker read it. Small errors in Italian read as carelessness in a way that small errors in English often do not, because the reader is judging whether you can work in the office language.',
          'Use English for international companies recruiting across Europe, for roles that explicitly require English, and for academic or research positions. When the advert is in English, answer in English.',
        ],
        callout: {
          title: 'Do not machine-translate your CV',
          body: 'Job titles and qualifications translate badly. Keep the official title in the original language and add a short parenthetical gloss. A literal translation of "Responsabile di funzione" into "Function manager" tells an Italian reader you did not have the document checked.',
          tone: 'warning',
        },
      },
      {
        id: 'mistakes',
        heading: 'Mistakes to avoid',
        bullets: [
          'Including health information, religious affiliation or political views. These are special-category data and have no place on a CV.',
          'Writing three or four pages. Two is the norm in Italy.',
          'Leaving out the month in employment dates. "2019-2021" hides a nine-month gap that a reader will assume is worse than it is.',
          'Translating qualification names into invented English equivalents instead of keeping the original with a gloss.',
          'Using a decorative multi-column template that an applicant tracking system cannot parse.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is the "curriculum vitae europeo" different from an Italian CV?',
        a: 'The European format is a standardised structure; the Italian CV is the local convention. In practice they overlap heavily — both are reverse chronological with dedicated language and IT sections. Italian employers accept either, and most care more about clarity than about which template you used.',
      },
      {
        q: 'Do I need to sign an Italian CV?',
        a: 'Usually not for private-sector applications. Public competitions may specify a signature, so read the notice. A place and date at the foot of the document is an acceptable middle ground.',
      },
      {
        q: 'Is a photo required on an Italian CV?',
        a: 'No. It is common in traditional sectors but not required, and data-minimisation principles argue for leaving it out unless the employer expects one.',
      },
      {
        q: 'Should I include my final grade?',
        a: 'Include it if it is strong and you are early in your career. Once you have several years of relevant experience, the grade stops carrying weight and can be dropped.',
      },
    ],
    related: ['european-cv-template', 'europass-cv-format-explained', 'cv-photo-europe'],
    cta: {
      heading: 'Build an Italian-format CV',
      body: 'Select Italy in the GlobeCareer builder and it applies A4 paper, the Italian section conventions and the right photo default, then exports a clean vector PDF you can send as-is.',
      label: 'Create an Italian CV',
      page: 'builder',
    },
  },

  {
    slug: 'cv-photo-europe',
    cluster: 'european-cv',
    h1: 'CV Photos in Europe: Country Rules, Risks and What to Do Instead',
    seoTitle: 'CV Photo Rules in Europe: Which Countries Expect One',
    description:
      'Which European countries expect a CV photo and which discourage it, why the difference exists, and how to decide for your own application.',
    primaryKeyword: 'cv photo europe',
    keywords: ['photo on cv europe', 'cv photo germany', 'resume photo rules', 'european cv photo'],
    intent: 'informational',
    published: '2026-11-20',
    updated: '2026-11-20',
    readingMinutes: 7,
    keyTakeaways: [
      'Photos are customary in Germany, Austria, Spain and Switzerland, and uncommon in the UK, Ireland and the Netherlands.',
      'The difference comes from anti-discrimination practice, not from taste.',
      'A photo can cause an applicant tracking system to mis-parse an otherwise clean CV.',
      'When the advert does not ask for one, leaving it out is rarely penalised.',
    ],
    intro: [
      'Few details divide European job seekers like the photograph. In Munich it is expected; in Manchester it is a liability; in Amsterdam it is usually absent. None of these markets is being eccentric — each is following a different answer to the same question about what a hiring decision is allowed to consider.',
      'Here is where the conventions sit, why they differ, and how to make the call for your own application.',
    ],
    sections: [
      {
        id: 'why',
        heading: 'Why the convention splits',
        paragraphs: [
          'Countries with strong anti-discrimination frameworks in hiring tend to keep photographs off CVs, on the reasoning that a picture invites decisions based on appearance, age, ethnicity or gender rather than on capability. The UK Equality Act, Irish equality legislation and Dutch practice all push in this direction.',
          'In Germany, Austria and Switzerland the photograph is a long-established part of the Bewerbungsfoto tradition, and its absence can read as an incomplete application in conservative sectors. Spain and parts of Italy follow similar habits. The GDPR did not settle the question: it requires a lawful basis and data minimisation, but it does not prohibit a CV photo.',
        ],
      },
      {
        id: 'by-country',
        heading: 'Convention by country',
        table: {
          caption: 'CV photo conventions in selected European markets',
          headers: ['Country', 'Convention', 'Practical guidance'],
          rows: [
            ['Germany', 'Customary (Bewerbungsfoto)', 'Commonly used in traditional sectors; not required, as the Federal Employment Agency notes a photo is no longer a must'],
            ['Austria', 'Customary', 'Similar to Germany; a formal headshot is standard'],
            ['Switzerland', 'Commonly included', 'Often accompanied by date of birth and nationality'],
            ['Spain', 'Commonly included', 'A headshot is normal; keep it neutral and recent'],
            ['Italy', 'Common, not required', 'Traditional sectors expect it; data-minimisation guidance argues for omitting it'],
            ['France', 'Optional', 'Seen often, not required; a neutral headshot is acceptable'],
            ['Netherlands', 'Usually omitted', 'Anti-discrimination practice favours leaving it out'],
            ['United Kingdom', 'Discouraged', 'Convention; omit the photo along with age and marital status (the Equality Act 2010 governs discrimination, not CV photos)'],
            ['Ireland', 'Discouraged', 'Same reasoning as the UK'],
            ['Sweden, Denmark, Norway, Finland', 'Usually omitted', 'Plain, factual CVs without personal data are the norm'],
          ],
        },
        callout: {
          title: 'The advert outranks the convention',
          body: 'If a vacancy says "no photo", send none regardless of the country. If it says "CV with photo", include one even in a market where it is unusual. The employer has told you what they want.',
          tone: 'tip',
        },
      },
      {
        id: 'risks',
        heading: 'The two risks of including a photo',
        bullets: [
          'Screening risk. Images placed inside a text column can break the reading order for an applicant tracking system, causing your experience block to be misread or skipped.',
          'Discrimination exposure. In markets where photos are discouraged, including one can signal unfamiliarity with local practice, and it exposes the employer to a fairness question they would rather avoid.',
        ],
        paragraphs: [
          'There is also a practical asymmetry: omitting a photo where it is customary is a minor omission that a recruiter will barely register, while including one where it is discouraged is a visible misstep. The downside is not symmetrical, and that should inform your default.',
        ],
      },
      {
        id: 'good-photo',
        heading: 'If you do include one, do it properly',
        bullets: [
          'Head and shoulders only, facing the camera, neutral expression.',
          'Plain background, good even light, no shadows across the face.',
          'Business or smart-casual clothing appropriate to the sector.',
          'Current — ideally taken within the last two years.',
          'Small: roughly 3.5 × 4.5 cm, top right of the first page.',
          'No filters, no cropped group photos, no full-body shots, no holiday pictures.',
        ],
        paragraphs: [
          'Keep the image in a dedicated photo field rather than floating it over the text. In the GlobeCareer builder the photo is a separate element, so the body copy stays in a single readable column whether or not a picture is present.',
        ],
      },
      {
        id: 'ats',
        heading: 'Photos and automated screening',
        paragraphs: [
          'Large employers increasingly screen with software before a human reads anything. A photograph does not usually stop a parser, but the layout that usually accompanies one — a two-column design with a coloured sidebar — frequently does.',
          'If you are applying through a corporate portal, submit a plain single-column CV without a photo even if the country convention favours one, and bring a photo version to the interview. If you are emailing a small company directly in Germany or Austria, the photo version is the better choice.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a CV photo required by law anywhere in Europe?',
        a: 'No European country requires a photograph on a CV by law. It is a convention in some markets and a discouraged practice in others.',
      },
      {
        q: 'Does the GDPR ban photos on CVs?',
        a: 'No. The GDPR requires a lawful basis for processing and encourages data minimisation, which argues for including a photo only when it is relevant. It does not prohibit one.',
      },
      {
        q: 'Should I include a photo when applying to a German company in English?',
        a: 'Usually yes for traditional German employers, because the convention follows the company rather than the language of the advert. For a German subsidiary of an international group with an English-language process, it is genuinely optional.',
      },
      {
        q: 'What if the job advert does not mention a photo at all?',
        a: 'Follow the local convention if you know it. If you do not, leave the photo out — the omission is far less noticeable than an unexpected image.',
      },
    ],
    related: ['european-cv-template', 'italian-cv-format', 'eu-cv-format-vs-us-resume'],
    cta: {
      heading: 'Country-aware defaults, done for you',
      body: 'GlobeCareer knows which of its 47 target countries expect a photo and which discourage one, and sets the default accordingly. You can override it in one click before exporting.',
      label: 'Choose your country',
      page: 'builder',
    },
  },
];

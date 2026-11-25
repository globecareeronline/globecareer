/**
 * Country-specific insight layer.
 *
 * The shared country record already carries terminology, length, paper size,
 * photo convention and personal-data rules. This file adds the material that
 * genuinely differs from one market to the next: what makes an application in
 * that country distinct, the mistakes applicants most often make, and the
 * question they most often ask.
 *
 * Wording is deliberately careful: where a practice is a convention rather
 * than a legal requirement, it is described as a convention. Hiring practice
 * varies by employer, sector and region, and each entry says so where relevant.
 */

export interface CountryFaqItem {
  q: string;
  a: string;
}

export interface CountryInsight {
  /** What genuinely differs about applying in this market. */
  edge: string;
  /** Two or three specific, avoidable mistakes. */
  mistakes: string[];
  /** One or two questions applicants actually ask about this market. */
  faq: CountryFaqItem[];
}

export const COUNTRY_INSIGHTS: Record<string, CountryInsight> = {
  us: {
    edge:
      'A US resume is a one-page argument for one specific job, not a career record. Employers expect measurable outcomes, a reverse-chronological order and keywords lifted from the vacancy itself, because most large employers screen through an applicant tracking system first. Work authorization is worth stating when you are not a citizen.',
    mistakes: [
      'Including a photo, date of birth, marital status or nationality. This is convention rather than statute, but it marks an application as non-US immediately.',
      'Listing duties instead of results. "Managed social accounts" says nothing; "Grew organic reach 42% in nine months" does.',
      'Using a European-style two-page CV for a mid-level role, or ignoring the very different federal (USAJOBS) format when applying to government posts.',
    ],
    faq: [
      {
        q: 'Is a photo on a US resume illegal?',
        a: 'No. Federal equal-employment law governs hiring decisions and prohibits discrimination; it does not ban a photograph. Omitting one is a near-universal convention because employers screen to avoid bias and many parsers handle image-heavy documents badly.',
      },
    ],
  },
  ca: {
    edge:
      'Canadian employers often mirror the job advert language in their screening, and many use the National Occupational Classification (NOC) to describe roles, so echoing the advert matters. Volunteer work and community involvement carry real weight here, more than in most markets, and bilingual ability is a genuine differentiator outside Quebec.',
    mistakes: [
      'Putting a Social Insurance Number (SIN), photo or birth date on the document. Employers do not need identity numbers at application stage.',
      'Applying US spelling throughout when the employer is Canadian, or ignoring French entirely for roles in Quebec.',
      'Leaving out work eligibility (citizen, permanent resident, open work permit) when applying from abroad.',
    ],
    faq: [
      {
        q: 'Should a Canadian resume mention volunteer work?',
        a: 'Yes, when it is relevant or when your paid experience is short. Canadian hiring culture treats volunteering and campus leadership as evidence of employability, and a dedicated section is normal rather than unusual.',
      },
    ],
  },
  uk: {
    edge:
      'The British CV runs to two pages, opens with a short personal profile, and is written in British English. "CV" is the everyday term for every job application document, not just academic ones. References are usually offered as "available on request" and only contacted later in the process.',
    mistakes: [
      'Sending a one-page US-style resume with US spelling for a UK employer.',
      'Adding a photograph or personal details such as date of birth; UK careers guidance advises omitting both.',
      'Cramming in every past job. UK recruiters expect a two-page document that explains relevant achievements, not a complete history.',
    ],
    faq: [
      {
        q: 'Do UK employers want referees listed on the CV?',
        a: 'Normally not at application stage. "References available on request" remains the standard line, and referees are supplied once a conditional offer is made.',
      },
    ],
  },
  au: {
    edge:
      'Australian applications usually run two to three pages, with a clear statement of your right to work, and referees are commonly listed with contact details because employers do contact them. Australian English spelling is expected, and a separate cover letter is still normal rather than optional.',
    mistakes: [
      'Including a photo or age. Australian anti-discrimination practice expects applications without them.',
      'Forcing everything onto one page and cutting relevant project detail; two to three pages is standard here.',
      'Omitting referees when the advert asks for them, or listing referees without asking their permission first.',
    ],
    faq: [
      {
        q: 'How long should an Australian CV be?',
        a: 'Two to three pages is the usual range. A one-page CV reads as thin to Australian recruiters, while four pages or more reads as unfocused unless you are applying for a senior executive or academic role.',
      },
    ],
  },
  nz: {
    edge:
      'New Zealand follows the British CV shape with local spelling and a strong preference for a cover letter that addresses the role directly. Personal statements are short, referees are usually supplied on request, and employers often value a clear statement of visa or residency status.',
    mistakes: [
      'Using Australian or US spelling in a market that notices the difference.',
      'Sending a bare list of jobs without a profile paragraph; NZ recruiters expect a short statement of what you offer.',
      'Leaving immigration status vague when applying from overseas.',
    ],
    faq: [
      {
        q: 'Is a cover letter expected in New Zealand?',
        a: 'Usually yes, and it is often read before the CV. New Zealand employers expect it to address the specific role and team rather than restate your history.',
      },
    ],
  },
  de: {
    edge:
      'The German Lebenslauf is a tabular, dated, complete account of your career, often signed and dated at the bottom (optional, but still common), and it normally travels with a separate Anschreiben (cover letter) and copies of your Zeugnisse (employment and degree certificates). A Bewerbungsfoto is still common, particularly at traditional employers, but it is a convention rather than a legal requirement.',
    mistakes: [
      'Sending an American one-page resume with no dates, no signature and no certificates.',
      'Leaving unexplained gaps. German readers expect gaps to be accounted for, at least in a line.',
      'Applying in English to a German-speaking employer without confirming that English is acceptable.',
    ],
    faq: [
      {
        q: 'Is a photo still expected on a German CV?',
        a: 'It remains common and is often expected by traditional employers, but the Federal Employment Agency (Bundesagentur für Arbeit) states that a Bewerbungsfoto is no longer obligatory and that employers may not require one. Including a professional photo is safe; leaving it out is accepted, especially at international employers and in tech.',
      },
    ],
  },
  fr: {
    edge:
      'French CVs are compact by convention: one page is normal early in a career and two pages is the practical maximum. A photo is widely accepted and often included, though it is optional. French employers expect the document in French for French-speaking roles, with a separate lettre de motivation that follows a formal structure.',
    mistakes: [
      'Sending an English CV for a role advertised in French.',
      'Writing three or four pages of prose; French readers expect a dense, skimmable one-to-two page document.',
      'Omitting the lettre de motivation when the advert asks for one, or sending a generic version of it.',
    ],
    faq: [
      {
        q: 'Do French employers expect a photo?',
        a: 'A professional photo is common and rarely penalised, but it is not required. International employers and tech companies increasingly prefer applications without one.',
      },
    ],
  },
  nl: {
    edge:
      'Dutch CVs are notably direct: a short profile, factual achievements and little ornamental language. A photo is optional rather than required: many candidates include a small professional headshot and the public employment service (UWV) still advises one, but omitting it is entirely normal. Two pages is the norm, and applications usually pair the CV with a motivation letter that names the employer and explains why you want that organisation. English-language CVs are accepted at many international companies, but Dutch is expected at local firms.',
    mistakes: [
      'Carrying marital status or nationality over from an older template; Dutch CVs do not expect either, and date of birth is optional.',
      'Attaching certificates and references instead of bringing them to the interview, which is the Dutch convention.',
      'Sending an English CV to a Dutch-speaking employer without checking that it is acceptable.',
    ],
    faq: [
      {
        q: 'Is a motivation letter required in the Netherlands?',
        a: 'For most vacancies, yes. Dutch employers expect a short letter explaining your interest in that specific organisation, and a generic letter is usually noticed.',
      },
    ],
  },
  ie: {
    edge:
      'Irish CVs follow UK shape: two pages, a personal profile, no photograph, and referees on request. English is the working language, Irish is rarely required outside specific public-sector roles, and the tone is direct but courteous. Sector matters: multinational tech employers in Dublin screen heavily through ATS, while smaller local firms read the letter first.',
    mistakes: [
      'Cutting the document to one page; two pages is the Irish norm.',
      'Including a photo or date of birth, which Irish careers guidance advises against.',
      'Assuming Irish (Gaeilge) is needed, or assuming it is never relevant for public-sector roles where it can be an advantage.',
    ],
    faq: [
      {
        q: 'How long should an Irish CV be?',
        a: 'Two pages is standard for most candidates, and a one-page CV can read as sparse. Senior or academic applicants sometimes run to three pages when the detail is genuinely relevant.',
      },
    ],
  },
  it: {
    edge:
      'Italian CVs are typically one to two pages, often in the Europass-derived "CV europeo" layout, and many employers are used to seeing a privacy clause authorising data processing, even though Italian law no longer requires consent for CV data used in selection (art. 111-bis of the privacy code, D.Lgs. 196/2003). A photo is common, particularly at traditional firms, and Italian is expected for Italian-speaking roles even when the company operates internationally.',
    mistakes: [
      'Omitting the privacy line when the vacancy or portal asks for it. Italian recruiters are used to seeing it, even though the law does not require it.',
      'Applying in English to a local employer without confirming English is the working language.',
      'Sending a long academic CV for a commercial role; Italian recruiters expect a compact document.',
    ],
    faq: [
      {
        q: 'What is the privacy clause on an Italian CV?',
        a: 'A short sentence authorising the employer to process your personal data under the GDPR ("Autorizzo il trattamento dei miei dati personali..."). Italian law does not require it: art. 111-bis of the privacy code states that consent is not due for CV data used to assess an application. It remains a widespread convention that recruiters are used to seeing, and GlobeCareer can insert it for you.',
      },
    ],
  },
  es: {
    edge:
      'Spanish CVs usually run one to two pages, and a photo is customary at many employers although never required. Candidates already resident in Spain often add DNI or NIE details and a work-permit status; the Europass format is accepted but not expected. Spanish is normally required for Spanish-speaking roles, with English acceptable at multinationals.',
    mistakes: [
      'Assuming every Spanish employer wants a photo; multinationals and tech firms often prefer none.',
      'Leaving out residency or work-permit status when you are not an EU citizen, which is the first question a recruiter asks.',
      'Producing a Europass document for a private-sector role where a clean one-page CV would read better.',
    ],
    faq: [
      {
        q: 'Is Europass required for jobs in Spain?',
        a: 'No. Europass is accepted and can help for public-sector or academic applications, but private employers generally expect an ordinary CV in Spanish or English.',
      },
    ],
  },
  pt: {
    edge:
      'Portuguese CVs are compact, usually one to two pages, with a photo that remains common at traditional employers. Portuguese is expected for local roles and English is often accepted at multinationals and in tech. A short cover letter is normal, and Europass is used mainly for public-sector and academic applications.',
    mistakes: [
      'Sending a long CV; Portuguese recruiters expect a short, focused document.',
      'Assuming Brazilian Portuguese usage and spelling are appropriate for a Portuguese employer.',
      'Omitting language levels when applying to roles that interface with other European markets.',
    ],
    faq: [
      {
        q: 'Should a CV for Portugal include a photo?',
        a: 'It is common and generally acceptable, especially at traditional companies, but not required. International employers increasingly prefer applications without one.',
      },
    ],
  },
  pl: {
    edge:
      'Polish CVs are usually one to two pages, and a short RODO (GDPR) privacy clause is a widespread convention. A photo is common but optional. Polish employers expect Polish for local roles and English at international companies, and they often weigh specific technical skills and certifications more heavily than a narrative profile.',
    mistakes: [
      'Treating the RODO clause as a legal necessity. The Polish data protection authority (UODO) has said a blanket consent clause attached to every CV is not appropriate; it is a convention you can adapt or drop.',
      'Using a US-style one-page resume with no personal-data section for a traditional Polish employer that expects one.',
      'Leaving out language levels, which Polish recruiters read closely.',
    ],
    faq: [
      {
        q: 'Do I need a RODO clause on a Polish CV?',
        a: 'It is customary rather than required. A short clause is harmless and widely expected, but consent must be specific and freely given; a blanket clause copied onto every application is exactly what UODO has criticised.',
      },
    ],
  },
  se: {
    edge:
      'Swedish CVs are short, factual and unhurried: one to two pages, no photo, and a personal letter (personligt brev) that carries most of the personality. English CVs are common and accepted in technology and international firms. Employers value consensus-building and team contribution, so solo heroics read less well than shared outcomes.',
    mistakes: [
      'Including a photo or personal details; Swedish applications are expected to omit them.',
      'Overclaiming individual credit for team results, which Swedish readers tend to discount.',
      'Sending a CV in English to a Swedish-speaking employer without confirming it is acceptable.',
    ],
    faq: [
      {
        q: 'Is a personal letter required in Sweden?',
        a: 'It is expected for most applications. The personligt brev is where Swedish employers look for motivation and fit, while the CV is read as a factual record.',
      },
    ],
  },
  no: {
    edge:
      'Norwegian applications pair a short CV with a søknad (application letter) that explains motivation. One to two pages is normal, photos are not expected, and English is widely accepted in engineering, technology and international organisations. Formal qualifications and certifications are listed precisely.',
    mistakes: [
      'Attaching a photo, which Norwegian employers generally do not expect.',
      'Sending only a CV when the advert asks for a søknad.',
      'Being vague about authorisations or certifications in regulated trades.',
    ],
    faq: [
      {
        q: 'Can I apply in English in Norway?',
        a: 'At many international companies and in tech, yes. For Norwegian-speaking workplaces and public-sector roles, a Norwegian application is expected even when English is spoken at work.',
      },
    ],
  },
  dk: {
    edge:
      'Danish CVs are concise, usually one to two pages, without a photo, and are paired with an ansøgning that states why this role and employer. Danish employers value plain description of results and directness; hierarchies are flat, so a modest, factual tone reads better than an executive register.',
    mistakes: [
      'Including a photo or marital status; Danish practice omits both.',
      'Writing a long, formal letter where two short paragraphs would be expected.',
      'Leaving out the specific reason for applying to that employer.',
    ],
    faq: [
      {
        q: 'How long should a Danish application be?',
        a: 'The CV is typically one to two pages and the letter under a page. Danish recruiters read for relevance, and a long letter is usually skimmed rather than rewarded.',
      },
    ],
  },
  fi: {
    edge:
      'Finnish applications are compact and factual: a one-to-two page CV plus a työhakemus (application letter). Photos are not expected. Finnish is required at most local employers, while English is common in technology, gaming and international firms. Stated language levels and precise dates matter.',
    mistakes: [
      'Adding a photo and personal details that Finnish employers do not expect.',
      'Applying in English to a Finnish-speaking workplace without confirming it is acceptable.',
      'Omitting exact dates and qualification names, which Finnish readers check closely.',
    ],
    faq: [
      {
        q: 'Do Finnish employers expect a photo?',
        a: 'No. Finnish applications normally omit photographs, and including one is more likely to look unusual than helpful.',
      },
    ],
  },
  ch: {
    edge:
      'Swiss applications are formal and complete: a two-page CV, a photo that remains customary, a cover letter, and often copies of diplomas and work references. Crucially, employers want your permit situation stated plainly (Swiss or EU/EFTA citizen, or a B, C, L or G permit), because hiring from outside the EU/EFTA can involve quota places and paperwork. Language follows the canton: German, French or Italian.',
    mistakes: [
      'Leaving the work-permit category vague. Swiss recruiters commonly ask for it early, before an application goes further.',
      'Sending one page, or omitting references and certificates that Swiss employers expect to see attached.',
      'Applying in English to a German-speaking or French-speaking employer without checking the working language.',
    ],
    faq: [
      {
        q: 'What do the Swiss permit letters mean on a CV?',
        a: 'They describe your residence and work status: B is a temporary residence permit, C is permanent settlement, L is short-term, and G is a cross-border commuter. Stating the category tells an employer whether hiring you requires a quota place.',
      },
    ],
  },
  at: {
    edge:
      'Austrian applications follow German shape: a tabular Lebenslauf, a Bewerbungsschreiben, and a photo that remains customary at traditional employers. Two pages is normal. Austrian German spelling and formal address (Sie) are expected in correspondence, and certificates are commonly attached.',
    mistakes: [
      'Using German from Germany where Austrian conventions or spelling differ in a formal document.',
      'Omitting the letter; Austrian employers expect a proper Bewerbungsschreiben.',
      'Sending a photo-free one-page resume to a traditional employer that expects a complete application package.',
    ],
    faq: [
      {
        q: 'Is a photo expected on an Austrian CV?',
        a: 'It remains customary, especially at traditional employers and in public-facing roles, but it is a convention rather than a legal requirement.',
      },
    ],
  },
  be: {
    edge:
      'Belgium is effectively two application cultures. Dutch-speaking Flanders expects a Dutch CV, French-speaking Wallonia and Brussels a French one, and German is used in a small eastern community. One to two pages is normal, photos are optional, and Europass is common in public-sector and EU-institution applications.',
    mistakes: [
      'Sending a single English CV to an employer whose working language is Dutch or French, without checking.',
      'Guessing the language from the company name rather than from the vacancy text.',
      'Assuming Europass is expected; it is mainly a public-sector and EU-institution format.',
    ],
    faq: [
      {
        q: 'Which language should a Belgian CV be in?',
        a: 'The language of the vacancy. In Brussels, either French or Dutch may be used depending on the employer, and many international organisations and EU bodies work in English.',
      },
    ],
  },
  lu: {
    edge:
      'Luxembourg runs a genuinely multilingual labour market: French is dominant in administration, German is common in some sectors, Luxembourgish is used socially, and English dominates finance and technology. CVs are one to two pages, photos are optional, and stating your languages with levels is essential rather than decorative.',
    mistakes: [
      'Listing languages without levels; in Luxembourg they are a screening criterion.',
      'Sending only one language version to a multilingual employer without checking which is preferred.',
      'Assuming a Luxembourgish-language application is expected; it rarely is for professional roles.',
    ],
    faq: [
      {
        q: 'How many languages should a Luxembourg CV show?',
        a: 'Whatever you can defend in an interview, with explicit levels. French, German and English are the common working languages, and employers often screen on the combination rather than on any single one.',
      },
    ],
  },
  cz: {
    edge:
      'Czech CVs (životopis) are one to two pages, with a photo that is common at Czech-owned companies and often dropped at international ones. Czech is expected for local roles and English at multinationals and in IT. A short cover letter (motivační dopis) is normal.',
    mistakes: [
      'Sending a photo-free CV to a traditional Czech employer that expects one, or the reverse at an international firm.',
      'Omitting language levels for Czech and English, which are read closely.',
      'Using Slovak or German terminology where Czech terms are expected.',
    ],
    faq: [
      {
        q: 'Is a photo expected on a Czech CV?',
        a: 'It is common at Czech-owned and traditional employers but not required, and international companies increasingly prefer applications without one. Checking the vacancy and the company type is the practical approach.',
      },
    ],
  },
  sk: {
    edge:
      'Slovak CVs (životopis) are one to two pages with a photo that is common at local employers. Slovak is expected for local roles, English at multinationals, and Czech is widely understood. Manufacturing and engineering employers often screen on specific technical certifications and shift availability.',
    mistakes: [
      'Omitting technical certifications and machine or system experience that Slovak industrial employers screen for.',
      'Assuming a Czech document will pass unnoticed; the languages are close but the conventions differ slightly.',
      'Sending an English CV to a Slovak-speaking plant or office without checking.',
    ],
    faq: [
      {
        q: 'Should a Slovak CV include a photo?',
        a: 'It is customary at many local employers and accepted at international ones, but not mandatory. A professional headshot is the safer default for traditional companies.',
      },
    ],
  },
  hu: {
    edge:
      'Hungarian CVs (önéletrajz) are one to two pages, often with a photo, and Hungarian is expected for local roles while English is common at multinationals and in shared-service centres. Budapest hosts many regional service centres, so language levels and specific system experience are screened precisely.',
    mistakes: [
      'Leaving out language proficiency levels, which Hungarian recruiters check first in service-centre roles.',
      'Sending a long narrative CV; one to two pages is the expectation.',
      'Applying in English to a Hungarian-owned company without confirming it is acceptable.',
    ],
    faq: [
      {
        q: 'Is English enough for jobs in Hungary?',
        a: 'At multinational shared-service centres and technology firms, often yes. At Hungarian-owned companies and in public-sector roles, a Hungarian CV is expected.',
      },
    ],
  },
  ro: {
    edge:
      'Romanian CVs are one to two pages, commonly with a photo, and Romanian is expected at local employers while English is standard in IT and multinational shared-service centres. Bucharest and Cluj have distinct tech markets where English-language CVs are normal.',
    mistakes: [
      'Assuming all Romanian employers accept English; outside tech and multinationals, Romanian is expected.',
      'Omitting specific software or language skills that service centres screen on.',
      'Attaching a photo where an international employer has asked for a bias-reduced application.',
    ],
    faq: [
      {
        q: 'Should a Romanian CV include a photo?',
        a: 'It is common at local employers and generally accepted, but international companies often prefer no photo. Following the vacancy text is the safest rule.',
      },
    ],
  },
  bg: {
    edge:
      'Bulgarian CVs are one to two pages and often include a photo. Europass is used in public-sector and EU-related applications, while private employers usually prefer a clean custom CV. English is common in IT and outsourcing; Bulgarian is expected elsewhere.',
    mistakes: [
      'Using Europass for a private-sector role where a simple CV reads better.',
      'Sending a Bulgarian-language CV to an international employer that advertises in English.',
      'Omitting the specific technical stack for outsourcing roles, where it is the main screening criterion.',
    ],
    faq: [
      {
        q: 'Is Europass preferred in Bulgaria?',
        a: 'Mainly for public-sector, academic and EU-related applications. Private employers generally expect an ordinary, well-structured CV.',
      },
    ],
  },
  gr: {
    edge:
      'Greek CVs are one to two pages. A photo is still accepted at many employers, though Greek university career offices now advise leaving it out except for specific professions, and date of birth and marital status should not be included. Greek is expected for local roles, while English dominates shipping, tourism and international firms. Professional licences and certifications matter in regulated fields, and military service status is sometimes relevant for male candidates.',
    mistakes: [
      'Omitting professional licences in regulated professions where they are a screening requirement.',
      'Sending an English CV to a Greek-owned business that advertises in Greek.',
      'Writing a long academic CV for a commercial role in tourism or retail.',
    ],
    faq: [
      {
        q: 'Should a Greek CV mention military service?',
        a: 'For male Greek candidates it is often listed as a short line, and some employers ask. Greek university career guidance treats it as optional rather than required, and it is irrelevant for foreign applicants.',
      },
    ],
  },
  hr: {
    edge:
      'Croatian CVs (životopis) are one to two pages, commonly with a photo, and Europass is widely used in public-sector applications. Croatian is expected locally; English is common in tourism, IT and international firms, with German valuable in tourism along the coast.',
    mistakes: [
      'Ignoring German for hospitality and tourism roles on the Adriatic coast, where it is a real advantage.',
      'Sending a Europass document to a private employer that expects a custom CV.',
      'Leaving out language levels for a market that hires heavily on them.',
    ],
    faq: [
      {
        q: 'Is Europass expected in Croatia?',
        a: 'It is common in public-sector and EU-related applications, and accepted elsewhere, but private employers generally prefer a standard CV.',
      },
    ],
  },
  si: {
    edge:
      'Slovenian CVs (življenjepis) are one to two pages, with Europass common in public-sector recruitment and a photo frequently included. Slovenian is expected locally; English is standard at international companies. Small domestic market, so specific sector experience is weighted heavily.',
    mistakes: [
      'Using Europass for a private-sector role without checking the employer preference.',
      'Omitting language levels, which matter in a market that works across Italian, German and English.',
      'Sending an English CV to a Slovenian-speaking employer without confirmation.',
    ],
    faq: [
      {
        q: 'Do Slovenian employers expect a photo?',
        a: 'It is common and generally accepted, particularly in traditional companies, but not required. International employers often prefer none.',
      },
    ],
  },
  ee: {
    edge:
      'Estonian CVs are compact, one to two pages, usually without a photo, and English is widely accepted in the digital and technology sectors that dominate Tallinn. Estonian is expected at local employers and in the public sector. Specific technical and language skills are screened closely.',
    mistakes: [
      'Assuming English is universally acceptable; outside tech and international firms, Estonian is expected.',
      'Including a photo where Estonian practice generally omits it.',
      'Leaving out concrete technical skills that Estonian employers screen on.',
    ],
    faq: [
      {
        q: 'Can I apply in English in Estonia?',
        a: 'In technology, startups and international companies, usually yes. For Estonian-owned businesses and public-sector roles, an Estonian CV is expected.',
      },
    ],
  },
  lv: {
    edge:
      'Latvian CVs are one to two pages, often with a photo, and Latvian is expected at local employers while English is common in IT, shared services and international firms. Russian is also used in parts of the private sector. Language levels are a standard field.',
    mistakes: [
      'Omitting language levels, which Latvian recruiters read as a standard criterion.',
      'Sending an English CV to a Latvian-speaking employer without checking.',
      'Assuming one language version will fit every employer in a genuinely multilingual market.',
    ],
    faq: [
      {
        q: 'Which languages matter on a Latvian CV?',
        a: 'Latvian and English are the usual baseline, and Russian is often relevant in the private sector. State levels for each rather than listing languages alone.',
      },
    ],
  },
  lt: {
    edge:
      'Lithuanian CVs are one to two pages, often with a photo, and Lithuanian is expected at local employers while English is standard in fintech, IT and international shared-service centres. Vilnius has a concentrated fintech market where English-language CVs are normal.',
    mistakes: [
      'Sending a photo-free CV to a traditional Lithuanian employer that expects one.',
      'Applying in Lithuanian to an international fintech that works entirely in English, or the reverse.',
      'Leaving out precise system and language skills that are the main screening criteria in service centres.',
    ],
    faq: [
      {
        q: 'Should a Lithuanian CV have a photo?',
        a: 'It is common and generally accepted at local employers, but international companies often prefer none. The vacancy text is the best guide.',
      },
    ],
  },
  is: {
    edge:
      'Iceland is a small, relationship-driven market where referrals and personal reputation carry more weight than in most larger markets. CVs are one to two pages, photos are optional, and English is widely used in international companies and tourism.',
    mistakes: [
      'Relying only on online applications in a market where personal contact matters more than in most.',
      'Sending an Icelandic-language CV you cannot defend in an interview; Icelandic is demanding and employers notice.',
      'Ignoring the small-market effect: name recognition and local references are often decisive.',
    ],
    faq: [
      {
        q: 'Can I find work in Iceland without Icelandic?',
        a: 'In tourism, fisheries, technology and international companies, English is often enough. For public-sector and customer-facing Icelandic roles, Icelandic is normally required.',
      },
    ],
  },
  jp: {
    edge:
      'Japanese applications use two different documents: a rirekisho, a standardised form covering personal details and a photo, and a shokumu-keirekisho, the work-history document comparable to a CV. New graduates apply through a highly structured mass-hiring cycle: government guidance asks employers to open publicity in March, start selection in June and issue formal offers in October, more than a year before a spring start, though the calendar is a request rather than a law. Experienced hires are recruited separately. Japanese is normally required, and formality is expected.',
    mistakes: [
      'Sending an English or Western-style CV to a Japanese employer that expects a rirekisho and shokumu-keirekisho.',
      'Treating the photo, date format and personal-detail fields as optional; on a rirekisho they are part of the form.',
      'Missing the graduate hiring calendar, which opens more than a year before a spring start.',
    ],
    faq: [
      {
        q: 'Do I need Japanese to apply in Japan?',
        a: 'For most Japanese employers, yes, at least to business level, because the application documents and interviews are in Japanese. Some international companies and engineering teams hire in English.',
      },
    ],
  },
  sg: {
    edge:
      'Singapore works in English, and CVs are one to two pages with a photo that is common at local and traditional employers but usually dropped at multinationals. Work-pass eligibility (Employment Pass, S Pass, Work Permit) is a practical screening factor, and stating your status or eligibility helps.',
    mistakes: [
      'Omitting work-pass eligibility when applying from abroad; employers screen on it early.',
      'Including a photo, date of birth and your full NRIC number: PDPC guidance says you need not give your NRIC when applying, only once employment is confirmed.',
      'Writing a long CV; Singapore recruiters expect a tight one to two pages.',
    ],
    faq: [
      {
        q: 'Should a Singapore CV include a photo?',
        a: 'It is common at local and traditional employers and accepted at many others, but multinationals generally prefer applications without one. Check the vacancy and company type.',
      },
    ],
  },
  ae: {
    edge:
      'Gulf applications are unusually personal compared with Western markets: a photo, nationality, visa status and notice period are commonly expected, and two pages is normal. None of it is required by UAE law; it persists because those details decide visa processing and time-to-hire. English is the business language. Recruitment is often fast and mediated by agencies, so availability and notice period carry real weight.',
    mistakes: [
      'Leaving out visa status and notice period, which recruiters ask for before anything else.',
      'Sending a bias-reduced Western CV with no photo to a traditional Gulf employer that expects one.',
      'Assuming a long hiring process; decisions are often quick and availability matters.',
    ],
    faq: [
      {
        q: 'Do UAE employers expect a photo and nationality?',
        a: 'At many employers, yes: a photo, nationality and visa status are standard fields. This is a regional convention rather than a legal requirement, and international firms vary.',
      },
    ],
  },
  sa: {
    edge:
      'Saudi applications commonly include a photo, nationality, visa or iqama status and notice period, and two pages is normal. English is standard in business, Arabic is expected for government-facing and local roles, and Saudization requirements shape which roles are open to expatriates: sectoral quotas set by ministerial decision, such as 30% in engineering and 70% in procurement, can close whole functions to foreign hires.',
    mistakes: [
      'Omitting nationality and visa status, which determine whether you can be hired at all.',
      'Applying in English to a government or Arabic-speaking employer without an Arabic version.',
      'Ignoring sector restrictions that apply to expatriate hiring.',
    ],
    faq: [
      {
        q: 'Is a photo expected on a Saudi CV?',
        a: 'At many employers it is common, along with nationality and visa status. International companies may prefer a standard CV without a photo.',
      },
    ],
  },
  qa: {
    edge:
      'Qatari applications usually include a photo, nationality, visa status and notice period, with English as the working language and Arabic valuable for government-linked roles. The market is small and agency-driven, and hiring decisions often move quickly once availability is clear.',
    mistakes: [
      'Leaving out notice period and visa status, the two facts recruiters request first.',
      'Sending a CV without a photo to a traditional employer that expects one.',
      'Assuming the process is slow; Qatari hiring is often fast when a candidate is immediately available.',
    ],
    faq: [
      {
        q: 'What should a Qatar CV include that a UK CV would not?',
        a: 'Commonly a photo, nationality, visa status and notice period. These are regional conventions rather than legal requirements.',
      },
    ],
  },
  za: {
    edge:
      'South African CVs run two to three pages, include a short profile, and are written in South African English. A photo is usually omitted. Matric results, certifications and contactable referees are commonly listed, and drivers licence status is often relevant.',
    mistakes: [
      'Sending a one-page US-style resume; two to three pages is the local norm.',
      'Including a photo, which South African employers generally do not expect.',
      'Omitting matric or certification details where they are a screening requirement.',
    ],
    faq: [
      {
        q: 'How long should a South African CV be?',
        a: 'Two to three pages is typical, with comprehensive detail on responsibilities and achievements. One page is usually too thin outside entry-level roles.',
      },
    ],
  },
  in: {
    edge:
      'Indian applications are one to two pages for most private-sector roles, in English, with a photo still common at traditional employers and often dropped at multinationals. Notice period and current or expected CTC (salary) are standard screening questions, though the notice period itself comes from your appointment letter rather than a statute. Campus hiring follows its own calendar and format.',
    mistakes: [
      'Omitting notice period and salary expectations, which Indian recruiters ask for at first contact.',
      'Sending an academic-style CV listing every project and course for a mid-level corporate role.',
      'Using a photo and full personal details at a multinational that prefers a standard resume.',
    ],
    faq: [
      {
        q: 'Should an Indian CV state current and expected salary?',
        a: 'It is common and often requested, either on the CV or in the application form. Notice period is equally standard. Both are conventions rather than requirements, and some multinationals prefer to discuss them later.',
      },
    ],
  },
  pk: {
    edge:
      'Pakistani employers use "CV" for what is essentially a one-to-two page resume, written in English because English is the language of business. A passport-style photo is still common and often expected at traditional employers, while multinationals and tech firms increasingly prefer none. Modern practice leaves out identity numbers entirely.',
    mistakes: [
      'Putting your CNIC number on a CV. It is sensitive identity information and a real fraud risk; supply it only through an official hiring process.',
      'Carrying over father\'s name, religion, marital status and full home address from older CV templates.',
      'Sending a three or four page CV; one to two pages is the modern expectation.',
    ],
    faq: [
      {
        q: 'Is a photo expected on a Pakistani CV?',
        a: 'At banks, government-linked employers, teaching and traditional companies, a professional photo is commonly expected. IT firms, multinationals and remote-first employers usually prefer none.',
      },
    ],
  },
  bd: {
    edge:
      'The Bangladeshi CV conventionally runs to two pages even for fresh graduates, includes a passport-style photo, and often lists every public examination (SSC, HSC) with results, plus a declaration and signature. English is the default for private-sector, banking and NGO roles, while government recruitment uses its own prescribed biodata format.',
    mistakes: [
      'Cutting to one page and dropping projects and internships; two pages is normal here, including for graduates.',
      'Omitting SSC and HSC results or CGPA, which banks and traditional employers screen on.',
      'Using a Western no-photo resume for a bank, government or traditional corporate application where a photo is expected.',
    ],
    faq: [
      {
        q: 'Is a photo required on a Bangladeshi CV?',
        a: 'It is expected at most private-sector, banking and government-facing employers, usually passport-style on a plain background. Fintech, IT and multinational graduate programmes often prefer no photo.',
      },
    ],
  },
  br: {
    edge:
      'Brazilian applications use a currículo of one to two pages in Portuguese, with a photo that is optional and increasingly omitted at modern employers. CPF and identity numbers should not appear on a CV: under the LGPD necessity principle they belong to the contract stage, not to screening. LinkedIn is heavily used, and a short objective or summary at the top remains common even for experienced candidates.',
    mistakes: [
      'Including CPF, RG or full home address; these are identity details that do not belong on a circulated document.',
      'Sending an English CV to a Brazilian employer that advertises in Portuguese.',
      'Keeping a generic "objetivo" line instead of a specific summary of what you offer.',
    ],
    faq: [
      {
        q: 'Should a Brazilian CV include a photo?',
        a: 'It is optional. Traditional employers often accept one, while technology companies and multinationals increasingly prefer none. Omitting it does not disadvantage a modern application.',
      },
    ],
  },
  tr: {
    edge:
      'Turkish CVs (özgeçmiş) are one to two pages, commonly with a photo, and Turkish is expected at local employers while English is common at multinationals and in export-driven sectors. Military service status (askerlik durumu) is a standard line for male candidates, usually written as completed, deferred with an end date, or exempt, and references are frequently included.',
    mistakes: [
      'Leaving military service status off a male candidate\'s CV. Turkish employers commonly ask, even though it is a convention rather than a legal requirement.',
      'Applying in English to a Turkish-owned company that advertises in Turkish.',
      'Including a photo at an international employer that has asked for a bias-reduced application.',
    ],
    faq: [
      {
        q: 'Do Turkish employers expect a photo?',
        a: 'It is common at local employers and generally accepted, but not mandatory. International companies often prefer no photo, so following the vacancy is the safer approach.',
      },
    ],
  },
  my: {
    edge:
      'Malaysian applications are one to two pages, in English or Malay depending on the employer, and a photo is common at local and government-linked organisations while multinationals usually drop it. Older templates list identity card number, date of birth and marital status; modern practice keeps that detail minimal. Language ability in English, Malay and often Mandarin or Tamil is a genuine differentiator.',
    mistakes: [
      'Listing your full identity card (IC) number on a CV that will be circulated.',
      'Sending a photo-free CV to a government-linked or traditional local employer that expects one, or a photo-heavy CV to a multinational that does not want it.',
      'Omitting language proficiency, which Malaysian employers screen on seriously.',
    ],
    faq: [
      {
        q: 'Should a Malaysian CV include a photo?',
        a: 'It is common at local, government-linked and traditional employers, and usually omitted for multinational and technology roles. The vacancy and company type are the best guide.',
      },
    ],
  },
  id: {
    edge:
      'Indonesian CVs are usually one to two pages, often with a formal photo at the top, and traditionally carry personal details such as place and date of birth. Recent graduates include IPK (GPA) out of 4.00, and some applications close with a signed declaration. Bahasa Indonesia is expected at local firms; English is standard at multinationals, and ATS applications should drop the photo and personal data.',
    mistakes: [
      'Sending a photo-and-personal-data CV into an ATS that only reads text, where the photo adds nothing and personal fields invite bias.',
      'Leaving out IPK for a graduate application, where it is a standard screening field.',
      'Including religion or marital status by default at a multinational that has asked candidates to omit them.',
    ],
    faq: [
      {
        q: 'Is a photo required on an Indonesian CV?',
        a: 'No national rule requires one, but many employers expect a formal headshot, particularly at local companies and for government-linked roles. For ATS-driven or multinational applications, a text-only version is usually more effective.',
      },
    ],
  },
  ru: {
    edge:
      'Russian applications use a résumé (резюме) of one to two pages, usually with a photo, and Russian is expected at local employers while English is used by international companies. Citizenship or work-permit status, date of birth and full contact details are conventional, and recruiters generally expect a structured, scannable one-to-two page document with reverse-chronological dates.',
    mistakes: [
      'Leaving out citizenship or work-permit status when applying from abroad, which matters for legal employment.',
      'Sending an English CV to a Russian employer that advertises in Russian.',
      'Writing an unfocused multi-page document; Russian recruiters expect a structured, scannable one to two pages.',
    ],
    faq: [
      {
        q: 'Should a Russian CV include a photo?',
        a: 'It is conventional at most Russian employers and generally expected, though international companies may prefer none. A neutral professional headshot is the safer default for local applications.',
      },
    ],
  },
};

export function getCountryInsight(id: string): CountryInsight | undefined {
  return COUNTRY_INSIGHTS[id];
}

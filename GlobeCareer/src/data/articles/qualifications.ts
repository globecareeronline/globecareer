import type { Article } from './types';

/**
 * Qualifications cluster.
 *
 * These two articles answer the highest-volume non-brand questions in the
 * SEMrush export that GlobeCareer did not yet cover: the EQF scale (four
 * separate keywords, ~840 combined monthly volume) and the Diploma Supplement.
 * Both are factual reference topics, so the content sticks to what the
 * framework itself says and sends readers to the official body for a personal
 * determination instead of guessing a level for them.
 */
export const QUALIFICATION_ARTICLES: Article[] = [
  {
    slug: 'eqf-levels-explained',
    cluster: 'qualifications',
    h1: 'EQF Levels Explained: What Each of the 8 Levels Means on a CV',
    seoTitle: 'EQF Levels Explained: The 8 Levels and What They Mean on a CV',
    description:
      'What the European Qualifications Framework actually measures, how levels 1 to 8 differ, and how to state your EQF level on a CV without overclaiming.',
    primaryKeyword: 'eqf levels',
    keywords: ['eqf', 'eqf level meaning', 'level in eqf', 'european qualifications framework', 'eqf level 6'],
    intent: 'informational',
    published: '2026-11-20',
    updated: '2026-11-20',
    readingMinutes: 9,
    keyTakeaways: [
      'The EQF is an 8-level translation grid, not a qualification in itself.',
      'Each level is described by three strands: knowledge, skills, and responsibility & autonomy.',
      'Your level is set by your national qualifications framework, not by the EQF directly.',
      'State the level on a CV only when the employer or the framework has confirmed it.',
    ],
    intro: [
      'If you have ever applied for a job in another European country, you have probably met a line like "EQF level 6 required" and wondered whether that includes you. The European Qualifications Framework is one of the most quoted and least explained pieces of paperwork in European hiring.',
      'This guide covers what the EQF is, what separates its eight levels, how a level is actually assigned, and how to put it on a CV without turning it into a claim you cannot support.',
    ],
    sections: [
      {
        id: 'what-it-is',
        heading: 'What the European Qualifications Framework is',
        paragraphs: [
          'The EQF is a reference framework that links national qualification systems to a single scale of eight levels. It was established by a European recommendation in 2008 and revised in 2017. Its job is translation: it lets a German Ausbildung, an Italian laurea and a Polish licencjat be compared on shared descriptions rather than on job titles or years of study.',
          'Two consequences follow, and both matter when you write a CV. First, the EQF does not award anything. Nobody holds "an EQF level". You hold a qualification, and that qualification has been placed at a level within your national framework. Second, the EQF is not a ranking of prestige. A level describes what a person can do, not how selective the course was.',
        ],
        callout: {
          title: 'The short version',
          body: 'Your national qualifications framework assigns the level. The EQF is the shared vocabulary that makes that level readable in another country.',
          tone: 'info',
        },
      },
      {
        id: 'three-strands',
        heading: 'The three strands behind every level',
        paragraphs: [
          'Each EQF level is written as a set of learning outcomes along three strands. Understanding the strands is more useful than memorising the level numbers, because recruiters in practice care about the behaviour, not the digit.',
        ],
        bullets: [
          'Knowledge: whether it is basic general knowledge, factual and theoretical knowledge in a field, or knowledge at the frontier of a discipline.',
          'Skills: whether they are basic cognitive and practical skills, a range of methods used with some independence, or specialised problem-solving skills that generate new approaches.',
          'Responsibility and autonomy: whether work is done under direct supervision, with some autonomy inside predictable contexts, or with full accountability for decisions in unpredictable professional contexts.',
        ],
      },
      {
        id: 'the-eight-levels',
        heading: 'The eight levels at a glance',
        paragraphs: [
          'The table below paraphrases the official level descriptors into CV language. It describes the level, not the credential, so read it as "what this person can be trusted to do".',
        ],
        table: {
          caption: 'EQF levels described in practical terms',
          headers: ['Level', 'Knowledge and skills', 'Autonomy', 'Typical reference point'],
          rows: [
            ['1', 'Basic general knowledge; simple tasks under instruction', 'Works under direct supervision', 'Basic literacy and numeracy programmes'],
            ['2', 'Basic factual knowledge of a field; use of simple rules and tools', 'Some autonomy within a structured task', 'Lower secondary or short introductory training'],
            ['3', 'Factual and procedural knowledge; selects and applies basic methods', 'Takes responsibility for completing routine tasks', 'Upper secondary vocational or general education'],
            ['4', 'Factual and theoretical knowledge in broad contexts; range of cognitive and practical skills', 'Self-directed work within defined parameters; supervises routine work of others', 'Post-secondary vocational training, technical diplomas'],
            ['5', 'Comprehensive, specialised factual and theoretical knowledge; creative problem solving', 'Manages own work and reviews others within a defined scope', 'Short-cycle higher education, advanced technical qualifications'],
            ['6', 'Advanced knowledge in a field including critical understanding of theories; mastery of methods', 'Manages complex technical or professional activities; takes decisions in unpredictable contexts', 'Bachelor-level higher education'],
            ['7', 'Highly specialised knowledge at the frontier of a field; critical awareness and research skills', 'Manages complex, unpredictable work; leads and transforms practice', 'Master-level higher education'],
            ['8', 'Knowledge at the most advanced frontier of a field', 'Demonstrates sustained authority, innovation and autonomy in professional practice', 'Doctoral-level qualifications'],
          ],
        },
        callout: {
          title: 'Read the reference point as a signpost, not a rule',
          body: 'National frameworks place qualifications differently. A bachelor degree is usually placed at level 6 and a master at level 7 across most European frameworks, but the authoritative placement is the one published by your national framework body. Verify it there before putting a number on a CV.',
          tone: 'warning',
        },
      },
      {
        id: 'how-to-find-yours',
        heading: 'How to find your own level',
        steps: [
          'Identify the exact name of your qualification as printed on the certificate, including the awarding body.',
          'Open your country\'s national qualifications framework register and search for that qualification. Most EU member states publish one.',
          'If your country has no public register, ask the awarding institution. They usually know where their own programmes sit.',
          'For a foreign qualification being assessed abroad, use the national information centre for academic recognition (the ENIC-NARIC network) rather than guessing from the level table.',
          'Check whether your Diploma Supplement states a level. When it does, that statement is the citable source.',
        ],
      },
      {
        id: 'on-a-cv',
        heading: 'Where the level belongs on a CV',
        paragraphs: [
          'The EQF level is supporting detail, not a headline. It belongs in the education block, attached to the qualification it describes, and only where the reader is likely to need the translation. On a CV sent to a German employer by a candidate educated in Spain, "Licenciatura (EQF level 6 equivalent)" removes a lot of guesswork. On a CV sent within your own country, the same note is noise.',
        ],
        bullets: [
          'Place it directly after the qualification, in brackets or after a dash: "BSc Economics — EQF level 6".',
          'Use "equivalent to" when you are relying on a comparison rather than a published placement.',
          'Never put an EQF level in your headline or profile summary. It looks like a certificate number, not a competence.',
          'If the job advert specifies a level, echo that level explicitly in the education block so a keyword search finds it.',
        ],
        callout: {
          title: 'One honest line beats a confident guess',
          body: '"BSc Computer Science (placed at EQF level 6 in the Polish framework)" is verifiable. "EQF 7 equivalent" when nobody has assessed your qualification is the kind of line that falls apart at interview.',
          tone: 'warning',
        },
      },
      {
        id: 'mistakes',
        heading: 'Five mistakes that undermine the claim',
        bullets: [
          'Treating the EQF as a certificate you can be awarded. It is a comparison scale.',
          'Assuming more years of study always means a higher level. The level describes outcomes, and a long vocational programme can sit at level 5 while a three-year academic degree sits at 6.',
          'Converting a non-European credential by eye. Recognition bodies do this professionally, and their statement carries weight.',
          'Using the EQF level instead of describing what you can do. The descriptor strands are the substance; the number is a label.',
          'Copying a level from a job board listing. Listings frequently round up.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is an EQF level the same as a CEFR level?',
        a: 'No. The EQF covers qualifications across all fields. CEFR (A1 to C2) covers language proficiency only. A CV normally shows CEFR levels for languages and may show an EQF level for a degree.',
      },
      {
        q: 'What EQF level is a bachelor degree?',
        a: 'In most European national frameworks a bachelor-level qualification is placed at level 6 and a master at level 7. Confirm the placement for your specific qualification and country in the national framework register before stating it.',
      },
      {
        q: 'Do employers actually check EQF levels?',
        a: 'Rarely as a number. The number is most useful when a job advert uses it as a filter or when your qualification is from another country. The practical value is faster recognition, not prestige.',
      },
      {
        q: 'Does the UK use EQF levels?',
        a: 'The UK developed its own frameworks (RQF in England, SCQF in Scotland) and left the EQF after Brexit. Comparisons still exist, but state the national framework you are citing so the reader knows what the number means.',
      },
      {
        q: 'Where do I put an EQF level if I have no degree?',
        a: 'Attach it to whichever qualification you do hold — a vocational diploma at level 4 or 5 is a meaningful, honest signal. There is no requirement to have a university degree to state a level.',
      },
    ],
    related: ['diploma-supplement-explained', 'european-cv-template', 'eu-cv-format-vs-us-resume'],
    cta: {
      heading: 'Put your qualification where a recruiter will find it',
      body: 'The GlobeCareer CV builder has education and certification blocks that keep your qualification, its level and its awarding body together, so a reader in another country can verify what you claim at a glance.',
      label: 'Build your CV free',
      page: 'builder',
    },
  },

  {
    slug: 'diploma-supplement-explained',
    cluster: 'qualifications',
    h1: 'Diploma Supplement: What It Is, What It Contains, and When to Attach It',
    seoTitle: 'Diploma Supplement Explained: Contents, Purpose and When to Send It',
    description:
      'A practical explanation of the Diploma Supplement: the eight sections it contains, what it does not do, who issues it, and when a recruiter actually needs it.',
    primaryKeyword: 'diploma supplement',
    keywords: ['degree supplement', 'diploma supplement meaning', 'what is a diploma supplement', 'diploma supplement vs transcript'],
    intent: 'informational',
    published: '2026-11-20',
    updated: '2026-11-20',
    readingMinutes: 8,
    keyTakeaways: [
      'The Diploma Supplement explains a degree in plain language for readers outside the awarding country.',
      'It is issued by the higher education institution, normally free, and follows a common eight-section template.',
      'It does not replace the degree certificate and it is not a qualification in its own right.',
      'Attach it for foreign applications and recognition procedures; skip it for domestic ones.',
    ],
    intro: [
      'Most graduates have a Diploma Supplement folded into the back of their certificate folder and no clear idea what it is for. Some have never received one at all, because issuing it is a convention rather than a universal obligation.',
      'This guide explains what the document contains, what it deliberately does not do, and the situations in which sending it actually helps your application.',
    ],
    sections: [
      {
        id: 'definition',
        heading: 'What a Diploma Supplement is',
        paragraphs: [
          'A Diploma Supplement is a document issued alongside a higher education qualification that describes that qualification in a standard format a reader in another country can interpret. The template was developed jointly by the European Commission, the Council of Europe and UNESCO/CEPES, and it is used well beyond the EU.',
          'The format matters more than the wording. Because every supplement is organised the same way, an admissions officer in one country can find "level of the qualification" or "access to further study" in the same place on every document they receive. That is the entire point: comparability without translation guesswork.',
        ],
      },
      {
        id: 'contents',
        heading: 'The eight sections, and what each one earns you',
        table: {
          caption: 'What the standard supplement contains',
          headers: ['Section', 'Content', 'Why it matters to a reader'],
          rows: [
            ['1. Holder of the qualification', 'Name, date of birth, student identification', 'Ties the document to a person'],
            ['2. Qualification', 'Exact title, awarding institution, language of instruction', 'Confirms what was actually awarded and where'],
            ['3. Level of the qualification', 'Level in the national framework and the corresponding EQF/EHEA level', 'Answers the "is this a bachelor or a master" question'],
            ['4. Contents and results', 'Modules, credits, grades, grading scale explanation', 'Shows substance, not just the title'],
            ['5. Function of the qualification', 'Access to further study and professional status', 'Explains what the degree entitles the holder to do'],
            ['6. Additional information', 'Regulations, additional sources, institutional details', 'Context for unusual programmes'],
            ['7. Certification', 'Signature, stamp, date, official capacity', 'Makes it a certified document rather than a printout'],
            ['8. National higher education system', 'A short description of the country system', 'Interprets the level for a foreign reader'],
          ],
        },
      },
      {
        id: 'not-a-degree',
        heading: 'What it is not',
        bullets: [
          'It is not a second degree. It has no independent standing; if the qualification is not recognised, the supplement does not change that.',
          'It is not a certified translation of the degree certificate. It is issued in a language of the institution, often with an English version, but it is a description, not a translation service.',
          'It is not a transcript, though section 4 overlaps with one. A transcript lists what you took and what you scored; the supplement also explains what the qualification is worth.',
          'It is not the same document as a Europass certificate supplement, which is the equivalent tool for vocational qualifications.',
        ],
        callout: {
          title: 'Which document answers which question',
          body: 'Certificate: did this person graduate? Transcript: what did they study and how did they perform? Diploma Supplement: what is this qualification equivalent to, and what does it allow?',
          tone: 'info',
        },
      },
      {
        id: 'when-to-attach',
        heading: 'When to attach it, and when to leave it out',
        paragraphs: [
          'A supplement is a supporting document. It belongs in the application pack, not on the CV itself, and only when the reader lacks the context to interpret your qualification.',
        ],
        bullets: [
          'Attach it when applying outside the country that awarded the degree, especially to employers who do not recognise the institution.',
          'Attach it for formal recognition procedures, regulated professions, further study applications and public-sector recruitment that grades qualifications.',
          'Attach it when a job advert specifies a qualification level and your degree title does not make the level obvious.',
          'Leave it out for domestic applications where the reader recognises the institution and the title.',
          'Leave it out of the first speculative contact. A three-page supplement attached to an unsolicited email is more likely to be ignored than read.',
        ],
      },
      {
        id: 'how-to-get',
        heading: 'How to obtain one if you never received it',
        steps: [
          'Contact the registrar or examinations office of the awarding institution, not the department. They issue these documents.',
          'Ask specifically for the Diploma Supplement for your programme and graduation year, and say whether you need it in English.',
          'Expect it to be free or handled for a small administrative fee. Most institutions issue it at no cost to the graduate.',
          'If the institution no longer exists, ask the national ministry or the successor institution that holds the records.',
          'Check the document when it arrives: sections 3 and 7 must be completed and certified. A supplement with an empty level section is not doing its job.',
        ],
      },
      {
        id: 'on-cv',
        heading: 'Referring to it on the CV',
        paragraphs: [
          'Do not list the Diploma Supplement as an achievement. It is not one, and listing it next to real qualifications reads as padding. Instead, add a short line in the education block or the application email: "Diploma Supplement available on request."',
          'If a portal has a field for supporting documents, upload it there and move on. The document does the work quietly, which is exactly what a reference document should do.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is the Diploma Supplement mandatory?',
        a: 'It is a widely adopted convention rather than a universal legal requirement. Many European institutions issue one automatically with every higher education qualification; others issue it only on request. Ask your institution what applies to your programme.',
      },
      {
        q: 'Does it cost anything?',
        a: 'Usually not. Most institutions issue it free to their own graduates, sometimes with a small fee for additional copies or certified translations. Ask before paying anyone else to produce one.',
      },
      {
        q: 'Is a Diploma Supplement the same as an equivalency statement?',
        a: 'No. The supplement describes your qualification using a standard template. An equivalency or recognition statement is a formal decision by an authority that your foreign qualification is equivalent to a national one. The supplement usually supports that decision rather than replacing it.',
      },
      {
        q: 'What if my institution does not issue Diploma Supplements?',
        a: 'Send the degree certificate, an official transcript and, for formal procedures, a recognition statement from the national information centre. The supplement is a convenience, not a prerequisite for applying.',
      },
    ],
    related: ['eqf-levels-explained', 'european-cv-template', 'eu-work-visa-us-citizens'],
    cta: {
      heading: 'Keep your education section clean and verifiable',
      body: 'The GlobeCareer builder gives each qualification its own entry with institution, dates and level, so supporting documents slot in without cluttering the page a recruiter actually reads.',
      label: 'Create your CV',
      page: 'builder',
    },
  },
];

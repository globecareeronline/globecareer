import type { OutputCopy } from '../types';

/**
 * English is the reference pack: every frame here reproduces the wording the
 * tools shipped before the multilingual release, so selecting English changes
 * nothing about the generated documents.
 */
export const en: OutputCopy = {
  defaults: {
    strengths: 'exceptional dedication, technical acumen, and exemplary collaboration',
    gratitude:
      'I want to express my sincere appreciation for the mentorship, professional growth opportunities, and collaboration I have experienced during my time with the team.',
    transition:
      'I am fully committed to assisting with the handover of my active projects, documenting key processes, and training team members during my remaining time.',
  },
  headings: {
    summary: 'Professional Summary',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills & Competencies',
    certifications: 'Certifications',
    projects: 'Projects',
    languages: 'Languages',
    references: 'References',
    volunteer: 'Volunteer & Community Leadership',
    interests: 'Interests',
  },
  profile: {
    atCompany: ' at {company}',
    expYears: 'over {years} years of experience',
    expDefault: 'extensive industry experience',
    skillsDefault: 'strategic leadership and technical innovation',
    tone: {
      professional: 'a track record of measurable results',
      executive: 'a focus on high-impact organisational transformation',
      creative: 'a commitment to meaningful, well-crafted work',
      friendly: 'an approachable, collaborative working style',
      academic: 'a foundation in rigorous research and analysis',
    },
    shortFirst: 'I am a {role}{atCompany} with {exp} and {tone}.',
    shortThird: '{name} is a {role}{atCompany} with {exp} and {tone}.',
    mediumFirst:
      'I am a {role}{atCompany} with {exp}, specializing in {skills}, with {tone}{achievement}.{education}',
    mediumThird:
      '{name} is a {role}{atCompany} with {exp}, specializing in {skills}, with {tone}{achievement}.{education}',
    extended: 'Beyond professional work, {personal}.',
    achievementLead: ', including {achievement}',
    educationLead: ' Education and credentials include {education}.',
  },
  summary: {
    metrics:
      'Results-driven {role} with {years} years of experience across {industry}. Strengths span {skills}.{achievement}',
    leadership:
      'Strategic {role} with {years} years of experience in {industry}, leading multidisciplinary teams and improving processes. Proficient in {skills}{achievement}.',
    concise: 'Performance-focused {role} with {years} years of experience in {skills}.{achievement}',
    objective:
      'Motivated {role} seeking an opportunity in {industry} to apply proven strengths in {skills}.{achievement}',
  },
  letter: {
    salutation: 'Dear Hiring Team,',
    signoff: 'Sincerely,',
    subject: 'Subject: Application for {role}',
    opening: 'I am writing to apply for the {role} position at {company}.',
    body:
      'My background in {skills} aligns closely with the requirements of this role, and I am confident I can contribute from the first month.',
    closing:
      'Thank you for your time and consideration. I would welcome the opportunity to discuss my application with you.',
  },
  resignation: {
    salutation: 'Dear {manager},',
    signoff: 'Sincerely,',
    twoWeeks:
      'Please accept this letter as formal notification that I am resigning from my position as {role} with {company}. In accordance with my notice period, my final working day will be {lastDay}.',
    shortNotice:
      'Please accept this letter as formal notification that I am resigning from my position as {role} with {company}. My last day of employment will be {lastDay}.',
    immediate:
      'Please accept this letter as formal notification that I am resigning from my position as {role} with {company}, effective immediately.',
    relocation:
      'Please accept this letter as formal notification that I am resigning from my position as {role} with {company}. Due to an upcoming relocation, my final day of employment will be {lastDay}.',
    retirement:
      'Please accept this letter as notification of my formal retirement from my position as {role} with {company}, effective {lastDay}.',
    closing:
      'I wish you, the team, and the company continued success. Please let me know how I can assist with the handover before my departure.',
  },
  recommendation: {
    salutation: 'Dear {recipient},',
    signoff: 'Sincerely,',
    opening:
      'I am writing to recommend {candidate} for the position of {targetRole} at {targetOrg}. As {relationship} at {org} for {years} years, I have followed their work at close range.',
    skills: 'During that time {candidate} consistently demonstrated {strengths}.',
    achievements: 'Notable contributions include {achievements}.',
    character:
      'Beyond technical ability, {candidate} communicates with empathy, upholds high ethical standards, and welcomes constructive feedback.',
    closing:
      'I recommend {candidate} without reservation and am glad to provide further detail on request.',
  },
  email: {
    greeting: 'Dear {recipient},',
    subject: 'Application: {role} – {name}',
    intro: 'I am writing to apply for the {role} position at {company}.',
    value:
      'My experience in {skills} matches what this role requires, and I can contribute from the first month.',
    request:
      'I would welcome the opportunity to discuss how my experience fits your current needs. Thank you for your consideration.',
    attachment: 'I have attached my resume for your review.',
    signoff: 'Sincerely,',
  },
  bullets: {
    verbFirst: '{verb} {task}, {metric}.',
    metricFirst: '{metric} by {verb} {task}.',
    methodFirst: '{verb} {task} {method}, {metric}.',
    concise: '{verb} {task}.',
  },
};

export const es: OutputCopy = {
  defaults: {
    strengths: 'una dedicación excepcional, solidez técnica y una colaboración ejemplar',
    gratitude:
      'Quiero expresar mi sincero agradecimiento por la mentoría, las oportunidades de desarrollo profesional y la colaboración que he vivido durante mi etapa en el equipo.',
    transition:
      'Me comprometo a facilitar el traspaso de mis proyectos activos, documentar los procesos clave y formar a los miembros del equipo durante mi tiempo restante.',
  },
  headings: {
    summary: 'Resumen profesional',
    experience: 'Experiencia laboral',
    education: 'Formación académica',
    skills: 'Competencias y habilidades',
    certifications: 'Certificaciones',
    projects: 'Proyectos',
    languages: 'Idiomas',
    references: 'Referencias',
    volunteer: 'Voluntariado y liderazgo comunitario',
    interests: 'Intereses',
  },
  profile: {
    atCompany: ' en {company}',
    expYears: 'más de {years} años de experiencia',
    expDefault: 'una amplia experiencia en el sector',
    skillsDefault: 'liderazgo estratégico e innovación técnica',
    tone: {
      professional: 'un historial de resultados medibles',
      executive: 'un enfoque en la transformación organizativa de alto impacto',
      creative: 'un compromiso con un trabajo creativo y cuidado',
      friendly: 'un estilo de trabajo cercano y colaborativo',
      academic: 'una base de rigor investigativo y analítico',
    },
    shortFirst: 'Soy {role}{atCompany} con {exp} y {tone}.',
    shortThird: '{name} es {role}{atCompany} con {exp} y {tone}.',
    mediumFirst:
      'Soy {role}{atCompany} con {exp}, especializado en {skills}, con {tone}{achievement}.{education}',
    mediumThird:
      '{name} es {role}{atCompany} con {exp}, especializado en {skills}, con {tone}{achievement}.{education}',
    extended: 'Fuera del ámbito profesional, {personal}.',
    achievementLead: ', incluido {achievement}',
    educationLead: ' Su formación incluye {education}.',
  },
  summary: {
    metrics:
      '{role} orientado a resultados con {years} años de experiencia en {industry}. Mis competencias abarcan {skills}.{achievement}',
    leadership:
      '{role} estratégico con {years} años de experiencia en {industry}, liderando equipos multidisciplinares y mejorando procesos. Dominio de {skills}{achievement}.',
    concise:
      '{role} centrado en el rendimiento con {years} años de experiencia en {skills}.{achievement}',
    objective:
      '{role} motivado que busca una oportunidad en {industry} para aplicar sus fortalezas en {skills}.{achievement}',
  },
  letter: {
    salutation: 'Estimado equipo de selección:',
    signoff: 'Atentamente,',
    subject: 'Asunto: Candidatura al puesto de {role}',
    opening: 'Me dirijo a ustedes para presentar mi candidatura al puesto de {role} en {company}.',
    body:
      'Mi experiencia en {skills} encaja con los requisitos del puesto y estoy convencido de que puedo aportar valor desde el primer mes.',
    closing:
      'Gracias por su tiempo y consideración. Quedo a su disposición para ampliar cualquier información.',
  },
  resignation: {
    salutation: 'Estimado/a {manager}:',
    signoff: 'Atentamente,',
    twoWeeks:
      'Por medio de la presente le comunico mi dimisión del puesto de {role} en {company}. De acuerdo con el plazo de preaviso, mi último día de trabajo será el {lastDay}.',
    shortNotice:
      'Por medio de la presente le comunico mi dimisión del puesto de {role} en {company}. Mi último día de trabajo será el {lastDay}.',
    immediate:
      'Por medio de la presente le comunico mi dimisión del puesto de {role} en {company}, con efecto inmediato.',
    relocation:
      'Por medio de la presente le comunico mi dimisión del puesto de {role} en {company}. Debido a un traslado, mi último día de trabajo será el {lastDay}.',
    retirement:
      'Por medio de la presente le comunico mi jubilación del puesto de {role} en {company}, con efecto el {lastDay}.',
    closing:
      'Le deseo al equipo y a la empresa mucho éxito. Quedo a su disposición para facilitar el traspaso de mis tareas.',
  },
  recommendation: {
    salutation: 'Estimado/a {recipient}:',
    signoff: 'Atentamente,',
    opening:
      'Me complace recomendar a {candidate} para el puesto de {targetRole} en {targetOrg}. Como {relationship} en {org} durante {years} años, he seguido de cerca su trabajo.',
    skills: 'Durante ese periodo, {candidate} demostró {strengths}.',
    achievements: 'Entre sus logros destacan {achievements}.',
    character:
      'Además de su capacidad técnica, {candidate} se comunica con empatía, mantiene altos estándares éticos y acepta las críticas constructivas.',
    closing:
      'Recomiendo a {candidate} sin reservas y estaré encantado de ampliar la información si es necesario.',
  },
  email: {
    greeting: 'Estimado/a {recipient}:',
    subject: 'Candidatura: {role} – {name}',
    intro: 'Me pongo en contacto para presentar mi candidatura al puesto de {role} en {company}.',
    value:
      'Mi experiencia en {skills} se ajusta a lo que requiere el puesto y puedo aportar desde el primer mes.',
    request:
      'Agradecería la oportunidad de comentar cómo mi experiencia encaja en sus necesidades actuales. Gracias por su consideración.',
    attachment: 'Adjunto mi currículum para su revisión.',
    signoff: 'Atentamente,',
  },
  bullets: {
    verbFirst: '{verb} {task}, {metric}.',
    metricFirst: '{metric} al {verb} {task}.',
    methodFirst: '{verb} {task} {method}, {metric}.',
    concise: '{verb} {task}.',
  },
};

export const fr: OutputCopy = {
  defaults: {
    strengths: "un engagement exceptionnel, une solide compétence technique et une collaboration exemplaire",
    gratitude:
      "Je souhaite exprimer ma sincère reconnaissance pour le mentorat, les possibilités de progression professionnelle et la collaboration que j'ai connus au sein de l'équipe.",
    transition:
      "Je m'engage à faciliter la transmission de mes projets en cours, à documenter les processus clés et à former les membres de l'équipe pendant le temps qui me reste.",
  },
  headings: {
    summary: 'Profil professionnel',
    experience: 'Expérience professionnelle',
    education: 'Formation',
    skills: 'Compétences',
    certifications: 'Certifications',
    projects: 'Projets',
    languages: 'Langues',
    references: 'Références',
    volunteer: 'Bénévolat et engagement associatif',
    interests: "Centres d'intérêt",
  },
  profile: {
    atCompany: ' chez {company}',
    expYears: "plus de {years} ans d'expérience",
    expDefault: 'une solide expérience sectorielle',
    skillsDefault: 'leadership stratégique et innovation technique',
    tone: {
      professional: 'des résultats mesurables',
      executive: 'une approche de la transformation organisationnelle à fort impact',
      creative: 'un engagement envers un travail créatif et soigné',
      friendly: 'un style de travail collaboratif et accessible',
      academic: 'une base de rigueur scientifique et analytique',
    },
    shortFirst: 'Je suis {role}{atCompany}, avec {exp} et {tone}.',
    shortThird: '{name} est {role}{atCompany}, avec {exp} et {tone}.',
    mediumFirst:
      'Je suis {role}{atCompany}, avec {exp}, spécialisé en {skills}, avec {tone}{achievement}.{education}',
    mediumThird:
      '{name} est {role}{atCompany}, avec {exp}, spécialisé en {skills}, avec {tone}{achievement}.{education}',
    extended: 'En dehors du travail, {personal}.',
    achievementLead: ', notamment {achievement}',
    educationLead: ' Sa formation comprend {education}.',
  },
  summary: {
    metrics:
      '{role} orienté résultats, avec {years} ans d’expérience dans {industry}. Mes compétences couvrent {skills}.{achievement}',
    leadership:
      '{role} stratégique avec {years} ans d’expérience dans {industry}, à la tête d’équipes pluridisciplinaires et de projets d’amélioration. Maîtrise de {skills}{achievement}.',
    concise:
      '{role} axé sur la performance avec {years} ans d’expérience en {skills}.{achievement}',
    objective:
      '{role} motivé, à la recherche d’une opportunité dans {industry} pour mettre à profit ses compétences en {skills}.{achievement}',
  },
  letter: {
    salutation: 'Madame, Monsieur,',
    signoff: 'Cordialement,',
    subject: 'Objet : candidature au poste : {role}',
    opening: 'Je vous adresse ma candidature au poste : {role} chez {company}.',
    body:
      'Mon expérience en {skills} correspond aux exigences du poste et je suis convaincu de pouvoir contribuer dès le premier mois.',
    closing:
      'Je vous remercie de votre attention et reste à votre disposition pour tout complément d’information.',
  },
  resignation: {
    salutation: 'Madame, Monsieur,',
    signoff: 'Cordialement,',
    twoWeeks:
      'Par la présente, je vous informe de ma démission du poste : {role} chez {company}. Conformément à mon préavis, mon dernier jour de travail sera le {lastDay}.',
    shortNotice:
      'Par la présente, je vous informe de ma démission du poste : {role} chez {company}. Mon dernier jour de travail sera le {lastDay}.',
    immediate:
      'Par la présente, je vous informe de ma démission du poste : {role} chez {company}, avec effet immédiat.',
    relocation:
      'Par la présente, je vous informe de ma démission du poste : {role} chez {company}. En raison d’une expatriation, mon dernier jour de travail sera le {lastDay}.',
    retirement:
      'Par la présente, je vous informe de mon départ à la retraite du poste : {role} chez {company}, à effet du {lastDay}.',
    closing:
      'Je vous souhaite, ainsi qu’à l’équipe et à l’entreprise, une pleine réussite. Je reste disponible pour faciliter la transmission de mes dossiers.',
  },
  recommendation: {
    salutation: 'Madame, Monsieur,',
    signoff: 'Cordialement,',
    opening:
      'Je recommande avec plaisir {candidate} pour le poste de {targetRole} au sein de {targetOrg}. En tant que {relationship} chez {org} pendant {years} ans, j’ai suivi son travail de près.',
    skills: 'Pendant cette période, {candidate} a fait preuve de {strengths}.',
    achievements: 'Ses réalisations notables incluent {achievements}.',
    character:
      'Au-delà de ses compétences techniques, {candidate} communique avec empathie, respecte des exigences éthiques élevées et accueille les retours constructifs.',
    closing:
      'Je recommande {candidate} sans réserve et me tiens à votre disposition pour tout complément.',
  },
  email: {
    greeting: 'Bonjour {recipient},',
    subject: 'Candidature : {role} – {name}',
    intro: 'Je vous contacte pour présenter ma candidature au poste : {role} chez {company}.',
    value:
      'Mon expérience en {skills} correspond aux attentes du poste et je peux contribuer dès le premier mois.',
    request:
      'Je serais ravi d’échanger sur la manière dont mon expérience répond à vos besoins actuels. Merci de votre attention.',
    attachment: 'Vous trouverez mon CV en pièce jointe.',
    signoff: 'Cordialement,',
  },
  bullets: {
    verbFirst: '{verb} {task}, {metric}.',
    metricFirst: '{metric}, obtenu en {verb} {task}.',
    methodFirst: '{verb} {task} {method}, {metric}.',
    concise: '{verb} {task}.',
  },
};

export const it: OutputCopy = {
  defaults: {
    strengths: 'una dedizione eccezionale, solide competenze tecniche e una collaborazione esemplare',
    gratitude:
      'Desidero esprimere la mia sincera gratitudine per il tutoraggio, le opportunità di crescita professionale e la collaborazione vissuta nel team.',
    transition:
      'Mi impegno a facilitare il passaggio dei miei progetti in corso, a documentare i processi chiave e a formare i colleghi nel tempo che mi resta.',
  },
  headings: {
    summary: 'Profilo professionale',
    experience: 'Esperienza professionale',
    education: 'Formazione',
    skills: 'Competenze',
    certifications: 'Certificazioni',
    projects: 'Progetti',
    languages: 'Lingue',
    references: 'Referenze',
    volunteer: 'Volontariato e impegno sociale',
    interests: 'Interessi',
  },
  profile: {
    atCompany: ' presso {company}',
    expYears: 'oltre {years} anni di esperienza',
    expDefault: 'una solida esperienza nel settore',
    skillsDefault: 'leadership strategica e innovazione tecnica',
    tone: {
      professional: 'risultati misurabili',
      executive: 'un approccio alla trasformazione organizzativa ad alto impatto',
      creative: 'un impegno per un lavoro creativo e curato',
      friendly: 'uno stile di lavoro collaborativo e accessibile',
      academic: 'una solida base di rigore scientifico e analitico',
    },
    shortFirst: 'Sono {role}{atCompany}, con {exp} e {tone}.',
    shortThird: '{name} è {role}{atCompany}, con {exp} e {tone}.',
    mediumFirst:
      'Sono {role}{atCompany}, con {exp}, specializzato in {skills}, con {tone}{achievement}.{education}',
    mediumThird:
      '{name} è {role}{atCompany}, con {exp}, specializzato in {skills}, con {tone}{achievement}.{education}',
    extended: 'Al di fuori del lavoro, {personal}.',
    achievementLead: ', tra cui {achievement}',
    educationLead: ' La formazione comprende {education}.',
  },
  summary: {
    metrics:
      '{role} orientato ai risultati con {years} anni di esperienza in {industry}. Le competenze comprendono {skills}.{achievement}',
    leadership:
      '{role} strategico con {years} anni di esperienza in {industry}, alla guida di team multidisciplinari e di progetti di miglioramento dei processi. Padronanza di {skills}{achievement}.',
    concise:
      '{role} orientato alla performance con {years} anni di esperienza in {skills}.{achievement}',
    objective:
      '{role} motivato che cerca un’opportunità in {industry} per applicare le proprie competenze in {skills}.{achievement}',
  },
  letter: {
    salutation: 'Gentile Responsabile delle Risorse Umane,',
    signoff: 'Cordiali saluti,',
    subject: 'Oggetto: Candidatura per la posizione di {role}',
    opening: 'Vi scrivo per candidarmi alla posizione di {role} presso {company}.',
    body:
      'La mia esperienza in {skills} corrisponde ai requisiti del ruolo e sono certo di poter contribuire già dal primo mese.',
    closing:
      'Vi ringrazio per il tempo dedicato e resto a disposizione per ogni ulteriore informazione.',
  },
  resignation: {
    salutation: 'Gentile {manager},',
    signoff: 'Cordiali saluti,',
    twoWeeks:
      'Con la presente rassegno le mie dimissioni dalla posizione di {role} presso {company}. Nel rispetto del periodo di preavviso, il mio ultimo giorno di lavoro sarà il {lastDay}.',
    shortNotice:
      'Con la presente rassegno le mie dimissioni dalla posizione di {role} presso {company}. Il mio ultimo giorno di lavoro sarà il {lastDay}.',
    immediate:
      'Con la presente rassegno le mie dimissioni dalla posizione di {role} presso {company}, con effetto immediato.',
    relocation:
      'Con la presente rassegno le mie dimissioni dalla posizione di {role} presso {company}. A causa di un trasferimento, il mio ultimo giorno di lavoro sarà il {lastDay}.',
    retirement:
      'Con la presente comunico il mio pensionamento dalla posizione di {role} presso {company}, con effetto dal {lastDay}.',
    closing:
      'Auguro a lei, al team e all’azienda ogni successo. Resto a disposizione per agevolare il passaggio delle consegne.',
  },
  recommendation: {
    salutation: 'Gentile {recipient},',
    signoff: 'Cordiali saluti,',
    opening:
      'Raccomando con piacere {candidate} per la posizione di {targetRole} presso {targetOrg}. Come {relationship} in {org} per {years} anni, ho seguito da vicino il suo lavoro.',
    skills: 'In questo periodo {candidate} ha dimostrato {strengths}.',
    achievements: 'Tra i risultati più rilevanti figurano {achievements}.',
    character:
      'Oltre alle competenze tecniche, {candidate} comunica con empatia, rispetta elevati standard etici e accoglie con apertura i feedback.',
    closing:
      'Raccomando {candidate} senza riserve e sono disponibile a fornire ulteriori dettagli.',
  },
  email: {
    greeting: 'Gentile {recipient},',
    subject: 'Candidatura: {role} – {name}',
    intro: 'Le scrivo per candidarmi alla posizione di {role} presso {company}.',
    value:
      'La mia esperienza in {skills} corrisponde a quanto richiesto dal ruolo e posso contribuire già dal primo mese.',
    request:
      'Sarei felice di approfondire come la mia esperienza risponda alle vostre esigenze attuali. Grazie per la considerazione.',
    attachment: 'Allego il mio curriculum per la vostra valutazione.',
    signoff: 'Cordiali saluti,',
  },
  bullets: {
    verbFirst: '{verb} {task}, {metric}.',
    metricFirst: '{metric}, ottenuto {verb} {task}.',
    methodFirst: '{verb} {task} {method}, {metric}.',
    concise: '{verb} {task}.',
  },
};

export const pt: OutputCopy = {
  defaults: {
    strengths: 'dedicação excecional, solidez técnica e colaboração exemplar',
    gratitude:
      'Quero expressar o meu sincero agradecimento pela orientação, pelas oportunidades de desenvolvimento profissional e pela colaboração que vivi na equipa.',
    transition:
      'Comprometo-me a facilitar a transição dos meus projetos em curso, a documentar os processos essenciais e a formar os membros da equipa durante o tempo que resta.',
  },
  headings: {
    summary: 'Resumo profissional',
    experience: 'Experiência profissional',
    education: 'Formação académica',
    skills: 'Competências',
    certifications: 'Certificações',
    projects: 'Projetos',
    languages: 'Idiomas',
    references: 'Referências',
    volunteer: 'Voluntariado e participação comunitária',
    interests: 'Interesses',
  },
  profile: {
    atCompany: ' na {company}',
    expYears: 'mais de {years} anos de experiência',
    expDefault: 'ampla experiência no setor',
    skillsDefault: 'liderança estratégica e inovação técnica',
    tone: {
      professional: 'resultados mensuráveis',
      executive: 'um enfoque na transformação organizacional de alto impacto',
      creative: 'um compromisso com um trabalho criativo e cuidado',
      friendly: 'um estilo de trabalho próximo e colaborativo',
      academic: 'uma base de rigor científico e analítico',
    },
    shortFirst: 'Sou {role}{atCompany}, com {exp} e {tone}.',
    shortThird: '{name} é {role}{atCompany}, com {exp} e {tone}.',
    mediumFirst:
      'Sou {role}{atCompany}, com {exp}, especializado em {skills}, com {tone}{achievement}.{education}',
    mediumThird:
      '{name} é {role}{atCompany}, com {exp}, especializado em {skills}, com {tone}{achievement}.{education}',
    extended: 'Fora do contexto profissional, {personal}.',
    achievementLead: ', incluindo {achievement}',
    educationLead: ' A formação inclui {education}.',
  },
  summary: {
    metrics:
      '{role} orientado a resultados com {years} anos de experiência em {industry}. As competências abrangem {skills}.{achievement}',
    leadership:
      '{role} estratégico com {years} anos de experiência em {industry}, liderando equipas multidisciplinares e melhorando processos. Domínio de {skills}{achievement}.',
    concise:
      '{role} focado no desempenho com {years} anos de experiência em {skills}.{achievement}',
    objective:
      '{role} motivado que procura uma oportunidade em {industry} para aplicar competências em {skills}.{achievement}',
  },
  letter: {
    salutation: 'Exmo./Exma. Responsável de Recrutamento,',
    signoff: 'Com os melhores cumprimentos,',
    subject: 'Assunto: Candidatura à função de {role}',
    opening: 'Venho por este meio candidatar-me à função de {role} na {company}.',
    body:
      'A minha experiência em {skills} corresponde aos requisitos da função e estou confiante de que posso contribuir desde o primeiro mês.',
    closing:
      'Agradeço o tempo e a atenção dispensados e fico ao dispor para qualquer esclarecimento adicional.',
  },
  resignation: {
    salutation: 'Exmo./Exma. {manager},',
    signoff: 'Com os melhores cumprimentos,',
    twoWeeks:
      'Venho por este meio comunicar a minha demissão da função de {role} na {company}. Em conformidade com o período de aviso prévio, o meu último dia de trabalho será {lastDay}.',
    shortNotice:
      'Venho por este meio comunicar a minha demissão da função de {role} na {company}. O meu último dia de trabalho será {lastDay}.',
    immediate:
      'Venho por este meio comunicar a minha demissão da função de {role} na {company}, com efeito imediato.',
    relocation:
      'Venho por este meio comunicar a minha demissão da função de {role} na {company}. Devido a uma mudança de país, o meu último dia de trabalho será {lastDay}.',
    retirement:
      'Venho por este meio comunicar a minha reforma da função de {role} na {company}, com efeito a {lastDay}.',
    closing:
      'Desejo à equipa e à empresa muito sucesso. Fico ao dispor para facilitar a transferência das minhas responsabilidades.',
  },
  recommendation: {
    salutation: 'Exmo./Exma. {recipient},',
    signoff: 'Com os melhores cumprimentos,',
    opening:
      'Recomendo com agrado {candidate} para a função de {targetRole} na {targetOrg}. Como {relationship} na {org} durante {years} anos, acompanhei de perto o seu trabalho.',
    skills: 'Durante esse período, {candidate} demonstrou {strengths}.',
    achievements: 'Entre os resultados mais relevantes constam {achievements}.',
    character:
      'Para além da competência técnica, {candidate} comunica com empatia, mantém elevados padrões éticos e aceita críticas construtivas.',
    closing:
      'Recomendo {candidate} sem reservas e estou disponível para prestar mais informações.',
  },
  email: {
    greeting: 'Exmo./Exma. {recipient},',
    subject: 'Candidatura: {role} – {name}',
    intro: 'Escrevo-lhe para me candidatar à função de {role} na {company}.',
    value:
      'A minha experiência em {skills} corresponde ao que a função exige e posso contribuir desde o primeiro mês.',
    request:
      'Gostaria de conversar sobre a forma como a minha experiência responde às vossas necessidades atuais. Obrigado pela atenção.',
    attachment: 'Envio em anexo o meu currículo para análise.',
    signoff: 'Com os melhores cumprimentos,',
  },
  bullets: {
    verbFirst: '{verb} {task}, {metric}.',
    metricFirst: '{metric} ao {verb} {task}.',
    methodFirst: '{verb} {task} {method}, {metric}.',
    concise: '{verb} {task}.',
  },
};

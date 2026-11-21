import type { OutputCopy } from '../types';

export const de: OutputCopy = {
  defaults: {
    strengths: 'außergewöhnliches Engagement, fachliche Tiefe und beispielhafte Zusammenarbeit',
    gratitude:
      'Ich möchte meine aufrichtige Dankbarkeit für die Mentorschaft, die Möglichkeiten zur beruflichen Weiterentwicklung und die Zusammenarbeit im Team ausdrücken.',
    transition:
      'Ich verpflichte mich, die Übergabe meiner laufenden Projekte zu unterstützen, zentrale Prozesse zu dokumentieren und die Teammitglieder in der verbleibenden Zeit einzuarbeiten.',
  },
  headings: {
    summary: 'Profil',
    experience: 'Berufserfahrung',
    education: 'Ausbildung',
    skills: 'Kenntnisse und Kompetenzen',
    certifications: 'Zertifikate',
    projects: 'Projekte',
    languages: 'Sprachen',
    references: 'Referenzen',
    volunteer: 'Ehrenamt und Engagement',
    interests: 'Interessen',
  },
  profile: {
    atCompany: ' bei {company}',
    expYears: 'über {years} Jahre Erfahrung',
    expDefault: 'umfangreiche Branchenerfahrung',
    skillsDefault: 'strategische Führung und technische Innovation',
    tone: {
      professional: 'nachweisbare Ergebnisse',
      executive: 'einen Fokus auf wirkungsvolle organisatorische Veränderung',
      creative: 'einen Anspruch an sorgfältig gestaltete Arbeit',
      friendly: 'einen kollegialen und zugänglichen Arbeitsstil',
      academic: 'eine Grundlage in wissenschaftlicher Sorgfalt',
    },
    shortFirst: 'Ich bin {role}{atCompany} mit {exp} und {tone}.',
    shortThird: '{name} ist {role}{atCompany} mit {exp} und {tone}.',
    mediumFirst:
      'Ich bin {role}{atCompany} mit {exp}, spezialisiert auf {skills}, mit {tone}{achievement}.{education}',
    mediumThird:
      '{name} ist {role}{atCompany} mit {exp}, spezialisiert auf {skills}, mit {tone}{achievement}.{education}',
    extended: 'Neben der beruflichen Tätigkeit {personal}.',
    achievementLead: ', darunter {achievement}',
    educationLead: ' Die Ausbildung umfasst {education}.',
  },
  summary: {
    metrics:
      'Ergebnisorientierte/r {role} mit {years} Jahren Erfahrung in {industry}. Die Kompetenzen umfassen {skills}.{achievement}',
    leadership:
      'Strategisch arbeitende/r {role} mit {years} Jahren Erfahrung in {industry}, Führung interdisziplinärer Teams und Prozessverbesserung. Sicher im Umgang mit {skills}{achievement}.',
    concise:
      'Leistungsorientierte/r {role} mit {years} Jahren Erfahrung in {skills}.{achievement}',
    objective:
      'Motivierte/r {role} auf der Suche nach einer Aufgabe in {industry}, um Stärken in {skills} einzusetzen.{achievement}',
  },
  letter: {
    salutation: 'Sehr geehrte Damen und Herren,',
    signoff: 'Mit freundlichen Grüßen,',
    subject: 'Betreff: Bewerbung als {role}',
    opening: 'hiermit bewerbe ich mich um die Stelle als {role} bei {company}.',
    body:
      'Meine Erfahrung in {skills} entspricht den Anforderungen der Stelle; ich kann vom ersten Monat an einen Beitrag leisten.',
    closing:
      'Vielen Dank für Ihre Zeit und Aufmerksamkeit. Für Rückfragen stehe ich Ihnen gerne zur Verfügung.',
  },
  resignation: {
    salutation: 'Sehr geehrte/r {manager},',
    signoff: 'Mit freundlichen Grüßen,',
    twoWeeks:
      'hiermit kündige ich meinen Arbeitsvertrag als {role} bei {company} ordentlich. Unter Einhaltung der Kündigungsfrist ist mein letzter Arbeitstag der {lastDay}.',
    shortNotice:
      'hiermit kündige ich meinen Arbeitsvertrag als {role} bei {company}. Mein letzter Arbeitstag ist der {lastDay}.',
    immediate:
      'hiermit kündige ich meinen Arbeitsvertrag als {role} bei {company} fristlos zum heutigen Tag.',
    relocation:
      'hiermit kündige ich meinen Arbeitsvertrag als {role} bei {company}. Aufgrund eines Umzugs ist mein letzter Arbeitstag der {lastDay}.',
    retirement:
      'hiermit erkläre ich meinen Eintritt in den Ruhestand aus meiner Position als {role} bei {company} zum {lastDay}.',
    closing:
      'Ich wünsche Ihnen, dem Team und dem Unternehmen weiterhin viel Erfolg und stehe für die Übergabe meiner Aufgaben gerne zur Verfügung.',
  },
  recommendation: {
    salutation: 'Sehr geehrte/r {recipient},',
    signoff: 'Mit freundlichen Grüßen,',
    opening:
      'hiermit empfehle ich {candidate} für die Position als {targetRole} bei {targetOrg}. Als {relationship} bei {org} über {years} Jahre konnte ich die Arbeit aus nächster Nähe verfolgen.',
    skills: 'In dieser Zeit hat {candidate} {strengths} gezeigt.',
    achievements: 'Zu den wichtigsten Beiträgen zählen {achievements}.',
    character:
      'Neben der fachlichen Kompetenz kommuniziert {candidate} empathisch, handelt ethisch und nimmt Feedback offen auf.',
    closing:
      'Ich empfehle {candidate} ohne Einschränkung und stehe für Rückfragen gerne zur Verfügung.',
  },
  email: {
    greeting: 'Sehr geehrte/r {recipient},',
    subject: 'Bewerbung: {role} – {name}',
    intro: 'hiermit bewerbe ich mich um die Stelle als {role} bei {company}.',
    value:
      'Meine Erfahrung in {skills} entspricht den Anforderungen der Stelle; ich kann vom ersten Monat an unterstützen.',
    request:
      'Gerne erläutere ich in einem Gespräch, wie meine Erfahrung zu Ihren aktuellen Anforderungen passt. Vielen Dank für Ihre Zeit.',
    attachment: 'Meinen Lebenslauf finden Sie im Anhang.',
    signoff: 'Mit freundlichen Grüßen,',
  },
  bullets: {
    verbFirst: '{verb} {task}, {metric}.',
    metricFirst: '{metric}, erreicht durch {verb} {task}.',
    methodFirst: '{verb} {task} {method}, {metric}.',
    concise: '{verb} {task}.',
  },
};

export const nl: OutputCopy = {
  defaults: {
    strengths: 'uitzonderlijke toewijding, technische diepgang en voorbeeldige samenwerking',
    gratitude:
      'Ik wil mijn oprechte dank uitspreken voor de begeleiding, de kansen op professionele groei en de samenwerking die ik binnen het team heb ervaren.',
    transition:
      'Ik zet mij volledig in om de overdracht van mijn lopende projecten te begeleiden, kernprocessen te documenteren en collega’s te begeleiden in de resterende tijd.',
  },
  headings: {
    summary: 'Profiel',
    experience: 'Werkervaring',
    education: 'Opleiding',
    skills: 'Vaardigheden en competenties',
    certifications: 'Certificeringen',
    projects: 'Projecten',
    languages: 'Talen',
    references: 'Referenties',
    volunteer: 'Vrijwilligerswerk en maatschappelijke betrokkenheid',
    interests: 'Interesses',
  },
  profile: {
    atCompany: ' bij {company}',
    expYears: 'meer dan {years} jaar ervaring',
    expDefault: 'ruime ervaring in de sector',
    skillsDefault: 'strategisch leiderschap en technische innovatie',
    tone: {
      professional: 'aantoonbare resultaten',
      executive: 'een focus op organisatieverandering met grote impact',
      creative: 'aandacht voor zorgvuldig en betekenisvol werk',
      friendly: 'een toegankelijke en samenwerkende werkstijl',
      academic: 'een basis van grondig onderzoek en analyse',
    },
    shortFirst: 'Ik ben {role}{atCompany}, met {exp} en {tone}.',
    shortThird: '{name} is {role}{atCompany}, met {exp} en {tone}.',
    mediumFirst:
      'Ik ben {role}{atCompany}, met {exp}, gespecialiseerd in {skills}, met {tone}{achievement}.{education}',
    mediumThird:
      '{name} is {role}{atCompany}, met {exp}, gespecialiseerd in {skills}, met {tone}{achievement}.{education}',
    extended: 'Buiten het werk {personal}.',
    achievementLead: ', waaronder {achievement}',
    educationLead: ' De opleiding omvat {education}.',
  },
  summary: {
    metrics:
      'Resultaatgerichte {role} met {years} jaar ervaring in {industry}. De competenties omvatten {skills}.{achievement}',
    leadership:
      'Strategische {role} met {years} jaar ervaring in {industry}, leidinggevend aan multidisciplinaire teams en procesverbetering. Bedreven in {skills}{achievement}.',
    concise:
      'Prestatiegerichte {role} met {years} jaar ervaring in {skills}.{achievement}',
    objective:
      'Gemotiveerde {role} die een kans zoekt in {industry} om sterke punten in {skills} in te zetten.{achievement}',
  },
  letter: {
    salutation: 'Geachte heer/mevrouw,',
    signoff: 'Met vriendelijke groet,',
    subject: 'Betreft: sollicitatie voor de functie {role}',
    opening: 'Hierbij solliciteer ik naar de functie van {role} bij {company}.',
    body:
      'Mijn ervaring in {skills} sluit aan bij de eisen van deze functie en ik kan vanaf de eerste maand een bijdrage leveren.',
    closing:
      'Dank voor uw tijd en aandacht. Ik licht mijn sollicitatie graag nader toe in een gesprek.',
  },
  resignation: {
    salutation: 'Beste {manager},',
    signoff: 'Met vriendelijke groet,',
    twoWeeks:
      'Hierbij deel ik u mee dat ik mijn functie als {role} bij {company} opzeg. Met inachtneming van mijn opzegtermijn is mijn laatste werkdag {lastDay}.',
    shortNotice:
      'Hierbij deel ik u mee dat ik mijn functie als {role} bij {company} opzeg. Mijn laatste werkdag is {lastDay}.',
    immediate:
      'Hierbij deel ik u mee dat ik mijn functie als {role} bij {company} per direct opzeg.',
    relocation:
      'Hierbij deel ik u mee dat ik mijn functie als {role} bij {company} opzeg. Vanwege een verhuizing naar het buitenland is mijn laatste werkdag {lastDay}.',
    retirement:
      'Hierbij deel ik u mee dat ik met pensioen ga en mijn functie als {role} bij {company} per {lastDay} beëindig.',
    closing:
      'Ik wens u, het team en het bedrijf veel succes en ben graag behulpzaam bij de overdracht van mijn taken.',
  },
  recommendation: {
    salutation: 'Beste {recipient},',
    signoff: 'Met vriendelijke groet,',
    opening:
      'Ik beveel {candidate} van harte aan voor de functie van {targetRole} bij {targetOrg}. Als {relationship} bij {org} heb ik het werk {years} jaar van dichtbij gevolgd.',
    skills: 'In die periode heeft {candidate} {strengths} laten zien.',
    achievements: 'Belangrijke bijdragen zijn onder meer {achievements}.',
    character:
      'Naast vakinhoudelijke kwaliteit communiceert {candidate} met empathie, houdt hoge ethische standaarden aan en staat open voor feedback.',
    closing:
      'Ik beveel {candidate} zonder voorbehoud aan en geef graag nadere toelichting.',
  },
  email: {
    greeting: 'Beste {recipient},',
    subject: 'Sollicitatie: {role} – {name}',
    intro: 'Hierbij solliciteer ik naar de functie van {role} bij {company}.',
    value:
      'Mijn ervaring in {skills} sluit aan bij de eisen van de functie en ik kan vanaf de eerste maand bijdragen.',
    request:
      'Graag bespreek ik hoe mijn ervaring aansluit bij uw huidige behoeften. Dank voor uw overweging.',
    attachment: 'Mijn cv vindt u in de bijlage.',
    signoff: 'Met vriendelijke groet,',
  },
  bullets: {
    verbFirst: '{verb} {task}, {metric}.',
    metricFirst: '{metric} door {verb} {task}.',
    methodFirst: '{verb} {task} {method}, {metric}.',
    concise: '{verb} {task}.',
  },
};

export const pl: OutputCopy = {
  defaults: {
    strengths: 'wyjątkowe zaangażowanie, głęboka wiedza techniczna i wzorowa współpraca',
    gratitude:
      'Chcę wyrazić szczerą wdzięczność za mentoring, możliwości rozwoju zawodowego oraz współpracę, której doświadczyłem w zespole.',
    transition:
      'Zobowiązuję się wspierać przekazanie moich bieżących projektów, udokumentować kluczowe procesy i wdrożyć członków zespołu w pozostałym czasie.',
  },
  headings: {
    summary: 'Profil zawodowy',
    experience: 'Doświadczenie zawodowe',
    education: 'Wykształcenie',
    skills: 'Umiejętności i kompetencje',
    certifications: 'Certyfikaty',
    projects: 'Projekty',
    languages: 'Języki',
    references: 'Referencje',
    volunteer: 'Wolontariat i działalność społeczna',
    interests: 'Zainteresowania',
  },
  profile: {
    atCompany: ' w {company}',
    expYears: 'ponad {years} lat doświadczenia',
    expDefault: 'szerokie doświadczenie branżowe',
    skillsDefault: 'przywództwo strategiczne i innowacje techniczne',
    tone: {
      professional: 'mierzalne wyniki',
      executive: 'nacisk na transformację organizacyjną o dużym wpływie',
      creative: 'dbałość o staranne i sensowne projekty',
      friendly: 'partnerski i otwarty styl pracy',
      academic: 'podstawy rzetelnych badań i analiz',
    },
    shortFirst: 'Jestem {role}{atCompany} z {exp} i {tone}.',
    shortThird: '{name} jest {role}{atCompany} z {exp} i {tone}.',
    mediumFirst:
      'Jestem {role}{atCompany} z {exp}, specjalizuję się w {skills}, z {tone}{achievement}.{education}',
    mediumThird:
      '{name} jest {role}{atCompany} z {exp}, specjalizuje się w {skills}, z {tone}{achievement}.{education}',
    extended: 'Poza pracą zawodową {personal}.',
    achievementLead: ', w tym {achievement}',
    educationLead: ' Wykształcenie obejmuje {education}.',
  },
  summary: {
    metrics:
      '{role} nastawiony na wyniki, z {years} latami doświadczenia w {industry}. Kompetencje obejmują {skills}.{achievement}',
    leadership:
      'Strategiczny {role} z {years} latami doświadczenia w {industry}, kierujący zespołami multidyscyplinarnymi i usprawniający procesy. Biegłość w {skills}{achievement}.',
    concise:
      '{role} skoncentrowany na efektywności, z {years} latami doświadczenia w {skills}.{achievement}',
    objective:
      'Zmodyfikowany {role} poszukujący możliwości rozwoju w {industry}, aby wykorzystać mocne strony w {skills}.{achievement}',
  },
  letter: {
    salutation: 'Szanowni Państwo,',
    signoff: 'Z poważaniem,',
    subject: 'Temat: Aplikacja na stanowisko {role}',
    opening: 'Piszę, aby zgłosić swoją kandydaturę na stanowisko {role} w {company}.',
    body:
      'Moje doświadczenie w {skills} odpowiada wymaganiom tego stanowiska i jestem przekonany, że mogę wnieść wartość już od pierwszego miesiąca.',
    closing:
      'Dziękuję za czas i uwagę. Chętnie omówię swoją kandydaturę podczas rozmowy.',
  },
  resignation: {
    salutation: 'Szanowny/a {manager},',
    signoff: 'Z poważaniem,',
    twoWeeks:
      'Niniejszym składam rezygnację ze stanowiska {role} w {company}. Zgodnie z okresem wypowiedzenia moim ostatnim dniem pracy będzie {lastDay}.',
    shortNotice:
      'Niniejszym składam rezygnację ze stanowiska {role} w {company}. Moim ostatnim dniem pracy będzie {lastDay}.',
    immediate:
      'Niniejszym składam rezygnację ze stanowiska {role} w {company} ze skutkiem natychmiastowym.',
    relocation:
      'Niniejszym składam rezygnację ze stanowiska {role} w {company}. Z powodu przeprowadzki moim ostatnim dniem pracy będzie {lastDay}.',
    retirement:
      'Niniejszym informuję o przejściu na emeryturę ze stanowiska {role} w {company} z dniem {lastDay}.',
    closing:
      'Życzę Państwu, zespołowi i firmie dalszych sukcesów. Chętnie pomogę w przekazaniu obowiązków przed odejściem.',
  },
  recommendation: {
    salutation: 'Szanowny/a {recipient},',
    signoff: 'Z poważaniem,',
    opening:
      'Z przyjemnością polecam {candidate} na stanowisko {targetRole} w {targetOrg}. Jako {relationship} w {org} przez {years} lat obserwowałem jego pracę z bliska.',
    skills: 'W tym czasie {candidate} wykazał {strengths}.',
    achievements: 'Do najważniejszych osiągnięć należą {achievements}.',
    character:
      'Poza kompetencjami technicznymi {candidate} komunikuje się z empatią, przestrzega wysokich standardów etycznych i przyjmuje informację zwrotną z otwartością.',
    closing:
      'Polecam {candidate} bez zastrzeżeń i chętnie udzielę dodatkowych informacji.',
  },
  email: {
    greeting: 'Szanowny/a {recipient},',
    subject: 'Aplikacja: {role} – {name}',
    intro: 'Piszę, aby zgłosić swoją kandydaturę na stanowisko {role} w {company}.',
    value:
      'Moje doświadczenie w {skills} odpowiada wymaganiom stanowiska i mogę wnieść wkład już od pierwszego miesiąca.',
    request:
      'Chętnie omówię, jak moje doświadczenie odpowiada Państwa obecnym potrzebom. Dziękuję za rozważenie kandydatury.',
    attachment: 'W załączniku przesyłam swoje CV.',
    signoff: 'Z poważaniem,',
  },
  bullets: {
    verbFirst: '{verb} {task}, {metric}.',
    metricFirst: '{metric} poprzez {verb} {task}.',
    methodFirst: '{verb} {task} {method}, {metric}.',
    concise: '{verb} {task}.',
  },
};

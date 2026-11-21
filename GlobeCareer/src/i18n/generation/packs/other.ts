import type { OutputCopy } from '../types';

export const ro: OutputCopy = {
  defaults: {
    strengths: 'dedicare excepțională, competență tehnică solidă și colaborare exemplară',
    gratitude:
      'Doresc să îmi exprim recunoștința sinceră pentru mentorat, oportunitățile de dezvoltare profesională și colaborarea pe care am trăit-o în cadrul echipei.',
    transition:
      'Mă angajez să facilitez predarea proiectelor mele în curs, să documentez procesele esențiale și să instruiesc membrii echipei în timpul rămas.',
  },
  headings: {
    summary: 'Profil profesional',
    experience: 'Experiență profesională',
    education: 'Studii',
    skills: 'Competențe și abilități',
    certifications: 'Certificări',
    projects: 'Proiecte',
    languages: 'Limbi străine',
    references: 'Referințe',
    volunteer: 'Voluntariat și implicare comunitară',
    interests: 'Interese',
  },
  profile: {
    atCompany: ' la {company}',
    expYears: 'peste {years} ani de experiență',
    expDefault: 'experiență extinsă în domeniu',
    skillsDefault: 'leadership strategic și inovare tehnică',
    tone: {
      professional: 'rezultate măsurabile',
      executive: 'un accent pe transformarea organizațională cu impact ridicat',
      creative: 'angajament față de o muncă atent realizată',
      friendly: 'un stil de lucru colaborativ și accesibil',
      academic: 'o bază de rigoare științifică și analitică',
    },
    shortFirst: 'Sunt {role}{atCompany}, cu {exp} și {tone}.',
    shortThird: '{name} este {role}{atCompany}, cu {exp} și {tone}.',
    mediumFirst:
      'Sunt {role}{atCompany}, cu {exp}, specializat în {skills}, cu {tone}{achievement}.{education}',
    mediumThird:
      '{name} este {role}{atCompany}, cu {exp}, specializat în {skills}, cu {tone}{achievement}.{education}',
    extended: 'În afara activității profesionale, {personal}.',
    achievementLead: ', inclusiv {achievement}',
    educationLead: ' Formarea include {education}.',
  },
  summary: {
    metrics:
      '{role} orientat spre rezultate, cu {years} ani de experiență în {industry}. Competențele includ {skills}.{achievement}',
    leadership:
      '{role} strategic cu {years} ani de experiență în {industry}, coordonând echipe multidisciplinare și îmbunătățind procesele. Stăpânire a {skills}{achievement}.',
    concise:
      '{role} orientat spre performanță, cu {years} ani de experiență în {skills}.{achievement}',
    objective:
      '{role} motivat, în căutarea unei oportunități în {industry} pentru a-și valorifica punctele forte în {skills}.{achievement}',
  },
  letter: {
    salutation: 'Stimată echipă de recrutare,',
    signoff: 'Cu deosebită considerație,',
    subject: 'Subiect: Candidatura pentru postul de {role}',
    opening: 'Vă scriu pentru a candida la postul de {role} din cadrul {company}.',
    body:
      'Experiența mea în {skills} corespunde cerințelor postului și sunt convins că pot contribui încă din prima lună.',
    closing:
      'Vă mulțumesc pentru timpul acordat și rămân la dispoziția dumneavoastră pentru detalii suplimentare.',
  },
  resignation: {
    salutation: 'Stimate/Stimată {manager},',
    signoff: 'Cu deosebită considerație,',
    twoWeeks:
      'Prin prezenta vă informez cu privire la demisia mea din funcția de {role} în cadrul {company}. Conform perioadei de preaviz, ultima mea zi de lucru va fi {lastDay}.',
    shortNotice:
      'Prin prezenta vă informez cu privire la demisia mea din funcția de {role} în cadrul {company}. Ultima mea zi de lucru va fi {lastDay}.',
    immediate:
      'Prin prezenta vă informez cu privire la demisia mea din funcția de {role} în cadrul {company}, cu efect imediat.',
    relocation:
      'Prin prezenta vă informez cu privire la demisia mea din funcția de {role} în cadrul {company}. Din cauza unei relocări, ultima mea zi de lucru va fi {lastDay}.',
    retirement:
      'Prin prezenta vă informez cu privire la pensionarea mea din funcția de {role} în cadrul {company}, începând cu {lastDay}.',
    closing:
      'Vă doresc succes dumneavoastră, echipei și companiei. Rămân disponibil pentru a facilita predarea atribuțiilor.',
  },
  recommendation: {
    salutation: 'Stimate/Stimată {recipient},',
    signoff: 'Cu deosebită considerație,',
    opening:
      'Îl recomand cu plăcere pe {candidate} pentru postul de {targetRole} din cadrul {targetOrg}. În calitate de {relationship} la {org} timp de {years} ani, i-am urmărit activitatea îndeaproape.',
    skills: 'În această perioadă, {candidate} a demonstrat {strengths}.',
    achievements: 'Printre realizările notabile se numără {achievements}.',
    character:
      'Dincolo de competența tehnică, {candidate} comunică cu empatie, respectă standarde etice ridicate și primește cu deschidere feedbackul.',
    closing:
      'Îl recomand pe {candidate} fără rezerve și ofer cu plăcere detalii suplimentare.',
  },
  email: {
    greeting: 'Stimate/Stimată {recipient},',
    subject: 'Candidatură: {role} – {name}',
    intro: 'Vă scriu pentru a candida la postul de {role} din cadrul {company}.',
    value:
      'Experiența mea în {skills} corespunde cerințelor postului și pot contribui încă din prima lună.',
    request:
      'Aș aprecia ocazia de a discuta cum experiența mea răspunde nevoilor dumneavoastră actuale. Vă mulțumesc pentru atenție.',
    attachment: 'Atașez CV-ul meu pentru analiză.',
    signoff: 'Cu deosebită considerație,',
  },
  bullets: {
    verbFirst: '{verb} {task}, {metric}.',
    metricFirst: '{metric} prin {verb} {task}.',
    methodFirst: '{verb} {task} {method}, {metric}.',
    concise: '{verb} {task}.',
  },
};

export const tr: OutputCopy = {
  defaults: {
    strengths: 'olağanüstü özveri, güçlü teknik yetkinlik ve örnek işbirliği',
    gratitude:
      'Ekipte geçirdiğim süre boyunca aldığım mentorluk, mesleki gelişim fırsatları ve işbirliği için içten teşekkürlerimi sunmak isterim.',
    transition:
      'Devam eden projelerimin devrine yardımcı olmayı, temel süreçleri belgelemeyi ve kalan sürede ekip üyelerini eğitmeyi taahhüt ediyorum.',
  },
  headings: {
    summary: 'Profesyonel Özet',
    experience: 'İş Deneyimi',
    education: 'Eğitim',
    skills: 'Yetkinlikler ve Beceriler',
    certifications: 'Sertifikalar',
    projects: 'Projeler',
    languages: 'Diller',
    references: 'Referanslar',
    volunteer: 'Gönüllülük ve Toplumsal Liderlik',
    interests: 'İlgi Alanları',
  },
  profile: {
    atCompany: ' ({company} bünyesinde)',
    expYears: '{years} yılı aşkın deneyim',
    expDefault: 'sektörde geniş deneyim',
    skillsDefault: 'stratejik liderlik ve teknik inovasyon',
    tone: {
      professional: 'ölçülebilir sonuçlar',
      executive: 'yüksek etkili organizasyonel dönüşüm odağı',
      creative: 'özenli ve anlamlı iş anlayışı',
      friendly: 'işbirlikçi ve erişilebilir bir çalışma tarzı',
      academic: 'titiz araştırma ve analiz temeli',
    },
    shortFirst: 'Ben {role}{atCompany}, {exp} ve {tone} sahibiyim.',
    shortThird: '{name}, {role}{atCompany} olarak {exp} ve {tone} sahibidir.',
    mediumFirst:
      'Ben {role}{atCompany}, {exp} ile {skills} alanlarında uzmanlaşıyorum; {tone}{achievement}.{education}',
    mediumThird:
      '{name}, {role}{atCompany} olarak {exp} ile {skills} alanlarında uzmanlaşmaktadır; {tone}{achievement}.{education}',
    extended: 'Profesyonel çalışmaların dışında {personal}.',
    achievementLead: ', bunlar arasında {achievement}',
    educationLead: ' Eğitim bilgileri: {education}.',
  },
  summary: {
    metrics:
      '{industry} alanında {years} yıl deneyime sahip, sonuç odaklı {role}. Yetkinlikler {skills} alanlarını kapsar.{achievement}',
    leadership:
      '{industry} alanında {years} yıl deneyime sahip, çok disiplinli ekipleri yöneten ve süreçleri iyileştiren stratejik {role}. {skills} konusunda yetkindir{achievement}.',
    concise:
      '{skills} alanında {years} yıl deneyime sahip, performans odaklı {role}.{achievement}',
    objective:
      '{industry} alanında fırsat arayan, {skills} güçlü yönlerini kullanmak isteyen motive {role}.{achievement}',
  },
  letter: {
    salutation: 'Sayın İşe Alım Ekibi,',
    signoff: 'Saygılarımla,',
    subject: 'Konu: {role} pozisyonu başvurusu',
    opening: '{company} bünyesindeki {role} pozisyonuna başvurmak için yazıyorum.',
    body:
      '{skills} alanındaki deneyimim bu pozisyonun gereksinimleriyle örtüşüyor ve ilk aydan itibaren katkı sağlayabileceğime inanıyorum.',
    closing:
      'Zamanınız ve değerlendirmeniz için teşekkür ederim. Başvurumu görüşmek için fırsat verilmesini memnuniyetle karşılarım.',
  },
  resignation: {
    salutation: 'Sayın {manager},',
    signoff: 'Saygılarımla,',
    twoWeeks:
      'İşbu yazı ile {company} bünyesindeki {role} pozisyonundan istifa ettiğimi resmi olarak bildiririm. Bildirim sürem uyarınca son çalışma günüm {lastDay} olacaktır.',
    shortNotice:
      'İşbu yazı ile {company} bünyesindeki {role} pozisyonundan istifa ettiğimi resmi olarak bildiririm. Son çalışma günüm {lastDay} olacaktır.',
    immediate:
      'İşbu yazı ile {company} bünyesindeki {role} pozisyonundan istifa ettiğimi, derhal geçerli olmak üzere bildiririm.',
    relocation:
      'İşbu yazı ile {company} bünyesindeki {role} pozisyonundan istifa ettiğimi bildiririm. Yurt dışına taşınacağım için son çalışma günüm {lastDay} olacaktır.',
    retirement:
      'İşbu yazı ile {company} bünyesindeki {role} pozisyonundan {lastDay} tarihi itibarıyla emekli olduğumu bildiririm.',
    closing:
      'Size, ekibe ve şirkete başarılar dilerim. Ayrılmadan önce görev devri konusunda yardımcı olmaktan memnuniyet duyarım.',
  },
  recommendation: {
    salutation: 'Sayın {recipient},',
    signoff: 'Saygılarımla,',
    opening:
      '{candidate} adlı kişiyi {targetOrg} bünyesindeki {targetRole} pozisyonu için memnuniyetle tavsiye ederim. {org} kurumunda {years} yıl boyunca {relationship} olarak çalışmalarını yakından izledim.',
    skills: 'Bu süre boyunca {candidate} {strengths} gösterdi.',
    achievements: 'Öne çıkan katkıları arasında {achievements} yer alıyor.',
    character:
      'Teknik yetkinliğin ötesinde {candidate} empatiyle iletişim kurar, yüksek etik standartlara bağlı kalır ve geri bildirime açıktır.',
    closing:
      '{candidate} adlı kişiyi tereddütsüz tavsiye ederim ve ek bilgi vermekten memnuniyet duyarım.',
  },
  email: {
    greeting: 'Sayın {recipient},',
    subject: 'Başvuru: {role} – {name}',
    intro: '{company} bünyesindeki {role} pozisyonuna başvurmak için yazıyorum.',
    value:
      '{skills} alanındaki deneyimim pozisyonun gereksinimleriyle örtüşüyor ve ilk aydan itibaren katkı sağlayabilirim.',
    request:
      'Deneyimimin mevcut ihtiyaçlarınıza nasıl uyduğunu görüşmek isterim. Değerlendirmeniz için teşekkür ederim.',
    attachment: 'Özgeçmişimi incelemeniz için ekte gönderiyorum.',
    signoff: 'Saygılarımla,',
  },
  bullets: {
    verbFirst: '{verb} {task}, {metric}.',
    metricFirst: '{task} {verb} ve {metric}.',
    methodFirst: '{verb} {task} {method}, {metric}.',
    concise: '{verb} {task}.',
  },
};

export const el: OutputCopy = {
  defaults: {
    strengths: 'εξαιρετική αφοσίωση, τεχνική εμβάθυνση και υποδειγματική συνεργασία',
    gratitude:
      'Θέλω να εκφράσω την ειλικρινή μου ευγνωμοσύνη για την καθοδήγηση, τις ευκαιρίες επαγγελματικής ανάπτυξης και τη συνεργασία που βίωσα στην ομάδα.',
    transition:
      'Δεσμεύομαι να διευκολύνω την παράδοση των ενεργών έργων μου, να τεκμηριώσω τις βασικές διαδικασίες και να εκπαιδεύσω τα μέλη της ομάδας στον χρόνο που απομένει.',
  },
  headings: {
    summary: 'Επαγγελματικό προφίλ',
    experience: 'Επαγγελματική εμπειρία',
    education: 'Εκπαίδευση',
    skills: 'Δεξιότητες και ικανότητες',
    certifications: 'Πιστοποιήσεις',
    projects: 'Έργα',
    languages: 'Γλώσσες',
    references: 'Συστάσεις',
    volunteer: 'Εθελοντισμός και κοινωνική προσφορά',
    interests: 'Ενδιαφέροντα',
  },
  profile: {
    atCompany: ' στην {company}',
    expYears: 'πάνω από {years} χρόνια εμπειρίας',
    expDefault: 'εκτενή εμπειρία στον κλάδο',
    skillsDefault: 'στρατηγική ηγεσία και τεχνική καινοτομία',
    tone: {
      professional: 'μετρήσιμα αποτελέσματα',
      executive: 'έμφαση στον μετασχηματισμό οργανισμών με υψηλό αντίκτυπο',
      creative: 'δέσμευση σε προσεγμένη και ουσιαστική εργασία',
      friendly: 'συνεργατικό και προσβάσιμο στυλ εργασίας',
      academic: 'βάση αυστηρής έρευνας και ανάλυσης',
    },
    shortFirst: 'Είμαι {role}{atCompany} με {exp} και {tone}.',
    shortThird: 'Ο/Η {name} είναι {role}{atCompany} με {exp} και {tone}.',
    mediumFirst:
      'Είμαι {role}{atCompany} με {exp}, με ειδίκευση σε {skills}, με {tone}{achievement}.{education}',
    mediumThird:
      'Ο/Η {name} είναι {role}{atCompany} με {exp}, με ειδίκευση σε {skills}, με {tone}{achievement}.{education}',
    extended: 'Πέρα από την επαγγελματική δραστηριότητα, {personal}.',
    achievementLead: ', μεταξύ των οποίων {achievement}',
    educationLead: ' Η εκπαίδευση περιλαμβάνει {education}.',
  },
  summary: {
    metrics:
      '{role} με προσανατολισμό στα αποτελέσματα και {years} χρόνια εμπειρίας στον κλάδο {industry}. Οι δεξιότητες περιλαμβάνουν {skills}.{achievement}',
    leadership:
      'Στρατηγικός/ή {role} με {years} χρόνια εμπειρίας στον κλάδο {industry}, με καθοδήγηση διεπιστημονικών ομάδων και βελτίωση διαδικασιών. Άνεση σε {skills}{achievement}.',
    concise:
      '{role} με έμφαση στην απόδοση και {years} χρόνια εμπειρίας σε {skills}.{achievement}',
    objective:
      'Με κίνητρα {role} που αναζητά ευκαιρία στον κλάδο {industry} για να αξιοποιήσει δυνάμεις σε {skills}.{achievement}',
  },
  letter: {
    salutation: 'Αξιότιμη ομάδα προσλήψεων,',
    signoff: 'Με εκτίμηση,',
    subject: 'Θέμα: Αίτηση για τη θέση {role}',
    opening: 'Σας γράφω για να υποβάλω αίτηση για τη θέση {role} στην {company}.',
    body:
      'Η εμπειρία μου σε {skills} ανταποκρίνεται στις απαιτήσεις της θέσης και είμαι βέβαιος/η ότι μπορώ να συνεισφέρω από τον πρώτο μήνα.',
    closing:
      'Σας ευχαριστώ για τον χρόνο και την προσοχή σας. Θα χαρώ να συζητήσουμε την αίτησή μου.',
  },
  resignation: {
    salutation: 'Αξιότιμε/η {manager},',
    signoff: 'Με εκτίμηση,',
    twoWeeks:
      'Με την παρούσα σας ενημερώνω για την παραίτησή μου από τη θέση {role} στην {company}. Σύμφωνα με την προθεσμία προειδοποίησης, η τελευταία μου εργάσιμη ημέρα θα είναι {lastDay}.',
    shortNotice:
      'Με την παρούσα σας ενημερώνω για την παραίτησή μου από τη θέση {role} στην {company}. Η τελευταία μου εργάσιμη ημέρα θα είναι {lastDay}.',
    immediate:
      'Με την παρούσα σας ενημερώνω για την παραίτησή μου από τη θέση {role} στην {company}, με άμεση ισχύ.',
    relocation:
      'Με την παρούσα σας ενημερώνω για την παραίτησή μου από τη θέση {role} στην {company}. Λόγω μετεγκατάστασης, η τελευταία μου εργάσιμη ημέρα θα είναι {lastDay}.',
    retirement:
      'Με την παρούσα σας ενημερώνω για τη συνταξιοδότησή μου από τη θέση {role} στην {company}, με ισχύ από {lastDay}.',
    closing:
      'Σας εύχομαι, στην ομάδα και στην εταιρεία, συνεχή επιτυχία. Παραμένω στη διάθεσή σας για την ομαλή παράδοση των καθηκόντων μου.',
  },
  recommendation: {
    salutation: 'Αξιότιμε/η {recipient},',
    signoff: 'Με εκτίμηση,',
    opening:
      'Συνιστώ με χαρά τον/την {candidate} για τη θέση {targetRole} στην {targetOrg}. Ως {relationship} στην {org} για {years} χρόνια, παρακολούθησα το έργο του/της από κοντά.',
    skills: 'Σε αυτό το διάστημα ο/η {candidate} επέδειξε {strengths}.',
    achievements: 'Στις σημαντικότερες συνεισφορές περιλαμβάνονται {achievements}.',
    character:
      'Πέρα από την τεχνική επάρκεια, ο/η {candidate} επικοινωνεί με ενσυναίσθηση, τηρεί υψηλά δεοντολογικά πρότυπα και δέχεται εποικοδομητική ανατροφοδότηση.',
    closing:
      'Συνιστώ τον/την {candidate} χωρίς επιφύλαξη και είμαι στη διάθεσή σας για περισσότερες πληροφορίες.',
  },
  email: {
    greeting: 'Αξιότιμε/η {recipient},',
    subject: 'Αίτηση: {role} – {name}',
    intro: 'Σας γράφω για να υποβάλω αίτηση για τη θέση {role} στην {company}.',
    value:
      'Η εμπειρία μου σε {skills} ανταποκρίνεται στις απαιτήσεις της θέσης και μπορώ να συνεισφέρω από τον πρώτο μήνα.',
    request:
      'Θα χαρώ να συζητήσουμε πώς η εμπειρία μου καλύπτει τις τρέχουσες ανάγκες σας. Σας ευχαριστώ για την εξέταση.',
    attachment: 'Επισυνάπτω το βιογραφικό μου για αξιολόγηση.',
    signoff: 'Με εκτίμηση,',
  },
  bullets: {
    verbFirst: '{verb} {task}, {metric}.',
    metricFirst: '{metric} μέσω {verb} {task}.',
    methodFirst: '{verb} {task} {method}, {metric}.',
    concise: '{verb} {task}.',
  },
};

export const ar: OutputCopy = {
  defaults: {
    strengths: 'تفانٍ استثنائي، وعمق تقني، وتعاون مثالي',
    gratitude:
      'أود أن أعرب عن امتناني الصادق على الإرشاد وفرص التطور المهني والتعاون الذي عشته خلال فترة عملي مع الفريق.',
    transition:
      'ألتزم بتسهيل تسليم مشاريعي الحالية وتوثيق العمليات الأساسية وتدريب أعضاء الفريق خلال الفترة المتبقية.',
  },
  headings: {
    summary: 'الملخص المهني',
    experience: 'الخبرة العملية',
    education: 'التعليم',
    skills: 'المهارات والكفاءات',
    certifications: 'الشهادات',
    projects: 'المشاريع',
    languages: 'اللغات',
    references: 'المراجع',
    volunteer: 'العمل التطوعي والقيادة المجتمعية',
    interests: 'الاهتمامات',
  },
  profile: {
    atCompany: ' في {company}',
    expYears: 'أكثر من {years} سنوات من الخبرة',
    expDefault: 'خبرة واسعة في القطاع',
    skillsDefault: 'القيادة الاستراتيجية والابتكار التقني',
    tone: {
      professional: 'سجل من النتائج القابلة للقياس',
      executive: 'تركيز على التحول المؤسسي عالي الأثر',
      creative: 'التزام بعمل إبداعي متقن',
      friendly: 'أسلوب عمل تعاوني وسهل الوصول',
      academic: 'أساس من البحث والتحليل الدقيق',
    },
    shortFirst: 'أنا {role}{atCompany} ولدي {exp} و{tone}.',
    shortThird: '{name} {role}{atCompany} ولديه {exp} و{tone}.',
    mediumFirst:
      'أنا {role}{atCompany} ولدي {exp}، وأتخصص في {skills}، ولدي {tone}{achievement}.{education}',
    mediumThird:
      '{name} {role}{atCompany} ولديه {exp}، ويتخصص في {skills}، ولديه {tone}{achievement}.{education}',
    extended: 'خارج نطاق العمل المهني، {personal}.',
    achievementLead: '، بما في ذلك {achievement}',
    educationLead: ' يشمل التعليم والمؤهلات {education}.',
  },
  summary: {
    metrics:
      '{role} يركز على النتائج ولديه {years} سنوات من الخبرة في {industry}. تشمل المهارات {skills}.{achievement}',
    leadership:
      '{role} استراتيجي لديه {years} سنوات من الخبرة في {industry}، يقود فرقاً متعددة التخصصات ويحسن العمليات. متمكن من {skills}{achievement}.',
    concise:
      '{role} يركز على الأداء ولديه {years} سنوات من الخبرة في {skills}.{achievement}',
    objective:
      '{role} متحفز يبحث عن فرصة في {industry} لتوظيف نقاط القوة في {skills}.{achievement}',
  },
  letter: {
    salutation: 'السادة فريق التوظيف،',
    signoff: 'مع خالص التقدير،',
    subject: 'الموضوع: طلب التوظيف لوظيفة {role}',
    opening: 'أكتب إليكم للتقدم لوظيفة {role} في {company}.',
    body:
      'تتوافق خبرتي في {skills} مع متطلبات هذه الوظيفة، وأثق في قدرتي على المساهمة منذ الشهر الأول.',
    closing:
      'أشكركم على وقتكم واهتمامكم، ويسعدني مناقشة طلبي معكم في أي وقت يناسبكم.',
  },
  resignation: {
    salutation: 'السيد/السيدة {manager}،',
    signoff: 'مع خالص التقدير،',
    twoWeeks:
      'أكتب إليكم لإبلاغكم رسمياً باستقالتي من وظيفة {role} في {company}. ووفقاً لفترة الإشعار، سيكون آخر يوم عمل لي هو {lastDay}.',
    shortNotice:
      'أكتب إليكم لإبلاغكم رسمياً باستقالتي من وظيفة {role} في {company}. وسيكون آخر يوم عمل لي هو {lastDay}.',
    immediate:
      'أكتب إليكم لإبلاغكم رسمياً باستقالتي من وظيفة {role} في {company}، وذلك اعتباراً من تاريخه.',
    relocation:
      'أكتب إليكم لإبلاغكم رسمياً باستقالتي من وظيفة {role} في {company}. ونظراً لانتقالي إلى دولة أخرى، سيكون آخر يوم عمل لي هو {lastDay}.',
    retirement:
      'أكتب إليكم لإبلاغكم بتقاعدي من وظيفة {role} في {company}، اعتباراً من {lastDay}.',
    closing:
      'أتمنى لكم وللفريق وللشركة دوام التوفيق، وأنا على استعداد للمساعدة في تسليم المهام قبل مغادرتي.',
  },
  recommendation: {
    salutation: 'السيد/السيدة {recipient}،',
    signoff: 'مع خالص التقدير،',
    opening:
      'أوصي بسرور بـ {candidate} لوظيفة {targetRole} في {targetOrg}. وبصفتي {relationship} في {org} لمدة {years} سنوات، تابعت عملهم عن قرب.',
    skills: 'وخلال تلك الفترة أظهر {candidate} {strengths}.',
    achievements: 'من أبرز الإسهامات {achievements}.',
    character:
      'إلى جانب القدرة التقنية، يتواصل {candidate} بتعاطف، ويلتزم بمعايير أخلاقية عالية، ويتقبل الملاحظات البناءة.',
    closing:
      'أوصي بـ {candidate} دون تحفظ، ويسعدني تقديم مزيد من التفاصيل عند الطلب.',
  },
  email: {
    greeting: 'السيد/السيدة {recipient}،',
    subject: 'طلب توظيف: {role} – {name}',
    intro: 'أكتب إليكم للتقدم لوظيفة {role} في {company}.',
    value:
      'تتوافق خبرتي في {skills} مع متطلبات الوظيفة، ويمكنني المساهمة منذ الشهر الأول.',
    request:
      'يسعدني مناقشة كيفية تلبية خبرتي لاحتياجاتكم الحالية. أشكركم على حسن اهتمامكم.',
    attachment: 'أرفق سيرتي الذاتية لاطلاعكم.',
    signoff: 'مع خالص التقدير،',
  },
  bullets: {
    verbFirst: '{verb} {task}، {metric}.',
    metricFirst: '{metric} من خلال {verb} {task}.',
    methodFirst: '{verb} {task} {method}، {metric}.',
    concise: '{verb} {task}.',
  },
};

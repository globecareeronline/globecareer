import type { OutputLanguageCode } from '../outputLanguages';

/**
 * Small localised labels shown next to generated output (option headings and
 * the "generated in ..." note). Kept separate from the sentence packs because
 * they are interface furniture, not document prose.
 */
export interface GenerationLabels {
  summaryMetrics: string;
  summaryLeadership: string;
  summaryConcise: string;
  objective: string;
  headline: string;
  generatedIn: string;
  bulletFormula: string;
  bulletMetric: string;
  bulletMethod: string;
  bulletConcise: string;
  referencesAvailable: string;
  statusLabel: string;
}

export const GENERATION_LABELS: Record<OutputLanguageCode, GenerationLabels> = {
  en: {
    summaryMetrics: 'Metrics-driven & quantifiable scale',
    summaryLeadership: 'Strategic leadership & collaboration',
    summaryConcise: 'High-density one-page summary',
    objective: 'Career objective',
    headline: 'Professional headline',
    generatedIn: 'Generated in',
    bulletFormula: 'X-Y-Z formula',
    bulletMetric: 'Metric-first',
    bulletMethod: 'Action–method–result',
    bulletConcise: 'Concise single line',
    referencesAvailable: 'References available upon request.',
    statusLabel: 'Status',
  },
  es: {
    summaryMetrics: 'Orientado a métricas y resultados',
    summaryLeadership: 'Liderazgo estratégico y colaboración',
    summaryConcise: 'Resumen compacto de una página',
    objective: 'Objetivo profesional',
    headline: 'Titular profesional',
    generatedIn: 'Generado en',
    bulletFormula: 'Fórmula X-Y-Z',
    bulletMetric: 'Métrica primero',
    bulletMethod: 'Acción–método–resultado',
    bulletConcise: 'Línea única concisa',
    referencesAvailable: 'Referencias disponibles a petición.',
    statusLabel: 'Situación',
  },
  fr: {
    summaryMetrics: 'Axé sur les résultats mesurables',
    summaryLeadership: 'Leadership stratégique et collaboration',
    summaryConcise: 'Résumé compact sur une page',
    objective: 'Objectif professionnel',
    headline: 'Titre professionnel',
    generatedIn: 'Généré en',
    bulletFormula: 'Formule X-Y-Z',
    bulletMetric: 'Résultat en tête',
    bulletMethod: 'Action–méthode–résultat',
    bulletConcise: 'Ligne unique concise',
    referencesAvailable: 'Références disponibles sur demande.',
    statusLabel: 'Statut',
  },
  de: {
    summaryMetrics: 'Kennzahlenorientiert und messbar',
    summaryLeadership: 'Strategische Führung und Zusammenarbeit',
    summaryConcise: 'Kompakte Zusammenfassung auf einer Seite',
    objective: 'Berufliches Ziel',
    headline: 'Berufliche Kurzbezeichnung',
    generatedIn: 'Erstellt auf',
    bulletFormula: 'X-Y-Z-Formel',
    bulletMetric: 'Ergebnis zuerst',
    bulletMethod: 'Aktion–Methode–Ergebnis',
    bulletConcise: 'Knappe Einzelzeile',
    referencesAvailable: 'Referenzen auf Anfrage erhältlich.',
    statusLabel: 'Status',
  },
  it: {
    summaryMetrics: 'Orientato ai risultati misurabili',
    summaryLeadership: 'Leadership strategica e collaborazione',
    summaryConcise: 'Sintesi compatta di una pagina',
    objective: 'Obiettivo professionale',
    headline: 'Titolo professionale',
    generatedIn: 'Generato in',
    bulletFormula: 'Formula X-Y-Z',
    bulletMetric: 'Risultato in evidenza',
    bulletMethod: 'Azione–metodo–risultato',
    bulletConcise: 'Riga singola concisa',
    referencesAvailable: 'Referenze disponibili su richiesta.',
    statusLabel: 'Stato',
  },
  pt: {
    summaryMetrics: 'Orientado a métricas e resultados',
    summaryLeadership: 'Liderança estratégica e colaboração',
    summaryConcise: 'Resumo compacto de uma página',
    objective: 'Objetivo profissional',
    headline: 'Título profissional',
    generatedIn: 'Gerado em',
    bulletFormula: 'Fórmula X-Y-Z',
    bulletMetric: 'Métrica em primeiro',
    bulletMethod: 'Ação–método–resultado',
    bulletConcise: 'Linha única concisa',
    referencesAvailable: 'Referências disponíveis a pedido.',
    statusLabel: 'Situação',
  },
  nl: {
    summaryMetrics: 'Resultaat- en cijfergericht',
    summaryLeadership: 'Strategisch leiderschap en samenwerking',
    summaryConcise: 'Compacte samenvatting van één pagina',
    objective: 'Loopbaandoel',
    headline: 'Professionele titel',
    generatedIn: 'Gegenereerd in',
    bulletFormula: 'X-Y-Z-formule',
    bulletMetric: 'Resultaat voorop',
    bulletMethod: 'Actie–methode–resultaat',
    bulletConcise: 'Beknopte enkele regel',
    referencesAvailable: 'Referenties beschikbaar op verzoek.',
    statusLabel: 'Status',
  },
  pl: {
    summaryMetrics: 'Nastawiony na mierzalne wyniki',
    summaryLeadership: 'Przywództwo strategiczne i współpraca',
    summaryConcise: 'Zwięzły profil na jedną stronę',
    objective: 'Cel zawodowy',
    headline: 'Nagłówek zawodowy',
    generatedIn: 'Wygenerowano w',
    bulletFormula: 'Formuła X-Y-Z',
    bulletMetric: 'Wynik na początku',
    bulletMethod: 'Działanie–metoda–wynik',
    bulletConcise: 'Zwięzła pojedyncza linia',
    referencesAvailable: 'Referencje dostępne na życzenie.',
    statusLabel: 'Status',
  },
  ro: {
    summaryMetrics: 'Orientat pe rezultate măsurabile',
    summaryLeadership: 'Leadership strategic și colaborare',
    summaryConcise: 'Rezumat compact pe o pagină',
    objective: 'Obiectiv profesional',
    headline: 'Titlu profesional',
    generatedIn: 'Generat în',
    bulletFormula: 'Formula X-Y-Z',
    bulletMetric: 'Rezultatul pe primul loc',
    bulletMethod: 'Acțiune–metodă–rezultat',
    bulletConcise: 'O singură linie concisă',
    referencesAvailable: 'Referințe disponibile la cerere.',
    statusLabel: 'Statut',
  },
  tr: {
    summaryMetrics: 'Ölçülebilir sonuç odaklı',
    summaryLeadership: 'Stratejik liderlik ve işbirliği',
    summaryConcise: 'Tek sayfalık kısa özet',
    objective: 'Kariyer hedefi',
    headline: 'Profesyonel başlık',
    generatedIn: 'Şu dilde oluşturuldu',
    bulletFormula: 'X-Y-Z formülü',
    bulletMetric: 'Önce sonuç',
    bulletMethod: 'Eylem–yöntem–sonuç',
    bulletConcise: 'Kısa tek satır',
    referencesAvailable: 'Referanslar talep üzerine sunulur.',
    statusLabel: 'Durum',
  },
  el: {
    summaryMetrics: 'Προσανατολισμένο σε μετρήσιμα αποτελέσματα',
    summaryLeadership: 'Στρατηγική ηγεσία και συνεργασία',
    summaryConcise: 'Συμπαγής σύνοψη μίας σελίδας',
    objective: 'Επαγγελματικός στόχος',
    headline: 'Επαγγελματικός τίτλος',
    generatedIn: 'Δημιουργήθηκε στα',
    bulletFormula: 'Φόρμουλα X-Y-Z',
    bulletMetric: 'Πρώτα το αποτέλεσμα',
    bulletMethod: 'Δράση–μέθοδος–αποτέλεσμα',
    bulletConcise: 'Συμπαγής μονή γραμμή',
    referencesAvailable: 'Συστάσεις διαθέσιμες κατόπιν αιτήματος.',
    statusLabel: 'Κατάσταση',
  },
  ar: {
    summaryMetrics: 'يركز على النتائج القابلة للقياس',
    summaryLeadership: 'القيادة الاستراتيجية والتعاون',
    summaryConcise: 'ملخص موجز في صفحة واحدة',
    objective: 'الهدف المهني',
    headline: 'العنوان المهني',
    generatedIn: 'تم الإنشاء باللغة',
    bulletFormula: 'صيغة X-Y-Z',
    bulletMetric: 'النتيجة أولاً',
    bulletMethod: 'إجراء–طريقة–نتيجة',
    bulletConcise: 'سطر واحد موجز',
    referencesAvailable: 'المراجع متاحة عند الطلب.',
    statusLabel: 'الحالة',
  },
};

export function getLabels(language: OutputLanguageCode): GenerationLabels {
  return GENERATION_LABELS[language] || GENERATION_LABELS.en;
}

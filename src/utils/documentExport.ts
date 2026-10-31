import { Document, Paragraph, TextRun, HeadingLevel, Packer, AlignmentType } from 'docx';
import { ResumeData } from '../types/resume';
import { exportResumeToDocx, exportCoverLetterToDocx } from './docxExport';

export { exportResumeToDocx, exportCoverLetterToDocx };

/**
 * Exports a recommendation letter to native Microsoft Word (.docx) format
 */
export async function exportRecommendationLetterToDocx(letter: {
  recommenderName: string;
  recommenderTitle?: string;
  recommenderOrg?: string;
  recommenderEmail?: string;
  candidateName: string;
  date?: string;
  recipientTitle?: string;
  targetOrg?: string;
  letterBody: string;
}, filename: string = 'Recommendation_Letter'): Promise<void> {
  const children: Paragraph[] = [];
  const currentDate = letter.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Recommender Header
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 60 },
      children: [new TextRun({ text: letter.recommenderName || 'Letter of Recommendation', bold: true, size: 28, color: '1E293B' })]
    })
  );

  if (letter.recommenderTitle || letter.recommenderOrg) {
    const orgLine = [letter.recommenderTitle, letter.recommenderOrg].filter(Boolean).join(', ');
    children.push(
      new Paragraph({
        spacing: { after: 60 },
        children: [new TextRun({ text: orgLine, size: 22, color: '475569' })]
      })
    );
  }

  if (letter.recommenderEmail) {
    children.push(
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: letter.recommenderEmail, size: 19, color: '64748B' })]
      })
    );
  }

  // Date
  children.push(
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: currentDate, size: 20, color: '475569' })]
    })
  );

  // Recipient / Reference
  const recLine = [letter.recipientTitle, letter.targetOrg].filter(Boolean).join(', ');
  if (recLine) {
    children.push(
      new Paragraph({
        spacing: { after: 140 },
        children: [new TextRun({ text: `To: ${recLine}`, bold: true, size: 21, color: '1E293B' })]
      })
    );
  }

  // Letter Body Paragraphs
  const rawParagraphs = letter.letterBody.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  for (const para of rawParagraphs) {
    children.push(
      new Paragraph({
        spacing: { after: 160 },
        children: [new TextRun({ text: para, size: 21, color: '334155' })]
      })
    );
  }

  // Sign off
  children.push(
    new Paragraph({
      spacing: { before: 100, after: 120 },
      children: [new TextRun({ text: 'Sincerely,', size: 21, color: '1E293B' })]
    })
  );
  children.push(
    new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: letter.recommenderName, bold: true, size: 22, color: '0F172A' })]
    })
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 }, // A4
            margin: { top: 1200, bottom: 1200, left: 1200, right: 1200 }
          }
        },
        children
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generic Word (.docx) exporter for plain text / paragraphs
 */
export async function exportTextDocumentToDocx(
  title: string, 
  paragraphs: string[], 
  filename: string = 'Document'
): Promise<void> {
  const children: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [new TextRun({ text: title, bold: true, size: 28, color: '1E293B' })]
    })
  ];

  for (const para of paragraphs) {
    children.push(
      new Paragraph({
        spacing: { after: 140 },
        children: [new TextRun({ text: para, size: 21, color: '334155' })]
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 1200, bottom: 1200, left: 1200, right: 1200 }
          }
        },
        children
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Exports a resume to clean, ATS-optimized plain text (.txt)
 */
export function exportResumeToTxt(resume: ResumeData, filename: string = 'Resume'): void {
  const lines: string[] = [];

  // Header
  lines.push('='.repeat(70));
  lines.push((resume.personal.fullName || 'RESUME').toUpperCase());
  if (resume.personal.jobTitle) {
    lines.push(resume.personal.jobTitle.toUpperCase());
  }
  lines.push('='.repeat(70));

  const contact: string[] = [];
  if (resume.personal.email) contact.push(`Email: ${resume.personal.email}`);
  if (resume.personal.phone) contact.push(`Phone: ${resume.personal.phone}`);
  if (resume.personal.city || resume.personal.country) {
    contact.push(`Location: ${[resume.personal.city, resume.personal.stateOrRegion, resume.personal.country].filter(Boolean).join(', ')}`);
  }
  if (resume.personal.linkedIn) contact.push(`LinkedIn: ${resume.personal.linkedIn}`);
  if (resume.personal.portfolioUrl) contact.push(`Portfolio: ${resume.personal.portfolioUrl}`);
  lines.push(contact.join(' | '));
  lines.push('');

  // Summary
  if (resume.summary) {
    lines.push('--- PROFESSIONAL SUMMARY ---');
    lines.push(resume.summary);
    lines.push('');
  }

  // Experience
  if (resume.experience && resume.experience.length > 0) {
    lines.push('--- WORK EXPERIENCE ---');
    resume.experience.forEach(exp => {
      const dates = `${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate}`;
      lines.push(`${exp.jobTitle} | ${exp.company} (${exp.location || 'Remote'}) | ${dates}`);
      if (Array.isArray(exp.description) && exp.description.length > 0) {
        exp.description.forEach(bullet => {
          if (bullet.trim()) lines.push(`  * ${bullet.trim()}`);
        });
      }
      lines.push('');
    });
  }

  // Education
  if (resume.education && resume.education.length > 0) {
    lines.push('--- EDUCATION ---');
    resume.education.forEach(edu => {
      lines.push(`${edu.degree} in ${edu.fieldOfStudy} | ${edu.institution} (${edu.startDate} - ${edu.endDate})`);
      if (edu.gradeOrHonors) lines.push(`  GPA / Grade: ${edu.gradeOrHonors}`);
      if (Array.isArray(edu.highlights) && edu.highlights.length > 0) {
        edu.highlights.forEach(h => {
          if (h.trim()) lines.push(`  * ${h.trim()}`);
        });
      }
      lines.push('');
    });
  }

  // Skills
  if (resume.skills && resume.skills.length > 0) {
    lines.push('--- SKILLS & COMPETENCIES ---');
    const skillList = resume.skills.map(s => s.name).join(', ');
    lines.push(skillList);
    lines.push('');
  }

  // Languages
  if (resume.languages && resume.languages.length > 0) {
    lines.push('--- LANGUAGES ---');
    resume.languages.forEach(l => lines.push(`  * ${l.language} (${l.proficiency})`));
    lines.push('');
  }

  // Certifications
  if (resume.certifications && resume.certifications.length > 0) {
    lines.push('--- CERTIFICATIONS ---');
    resume.certifications.forEach(c => lines.push(`  * ${c.name} - ${c.issuer} (${c.issueDate})`));
    lines.push('');
  }

  // GDPR Consent Clause (if required by country)
  if (resume.personal.gdprConsentClause) {
    lines.push('--- PRIVACY & CONSENT ---');
    lines.push(resume.personal.gdprConsentClause);
    lines.push('');
  }

  const content = lines.join('\n');
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Exports a resume to standalone self-contained HTML
 */
export function exportResumeToHtml(resume: ResumeData, filename: string = 'Resume'): void {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resume.personal.fullName || 'Resume'}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #1e293b; max-width: 800px; margin: 40px auto; padding: 24px; background: #fff; }
    h1 { font-size: 26px; text-transform: uppercase; margin-bottom: 4px; color: #0f172a; }
    h2 { font-size: 15px; color: #3b82f6; margin-top: 0; margin-bottom: 12px; }
    h3 { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px; margin-top: 24px; color: #334155; }
    .contact { font-size: 13px; color: #64748b; margin-bottom: 20px; }
    .item { margin-bottom: 14px; }
    .item-header { display: flex; justify-content: space-between; font-weight: 600; font-size: 14px; }
    .item-sub { color: #64748b; font-size: 13px; margin-bottom: 4px; }
    .skills { display: flex; flex-wrap: wrap; gap: 6px; }
    .skill-tag { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 3px 8px; border-radius: 4px; font-size: 12px; }
    @media print { body { max-width: 100%; margin: 0; padding: 0; } }
  </style>
</head>
<body>
  <h1>${resume.personal.fullName || 'Resume'}</h1>
  ${resume.personal.jobTitle ? `<h2>${resume.personal.jobTitle}</h2>` : ''}
  <div class="contact">
    ${[
      resume.personal.email,
      resume.personal.phone,
      [resume.personal.city, resume.personal.stateOrRegion, resume.personal.country].filter(Boolean).join(', '),
      resume.personal.linkedIn,
      resume.personal.portfolioUrl
    ].filter(Boolean).join(' • ')}
  </div>

  ${resume.summary ? `<h3>Professional Summary</h3><p>${resume.summary}</p>` : ''}

  ${resume.experience && resume.experience.length > 0 ? `
    <h3>Work Experience</h3>
    ${resume.experience.map(e => `
      <div class="item">
        <div class="item-header">
          <span>${e.jobTitle}</span>
          <span>${e.startDate} - ${e.isCurrent ? 'Present' : e.endDate}</span>
        </div>
        <div class="item-sub">${e.company} ${e.location ? `• ${e.location}` : ''}</div>
        ${Array.isArray(e.description) && e.description.length > 0 ? `
          <ul>${e.description.map(bullet => `<li>${bullet}</li>`).join('')}</ul>
        ` : ''}
      </div>
    `).join('')}
  ` : ''}

  ${resume.education && resume.education.length > 0 ? `
    <h3>Education</h3>
    ${resume.education.map(ed => `
      <div class="item">
        <div class="item-header">
          <span>${ed.degree} in ${ed.fieldOfStudy}</span>
          <span>${ed.startDate} - ${ed.endDate}</span>
        </div>
        <div class="item-sub">${ed.institution}</div>
        ${ed.gradeOrHonors ? `<p>GPA / Grade: ${ed.gradeOrHonors}</p>` : ''}
        ${Array.isArray(ed.highlights) && ed.highlights.length > 0 ? `
          <ul>${ed.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
        ` : ''}
      </div>
    `).join('')}
  ` : ''}

  ${resume.skills && resume.skills.length > 0 ? `
    <h3>Skills</h3>
    <div class="skills">
      ${resume.skills.map(s => `<span class="skill-tag">${s.name}</span>`).join('')}
    </div>
  ` : ''}
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generic Plain Text (.txt) file downloader
 */
export function exportTextToTxt(content: string, filename: string = 'Document'): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Standard RFC-822 email (.eml) export file
 */
export function exportEmailToEml(email: {
  subject: string;
  body: string;
  senderName?: string;
  senderEmail?: string;
  recipientName?: string;
  recipientEmail?: string;
}, filename: string = 'Job_Application_Email'): void {
  const dateStr = new Date().toUTCString();
  const emlContent = [
    `Date: ${dateStr}`,
    `From: "${email.senderName || 'Applicant'}" <${email.senderEmail || 'applicant@example.com'}>`,
    `To: "${email.recipientName || 'Hiring Team'}" <${email.recipientEmail || 'recruiter@company.com'}>`,
    `Subject: ${email.subject || 'Application'}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=utf-8`,
    `Content-Transfer-Encoding: 8bit`,
    ``,
    email.body
  ].join('\r\n');

  const blob = new Blob([emlContent], { type: 'message/rfc822;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}.eml`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

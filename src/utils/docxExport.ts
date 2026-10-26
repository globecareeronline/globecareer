import { Document, Paragraph, TextRun, HeadingLevel, Packer, AlignmentType, BorderStyle } from 'docx';
import { ResumeData } from '../types/resume';

export async function exportResumeToDocx(resume: ResumeData, filename: string = 'Resume'): Promise<void> {
  const children: Paragraph[] = [];

  // 1. Header: Name
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: resume.personal.fullName || 'Unnamed Resume',
          bold: true,
          size: 32, // 16pt
          color: '1E293B'
        })
      ]
    })
  );

  // Job Title
  if (resume.personal.jobTitle) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: resume.personal.jobTitle,
            bold: true,
            size: 24, // 12pt
            color: '475569'
          })
        ]
      })
    );
  }

  // Contact line
  const contactParts: string[] = [];
  if (resume.personal.email) contactParts.push(resume.personal.email);
  if (resume.personal.phone) contactParts.push(resume.personal.phone);
  if (resume.personal.city || resume.personal.country) {
    contactParts.push([resume.personal.city, resume.personal.stateOrRegion, resume.personal.country].filter(Boolean).join(', '));
  }
  if (resume.personal.linkedIn) contactParts.push(resume.personal.linkedIn);
  if (resume.personal.portfolioUrl) contactParts.push(resume.personal.portfolioUrl);

  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: contactParts.join('  |  '),
            size: 19,
            color: '64748B'
          })
        ]
      })
    );
  }

  // Work Authorization / Additional personal notes
  if (resume.personal.workAuthorization) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: `Work Status: ${resume.personal.workAuthorization}`,
            italics: true,
            size: 19,
            color: '475569'
          })
        ]
      })
    );
  }

  // Section title & enablement helpers
  const isSectionEnabled = (id: string): boolean => {
    if (!resume.sectionsOrder || resume.sectionsOrder.length === 0) return true;
    const s = resume.sectionsOrder.find(item => item.id === id);
    return s ? s.enabled : true;
  };

  const getSectionTitle = (id: string, defaultTitle: string): string => {
    const s = resume.sectionsOrder?.find(item => item.id === id);
    return s?.title || defaultTitle;
  };

  // Divider helper
  const addSectionHeader = (title: string) => {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
        border: {
          bottom: {
            color: 'CBD5E1',
            space: 4,
            style: BorderStyle.SINGLE,
            size: 6
          }
        },
        children: [
          new TextRun({
            text: title.toUpperCase(),
            bold: true,
            size: 22,
            color: '0F172A'
          })
        ]
      })
    );
  };

  // 2. Summary
  if (isSectionEnabled('summary') && resume.summary && resume.summary.trim().length > 0) {
    addSectionHeader(getSectionTitle('summary', 'Professional Summary'));
    children.push(
      new Paragraph({
        spacing: { after: 180 },
        children: [
          new TextRun({
            text: resume.summary,
            size: 21,
            color: '334155'
          })
        ]
      })
    );
  }

  // 3. Experience
  if (isSectionEnabled('experience') && resume.experience && resume.experience.length > 0) {
    addSectionHeader(getSectionTitle('experience', 'Work Experience'));
    for (const exp of resume.experience) {
      // Role & Company line
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({
              text: exp.jobTitle,
              bold: true,
              size: 22,
              color: '1E293B'
            }),
            new TextRun({
              text: ` — ${exp.company}`,
              size: 21,
              color: '334155'
            }),
            new TextRun({
              text: `  (${exp.startDate} – ${exp.isCurrent ? 'Present' : exp.endDate})`,
              italics: true,
              size: 19,
              color: '64748B'
            })
          ]
        })
      );

      if (exp.location) {
        children.push(
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: exp.location,
                italics: true,
                size: 18,
                color: '64748B'
              })
            ]
          })
        );
      }

      // Bullets
      if (exp.description && exp.description.length > 0) {
        for (const bullet of exp.description) {
          if (bullet.trim()) {
            children.push(
              new Paragraph({
                bullet: { level: 0 },
                spacing: { after: 40 },
                children: [
                  new TextRun({
                    text: bullet,
                    size: 20,
                    color: '334155'
                  })
                ]
              })
            );
          }
        }
      }
    }
  }

  // 4. Education
  if (isSectionEnabled('education') && resume.education && resume.education.length > 0) {
    addSectionHeader(getSectionTitle('education', 'Education'));
    for (const edu of resume.education) {
      children.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({
              text: `${edu.degree} in ${edu.fieldOfStudy}`,
              bold: true,
              size: 21,
              color: '1E293B'
            }),
            new TextRun({
              text: ` — ${edu.institution}`,
              size: 21,
              color: '334155'
            }),
            new TextRun({
              text: `  (${edu.startDate} – ${edu.isCurrent ? 'Present' : edu.endDate})`,
              italics: true,
              size: 19,
              color: '64748B'
            })
          ]
        })
      );

      if (edu.gradeOrHonors) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: `Honors/Grade: ${edu.gradeOrHonors}`,
                italics: true,
                size: 19,
                color: '475569'
              })
            ]
          })
        );
      }
    }
  }

  // 5. Skills
  if (isSectionEnabled('skills') && resume.skills && resume.skills.length > 0) {
    addSectionHeader(getSectionTitle('skills', 'Key Skills & Competencies'));
    const skillList = resume.skills.map(s => s.name).join(', ');
    children.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: skillList,
            size: 21,
            color: '334155'
          })
        ]
      })
    );
  }

  // 6. Certifications
  if (isSectionEnabled('certifications') && resume.certifications && resume.certifications.length > 0) {
    addSectionHeader(getSectionTitle('certifications', 'Certifications & Licenses'));
    for (const cert of resume.certifications) {
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: cert.name,
              bold: true,
              size: 20,
              color: '1E293B'
            }),
            new TextRun({
              text: ` — ${cert.issuer} (${cert.issueDate}${cert.expiryDate ? ` – ${cert.expiryDate}` : ''})`,
              size: 20,
              color: '475569'
            })
          ]
        })
      );
    }
  }

  // 7. Projects
  if (isSectionEnabled('projects') && resume.projects && resume.projects.length > 0) {
    addSectionHeader(getSectionTitle('projects', 'Projects'));
    for (const proj of resume.projects) {
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({
              text: proj.name,
              bold: true,
              size: 21,
              color: '1E293B'
            }),
            proj.role ? new TextRun({ text: ` (${proj.role})`, italics: true, size: 19, color: '64748B' }) : new TextRun('')
          ]
        })
      );

      if (proj.description) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: proj.description,
                size: 20,
                color: '334155'
              })
            ]
          })
        );
      }
    }
  }

  // 8. Languages
  if (isSectionEnabled('languages') && resume.languages && resume.languages.length > 0) {
    addSectionHeader(getSectionTitle('languages', 'Languages'));
    const langStr = resume.languages.map(l => `${l.language} (${l.proficiency})`).join('  •  ');
    children.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: langStr,
            size: 21,
            color: '334155'
          })
        ]
      })
    );
  }

  // 9. Awards & Achievements
  if (isSectionEnabled('awards') && resume.awards && resume.awards.length > 0) {
    addSectionHeader(getSectionTitle('awards', 'Honors & Awards'));
    for (const award of resume.awards) {
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 40 },
          children: [
            new TextRun({ text: award.title, bold: true, size: 20, color: '1E293B' }),
            new TextRun({ text: ` — ${award.issuer} (${award.date})`, size: 20, color: '475569' }),
            award.description ? new TextRun({ text: `: ${award.description}`, size: 19, color: '64748B' }) : new TextRun('')
          ]
        })
      );
    }
  }

  // 10. Volunteer Experience
  if (isSectionEnabled('volunteer') && resume.volunteer && resume.volunteer.length > 0) {
    addSectionHeader(getSectionTitle('volunteer', 'Volunteer & Community Leadership'));
    for (const vol of resume.volunteer) {
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 30 },
          children: [
            new TextRun({ text: vol.role, bold: true, size: 21, color: '1E293B' }),
            new TextRun({ text: ` — ${vol.organization} (${vol.startDate} – ${vol.isCurrent ? 'Present' : vol.endDate})`, size: 20, color: '475569' })
          ]
        })
      );
      if (vol.description && vol.description.length > 0) {
        for (const desc of vol.description) {
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { after: 30 },
              children: [new TextRun({ text: desc, size: 20, color: '334155' })]
            })
          );
        }
      }
    }
  }

  // 11. Publications
  if (isSectionEnabled('publications') && resume.publications && resume.publications.length > 0) {
    addSectionHeader(getSectionTitle('publications', 'Publications & Scholarly Contributions'));
    for (const pub of resume.publications) {
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 40 },
          children: [
            new TextRun({ text: pub.title, bold: true, size: 20, color: '1E293B' }),
            new TextRun({ text: ` — ${pub.publisher} (${pub.date})`, italics: true, size: 19, color: '475569' })
          ]
        })
      );
    }
  }

  // 12. Custom Sections
  if (resume.customSections && resume.customSections.length > 0) {
    for (const custom of resume.customSections) {
      if (custom.title && custom.content) {
        addSectionHeader(custom.title);
        children.push(
          new Paragraph({
            spacing: { after: 80 },
            children: [new TextRun({ text: custom.content, size: 20, color: '334155' })]
          })
        );
      }
    }
  }

  // 13. References
  if (isSectionEnabled('references') && resume.references && resume.references.length > 0) {
    addSectionHeader(getSectionTitle('references', 'References'));
    if (resume.referencesUponRequestOnly) {
      children.push(
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: 'Available upon request.',
              italics: true,
              size: 20,
              color: '475569'
            })
          ]
        })
      );
    } else {
      for (const ref of resume.references) {
        children.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40 },
            children: [
              new TextRun({ text: ref.name, bold: true, size: 20, color: '1E293B' }),
              new TextRun({ text: `, ${ref.role} at ${ref.company}`, size: 20, color: '475569' })
            ]
          })
        );
      }
    }
  }

  // 14. GDPR Consent Clause (Poland / Europe)
  if (resume.personal.gdprConsentClause) {
    children.push(
      new Paragraph({
        spacing: { before: 300, after: 100 },
        children: [
          new TextRun({
            text: resume.personal.gdprConsentClause,
            italics: true,
            size: 16, // small legal disclaimer
            color: '64748B'
          })
        ]
      })
    );
  }

  // Create docx document with country-specific paper dimensions
  const isA4 = resume.design.paperSize === 'a4';
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: isA4 ? 11906 : 12240,
              height: isA4 ? 16838 : 15840
            },
            margin: {
              top: 720,    // 0.5 inch
              bottom: 720,
              left: 720,
              right: 720
            }
          }
        },
        children
      }
    ]
  });

  // Pack and trigger download
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

export async function exportCoverLetterToDocx(letter: {
  senderName: string;
  senderTitle?: string;
  senderEmail?: string;
  senderPhone?: string;
  senderAddress?: string;
  date: string;
  recipientName: string;
  recipientTitle?: string;
  companyName: string;
  companyAddress?: string;
  jobTitle: string;
  referenceNumber?: string;
  salutation: string;
  openingParagraph: string;
  bodyParagraphs: string[];
  closingParagraph: string;
  signOff: string;
  paperSize?: 'a4' | 'letter';
}, filename: string = 'Cover_Letter'): Promise<void> {
  const children: Paragraph[] = [];

  // Sender info
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 60 },
      children: [new TextRun({ text: letter.senderName, bold: true, size: 28, color: '1E293B' })]
    })
  );

  if (letter.senderTitle) {
    children.push(
      new Paragraph({
        spacing: { after: 60 },
        children: [new TextRun({ text: letter.senderTitle, size: 22, color: '475569' })]
      })
    );
  }

  const senderContacts = [letter.senderEmail, letter.senderPhone, letter.senderAddress].filter(Boolean).join('  |  ');
  if (senderContacts) {
    children.push(
      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun({ text: senderContacts, size: 19, color: '64748B' })]
      })
    );
  }

  // Date
  children.push(
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: letter.date, size: 20, color: '475569' })]
    })
  );

  // Recipient details
  children.push(
    new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: letter.recipientName, bold: true, size: 21, color: '1E293B' })]
    })
  );
  if (letter.recipientTitle) {
    children.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [new TextRun({ text: letter.recipientTitle, size: 20, color: '475569' })]
      })
    );
  }
  children.push(
    new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: letter.companyName, bold: true, size: 20, color: '1E293B' })]
    })
  );
  if (letter.companyAddress) {
    children.push(
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: letter.companyAddress, size: 20, color: '64748B' })]
      })
    );
  }

  // Subject line
  children.push(
    new Paragraph({
      spacing: { before: 160, after: 180 },
      children: [
        new TextRun({
          text: `Subject: Application for ${letter.jobTitle}${letter.referenceNumber ? ` (Ref: ${letter.referenceNumber})` : ''}`,
          bold: true,
          size: 22,
          color: '0F172A'
        })
      ]
    })
  );

  // Salutation
  children.push(
    new Paragraph({
      spacing: { after: 140 },
      children: [new TextRun({ text: letter.salutation, bold: true, size: 21, color: '1E293B' })]
    })
  );

  // Opening paragraph
  children.push(
    new Paragraph({
      spacing: { after: 140 },
      children: [new TextRun({ text: letter.openingParagraph, size: 21, color: '334155' })]
    })
  );

  // Body paragraphs
  for (const p of letter.bodyParagraphs) {
    children.push(
      new Paragraph({
        spacing: { after: 140 },
        children: [new TextRun({ text: p, size: 21, color: '334155' })]
      })
    );
  }

  // Closing paragraph
  children.push(
    new Paragraph({
      spacing: { after: 180 },
      children: [new TextRun({ text: letter.closingParagraph, size: 21, color: '334155' })]
    })
  );

  // Sign off
  children.push(
    new Paragraph({
      spacing: { after: 180 },
      children: [new TextRun({ text: letter.signOff, size: 21, color: '1E293B' })]
    })
  );
  children.push(
    new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text: letter.senderName, bold: true, size: 22, color: '0F172A' })]
    })
  );

  const isA4 = letter.paperSize !== 'letter';
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: isA4 ? 11906 : 12240,
              height: isA4 ? 16838 : 15840
            },
            margin: { top: 1000, bottom: 1000, left: 1000, right: 1000 }
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


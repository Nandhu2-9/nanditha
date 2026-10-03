import React, { useState } from 'react';
import {
  Printer,
  Copy,
  Check,
  Download,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface ResumeDocumentViewProps {
  onPrint: () => void;
  onCopySuccess: (msg: string) => void;
}

export const ResumeDocumentView: React.FC<ResumeDocumentViewProps> = ({
  onPrint,
  onCopySuccess,
}) => {
  const [theme, setTheme] = useState<'modern' | 'classic' | 'compact'>('modern');
  const [copiedText, setCopiedText] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      const resumeElement = document.getElementById('resume-document-sheet');
      if (!resumeElement) {
        onPrint();
        setIsGeneratingPdf(false);
        return;
      }

      const { default: html2canvas } = await import('html2canvas');
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Nanditha_H_Resume.pdf');
      onCopySuccess('Nanditha_H_Resume.pdf downloaded successfully!');
    } catch (err) {
      console.error('PDF generation error, falling back to window.print', err);
      onPrint();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleCopyRawText = () => {
    const raw = `
NANDITHA H
Software Developer | Python | React JS | Django | BCA Final Year
Bengaluru, Karnataka
Phone: 7795925251 | Email: nandithah0402@gmail.com
LinkedIn: https://www.linkedin.com/in/nanditha-h-h-b0964638a
GitHub: https://github.com/nandhu2-9

PROFESSIONAL SUMMARY
Motivated BCA final-year student with a strong interest in software development and web technologies. Familiar with Python, JavaScript, HTML, CSS, React JS, Django, and database technologies. Developed an academic project integrating web development, Machine Learning, and IoT concepts. Eager to apply technical knowledge, strengthen development skills, and contribute to real-world software projects as an entry-level Software Developer.

TECHNICAL SKILLS
- Programming: Python, JavaScript
- Frontend: HTML5, CSS3, React JS
- Backend: Django
- Database: MySQL, SQLite
- Technologies: Machine Learning, OpenCV, IoT
- Tools: VS Code, Git, GitHub
- Web: Responsive Web Development

PROJECT
VoteSync – IoT & ML Smart Voting System
- Developed a prototype smart voting system combining web development, IoT, and Machine Learning concepts.
- Designed voter registration and authentication functionality.
- Implemented a voter verification concept using Python and OpenCV.
- Designed IoT monitoring functionality for device status and system information.
- Developed modules for elections, candidates, voting, and result visualization.
- Used Django for backend development and SQLite/MySQL concepts for data management.
- Designed the system as an academic prototype that can be further developed with appropriate security, testing, and compliance requirements.
Technologies: Python, Django, HTML5, CSS3, JavaScript, OpenCV, Machine Learning, IoT, SQLite/MySQL, Chart.js

EDUCATION
Bachelor of Computer Applications (BCA)
SSMRV College, Bengaluru
Final Year | Percentage: 65.95% | Expected Graduation: 2027

Pre-University Course (PUC)
Percentage: 67.5%

SSLC
Percentage: 53.96%

CORE STRENGTHS
Problem Solving, Quick Learning, Teamwork, Communication, Adaptability, Willingness to Learn, Time Management

CERTIFICATIONS
Currently building technical certifications and practical project experience.

INTERNSHIP
Fresher — No prior internship experience

LANGUAGES
English, Kannada
`.trim();

    navigator.clipboard.writeText(raw);
    setCopiedText(true);
    onCopySuccess('Plaintext resume copied to clipboard for ATS/HR portals!');
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="py-6 px-4 sm:px-6">
      {/* Control Toolbar - Hidden during print */}
      <div className="no-print max-w-4xl mx-auto mb-6 p-3.5 bg-white rounded-xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-700">Resume Format:</span>
          <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium">
            <button
              onClick={() => setTheme('modern')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                theme === 'modern'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Modern Tech
            </button>
            <button
              onClick={() => setTheme('classic')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                theme === 'classic'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Classic ATS
            </button>
            <button
              onClick={() => setTheme('compact')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                theme === 'compact'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Executive Clean
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyRawText}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Copy plain text formatted for job application textareas"
          >
            {copiedText ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Plain Text</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer ring-2 ring-indigo-500/20 active:scale-98"
            title="Generate and save PDF file directly to your device"
          >
            {isGeneratingPdf ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span className="font-semibold tracking-wide">
              {isGeneratingPdf ? 'Saving PDF...' : 'Save PDF'}
            </span>
          </button>

          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Open system print dialog"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* The Printable Resume Page Container */}
      <div
        id="resume-document-sheet"
        className={`page-container max-w-4xl mx-auto bg-white p-8 sm:p-12 transition-all ${
          theme === 'modern'
            ? 'shadow-md border border-slate-200 rounded-xl'
            : theme === 'classic'
            ? 'shadow-sm border border-slate-300 font-serif'
            : 'shadow-sm border border-slate-200'
        }`}
      >
        {/* HEADER */}
        <header
          className={`pb-5 mb-5 ${
            theme === 'modern'
              ? 'border-b-2 border-indigo-600'
              : theme === 'classic'
              ? 'border-b border-black text-center'
              : 'border-b border-slate-300'
          }`}
        >
          <div className={theme === 'classic' ? 'text-center' : ''}>
            <h1
              className={`text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 ${
                theme === 'classic' ? 'font-serif uppercase tracking-widest text-2xl' : ''
              }`}
            >
              {RESUME_DATA.name}
            </h1>
            <p
              className={`text-sm sm:text-base font-semibold mt-1 ${
                theme === 'modern' ? 'text-indigo-700' : 'text-slate-700'
              }`}
            >
              {RESUME_DATA.headline}
            </p>
          </div>

          {/* Contact Details Line */}
          <div
            className={`flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-slate-600 mt-3 ${
              theme === 'classic' ? 'justify-center' : ''
            }`}
          >
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400 no-print" />
              <span>{RESUME_DATA.location}</span>
            </span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <a
              href={`tel:${RESUME_DATA.phone}`}
              className="flex items-center gap-1 hover:text-indigo-600 text-slate-700"
            >
              <Phone className="w-3 h-3 text-slate-400 no-print" />
              <span>{RESUME_DATA.phone}</span>
            </a>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <a
              href={`mailto:${RESUME_DATA.email}`}
              className="flex items-center gap-1 hover:text-indigo-600 text-slate-700"
            >
              <Mail className="w-3 h-3 text-slate-400 no-print" />
              <span>{RESUME_DATA.email}</span>
            </a>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <a
              href={RESUME_DATA.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-indigo-600 text-indigo-700 underline sm:no-underline"
            >
              <Linkedin className="w-3 h-3 text-slate-400 no-print" />
              <span>{RESUME_DATA.linkedin}</span>
            </a>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <a
              href={RESUME_DATA.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-indigo-600 text-indigo-700 underline sm:no-underline"
            >
              <Github className="w-3 h-3 text-slate-400 no-print" />
              <span>{RESUME_DATA.github}</span>
            </a>
          </div>
        </header>

        {/* SECTION: PROFESSIONAL SUMMARY */}
        <section className="mb-5">
          <h2
            className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${
              theme === 'modern'
                ? 'text-indigo-700 border-b border-indigo-100 pb-0.5'
                : theme === 'classic'
                ? 'text-black border-b border-black pb-0.5'
                : 'text-slate-900 border-b border-slate-200 pb-0.5'
            }`}
          >
            Professional Summary
          </h2>
          <p className="text-xs sm:text-[13px] leading-relaxed text-slate-700 text-justify">
            {RESUME_DATA.summary}
          </p>
        </section>

        {/* SECTION: TECHNICAL SKILLS */}
        <section className="mb-5">
          <h2
            className={`text-xs font-bold uppercase tracking-wider mb-2 ${
              theme === 'modern'
                ? 'text-indigo-700 border-b border-indigo-100 pb-0.5'
                : theme === 'classic'
                ? 'text-black border-b border-black pb-0.5'
                : 'text-slate-900 border-b border-slate-200 pb-0.5'
            }`}
          >
            Technical Skills
          </h2>

          <div className="text-xs sm:text-[13px] space-y-1 text-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
              <span className="font-semibold text-slate-900 sm:col-span-3">Programming:</span>
              <span className="sm:col-span-9">{RESUME_DATA.skills.programming.join(', ')}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
              <span className="font-semibold text-slate-900 sm:col-span-3">Frontend:</span>
              <span className="sm:col-span-9">{RESUME_DATA.skills.frontend.join(', ')}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
              <span className="font-semibold text-slate-900 sm:col-span-3">Backend:</span>
              <span className="sm:col-span-9">{RESUME_DATA.skills.backend.join(', ')}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
              <span className="font-semibold text-slate-900 sm:col-span-3">Database:</span>
              <span className="sm:col-span-9">{RESUME_DATA.skills.database.join(', ')}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
              <span className="font-semibold text-slate-900 sm:col-span-3">Technologies:</span>
              <span className="sm:col-span-9">{RESUME_DATA.skills.technologies.join(', ')}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
              <span className="font-semibold text-slate-900 sm:col-span-3">Tools:</span>
              <span className="sm:col-span-9">{RESUME_DATA.skills.tools.join(', ')}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
              <span className="font-semibold text-slate-900 sm:col-span-3">Web:</span>
              <span className="sm:col-span-9">{RESUME_DATA.skills.web.join(', ')}</span>
            </div>
          </div>
        </section>

        {/* SECTION: PROJECT */}
        <section className="mb-5">
          <h2
            className={`text-xs font-bold uppercase tracking-wider mb-2 ${
              theme === 'modern'
                ? 'text-indigo-700 border-b border-indigo-100 pb-0.5'
                : theme === 'classic'
                ? 'text-black border-b border-black pb-0.5'
                : 'text-slate-900 border-b border-slate-200 pb-0.5'
            }`}
          >
            Project
          </h2>

          <div>
            <div className="flex flex-wrap items-baseline justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900">
                {RESUME_DATA.project.title}
              </h3>
              <span className="text-xs text-slate-500 font-mono">Academic Capstone</span>
            </div>

            <ul className="list-disc ml-4 space-y-1 text-xs sm:text-[13px] text-slate-700 leading-relaxed mb-2">
              {RESUME_DATA.project.bullets.map((bullet, idx) => (
                <li key={idx} className="pl-0.5">
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="text-xs text-slate-600 mt-1.5 pt-1 border-t border-slate-100">
              <span className="font-semibold text-slate-800">Technologies: </span>
              <span>{RESUME_DATA.project.technologies.join(', ')}</span>
            </div>
          </div>
        </section>

        {/* SECTION: EDUCATION */}
        <section className="mb-5">
          <h2
            className={`text-xs font-bold uppercase tracking-wider mb-2 ${
              theme === 'modern'
                ? 'text-indigo-700 border-b border-indigo-100 pb-0.5'
                : theme === 'classic'
                ? 'text-black border-b border-black pb-0.5'
                : 'text-slate-900 border-b border-slate-200 pb-0.5'
            }`}
          >
            Education
          </h2>

          <div className="space-y-2.5 text-xs sm:text-[13px]">
            {/* BCA */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between">
                <span className="font-bold text-slate-900">
                  {RESUME_DATA.education[0].degree}
                </span>
                <span className="font-mono text-slate-600 font-medium">
                  {RESUME_DATA.education[0].percentage}
                </span>
              </div>
              <div className="flex flex-wrap justify-between text-slate-600 text-xs">
                <span>{RESUME_DATA.education[0].institution}</span>
                <span>
                  {RESUME_DATA.education[0].status} · Expected Graduation: {RESUME_DATA.education[0].expectedGraduation}
                </span>
              </div>
            </div>

            {/* PUC */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between">
                <span className="font-bold text-slate-900">
                  {RESUME_DATA.education[1].degree}
                </span>
                <span className="font-mono text-slate-600 font-medium">
                  {RESUME_DATA.education[1].percentage}
                </span>
              </div>
              <div className="text-slate-600 text-xs">{RESUME_DATA.education[1].board}</div>
            </div>

            {/* SSLC */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between">
                <span className="font-bold text-slate-900">
                  {RESUME_DATA.education[2].degree}
                </span>
                <span className="font-mono text-slate-600 font-medium">
                  {RESUME_DATA.education[2].percentage}
                </span>
              </div>
              <div className="text-slate-600 text-xs">{RESUME_DATA.education[2].board}</div>
            </div>
          </div>
        </section>

        {/* SECTION: CORE STRENGTHS */}
        <section className="mb-5">
          <h2
            className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${
              theme === 'modern'
                ? 'text-indigo-700 border-b border-indigo-100 pb-0.5'
                : theme === 'classic'
                ? 'text-black border-b border-black pb-0.5'
                : 'text-slate-900 border-b border-slate-200 pb-0.5'
            }`}
          >
            Core Strengths
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-700">
            {RESUME_DATA.strengths.join(' · ')}
          </p>
        </section>

        {/* SECTION: CERTIFICATIONS & INTERNSHIP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <h2
              className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                theme === 'modern'
                  ? 'text-indigo-700 border-b border-indigo-100 pb-0.5'
                  : theme === 'classic'
                ? 'text-black border-b border-black pb-0.5'
                : 'text-slate-900 border-b border-slate-200 pb-0.5'
              }`}
            >
              Certifications
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              {RESUME_DATA.certifications}
            </p>
          </div>

          <div>
            <h2
              className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                theme === 'modern'
                  ? 'text-indigo-700 border-b border-indigo-100 pb-0.5'
                  : theme === 'classic'
                ? 'text-black border-b border-black pb-0.5'
                : 'text-slate-900 border-b border-slate-200 pb-0.5'
              }`}
            >
              Internship
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              {RESUME_DATA.internship}
            </p>
          </div>
        </div>

        {/* SECTION: LANGUAGES */}
        <section>
          <h2
            className={`text-xs font-bold uppercase tracking-wider mb-1 ${
              theme === 'modern'
                ? 'text-indigo-700 border-b border-indigo-100 pb-0.5'
                : theme === 'classic'
                ? 'text-black border-b border-black pb-0.5'
                : 'text-slate-900 border-b border-slate-200 pb-0.5'
            }`}
          >
            Languages
          </h2>
          <p className="text-xs text-slate-700">
            {RESUME_DATA.languages.map((l) => `${l.language} (${l.proficiency})`).join(' · ')}
          </p>
        </section>
      </div>
    </div>
  );
};

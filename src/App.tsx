import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  CheckCircle,
  Copy,
  ArrowRight,
  ExternalLink,
  Code2,
  Sparkles,
  Layers,
  Award,
  ChevronRight,
} from 'lucide-react';
import { RESUME_DATA } from './data/resumeData';
import { Navbar } from './components/Navbar';
import { VoteSyncSimulator } from './components/VoteSyncSimulator';
import { ResumeDocumentView } from './components/ResumeDocumentView';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ContactModal } from './components/ContactModal';
import { Toast } from './components/Toast';

import votesyncPreviewImg from './assets/images/votesync_iot_preview_1791055953839.jpg';
import avatarImg from './assets/images/developer_avatar_badge_1791055968441.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<'showcase' | 'document'>('showcase');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handlePrint = () => {
    // Switch to document view if in showcase so the printable sheet is rendered
    if (activeTab !== 'document') {
      setActiveTab('document');
      setTimeout(() => {
        window.print();
      }, 250);
    } else {
      window.print();
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Universal 3-zone Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenContact={() => setIsContactOpen(true)}
        onPrint={handlePrint}
      />

      {/* Main View Router */}
      {activeTab === 'document' ? (
        <main>
          <ResumeDocumentView
            onPrint={handlePrint}
            onCopySuccess={showToast}
          />
        </main>
      ) : (
        <main>
          {/* HERO SECTION */}
          <section id="hero" className="py-12 md:py-16 border-b border-slate-200/80 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left Column: Hero Content */}
                <div className="lg:col-span-7 space-y-5">
                  <div>
                    {/* Clean unboxed metadata separator */}
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-2">
                      <span>Bengaluru, Karnataka</span>
                      <span aria-hidden="true">·</span>
                      <span>BCA Final Year</span>
                      <span aria-hidden="true">·</span>
                      <span>Entry-Level Developer</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                      Nanditha H
                    </h1>

                    <p className="text-lg sm:text-xl font-medium text-indigo-700 mt-2">
                      Software Developer · Python · React JS · Django
                    </p>
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl">
                    {RESUME_DATA.summary}
                  </p>

                  {/* Clean unboxed metadata info */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500 pt-1">
                    <span>SSMRV College, Bengaluru</span>
                    <span aria-hidden="true">·</span>
                    <span>Expected Graduation: 2027</span>
                    <span aria-hidden="true">·</span>
                    <span>BCA Score: <strong className="text-slate-800">65.95%</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>English & Kannada</span>
                  </div>

                  {/* Direct Contact & Action Bar */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setIsContactOpen(true)}
                      className="px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Contact / Schedule Interview</span>
                    </button>

                    <button
                      onClick={handlePrint}
                      className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-600" />
                      <span>Download / Print ATS Resume</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('document')}
                      className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Formatted CV</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Visual Profile Card */}
                <div className="lg:col-span-5">
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-xs relative">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-indigo-100 border border-indigo-200 shrink-0">
                        <img
                          src={avatarImg}
                          alt="Nanditha H - Software Developer Avatar"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="text-base font-bold text-slate-900">
                          Nanditha H
                        </div>
                        <div className="text-xs text-indigo-600 font-medium">
                          Software Developer Candidate
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>Bengaluru, Karnataka</span>
                        </div>
                      </div>
                    </div>

                    {/* Fast links */}
                    <div className="space-y-2 text-xs border-t border-slate-200/70 pt-4">
                      <div className="flex items-center justify-between py-1">
                        <span className="text-slate-500">Phone:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-800 font-semibold">{RESUME_DATA.phone}</span>
                          <button
                            onClick={() => copyToClipboard(RESUME_DATA.phone, 'Phone number')}
                            className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 cursor-pointer"
                            title="Copy Phone"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-1">
                        <span className="text-slate-500">Email:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-800 text-[11px] truncate max-w-[150px]">{RESUME_DATA.email}</span>
                          <button
                            onClick={() => copyToClipboard(RESUME_DATA.email, 'Email address')}
                            className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 cursor-pointer"
                            title="Copy Email"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-1">
                        <span className="text-slate-500">LinkedIn:</span>
                        <a
                          href={RESUME_DATA.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                        >
                          <span>nanditha-h-h</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="flex items-center justify-between py-1">
                        <span className="text-slate-500">GitHub:</span>
                        <a
                          href={RESUME_DATA.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                        >
                          <span>nandhu2-9</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/70 text-[11px] text-slate-500 flex justify-between items-center">
                      <span>Status: <strong className="text-emerald-700">Immediate Hire (Fresher)</strong></span>
                      <span className="font-mono">Grad 2027</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FLAGSHIP PROJECT SECTION: VOTESYNC */}
          <section id="project-votesync" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
                <span>Featured Academic Project</span>
                <span aria-hidden="true">·</span>
                <span>Full-Stack + ML + IoT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                VoteSync – IoT & ML Smart Voting System
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                A prototype smart voting system integrating responsive web development, voter facial biometric verification with OpenCV, and IoT hardware telemetry for tamper-free voting booths.
              </p>
            </div>

            {/* Project Overview Card with Image Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-start">
              <div className="lg:col-span-6 space-y-4">
                <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                    Key Project Implementations & Responsibilities
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700 leading-relaxed list-disc pl-4">
                    {RESUME_DATA.project.bullets.map((bullet, idx) => (
                      <li key={idx} className="pl-1">
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-900 block mb-1.5">
                      Technologies & Libraries:
                    </span>
                    <div className="text-xs text-slate-600 flex flex-wrap gap-x-2 gap-y-1 font-mono">
                      {RESUME_DATA.project.technologies.map((t, idx) => (
                        <React.Fragment key={idx}>
                          <span>{t}</span>
                          {idx < RESUME_DATA.project.technologies.length - 1 && (
                            <span className="text-slate-300 font-sans" aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Architectural Layers Breakdown */}
                <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    System Architecture Layers
                  </h3>
                  <div className="space-y-2.5 text-xs">
                    {RESUME_DATA.project.architecture.map((arch, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <span className="font-bold text-slate-900">{arch.layer}</span>
                          <span className="font-mono text-[11px] text-indigo-700">{arch.tech}</span>
                        </div>
                        <p className="text-slate-600 text-[11px]">{arch.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image Showcase & Preview */}
              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs bg-slate-950">
                  <img
                    src={votesyncPreviewImg}
                    alt="VoteSync IoT and ML Smart Voting System Dashboard"
                    className="w-full h-auto object-cover aspect-16/9"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-3 bg-slate-900 text-xs text-slate-400 flex justify-between items-center">
                    <span>VoteSync: Biometric Detection & IoT Health Console</span>
                    <span className="font-mono text-emerald-400">STATUS: PROTOTYPE_READY</span>
                  </div>
                </div>

                {/* Quick note on prototype scope */}
                <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-100 text-xs text-slate-700">
                  <strong className="text-indigo-900 font-semibold block mb-1">
                    Academic Scope & Future Roadmap:
                  </strong>
                  Designed as an academic prototype exploring multi-factor voter authentication and booth integrity. Future enhancements include hardware cryptographic chips and formal regulatory compliance testing.
                </div>
              </div>
            </div>

            {/* Interactive Live Simulation Terminal */}
            <div className="mt-8">
              <VoteSyncSimulator />
            </div>
          </section>

          {/* SKILLS SECTION */}
          <SkillsSection />

          {/* EDUCATION & QUALIFICATIONS SECTION */}
          <EducationSection />

          {/* RECRUITER OUTREACH BANNER */}
          <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
            <div className="p-8 sm:p-10 rounded-2xl bg-indigo-900 text-white relative overflow-hidden shadow-lg">
              <div className="relative z-10 max-w-2xl space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                  Seeking Entry-Level Software Engineering Roles
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Ready to contribute to your engineering team in Bengaluru or remote.
                </h2>
                <p className="text-sm text-indigo-100 leading-relaxed">
                  BCA Final Year student at SSMRV College with practical hands-on experience in Python, Django, React JS, and modern web application development. Quick to learn, eager to solve problems, and ready for full-time junior developer or graduate trainee opportunities.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="px-5 py-2.5 bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-sm"
                  >
                    Send Direct Message
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-5 py-2.5 bg-indigo-800 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Print / Save ATS PDF
                  </button>
                  <a
                    href={`tel:${RESUME_DATA.phone}`}
                    className="px-5 py-2.5 text-xs font-semibold text-indigo-200 hover:text-white transition-colors"
                  >
                    Call: {RESUME_DATA.phone}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-200/80 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-900">{RESUME_DATA.name}</span>
            <span className="text-slate-300">·</span>
            <span>Software Developer</span>
            <span className="text-slate-300">·</span>
            <span>Bengaluru, Karnataka</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${RESUME_DATA.email}`}
              className="hover:text-indigo-600 transition-colors"
            >
              {RESUME_DATA.email}
            </a>
            <span className="text-slate-300">·</span>
            <a
              href={RESUME_DATA.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-600 transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-slate-300">·</span>
            <a
              href={RESUME_DATA.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-600 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onCopySuccess={showToast}
      />

      {/* Floating Notification Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}

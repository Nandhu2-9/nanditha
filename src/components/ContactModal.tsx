import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Linkedin, Github, Copy, Check, Send } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopySuccess: (msg: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onCopySuccess,
}) => {
  const [template, setTemplate] = useState<string>('interview');
  const [recruiterName, setRecruiterName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(label);
    onCopySuccess(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const getSubject = () => {
    if (template === 'interview') {
      return `Job Opportunity: Software Developer Role at ${companyName || 'our company'}`;
    }
    if (template === 'trainee') {
      return `BCA Graduate Software Trainee Interview - ${companyName || 'Engineering Team'}`;
    }
    return `Inquiry regarding your Software Developer Portfolio & Resume`;
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(getSubject());
    const body = encodeURIComponent(
      `Hello Nanditha,\n\nWe came across your Software Developer portfolio and the VoteSync project. We are interested in discussing an entry-level opportunity with our engineering team at ${companyName || '[Company Name]'}.\n\nBest regards,\n${recruiterName || '[Your Name]'}`
    );
    return `mailto:${RESUME_DATA.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Contact Nanditha H
            </h3>
            <p className="text-xs text-slate-500">
              Software Developer · Bengaluru, Karnataka
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Quick Contact Rows */}
          <div className="space-y-2.5">
            {/* Phone */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Phone / WhatsApp</div>
                  <div className="font-mono text-slate-600">{RESUME_DATA.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(RESUME_DATA.phone, 'Phone number')}
                  className="px-2.5 py-1 rounded text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  {copiedType === 'Phone number' ? 'Copied!' : 'Copy'}
                </button>
                <a
                  href={`tel:${RESUME_DATA.phone}`}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-medium transition-colors"
                >
                  Call
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Email Address</div>
                  <div className="font-mono text-slate-600">{RESUME_DATA.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(RESUME_DATA.email, 'Email address')}
                  className="px-2.5 py-1 rounded text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  {copiedType === 'Email address' ? 'Copied!' : 'Copy'}
                </button>
                <a
                  href={getMailtoLink()}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-medium transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={RESUME_DATA.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-xs transition-colors"
            >
              <Linkedin className="w-4 h-4 text-indigo-600" />
              <div>
                <div className="font-semibold text-slate-900">LinkedIn Profile</div>
                <div className="text-[11px] text-slate-500 truncate">nanditha-h-h</div>
              </div>
            </a>

            <a
              href={RESUME_DATA.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-xs transition-colors"
            >
              <Github className="w-4 h-4 text-slate-800" />
              <div>
                <div className="font-semibold text-slate-900">GitHub Profile</div>
                <div className="text-[11px] text-slate-500 truncate">nandhu2-9</div>
              </div>
            </a>
          </div>

          {/* Recruiter One-Click Email Launcher */}
          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Compose Direct Email to Nanditha:
            </label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <input
                type="text"
                placeholder="Your Name (Optional)"
                value={recruiterName}
                onChange={(e) => setRecruiterName(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Company / Team Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <a
              href={getMailtoLink()}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Launch Mail Client with Pre-filled Note</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

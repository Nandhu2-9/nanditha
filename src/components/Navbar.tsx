import React from 'react';
import { Printer, Mail, FileText, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'showcase' | 'document';
  setActiveTab: (tab: 'showcase' | 'document') => void;
  onOpenContact: () => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenContact,
  onPrint,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => {
              if (activeTab === 'document') {
                e.preventDefault();
                setActiveTab('showcase');
              }
            }}
            className="text-lg font-bold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors whitespace-nowrap"
          >
            Nanditha H
          </a>
          <span className="hidden sm:inline text-xs text-slate-400 font-mono">
            / Software Developer
          </span>
        </div>

        {/* Zone 2: Clean 4-6 text navigation links & view tabs */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('showcase')}
            className={`transition-colors text-sm font-medium hover:text-slate-900 ${
              activeTab === 'showcase' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            Interactive Portfolio
          </button>
          <a
            href="#project-votesync"
            onClick={() => setActiveTab('showcase')}
            className="hover:text-slate-900 transition-colors"
          >
            VoteSync Project
          </a>
          <a
            href="#skills"
            onClick={() => setActiveTab('showcase')}
            className="hover:text-slate-900 transition-colors"
          >
            Skills & Tech
          </a>
          <a
            href="#education"
            onClick={() => setActiveTab('showcase')}
            className="hover:text-slate-900 transition-colors"
          >
            Education
          </a>
          <button
            onClick={() => setActiveTab('document')}
            className={`transition-colors text-sm font-medium hover:text-slate-900 flex items-center gap-1.5 ${
              activeTab === 'document' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Resume Document
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onPrint}
            title="Export or Print ATS Resume (PDF)"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Print / Save PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        </div>
      </div>

      {/* Mobile Secondary Tab Switcher */}
      <div className="md:hidden flex border-t border-slate-200/80 bg-slate-50/90 px-4 py-1.5 justify-around text-xs">
        <button
          onClick={() => setActiveTab('showcase')}
          className={`py-1 px-3 rounded font-medium transition-colors ${
            activeTab === 'showcase'
              ? 'bg-white text-indigo-700 shadow-xs'
              : 'text-slate-600'
          }`}
        >
          Portfolio View
        </button>
        <button
          onClick={() => setActiveTab('document')}
          className={`py-1 px-3 rounded font-medium transition-colors ${
            activeTab === 'document'
              ? 'bg-white text-indigo-700 shadow-xs'
              : 'text-slate-600'
          }`}
        >
          ATS Resume View
        </button>
      </div>
    </header>
  );
};

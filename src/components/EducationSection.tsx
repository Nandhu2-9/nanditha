import React from 'react';
import { GraduationCap, Award, Languages, Compass, BookOpen, Check } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-12 border-t border-slate-200/80 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Academic Credentials */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
                Academic Background
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Education & Qualifications
              </h2>
            </div>

            <div className="space-y-4">
              {/* BCA Final Year Card */}
              <div className="p-5 bg-white rounded-xl border-2 border-indigo-100 shadow-xs relative">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                      Undergraduate Degree
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      Bachelor of Computer Applications (BCA)
                    </h3>
                    <p className="text-xs font-medium text-slate-600">
                      SSMRV College, Bengaluru
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block font-mono text-base font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      65.95%
                    </span>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      Graduation: 2027
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 mb-3">
                  Status: <strong className="text-slate-800">Final Year Student</strong>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-700 mb-1.5">
                    Key Academic Coursework & Focus:
                  </div>
                  <div className="text-xs text-slate-600 flex flex-wrap gap-x-2 gap-y-1">
                    <span>Data Structures</span>
                    <span className="text-slate-300">·</span>
                    <span>Python & OOP</span>
                    <span className="text-slate-300">·</span>
                    <span>Database Management Systems (DBMS)</span>
                    <span className="text-slate-300">·</span>
                    <span>Web Application Architecture</span>
                  </div>
                </div>
              </div>

              {/* PUC Card */}
              <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Higher Secondary
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      Pre-University Course (PUC)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Karnataka State Board
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      67.5%
                    </span>
                    <div className="text-[11px] text-slate-500 mt-0.5">Completed</div>
                  </div>
                </div>
              </div>

              {/* SSLC Card */}
              <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Secondary Education
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      Secondary School Leaving Certificate (SSLC)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Karnataka Secondary Education Examination Board
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      53.96%
                    </span>
                    <div className="text-[11px] text-slate-500 mt-0.5">Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Strengths, Languages & Fresher Note */}
          <div className="lg:col-span-5 space-y-6">
            {/* Core Strengths */}
            <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-indigo-600">
                <Award className="w-4 h-4" />
                <h3 className="text-sm font-bold text-slate-900">Core Professional Strengths</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {RESUME_DATA.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-indigo-600">
                <Languages className="w-4 h-4" />
                <h3 className="text-sm font-bold text-slate-900">Languages</h3>
              </div>
              <div className="space-y-2 text-xs">
                {RESUME_DATA.languages.map((lang, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-100 last:border-none">
                    <span className="font-semibold text-slate-800">{lang.language}</span>
                    <span className="text-slate-500">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Readiness & Fresher Profile */}
            <div className="p-5 bg-indigo-50/70 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-2 mb-2 text-indigo-700">
                <Compass className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Career Readiness & Roles
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                {RESUME_DATA.internship}
              </p>
              <div className="text-[11px] text-indigo-900 bg-white/80 p-2.5 rounded-lg border border-indigo-100/80">
                <strong>Target Roles:</strong> Entry-Level Software Developer, Junior Python Developer, Junior React / Full-Stack Engineer Trainee.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

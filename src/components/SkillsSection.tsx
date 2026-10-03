import React, { useState } from 'react';
import { Terminal, Database, Layout, Wrench, Cpu, Globe, Check } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const skillCategories = [
    {
      id: 'all',
      label: 'All Skills',
    },
    {
      id: 'programming',
      label: 'Programming',
      icon: Terminal,
      skills: RESUME_DATA.skills.programming,
      context: 'Core algorithmic problem solving in Python and ES6+ JavaScript.',
    },
    {
      id: 'backend',
      label: 'Backend & DB',
      icon: Database,
      skills: [...RESUME_DATA.skills.backend, ...RESUME_DATA.skills.database],
      context: 'Django REST endpoints, ORM modeling, SQLite/MySQL migrations & ACID transactions.',
    },
    {
      id: 'frontend',
      label: 'Frontend & UI',
      icon: Layout,
      skills: [...RESUME_DATA.skills.frontend, ...RESUME_DATA.skills.web],
      context: 'Component-driven interfaces in React JS, modern semantic HTML5, CSS3 flex/grid & responsiveness.',
    },
    {
      id: 'tech',
      label: 'ML & IoT',
      icon: Cpu,
      skills: RESUME_DATA.skills.technologies,
      context: 'OpenCV computer vision pipelines, image processing, and IoT hardware telemetry.',
    },
    {
      id: 'tools',
      label: 'Developer Tools',
      icon: Wrench,
      skills: RESUME_DATA.skills.tools,
      context: 'VS Code productivity, Git source control workflows, and GitHub collaboration.',
    },
  ];

  return (
    <section id="skills" className="py-12 border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
              Technical Competencies
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Skills & Development Stack
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Hands-on technical proficiency demonstrated across academic projects and full-stack software development.
          </p>
        </div>

        {/* Filter controls following Zero-Pill & Tab rules */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl mb-8 max-w-fit">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid - Zero Pill rule: unboxed text with typographic separators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Programming */}
          <div className={`p-5 rounded-xl border border-slate-200/90 bg-white transition-all ${selectedCategory !== 'all' && selectedCategory !== 'programming' ? 'opacity-40' : ''}`}>
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
              <Terminal className="w-4 h-4" />
              <h3 className="text-sm font-bold text-slate-900">Programming Languages</h3>
            </div>
            <div className="text-sm text-slate-700 font-medium flex items-center gap-2 mb-2">
              <span>Python</span>
              <span className="text-slate-300">·</span>
              <span>JavaScript</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Algorithmic logic, scripting, backend processing in Python, and interactive DOM manipulation in JavaScript.
            </p>
          </div>

          {/* Frontend */}
          <div className={`p-5 rounded-xl border border-slate-200/90 bg-white transition-all ${selectedCategory !== 'all' && selectedCategory !== 'frontend' ? 'opacity-40' : ''}`}>
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
              <Layout className="w-4 h-4" />
              <h3 className="text-sm font-bold text-slate-900">Frontend Development</h3>
            </div>
            <div className="text-sm text-slate-700 font-medium flex items-center gap-2 mb-2">
              <span>React JS</span>
              <span className="text-slate-300">·</span>
              <span>HTML5</span>
              <span className="text-slate-300">·</span>
              <span>CSS3</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Component-based UI architectures, state handling, responsive design, and CSS layout engines.
            </p>
          </div>

          {/* Backend */}
          <div className={`p-5 rounded-xl border border-slate-200/90 bg-white transition-all ${selectedCategory !== 'all' && selectedCategory !== 'backend' ? 'opacity-40' : ''}`}>
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
              <Database className="w-4 h-4" />
              <h3 className="text-sm font-bold text-slate-900">Backend & Databases</h3>
            </div>
            <div className="text-sm text-slate-700 font-medium flex items-center gap-2 mb-2">
              <span>Django</span>
              <span className="text-slate-300">·</span>
              <span>MySQL</span>
              <span className="text-slate-300">·</span>
              <span>SQLite</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Django ORM, MVC pattern, RESTful request routing, relational tables, and atomic operations.
            </p>
          </div>

          {/* Core Technologies: ML & IoT */}
          <div className={`p-5 rounded-xl border border-slate-200/90 bg-white transition-all ${selectedCategory !== 'all' && selectedCategory !== 'tech' ? 'opacity-40' : ''}`}>
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
              <Cpu className="w-4 h-4" />
              <h3 className="text-sm font-bold text-slate-900">Technologies</h3>
            </div>
            <div className="text-sm text-slate-700 font-medium flex items-center gap-2 mb-2">
              <span>Machine Learning</span>
              <span className="text-slate-300">·</span>
              <span>OpenCV</span>
              <span className="text-slate-300">·</span>
              <span>IoT</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Computer vision template matching, Haar cascades, facial feature extraction, and hardware sensor telemetry.
            </p>
          </div>

          {/* Developer Tools */}
          <div className={`p-5 rounded-xl border border-slate-200/90 bg-white transition-all ${selectedCategory !== 'all' && selectedCategory !== 'tools' ? 'opacity-40' : ''}`}>
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
              <Wrench className="w-4 h-4" />
              <h3 className="text-sm font-bold text-slate-900">Developer Tools</h3>
            </div>
            <div className="text-sm text-slate-700 font-medium flex items-center gap-2 mb-2">
              <span>VS Code</span>
              <span className="text-slate-300">·</span>
              <span>Git</span>
              <span className="text-slate-300">·</span>
              <span>GitHub</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Version control branching, commit hygiene, repository management, and extensions ecosystem.
            </p>
          </div>

          {/* Web Design */}
          <div className={`p-5 rounded-xl border border-slate-200/90 bg-white transition-all ${selectedCategory !== 'all' && selectedCategory !== 'frontend' ? 'opacity-40' : ''}`}>
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
              <Globe className="w-4 h-4" />
              <h3 className="text-sm font-bold text-slate-900">Web Engineering</h3>
            </div>
            <div className="text-sm text-slate-700 font-medium flex items-center gap-2 mb-2">
              <span>Responsive Web Development</span>
              <span className="text-slate-300">·</span>
              <span>Chart.js</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Cross-device media queries, accessibility standards, data visualization dashboards, and DOM performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

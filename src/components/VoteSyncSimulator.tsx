import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Cpu,
  Camera,
  Vote,
  BarChart3,
  RefreshCw,
  Check,
  Code2,
  Lock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface Candidate {
  id: string;
  name: string;
  party: string;
  tagline: string;
  votes: number;
  color: string;
}

const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'c1',
    name: 'Priya Sharma',
    party: 'Tech & Innovation Coalition',
    tagline: 'Smart City & Digital Infrastructure',
    votes: 142,
    color: 'bg-indigo-600',
  },
  {
    id: 'c2',
    name: 'Rahul Hegde',
    party: 'Sustainable Growth Forum',
    tagline: 'Green Energy & Youth Employment',
    votes: 118,
    color: 'bg-teal-600',
  },
  {
    id: 'c3',
    name: 'Ananya Rao',
    party: 'Progressive Student Union',
    tagline: 'Modern Labs & Education Equity',
    votes: 95,
    color: 'bg-amber-600',
  },
];

export const VoteSyncSimulator: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [voterId, setVoterId] = useState('VOT-BLR-8492');
  const [isScanning, setIsScanning] = useState(false);
  const [faceConfidence, setFaceConfidence] = useState(97.4);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [hasVoted, setHasVoted] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<number>(0);
  const [showCodeExplorer, setShowCodeExplorer] = useState(false);

  // IoT sensor health
  const [iotStatus, setIotStatus] = useState({
    terminalId: 'NODE-ESP32-BLR-04',
    pingLatency: '14ms',
    tamperSwitch: 'Normal (Tamper-Free)',
    batteryLevel: '98%',
    encryption: 'AES-256 GCM',
  });

  const handleStartScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setFaceConfidence(Math.floor(94 + Math.random() * 5));
      setStep(3);
    }, 1800);
  };

  const handleCastVote = () => {
    if (!selectedCandidate) return;
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === selectedCandidate ? { ...c, votes: c.votes + 1 } : c
      )
    );
    setHasVoted(true);
    setStep(5);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // safe fallback
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedCandidate(null);
    setHasVoted(false);
  };

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Header bar of the simulation widget */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Interactive Prototype Sandbox
            </span>
            <span className="text-slate-300 font-mono">/</span>
            <span className="text-xs text-slate-500 font-mono">
              BCA Capstone Project
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            VoteSync: Live Biometric & IoT Voting Workflow
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCodeExplorer(!showCodeExplorer)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <Code2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{showCodeExplorer ? 'Hide Code' : 'Inspect Code & Architecture'}</span>
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Reset Simulator"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Code & Architecture Drawer */}
      {showCodeExplorer && (
        <div className="border-b border-slate-200 bg-slate-900 text-slate-100 p-5 transition-all">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <div className="flex gap-2">
              {RESUME_DATA.project.snippets.map((snip, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCodeTab(idx)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeCodeTab === idx
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {snip.title}
                </button>
              ))}
            </div>
            <span className="text-xs font-mono text-slate-400">
              Language: {RESUME_DATA.project.snippets[activeCodeTab].language}
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-3 font-sans">
            {RESUME_DATA.project.snippets[activeCodeTab].description}
          </p>
          <pre className="p-3 bg-slate-950 rounded-lg overflow-x-auto text-xs font-mono text-emerald-400 leading-relaxed border border-slate-800/80">
            <code>{RESUME_DATA.project.snippets[activeCodeTab].code}</code>
          </pre>
        </div>
      )}

      {/* Simulator Stepper Indicator */}
      <div className="grid grid-cols-5 border-b border-slate-100 text-center text-xs">
        <div
          className={`py-2.5 px-2 transition-colors border-r border-slate-100 ${
            step === 1
              ? 'bg-indigo-50 font-semibold text-indigo-700'
              : step > 1
              ? 'text-slate-600 bg-slate-50/40'
              : 'text-slate-400'
          }`}
        >
          1. Voter ID
        </div>
        <div
          className={`py-2.5 px-2 transition-colors border-r border-slate-100 ${
            step === 2
              ? 'bg-indigo-50 font-semibold text-indigo-700'
              : step > 2
              ? 'text-slate-600 bg-slate-50/40'
              : 'text-slate-400'
          }`}
        >
          2. OpenCV Face Scan
        </div>
        <div
          className={`py-2.5 px-2 transition-colors border-r border-slate-100 ${
            step === 3
              ? 'bg-indigo-50 font-semibold text-indigo-700'
              : step > 3
              ? 'text-slate-600 bg-slate-50/40'
              : 'text-slate-400'
          }`}
        >
          3. IoT Health Check
        </div>
        <div
          className={`py-2.5 px-2 transition-colors border-r border-slate-100 ${
            step === 4
              ? 'bg-indigo-50 font-semibold text-indigo-700'
              : step > 4
              ? 'text-slate-600 bg-slate-50/40'
              : 'text-slate-400'
          }`}
        >
          4. Cast Ballot
        </div>
        <div
          className={`py-2.5 px-2 transition-colors ${
            step === 5
              ? 'bg-emerald-50 font-semibold text-emerald-700'
              : 'text-slate-400'
          }`}
        >
          5. Live Results
        </div>
      </div>

      {/* Interactive Step Content */}
      <div className="p-6">
        {/* Step 1: Voter Identification */}
        {step === 1 && (
          <div className="max-w-md mx-auto text-center py-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 mx-auto flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Voter Authentication Check
            </h4>
            <p className="text-sm text-slate-600 mt-1 mb-5">
              Simulates voter eligibility lookup in the Django SQLite/MySQL voter database.
            </p>

            <div className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Electoral Voter ID (Sample ID Provided)
                </label>
                <input
                  type="text"
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono"
                  placeholder="Enter Voter ID"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Constituency:</span>
                  <span className="font-semibold text-slate-800">Bengaluru South, KA</span>
                </div>
                <div className="flex justify-between">
                  <span>Polling Booth Node:</span>
                  <span className="font-mono text-slate-800">SSMRV-BOOTH-03</span>
                </div>
                <div className="flex justify-between">
                  <span>Ballot Status:</span>
                  <span className="text-emerald-600 font-medium">Eligible (Uncast)</span>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-xs"
              >
                Authenticate & Proceed to Facial Biometric Scan
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Facial Biometric Verification */}
        {step === 2 && (
          <div className="max-w-lg mx-auto py-2">
            <div className="text-center mb-4">
              <h4 className="text-lg font-bold text-slate-900">
                OpenCV Face Verification Module
              </h4>
              <p className="text-xs text-slate-600">
                Haar Cascade & normalized template correlation matcher
              </p>
            </div>

            {/* Simulated Camera Viewport */}
            <div className="relative aspect-4/3 max-w-sm mx-auto bg-slate-950 rounded-xl overflow-hidden border-2 border-indigo-500/80 shadow-md flex items-center justify-center">
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>

              {/* Face target frame */}
              <div className="relative w-48 h-56 border-2 border-dashed border-emerald-400 rounded-2xl flex flex-col items-center justify-between p-3">
                <div className="w-full flex justify-between text-[10px] font-mono text-emerald-400">
                  <span>ROI: [120, 80, 240, 280]</span>
                  <span>OPENCV_OK</span>
                </div>

                <div className="w-24 h-24 rounded-full border-2 border-emerald-400/60 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-emerald-400 animate-pulse" />
                </div>

                {/* Simulated scan line */}
                {isScanning && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-bounce"></div>
                )}

                <div className="text-center">
                  <span className="text-[11px] font-mono text-emerald-400 bg-slate-900/90 px-2 py-0.5 rounded">
                    {isScanning ? 'EXTRACTING BIOMETRIC EMBEDDING...' : 'FRAME READY'}
                  </span>
                </div>
              </div>

              {/* Hardware watermark */}
              <div className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-400">
                CAM: OV5640 1080p @ 30fps
              </div>
            </div>

            <div className="mt-5 text-center">
              <button
                disabled={isScanning}
                onClick={handleStartScan}
                className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-xs inline-flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>{isScanning ? 'Running OpenCV Analysis...' : 'Trigger Face Scan & Match'}</span>
              </button>
              <p className="text-xs text-slate-500 mt-2">
                Simulates real-time face template correlation against registered voter dataset.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: IoT Device Health Check */}
        {step === 3 && (
          <div className="max-w-md mx-auto py-2">
            <div className="text-center mb-4">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 mx-auto flex items-center justify-center mb-2">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                IoT Node Telemetry & Verification
              </h4>
              <p className="text-xs text-slate-600">
                Biometric match confirmed at <span className="font-semibold text-emerald-700">{faceConfidence}% confidence</span>.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-200">
                <span className="text-slate-600">Terminal Node ID:</span>
                <span className="font-mono font-semibold text-slate-900">{iotStatus.terminalId}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200">
                <span className="text-slate-600">Heartbeat Latency:</span>
                <span className="font-mono font-semibold text-emerald-600">{iotStatus.pingLatency}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200">
                <span className="text-slate-600">Hardware Tamper Switch:</span>
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  {iotStatus.tamperSwitch}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200">
                <span className="text-slate-600">Battery Backup:</span>
                <span className="font-mono font-semibold text-slate-900">{iotStatus.batteryLevel}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Ballot Encryption:</span>
                <span className="font-mono text-indigo-700 font-semibold">{iotStatus.encryption}</span>
              </div>
            </div>

            <div className="mt-5">
              <button
                onClick={() => setStep(4)}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <Vote className="w-4 h-4" />
                <span>Issue Single-Use Electronic Ballot</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Cast Ballot */}
        {step === 4 && (
          <div className="max-w-lg mx-auto py-2">
            <div className="text-center mb-4">
              <h4 className="text-lg font-bold text-slate-900">
                Secure Electronic Ballot Terminal
              </h4>
              <p className="text-xs text-slate-600">
                Select a candidate to cast your encrypted academic prototype vote.
              </p>
            </div>

            <div className="space-y-2.5 mb-5">
              {candidates.map((cand) => (
                <label
                  key={cand.id}
                  onClick={() => setSelectedCandidate(cand.id)}
                  className={`block p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedCandidate === cand.id
                      ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-slate-900">{cand.name}</div>
                      <div className="text-xs text-slate-500">{cand.party}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{cand.tagline}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        selectedCandidate === cand.id
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {selectedCandidate === cand.id && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <button
              disabled={!selectedCandidate}
              onClick={handleCastVote}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Seal & Cast Encrypted Vote</span>
            </button>
          </div>
        )}

        {/* Step 5: Real-Time Visualization (Chart.js concept) */}
        {step === 5 && (
          <div className="max-w-xl mx-auto py-2">
            <div className="text-center mb-5">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-2">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Vote Successfully Recorded in Ledger
              </h4>
              <p className="text-xs text-slate-600">
                Django backend marked voter status as voted. Ballot anonymized in SQLite/MySQL.
              </p>
            </div>

            {/* Live Visual Chart representation */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 mb-5">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                  <span>Real-Time Election Analytics Tally</span>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  Total Verified Ballots: <strong className="text-slate-900">{totalVotes}</strong>
                </span>
              </div>

              <div className="space-y-4">
                {candidates.map((cand) => {
                  const pct = Math.round((cand.votes / totalVotes) * 100);
                  return (
                    <div key={cand.id}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-800">{cand.name}</span>
                        <span className="font-mono text-slate-600">
                          {cand.votes} votes ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${cand.color} transition-all duration-700 rounded-full`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-2 px-4 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                Run Another Test Vote
              </button>
              <button
                onClick={() => setShowCodeExplorer(true)}
                className="flex-1 py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>View Django & OpenCV Source Code</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer architecture summary */}
      <div className="bg-slate-50/70 border-t border-slate-100 px-6 py-3 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-slate-400" />
          <span>Architecture: Python · Django · OpenCV · IoT Hardware Telemetry · Chart.js · SQLite/MySQL</span>
        </div>
        <span className="text-indigo-600 font-medium">BCA Final Year Capstone</span>
      </div>
    </div>
  );
};

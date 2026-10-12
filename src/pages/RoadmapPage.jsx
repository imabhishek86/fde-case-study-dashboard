import React from 'react';
import {
  CalendarDays,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { roadmapPhases } from '../data/caseStudyData';

export default function RoadmapPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <CalendarDays className="w-5 h-5 text-indigo-600" />
            <span>Proposed 30-60-90 Day Phased Roadmap</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            A sequenced engineering implementation strategy to halt rating erosion, resolve core P0 operational blockers, and build sustainable platform reliability.
          </p>
        </div>
      </div>

      {/* Roadmap Scope Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start space-x-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Proposed Engineering Sequencing:</strong>
          <span className="block text-amber-800 text-[11px] mt-0.5">
            This roadmap outlines a logical technical progression based on public review evidence and prioritized journey impact. Actual scheduling, sprint velocity, and capacity depend on MoveInSync's internal engineering team resources and enterprise client commitments.
          </span>
        </div>
      </div>

      {/* 3 Phases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {roadmapPhases.map((phase, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:shadow transition-shadow"
          >
            <div>
              {/* Phase Header */}
              <div className="border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                    idx === 0 ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                    idx === 1 ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {phase.phase}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {idx === 0 ? 'Month 1' : idx === 1 ? 'Month 2' : 'Month 3'}
                  </span>
                </div>
                <h2 className="text-sm font-bold text-slate-900 tracking-tight mt-1">
                  {phase.theme}
                </h2>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                  {phase.objective}
                </p>
              </div>

              {/* Milestones List */}
              <div className="space-y-3 text-xs">
                {phase.milestones.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200 hover:border-indigo-200 transition"
                  >
                    <div className="flex items-center space-x-1.5 font-bold text-slate-900 text-xs mb-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{m.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed ml-5">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Phase Status */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px] font-medium">
                {idx === 0 ? 'Immediate Sprints' : idx === 1 ? 'Core Refactoring' : 'Scale & Governance'}
              </span>
              <span className="text-indigo-600 font-bold text-[11px]">
                {phase.milestones.length} Milestones
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

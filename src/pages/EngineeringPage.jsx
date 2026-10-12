import React from 'react';
import {
  Cpu,
  Activity,
  GitBranch,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { engineeringInvestigations } from '../data/caseStudyData';

export default function EngineeringPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <span>Engineering Deep Investigations</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Technical diagnostic plans and telemetry requirements across the 5 core system bottlenecks. Technical causes are treated as hypotheses requiring telemetry confirmation before code changes.
          </p>
        </div>
      </div>

      {/* Engineering Investigation Cards */}
      <div className="space-y-5">
        {engineeringInvestigations.map((inv, idx) => (
          <div
            key={inv.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow transition-shadow"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 mb-4 gap-2">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                  {inv.problem}
                </h2>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                Evidence: {inv.evidence}
              </span>
            </div>

            {/* Grid of Diagnostic Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Unknown Aspect */}
              <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200">
                <div className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider mb-1 flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Unknown Technical Mechanism [HYPOTHESIS]</span>
                </div>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {inv.unknown}
                </p>
              </div>

              {/* Telemetry Required */}
              <div className="p-3 rounded-lg bg-indigo-50/60 border border-indigo-200">
                <div className="text-[10px] font-extrabold text-indigo-800 uppercase tracking-wider mb-1 flex items-center space-x-1">
                  <Activity className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Telemetry Instrumentation Required</span>
                </div>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {inv.telemetry}
                </p>
              </div>

              {/* Decision Gate */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider mb-1 flex items-center space-x-1">
                  <GitBranch className="w-3.5 h-3.5 text-slate-600" />
                  <span>Decision Gate & Prioritization Trigger</span>
                </div>
                <p className="text-slate-900 leading-relaxed font-medium">
                  {inv.decisionGate}
                </p>
              </div>

              {/* Acceptance Criteria */}
              <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
                <div className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider mb-1 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Engineering Acceptance Criteria</span>
                </div>
                <p className="text-slate-900 leading-relaxed font-medium">
                  {inv.acceptanceCriteria}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

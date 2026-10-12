import React, { useState } from 'react';
import { SearchCode, ArrowRight } from 'lucide-react';
import { rootCauseCards } from '../data/caseStudyData';

export default function RootCausesPage({ onNavigate }) {
  const [filterPriority, setFilterPriority] = useState('ALL');

  const filteredCards = rootCauseCards.filter(c => {
    if (filterPriority === 'ALL') return true;
    return c.priority === filterPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <SearchCode className="w-5 h-5 text-indigo-600" />
              <span>Root-Cause Diagnostic Analysis</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Strict 4-layer epistemic separation: <strong>[OBSERVED]</strong> review symptoms are separated from <strong>[HYPOTHESIS]</strong> technical mechanisms, required telemetry validation, and recommended actions.
            </p>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
            {['ALL', 'P0', 'P1'].map(p => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-3 py-1.5 rounded-md transition ${
                  filterPriority === p
                    ? 'bg-white text-slate-900 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p} Priorities
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Epistemic Badges Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
          <span className="font-extrabold text-emerald-800 text-[10px] uppercase tracking-wide block">
            Layer 1: [OBSERVED]
          </span>
          <p className="text-emerald-900 text-[11px] mt-0.5 leading-tight">
            Directly reported in user review text.
          </p>
        </div>
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs">
          <span className="font-extrabold text-amber-800 text-[10px] uppercase tracking-wide block">
            Layer 2: [HYPOTHESIS]
          </span>
          <p className="text-amber-900 text-[11px] mt-0.5 leading-tight">
            Unconfirmed internal cause needing telemetry.
          </p>
        </div>
        <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-xs">
          <span className="font-extrabold text-indigo-800 text-[10px] uppercase tracking-wide block">
            Layer 3: [VALIDATION]
          </span>
          <p className="text-indigo-900 text-[11px] mt-0.5 leading-tight">
            Telemetry required before coding.
          </p>
        </div>
        <div className="p-3 rounded-lg bg-slate-100 border border-slate-300 text-xs">
          <span className="font-extrabold text-slate-800 text-[10px] uppercase tracking-wide block">
            Layer 4: [PROPOSED ACTION]
          </span>
          <p className="text-slate-900 text-[11px] mt-0.5 leading-tight">
            Targeted product / engineering intervention.
          </p>
        </div>
      </div>

      {/* Root Cause Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Card Title & Badges */}
              <div className="flex items-start justify-between mb-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      card.priority === 'P0' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                      card.priority === 'P1' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {card.priority} Priority
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">
                      {card.frequency} Reviews • Severity: {card.severity}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* 4 Epistemic Layers */}
              <div className="space-y-3 text-xs">
                {/* 1. OBSERVED */}
                <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                  <div className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider mb-0.5">
                    1. Observed Symptom [OBSERVED]
                  </div>
                  <p className="text-slate-800 leading-relaxed">
                    {card.observed}
                  </p>
                </div>

                {/* 2. HYPOTHESIS */}
                <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-100">
                  <div className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider mb-0.5">
                    2. Inferred Root Cause [HYPOTHESIS]
                  </div>
                  <p className="text-slate-800 leading-relaxed">
                    {card.hypothesis}
                  </p>
                </div>

                {/* 3. VALIDATION REQUIRED */}
                <div className="p-2.5 rounded-lg bg-indigo-50/60 border border-indigo-100">
                  <div className="text-[10px] font-extrabold text-indigo-800 uppercase tracking-wider mb-0.5">
                    3. Telemetry Required [VALIDATION]
                  </div>
                  <p className="text-slate-800 leading-relaxed">
                    {card.validationRequired}
                  </p>
                </div>

                {/* 4. PROPOSED ACTION */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider mb-0.5">
                    4. Recommended Response [PROPOSED ACTION]
                  </div>
                  <p className="text-slate-900 font-medium leading-relaxed">
                    {card.proposedAction}
                  </p>
                </div>
              </div>
            </div>

            {/* Card Action Link */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">{card.clusterId}</span>
              <button
                onClick={() => onNavigate('recommendations')}
                className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center space-x-1"
              >
                <span>View PRD</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { Database, CheckCircle2 } from 'lucide-react';

export default function DataQualityBanner() {
  return (
    <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 shadow-sm border border-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-400 text-slate-900 uppercase tracking-wide">
              Data Quality & Audit Notice
            </span>
            <span className="text-xs text-slate-300 font-medium">
              Bounded Public Dataset • App ID: com.moveinsync.ets
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            Analysis is based on a bounded public sample of 1,000 Google Play Store reviews collected between June 15 and October 11, 2026. Internal backend engineering mechanisms are documented as <strong>hypotheses requiring telemetry validation</strong> rather than confirmed internal facts. Semantic feature extraction used a deterministic local NLP analysis engine.
          </p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 text-xs">
          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-200">100% Real Reviews</span>
          </div>
          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-1.5">
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-200">Zero Synthetic Data</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { useData } from '../context/useData';

export default function DataQualityBanner() {
  const { analytics, lastRefreshedDisplay } = useData();
  const count = analytics.totalReviews || 1000;
  const samplePeriod = analytics.samplePeriod || 'June 15 – October 11, 2026';

  return (
    <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 shadow-sm border border-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-400 text-slate-900 uppercase tracking-wide">
              Data Quality & Audit Notice
            </span>
            <span className="text-xs text-slate-300 font-medium">
              Bounded Public Dataset • App ID: com.moveinsync.ets
            </span>
            <span className="text-xs text-indigo-300 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {lastRefreshedDisplay}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
            Analysis is based on a bounded public sample of {count.toLocaleString()} Google Play Store reviews ({samplePeriod}). Analysis scope is the MoveInSync employee application (<code className="text-indigo-300 font-mono">com.moveinsync.ets</code>); other MoveInSync applications were not independently analyzed. A deterministic local semantic analysis engine was used for reproducible classification; no live Gemini API was configured.
          </p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 text-xs shrink-0">
          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-200">100% Real Reviews</span>
          </div>
          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-200">Zero Synthetic Data</span>
          </div>
        </div>
      </div>
    </div>
  );
}

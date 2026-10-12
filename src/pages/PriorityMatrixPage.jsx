import React, { useState } from 'react';
import { Target, Flame, Search } from 'lucide-react';
import { auditedClusters } from '../data/caseStudyData';

export default function PriorityMatrixPage() {
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClusters = auditedClusters.filter(c => {
    const matchesPriority = filterPriority === 'ALL' || c.priority === filterPriority;
    const matchesSearch = c.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.journeyImpact.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>Multi-Dimensional Priority Matrix</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Prioritized using 6 operational dimensions: Frequency, Severity, Journey Impact, Evidence Strength, Rating Potential, and Qualitative Effort. Strictly zero cross-theme double counting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search issue or journey..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 w-52"
              />
            </div>

            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              {['ALL', 'P0', 'P1', 'P2', 'P3'].map(p => (
                <button
                  key={p}
                  onClick={() => setFilterPriority(p)}
                  className={`px-2.5 py-1 rounded transition ${
                    filterPriority === p
                      ? 'bg-white text-slate-900 shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Section: # What I Would Fix First */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl p-6 shadow-md border border-indigo-900">
        <div className="flex items-center space-x-2 mb-2">
          <Flame className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-extrabold text-white tracking-tight">
            What I Would Fix First (Candidate FDE Prioritization)
          </h2>
          <span className="text-[10px] uppercase font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
            Executive Order
          </span>
        </div>

        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed mb-4">
          Ranking does not mechanically sort by frequency. It synthesizes service lockout severity, curbside anxiety, and core booking prerequisites to protect the daily enterprise commute.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Item 1 */}
          <div className="bg-slate-800/80 rounded-lg p-3.5 border border-slate-700/80">
            <div className="flex items-center justify-between mb-1">
              <span className="text-amber-400 font-extrabold text-xs">#1 • P0 Urgent</span>
              <span className="text-xs font-mono text-slate-300 font-bold">30 reviews</span>
            </div>
            <div className="text-xs font-bold text-white">Roster & Booking Failure</div>
            <p className="text-[11px] text-slate-400 mt-1 leading-normal">
              Foundational utility prerequisite. If employees cannot book transit, all downstream features are irrelevant.
            </p>
          </div>

          {/* Item 2 */}
          <div className="bg-slate-800/80 rounded-lg p-3.5 border border-slate-700/80">
            <div className="flex items-center justify-between mb-1">
              <span className="text-amber-400 font-extrabold text-xs">#2 • P0 Urgent</span>
              <span className="text-xs font-mono text-slate-300 font-bold">26 reviews</span>
            </div>
            <div className="text-xs font-bold text-white">Live GPS Tracking Freshness</div>
            <p className="text-[11px] text-slate-400 mt-1 leading-normal">
              Primary driver of curbside anxiety. Frozen map pins break trust during high-stakes morning pickups.
            </p>
          </div>

          {/* Item 3 */}
          <div className="bg-slate-800/80 rounded-lg p-3.5 border border-slate-700/80">
            <div className="flex items-center justify-between mb-1">
              <span className="text-amber-400 font-extrabold text-xs">#3 • P0 Urgent</span>
              <span className="text-xs font-mono text-slate-300 font-bold">27 reviews</span>
            </div>
            <div className="text-xs font-bold text-white">App Freezing & In-Ride Lag</div>
            <p className="text-[11px] text-slate-400 mt-1 leading-normal">
              Severe UI unresponsiveness and frame lag during active tracking. Main thread decoupling required.
            </p>
          </div>

          {/* Special Co-Equal: Crash Loop */}
          <div className="bg-rose-950/40 rounded-lg p-3.5 border border-rose-800/80">
            <div className="flex items-center justify-between mb-1">
              <span className="text-rose-400 font-extrabold text-xs">Co-Equal P0 • Hotfix</span>
              <span className="text-xs font-mono text-rose-300 font-bold">14 reviews</span>
            </div>
            <div className="text-xs font-bold text-white">Post-Update Crash Loop</div>
            <p className="text-[11px] text-rose-200/80 mt-1 leading-normal">
              Separated from App Freezing. Critical service lockout requiring immediate Android Vitals hotfix investigation.
            </p>
          </div>
        </div>
      </div>

      {/* Priority Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Issue Description</th>
                <th className="py-3 px-3 text-center">Reviews</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-4">Journey Touchpoint</th>
                <th className="py-3 px-3">Potential Rating Impact</th>
                <th className="py-3 px-4">Qualitative Effort</th>
                <th className="py-3 px-4">Priority Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClusters.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold">
                    <span className={`inline-block px-2.5 py-1 rounded text-[11px] font-extrabold ${
                      row.priority === 'P0' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                      row.priority === 'P1' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      row.priority === 'P2' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                      'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {row.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs">
                    {row.issue}
                    {row.id === 'cluster_post_update_crash' && (
                      <span className="block text-[10px] font-normal text-rose-600 mt-0.5">
                        Distinct from App Freezing (27)
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono font-bold text-slate-800">
                    {row.frequency}
                  </td>
                  <td className="py-3.5 px-3 font-semibold">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.severity === 'Critical' ? 'bg-rose-100 text-rose-700' :
                      row.severity === 'High' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {row.severity}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {row.journeyImpact}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 font-medium">
                    {row.ratingImpact.split('(')[0].replace('[INFERRED - ', '').replace(']', '')}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {row.effort.split('[')[0].trim()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 max-w-sm text-[11px] leading-relaxed">
                    {row.whyThisPriority}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Showing {filteredClusters.length} audited issue clusters (14 total)</span>
          <span className="text-[11px] text-slate-400 font-mono">
            Sum of 14 primary cluster counts = 299 analyzed negative reviews
          </span>
        </div>
      </div>
    </div>
  );
}

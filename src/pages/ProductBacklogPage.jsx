import React, { useState } from 'react';
import { ListTodo, Search } from 'lucide-react';

const BACKLOG_ITEMS = [
  {
    priority: 'P0',
    initiative: 'Booking Reliability & State Transparency',
    problem: 'Cutoff timeouts & unconfirmed rosters leaving employees stranded',
    userValue: 'Guaranteed shift transit confirmation before morning shifts',
    evidence: '30 primary reviews',
    effort: 'High (Qualitative)',
    dependency: 'Backend Booking APM',
    successMetric: 'Booking Success > 99.8% (Proposed target)'
  },
  {
    priority: 'P0',
    initiative: 'Live GPS Tracking Freshness & Visibility',
    problem: 'Frozen vehicle pins causing curbside waiting anxiety',
    userValue: 'Real-time visibility into vehicle arrival timing',
    evidence: '26 primary reviews',
    effort: 'Medium (Qualitative)',
    dependency: '6-Hop Timestamp Tracing',
    successMetric: 'P95 Freshness < 10s (Proposed target)'
  },
  {
    priority: 'P0',
    initiative: 'App Startup Crash Auto-Recovery & Health Gate',
    problem: 'Post-update startup crash loops (Immediate lockout)',
    userValue: 'Seamless app launch without uninstallation cycles',
    evidence: '14 primary reviews',
    effort: 'Medium (Qualitative)',
    dependency: 'Android Vitals & Crashlytics',
    successMetric: 'Startup Crash < 0.1% (Proposed target)'
  },
  {
    priority: 'P0',
    initiative: 'UI Main Thread Responsiveness & ANR Mitigation',
    problem: 'Screen freezing & lag during active ride navigation',
    userValue: 'Fluid map interactions on mid-tier hardware',
    evidence: '27 primary reviews',
    effort: 'Medium (Qualitative)',
    dependency: 'Android Studio UI Profiler',
    successMetric: 'ANR Rate < 0.2% (Proposed target)'
  },
  {
    priority: 'P0',
    initiative: 'Inline Seatbelt Compliance & SOS Visibility',
    problem: 'Modal popup intercepts OTP; safety protocol anxiety',
    userValue: 'Single-click OTP display while maintaining safety compliance',
    evidence: '6 primary reviews',
    effort: 'Low / Medium (Qualitative)',
    dependency: 'Enterprise Safety Policy',
    successMetric: 'Time-to-OTP display reduction; SOS < 30s'
  },
  {
    priority: 'P1',
    initiative: 'Dismissible Post-Trip Rating Prompt (Quick Win)',
    problem: 'Unskippable rating modal provokes 1-star Play Store reviews',
    userValue: 'Respects commuter time; removes coercive feedback friction',
    evidence: '21 primary reviews',
    effort: 'Low (Qualitative)',
    dependency: 'Client UI Mobile Update',
    successMetric: 'Zero rating abandonment; reduced 1★ reviews'
  },
  {
    priority: 'P1',
    initiative: 'Silent Background Auth Token Refresh',
    problem: 'Curbside session logouts forcing repeated credential entry',
    userValue: 'Instant app resume and offline OTP availability in basements',
    evidence: '20 primary reviews',
    effort: 'Low / Medium (Qualitative)',
    dependency: 'Auth Token TTL Architecture',
    successMetric: 'Resume Logout Rate < 0.5% (Proposed target)'
  },
  {
    priority: 'P1',
    initiative: 'Routing Solver Detour Constraints & Stop Sequence',
    problem: 'Extreme multi-zone detours ("Bharat Darshan")',
    userValue: 'Drastically cuts unnecessary transit duration and fatigue',
    evidence: '16 primary reviews',
    effort: 'High (Qualitative)',
    dependency: 'Fleet Optimization Solver',
    successMetric: 'Detour Compliance > 95% (Proposed target)'
  },
  {
    priority: 'P1',
    initiative: 'Dynamic Traffic Feed & ETA Dwell Calibration',
    problem: 'Fluctuating ETAs misleading commuters on arrival pacing',
    userValue: 'Predictable pickup arrival timing',
    evidence: '10 primary reviews',
    effort: 'Medium / High (Qualitative)',
    dependency: '4-Stage ETA Telemetry',
    successMetric: 'P90 Accuracy within ± 5 min (Proposed target)'
  },
  {
    priority: 'P1',
    initiative: 'In-Cabin Comfort & Driver Feedback Tags',
    problem: 'Non-working AC, poor cleanliness, speeding, rude conduct',
    userValue: 'Dignified, climate-controlled daily commute experience',
    evidence: '24 primary reviews',
    effort: 'Medium / High (Ops)',
    dependency: 'Vendor Fleet Management Portal',
    successMetric: 'Reduction in AC / comfort complaints'
  },
  {
    priority: 'P2',
    initiative: 'One-Tap Self-Service Exception Reporting',
    problem: 'Unreachable helpdesk lines during transit delays',
    userValue: 'Immediate automated delay reporting without phone waits',
    evidence: '8 primary reviews',
    effort: 'Medium (Qualitative)',
    dependency: 'Transport Desk Webhook API',
    successMetric: 'Shift of exception calls to self-service'
  },
  {
    priority: 'P2',
    initiative: 'High-Priority Push Notification Channels',
    problem: 'Delayed vehicle assignment and approach push alerts',
    userValue: 'Timely lock screen alerts prevent missed cab arrivals',
    evidence: '4 primary reviews',
    effort: 'Low / Medium (Qualitative)',
    dependency: 'FCM High-Priority Channel',
    successMetric: 'P95 Push Latency < 5s (Proposed target)'
  }
];

export default function ProductBacklogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('ALL');

  const filteredItems = BACKLOG_ITEMS.filter(item => {
    const matchesPriority = filterPriority === 'ALL' || item.priority === filterPriority;
    const matchesSearch = item.initiative.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.dependency.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <ListTodo className="w-5 h-5 text-indigo-600" />
              <span>Prioritized Product Backlog</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Consolidated roadmap items mapped directly to commuter pain points. Effort estimates remain qualitative pending engineering sprint capacity validation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search backlog..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 w-52"
              />
            </div>

            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              {['ALL', 'P0', 'P1', 'P2'].map(p => (
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

      {/* Backlog Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Initiative</th>
                <th className="py-3 px-4">Observed Problem</th>
                <th className="py-3 px-4">User Value</th>
                <th className="py-3 px-3">Evidence</th>
                <th className="py-3 px-3">Qualitative Effort</th>
                <th className="py-3 px-4">Dependency</th>
                <th className="py-3 px-4">Success Metric</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-bold">
                    <span className={`inline-block px-2.5 py-1 rounded text-[11px] font-extrabold ${
                      item.priority === 'P0' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                      item.priority === 'P1' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 max-w-xs">
                    {item.initiative}
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs leading-normal">
                    {item.problem}
                  </td>
                  <td className="py-3 px-4 text-slate-700 max-w-xs leading-normal font-medium">
                    {item.userValue}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600 font-semibold whitespace-nowrap">
                    {item.evidence}
                  </td>
                  <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {item.effort}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px]">
                    {item.dependency}
                  </td>
                  <td className="py-3 px-4 text-slate-900 font-mono text-[11px] max-w-xs font-semibold">
                    {item.successMetric}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Showing {filteredItems.length} product initiatives</span>
          <span className="text-[11px] text-slate-400">
            All numerical metrics represent proposed targets subject to baseline review
          </span>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { AlertOctagon, ArrowRight, X } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { auditedClusters, journeyStages } from '../data/caseStudyData';

export default function UserProblemsPage({ onNavigate }) {
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [activeJourneyStage, setActiveJourneyStage] = useState(null);

  // Filter clusters by priority
  const filteredClusters = auditedClusters.filter(c => {
    if (filterPriority === 'ALL') return true;
    return c.priority === filterPriority;
  });

  // Prepare chart data sorted by frequency
  const chartData = [...filteredClusters]
    .sort((a, b) => b.frequency - a.frequency)
    .map(c => ({
      name: c.issue.length > 28 ? c.issue.substring(0, 26) + '...' : c.issue,
      fullName: c.issue,
      frequency: c.frequency,
      priority: c.priority,
      severity: c.severity,
      id: c.id,
      fillColor: c.priority === 'P0' ? '#ef4444' :
                 c.priority === 'P1' ? '#f59e0b' :
                 c.priority === 'P2' ? '#3b82f6' : '#94a3b8'
    }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <AlertOctagon className="w-5 h-5 text-rose-600" />
              <span>User Problems & Journey Vulnerability</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              14 audited problem clusters categorized across commuter journey touchpoints. Click any theme or journey stage below to view empirical evidence and diagnostic hypotheses.
            </p>
          </div>

          {/* Priority Filter Pills */}
          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
            {['ALL', 'P0', 'P1', 'P2', 'P3'].map(p => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-3 py-1.5 rounded-md transition ${
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

      {/* Interactive Commuter Journey Map */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Interactive Commuter Journey Map
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Click a stage to highlight associated failure modes
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {journeyStages.map((stage) => {
            const isSelected = activeJourneyStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveJourneyStage(isSelected ? null : stage.id)}
                className={`p-2.5 rounded-lg border text-left transition flex flex-col justify-between h-24 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-sm ring-1 ring-indigo-500'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] font-bold uppercase px-1 py-0.5 rounded ${
                    stage.severity === 'Critical' ? 'bg-rose-100 text-rose-700' :
                    stage.severity === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {stage.count}
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-900 line-clamp-1">
                    {stage.name}
                  </div>
                  <div className="text-[10px] text-slate-500 line-clamp-2 leading-tight">
                    {stage.problem}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Complaint Theme Chart & Cluster List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Horizontal Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                Complaint Volume by Problem Cluster ({filterPriority} View)
              </h2>
              <span className="text-xs text-slate-500 font-mono">
                {filteredClusters.length} clusters shown
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Sorted by primary verified review frequency. Click any bar to inspect root cause details.
            </p>
          </div>

          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                onClick={(data) => {
                  if (data && data.activePayload && data.activePayload.length > 0) {
                    const clusterId = data.activePayload[0].payload.id;
                    const c = auditedClusters.find(x => x.id === clusterId);
                    if (c) setSelectedCluster(c);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={160} />
                <Tooltip
                  formatter={(val, name, item) => [`${val} verified reviews (${item.payload.priority} - ${item.payload.severity})`, item.payload.fullName]}
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="frequency" radius={[0, 4, 4, 0]} cursor="pointer">
                  {chartData.map((entry, index) => (
                    <Bar key={`bar-${index}`} fill={entry.fillColor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-4 text-xs">
            <span className="flex items-center space-x-1.5"><span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /><span>P0 (Urgent Blocker)</span></span>
            <span className="flex items-center space-x-1.5"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /><span>P1 (Core Operational)</span></span>
            <span className="flex items-center space-x-1.5"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /><span>P2 (Secondary)</span></span>
            <span className="flex items-center space-x-1.5"><span className="w-3 h-3 rounded-full bg-slate-400 inline-block" /><span>P3 (Evidence Gap)</span></span>
          </div>
        </div>

        {/* Cluster List / Interactive Cards */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
          {filteredClusters.map((cluster) => {
            const isSelected = selectedCluster && selectedCluster.id === cluster.id;
            return (
              <div
                key={cluster.id}
                onClick={() => setSelectedCluster(cluster)}
                className={`p-3.5 rounded-xl border transition cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-sm ring-1 ring-indigo-500'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      cluster.priority === 'P0' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                      cluster.priority === 'P1' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      cluster.priority === 'P2' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                      'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {cluster.priority}
                    </span>
                    <span className="text-xs font-bold text-slate-900 line-clamp-1">
                      {cluster.issue}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    {cluster.frequency} rev
                  </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-normal">
                  {cluster.whyThisPriority}
                </p>

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span>{cluster.journeyImpact}</span>
                  <span className="text-indigo-600 font-semibold group-hover:underline">Inspect →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide-over Detail Modal / Drawer */}
      {selectedCluster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-extrabold ${
                    selectedCluster.priority === 'P0' ? 'bg-rose-100 text-rose-700' :
                    selectedCluster.priority === 'P1' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {selectedCluster.priority} Priority
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Severity: {selectedCluster.severity}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedCluster.issue}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCluster(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 py-4 text-xs">
              <div>
                <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mb-1">
                  Primary Verified Evidence
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-slate-700">
                  {selectedCluster.frequency} primary reviews affected • Journey: {selectedCluster.journeyImpact}
                </div>
              </div>

              <div>
                <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mb-1">
                  Priority Rationale
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">
                  {selectedCluster.whyThisPriority}
                </p>
              </div>

              {selectedCluster.whyNow && (
                <div>
                  <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mb-1">
                    Why Fix Now?
                  </div>
                  <p className="text-indigo-950 bg-indigo-50 p-3 rounded-lg border border-indigo-100 leading-relaxed font-medium">
                    {selectedCluster.whyNow}
                  </p>
                </div>
              )}

              {selectedCluster.whyLater && (
                <div>
                  <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mb-1">
                    Why Fix Later?
                  </div>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                    {selectedCluster.whyLater}
                  </p>
                </div>
              )}

              {selectedCluster.missingEvidence && (
                <div>
                  <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mb-1">
                    Evidence Gap / Missing Telemetry
                  </div>
                  <p className="text-amber-900 bg-amber-50 p-3 rounded-lg border border-amber-200 leading-relaxed">
                    {selectedCluster.missingEvidence}
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 pt-4 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedCluster(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Close Panel
              </button>
              <button
                onClick={() => {
                  setSelectedCluster(null);
                  onNavigate('recommendations');
                }}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center space-x-1"
              >
                <span>View PRD Recommendation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import {
  Compass,
  LayoutDashboard,
  AlertOctagon,
  SearchCode,
  Target,
  Sparkles,
  ListTodo,
  Cpu,
  CalendarDays,
  FileSearch,
  BookOpen,
  X
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'start-here', label: 'Start Here', icon: Compass },
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'problems', label: 'User Problems', icon: AlertOctagon },
  { id: 'root-causes', label: 'Root Causes', icon: SearchCode },
  { id: 'priorities', label: 'Priority Matrix', icon: Target },
  { id: 'recommendations', label: 'Recommendations', icon: Sparkles },
  { id: 'product-backlog', label: 'Product Backlog', icon: ListTodo },
  { id: 'engineering', label: 'Engineering', icon: Cpu },
  { id: 'roadmap', label: '30-60-90 Roadmap', icon: CalendarDays },
  { id: 'evidence', label: 'Evidence Explorer', icon: FileSearch },
  { id: 'methodology', label: 'Methodology', icon: BookOpen },
];

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) {
  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-100 flex flex-col transition-transform duration-200 ease-in-out border-r border-slate-800 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand logo header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
              MIS
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-wide">
                MoveInSync
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                FDE Case Study
              </div>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm font-bold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer context card */}
        <div className="p-3.5 m-3 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs text-slate-300">
          <div className="flex items-center space-x-1.5 text-indigo-400 font-semibold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>FDE Operating Focus</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Translate ambiguous commuter complaints into empirical telemetry, validated fixes, and reusable platform reliability.
          </p>
        </div>
      </aside>
    </>
  );
}

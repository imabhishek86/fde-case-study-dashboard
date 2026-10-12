import React from 'react';
import { Menu, ShieldAlert, Database } from 'lucide-react';

export default function Header({ activeTab, onToggleMobileMenu }) {
  const getPageTitle = (tab) => {
    switch (tab) {
      case 'overview': return 'Executive Overview & Ratings';
      case 'problems': return 'User Problems & Journey Stages';
      case 'root-causes': return 'Root-Cause Diagnostic Analysis';
      case 'priorities': return 'Multi-Dimensional Priority Matrix';
      case 'recommendations': return 'Product & Engineering PRDs';
      case 'product-backlog': return 'Interactive Product Backlog';
      case 'engineering': return 'Engineering Deep Investigations';
      case 'roadmap': return '30-60-90 Day Phased Roadmap';
      case 'evidence': return 'Evidence Explorer (1,000 Reviews)';
      default: return 'Case Study Analytics';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              MoveInSync Rating Intelligence
            </h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              1,000 Public Reviews
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium hidden sm:block">
            Forward Deployed Engineer (FDE) Case Study • {getPageTitle(activeTab)}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="hidden md:flex items-center space-x-1.5 text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>Bounded Public Sample • June – Oct 2026</span>
        </div>

        <div className="flex items-center space-x-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
          <Database className="w-3.5 h-3.5 text-slate-600" />
          <span className="font-mono">n=1,000</span>
        </div>
      </div>
    </header>
  );
}

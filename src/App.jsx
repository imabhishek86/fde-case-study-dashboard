import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import OverviewPage from './pages/OverviewPage';
import UserProblemsPage from './pages/UserProblemsPage';
import RootCausesPage from './pages/RootCausesPage';
import PriorityMatrixPage from './pages/PriorityMatrixPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ProductBacklogPage from './pages/ProductBacklogPage';
import EngineeringPage from './pages/EngineeringPage';
import RoadmapPage from './pages/RoadmapPage';
import EvidenceExplorerPage from './pages/EvidenceExplorerPage';

const VALID_TABS = [
  'overview',
  'problems',
  'root-causes',
  'priorities',
  'recommendations',
  'product-backlog',
  'engineering',
  'roadmap',
  'evidence'
];

function getHashTab() {
  if (typeof window === 'undefined') return 'overview';
  const raw = window.location.hash || '';
  const clean = raw.replace(/^#\/?/, '').replace(/\/$/, '');
  return VALID_TABS.includes(clean) ? clean : 'overview';
}

export default function App() {
  const [activeTab, setActiveTab] = useState(getHashTab);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveTab(getHashTab());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    window.location.hash = '/' + newTab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPage onNavigate={handleTabChange} />;
      case 'problems':
        return <UserProblemsPage onNavigate={handleTabChange} />;
      case 'root-causes':
        return <RootCausesPage onNavigate={handleTabChange} />;
      case 'priorities':
        return <PriorityMatrixPage onNavigate={handleTabChange} />;
      case 'recommendations':
        return <RecommendationsPage onNavigate={handleTabChange} />;
      case 'product-backlog':
        return <ProductBacklogPage onNavigate={handleTabChange} />;
      case 'engineering':
        return <EngineeringPage onNavigate={handleTabChange} />;
      case 'roadmap':
        return <RoadmapPage onNavigate={handleTabChange} />;
      case 'evidence':
        return <EvidenceExplorerPage onNavigate={handleTabChange} />;
      default:
        return <OverviewPage onNavigate={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row antialiased font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activeTab={activeTab}
          onToggleMobileMenu={() => setMobileOpen(!mobileOpen)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}

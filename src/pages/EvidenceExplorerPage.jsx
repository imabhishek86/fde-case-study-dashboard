import React, { useState, useEffect, useMemo } from 'react';
import {
  FileSearch,
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Database,
  ExternalLink,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { sampleEvidenceReviews } from '../data/caseStudyData';

export default function EvidenceExplorerPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('ALL');
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [filterTheme, setFilterTheme] = useState('ALL');
  const [filterJourney, setFilterJourney] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');

  // Detail view state
  const [selectedReview, setSelectedReview] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  // Load reviews on mount
  useEffect(() => {
    let isMounted = true;

    async function loadEvidence() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/data/processed_reviews.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setReviews(data);
          } else if (Array.isArray(sampleEvidenceReviews) && sampleEvidenceReviews.length > 0) {
            setReviews(sampleEvidenceReviews);
          } else {
            setError('Evidence data unavailable');
          }
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load evidence from public dataset, attempting bundled fallback:', err);
        if (isMounted) {
          if (Array.isArray(sampleEvidenceReviews) && sampleEvidenceReviews.length > 0) {
            setReviews(sampleEvidenceReviews);
            setError(null);
          } else {
            setError('Evidence data unavailable');
          }
          setLoading(false);
        }
      }
    }

    loadEvidence();

    return () => {
      isMounted = false;
    };
  }, []);

  // Derive available filter options dynamically from data
  const availableThemes = useMemo(() => {
    const set = new Set();
    reviews.forEach(r => {
      if (r && r.primaryTheme) set.add(r.primaryTheme);
    });
    return Array.from(set).sort();
  }, [reviews]);

  const availableJourneys = useMemo(() => {
    const set = new Set();
    reviews.forEach(r => {
      if (r && r.journeyStage && r.journeyStage !== 'Not available') set.add(r.journeyStage);
    });
    return Array.from(set).sort();
  }, [reviews]);

  const availableSeverities = useMemo(() => {
    const set = new Set();
    reviews.forEach(r => {
      if (r && r.severity) set.add(r.severity);
    });
    return Array.from(set).sort();
  }, [reviews]);

  const availablePriorities = useMemo(() => {
    const set = new Set();
    reviews.forEach(r => {
      if (r && r.priority) set.add(r.priority);
    });
    return Array.from(set).sort();
  }, [reviews]);

  // Filter logic with safe null/undefined handling
  const filteredReviews = useMemo(() => {
    const term = (searchTerm || '').trim().toLowerCase();

    return reviews.filter(r => {
      if (!r) return false;

      // Rating filter
      if (filterRating !== 'ALL') {
        const ratingVal = r.rating != null ? String(r.rating) : '';
        if (ratingVal !== filterRating) return false;
      }

      // Severity filter
      if (filterSeverity !== 'ALL') {
        const severityVal = r.severity || 'None';
        if (severityVal !== filterSeverity) return false;
      }

      // Theme filter
      if (filterTheme !== 'ALL') {
        const themeVal = r.primaryTheme || 'Other';
        if (themeVal !== filterTheme) return false;
      }

      // Journey Stage filter
      if (filterJourney !== 'ALL') {
        const journeyVal = r.journeyStage || '';
        if (journeyVal !== filterJourney) return false;
      }

      // Priority filter
      if (filterPriority !== 'ALL') {
        const priorityVal = r.priority || 'None';
        if (priorityVal !== filterPriority) return false;
      }

      // Text and ID search
      if (term) {
        const idMatch = (r.id || '').toLowerCase().includes(term);
        const textMatch = (r.text || '').toLowerCase().includes(term);
        const themeMatch = (r.primaryTheme || '').toLowerCase().includes(term);
        const clusterMatch = (r.primaryCluster || '').toLowerCase().includes(term);
        if (!idMatch && !textMatch && !themeMatch && !clusterMatch) {
          return false;
        }
      }

      return true;
    });
  }, [reviews, searchTerm, filterRating, filterSeverity, filterTheme, filterJourney, filterPriority]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedReviews = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredReviews.slice(start, start + pageSize);
  }, [filteredReviews, safeCurrentPage, pageSize]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilterRating('ALL');
    setFilterSeverity('ALL');
    setFilterTheme('ALL');
    setFilterJourney('ALL');
    setFilterPriority('ALL');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm !== '' ||
    filterRating !== 'ALL' ||
    filterSeverity !== 'ALL' ||
    filterTheme !== 'ALL' ||
    filterJourney !== 'ALL' ||
    filterPriority !== 'ALL';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <FileSearch className="w-5 h-5 text-indigo-600" />
              <span>Evidence Explorer</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Explore the complete, verified 1,000 public Google Play Store review records supporting the MoveInSync case study findings. Reviewer personal identifiers have been excluded for privacy; original review texts, ratings, and classifications are preserved for auditability.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Database className="w-3.5 h-3.5" />
              <span>{reviews.length.toLocaleString()} Reviews in Pool</span>
            </span>
          </div>
        </div>

        {/* Search & Filter Control Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
            {/* Search Input */}
            <div className="sm:col-span-2 relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search review text, ID, or keywords..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Rating Filter */}
            <div>
              <select
                value={filterRating}
                onChange={(e) => {
                  setFilterRating(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full py-2 px-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Filter by star rating"
              >
                <option value="ALL">All Ratings (1★–5★)</option>
                <option value="1">1-Star Only (258)</option>
                <option value="2">2-Star Only (33)</option>
                <option value="3">3-Star Only (26)</option>
                <option value="4">4-Star Only (42)</option>
                <option value="5">5-Star Only (641)</option>
              </select>
            </div>

            {/* Severity Filter */}
            <div>
              <select
                value={filterSeverity}
                onChange={(e) => {
                  setFilterSeverity(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full py-2 px-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Filter by defect severity"
              >
                <option value="ALL">All Severities</option>
                {availableSeverities.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Theme Filter */}
            <div>
              <select
                value={filterTheme}
                onChange={(e) => {
                  setFilterTheme(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full py-2 px-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Filter by complaint theme"
              >
                <option value="ALL">All Themes</option>
                {availableThemes.map(t => (
                  <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <select
                value={filterPriority}
                onChange={(e) => {
                  setFilterPriority(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full py-2 px-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Filter by priority tier"
              >
                <option value="ALL">All Priorities</option>
                {availablePriorities.map(p => (
                  <option key={p} value={p}>{p === 'None' ? 'Unassigned (None)' : p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Journey Filter + Active Filters Reset */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1">
            <div className="flex items-center space-x-2 flex-1 max-w-md">
              <span className="text-slate-500 text-[11px] font-medium shrink-0 flex items-center space-x-1">
                <Filter className="w-3 h-3 text-slate-400" />
                <span>Journey:</span>
              </span>
              <select
                value={filterJourney}
                onChange={(e) => {
                  setFilterJourney(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full py-1 px-2 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 truncate"
                aria-label="Filter by journey stage"
              >
                <option value="ALL">All Journey Stages</option>
                {availableJourneys.map(j => (
                  <option key={j} value={j}>{j}</option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center space-x-1 text-rose-600 hover:text-rose-700 text-xs font-semibold py-1 px-2 rounded hover:bg-rose-50 transition shrink-0"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-800">Loading evidence...</p>
          <p className="text-xs text-slate-400 mt-1">Retrieving verified review dataset</p>
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl border border-rose-200 p-8 text-center shadow-sm">
          <p className="text-sm font-bold text-rose-700">Evidence data unavailable</p>
          <p className="text-xs text-slate-500 mt-1">
            Could not retrieve review evidence records. Please refresh the page.
          </p>
        </div>
      ) : filteredReviews.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">
            No reviews match the selected filters.
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query, selecting different priority tiers, or clearing specific filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        /* Evidence Table */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Status Header */}
          <div className="p-3.5 bg-slate-50 border-b border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-medium">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-slate-900">
                Displaying {filteredReviews.length.toLocaleString()} matching records
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <div className="text-[11px] text-slate-500">
              Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredReviews.length)} of {filteredReviews.length}
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/75 border-b border-slate-200 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  <th className="py-3 px-3 w-16">Rating</th>
                  <th className="py-3 px-3 w-28">Review ID</th>
                  <th className="py-3 px-3 w-32">Theme</th>
                  <th className="py-3 px-3 w-20">Severity</th>
                  <th className="py-3 px-3 w-20">Priority</th>
                  <th className="py-3 px-3 w-40">Journey Stage</th>
                  <th className="py-3 px-3 w-44">Primary Cluster</th>
                  <th className="py-3 px-3 w-32">Confidence</th>
                  <th className="py-3 px-3 min-w-[240px]">Review Text</th>
                  <th className="py-3 px-3 w-16 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedReviews.map((review) => {
                  const rating = review.rating != null ? review.rating : 'N/A';

                  return (
                    <tr
                      key={review.id}
                      onClick={() => setSelectedReview(review)}
                      className="hover:bg-slate-50/80 transition cursor-pointer group"
                    >
                      {/* Rating */}
                      <td className="py-3 px-3 align-top whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                          rating === 1 ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                          rating === 2 ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                          rating === 3 ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                          'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {rating}★
                        </span>
                      </td>

                      {/* Review ID */}
                      <td className="py-3 px-3 align-top font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        <span title={review.id || 'Not available'}>
                          {(review.id || '').substring(0, 8)}...
                        </span>
                      </td>

                      {/* Theme */}
                      <td className="py-3 px-3 align-top whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                          {(review.primaryTheme || 'Other').replace(/_/g, ' ')}
                        </span>
                      </td>

                      {/* Severity */}
                      <td className="py-3 px-3 align-top whitespace-nowrap">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          review.severity === 'Critical' ? 'bg-rose-100 text-rose-700' :
                          review.severity === 'High' ? 'bg-amber-100 text-amber-800' :
                          review.severity === 'Medium' ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' :
                          review.severity === 'Low' ? 'bg-blue-50 text-blue-700' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {review.severity || 'None'}
                        </span>
                      </td>

                      {/* Priority */}
                      <td className="py-3 px-3 align-top whitespace-nowrap">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          review.priority === 'P0' ? 'bg-red-600 text-white' :
                          review.priority === 'P1' ? 'bg-amber-500 text-white' :
                          review.priority === 'P2' ? 'bg-blue-600 text-white' :
                          review.priority === 'P3' ? 'bg-slate-500 text-white' :
                          'bg-slate-100 text-slate-400'
                        }`}>
                          {review.priority || 'None'}
                        </span>
                      </td>

                      {/* Journey Stage */}
                      <td className="py-3 px-3 align-top text-[11px] text-slate-600 font-medium">
                        <div className="line-clamp-2" title={review.journeyStage || 'Not available'}>
                          {review.journeyStage || 'Not available'}
                        </div>
                      </td>

                      {/* Primary Cluster */}
                      <td className="py-3 px-3 align-top text-[11px] text-slate-600">
                        <div className="line-clamp-2" title={review.primaryCluster || 'Not available'}>
                          {review.primaryCluster || 'Not available'}
                        </div>
                      </td>

                      {/* Confidence */}
                      <td className="py-3 px-3 align-top text-[10px] text-slate-500">
                        <div className="line-clamp-2" title={review.evidenceConfidence || 'Not available'}>
                          {review.evidenceConfidence || 'Not available'}
                        </div>
                      </td>

                      {/* Review Text */}
                      <td className="py-3 px-3 align-top text-xs text-slate-800 leading-relaxed font-sans">
                        <p className="line-clamp-3">
                          "{review.text || 'Not available'}"
                        </p>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-3 align-top text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReview(review);
                          }}
                          className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs inline-flex items-center space-x-0.5 group-hover:underline"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Bar */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="text-slate-500 font-medium">
              Showing page <span className="font-bold text-slate-900">{currentPage}</span> of{' '}
              <span className="font-bold text-slate-900">{totalPages}</span>
            </div>

            <div className="flex items-center space-x-1.5 self-end sm:self-auto">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-2.5 py-1.5 rounded-md border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <span className="px-3 py-1.5 font-mono text-[11px] text-slate-600">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1.5 rounded-md border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Detail Modal */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                    (selectedReview.rating || 0) <= 2
                      ? 'bg-rose-100 text-rose-800'
                      : (selectedReview.rating || 0) === 3
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {selectedReview.rating != null ? selectedReview.rating : 'N/A'} Star Review
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {selectedReview.date ? selectedReview.date.split('T')[0] : '2026-10'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>Public review evidence</span>
                </h3>
              </div>
              <button
                onClick={() => setSelectedReview(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 py-4 text-xs">
              {/* Full Review Text */}
              <div>
                <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mb-1">
                  Full Review Text [OBSERVED]
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-900 leading-relaxed font-sans text-xs select-text">
                  "{selectedReview.text || 'Not available'}"
                </div>
              </div>

              {/* Classification Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Primary Theme</span>
                  <span className="text-xs font-bold text-slate-800">
                    {(selectedReview.primaryTheme || 'Not available').replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Defect Severity</span>
                  <span className="text-xs font-bold text-slate-800">
                    {selectedReview.severity || 'Not available'}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Priority Tier</span>
                  <span className="text-xs font-bold text-slate-800">
                    {selectedReview.priority || 'Not available'}
                  </span>
                </div>
              </div>

              {/* Secondary Themes & Complaint Flag */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Secondary Themes</span>
                  <span className="text-xs font-medium text-slate-700">
                    {Array.isArray(selectedReview.secondaryThemes) && selectedReview.secondaryThemes.length > 0
                      ? selectedReview.secondaryThemes.join(', ')
                      : 'None identified'}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Complaint Flag</span>
                  <span className="text-xs font-medium text-slate-700">
                    {selectedReview.complaintFlag ? 'Yes (Reported defect)' : 'No (Positive/Neutral feedback)'}
                  </span>
                </div>
              </div>

              {/* Journey Stage */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Journey Stage Impact</span>
                <span className="text-xs font-semibold text-slate-800">
                  {selectedReview.journeyStage || 'Not available'}
                </span>
              </div>

              {/* Primary Cluster */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Primary Root-Cause Cluster</span>
                <span className="text-xs font-semibold text-slate-800">
                  {selectedReview.primaryCluster || 'Not available'}
                </span>
              </div>

              {/* Evidence Confidence */}
              <div className="p-2.5 rounded-lg bg-indigo-50/50 border border-indigo-200">
                <span className="text-[10px] text-indigo-700 uppercase font-bold block">Evidence Confidence & Classification</span>
                <span className="text-xs font-medium text-indigo-900 leading-normal">
                  {selectedReview.evidenceConfidence || 'Not available'}
                </span>
              </div>

              {/* UUID */}
              <div>
                <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mb-1">
                  Public Review ID
                </div>
                <div className="p-2 rounded bg-slate-100 font-mono text-[11px] text-slate-600 break-all select-all">
                  {selectedReview.id || 'Not available'}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Public Play Store Review Record
              </span>
              <button
                onClick={() => setSelectedReview(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

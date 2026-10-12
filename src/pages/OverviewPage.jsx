import React from 'react';
import {
  Star,
  TrendingDown,
  AlertTriangle,
  ThumbsUp,
  BarChart2,
  Calendar,
  ArrowRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from 'recharts';
import KPICard from '../components/KPICard';
import DataQualityBanner from '../components/DataQualityBanner';
import {
  overviewStats,
  ratingDistributionChart,
  monthlyTrendsChart,
  journeyStages
} from '../data/caseStudyData';

export default function OverviewPage({ onNavigate }) {
  return (
    <div className="space-y-6">
      {/* Top Audit Banner */}
      <DataQualityBanner />

      {/* 5 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Total Reviews"
          value={overviewStats.totalReviews.toLocaleString()}
          subtitle="Bounded public Play Store sample"
          badge="100% Real"
          icon={BarChart2}
          colorClass="indigo"
        />
        <KPICard
          title="Average Rating"
          value={`${overviewStats.averageRating} / 5`}
          subtitle="Polarized commuter sentiment"
          badge="89.9% Polar"
          icon={Star}
          colorClass="amber"
        />
        <KPICard
          title="1★ Reviews"
          value={overviewStats.star1Count.toLocaleString()}
          subtitle="25.8% of sampled reviews"
          badge="25.8%"
          icon={AlertTriangle}
          colorClass="rose"
        />
        <KPICard
          title="Negative Reviews"
          value={overviewStats.negativeCount.toLocaleString()}
          subtitle="29.1% rated 1–2★ (291 reviews)"
          badge="29.1%"
          icon={TrendingDown}
          colorClass="rose"
        />
        <KPICard
          title="Positive Reviews"
          value={overviewStats.positiveCount.toLocaleString()}
          subtitle="68.3% rated 4–5★ (683 reviews)"
          badge="68.3%"
          icon={ThumbsUp}
          colorClass="emerald"
        />
      </div>

      {/* Charts Grid: Rating Distribution & Monthly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Rating Distribution Chart */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Rating Distribution (1★ – 5★)</span>
              </h2>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                n=1,000
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Bimodal polarization: 64.1% 5★ satisfaction contrasted with 25.8% 1★ acute rage. Neutral ratings (3★) represent only 2.6%.
            </p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingDistributionChart} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="star" type="category" tick={{ fontSize: 12, fontWeight: 'bold' }} width={35} />
                <Tooltip
                  formatter={(val, name, item) => [`${val} reviews (${item.payload.percentage}%)`, 'Volume']}
                  contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {ratingDistributionChart.map((entry, index) => (
                    <Bar key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Positive: 683 (68.3%)</span>
            <span>Neutral: 26 (2.6%)</span>
            <span className="text-rose-600 font-bold">Negative: 291 (29.1%)</span>
          </div>
        </div>

        {/* Monthly Trend Chart */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>Monthly Sentiment & Rating Trend (June – Oct 2026)</span>
              </h2>
              <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-medium">
                Oct: Partial Sample (n=81)
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Tracking average rating (line) vs negative review percentage (line) across monthly collection cohorts.
            </p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendsChart} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="rating" domain={[2.5, 4.5]} tick={{ fontSize: 11 }} label={{ value: 'Avg Rating', angle: -90, position: 'insideLeft', fontSize: 10 }} />
                <YAxis yAxisId="neg" orientation="right" domain={[0, 50]} tick={{ fontSize: 11 }} label={{ value: 'Negative %', angle: 90, position: 'insideRight', fontSize: 10 }} />
                <Tooltip
                  formatter={(val, name) => [name === 'Average Rating' ? `${val} / 5.0` : `${val}%`, name]}
                  contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line yAxisId="rating" type="monotone" dataKey="averageRating" name="Average Rating" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line yAxisId="neg" type="monotone" dataKey="negativePercentage" name="Negative %" stroke="#ef4444" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-normal flex items-center justify-between">
            <span>Lowest month: June (3.39 rating, 38.1% neg)</span>
            <span>Peak month: July (4.03 rating, 22.7% neg)</span>
            <span className="text-slate-600 font-semibold">August peak negative volume: 77 reviews</span>
          </div>
        </div>
      </div>

      {/* Commuter Journey Touchpoints Grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Commuter Journey Stage Vulnerability Overview
            </h2>
            <p className="text-xs text-slate-500">
              Where the 299 analyzed negative complaints break across the 10 core commute touchpoints.
            </p>
          </div>
          <button
            onClick={() => onNavigate('problems')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
          >
            <span>Explore User Problems</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {journeyStages.map((stage) => (
            <div
              key={stage.id}
              onClick={() => onNavigate('problems')}
              className="p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition">
                  {stage.name}
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  stage.severity === 'Critical' ? 'bg-rose-100 text-rose-700' :
                  stage.severity === 'High' ? 'bg-amber-100 text-amber-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {stage.count} rev
                </span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight">
                {stage.problem}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Highlight Box: Recommended First Move */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-xl p-5 shadow-md border border-indigo-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-400 text-slate-950 uppercase tracking-wider">
                FDE Recommended First Move
              </span>
              <span className="text-xs text-indigo-200 font-medium">Dual-Pronged Tactical Sprint</span>
            </div>
            <p className="text-sm font-semibold text-white">
              Simultaneously investigate post-update launch crashes (P0, 14 reviews) via Android Vitals while deploying a dismissible post-ride rating prompt (Quick Win / P1, 21 reviews).
            </p>
            <p className="text-xs text-slate-300">
              Unblocks commuters locked out of transport while immediately eliminating an observed catalyst of punitive 1-star Play Store reviews.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('priorities')}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow"
            >
              View Priority Matrix
            </button>
            <button
              onClick={() => onNavigate('recommendations')}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              View Quick Win
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

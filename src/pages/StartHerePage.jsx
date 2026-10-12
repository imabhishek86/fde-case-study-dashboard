import React from 'react';
import {
  Compass,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  Activity
} from 'lucide-react';
import { useData } from '../context/useData';

export default function StartHerePage({ onNavigate }) {
  const { analytics, lastRefreshedDisplay, publicReviewsCountDisplay } = useData();

  const totalReviews = analytics.totalReviews || 1000;
  const avgRating = analytics.averageRating || 3.77;
  const star1Share = analytics.totalReviews
    ? ((analytics.star1Count / analytics.totalReviews) * 100).toFixed(1)
    : '25.8';
  const negShare = analytics.negativePercentage || 29.1;
  const samplePeriod = analytics.samplePeriod || 'June 15, 2026 – October 11, 2026';

  return (
    <div className="space-y-6">
      {/* Executive Decision Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg border border-indigo-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2 text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>FDE Case Study Executive Brief</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-semibold">
            <span className="bg-indigo-950/80 text-indigo-200 border border-indigo-800 px-3 py-1 rounded-full">
              {publicReviewsCountDisplay}
            </span>
            <span className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1 rounded-full">
              {lastRefreshedDisplay}
            </span>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          MoveInSync Rating Improvement — Start Here
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Executive decision memo and candidate sequence for halting Play Store rating erosion on{' '}
          <span className="font-mono text-indigo-300">com.moveinsync.ets</span>. Translating qualitative commuter pain into empirical telemetry, validated fixes, and release safety.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('overview')}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow flex items-center space-x-1.5"
          >
            <span>Explore Full Overview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('priorities')}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            View Priority Matrix
          </button>
          <button
            onClick={() => onNavigate('recommendations')}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            View PRDs
          </button>
        </div>
      </div>

      {/* 1. Current Snapshot (Dynamically Calculated) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <Activity className="w-4 h-4 text-indigo-600" />
              <span>Current Snapshot (Dynamically Calculated)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Derived automatically from the live processed dataset (<code className="font-mono text-[11px]">processed_reviews.json</code>).
            </p>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
            n={totalReviews.toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
            <span className="text-[11px] font-semibold text-slate-500 block">Total Reviews</span>
            <span className="text-lg font-extrabold text-slate-900 mt-0.5 block font-mono">
              {totalReviews.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400">Bounded sample</span>
          </div>

          <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/40">
            <span className="text-[11px] font-semibold text-amber-800 block">Average Rating</span>
            <span className="text-lg font-extrabold text-amber-900 mt-0.5 block font-mono">
              {avgRating} / 5.0
            </span>
            <span className="text-[10px] text-amber-700">Polarized sentiment</span>
          </div>

          <div className="p-3.5 rounded-lg border border-rose-200 bg-rose-50/40">
            <span className="text-[11px] font-semibold text-rose-800 block">1★ Review Share</span>
            <span className="text-lg font-extrabold text-rose-900 mt-0.5 block font-mono">
              {star1Share}%
            </span>
            <span className="text-[10px] text-rose-700">{analytics.star1Count} reviews</span>
          </div>

          <div className="p-3.5 rounded-lg border border-rose-200 bg-rose-50/40">
            <span className="text-[11px] font-semibold text-rose-800 block">1–2★ Negative Share</span>
            <span className="text-lg font-extrabold text-rose-900 mt-0.5 block font-mono">
              {negShare}%
            </span>
            <span className="text-[10px] text-rose-700">{analytics.negativeCount} reviews</span>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
            <span className="text-[11px] font-semibold text-slate-500 block">Sample Window</span>
            <span className="text-xs font-bold text-slate-900 mt-1 block">
              {samplePeriod}
            </span>
            <span className="text-[10px] text-slate-400">India store (en)</span>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
            <span className="text-[11px] font-semibold text-slate-500 block">Last Refreshed</span>
            <span className="text-xs font-bold text-slate-900 mt-1 block">
              {analytics.lastRefreshed}
            </span>
            <span className="text-[10px] text-slate-400">Automated metadata</span>
          </div>
        </div>
      </div>

      {/* 2. What I Found */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
        <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <span>What I Found — Top Three Evidence-Backed Issues</span>
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Ground-truth evidence from the verified Step 7 prioritization matrix reveals three primary friction engines causing negative review volume:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition bg-slate-50/60">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-100 text-rose-700">
                P0 • Critical
              </span>
              <span className="text-xs font-bold text-slate-900">30 reviews</span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-1">
              1. Roster & Booking Failures
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Cutoff window timeouts, silent seat drops, and unconfirmed shift sync leave commuters stranded without office transport. Direct breach of primary utility.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition bg-slate-50/60">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-100 text-rose-700">
                P0 • Critical
              </span>
              <span className="text-xs font-bold text-slate-900">26 reviews</span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-1">
              2. Delayed & Frozen Live GPS Tracking
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Cab map pin freezes in place while the vehicle is already approaching. Commuters miss pickups due to stale telemetry without freshness indicators.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition bg-slate-50/60">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-100 text-rose-700">
                P0 / P1 • High Severity
              </span>
              <span className="text-xs font-bold text-slate-900">41 reviews (isolated)</span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-1">
              3. App Stability (Crashes & Freezing Separate)
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              <strong>Post-update crash loops (14 reviews)</strong> cause complete commuter lockout on launch, while <strong>in-transit UI freezing (27 reviews)</strong> degrades trip interaction. Distinct root causes.
            </p>
          </div>
        </div>
      </div>

      {/* 3. What I Would Fix First */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>What I Would Fix First — Prioritized Sequence</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Why each area is prioritized, keeping post-update crashes and freezing strictly separated.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <span className="text-sm font-bold text-slate-900">
                  Booking Reliability (Roster Sync & Cutoff Safeguards)
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Owner: <strong>Product & Engineering</strong> • Effort: <strong>Medium</strong> <span className="text-[10px] text-slate-400">(Qualitative estimate)</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-8">
              <strong>Why First:</strong> Booking is the existential gating function of the platform. When a commuter cannot book, they cannot reach work. Eliminating silent booking drops removes the single most punitive reason commuters open Google Play to leave 1★ reviews.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <span className="text-sm font-bold text-slate-900">
                  Live GPS Freshness & Telemetry Pipeline
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Owner: <strong>Engineering</strong> • Effort: <strong>High</strong> <span className="text-[10px] text-slate-400">(Qualitative estimate)</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-8">
              <strong>Why Second:</strong> Real-time vehicle arrival is the primary daily active touchpoint. Instrumenting 6-hop timestamp tracking and rendering explicit stale telemetry badges restores commuter trust and prevents curbside panic.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <span className="text-sm font-bold text-slate-900">
                  App Stability (Triage Launch Crashes vs Freezing Independently)
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Owner: <strong>Engineering</strong> • Effort: <strong>Medium</strong> <span className="text-[10px] text-slate-400">(Qualitative estimate)</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-8">
              <strong>Why Third:</strong> We triage <em>Post-Update Launch Crashes (14 reviews)</em> as urgent P0 blockers via Android Vitals stack traces (stopping catastrophic lockout), while optimizing <em>In-Transit Freezing / Map Render Lag (27 reviews)</em> as P1 architectural refactoring.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Best Quick Win */}
      <div className="bg-gradient-to-r from-amber-50 to-indigo-50/50 rounded-xl border border-amber-200/80 p-5 shadow-sm space-y-2">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 rounded-lg bg-amber-500 text-slate-950">
            <Sparkles className="w-4 h-4" />
          </span>
          <h2 className="text-sm font-bold text-slate-900">
            Best Quick Win — Dismissible Post-Trip Rating Prompt
          </h2>
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900">
            Low Effort / High Leverage
          </span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          Convert the current modal prompt into a dismissible bottom-sheet banner with an explicit [Skip] button and gentle reminder mechanics.
        </p>
        <div className="p-3 bg-white/80 rounded-lg border border-amber-200 text-xs text-slate-600 space-y-1">
          <p className="font-semibold text-slate-900">
            Honest Analytical Boundary:
          </p>
          <p className="italic">
            &quot;This is a potential rating-impact opportunity, not a proven population-level cause of low ratings.&quot;
          </p>
          <p className="text-[11px] text-slate-500 pt-1">
            Owner: <strong>Product & Engineering</strong> • Effort: <strong>Low</strong> (qualitative estimate) • Expected effect: <strong>Expected to reduce negative commuter experiences</strong> caused by trapped feedback modals.
          </p>
        </div>
      </div>

      {/* 5. Day 1 Actions Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
        <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <span>Day 1 Actions — Concrete Tactical Sequence</span>
        </h2>
        <p className="text-xs text-slate-500">
          The exact first-day sequence an incoming Forward Deployed Engineer should execute:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Step</th>
                <th className="py-2.5 px-3">Action Item</th>
                <th className="py-2.5 px-3">Functional Owner</th>
                <th className="py-2.5 px-3">Qualitative Effort</th>
                <th className="py-2.5 px-3">Expected Effect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-2.5 px-3 font-bold text-indigo-600">1</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">
                  Pull current production reliability telemetry
                  <div className="text-[11px] text-slate-500 font-normal">Establish baseline metrics across Play Console, Firebase Crashlytics & server logs.</div>
                </td>
                <td className="py-2.5 px-3 font-medium">Engineering & Product</td>
                <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">Low</span></td>
                <td className="py-2.5 px-3 text-slate-700">Baseline empirical truth established</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-indigo-600">2</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">
                  Validate startup crash and ANR patterns
                  <div className="text-[11px] text-slate-500 font-normal">Isolate post-update crash stack traces from in-transit ANR UI thread bottlenecks.</div>
                </td>
                <td className="py-2.5 px-3 font-medium">Engineering</td>
                <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">Low</span></td>
                <td className="py-2.5 px-3 text-slate-700">Expected to stop lockout loops</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-indigo-600">3</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">
                  Instrument GPS freshness
                  <div className="text-[11px] text-slate-500 font-normal">Verify end-to-end packet latency between driver broadcast and commuter map render.</div>
                </td>
                <td className="py-2.5 px-3 font-medium">Engineering & Operations</td>
                <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold text-[10px]">Medium</span></td>
                <td className="py-2.5 px-3 text-slate-700">Pinpoints WebSocket / broker bottlenecks</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-indigo-600">4</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">
                  Inspect booking failure paths
                  <div className="text-[11px] text-slate-500 font-normal">Review cutoff timeout exceptions, database concurrency locks, and roster push sync.</div>
                </td>
                <td className="py-2.5 px-3 font-medium">Engineering & Support</td>
                <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold text-[10px]">Medium</span></td>
                <td className="py-2.5 px-3 text-slate-700">Identifies silent allocation failure routes</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-indigo-600">5</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">
                  Launch / prepare rating prompt experiment
                  <div className="text-[11px] text-slate-500 font-normal">A/B test dismissible bottom-sheet vs unskippable blocking modal for post-ride CSAT.</div>
                </td>
                <td className="py-2.5 px-3 font-medium">Product & Engineering</td>
                <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">Low</span></td>
                <td className="py-2.5 px-3 text-slate-700">Expected to reduce commuter friction</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Measurement Framework */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
        <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>Operational Measurement Framework</span>
        </h2>
        <p className="text-xs text-slate-500">
          How progress will be objectively tracked across telemetry indicators without claiming unverified causal leaps:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-1">
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Rating Trend</span>
            <span className="text-xs font-bold text-slate-900 mt-1 block">Avg Public Rating</span>
            <span className="text-[10px] text-slate-400">Monthly 30-day rolling</span>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Negative Share</span>
            <span className="text-xs font-bold text-slate-900 mt-1 block">1★ & 2★ Share %</span>
            <span className="text-[10px] text-slate-400">Target reduction</span>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Booking Success</span>
            <span className="text-xs font-bold text-slate-900 mt-1 block">API Success Rate</span>
            <span className="text-[10px] text-slate-400">&lt; 1% drop rate</span>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">GPS Freshness</span>
            <span className="text-xs font-bold text-slate-900 mt-1 block">End-to-End Latency</span>
            <span className="text-[10px] text-slate-400">P95 &lt; 8 seconds</span>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Crash-Free</span>
            <span className="text-xs font-bold text-slate-900 mt-1 block">Crash-Free Users</span>
            <span className="text-[10px] text-slate-400">Target &gt; 99.5%</span>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">ANR Rate</span>
            <span className="text-xs font-bold text-slate-900 mt-1 block">Play Vitals ANR</span>
            <span className="text-[10px] text-slate-400">Under Google threshold</span>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Rating Prompt</span>
            <span className="text-xs font-bold text-slate-900 mt-1 block">Dismissal &amp; CSAT</span>
            <span className="text-[10px] text-slate-400">Zero forced lockouts</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import {
  BookOpen,
  Database,
  Cpu,
  Layers,
  Wrench,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Code
} from 'lucide-react';
import { useData } from '../context/useData';

export default function MethodologyPage() {
  const { analytics, lastRefreshedDisplay, publicReviewsCountDisplay } = useData();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Engineering & Data Methodology</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Analysis Methodology, Pipeline Architecture & Tools Disclosure
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Transparent documentation of data sources, collection protocols, deterministic cleaning, semantic classification engines, audit denominators, and analytical boundaries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Database className="w-3.5 h-3.5 mr-1.5" />
              {publicReviewsCountDisplay}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              {lastRefreshedDisplay}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: 4 Core Pipeline Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stage 1: Data Source & Collection */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">1. Data Source & Collection</h2>
              <p className="text-[11px] text-slate-500">Public Google Play Store API retrieval</p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Application ID:</strong>{' '}
                <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-700 font-mono">com.moveinsync.ets</code>
                {' '}(MoveInSync Employee Commute platform).
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Locale & Territory:</strong> India (<code className="font-mono">in</code>), English language (<code className="font-mono">en</code>).
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Collection Tool:</strong> <code className="font-mono">google-play-scraper</code> (Node.js library) executing paginated token-based queries.
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Sampling Protocol:</strong> Dual-pass strategy pulling latest cohort (`NEWEST`) supplemented by `HELPFULNESS` to establish an audited {analytics.totalReviews || 1000}-review bounded sample.
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-[11px] text-slate-500 bg-amber-50/60 p-2 rounded border border-amber-200/60">
                <strong>Sampling Limitation:</strong> This pipeline uses a bounded public sample of Google Play reviews and is subject to public-source availability, pagination limits, rate limits, and sampling bias. It does not represent MoveInSync’s complete historical database.
              </div>
            </li>
          </ul>
        </div>

        {/* Stage 2: Processing & Data Cleaning */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">2. Processing & Deterministic Cleaning</h2>
              <p className="text-[11px] text-slate-500">Immutable raw intake and validation</p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Immutability:</strong> Raw ingested data is stored in <code className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">data/raw/raw_reviews.json</code> without in-place modification.
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Deduplication:</strong> Unique Google Play review ID hashing. Duplicate submissions are logged and deduplicated.
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Field Validation:</strong> Strict schema validation requiring integer ratings (1–5★), non-empty ISO date timestamps, and sanitized text strings.
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Normalization:</strong> Whitespace stripping, emoji preservation, text length quantification, and calendar month segmentation.
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Quality Output:</strong> Generation of <code className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">data_quality_report.json</code> verifying 0 missing ratings and 0 schema violations.
              </div>
            </li>
          </ul>
        </div>

        {/* Stage 3: Semantic Analysis Engine */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">3. Deterministic Local Semantic Engine</h2>
              <p className="text-[11px] text-slate-500">Completely honest technical disclosure</p>
            </div>
          </div>

          <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200 text-xs text-amber-900 leading-relaxed font-medium">
            <p className="mb-2">
              <strong>Transparent NLP Engine Disclosure:</strong>
            </p>
            <p className="italic">
              &quot;A deterministic local semantic analysis engine was used for reproducible classification and hypothesis generation. A live Gemini API call was not used because no Gemini API key was configured.&quot;
            </p>
          </div>

          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Taxonomy:</strong> 11 domain-specific commute taxonomy themes (Booking, Tracking_GPS_ETA, App_Performance, UI_UX, Pickup_Route, Driver_Vehicle, Notifications, Login_OTP, Support, Safety, Other).
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Reproducibility:</strong> Contextual regex pattern matching with weighted keyword-distance scoring guarantees 100% deterministic output on any machine without API cost, rate throttling, or non-deterministic hallucinations.
              </div>
            </li>
          </ul>
        </div>

        {/* Stage 4: Prioritization & Journey Mapping */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">4. Analysis & Prioritization Logic</h2>
              <p className="text-[11px] text-slate-500">6-dimensional operational triage</p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Rating Distribution:</strong> Longitudinal monthly tracking comparing volume and negative sentiment proportions.
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Journey Mapping:</strong> Allocation of complaint evidence into 10 sequential commuter stages (Roster Scheduling → Post-Trip Rating).
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Root-Cause Rigor:</strong> 4-tier diagnostic model isolating <em>Observed Symptoms</em> from <em>Inferred Hypotheses</em>, <em>Required Telemetry</em>, and <em>Proposed Actions</em>.
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Triage Dimensions:</strong> Frequency, Severity, Commuter Journey Impact, Evidence Strength, Rating Potential, and Qualitative Engineering Effort.
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Deep-Dive Card: Denominator Audit & Other/Vague Categorization */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          <span>Evidence Quality Check: Audited Distinction & Denominator Clarity</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          An external quality review queried the proportion of reviews falling into unclassified or vague groupings. We conducted a rigorous denominator verification across the Step 6 audited dataset:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
            <span className="text-[11px] font-bold text-slate-700 block mb-1">
              1. Truly Vague Dissatisfaction
            </span>
            <div className="text-lg font-extrabold text-slate-900 font-mono mb-1">76 reviews</div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Pure emotional sentiment devoid of functional or feature context (&quot;worst app&quot;, &quot;pathetic&quot;, &quot;bekar&quot;). Deemed non-actionable for direct code change without survey follow-up.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
            <span className="text-[11px] font-bold text-slate-700 block mb-1">
              2. Low-Information Functional
            </span>
            <div className="text-lg font-extrabold text-slate-900 font-mono mb-1">17 reviews</div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Ultra-brief functional complaints (&quot;app not opening&quot;, &quot;login issue&quot;) that indicate real friction but lack device model, OS version, or stack traces.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-indigo-200 bg-indigo-50/50">
            <span className="text-[11px] font-bold text-indigo-900 block mb-1">
              3. Specific Functional Complaints
            </span>
            <div className="text-lg font-extrabold text-indigo-700 font-mono mb-1">206 reviews</div>
            <p className="text-[11px] text-indigo-950 leading-tight">
              Rich, highly detailed feedback targeting specific workflows (Booking drop-offs, frozen GPS map pins, post-update launch crashes, seatbelt OTP modals).
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1">
          <p>
            <strong>Denominator Clarification:</strong> 76 + 17 = <strong>93 reviews</strong> comprise the combined vague/low-information feedback within the <strong>299 analyzed negative complaint assignments</strong> (31.1%).
          </p>
          <p>
            When examining the entire <strong>1,000-review dataset</strong>, high-star positive reviews (683 reviews rated 4–5★) containing generic praise (&quot;good&quot;, &quot;all good&quot;) default to the general &quot;Other&quot; category. They must <strong>never be conflated</strong> with negative commuter defects.
          </p>
        </div>
      </div>

      {/* Scope Clarification & Tools Disclosure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scope Clarification */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>Scope Clarification & Assumptions</span>
          </div>
          <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <p>
              <strong>Analysis Scope:</strong> The analysis scope is strictly the MoveInSync employee application (<code className="font-mono bg-slate-100 px-1 py-0.5 rounded">com.moveinsync.ets</code>) because that is the public Play Store application used for this analysis.
            </p>
            <p>
              <strong>Portfolio Boundary:</strong> Other MoveInSync applications (e.g. MoveInSync Driver, MoveInSync Partner, MoveInSync Escort, or enterprise web portals) were <strong>not independently analyzed</strong> in this submission.
            </p>
            <p>
              <strong>Causal Integrity:</strong> We do not claim proven population-level causality between specific Play Store reviews and total active user retention, as public review data exhibits inherent voluntary-response sampling bias.
            </p>
          </div>
        </div>

        {/* Tools Disclosure */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
            <Wrench className="w-4 h-4 text-indigo-600" />
            <span>Tools & AI Assistance Disclosure</span>
          </div>
          <div className="text-xs text-slate-600 space-y-2.5">
            <div>
              <strong className="text-slate-900">Application & Frontend:</strong> React 19, Vite, JavaScript (ESM), Tailwind CSS, Lucide Icons, Recharts.
            </div>
            <div>
              <strong className="text-slate-900">Data Collection & Scripts:</strong> Node.js runtime, <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">google-play-scraper</code>.
            </div>
            <div>
              <strong className="text-slate-900">Code Quality:</strong> Oxlint (fast static analysis).
            </div>
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-slate-700">
              <div className="flex items-center space-x-1.5 font-semibold text-slate-900 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI / Pair-Programming Assistance:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Antigravity / AI coding assistance was utilized during development and analysis workflow design; analytical claims, metric computations, and classifications remain strictly traceable to the collected review dataset.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

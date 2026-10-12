import React, { useState } from 'react';
import {
  Sparkles,
  Star,
  ArrowRight,
  Beaker
} from 'lucide-react';
import { quickWinDetails } from '../data/caseStudyData';

const RECOMMENDATIONS_DATA = [
  // P0 Recommendations
  {
    id: 'PRD-01',
    prdFile: '01_booking_reliability_prd.md',
    priority: 'P0',
    title: 'Roster & Booking Reliability Workstream',
    cluster: 'cluster_booking_failure',
    reviewsCount: 30,
    severity: 'High',
    journey: 'Shift/Roster Scheduling & Pre-Trip Booking',
    problem: 'Commuters report unexpected booking failures, unconfirmed rosters, and silent drops during peak cutoff hours.',
    evidence: '30 primary reviews (Review IDs: 43d90b3c..., bc736dc0...).',
    recommendation: 'Deploy client-side idempotent booking submissions; establish explicit client state machine (REQUESTED, ALLOCATING, CONFIRMED, WAITLISTED); APM cutoff transaction tracing.',
    userValue: 'Commuters gain certainty that their seat is secured, eliminating fear of being stranded before work shifts.',
    validationMetric: 'Booking transaction success rate > 99.8%, P99 latency < 1.5s (Proposed validation target; subject to baseline review).',
    dependency: 'Backend booking microservices & database connection pool limits.'
  },
  {
    id: 'PRD-02',
    prdFile: '02_live_tracking_prd.md',
    priority: 'P0',
    title: 'Live GPS Tracking Freshness & Visibility Pipeline',
    cluster: 'cluster_delayed_gps_tracking',
    reviewsCount: 26,
    severity: 'High',
    journey: 'Live Tracking (Curbside Waiting & Boarding)',
    problem: 'Commuters report vehicle map pins freeze in place and location updates lag substantially while waiting curbside.',
    evidence: '26 primary reviews (Review IDs: 2ce14584..., 61a4a85f...).',
    recommendation: 'Instrument 6-hop end-to-end location latency pipeline; display "Updated X seconds ago" timestamp; render explicit stale state when telemetry age > 20s.',
    userValue: 'Eliminates blind curbside waiting and curbside panic; commuters know exactly when to walk out.',
    validationMetric: 'P95 location freshness < 10 seconds during active tracking (Proposed validation target; subject to review).',
    dependency: 'Driver app background location persistence and telemetry message broker.'
  },
  {
    id: 'PRD-03A',
    prdFile: '03_app_stability_prd.md',
    priority: 'P0',
    title: 'App Startup Crash Isolation & Safe Migration',
    cluster: 'cluster_post_update_crash',
    reviewsCount: 14,
    severity: 'High',
    journey: 'Pre-Commute Launch (Immediate Service Lockout)',
    problem: 'Commuters report the app fails to open after updating, crashing immediately and forcing repeated uninstall/reinstall cycles.',
    evidence: '14 primary reviews (Review IDs: 60798e45..., 133d2b88...). Separated from App Freezing.',
    recommendation: 'Audit Android Vitals startup stack traces; build automated upgrade-path migration test suite; implement defensive startup safe mode.',
    userValue: 'Restores basic app access on morning commute; eliminates service lockout and uninstallation rage.',
    validationMetric: 'App startup crash rate < 0.1%, crash-free user rate > 99.5% (Proposed validation target; subject to review).',
    dependency: 'Google Play Console Android Vitals & Crashlytics telemetry.'
  },
  {
    id: 'PRD-03B',
    prdFile: '03_app_stability_prd.md',
    priority: 'P0',
    title: 'UI Main Thread Profiling & ANR Mitigation',
    cluster: 'cluster_app_performance',
    reviewsCount: 27,
    severity: 'High',
    journey: 'Trip / Ride & Active Navigation (In-Transit)',
    problem: 'Commuters report severe UI lag, unresponsiveness, and screen freezing during active ride tracking and schedule views.',
    evidence: '27 primary reviews (Review IDs: e735e280..., 9936bf10...).',
    recommendation: 'Decouple location coordinate parsing and caching from the main UI thread to background worker threads; optimize map draw calls.',
    userValue: 'Smooth, fluid interactions without ANR dialogs during time-critical commute operations.',
    validationMetric: 'Android Vitals ANR rate < 0.2%, slow render frame rate < 5% (Proposed validation target; subject to review).',
    dependency: 'Client mobile app Android architecture.'
  },
  {
    id: 'PRD-04',
    prdFile: '04_safety_experience_prd.md',
    priority: 'P0',
    title: 'Safety Experience & Boarding Compliance Refactor',
    cluster: 'cluster_safety_prompt_friction',
    reviewsCount: 6,
    severity: 'Critical',
    journey: 'Safety, Emergency & Curbside Boarding',
    problem: '3 reviews cite acute physical safety concerns; 3 reviews cite intrusive seatbelt popups intercepting "View OTP" clicks at cab boarding.',
    evidence: '6 primary reviews (Review IDs: 3d87f169..., 387a67a5...). Delineates safety from popup friction.',
    recommendation: 'Refactor blocking seatbelt popup into a prominent non-blocking inline banner for 1-click OTP view; display Command Center monitoring badge; 2-tap SOS.',
    userValue: 'Preserves legal safety duty of care while removing daily boarding friction for rushed commuters.',
    validationMetric: 'Time-to-OTP display reduction; SOS emergency dispatch acknowledgment < 30s (Proposed validation target).',
    dependency: 'Enterprise corporate safety compliance mandates.'
  },

  // P1 Recommendations
  {
    id: 'PRD-07',
    prdFile: '07_ui_rating_prd.md',
    priority: 'P1',
    title: 'Post-Trip Rating Flow & UI Simplification (Quick Win)',
    cluster: 'cluster_ui_redesign',
    reviewsCount: 21,
    severity: 'Medium',
    journey: 'Post-Ride Feedback & General App Navigation',
    problem: 'Unskippable in-app rating modal intercepts app navigation and provoked at least one commuter to submit a 1-star Play Store review.',
    evidence: '21 primary reviews (Review ID: f9fce9fe...). Explicit user testimony linking forced modal to 1-star review.',
    recommendation: 'Add clear "Skip" / "Dismiss" button to post-trip rating prompt; support swipe-down dismiss; streamline home screen cards.',
    userValue: 'Respects commuter time; removes coercion without suppressing genuine feedback.',
    validationMetric: 'Zero task abandonment at rating prompt; reduction in retaliatory Play Store 1-star reviews.',
    dependency: 'Client UI mobile update.'
  },
  {
    id: 'PRD-05',
    prdFile: '05_otp_session_prd.md',
    priority: 'P1',
    title: 'Authentication Lifecycle & Boarding OTP Resilience',
    cluster: 'cluster_otp_session_friction',
    reviewsCount: 20,
    severity: 'High',
    journey: 'Pickup & Boarding Verification (Curbside)',
    problem: 'Unexpected session logouts on app resume and curbside delays receiving boarding OTPs while waiting in cab queues.',
    evidence: '20 primary reviews (Review IDs: 72e74b90..., f603466c...).',
    recommendation: 'Implement silent background token refresh in onResume; cache active ride OTP in encrypted local storage for offline basement access.',
    userValue: 'Seamless app resume at vehicle door; instant OTP display even in zero-network basement parking.',
    validationMetric: 'Curbside session logout rate on resume < 0.5% (Proposed validation target; subject to review).',
    dependency: 'Mobile Auth SDK & backend OAuth gateway.'
  },
  {
    id: 'PRD-06A',
    prdFile: '06_routing_eta_prd.md',
    priority: 'P1',
    title: 'Routing Solver Detour Constraints & Stop Sequence',
    cluster: 'cluster_pickup_route_assignment',
    reviewsCount: 16,
    severity: 'High',
    journey: 'Pickup & Mid-Commute Transit',
    problem: 'Extreme multi-zone detours ("Bharat Darshan") and illogical pickup sequences doubling transit duration.',
    evidence: '16 primary reviews (Review IDs: 85146e08..., 864d85ff...).',
    recommendation: 'Enforce hard maximum detour ratio constraints in routing solver; simulate impact on historical fleet capacity; display stop sequence to user.',
    userValue: 'Drastically reduces unnecessary transit time and physical exhaustion from circuitous employee grouping.',
    validationMetric: 'Detour ratio compliance > 95% of trips within acceptable detour thresholds (Proposed validation target).',
    dependency: 'Fleet optimization routing algorithm.'
  },
  {
    id: 'PRD-06B',
    prdFile: '06_routing_eta_prd.md',
    priority: 'P1',
    title: 'Dynamic Traffic Feed & ETA Validation Pipeline',
    cluster: 'cluster_eta_inaccuracies',
    reviewsCount: 10,
    severity: 'High',
    journey: 'Pre-Trip Pacing & In-Transit Planning',
    problem: 'Fluctuating and inaccurate arrival ETAs; at least one reviewer reported an approximately 3x discrepancy versus Google Maps.',
    evidence: '10 primary reviews (Review IDs: 7476b129..., 145e34ef...). Google Maps not treated as automatic ground truth.',
    recommendation: 'Deploy 4-stage empirical ETA telemetry pipeline (Predicted ETA vs Actual Arrival); calibrate empirical boarding dwell buffers per stop.',
    userValue: 'Predictable arrival pacing; commuters know exactly when their cab will arrive.',
    validationMetric: 'P90 ETA prediction error within ± 5 minutes of actual pickup arrival (Proposed validation target).',
    dependency: 'Geolocation and ETA prediction pipeline.'
  },
  {
    id: 'PRD-08',
    prdFile: '08_driver_vehicle_prd.md',
    priority: 'P1',
    title: 'Driver Conduct & Fleet Vehicle Quality Governance',
    cluster: 'cluster_driver_vehicle',
    reviewsCount: 24,
    severity: 'Medium',
    journey: 'Trip / Ride (In-Cabin Experience)',
    problem: 'Non-working AC, poor vehicle hygiene, reckless driving/speeding, or rude driver conduct.',
    evidence: '24 primary reviews (Review IDs: 98db1b19..., 88fa8703...).',
    recommendation: 'Deploy structured in-app feedback tags (AC, Cleanliness, Driving) for ratings < 4 stars; automate vendor re-inspection alerts for repeat defects.',
    userValue: 'Dignified, comfortable daily commute in clean, climate-controlled vehicles with professional drivers.',
    validationMetric: 'Reduction in AC / cleanliness complaints; vendor defect resolution time < 48 hours (Proposed validation target).',
    dependency: 'Vendor partner fleet portal & operational governance.'
  },

  // P2 Recommendations
  {
    id: 'PRD-09A',
    prdFile: '09_support_notifications_prd.md',
    priority: 'P2',
    title: 'In-App Self-Service Exception Reporting',
    cluster: 'cluster_support_responsiveness',
    reviewsCount: 8,
    severity: 'Medium',
    journey: 'Post-Trip & Exception Resolution',
    problem: 'Unreachable helpdesk phone numbers and slow resolution of transit queries during commute exceptions.',
    evidence: '8 primary reviews (Review IDs: 225d87f1..., 1d7aa4a5...).',
    recommendation: 'Deploy one-tap in-app exception reporting ("Report Delay") to alert transport desk; defer broader helpdesk overhaul to Phase 3.',
    userValue: 'Fast exception reporting without waiting on hold during stressful morning delays.',
    validationMetric: 'Shift of exception volume to in-app self-service; reduction in dropped helpdesk calls.',
    dependency: 'Enterprise transport desk webhook API.'
  },
  {
    id: 'PRD-09B',
    prdFile: '09_support_notifications_prd.md',
    priority: 'P2',
    title: 'High-Priority Push Notification Channels',
    cluster: 'cluster_notifications',
    reviewsCount: 4,
    severity: 'Medium',
    journey: 'Vehicle Assignment & Approach Alert',
    problem: 'Vehicle assignment and approach notifications arrive late or fail to alert the user in time.',
    evidence: '4 primary reviews (Review IDs: bb8bc95d..., cdb0fe80...).',
    recommendation: 'Configure Android PRIORITY_HIGH heads-up notification channels for vehicle approach alerts; instrument notification delivery latency.',
    userValue: 'Timely lock screen alerts prevent commuters from missing approaching cabs.',
    validationMetric: 'P95 push alert delivery latency < 5s (Proposed validation target; subject to review).',
    dependency: 'Firebase Cloud Messaging (FCM) gateway configuration.'
  }
];

export default function RecommendationsPage({ onNavigate }) {
  const [activeTier, setActiveTier] = useState('ALL');

  const filteredRecs = RECOMMENDATIONS_DATA.filter(r => {
    if (activeTier === 'ALL') return true;
    return r.priority === activeTier;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Product & Engineering Recommendations</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Consolidated initiatives from 9 formal Product Requirement Documents (PRDs). Prioritized into P0 (Immediate), P1 (Core), and P2 (Later) tiers with verifiable acceptance criteria.
            </p>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
            {['ALL', 'P0', 'P1', 'P2'].map(tier => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`px-3 py-1.5 rounded-md transition ${
                  activeTier === tier
                    ? 'bg-white text-slate-900 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tier === 'ALL' ? 'All Tiers' : `${tier} Recommendations`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Prominent ⭐ POTENTIAL QUICK WIN Card */}
      <div className="bg-amber-50/70 border-2 border-amber-300 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-400 text-slate-950 uppercase tracking-wide">
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                <span>Potential Quick Win</span>
              </span>
              <span className="text-xs font-bold text-amber-900">PRD 07 • P1 Priority</span>
            </div>

            <h2 className="text-base font-extrabold text-slate-900">
              {quickWinDetails.title}
            </h2>

            <p className="text-xs text-slate-700 leading-relaxed">
              {quickWinDetails.opportunityNature}
            </p>

            {/* Evidence Quote Callout */}
            <div className="bg-white p-3 rounded-lg border border-amber-200 text-xs text-slate-800 italic">
              "{quickWinDetails.evidenceQuote}"
              <span className="block text-[10px] text-slate-500 font-normal not-italic mt-1 font-mono">
                — Verified Review ID: {quickWinDetails.reviewerId}
              </span>
            </div>
          </div>

          {/* Quick Win A/B Experiment Spec */}
          <div className="bg-white p-4 rounded-xl border border-amber-200 lg:w-96 space-y-2.5 text-xs">
            <div className="flex items-center space-x-1.5 font-bold text-slate-900 text-[11px] uppercase tracking-wider">
              <Beaker className="w-3.5 h-3.5 text-indigo-600" />
              <span>Structured A/B Validation Experiment</span>
            </div>

            <div className="space-y-1 text-[11px]">
              <div><strong className="text-slate-700">Variant A (Control):</strong> <span className="text-slate-600">Current unskippable rating modal gating navigation.</span></div>
              <div><strong className="text-slate-700">Variant B (Treatment):</strong> <span className="text-slate-600">Modal with clear "Skip" button and swipe-down dismiss.</span></div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">
                Telemetry Validation Metrics:
              </span>
              <ul className="text-[11px] text-slate-600 list-disc list-inside space-y-0.5">
                {quickWinDetails.experiment.metrics.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredRecs.map((rec) => (
          <div
            key={rec.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between mb-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      rec.priority === 'P0' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                      rec.priority === 'P1' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      {rec.priority} Priority
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {rec.id} • {rec.reviewsCount} Reviews
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    {rec.title}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                  {rec.prdFile}
                </span>
              </div>

              {/* Card Body */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Observed Problem & Evidence
                  </div>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {rec.problem}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {rec.evidence}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-indigo-50/50 border border-indigo-100">
                  <div className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider mb-0.5">
                    Proposed Recommendation
                  </div>
                  <p className="text-indigo-950 font-medium leading-relaxed">
                    {rec.recommendation}
                  </p>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Expected User Value
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {rec.userValue}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-0.5 flex items-center justify-between">
                    <span>Validation Metric</span>
                    <span className="text-[9px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                      Proposed Target
                    </span>
                  </div>
                  <p className="text-slate-900 font-mono text-[11px] leading-relaxed">
                    {rec.validationMetric}
                  </p>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="text-[11px] text-slate-400">
                Dep: {rec.dependency}
              </span>
              <button
                onClick={() => onNavigate('product-backlog')}
                className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center space-x-1"
              >
                <span>Backlog View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

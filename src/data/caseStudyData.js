/**
 * MoveInSync Case Study Dashboard Data Layer
 * Automatically generated from Step 1-9 audited artifacts.
 * DO NOT EDIT MANUALLY.
 */

export const overviewStats = {
  "totalReviews": 1000,
  "averageRating": 3.77,
  "star1Count": 258,
  "star2Count": 33,
  "star3Count": 26,
  "star4Count": 42,
  "star5Count": 641,
  "negativeCount": 291,
  "negativePercentage": 29.1,
  "positiveCount": 683,
  "positivePercentage": 68.3,
  "neutralCount": 26,
  "neutralPercentage": 2.6,
  "samplePeriod": "June 15, 2026 – October 11, 2026",
  "appId": "com.moveinsync.ets",
  "country": "India (en)"
};

export const ratingDistributionChart = [
  {
    "star": "5★",
    "count": 641,
    "percentage": 64.1,
    "color": "#10b981"
  },
  {
    "star": "4★",
    "count": 42,
    "percentage": 4.2,
    "color": "#34d399"
  },
  {
    "star": "3★",
    "count": 26,
    "percentage": 2.6,
    "color": "#fbbf24"
  },
  {
    "star": "2★",
    "count": 33,
    "percentage": 3.3,
    "color": "#f87171"
  },
  {
    "star": "1★",
    "count": 258,
    "percentage": 25.8,
    "color": "#ef4444"
  }
];

export const monthlyTrendsChart = [
  {
    "month": "Jun 2026",
    "reviews": 147,
    "averageRating": 3.39,
    "negativeReviews": 56,
    "negativePercentage": 38.1,
    "positiveReviews": 85
  },
  {
    "month": "Jul 2026",
    "reviews": 286,
    "averageRating": 4.03,
    "negativeReviews": 65,
    "negativePercentage": 22.73,
    "positiveReviews": 215
  },
  {
    "month": "Aug 2026",
    "reviews": 241,
    "averageRating": 3.65,
    "negativeReviews": 77,
    "negativePercentage": 31.95,
    "positiveReviews": 155
  },
  {
    "month": "Sep 2026",
    "reviews": 245,
    "averageRating": 3.84,
    "negativeReviews": 68,
    "negativePercentage": 27.76,
    "positiveReviews": 173
  },
  {
    "month": "Oct 2026 (Partial)",
    "reviews": 81,
    "averageRating": 3.74,
    "negativeReviews": 25,
    "negativePercentage": 30.86,
    "positiveReviews": 55
  }
];

export const journeyStages = [
  {
    "id": "roster",
    "name": "Roster Scheduling",
    "icon": "Calendar",
    "count": 30,
    "severity": "High",
    "problem": "Unconfirmed shift rosters and sync lag"
  },
  {
    "id": "booking",
    "name": "Trip Booking",
    "icon": "CheckSquare",
    "count": 30,
    "severity": "High",
    "problem": "Cutoff timeouts & silent drops"
  },
  {
    "id": "assignment",
    "name": "Vehicle Assignment",
    "icon": "Bell",
    "count": 4,
    "severity": "Medium",
    "problem": "Delayed approach push alerts"
  },
  {
    "id": "launch",
    "name": "Pre-Commute Launch",
    "icon": "AlertTriangle",
    "count": 14,
    "severity": "High",
    "problem": "Post-update crash loops (Lockout)"
  },
  {
    "id": "curbside",
    "name": "Curbside Waiting",
    "icon": "MapPin",
    "count": 26,
    "severity": "High",
    "problem": "Frozen vehicle GPS pins & stale maps"
  },
  {
    "id": "boarding",
    "name": "Boarding Gate",
    "icon": "Key",
    "count": 20,
    "severity": "High",
    "problem": "Session logouts & seatbelt popup over OTP"
  },
  {
    "id": "transit",
    "name": "In-Transit Ride",
    "icon": "Navigation",
    "count": 27,
    "severity": "High",
    "problem": "UI frame freezing & circuitous detours"
  },
  {
    "id": "incabin",
    "name": "In-Cabin Comfort",
    "icon": "Truck",
    "count": 24,
    "severity": "Medium",
    "problem": "Broken AC, cleanliness & conduct"
  },
  {
    "id": "feedback",
    "name": "Post-Trip Rating",
    "icon": "Star",
    "count": 21,
    "severity": "Medium",
    "problem": "Unskippable modal provoking 1-star reviews"
  },
  {
    "id": "support",
    "name": "Exception Support",
    "icon": "Headphones",
    "count": 8,
    "severity": "Medium",
    "problem": "Unreachable helpdesk lines"
  }
];

export const auditedClusters = [
  {
    "id": "cluster_booking_failure",
    "issue": "Roster & Booking Management Failure",
    "priority": "P0",
    "frequency": 30,
    "severity": "High",
    "journeyImpact": "Booking & Shift Scheduling (Pre-Trip)",
    "evidenceStrength": "Medium [OBSERVED] (30 review assignments citing failed bookings, unconfirmed rosters, and booking errors during shift cutoffs)",
    "ratingImpact": "High [INFERRED]",
    "effort": "High [Qualitative effort estimate; requires engineering validation]",
    "whyThisPriority": "Largest volume actionable functional defect (30 primary reviews). Booking failure directly prevents employee attendance at workplace shifts.",
    "whyNow": "Foundational utility of MoveInSync. If employees cannot successfully secure transport, all downstream ride and tracking experiences are rendered moot.",
    "whyLater": null,
    "missingEvidence": null,
    "sampleReviewId": "43d90b3c-0443-4073-8647-6aee98c78bd4"
  },
  {
    "id": "cluster_delayed_gps_tracking",
    "issue": "Delayed or Frozen Live GPS Tracking",
    "priority": "P0",
    "frequency": 26,
    "severity": "High",
    "journeyImpact": "Live Tracking (Curbside Waiting)",
    "evidenceStrength": "Medium [OBSERVED] (26 review assignments reporting frozen vehicle map pins and stale telemetry updates)",
    "ratingImpact": "High [INFERRED]",
    "effort": "Medium [Qualitative effort estimate; requires engineering validation]",
    "whyThisPriority": "Primary driver of curbside anxiety. When vehicle coordinates freeze, commuters cannot determine vehicle arrival, risking missed pickups.",
    "whyNow": "Core real-time transit value proposition. Loss of live visibility directly breaks commuter trust during time-critical morning and evening transitions.",
    "whyLater": null,
    "missingEvidence": null,
    "sampleReviewId": "0c3f59e9-b593-4e34-bcae-214ad60c1d68"
  },
  {
    "id": "cluster_app_performance",
    "issue": "App Freezing & In-Ride Performance Degradation",
    "priority": "P0",
    "frequency": 27,
    "severity": "High",
    "journeyImpact": "Trip / Ride & Active Navigation (In-Transit & Pre-Trip)",
    "evidenceStrength": "Medium [OBSERVED] (27 review assignments reporting screen unresponsiveness, lag, and sluggish app interaction)",
    "ratingImpact": "High [INFERRED]",
    "effort": "Medium [Qualitative effort estimate; requires engineering validation]",
    "whyThisPriority": "Second largest actionable functional complaint volume (27 primary reviews). Severely impairs app usability during live tracking and schedule management.",
    "whyNow": "Persistent UI lag and freezing prevent commuters from completing fast actions (viewing cab details, verifying pickup status) during time-pressured commute windows.",
    "whyLater": null,
    "missingEvidence": null,
    "sampleReviewId": "ec21d492-2ba6-455b-bf7d-944a1ae9df69"
  },
  {
    "id": "cluster_post_update_crash",
    "issue": "Post-Update App Launch Crash Loop",
    "priority": "P0",
    "frequency": 14,
    "severity": "High",
    "journeyImpact": "Pre-Commute Launch (Immediate Service Lockout)",
    "evidenceStrength": "Medium [OBSERVED] (14 review assignments explicitly reporting app failing to open after an update, requiring repeated uninstall/reinstall cycles)",
    "ratingImpact": "High [INFERRED]",
    "effort": "Medium [Qualitative effort estimate; requires engineering validation]",
    "whyThisPriority": "Complete service lockout. Commuters unable to open the app on commute morning cannot access cab details, driver contact, or OTP.",
    "whyNow": "Immediate operational blocker. Commuters facing launch failures cannot use transport services, driving acute frustration and uninstallations.",
    "whyLater": null,
    "missingEvidence": null,
    "sampleReviewId": "60798e45-939e-4a99-8f5b-17383a891db6"
  },
  {
    "id": "cluster_safety_prompt_friction",
    "issue": "Safety Concerns & Compliance Popup Friction",
    "priority": "P0",
    "frequency": 6,
    "severity": "Critical",
    "journeyImpact": "Safety, Emergency & Curbside Boarding",
    "evidenceStrength": "High [OBSERVED] (6 review assignments: 3 cite compliance popup/OTP friction, 3 cite acute safety/emergency concerns)",
    "ratingImpact": "High [INFERRED]",
    "effort": "Low / Medium [Qualitative effort estimate; requires engineering validation]",
    "whyThisPriority": "Highest severity in dataset (Critical). Combines passenger safety duty of care with boarding verification friction.",
    "whyNow": "Passenger physical safety perception and regulatory compliance must be audited immediately; intrusive popup blocking OTP can be rapidly refactored.",
    "whyLater": null,
    "missingEvidence": null,
    "sampleReviewId": "3d87f169-2508-4a07-9e5a-d63b2c548ed3"
  },
  {
    "id": "cluster_ui_redesign",
    "issue": "Unfavorable UI Redesign & Mandatory Rating Friction",
    "priority": "P1",
    "frequency": 21,
    "severity": "Medium",
    "journeyImpact": "Post-Ride Feedback & General Navigation",
    "evidenceStrength": "High [OBSERVED] (21 review assignments; at least one reviewer explicitly stated the forced rating prompt motivated their 1-star Play Store review)",
    "ratingImpact": "High [INFERRED - Potential low-effort rating-impact opportunity]",
    "effort": "Low [Qualitative effort estimate; requires engineering validation]",
    "whyThisPriority": "Highest-leverage Quick Win candidate. Unskippable rating prompt creates avoidable friction, while UI clutter degrades daily usability.",
    "whyNow": "Removing mandatory rating modal block is an immediate low-effort candidate to eliminate an observed catalyst for negative Play Store ratings.",
    "whyLater": null,
    "missingEvidence": null,
    "sampleReviewId": "f9fce9fe-8115-4a30-8d09-d8bdac76837d"
  },
  {
    "id": "cluster_otp_session_friction",
    "issue": "OTP Delivery Latency, Verification & Session Friction",
    "priority": "P1",
    "frequency": 20,
    "severity": "High",
    "journeyImpact": "Pickup & Boarding Verification",
    "evidenceStrength": "Medium [OBSERVED] (20 review assignments reporting unexpected session logouts and delayed OTP delivery at curbside)",
    "ratingImpact": "High [INFERRED]",
    "effort": "Low / Medium [Qualitative effort estimate; requires engineering validation]",
    "whyThisPriority": "High operational friction at boarding gates. Session logouts while waiting in cab queues delay vehicle departures.",
    "whyNow": "Directly impacts on-time fleet dispatch and commuter boarding throughput; solvable via standard background token refresh patterns.",
    "whyLater": null,
    "missingEvidence": null,
    "sampleReviewId": "3ad0aa79-d576-4348-8df0-7d72c1143892"
  },
  {
    "id": "cluster_pickup_route_assignment",
    "issue": "Incorrect Pickup/Drop Assignment & Circuitous Routing",
    "priority": "P1",
    "frequency": 16,
    "severity": "High",
    "journeyImpact": "Pickup & Mid-Commute Transit",
    "evidenceStrength": "High [OBSERVED] (16 review assignments providing detailed accounts of extreme detours, multi-zone passenger grouping, and delayed drop-offs)",
    "ratingImpact": "High [INFERRED]",
    "effort": "High [Qualitative effort estimate; requires engineering validation]",
    "whyThisPriority": "Causes physical fatigue and prolonged transit times (\"Bharat Darshan\"), degrading enterprise employee satisfaction.",
    "whyNow": "Critical for passenger trust and employee well-being; requires routing solver constraint tuning.",
    "whyLater": null,
    "missingEvidence": null,
    "sampleReviewId": "b780df2b-1a98-4c6e-bdf0-4b684cb3229b"
  },
  {
    "id": "cluster_eta_inaccuracies",
    "issue": "Inaccurate or Delayed ETA Estimation",
    "priority": "P1",
    "frequency": 10,
    "severity": "High",
    "journeyImpact": "Pre-Trip Departure Pacing & In-Transit Planning",
    "evidenceStrength": "Medium [OBSERVED] (10 review assignments citing fluctuating ETAs; at least one reviewer reported an approximately 3x discrepancy versus Google Maps)",
    "ratingImpact": "Medium [INFERRED]",
    "effort": "Medium / High [Qualitative effort estimate; requires engineering validation]",
    "whyThisPriority": "Distorts commuter arrival expectations, leading to rushed boarding or prolonged curbside exposure.",
    "whyNow": "Directly complements live GPS tracking fixes to establish predictable transit pacing.",
    "whyLater": null,
    "missingEvidence": null,
    "sampleReviewId": "7476b129-f0da-458e-8f86-d77ba2f9a710"
  },
  {
    "id": "cluster_driver_vehicle",
    "issue": "Driver Behavioral Issues & Vehicle Maintenance Deficiencies",
    "priority": "P1",
    "frequency": 24,
    "severity": "Medium",
    "journeyImpact": "Trip / Ride (In-Cabin Experience)",
    "evidenceStrength": "Medium [OBSERVED] (24 review assignments citing non-functional AC, vehicle cleanliness, speeding, or driver conduct)",
    "ratingImpact": "Medium [INFERRED]",
    "effort": "Medium / High (Operational Vendor Fleet Governance) [Qualitative effort estimate; requires operational validation]",
    "whyThisPriority": "Substantial volume (24 reviews). Daily in-cabin comfort and driver professionalism strongly affect commute quality.",
    "whyNow": "Requires ongoing vendor fleet partner audit and vehicle compliance checks, executed alongside software enhancements.",
    "whyLater": null,
    "missingEvidence": null,
    "sampleReviewId": "57b28271-9252-4c28-912b-31952a220fc5"
  },
  {
    "id": "cluster_support_responsiveness",
    "issue": "Customer Support & Transport Helpdesk Responsiveness",
    "priority": "P2",
    "frequency": 8,
    "severity": "Medium",
    "journeyImpact": "Post-Trip & Exception Resolution",
    "evidenceStrength": "Medium [OBSERVED] (8 review assignments citing unhelpful responses or disconnected calls from transport helpdesk)",
    "ratingImpact": "Low / Medium [INFERRED]",
    "effort": "Medium [Qualitative effort estimate; requires operational validation]",
    "whyThisPriority": "Secondary operational friction (8 reviews). Exception handling is important but secondary to preventing transit failures.",
    "whyNow": null,
    "whyLater": "Remediating upstream booking, tracking, and crash blockers will inherently prevent transit exceptions, naturally reducing support ticket volume before helpdesk overhaul.",
    "missingEvidence": "Enterprise helpdesk call disposition logs and first-contact resolution metrics.",
    "sampleReviewId": "3c401314-8fef-4857-8979-33b2a2656d05"
  },
  {
    "id": "cluster_notifications",
    "issue": "Trip Push Notification Delivery Delays & False Alerts",
    "priority": "P2",
    "frequency": 4,
    "severity": "Medium",
    "journeyImpact": "Vehicle Assignment & Approach Alert",
    "evidenceStrength": "Medium [OBSERVED] (4 review assignments citing delayed or inaccurate notifications)",
    "ratingImpact": "Low / Medium [INFERRED]",
    "effort": "Low / Medium [Qualitative effort estimate; requires engineering validation]",
    "whyThisPriority": "Narrow complaint volume (4 reviews). Contributes to timely boarding but represents localized failure.",
    "whyNow": null,
    "whyLater": "Can be addressed in conjunction with auth token refresh and push gateway delivery optimization during later sprints.",
    "missingEvidence": "FCM push delivery latency distributions and client notification receipt logs.",
    "sampleReviewId": "bb8bc95d-2aca-4ea1-8ec2-a6f74f5de33f"
  },
  {
    "id": "cluster_low_info_functional",
    "issue": "Low-Information Functional Complaints",
    "priority": "P3",
    "frequency": 17,
    "severity": "Medium",
    "journeyImpact": "Various Unspecified Stages",
    "evidenceStrength": "Low [OBSERVED] (17 review assignments noting brief symptoms: \"app not opening\", \"login issue\" without diagnostic context)",
    "ratingImpact": "Medium [INFERRED]",
    "effort": "Unknown [Qualitative effort estimate; requires technical diagnosis]",
    "whyThisPriority": "Diagnostic evidence gap: indicates genuine functional frustration but lacks sufficient technical detail for engineering action.",
    "whyNow": null,
    "whyLater": null,
    "missingEvidence": "Lacks device model, Android OS version, network conditions, and Crashlytics stack trace correlation.",
    "sampleReviewId": "a0ca92c8-e8ae-448b-81e6-5e4102107c94"
  },
  {
    "id": "cluster_truly_vague_dissatisfaction",
    "issue": "Truly Vague Dissatisfaction (Pure Sentiment)",
    "priority": "P3",
    "frequency": 76,
    "severity": "Medium",
    "journeyImpact": "General Non-Specific Sentiment",
    "evidenceStrength": "Low / Unknown [OBSERVED] (76 review assignments containing purely emotional sentiment: \"worst app\", \"bekar\", \"pathetic\")",
    "ratingImpact": "Unknown",
    "effort": "Unknown",
    "whyThisPriority": "Diagnostic evidence gap: pure emotional dissatisfaction devoid of functional, feature, or workflow references.",
    "whyNow": null,
    "whyLater": null,
    "missingEvidence": "Lacks any factual symptom or technical clue; cannot be engineered directly and must be monitored via general CSAT pulse surveys.",
    "sampleReviewId": "40363b38-fa55-4571-af0f-ff6fb0463015"
  }
];

export const rootCauseCards = [
  {
    "id": "gps",
    "title": "Delayed or Frozen Live GPS Tracking",
    "clusterId": "cluster_delayed_gps_tracking",
    "frequency": 26,
    "severity": "High",
    "priority": "P0",
    "observed": "Commuters report vehicle map pins freeze in place and location updates lag substantially while waiting curbside.",
    "hypothesis": "Location telemetry latency degrades across driver background location capture, broker ingestion queues, or client WebSocket reconnection drops.",
    "validationRequired": "Deploy 6-hop end-to-end timestamp tracing: Driver GPS → Ingestion → Broker → Dispatch → Client Receipt → UI Render.",
    "proposedAction": "Instrument end-to-end latency pipeline; display \"Updated X seconds ago\" timestamp; render explicit stale state when telemetry age > 20s."
  },
  {
    "id": "booking",
    "title": "Roster & Booking Management Failures",
    "clusterId": "cluster_booking_failure",
    "frequency": 30,
    "severity": "High",
    "priority": "P0",
    "observed": "Commuters report unexpected booking failures, unconfirmed rosters, and silent drops during peak shift cutoff windows.",
    "hypothesis": "Booking microservice concurrency lock contention, DB connection pool saturation, or mismatch with allocated vendor fleet capacity.",
    "validationRequired": "APM transaction tracing and DB connection pool saturation monitoring during the final 15 minutes of shift cutoff windows.",
    "proposedAction": "Deploy client-side idempotent booking submissions; establish explicit client state machine (REQUESTED, ALLOCATING, CONFIRMED, WAITLISTED)."
  },
  {
    "id": "crash",
    "title": "Post-Update App Launch Crash Loop",
    "clusterId": "cluster_post_update_crash",
    "frequency": 14,
    "severity": "High",
    "priority": "P0",
    "observed": "Commuters report the app fails to open after updating, crashing immediately and forcing repeated uninstall/reinstall cycles.",
    "hypothesis": "SQLite / Room local database schema migration regression, native runtime exception, or OEM splash screen lifecycle bug.",
    "validationRequired": "Pull Google Play Console Android Vitals and Crashlytics cold-start stack traces segmented by release build and device OEM.",
    "proposedAction": "Build automated upgrade-path migration test suite; implement defensive startup safe mode; deploy targeted hotfix release."
  },
  {
    "id": "freezing",
    "title": "App Freezing & In-Ride Performance Lag",
    "clusterId": "cluster_app_performance",
    "frequency": 27,
    "severity": "High",
    "priority": "P0",
    "observed": "Commuters report severe UI lag, unresponsiveness, and screen freezing during active ride tracking and schedule views.",
    "hypothesis": "Main UI thread blocking caused by synchronous coordinate parsing, unoptimized map polyline draw cycles, or memory GC pauses.",
    "validationRequired": "Profile client main UI thread, CPU usage, and frame drop rates during active live location streaming on mid-tier test hardware.",
    "proposedAction": "Decouple location coordinate parsing and caching from the main UI thread to background worker threads; optimize map draw calls."
  },
  {
    "id": "safety",
    "title": "Safety Concerns & Boarding Modal Friction",
    "clusterId": "cluster_safety_prompt_friction",
    "frequency": 6,
    "severity": "Critical",
    "priority": "P0",
    "observed": "3 reviews cite acute physical safety concerns; 3 reviews cite intrusive seatbelt popups intercepting \"View OTP\" clicks at cab boarding.",
    "hypothesis": "Blocking compliance modal placed synchronously across the time-sensitive OTP display path; lack of visible 24/7 Command Center reassurance.",
    "validationRequired": "Review enterprise client compliance requirements regarding mandatory affirmative seatbelt consent; audit SOS response times.",
    "proposedAction": "Refactor blocking seatbelt popup into a prominent non-blocking inline banner for 1-click OTP view; display Command Center monitoring badge."
  },
  {
    "id": "rating",
    "title": "Unfavorable UI Redesign & Forced Rating Friction",
    "clusterId": "cluster_ui_redesign",
    "frequency": 21,
    "severity": "Medium",
    "priority": "P1",
    "observed": "Commuters report confusing navigation and an unskippable post-trip rating modal that motivated at least one 1-star Play Store review.",
    "hypothesis": "In-app post-trip feedback modal was designed as a blocking modal without a \"Dismiss\" or \"Skip\" button to maximize driver ratings.",
    "validationRequired": "Run 50/50 A/B test comparing unskippable modal vs dismissible modal with visible Skip button; measure completion vs abandonment.",
    "proposedAction": "Quick Win: Add a visible \"Skip\" / \"Dismiss\" button to the post-trip rating prompt; allow swipe-down dismiss without gating features."
  },
  {
    "id": "auth",
    "title": "OTP Delivery Latency & Session Logout Loops",
    "clusterId": "cluster_otp_session_friction",
    "frequency": 20,
    "severity": "High",
    "priority": "P1",
    "observed": "Commuters report unexpected session logouts on app resume and curbside delays receiving boarding OTPs while waiting in cab queues.",
    "hypothesis": "Aggressive client session timeout on background/resume; telecom SMS dispatch latency; lack of offline local caching for active boarding OTPs.",
    "validationRequired": "Audit OAuth / JWT token TTL and refresh token rotation logic; measure client token refresh failure rates.",
    "proposedAction": "Implement silent background token refresh in onResume; cache active ride boarding OTP in encrypted local storage for offline basement access."
  },
  {
    "id": "routing",
    "title": "Circuitous Multi-Passenger Routing Detours",
    "clusterId": "cluster_pickup_route_assignment",
    "frequency": 16,
    "severity": "High",
    "priority": "P1",
    "observed": "Commuters report extreme multi-zone detours (\"Bharat Darshan\") and illogical pickup sequences doubling transit duration.",
    "hypothesis": "Fleet routing solver objective function heavily prioritizes vehicle occupancy over individual passenger detour ratio caps.",
    "validationRequired": "Simulate hard detour ratio constraints on historical trip route datasets; assess impact on total fleet vehicle requirements.",
    "proposedAction": "Enforce hard maximum detour ratio constraints in routing solver; display pickup stop sequence to commuter."
  },
  {
    "id": "eta",
    "title": "Inaccurate or Delayed ETA Estimation",
    "clusterId": "cluster_eta_inaccuracies",
    "frequency": 10,
    "severity": "High",
    "priority": "P1",
    "observed": "Commuters report fluctuating and inaccurate arrival ETAs; at least one reviewer reported an approximately 3x discrepancy versus Google Maps.",
    "hypothesis": "Infrequently updated dynamic road traffic speed feeds and uncalibrated multi-passenger boarding dwell time buffers.",
    "validationRequired": "Deploy 4-stage ETA telemetry capture pipeline: Predicted ETA → Actual arrival timestamp → Route conditions → Reference comparison.",
    "proposedAction": "Calibrate empirical boarding dwell buffers (2-3 min per stop); update ETAs dynamically with congestion notifications."
  },
  {
    "id": "driver",
    "title": "Driver Conduct & Fleet Vehicle Quality Deficiencies",
    "clusterId": "cluster_driver_vehicle",
    "frequency": 24,
    "severity": "Medium",
    "priority": "P1",
    "observed": "Commuters cite non-working AC, poor vehicle hygiene, reckless driving/speeding, or rude driver conduct.",
    "hypothesis": "Insufficient automated tracking for vendor vehicle maintenance and disconnect between passenger ratings and vendor re-inspection.",
    "validationRequired": "Audit vendor partner contract penalty clauses and fleet inspection cadence; analyze rating tag distribution.",
    "proposedAction": "Deploy structured in-app feedback tags (AC, Cleanliness, Driving) for ratings < 4 stars; automate vendor re-inspection alerts for repeat defects."
  }
];

export const quickWinDetails = {
  "title": "Make In-App Post-Trip Rating Prompt Dismissible",
  "badge": "POTENTIAL QUICK WIN",
  "clusterId": "cluster_ui_redesign",
  "frequency": 21,
  "severity": "Medium",
  "priority": "P1",
  "observedProblem": "Review evidence documents that commuters encounter an unskippable post-ride rating modal that intercepts app usage.",
  "evidenceQuote": "forcing me to give rating after every ride, so I came here to give you 1 star. because if I don't rate, I can't use the app as there is no skip option.",
  "reviewerId": "f9fce9fe-8115-4a30-8d09-d8bdac76837d",
  "opportunityNature": "Potential low-effort rating-impact opportunity. It is NOT a proven population-level cause of 1-star ratings, but removing coercion is a zero-risk win.",
  "qualitativeEffort": "Low (UI modal layout update to add Skip button)",
  "experiment": {
    "control": "Current unskippable post-ride rating modal requiring user input before navigating.",
    "treatment": "Rating modal with a clear \"Skip\" button in the header/footer and swipe-to-dismiss behavior.",
    "metrics": [
      "Rating prompt completion rate",
      "Dismissal / skip rate",
      "App task abandonment rate",
      "Subsequent Play Store 1-star review inflow rate"
    ]
  }
};

export const roadmapPhases = [
  {
    "phase": "Phase 1: Days 1–30",
    "theme": "Instrumentation, Emergency Fixes & Quick Wins",
    "objective": "Establish baseline observability across P0 failure points, deploy zero-risk UX Quick Wins to halt negative review velocity, and isolate emergency launch crash bugs.",
    "milestones": [
      {
        "title": "Post-Update Crash Audit (P0)",
        "desc": "Extract Android Vitals startup stack traces; prepare hotfix if Room/SQLite migration bug confirmed."
      },
      {
        "title": "Deploy Skip on Rating Modal (P1 Quick Win)",
        "desc": "Add Skip button to post-ride rating modal to remove coercive feedback friction."
      },
      {
        "title": "Refactor Boarding Safety Prompt (P0)",
        "desc": "Convert blocking seatbelt modal into non-blocking inline banner for 1-click OTP view."
      },
      {
        "title": "Instrument End-to-End GPS Freshness (P0)",
        "desc": "Deploy 6-hop timestamp logging across Driver GPS → Backend → Client UI."
      },
      {
        "title": "Instrument Booking APM Tracing (P0)",
        "desc": "Deploy transaction tracing during peak 15-minute shift cutoff windows."
      }
    ]
  },
  {
    "phase": "Phase 2: Days 31–60",
    "theme": "Core Reliability Remediation & UX Enhancements",
    "objective": "Remediate confirmed technical bottlenecks in Booking Reliability and Live GPS Tracking, eliminate client UI thread lag, and harden authentication lifecycle.",
    "milestones": [
      {
        "title": "Booking Reliability Hardening (P0)",
        "desc": "Deploy client-side idempotent booking requests and explicit state machine (ALLOCATING, CONFIRMED, WAITLISTED)."
      },
      {
        "title": "Live GPS Pipeline Remediation (P0)",
        "desc": "Remediate largest confirmed latency bottleneck; deploy freshness timestamp (\"Updated 4s ago\") and stale state handling."
      },
      {
        "title": "UI Thread Profiling & Freezing Mitigation (P0)",
        "desc": "Decouple coordinate parsing and caching from the main UI thread to background workers."
      },
      {
        "title": "Silent Token Refresh & Offline OTP (P1)",
        "desc": "Implement background token rotation in onResume; cache active ride OTP in encrypted local storage."
      },
      {
        "title": "Routing Solver Detour Simulation (P1)",
        "desc": "Run historical route datasets through updated solver models enforcing maximum detour ratio caps."
      }
    ]
  },
  {
    "phase": "Phase 3: Days 61–90",
    "theme": "Algorithmic Scaling, Governance & Rating Review",
    "objective": "Deploy tuned routing solver constraints and dynamic ETAs, establish operational fleet quality feedback loops, address secondary enhancements, and evaluate Play Store sentiment recovery.",
    "milestones": [
      {
        "title": "Deploy Routing Detour Limits & Dynamic ETA (P1)",
        "desc": "Roll out tuned solver constraints and 4-stage empirical ETA calibration pipeline."
      },
      {
        "title": "Vendor Fleet Quality Dashboard (P1)",
        "desc": "Deploy structured feedback tags (AC, Cleanliness, Driving) and automated vendor re-inspection alerts."
      },
      {
        "title": "Secondary Enhancements (P2)",
        "desc": "Launch in-app delay reporting and configure Android PRIORITY_HIGH push notification channels."
      },
      {
        "title": "Comprehensive Rating Trend Evaluation",
        "desc": "Review 90-day Play Store rating distribution and complaint keyword volume shifts."
      }
    ]
  }
];

export const engineeringInvestigations = [
  {
    "id": "inv_crash",
    "problem": "Post-Update App Launch Crash Loop [OBSERVED]",
    "evidence": "14 primary review assignments explicitly citing startup launch failures requiring reinstallation.",
    "unknown": "Actual startup crash mechanism: native crash, unhandled runtime exception, or SQLite / Room schema migration regression.",
    "telemetry": "Google Play Console Android Vitals startup crash logs, Firebase Crashlytics release traces segmented by device OEM skins (MIUI, OneUI, ColorOS).",
    "decisionGate": "Prioritize immediate hotfix remediation if release-specific crash/ANR regression is confirmed via telemetry.",
    "acceptanceCriteria": "App launches without exception on upgrade from previous 3 versions; startup crash rate < 0.1% (Proposed target)."
  },
  {
    "id": "inv_gps",
    "problem": "Delayed or Frozen Live GPS Tracking [OBSERVED]",
    "evidence": "26 primary review assignments citing frozen vehicle pins and delayed tracking map updates.",
    "unknown": "Bottleneck location: driver device background location throttling vs network packet loss vs broker queue lag vs client map rendering lag.",
    "telemetry": "End-to-end timestamp tracing: Driver GPS capture → Ingestion → Broker dispatch → Client receipt → UI render timestamp.",
    "decisionGate": "Prioritize telemetry pipeline optimization if systematic freshness degradation is confirmed across driver fleets or carrier networks.",
    "acceptanceCriteria": "P95 end-to-end location age < 10s during active tracking (Proposed target); stale state rendered if > 20s."
  },
  {
    "id": "inv_booking",
    "problem": "Roster & Booking Management Failures at Peak Cutoffs [OBSERVED]",
    "evidence": "30 primary review assignments citing booking errors, unconfirmed trips, and dropped rosters.",
    "unknown": "Root failure cause: booking API concurrency lock contention vs DB connection pool exhaustion vs HRMS sync lag vs fleet capacity exhaustion.",
    "telemetry": "Booking microservice APM metrics, transaction P99 latency, DB connection pool saturation, and roster sync queue error logs during cutoff windows.",
    "decisionGate": "Prioritize horizontal scaling and optimistic concurrency if API/DB bottleneck confirmed; prioritize fleet capacity if seat exhaustion confirmed.",
    "acceptanceCriteria": "Booking transaction success rate > 99.8% (Proposed target); booking API P99 latency < 1.5s during peak cutoff."
  },
  {
    "id": "inv_routing",
    "problem": "Circuitous Multi-Passenger Routing Detours [OBSERVED]",
    "evidence": "16 primary review assignments describing extreme detour times and multi-zone passenger grouping (\"Bharat Darshan\").",
    "unknown": "Routing optimization solver objective function weights and maximum allowable detour ratio configurations.",
    "telemetry": "Historical trip route metrics: total in-transit passenger duration vs direct drive duration, detour ratio distribution across city clusters.",
    "decisionGate": "Recalibrate routing solver objective function and enforce maximum detour ratio constraints if systematic detour inflation is confirmed.",
    "acceptanceCriteria": "Solver enforces maximum detour ratio constraints; 95% of trips comply with detour thresholds (Proposed target)."
  },
  {
    "id": "inv_eta",
    "problem": "Discrepancies in ETA Estimation [OBSERVED]",
    "evidence": "10 primary review assignments citing changing ETAs and abstract estimates; at least one reviewer reported ~3x divergence vs Google Maps.",
    "unknown": "Root discrepancy factor: static vs dynamic traffic congestion feed ingestion, driver boarding dwell time miscalculation, or multi-stop routing delay propagation.",
    "telemetry": "Predicted ETA → Actual arrival timestamp → Route conditions → Comparison against an appropriate reference baseline across trip stages.",
    "decisionGate": "Prioritize dynamic congestion feed calibration and dwell time buffering if systematic predictive drift is confirmed against actual arrivals.",
    "acceptanceCriteria": "P90 ETA prediction error within ± 5 minutes of actual pickup arrival (Proposed target)."
  }
];

export const sampleEvidenceReviews = [];

# 06. Product & Engineering Recommendations Summary

## Overview
This section outlines the consolidated recommendations from the 9 formal Product Requirement Documents (PRDs). Recommendations are structured across **P0 (Immediate)**, **P1 (Next)**, and **P2 (Later)** tiers, with explicit acceptance criteria, instrumentation, and dependencies.

---

### P0 — Immediate Core Journey Recommendations

#### 1. Roster & Booking Reliability Workstream (PRD 01)
- **Problem:** 30 primary reviews reporting failed bookings, dropped rosters, and peak cutoff timeouts [OBSERVED].
- **Evidence:** Review IDs: `43d90b3c-0443-4073-8647-6aee98c78bd4`, `bc736dc0-8fd1-45e8-b39e-b16020a4e2f7`.
- **Proposed Action:** Deploy client-side idempotent booking submissions; establish explicit client state machine (`REQUESTED`, `ALLOCATING`, `CONFIRMED`, `WAITLISTED`); instrument APM transaction tracing during cutoff windows; provide transparent waitlist positioning.
- **Why It Matters:** Foundational prerequisite of MoveInSync. Booking failure prevents workplace attendance, driving immediate rage reviews.
- **Validation Metric:** Booking transaction success rate > 99.8%, booking API P99 latency < 1.5s (Proposed targets; subject to engineering baseline/SLA validation).
- **Dependency / Unknown:** Backend database lock contention and enterprise HRMS synchronization schedules.

#### 2. Live GPS Tracking Freshness & Visibility Pipeline (PRD 02)
- **Problem:** 26 primary reviews reporting frozen vehicle map pins and stale location tracking [OBSERVED].
- **Evidence:** Review IDs: `2ce14584-824f-4d19-a7ce-95a17656fc8f`, `61a4a85f-902d-4e2c-beff-9ff5850a16b7`.
- **Proposed Action:** Instrument a 6-hop end-to-end location latency pipeline (Driver GPS → Ingestion → Broker → Dispatch → Client Receipt → UI Render); render "Updated X seconds ago" timestamp; transition to explicit stale-location UI if coordinate age exceeds threshold.
- **Why It Matters:** Primary driver of curbside anxiety. Eliminates "blind waiting" and frantic calls to drivers.
- **Validation Metric:** P95 location freshness < 10 seconds during active tracking (Proposed target; subject to validation).
- **Dependency / Unknown:** Driver partner device background location throttling and cell network latency.

#### 3. App Stability Release Gate & ANR Prevention (PRD 03)
- **Problem:** 14 primary reviews citing post-update launch crash loops; 27 primary reviews citing in-ride freezing and lag [OBSERVED].
- **Evidence:** Review IDs: `60798e45-939e-4a99-8f5b-17383a891db6` (Crash), `e735e280-9992-470e-b8df-d9b4a0e1e214` (Freezing).
- **Proposed Action:** Pull Android Vitals startup stack traces; build automated upgrade-path migration test suite; decouple coordinate parsing and caching from the main UI thread to background workers; enforce strict release crash gate.
- **Why It Matters:** Complete service lockout (crashes) and severe interaction lag destroy commuter trust and force uninstallation.
- **Validation Metric:** Crash-free user rate > 99.5%, startup crash rate < 0.1%, ANR rate < 0.2% (Proposed targets; subject to validation).
- **Dependency / Unknown:** Exact crash stack traces in Crashlytics; OEM Android skin compatibility.

#### 4. Safety Experience & Boarding Compliance Refactor (PRD 04)
- **Problem:** 3 reviews citing physical safety concerns; 3 reviews citing intrusive seatbelt popups intercepting OTP retrieval [OBSERVED].
- **Evidence:** Review IDs: `3d87f169-2508-4a07-9e5a-d63b2c548ed3` (Popup), `387a67a5-1843-45ee-b837-91d7eb1fccce` (Safety).
- **Proposed Action:** Refactor blocking seatbelt popup into a prominent non-blocking inline banner for 1-click OTP view; display "Monitored by MoveInSync Command Center" badge; ensure 2-tap emergency SOS escalation with direct calling fallback.
- **Why It Matters:** Preserves legal duty of care while removing daily boarding friction for rushed commuters.
- **Validation Metric:** Time-to-OTP display reduction; SOS dispatch acknowledgment < 30s (Proposed targets; subject to validation).
- **Dependency / Unknown:** Enterprise corporate compliance mandates regarding mandatory affirmative consent.

---

### P1 — Next-Wave Recommendations

#### 5. Post-Trip Rating Flow & UI Simplification (PRD 07 - Quick Win)
- **Problem:** 21 reviews reporting confusing UI and an unskippable post-trip rating modal that motivated at least one 1-star Play Store review [OBSERVED].
- **Proposed Action:** Add a clear "Skip" / "Dismiss" button to post-trip rating modals; allow swipe-down dismissal; streamline home screen card layout.
- **Validation Metric:** Zero task abandonment at rating prompt; reduction in retaliatory Play Store 1-star reviews citing forced ratings.

#### 6. Authentication Lifecycle & Boarding OTP Resilience (PRD 05)
- **Problem:** 20 reviews reporting curbside session logouts and delayed OTP access [OBSERVED].
- **Proposed Action:** Implement silent background token refresh on app resume; cache active ride OTPs in encrypted local storage for offline basement access.
- **Validation Metric:** Curbside session logout rate on resume < 0.5% (Proposed target; subject to validation).

#### 7. Routing Solver Detour Constraints & ETA Calibration (PRD 06)
- **Problem:** 16 reviews reporting circuitous detours ("Bharat Darshan"); 10 reviews reporting fluctuating ETAs [OBSERVED].
- **Proposed Action:** Enforce hard maximum detour ratio constraints in routing solver; deploy 4-stage empirical ETA telemetry pipeline; incorporate dynamic boarding dwell buffers per stop.
- **Validation Metric:** Detour ratio compliance > 95%; P90 ETA accuracy within ± 5 min of actual arrival (Proposed targets; subject to validation).

#### 8. Driver Conduct & Fleet Vehicle Quality Governance (PRD 08)
- **Problem:** 24 reviews citing broken AC, dirty cabs, speeding, or rude driver conduct [OBSERVED].
- **Proposed Action:** Deploy structured in-app feedback tags ("AC Not Working", "Cleanliness", "Rash Driving") for ratings < 4 stars; automate vendor re-inspection alerts for repeat defects.
- **Validation Metric:** Reduction in AC/comfort complaints; vendor defect resolution time < 48 hours (Proposed targets).

---

### P2 — Later Operational Recommendations

#### 9. Customer Support & Push Notifications (PRD 09)
- **Problem:** 8 reviews citing unreachable helpdesk lines; 4 reviews citing delayed approach alerts [OBSERVED].
- **Proposed Action:** Deploy one-tap in-app self-service exception reporting ("Report Delay"); configure Android `PRIORITY_HIGH` heads-up channels for vehicle approach alerts.
- **Validation Metric:** Push delivery latency P95 < 5s; shift of exception volume to in-app self-service (Proposed targets).

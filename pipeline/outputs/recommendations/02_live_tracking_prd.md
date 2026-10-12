# PRD 02 — Live GPS Tracking Freshness & Visibility Pipeline

## Problem
Commuters report delayed, frozen, or inaccurate live vehicle GPS tracking during curbside pickup waiting [OBSERVED]. Vehicle map pins freeze in place, updates lag by substantial intervals, and commuters cannot determine if their cab has arrived.

## Evidence
- **Primary Cluster:** `cluster_delayed_gps_tracking` (Delayed or frozen live GPS tracking)
- **Review Frequency:** 26 verified primary reviews (8.7% of negative reviews)
- **Defect Severity:** High
- **Relevant Journey Stage:** Live Tracking (Curbside Waiting & Boarding)
- **Representative Review IDs:**
  - `2ce14584-824f-4d19-a7ce-95a17656fc8f`
  - `61a4a85f-902d-4e2c-beff-9ff5850a16b7`
  - `66e6cdc7-e911-4b93-82c7-01d7f9420284`
- **Evidence Confidence:** Medium [OBSERVED symptoms of stale map coordinates and frozen pins]

## User Impact
Commuters experience intense curbside anxiety, standing on the street in uncertain weather conditions without knowing cab distance, risking missed pickups and delayed work arrivals [OBSERVED].

## Business / Rating Impact
- **Potential Rating Impact:** High. Live tracking is the primary active-use feature of the commuter app. Failure directly prompts negative reviews while commuters wait curbside [INFERRED].
- **Expected Outcome:** Likely to reduce curbside panic and 1-star reviews citing "blind waiting"; should be validated via telemetry and sentiment tracking [PROPOSED ACTION].

## Root-Cause Hypotheses
- **Hypothesis 1 (Client / Telemetry Transport):** Telemetry delivery pipeline latency or WebSocket connection drops between backend message broker and commuter client app [INFERRED / Requires Engineering Validation].
  - *Confidence:* Medium
  - *Evidence:* Reports of pins freezing and updating only upon app restart.
  - *Unknown:* Real-time socket drop rates, reconnection retry intervals, and client render frame latency.
- **Hypothesis 2 (Driver Device / Operating System):** Driver partner smartphone OS battery optimization or background location throttling restricting GPS broadcast frequency [INFERRED / Requires Engineering Validation].
  - *Confidence:* Medium
  - *Evidence:* Stale coordinates reported across specific vendor fleets.
  - *Unknown:* Driver app foreground service persistence and GPS sampling intervals.
- **Hypothesis 3 (Backend Ingestion):** Queue congestion or delayed stream processing in the location ingestion pipeline during peak morning/evening commute hours [INFERRED / Requires Engineering Validation].
  - *Confidence:* Medium
  - *Evidence:* Tracking delays concentrated during city-wide peak rush hours.
  - *Unknown:* Message broker queue lag and consumer processing latency.

## Recommendation
Build an **End-to-End Location Freshness Pipeline** combining rigorous telemetry instrumentation with transparent UI state management:
1. **Instrument End-to-End Latency Pipeline:** Trace timestamps across all 6 hops:
   `Driver GPS capture` → `Backend ingestion` → `Stream processing` → `Transport dispatch` → `Client receipt` → `UI map render`.
2. **Transparent Freshness Timestamp in UI:** Display "Updated X seconds ago" beneath the vehicle map pin.
3. **Explicit Stale Location State:** If location telemetry is older than a defined freshness threshold, grey out the pin and display "Reconnecting to vehicle GPS..." rather than displaying stale coordinates as live.
4. **Fast Auto-Reconnection & Polling Fallback:** If WebSocket / persistent stream drops, automatically fallback to short-interval HTTP polling while reconnecting silently.
5. **Clear Offline / Inactive Driver Communication:** If the driver device loses cell connectivity, explicitly inform the commuter ("Driver device temporarily out of network coverage") rather than showing a frozen pin.

## Acceptance Criteria
- **Scenario 1: Live Tracking Active Freshness**
  - *Given* a commuter is viewing the active ride tracking screen,
  - *When* vehicle GPS coordinate updates are received,
  - *Then* the vehicle marker smoothly interpolates to the new position,
  - *And* the UI displays a freshness indicator (e.g., "Live • Updated 4s ago").
- **Scenario 2: Stale Coordinate Handling**
  - *Given* no GPS coordinate update has been received for longer than the freshness threshold (e.g., proposed target 20s, subject to validation),
  - *When* the commuter views the tracking map,
  - *Then* the vehicle pin transitions to a visually distinct "stale" state,
  - *And* an informative banner states: "Vehicle signal delayed — refreshing location...",
  - *And* the app never displays a 2-minute-old coordinate as "Live".
- **Scenario 3: Stream Interruption Recovery**
  - *Given* the client WebSocket connection drops due to mobile cell tower handoff,
  - *When* network connectivity returns,
  - *Then* the client automatically resumes tracking within 3 seconds without requiring app restart or manual pull-to-refresh.

## Instrumentation
- Capture location freshness differential:
  `Freshness Age = Client UI Render Timestamp - Driver GPS Capture Timestamp`.
- Track P50, P90, P95, and P99 location age across all active rides.
- Log WebSocket connection uptime, disconnect reason codes, and reconnection latency.
- Log driver app location broadcast interval distribution.

## Experiment
- **A/B Freshness Indicator Test:**
  - *Control:* Current tracking screen (vehicle pin without explicit freshness timestamp).
  - *Treatment:* Tracking screen with freshness timestamp and stale state handling.
  - *Metrics:* Curbside call-to-driver rate, tracking screen refresh gestures, and customer sentiment.

## Rollout Strategy
1. **Internal Instrumentation Phase:** Deploy end-to-end timestamp tracing across driver and backend apps to identify primary bottleneck.
2. **Limited Client Beta (Example: 10% users):** Roll out UI freshness indicator and fallback polling.
3. **Performance Monitoring:** Verify client battery consumption and socket stability.
4. **Phased Expansion (Example: 25% → 50% → 100%):** Broad release once telemetry confirms P95 freshness within proposed targets.

## Success Metrics
- **P95 Location Freshness:** Proposed validation target < 10 seconds during active tracking (subject to engineering baseline and SLA review).
- **Socket Disconnect Recovery Time:** Proposed validation target < 3 seconds (subject to review).
- **Driver Calling Frequency:** Reduction in anxious curbside calls to drivers asking "Where are you?".

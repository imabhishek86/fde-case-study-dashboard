# PRD 01 — Roster & Booking Reliability Workstream

## Problem
Commuters experience booking transaction failures, unconfirmed rosters, and booking errors during shift scheduling and peak cutoff hours [OBSERVED]. Commuters report that even after attempting to schedule trips, the app indicates the trip is not booked or fails silently.

## Evidence
- **Primary Cluster:** `cluster_booking_failure` (Roster and booking management failure)
- **Review Frequency:** 30 verified primary reviews (10.0% of negative reviews)
- **Defect Severity:** High
- **Relevant Journey Stage:** Shift/Roster Scheduling & Pre-Trip Booking
- **Representative Review IDs:**
  - `43d90b3c-0443-4073-8647-6aee98c78bd4`
  - `bc736dc0-8fd1-45e8-b39e-b16020a4e2f7`
  - `823b9c8b-afde-47e7-abad-fb60f14ea562`
- **Evidence Confidence:** Medium [OBSERVED symptoms of booking errors and unconfirmed rosters]

## User Impact
Commuters risk missing daily office transit, causing acute anxiety regarding workplace attendance and forcing expensive, last-minute alternative transport arrangements [OBSERVED].

## Business / Rating Impact
- **Potential Rating Impact:** High. Booking is the foundational gate of MoveInSync. When booking fails, commuters cannot use the service at all, making 1-star retaliatory reviews highly probable [INFERRED].
- **Expected Outcome:** Likely to reduce negative experiences during weekly roster cutoff periods; should be validated via Play Store review sentiment tracking [PROPOSED ACTION].

## Root-Cause Hypotheses
- **Hypothesis 1 (Technical):** Possible concurrency bottlenecks or database connection pool exhaustion in the roster booking API during peak shift cutoff windows [INFERRED / Requires Engineering Validation].
  - *Confidence:* Medium
  - *Evidence:* Repeated reports of failure during cutoff times.
  - *Unknown:* Actual backend API transaction throughput, thread pool saturation, and DB lock contention.
- **Hypothesis 2 (Operational / Fleet):** Possible mismatch between employee booking requests and allocated enterprise fleet capacity, leading to silent drops [INFERRED / Requires Operational Validation].
  - *Confidence:* Medium
  - *Evidence:* Reports of trips remaining unconfirmed or placed on indefinite waitlists.
  - *Unknown:* Real-time seat allocation logic and corporate admin roster quotas.
- **Hypothesis 3 (Integration):** Roster synchronization latency between client, MoveInSync backend, and enterprise HRMS pipelines [INFERRED / Requires Engineering Validation].
  - *Confidence:* Medium
  - *Evidence:* Commuters reporting discrepancy between scheduled shift and displayed booking.
  - *Unknown:* HRMS webhook synchronization reliability and queue lag.

## Recommendation
Establish a dedicated **Booking Reliability Workstream** focusing on transactional transparency, state synchronization, and peak-window resilience:
1. **Deterministic Booking State Machine:** Introduce explicit client states (`REQUESTED`, `ALLOCATING`, `CONFIRMED`, `WAITLISTED`, `FAILED`).
2. **Explicit Success/Failure Feedback:** Replace silent spinners or delayed push alerts with immediate synchronous modal / snackbar confirmation of booking state.
3. **Idempotent Booking Requests:** Implement client-side idempotency keys for all booking submissions to prevent duplicate attempts and race conditions.
4. **Transparent Waitlist & Capacity Visibility:** If capacity is exhausted, clearly display waitlist queue position and estimated confirmation window rather than generic error messages.
5. **Roster Synchronization Status:** Provide a "Last Synced with Enterprise HRMS" indicator on the schedule tab.

## Acceptance Criteria
- **Scenario 1: Successful Booking Confirmation**
  - *Given* a commuter selects an available shift roster slot,
  - *When* they tap "Confirm Booking",
  - *Then* the client sends an idempotent booking payload and transitions the UI to `ALLOCATING` state with a visual progress indicator,
  - *And* upon backend confirmation within the proposed target window (< 1.5s, subject to engineering SLA validation), transitions to `CONFIRMED` with a visible booking reference ID and scheduled pickup window.
- **Scenario 2: Peak Cutoff Graceful Handling**
  - *Given* the booking service experiences high load or temporary timeouts during cutoff windows,
  - *When* a booking request fails or times out,
  - *Then* the UI displays a clear, actionable error state ("Booking processing delayed — we are confirming your seat; tap to check status") rather than a generic error,
  - *And* provides a safe retry mechanism without double-booking.
- **Scenario 3: Capacity Exhaustion Transparency**
  - *Given* corporate vehicle capacity is exhausted for a requested shift slot,
  - *When* the commuter attempts to schedule,
  - *Then* the app clearly informs them that seats are full and displays their waitlist position with corporate transport helpdesk contact options.

## Instrumentation
- Instrument end-to-end booking APM tracing:
  - Client booking click timestamp → API gateway receipt timestamp → DB transaction commit timestamp → Client confirmation render timestamp.
  - Booking API P95 and P99 latency segmented by hour-of-day.
  - Transaction success rate, error code distribution (`409 Conflict`, `504 Gateway Timeout`, `422 Unprocessable`).
  - Idempotency collision rate during peak 15-minute shift cutoff windows.

## Experiment
- **Phased Workstream Validation:**
  - *Baseline Phase (Week 1-2):* Log booking API errors and client retry rates without UI changes.
  - *Test Phase (Week 3-4):* Roll out idempotent booking submission and explicit state handling to an initial cohort.
  - *Comparison:* Measure transaction completion rate, customer support booking tickets, and negative review mentions.

## Rollout Strategy
1. **Internal Validation:** QA testing under simulated 5x peak cutoff network latency and concurrency load.
2. **Limited Rollout (Example: 10% enterprise cohort):** Deploy to select enterprise tenant with active shift schedules.
3. **Monitoring:** Track booking error rate and client retry spikes for 7 days.
4. **Broader Rollout (Example: 25% → 50% → 100%):** Progressive expansion across all corporate client instances.

## Success Metrics
- **Booking Transaction Success Rate:** Proposed validation target > 99.8% (subject to baseline and SLA review).
- **Booking API P99 Latency:** Proposed validation target < 1.5 seconds during peak cutoff (subject to engineering review).
- **Booking-Related Support Ticket Rate:** Target reduction in booking exception tickets (subject to baseline review).

# PRD 06 — Routing Solver Detour Constraints & ETA Calibration

## Problem
Commuters report severe routing detours and unpredictable ETA calculations [OBSERVED]:
1. **Circuitous Routing & Illogical Pickups:** Commuters report being routed through distant multi-zone clusters ("Bharat Darshan"), resulting in double or triple commute times (16 primary reviews) [OBSERVED].
2. **ETA Inaccuracies & Fluctuations:** Vehicle arrival ETAs fluctuate wildly or display unrealistic projections (10 primary reviews; at least one reviewer reported an approximately 3x discrepancy versus Google Maps) [OBSERVED].

*(Note: Google Maps is not automatically treated as ground truth; review evidence reflects perceived divergence requiring systematic telemetry validation).*

## Evidence
- **Primary Clusters:**
  - `cluster_pickup_route_assignment` (Circuitous routing & pickup errors): 16 primary reviews | Severity: High | Journey: Pickup & Mid-Commute Transit
  - `cluster_eta_inaccuracies` (Inaccurate or delayed ETA estimation): 10 primary reviews | Severity: High | Journey: Pre-Trip Pacing & In-Transit
- **Representative Review IDs:**
  - *Routing:* `85146e08-4f64-4ea2-9541-7a3d22af578e`, `864d85ff-1c4e-4967-a488-1b1225a406f7`
  - *ETA:* `7476b129-f0da-458e-8f86-d77ba2f9a710`, `145e34ef-5530-438b-bb8b-9dff2aed6e90`
- **Evidence Confidence:** High for routing detours [detailed commuter narratives]; Medium for ETA inaccuracies [qualitative reports of fluctuating estimates].

## User Impact
Commuters endure physical exhaustion from 2+ hour detours for trips that direct-drive in 40 minutes. Unpredictable ETAs cause commuters to either miss pickups due to sudden arrival or wait outside anxiously [OBSERVED].

## Business / Rating Impact
- **Potential Rating Impact:** High. Prolonged transit times and broken arrival promises cause commuters to abandon enterprise transport or leave scathing reviews [INFERRED].
- **Expected Outcome:** Tighter detour constraints and calibrated ETAs restore commuter trust in route efficiency and scheduling [PROPOSED ACTION].

## Root-Cause Hypotheses
- **Hypothesis 1 (Routing Solver Configuration):** Fleet routing optimization solver objective function prioritizes vehicle fill-rate over maximum commuter detour limits, grouping geographically distant employees [INFERRED / Requires Algorithm Validation].
  - *Confidence:* Medium
  - *Evidence:* Detailed reviews citing illogical cross-city pickup sequences.
  - *Unknown:* Solver weighting parameters for vehicle occupancy vs maximum allowable detour ratio.
- **Hypothesis 2 (Traffic Modeling & ETA Drift):** Static or infrequently updated road speed assumption feeds used in ETA calculation, combined with uncalibrated boarding dwell time buffers at multi-passenger stops [INFERRED / Requires Engineering Validation].
  - *Confidence:* Medium
  - *Evidence:* Frequent complaint that displayed ETA does not reflect actual street traffic.
  - *Unknown:* Dynamic traffic feed ingestion frequency and passenger boarding stop dwell time models.

## Recommendation
Establish a joint **Routing Solver Optimization & ETA Calibration Workstream**:
1. **Enforce Maximum Detour Ratio Constraints:** Audit and tune the routing solver objective function to enforce strict hard constraints on commuter detour ratio (`Total In-Transit Duration / Direct Drive Duration`).
2. **Four-Stage ETA Telemetry Validation Pipeline:**
   - *Stage 1:* Capture Predicted ETA at initial ride assignment and dynamic 60-second intervals.
   - *Stage 2:* Record Actual Arrival Timestamp at pickup geo-fence.
   - *Stage 3:* Log concurrent route conditions and passenger boarding dwell times.
   - *Stage 4:* Benchmark predictive variance against an appropriate reference baseline across trip types.
3. **Calibrate Dynamic Boarding Dwell Buffers:** Incorporate historical empirical boarding dwell times (e.g., 2-3 minutes per pickup stop) into cumulative multi-stop route ETAs.
4. **Commuter Visibility into Route Stop Sequence:** Display the commuter's pickup stop position in the queue (e.g., "Stop 2 of 4") so commuters understand route progression.

## Acceptance Criteria
- **Scenario 1: Transparent Stop Progression**
  - *Given* a commuter is assigned to a shared multi-passenger cab,
  - *When* they view the active route screen,
  - *Then* the app clearly displays the pickup stop sequence ("You are Stop 2 of 3") and the estimated arrival at their specific stop.
- **Scenario 2: Dynamic ETA Recalibration**
  - *Given* a cab encounters heavy road congestion or dwell delay at a previous stop,
  - *When* the delay exceeds 3 minutes,
  - *Then* the downstream passenger ETA recalibrates dynamically with an informative status banner ("Slight delay at previous stop — updated ETA: 8:15 AM").

## Instrumentation
- Telemetry logging: `Predicted ETA` vs `Actual Arrival Timestamp` delta distribution (P50, P90, P95).
- Route Detour Ratio distribution across all corporate routes (`Trip Duration / Direct Drive Duration`).
- Stop dwell time distribution across pickup clusters.

## Experiment
- **Solver Detour Cap Pilot:**
  - *Pilot Route Cohort:* Apply strict detour ratio limit (e.g., proposed target cap, subject to fleet capacity review) to a select enterprise route network.
  - *Metrics:* Average commuter transit duration, routing complaint tickets, fleet vehicle utilization efficiency.

## Rollout Strategy
1. **Offline Simulation:** Re-run historical trip data through updated solver constraints to evaluate impact on vehicle fleet requirements.
2. **Limited Pilot:** Deploy to a single corporate tech park cluster.
3. **Progressive Tuning:** Expand across enterprise routes as operational fleet capacity permits.

## Success Metrics
- **P90 ETA Predictive Accuracy:** Proposed validation target within ± 5 minutes of actual arrival (subject to engineering baseline and SLA review).
- **Detour Ratio Compliance:** Proposed validation target > 95% of trips within acceptable detour limits (subject to review).

# PRD 08 — Driver Conduct & Fleet Vehicle Quality Governance

## Problem
Commuters report negative in-cabin transit experiences, citing non-functional air conditioning, poor vehicle hygiene, reckless driving/speeding, and unprofessional or rude driver conduct (24 primary reviews) [OBSERVED].

## Evidence
- **Primary Cluster:** `cluster_driver_vehicle` (Driver behavioral issues and vehicle maintenance deficiencies)
- **Review Frequency:** 24 verified primary reviews (8.0% of negative reviews)
- **Defect Severity:** Medium
- **Relevant Journey Stage:** Trip / Ride (In-Cabin Experience)
- **Representative Review IDs:**
  - `98db1b19-26e2-4e6d-937b-7319944a6fc0`
  - `88fa8703-20ab-4e8f-ab4d-07f59f254952`
  - `785327ff-5759-41b8-ba5f-c6eabed81c01`
- **Evidence Confidence:** Medium [OBSERVED user complaints regarding AC, hygiene, and driver conduct]

## User Impact
Commuters endure uncomfortable or stressful rides in hot vehicles with broken AC or reckless driving, creating physical discomfort and negative sentiment towards MoveInSync and employer transport [OBSERVED].

## Business / Rating Impact
- **Potential Rating Impact:** Medium. In-cabin ride experience strongly influences overall commuter satisfaction; repeated negative ride experiences culminate in Play Store complaints [INFERRED].
- **Expected Outcome:** Operational governance and targeted driver feedback loops improve fleet quality and commuter comfort [PROPOSED ACTION].

## Root-Cause Hypotheses
- **Hypothesis 1 (Vendor Fleet Partner Oversight):** Insufficient automated tracking and accountability for vendor fleet vehicle maintenance (AC function, cleanliness, tire safety) between routine audit intervals [INFERRED / Requires Operational Validation].
  - *Confidence:* Medium
  - *Evidence:* Recurring reviews citing non-working AC across multiple routes.
  - *Unknown:* Vendor partner contract penalty clauses and fleet audit inspection cadence.
- **Hypothesis 2 (Driver Behavioral Feedback Loops):** Commuter feedback regarding driver conduct is not tied to real-time driver partner coaching or fleet allocation disincentives [INFERRED / Requires Operational Validation].
  - *Confidence:* Medium
  - *Evidence:* Reports of speeding and uncooperative behavior.
  - *Unknown:* Telematics-based driver scorecards and speed monitoring data.

## Recommendation
Establish an **Operational Fleet Quality & Driver Governance Framework**:
1. **Structured In-App In-Cabin Feedback Categories:** When commuters rate a ride < 4 stars, offer specific, one-tap tags: "AC Not Working", "Vehicle Cleanliness", "Rash Driving", "Punctuality", "Driver Conduct".
2. **Vendor Partner Quality Dashboard:** Provide enterprise transport managers and vendor fleet partners with real-time dashboards tracking vehicle defect tags and driver behavioral trends.
3. **Automated Defect Escalation & Fleet Re-Inspection Triggers:** If a vehicle receives repeated "AC Not Working" tags across consecutive trips, automatically flag the vehicle for mandatory physical inspection before re-dispatch.
4. **Telematics Speed & Harsh Driving Monitoring:** Leverage driver app accelerometer and GPS telematics to track harsh braking and speeding incidents, integrating them into vendor partner scorecards.

## Acceptance Criteria
- **Scenario 1: Actionable Ride Feedback Capture**
  - *Given* a commuter submits a 1-star or 2-star ride rating,
  - *When* the feedback screen displays,
  - *Then* the app offers non-intrusive categorical tags ("AC Not Working", "Cleanliness", "Rash Driving"),
  - *And* allows optional free-text comments without blocking exit.
- **Scenario 2: Vehicle Defect Alert Generation**
  - *Given* a specific vehicle receives 3 consecutive "AC Not Working" reports within 48 hours,
  - *When* the third report is logged,
  - *Then* the vendor management system automatically generates an inspection ticket for the fleet vendor.

## Instrumentation
- Distribution of ride rating feedback tags across vendor fleets.
- Vehicle repeat-complaint rate (% of vehicles with > 2 complaints in a 30-day window).
- Telematics driver safety scores (speeding events per 100 km).

## Experiment
- **Feedback Categorization Rollout:**
  - Deploy structured feedback tags across a pilot vendor fleet.
  - Measure actionability of vendor maintenance interventions compared to unstructured feedback.

## Rollout Strategy
1. **Product Update:** Deploy structured feedback tags in commuter app.
2. **Operational Dashboard Deployment:** Provide vendor partner operations teams with real-time exception views.
3. **Monthly Vendor Reviews:** Incorporate customer satisfaction metrics into ongoing vendor partner reviews.

## Success Metrics
- **In-Cabin Comfort Complaint Rate:** Reduction in AC and cleanliness complaint frequency (subject to baseline review).
- **Vendor Defect Resolution Time:** Proposed target < 48 hours to resolve flagged vehicle maintenance defects (subject to operational review).

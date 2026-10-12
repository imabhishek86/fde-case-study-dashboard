# PRD 04 — Safety Experience & Boarding Compliance Optimization

## Problem
Review analysis reveals two distinct, critical safety-related facets that must be addressed separately:
1. **Perceived Safety & Emergency Responsiveness:** Commuters voice acute concerns regarding physical transit security and emergency protocol readiness (3 primary reviews) [OBSERVED].
2. **Compliance Verification & OTP Friction:** Intrusive compliance modals (specifically mandatory seatbelt safety popups intercepting "View OTP" clicks) create severe boarding gate friction during rapid cab boarding (3 primary reviews) [OBSERVED].

*(Note: These two facets must remain distinct; compliance UI friction must not be conflated with physical emergency responsiveness).*

## Evidence
- **Primary Cluster:** `cluster_safety_prompt_friction` (Safety concerns and compliance prompt friction)
- **Review Frequency:** 6 verified primary reviews (2.0% of negative reviews)
- **Defect Severity:** Critical (Highest severity in dataset)
- **Relevant Journey Stage:** Safety, Emergency Protocols & Curbside Boarding
- **Representative Review IDs:**
  - *Sub-facet A (Safety / Emergency Concerns):* `387a67a5-1843-45ee-b837-91d7eb1fccce` ("threat"), `ab22d06f-a3be-49e3-a460-5ef157ec534c` ("unsafe"), `3c7dbf56-0d12-466a-a4de-d4c5452106b1` ("danger")
  - *Sub-facet B (Compliance Popup Friction):* `3d87f169-2508-4a07-9e5a-d63b2c548ed3` ("when you click view otp , it pops up the seat belt safely first... very annoying"), `e12ed49a-d376-4cf2-9cfd-45cae0162feb` ("seat buckle verification is absolutely horrendous"), `b1814d48-3e54-4903-a109-e09e05bc3145` ("Too much pop up notification, which won't close easily")
- **Evidence Confidence:** High [OBSERVED direct testimony regarding modal blocking OTP and physical safety worries]

## User Impact
- **Physical Safety Impact:** Enterprise employees, especially late-night shift workers, experience severe distress when they feel unsupported or perceive emergency protocols as unreliable [OBSERVED].
- **Boarding Friction Impact:** Rushed commuters standing in line to board office cabs are blocked by modal popups when trying to display their boarding OTP to drivers [OBSERVED].

## Business / Rating Impact
- **Potential Rating Impact:** Critical severity. While review volume is modest (6 reviews), safety incidents and boarding blockers pose severe legal duty-of-care risks and high rating volatility [INFERRED].
- **Expected Outcome:** Clear emergency assurance improves commuter confidence; removing boarding modal friction eliminates daily irritation without compromising safety compliance [PROPOSED ACTION].

## Root-Cause Hypotheses
- **Hypothesis 1 (UX Architecture - Sub-facet B):** Placement of a modal compliance prompt directly across the synchronous OTP retrieval path adds an unnecessary blocking modal step [OBSERVED user friction / Product UX].
  - *Confidence:* High
  - *Evidence:* Review explicitly cites having to dismiss seatbelt modal before viewing OTP.
  - *Unknown:* Enterprise corporate safety compliance policy mandates regarding mandatory affirmative consent.
- **Hypothesis 2 (Operations / Protocol - Sub-facet A):** Commuter lack of visibility into 24/7 Central Command Center monitoring and emergency SOS escalation feedback [INFERRED / Requires Operational Validation].
  - *Confidence:* Medium
  - *Evidence:* High-anxiety sentiment keywords ("threat", "unsafe", "danger").
  - *Unknown:* SOS response latency, dispatch protocols, and false-alarm handling.

## Recommendation
Implement a balanced **Safety Duty-of-Care & Boarding Optimization** initiative:
1. **Non-Blocking Inline Seatbelt Safety Advisory:** Refactor the blocking modal seatbelt popup into a prominent, non-blocking inline safety banner on the boarding screen. Commuters can view their OTP in a single tap while safety compliance messaging remains clearly visible.
2. **Transparent SOS & Emergency Command Visibility:** Add visible indicators on the active ride screen showing "Trip Monitored by MoveInSync Safety Command Center".
3. **Emergency SOS Fast-Track & Reassurance Flow:** Ensure the in-ride SOS button provides immediate 2-tap confirmation with immediate live status feedback ("Alert Dispatched to Enterprise Security Desk") and direct calling fallback.
4. **Safety Policy Alignment Review:** Coordinate with corporate enterprise client safety teams to ensure inline advisories satisfy regulatory compliance.

## Acceptance Criteria
- **Scenario 1: Single-Click OTP Display with Inline Safety Advisory**
  - *Given* a commuter is boarding an assigned vehicle,
  - *When* they tap "View OTP",
  - *Then* the OTP is immediately revealed on the primary card in one click,
  - *And* a non-blocking seatbelt safety advisory is prominently displayed inline,
  - *And* no modal dialog intercepts the user or requires an extra click to dismiss.
- **Scenario 2: Emergency SOS Trigger & Feedback**
  - *Given* a commuter activates the SOS button during a ride,
  - *When* the alert is triggered,
  - *Then* the app immediately establishes telemetry confirmation with the backend command center,
  - *And* displays real-time confirmation of alert dispatch with direct phone dialer fallback.

## Instrumentation
- Boarding card dwell time (seconds between opening ride screen and displaying OTP to driver).
- Seatbelt safety banner impression rate and engagement.
- SOS trigger telemetry: Trigger timestamp → Command center receipt timestamp → Escalation dispatch timestamp.

## Experiment
- **Boarding Flow A/B Test:**
  - *Variant A:* Existing modal seatbelt popup on OTP click.
  - *Variant B:* Inline persistent seatbelt advisory banner with instant OTP display.
  - *Metrics:* Boarding dwell time, OTP retrieval task completion time, commuter satisfaction ratings.

## Rollout Strategy
1. **Safety Compliance Review:** Validate non-blocking UI with enterprise HR/Transport compliance officers.
2. **Internal Dogfooding:** Test boarding flow across corporate employee shuttle routes.
3. **Phased Rollout (Example: 20% → 50% → 100%):** Progressive rollout across enterprise accounts.

## Success Metrics
- **Time-to-OTP Display:** Target reduction in boarding OTP retrieval time (subject to baseline review).
- **Boarding Modal Dismissal Drop-off:** Elimination of modal dismiss frustration complaints.
- **Safety Incident Escalation Latency:** Proposed validation target < 30 seconds for SOS alert acknowledgment (subject to SLA review).

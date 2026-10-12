# PRD 07 — Post-Trip Rating Flow & UI Simplification

## Problem
Commuters report frustration with an unfavorable UI redesign and specifically highlight coercive post-ride in-app rating modals that intercept app usage without a skip option [OBSERVED]. At least one reviewer explicitly stated that being forced to rate motivated them to leave a 1-star review on the Google Play Store.

## Evidence
- **Primary Cluster:** `cluster_ui_redesign` (Unfavorable UI redesign and workflow complexity)
- **Review Frequency:** 21 verified primary reviews (7.0% of negative reviews)
- **Defect Severity:** Medium
- **Relevant Journey Stage:** Post-Ride Feedback & General App Navigation
- **Representative Review IDs:**
  - `f9fce9fe-8115-4a30-8d09-d8bdac76837d`
  - `6b0ec80a-f39e-4548-85a7-cefd18c99c83`
  - `5f781610-319a-4412-b308-95a6ec8ee6f6`
- **Evidence Confidence:** High [OBSERVED explicit testimony linking forced in-app rating modal to 1-star Play Store review]

## User Impact
Commuters completing a ride are blocked by an unskippable rating modal when trying to use other app features (e.g., checking tomorrow's roster or booking a return cab), creating resentment and driving retaliatory negative reviews [OBSERVED].

## Business / Rating Impact
- **Potential Rating Impact:** High (Identified as the **Best Potential Quick Win**). While the modal is not proven to cause a measurable population percentage of 1-star reviews, removing forced rating friction is a zero-risk change that directly eliminates an observed catalyst for negative Play Store ratings [INFERRED / Qualitative Opportunity].
- **Expected Outcome:** Likely to reduce punitive reviews from irritated users who resent coercive feedback flows [PROPOSED ACTION].

## Root-Cause Hypotheses
- **Hypothesis 1 (Product / UX Design):** The in-app post-trip feedback modal was designed as a blocking modal without a "Dismiss" or "Skip" button to maximize internal driver rating compliance, unintentionally frustrating commuters [OBSERVED UX design pattern].
  - *Confidence:* High
  - *Evidence:* Review quotes: "forcing me to give rating after every ride, so I came here to give you 1 star. because if I don't rate, I can't use the app as there is no skip option."
  - *Unknown:* Internal enterprise client contractual requirements regarding mandatory driver feedback capture.
- **Hypothesis 2 (UI Clutter / Visual Complexity):** Recent redesign increased visual cognitive load, burying critical actions beneath secondary cards [INFERRED / Requires UX Validation].
  - *Confidence:* Medium
  - *Evidence:* Reviews noting the app feels cluttered and unintuitive compared to older versions.
  - *Unknown:* Click-through rates and task completion times across app tabs.

## Recommendation
Execute an immediate **Post-Trip Feedback Optimization (Quick Win)** and Navigation Streamlining initiative:
1. **Make Post-Ride Rating Modal Dismissible (Quick Win):**
   - Add a prominent, clear "Skip" / "Dismiss" button to the post-trip rating prompt.
   - Allow commuters to tap outside the modal or swipe down to dismiss.
   - If dismissed, do not re-prompt for the same ride; allow rating later via the trip history tab if desired.
2. **Do Not Suppress Genuine User Feedback:** Ensure satisfied users can still submit 5-star feedback seamlessly; never gate app features behind feedback completion.
3. **Core Commute Actions Elevation:** Streamline the home screen layout to prioritize the three core commuter tasks: (1) Today's Cab Status, (2) Booking / Roster, and (3) Active OTP.

## Acceptance Criteria
- **Scenario 1: Dismissible Rating Modal**
  - *Given* a commuter completes a ride and opens the app,
  - *When* the post-trip rating prompt appears,
  - *Then* a clearly visible "Skip" button is displayed in the upper corner and bottom action bar,
  - *And* tapping "Skip", swiping down, or tapping outside dismisses the modal immediately,
  - *And* the commuter can immediately access booking and scheduling without hindrance.
- **Scenario 2: Optional Rating via Trip History**
  - *Given* a commuter dismissed the initial rating prompt,
  - *When* they navigate to their Trip History within 24 hours,
  - *Then* an option to "Rate this ride" remains available without intruding on active flows.

## Instrumentation
- Event logging:
  - Rating prompt impression count.
  - Rating prompt completion rate vs dismissal rate.
  - Time elapsed from prompt display to dismissal.
  - Subsequent session retention and task completion rates.
  - Play Store 1-star review inflow rate following deployment.

## Experiment
- **A/B Feedback Prompt Experiment:**
  - *Variant A (Control):* Existing unskippable post-ride rating modal.
  - *Variant B (Treatment):* Dismissible post-ride rating modal with explicit "Skip" button.
  - *Sample Size & Duration:* Example 50/50 split across active commuters for 14 days.
  - *Primary Metrics:* Rating completion volume, app task abandonment rate, and Play Store review rating trend.

## Rollout Strategy
1. **Immediate Client Hotfix Release:** Fast-track the "Skip" button addition as a low-effort client update.
2. **Phased Rollout (Example: 25% → 50% → 100%):** Monitor rating submission volume and client crash rates.
3. **Enterprise Compliance Verification:** Confirm that driver rating data collection remains statistically sufficient for enterprise fleet partner quality metrics.

## Success Metrics
- **Rating Modal Dismissal Rate:** Measure commuter preference without coercive gating.
- **App Task Abandonment:** Reduction in sessions abandoned at the rating screen.
- **Play Store Retaliatory 1-Star Review Rate:** Elimination of reviews citing forced rating prompts.

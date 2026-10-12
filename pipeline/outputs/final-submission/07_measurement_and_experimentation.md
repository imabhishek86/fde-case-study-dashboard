# 07. Measurement Framework & Experimentation Plan

## Overview
A critical principle of evidence-disciplined engineering is establishing clear measurement frameworks before deploying code. We do **not** claim arbitrary mathematical rating increases (e.g., "ratings will rise from 3.77 to 4.5"). Instead, we define verifiable operational metrics across three distinct categories:
1. **Observed Baselines:** Empirical figures derived from the 1,000-review dataset.
2. **Future Measurements:** Instrumentation streams required during implementation.
3. **Proposed Targets:** Suggested benchmark thresholds subject to baseline and SLA validation.

---

## Metrics Framework Matrix

| Metric Category | Specific Metric | Metric Type | Current Status / Baseline | Proposed Target Threshold | Verification Methodology |
|:---|:---|:---:|:---:|:---:|:---|
| **Public Rating Signal** | Average Play Store Rating | Public Outcome | **3.77 / 5.00** [OBSERVED] | Upward rolling trajectory | 30-day rolling average on Play Store |
| **Public Sentiment** | 1-Star & 2-Star Review Share | Public Outcome | **29.1%** (291 reviews) [OBSERVED] | Proposed reduction < 15% | Weekly review intake monitoring |
| **Public Sentiment** | Specific Complaint Mentions | Public Outcome | 14 crash, 26 GPS, 30 booking [OBSERVED] | 80% reduction in complaint keywords | Keyword frequency tracking |
| **App Stability** | Crash-Free User Rate | Technical Health | Unknown [Requires Telemetry] | Proposed target: > 99.5% | Google Play Console Android Vitals |
| **App Stability** | Startup Crash Rate | Technical Health | Unknown [Requires Telemetry] | Proposed target: < 0.1% | Crashlytics cold-start traces (< 2s) |
| **App Stability** | Android Vitals ANR Rate | Technical Health | Unknown [Requires Telemetry] | Proposed target: < 0.2% | Android Vitals daily session ANR % |
| **Live Tracking** | P95 Location Freshness Age | Technical Health | Stale pins reported [OBSERVED] | Proposed target: < 10 seconds | Telemetry timestamp differential |
| **Live Tracking** | Telemetry Socket Disconnects | Technical Health | Socket drops reported [OBSERVED] | Proposed recovery: < 3 seconds | WebSocket reconnect event logs |
| **Booking Utility** | Booking API Success Rate | Core Product | Cutoff errors reported [OBSERVED] | Proposed target: > 99.8% | APM transaction tracking during cutoffs |
| **Booking Utility** | Booking API P99 Latency | Technical Health | Unknown [Requires Telemetry] | Proposed target: < 1.5 seconds | APM database query response times |
| **Boarding Gate** | Curbside Session Logout Rate | User Friction | Logouts reported [OBSERVED] | Proposed target: < 0.5% on resume | Client auth event logging |
| **Boarding Gate** | Offline Boarding OTP Availability| User Friction | OTP disappears reported [OBSERVED]| Proposed target: 100% confirmed rides| Encrypted local storage cache hits |
| **Routing & Detours** | P90 ETA Predictive Accuracy | Algorithmic Health| ~3x divergence reported [OBSERVED]| Proposed target: within ± 5 min | Predicted ETA vs Actual Arrival Delta |
| **Routing & Detours** | Detour Ratio Compliance | Algorithmic Health| Severe detours reported [OBSERVED]| Proposed target: > 95% trips compliant| Actual Transit Time / Direct Drive Time |
| **Operations** | In-Cabin Comfort Complaint Rate | Fleet Quality | 24 reviews (8%) [OBSERVED] | 50% reduction in AC/conduct tags | In-app feedback tag distribution |
| **Support** | Push Alert Delivery Latency | Technical Health | 4 reviews cite delays [OBSERVED] | Proposed target: P95 < 5 seconds | FCM gateway dispatch timestamps |

---

## Planned Experiments

### Experiment 1: Post-Trip Rating Flow A/B Test (PRD 07 - Quick Win)
- **Hypothesis:** Making the post-trip in-app rating prompt dismissible with an explicit "Skip" button will eliminate user coercion without reducing overall actionable driver feedback.
- **Design:**
  - *Variant A (Control):* Current unskippable rating modal requiring feedback before using other tabs.
  - *Variant B (Treatment):* Rating modal with a prominent "Skip" / "Dismiss" button and swipe-down dismiss.
- **Sample & Duration:** 50/50 randomized split across active commuter app sessions for 14 days.
- **Metrics to Track:**
  1. Rating completion rate (Volume of completed ratings).
  2. Modal dismissal rate (% of impressions skipped).
  3. App task abandonment rate (% of sessions abandoned at the rating screen).
  4. Subsequent Play Store 1-star review inflow rate citing forced ratings.
- **Decision Gate:** If Variant B maintains sufficient driver feedback volume while reducing app abandonment and retaliatory Play Store complaints, roll out to 100%.

### Experiment 2: Boarding Safety Advisory A/B Test (PRD 04)
- **Hypothesis:** Replacing the blocking modal seatbelt popup with a prominent, non-blocking inline banner will reduce boarding dwell time while maintaining compliance awareness.
- **Design:**
  - *Variant A (Control):* Tapping "View OTP" triggers a modal seatbelt safety popup requiring an affirmative dismiss click.
  - *Variant B (Treatment):* Tapping "View OTP" immediately reveals the OTP on the primary card with an inline persistent seatbelt advisory banner.
- **Metrics to Track:** Time-to-OTP display (seconds from opening app to showing OTP to driver), boarding gate dwell time, user satisfaction scores.

### Experiment 3: Live GPS Freshness Indicator A/B Test (PRD 02)
- **Hypothesis:** Displaying a clear freshness timestamp ("Updated 4s ago") and transparently communicating stale coordinates reduces curbside anxiety and unnecessary driver calls.
- **Design:**
  - *Variant A (Control):* Standard vehicle pin without explicit freshness age.
  - *Variant B (Treatment):* Vehicle pin with freshness timestamp and greyed-out "Refreshing signal..." state when telemetry age > 20s.
- **Metrics to Track:** Curbside driver calling frequency ("Where are you?"), tracking screen refresh gestures, commuter CSAT scores.

# 05. Root-Cause Analysis & Priority Stack

## The Diagnostic Transition Framework
Converting public complaints into engineering action requires a rigorous diagnostic progression:
```
Raw Public Reviews (1,000)
  └──> Negative Complaint Reviews (299)
        └──> Domain Theme Classification (11 Themes)
              └──> Problem Clustering (14 Audited Clusters)
                    └──> Root-Cause Hypotheses (Technical vs Operational)
                          └──> Multi-Dimensional Prioritization (P0 / P1 / P2 / P3)
                                └──> Actionable PRDs & Engineering Investigations
```

---

## Observed Problem vs Possible Internal Cause (Strict Delineation)

| Cluster ID & Problem | Primary Count | Observed User Symptom [OBSERVED] | Possible Internal Cause [HYPOTHESIS / UNKNOWN] |
|:---|:---:|:---|:---|
| **Roster & Booking Failure** | 30 | Commuters report inability to book rides, unexpected booking failures, or unconfirmed shift rosters during cutoff hours. | Concurrency bottlenecks or DB connection pool saturation during peak cutoff windows; or fleet capacity shortages. |
| **App Freezing & Lag** | 27 | Commuters report pervasive screen freezing, lag, and unresponsiveness during active app usage. | Main UI thread blocking from coordinate stream parsing, map draw calls, or garbage collection pauses on budget hardware. |
| **Delayed / Frozen Live GPS** | 26 | Commuters report frozen vehicle map pins and stale location tracking updates while waiting curbside. | Driver smartphone OS background location throttling; broker message queue ingestion lag; or client WebSocket drops. |
| **Driver & Vehicle Condition** | 24 | Commuters cite non-working AC, vehicle cleanliness deficiencies, reckless driving, or rude conduct. | Lack of automated vendor fleet maintenance tracking and disconnect between passenger ratings and vendor re-inspection. |
| **UI Redesign & Rating Prompt** | 21 | Commuters report confusing navigation and an unskippable post-trip rating modal that motivated at least one 1-star Play Store review. | Modal feedback screen designed without dismiss/skip action to maximize rating compliance, creating user resentment. |
| **OTP Delivery & Session Friction** | 20 | Commuters report unexpected session logouts on app resume and curbside delays receiving boarding OTPs. | Aggressive client session timeout / token expiry on app backgrounding; SMS gateway latency; lack of offline OTP cache. |
| **Circuitous Routing Detours** | 16 | Commuters report extreme multi-zone detours ("Bharat Darshan") and illogical pickup sequences doubling transit time. | Fleet routing solver objective function weighting vehicle occupancy over individual passenger detour ratio caps. |
| **Post-Update Crash Loop** | 14 | Commuters report the app fails to open after updating, requiring repeated uninstall/reinstall cycles. | SQLite / Room local DB schema migration exception; native runtime crash; or OEM splash screen lifecycle incompatibility. |
| **ETA Inaccuracies** | 10 | Commuters report fluctuating and inaccurate arrival ETAs; at least one reviewer noted ~3x divergence vs Google Maps. | Static road speed feeds in traffic engine; uncalibrated multi-passenger boarding dwell time buffers. |
| **Support Helpdesk** | 8 | Commuters report unreachable helpdesk phone numbers and slow resolution of transit queries. | Peak-hour call center telephony saturation; absence of structured in-app self-service exception reporting. |
| **Safety Concerns & Boarding** | 6 | Commuters cite acute safety concerns (3 reviews) and intrusive seatbelt popups intercepting OTP retrieval (3 reviews). | Blocking modal placed synchronously across OTP display; lack of visible 24/7 Command Center monitoring feedback. |
| **Push Notification Latency** | 4 | Commuters report vehicle assignment and approach notifications arrive late or after vehicle arrival. | FCM push gateway throttling; Android battery optimization sleeping background notification services. |
| **Low-Info Functional Complaints** | 17 | Brief reports ("app not opening", "login problem") lacking contextual details. | Unknown; requires client Crashlytics clustering and device segmentation. |
| **Truly Vague Dissatisfaction** | 76 | Pure emotional words ("worst app", "bekar", "pathetic") without functional details. | Unknown; non-actionable in code; requires general CSAT tracking. |

---

## Final Step 7 Priority Stack

### P0 — Immediate Core Journey & Access Blockers (Top Urgency)
1. **Roster & Booking Management Failure** (30 reviews | High Severity | High Qualitative Effort)
   - *Why Now:* Foundational product utility; booking failure strands employees before the commute even begins.
2. **Delayed or Frozen Live GPS Tracking** (26 reviews | High Severity | Medium Qualitative Effort)
   - *Why Now:* Primary driver of curbside anxiety; breaks core real-time transit promise.
3. **App Freezing & In-Ride Performance Degradation** (27 reviews | High Severity | Medium Qualitative Effort)
   - *Why Now:* Severe UI lag impairs time-critical actions during active ride monitoring.
4. **Post-Update App Launch Crash Loop** (14 reviews | High Severity | Medium Qualitative Effort)
   - *Why Now:* Complete service lockout; users cannot open the app after updating.
5. **Safety Concerns & Compliance Popup Friction** (6 reviews | Critical Severity | Low/Medium Qualitative Effort)
   - *Why Now:* Critical safety duty of care cannot be deferred; intrusive popup blocking OTP can be rapidly refactored.

### P1 — Major Operational & UX Enhancements (Next-Wave)
6. **Unfavorable UI Redesign & Mandatory Rating Friction** (21 reviews | Medium Severity | Low Qualitative Effort)
   - *Why Now:* Contains unskippable rating modal where at least one user explicitly cited it as cause for 1-star review; immediate quick win.
7. **OTP Delivery Latency & Session Friction** (20 reviews | High Severity | Low/Medium Qualitative Effort)
   - *Why Now:* Direct curbside boarding gate friction; solvable via background token refresh.
8. **Incorrect Pickup/Drop & Circuitous Routing** (16 reviews | High Severity | High Qualitative Effort)
   - *Why Now:* Causes severe physical fatigue from extreme detours ("Bharat Darshan").
9. **Inaccurate or Delayed ETA Estimation** (10 reviews | High Severity | Medium/High Qualitative Effort)
   - *Why Now:* Distorts arrival expectations and compounds curbside anxiety.
10. **Driver Behavioral Issues & Vehicle Maintenance** (24 reviews | Medium Severity | Medium/High Operational Effort)
    - *Why Now:* Substantial volume affecting daily in-cabin comfort (AC) and driver professionalism.

### P2 — Secondary Enhancements (Later Sprints)
11. **Customer Support & Helpdesk Responsiveness** (8 reviews | Medium Severity | Medium Qualitative Effort)
    - *Why Later:* Fixing booking and tracking failures will naturally reduce support ticket load.
12. **Trip Push Notification Delivery Delays** (4 reviews | Medium Severity | Low/Medium Qualitative Effort)
    - *Why Later:* Narrow complaint volume; can be bundled with push gateway updates in later sprints.

### P3 — Evidence & Monitoring (Insufficient Public Context)
13. **Low-Information Functional Complaints** (17 reviews | Telemetry Required)
14. **Truly Vague Dissatisfaction** (76 reviews | Pure Sentiment)

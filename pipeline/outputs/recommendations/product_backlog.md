# MoveInSync Product Backlog

## Overview
This backlog prioritizes all product initiatives derived from the Step 7 Quality-Refined review analysis. Every initiative is evidence-backed, mapped to commuter journey stages, and ranked by priority tier (**P0, P1, P2**). All numerical metrics are proposed targets subject to baseline validation.

---

## Prioritized Product Initiatives

| Priority | Initiative | Problem | User Value | Evidence | Qualitative Effort | Dependency | Success Metric |
|:---:|:---|:---|:---|:---:|:---:|:---|:---|
| **P0** | **Booking Reliability & State Transparency** | Failed bookings, silent drops, and unconfirmed rosters during peak cutoff | Commuters confidently secure daily workplace transport without booking anxiety | 30 primary reviews | High | Backend APM Instrumentation | Booking success rate > 99.8% (Proposed target) |
| **P0** | **Live GPS Tracking Freshness & Visibility** | Frozen map pins and stale coordinates leaving commuters waiting blindly | Restores curbside visibility and reduces anxiety while waiting for cabs | 26 primary reviews | Medium | End-to-end timestamp tracing | P95 location age < 10s (Proposed target) |
| **P0** | **App Startup Crash Auto-Recovery & Health Gate** | App fails to open after updates, forcing repeated uninstallation cycles | Commuters can reliably access commute details on morning commute | 14 primary reviews | Medium | Crashlytics / Vitals audit | Startup crash rate < 0.1% (Proposed target) |
| **P0** | **UI Responsiveness & ANR Mitigation** | Severe in-ride screen lag, freezing, and unresponsiveness during tracking | Smooth, fluid interactions during time-sensitive commute operations | 27 primary reviews | Medium | UI thread profiler audit | ANR rate < 0.2% (Proposed target) |
| **P0** | **Inline Seatbelt Compliance & SOS Visibility** | Modal popup intercepts OTP display; anxiety over emergency protocols | Single-click OTP access for rapid boarding while maintaining safety duty-of-care | 6 primary reviews (3 popup, 3 safety) | Low / Medium | Corporate safety policy review | Time-to-OTP display reduction; SOS response < 30s |
| **P1** | **Dismissible Post-Trip Rating Prompt (Quick Win)** | Unskippable in-app rating modal provokes 1-star Play Store reviews | Removes coercive feedback friction, respecting commuter time | 21 primary reviews | Low | Client UI update | Zero ratings blocked; reduction in retaliatory reviews |
| **P1** | **Silent Background Auth Token Refresh** | Unexpected session logouts forcing repeated curbside logins | Seamless app resume at curbside without boarding gate delays | 20 primary reviews | Low / Medium | OAuth token lifecycle audit | Curbside session logout rate < 0.5% (Proposed target) |
| **P1** | **Routing Solver Detour Constraints & Stop Sequence** | Circuitous detours ("Bharat Darshan") and illogical pickup sequences | Drastically cuts unnecessary transit duration and physical fatigue | 16 primary reviews | High | Routing algorithm offline simulation | Detour ratio compliance > 95% (Proposed target) |
| **P1** | **Dynamic ETA Calibration & Dwell Buffering** | Unpredictable, fluctuating ETAs misleading commuters | Reliable arrival timing for accurate curbside pacing | 10 primary reviews | Medium / High | ETA 4-stage validation pipeline | P90 ETA accuracy within ± 5 min (Proposed target) |
| **P1** | **In-Cabin Comfort & Driver Feedback Tags** | Non-working AC, vehicle cleanliness, and driver conduct issues | Consistent in-cabin comfort and dignified daily commute experience | 24 primary reviews | Medium / High (Operations) | Vendor fleet management portal | Reduction in AC / comfort complaints |
| **P2** | **One-Tap Self-Service Exception Reporting** | Difficulty reaching transport desk during delays or missed pickups | Fast, human-free issue escalation without phone call wait times | 8 primary reviews | Medium | Transport desk webhook API | Ticket deflection to self-service |
| **P2** | **High-Priority Push Notification Delivery** | Delayed vehicle assignment and approach alerts | Timely alerts on lock screen preventing missed rides | 4 primary reviews | Low / Medium | FCM high-priority channel update | P95 push latency < 5s (Proposed target) |

---

## Backlog Grooming Principles
1. **P0 Initiatives** must be actively staffed during the initial 30-day sprint.
2. **Quick Wins (Dismissible Rating Prompt & Inline Seatbelt Advisory)** should be deployed as early low-risk wins.
3. **P3 Categories** (Low-Information Functional Complaints: 17 reviews, Truly Vague Dissatisfaction: 76 reviews) are diagnostic telemetry streams and are excluded from implementation backlogs until specific technical stack traces or survey data emerge.

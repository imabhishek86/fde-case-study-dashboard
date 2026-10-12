# Executive Recommendation: Forward Deployed Engineer Action Plan

## Context: "If I Joined MoveInSync as an FDE, What Would I Do First?"

As a Forward Deployed Engineer (FDE) bridging enterprise client operations and core engineering, my immediate mandate is to **halt commuter rating erosion, eliminate operational commute blockers, and establish reliable telemetry**.

Rather than embarking on speculative architectural refactoring, I would execute a strictly prioritized, evidence-disciplined action sequence rooted in the 1,000 Play Store reviews audited in Steps 6 and 7.

---

## The Strategic Sequence

```
1. Stabilize App Access (P0 Launch Crashes)
      └──> 2. Eliminate Feedback Friction (P1 Quick Win: Dismissible Rating Modal)
            └──> 3. Secure Core Utility (P0 Booking Reliability Workstream)
                  └──> 4. Restore Curbside Trust (P0 Live GPS Freshness Pipeline)
                        └──> 5. Smooth Curbside Boarding (P0 Safety UI & P1 Token Refresh)
                              └──> 6. Establish Continuous Rating & Telemetry Loops
```

---

### Step 1: Stabilize Access to the Application (Day 1 - 7)
- **Why First:** When commuters cannot open the app after an update (14 primary reviews), 100% of app functionality is blocked. An employee stranded at 7:00 AM unable to see their cab details will immediately leave a 1-star review and unseat enterprise confidence.
- **Action:** Pull Google Play Console Android Vitals and Crashlytics cold-start stack traces across recent builds. Isolate whether a SQLite / Room database migration exception or splash screen lifecycle bug is responsible. Deploy an immediate defensive hotfix release.

### Step 2: Remove Coercive Feedback Friction (Day 3 - 10, Quick Win)
- **Why Second:** Public review evidence contains explicit testimony linking the unskippable in-app rating modal to retaliatory 1-star Play Store reviews (*"forcing me to give rating... so I came here to give you 1 star... no skip option"*).
- **Action:** Push a low-effort client UI update introducing a clear "Skip" / "Dismiss" button on the post-trip rating prompt. This is a zero-risk change that immediately removes an observed catalyst for negative ratings without suppressing genuine user sentiment.

### Step 3: Hardening Booking & Roster Reliability (Day 7 - 30)
- **Why Third:** Roster & booking management failure is the single largest functional complaint volume in the dataset (30 primary reviews). If commuters cannot book transit, all downstream ride and tracking features are rendered irrelevant.
- **Action:** Instrument APM transaction tracing during the final 15 minutes of shift cutoffs. Deploy client-side idempotency keys to eliminate duplicate submission collisions, and implement explicit client states (`ALLOCATING`, `CONFIRMED`, `WAITLISTED`) so commuters are never left guessing whether their ride is secured.

### Step 4: Make Live Vehicle Tracking Trustworthy (Day 15 - 45)
- **Why Fourth:** Live tracking failure (26 primary reviews) is the primary driver of curbside anxiety. When vehicle pins freeze, commuters wait in uncertainty, leading to missed pickups and acute stress.
- **Action:** Instrument the end-to-end telemetry pipeline across all 6 hops (Driver GPS → Ingestion → Broker → Dispatch → Client Receipt → UI Render). Identify the largest latency bottleneck before prescribing technology changes. Introduce an in-app freshness indicator ("Updated 4s ago") and handle stale coordinates transparently rather than displaying frozen pins as "Live".

### Step 5: Eliminate Curbside Boarding Gate Friction (Day 20 - 50)
- **Why Fifth:** Boarding gate delays create immediate operational ripple effects across corporate shift arrivals.
- **Action:**
  1. *Safety Compliance UI:* Refactor the blocking seatbelt popup into a prominent non-blocking inline banner, restoring one-click OTP visibility (PRD 04).
  2. *Authentication Resilience:* Implement silent background token refresh in `onResume` and cache active ride boarding OTPs in encrypted local storage, ensuring offline access in basement pickup zones (PRD 05).

### Step 6: Operational Governance & Continuous Telemetry (Day 45 - 90)
- **Why Sixth:** Long-term commuter sentiment depends on transit duration (circuitous detours) and in-cabin ride comfort (AC functioning, driver conduct).
- **Action:** Tune routing solver detour ratio constraints, establish automated vendor fleet maintenance escalation dashboards for repeat vehicle defects, and continuously monitor Play Store review sentiment shifts.

---

## Executive Summary of First Move

> **My recommended first move is a dual-pronged tactical sprint: execute an immediate hotfix investigation on post-update launch crash loops (P0, 14 reviews) via Android Vitals, while simultaneously deploying a dismissible post-ride rating prompt (Quick Win / P1, 21 reviews).**
>
> This simultaneous action attacks the most severe technical blocker preventing commuters from accessing transport, while instantly eliminating an avoidable, observed driver of punitive 1-star Play Store reviews.

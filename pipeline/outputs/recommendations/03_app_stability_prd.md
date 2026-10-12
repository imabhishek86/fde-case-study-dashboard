# PRD 03 — App Stability Release Gate & ANR Prevention

## Problem
Commuters report severe application stability failures, divided strictly into two distinct technical problems:
1. **Post-Update App Launch Crash Loops:** App immediately crashes upon startup after updating, requiring repeated uninstall/reinstall cycles (14 primary reviews) [OBSERVED].
2. **App Freezing & In-Ride Performance Degradation:** Severe screen freezing, unresponsiveness, and frame lag during active ride usage (27 primary reviews) [OBSERVED].

*(Note: These two failure modes are maintained as distinct clusters and must not be combined into a single 41-review frequency).*

## Evidence
- **Primary Clusters:**
  - `cluster_post_update_crash` (Post-update app launch crash loop): 14 primary reviews | Severity: High | Journey: Pre-commute Launch Lockout
  - `cluster_app_performance` (App freezing and performance degradation): 27 primary reviews | Severity: High | Journey: Active Ride / In-Transit Interaction
- **Representative Review IDs:**
  - *Crash Loop:* `60798e45-939e-4a99-8f5b-17383a891db6`, `133d2b88-b2d2-4fd4-9594-1ac26caf819e`
  - *Freezing/Lag:* `e735e280-9992-470e-b8df-d9b4a0e1e214`, `9936bf10-67dd-4e3e-aeb3-2bc420fb487a`
- **Evidence Confidence:** Medium [OBSERVED symptoms of crash loops on upgrade and UI thread freezing]

## User Impact
- **Crash Loop Impact:** Complete service lockout. Commuters cannot open the app at all on morning commute, rendering transport details inaccessible and driving extreme rage [OBSERVED].
- **Freezing Impact:** High friction during time-sensitive tasks (retrieving cab number, viewing pickup route), leading to missed cabs and stress [OBSERVED].

## Business / Rating Impact
- **Potential Rating Impact:** Highest operational urgency. App launch crashes and persistent freezing directly motivate 1-star Play Store reviews and drive app uninstallation [INFERRED].
- **Expected Outcome:** Stabilizing startup and UI performance eliminates acute blockers that generate negative reviews; requires validation via Crashlytics and Play Store rating velocity [PROPOSED ACTION].

## Root-Cause Hypotheses
- **Hypothesis 1 (Crash Loop - Technical):** Native runtime crash or SQLite / Room local database schema migration exception during app upgrade from older versions [INFERRED / Requires Engineering Validation].
  - *Confidence:* Medium
  - *Evidence:* Reviews explicitly cite "whenever i update this app, i am not able to open... need to uninstall and reinstall".
  - *Unknown:* Exact stack trace, affected app versions, and Room migration scripts.
- **Hypothesis 2 (Crash Loop - OEM Android):** Startup initialization failure related to OEM battery optimizations or splash screen lifecycle on custom skins (MIUI, OneUI, ColorOS) [INFERRED / Requires Engineering Validation].
  - *Confidence:* Medium
  - *Evidence:* Widespread diversity of Indian enterprise commuter smartphone models.
  - *Unknown:* Crash distribution segmented by device manufacturer and Android SDK version.
- **Hypothesis 3 (Freezing - Client Performance):** UI main thread blocking caused by unoptimized map rendering, heavy garbage collection cycles, or synchronous shared preference reads during live location streaming [INFERRED / Requires Engineering Validation].
  - *Confidence:* Medium
  - *Evidence:* Sluggish map interaction, UI lockups during ride tracking.
  - *Unknown:* Frame drop profiling, memory leak traces, and ANR traces in Google Play Console.

## Recommendation
Implement a comprehensive **App Stability Release Gate** and Performance Optimization Program:
1. **Immediate Crashlytics / Android Vitals Audit:** Pull cold-start stack traces for recent app updates, filtering for `SQLiteException`, `MigrationException`, and startup `NullPointerException`.
2. **Upgrade-Path Migration Testing Matrix:** Integrate automated upgrade test suites (installing Version N-1 → updating to Version N) on test devices before any production rollout.
3. **Startup Graceful Recovery / Safe Mode:** If the app detects repeated crashes during startup (< 3 seconds from launch), clear corrupted temporary caches and attempt safe initialization rather than crashing continuously.
4. **Main UI Thread Decoupling:** Move location coordinate parsing, map polyline geometry calculations, and DB caching off the main UI thread to background worker threads.
5. **Strict Release Health Gate:** Enforce automated deployment halt if Crash-Free User Rate drops below target baseline in staged rollouts.

## Acceptance Criteria
- **Scenario 1: Seamless App Upgrade Migration**
  - *Given* a commuter is upgrading from any supported previous app version to a new release,
  - *When* the app launches for the first time post-update,
  - *Then* local database migrations execute successfully without native or unhandled exceptions,
  - *And* user credentials and cached active ride states are preserved without requiring uninstall/reinstall.
- **Scenario 2: Startup Crash Auto-Recovery**
  - *Given* an unexpected corrupted local state causes a crash on launch,
  - *When* the user relaunches the app,
  - *Then* the app detects consecutive startup crashes, isolates the corrupted cache, and successfully initializes the login / home screen.
- **Scenario 3: Smooth Map Interaction Under Load**
  - *Given* the commuter is actively tracking their ride on mid-tier hardware,
  - *When* location telemetry updates arrive continuously,
  - *Then* the main UI thread remains responsive (no ANR dialogs, frame rate maintained smoothly).

## Instrumentation
- **Crash Telemetry:** Firebase Crashlytics and Google Play Console Android Vitals:
  - Startup crash rate (< 2s from launch).
  - Crash-free user rate and crash-free session rate.
  - ANR rate (% of daily sessions with Application Not Responding events).
- **Performance Profiling:**
  - Cold startup duration (P50, P90, P95).
  - UI thread frame drop percentage during map interaction.

## Experiment
- **Staged Rollout Verification:**
  - *Stage 1:* Internal dogfooding across diverse physical devices (Xiaomi, Samsung, Realme, OnePlus).
  - *Stage 2:* Staged rollout to small user percentage (e.g., example 5%), monitoring real-time Crashlytics error velocity for 48 hours.
  - *Stage 3:* Expansion only if crash rates remain below threshold.

## Rollout Strategy
1. **Emergency Hotfix Release:** If specific database migration bug is confirmed, build targeted hotfix with defensive migration rollback.
2. **Staged Deployment Strategy:** Example rollout progression: 5% → 20% → 50% → 100% with automated rollback gates.
3. **Post-Release Monitoring:** Continuous monitoring of Android Vitals metrics for 14 days post-release.

## Success Metrics
- **Crash-Free User Rate:** Proposed validation target > 99.5% (subject to engineering baseline and SLA review).
- **App Startup Crash Rate:** Proposed validation target < 0.1% (subject to engineering baseline and SLA review).
- **Android Vitals ANR Rate:** Proposed validation target < 0.2% (subject to engineering baseline and SLA review).

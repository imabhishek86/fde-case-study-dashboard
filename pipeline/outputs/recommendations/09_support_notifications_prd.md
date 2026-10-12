# PRD 09 — Customer Support Exception Handling & Push Notification Delivery

## Problem
Commuters report secondary operational friction regarding customer support responsiveness and push notifications:
1. **Customer Support & Helpdesk Responsiveness:** Commuters cite disconnected helpdesk calls, slow resolution of transit queries, and unhelpful responses during commute emergencies (8 primary reviews) [OBSERVED].
2. **Trip Push Notification Delivery Delays:** Notifications regarding vehicle assignment or approaching cab arrive late or fail to alert the user in time (4 primary reviews) [OBSERVED].

*(Note: These are lower-frequency issues categorized as P2 priority. They must not take precedence over P0/P1 core journey problems).*

## Evidence
- **Primary Clusters:**
  - `cluster_support_responsiveness` (Customer support and transport helpdesk responsiveness): 8 primary reviews | Severity: Medium | Journey: Post-Trip & Exception Resolution
  - `cluster_notifications` (Trip push notification delivery delays and false alerts): 4 primary reviews | Severity: Medium | Journey: Vehicle Assignment & Approach Alert
- **Representative Review IDs:**
  - *Support:* `225d87f1-5d2f-4d23-ac26-ecda35211579`, `1d7aa4a5-419d-42f4-8be5-d9096c09746d`
  - *Notifications:* `bb8bc95d-2aca-4ea1-8ec2-a6f74f5de33f`, `cdb0fe80-5aca-4f0e-b3e6-2f5585fba265`
- **Evidence Confidence:** Medium [OBSERVED symptoms of helpdesk reachability issues and delayed alerts]

## User Impact
Commuters facing ride exceptions (cab no-show, urgent cancellations) struggle to get immediate human assistance. Delayed push notifications cause commuters to rush at the last minute when cabs arrive unexpectedly [OBSERVED].

## Business / Rating Impact
- **Potential Rating Impact:** Low to Medium. While annoying, support calls and notifications are secondary to the primary journey. Resolving core booking and tracking failures will inherently reduce the volume of support tickets [INFERRED].
- **Expected Outcome:** Clearer self-service exception handling and reliable notification delivery reduce helpdesk call volume and missed ride alerts [PROPOSED ACTION].

## Root-Cause Hypotheses
- **Hypothesis 1 (Support Operations):** Helpdesk telephone infrastructure capacity bottlenecks during morning peak commute hours, combined with lack of in-app structured chat ticketing [INFERRED / Requires Operational Validation].
  - *Confidence:* Medium
  - *Evidence:* Reviews stating "always help desk number is not reachable".
  - *Unknown:* Helpdesk staffing levels, average speed of answer (ASA), and call drop rates.
- **Hypothesis 2 (Push Delivery Infrastructure):** FCM / APNS push gateway delivery throttling, device OS background battery optimization sleeping the app, or unoptimized message priority configurations [INFERRED / Requires Engineering Validation].
  - *Confidence:* Medium
  - *Evidence:* Commuters receiving notifications 10 minutes after vehicle arrival.
  - *Unknown:* FCM high-priority message configuration and device OEM notification permission handling.

## Recommendation
Implement targeted **Support Exception Routing & Push Delivery Reliability** enhancements:
1. **In-App Self-Service Exception Workflows:** Allow commuters to report "Cab Delayed" or "Driver Not Reachable" with one tap in-app, automatically alerting the transport desk without requiring phone calls.
2. **High-Priority FCM Notification Channel:** Ensure vehicle assignment and approach notifications use Android `PRIORITY_HIGH` channels with heads-up display permissions.
3. **Notification-to-Event Tracing:** Instrument backend push delivery timestamps to monitor gateway latency.
4. **Why Later Rationale:** Defer comprehensive helpdesk overhaul to Days 61-90, prioritizing P0 booking, stability, and tracking fixes first.

## Acceptance Criteria
- **Scenario 1: One-Tap In-App Exception Reporting**
  - *Given* a commuter's assigned cab has not arrived by the scheduled pickup window,
  - *When* the commuter taps "Report Delay" on the ride card,
  - *Then* the app automatically logs an exception ticket to the corporate transport desk and triggers an automated status check with the driver.
- **Scenario 2: Timely Approach Notification**
  - *Given* a cab approaches within the pickup geo-fence threshold,
  - *When* the approach event triggers,
  - *Then* the push notification is delivered with high priority and displays as a heads-up alert on the commuter's lock screen.

## Instrumentation
- FCM push delivery receipt latency (Event trigger timestamp → Client receipt timestamp).
- Helpdesk call deflection rate via in-app self-service exception workflows.
- In-app support ticket resolution time.

## Experiment
- **Push Priority Channel Test:**
  - Validate high-priority notification delivery rates across diverse Android OEM devices in internal testing.

## Rollout Strategy
1. **Engineering Update:** Configure high-priority push notification channels.
2. **Pilot Self-Service Exception Flows:** Introduce one-tap delay reporting on select corporate accounts.
3. **Broader Deployment:** Scale during Phase 3 (Days 61-90).

## Success Metrics
- **Push Delivery Latency:** Proposed validation target P95 < 5 seconds for critical ride alerts (subject to engineering review).
- **Self-Service Exception Resolution Rate:** Target adoption of in-app resolution over phone calls (subject to review).

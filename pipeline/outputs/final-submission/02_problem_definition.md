# 02. Problem Definition & Commuter Journey Mapping

## Context: Enterprise Employee Commute
MoveInSync is not an on-demand consumer taxi app; it is a mission-critical **B2B2C enterprise employee transportation platform**. Commuters rely on MoveInSync to travel between their homes and corporate workplaces under strict shift timelines. 

In this operational context, failure carries severe consequences: a missed cab or booking failure risks missing a work shift, attendance penalties, and security risks during late-night commutes.

---

## Why Play Store Ratings Are a Critical Signal
Public Play Store ratings serve as a raw, unfiltered barometer of end-user sentiment:
1. **Unfiltered Commuter Voice:** Unlike internal surveys filtered through corporate transport managers, public reviews reveal acute daily frustration.
2. **Enterprise Buyer Impact:** Prospective enterprise HR and procurement leaders inspect public app ratings during vendor evaluation. A 3.77/5 rating signals operational instability and user dissatisfaction.
3. **Polarized Feedback:** 89.9% of reviews are either 1★ (25.8%) or 5★ (64.1%), indicating that user satisfaction is binary: when the service works, commuters love it; when a core journey step fails, anger is immediate.

---

## Why Ratings Alone Cannot Identify Root Causes
A 1-star rating is an emotional symptom, not a diagnostic trace:
- A commuter submitting a 1-star review with the text *"worst app"* provides zero technical clues.
- A 1-star rating citing *"cab did not come"* could stem from a backend booking timeout, vehicle capacity exhaustion, driver no-show, or inaccurate GPS tracking.
- **The Epistemic Imperative:** To identify actionable fixes, engineering must correlate **Review Text + Star Rating + Commuter Journey Stage + Severity + Technical Hypotheses**.

---

## Commuter Journey Breakdown & Friction Mapping

```
[1. Roster Scheduling] ────> [2. Trip Booking] ────> [3. Vehicle Assignment]
         │                            │                           │
         ▼                            ▼                           ▼
   Unconfirmed Shift           Cutoff Timeout &           Delayed / Missing
   Sync Discrepancy             Silent Booking Drop         Push Alerts
   (Booking Failure)           (Booking Failure)          (Notifications)

[4. Pre-Commute Launch] ───> [5. Curbside Waiting] ───> [6. Boarding Gate]
         │                            │                           │
         ▼                            ▼                           ▼
   Post-Update Startup         Frozen GPS Pins &          Session Logout Loop &
   Crash Loops                 Stale Coordinates          Seatbelt Popup blocking OTP
   (Crash Loop)                (GPS Tracking)             (Auth & Safety Friction)

[7. In-Transit Transit] ───> [8. Arrival & Drop] ────> [9. Post-Trip & Support]
         │                            │                           │
         ▼                            ▼                           ▼
   Screen Lag & Freezing /     Distant Detour Drop-off    Forced Rating Modal &
   Circuitous Detours          (Routing Inaccuracy)       Unreachable Helpdesk
   (Performance & Routing)                                (UI & Support Friction)
```

### Journey Stage Friction Detail:
1. **Shift Roster & Booking (Pre-Trip):** Booking failures, unconfirmed rosters, and peak cutoff timeouts (30 primary reviews).
2. **App Access & Initialization:** Post-update startup crash loops preventing app launch (14 primary reviews).
3. **Curbside Waiting (Pre-Boarding):** Frozen vehicle map pins, stale coordinates, and fluctuating ETAs leaving commuters waiting blindly (26 tracking reviews, 10 ETA reviews).
4. **Boarding Verification:** Unexpected session logouts forcing curbside credential entry (20 reviews) and intrusive seatbelt popups intercepting "View OTP" clicks (3 reviews).
5. **In-Transit Commute:** Main UI thread screen lag and freezing (27 reviews), extreme multi-zone routing detours ("Bharat Darshan", 16 reviews), and in-cabin discomfort like non-working AC (24 reviews).
6. **Post-Trip Feedback & Support:** Mandatory unskippable rating modals blocking app navigation (21 reviews) and disconnected transport helpdesk lines (8 reviews).

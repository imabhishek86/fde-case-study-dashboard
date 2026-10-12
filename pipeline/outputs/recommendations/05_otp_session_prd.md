# PRD 05 — Authentication Lifecycle & Boarding OTP Resilience

## Problem
Commuters report unexpected session logouts, recurring login prompts, and latency in receiving boarding OTPs while standing curbside [OBSERVED]. When commuters switch away from the app or return from low-connectivity spots, the app forces them to re-authenticate, causing boarding delays.

## Evidence
- **Primary Cluster:** `cluster_otp_session_friction` (OTP delivery latency, verification & session friction)
- **Review Frequency:** 20 verified primary reviews (6.7% of negative reviews)
- **Defect Severity:** High
- **Relevant Journey Stage:** Pickup & Boarding Verification (Curbside)
- **Representative Review IDs:**
  - `72e74b90-1da1-49cc-87c0-6bc42af65ba3`
  - `f603466c-c648-4802-94e4-44f2c9916d32`
  - `e0d68839-6e59-4dd7-8f00-052cda79a063`
- **Evidence Confidence:** Medium [OBSERVED symptoms of curbside logouts and delayed OTP access]

## User Impact
Commuters standing at vehicle doors in noisy, crowded curbside environments cannot quickly board cabs. Unexpected re-login screens cause panic, delay vehicle departure for fellow passengers, and increase driver agitation [OBSERVED].

## Business / Rating Impact
- **Potential Rating Impact:** High. Authentication and OTP failures happen at the most time-critical moment of the commute (boarding), directly translating to angry 1-star reviews [INFERRED].
- **Expected Outcome:** Silent session recovery and offline-resilient OTP caching will significantly reduce curbside gate friction [PROPOSED ACTION].

## Root-Cause Hypotheses
- **Hypothesis 1 (Client Session Lifecycle):** Aggressive client-side session timeout or token invalidation on application background/resume lifecycle transitions [INFERRED / Requires Engineering Validation].
  - *Confidence:* Medium
  - *Evidence:* Commuters report "it logs out every time I open it".
  - *Unknown:* Token TTL configuration, refresh token rotation logic, and secure storage decryption failures on app resume.
- **Hypothesis 2 (Network / SMS Gateway):** SMS gateway dispatch latency or telecom provider delivery throttling for SMS-based verification OTPs [INFERRED / Requires Engineering Validation].
  - *Confidence:* Medium
  - *Evidence:* Reports of OTP arriving after cab has departed.
  - *Unknown:* SMS aggregator delivery latency and fallback carrier routing.
- **Hypothesis 3 (Offline Boarding State):** Lack of secure local caching for pre-assigned ride boarding OTPs, forcing synchronous network calls at vehicle arrival [INFERRED / Requires Engineering Validation].
  - *Confidence:* Medium
  - *Evidence:* Logouts and OTP disappearing in basement/low-network curbside zones.
  - *Unknown:* Client offline cache encryption and sync protocols.

## Recommendation
Implement a **Resilient Authentication & Boarding OTP Workstream**:
1. **Silent Background Token Refresh on App Resume:** Ensure access tokens are automatically refreshed in the background using secure refresh tokens without interrupting the user or redirecting to the login screen.
2. **Encrypted Local Caching of Active Ride Boarding OTP:** Once a ride is assigned and confirmed, cache the boarding OTP securely in encrypted local storage (`EncryptedSharedPreferences` / Keychain) so it is immediately visible even in zero-connectivity curbside basements.
3. **Session Recovery State Machine:** If a token refresh fails due to transient network timeout, retain the cached active ride screen in read-only mode rather than kicking the user to the login screen.
4. **In-App OTP Display as Primary:** Ensure the boarding OTP is always displayed directly within the in-app ride card, minimizing dependence on SMS delivery.
5. **Clear Curbside Error & Retry UI:** If authentication fails definitively, provide clear messaging and fast biometric / PIN recovery options.

## Acceptance Criteria
- **Scenario 1: App Resume Without Logout**
  - *Given* a commuter has an active confirmed ride,
  - *When* they switch to another app and return to MoveInSync 15 minutes later,
  - *Then* the app performs a silent background token refresh without displaying the login screen,
  - *And* immediately displays the active ride card with the boarding OTP.
- **Scenario 2: Offline Curbside OTP Retrieval**
  - *Given* the commuter arrives at an office basement pickup spot with zero cellular network,
  - *When* they open MoveInSync to board their assigned vehicle,
  - *Then* the app retrieves the pre-cached boarding OTP from encrypted local storage,
  - *And* displays the OTP with an offline badge ("Cached offline • Valid for boarding").

## Instrumentation
- Session logout event rate on app foreground resume.
- Token refresh failure rate segmented by error code (network timeout vs expired refresh token).
- Curbside offline OTP cache hit rate.
- OTP retrieval latency from app launch to display.

## Experiment
- **Phased Session Refresh Pilot:**
  - *Baseline:* Measure current session drop rate on foreground resume.
  - *Pilot (Example: 15% user cohort):* Deploy silent background token refresh.
  - *Metrics:* Foreground logout rate, login screen impression rate, curbside boarding completion time.

## Rollout Strategy
1. **Security & Cryptography Audit:** Validate encrypted local storage implementation with security team.
2. **Internal Dogfooding:** Verify token lifecycle across employee devices.
3. **Staged Release (Example: 10% → 30% → 100%):** Roll out client session enhancements.

## Success Metrics
- **Curbside Session Logout Rate:** Proposed validation target < 0.5% of app resume events (subject to engineering baseline review).
- **Offline OTP Availability:** Proposed target 100% availability for confirmed assigned rides.

# 04. Key Findings from the Review Dataset

## Overview
Analysis of the 1,000 collected reviews reveals clear statistical patterns, journey bottlenecks, and sentiment drivers. Every finding is classified as **[OBSERVED]** (empirical review fact) or **[INFERRED]** (deductive interpretation).

---

## Finding A: Rating Distribution & Sentiment Polarization [OBSERVED]
- **5-Star (5★):** 641 reviews (**64.1%**)
- **4-Star (4★):** 42 reviews (**4.2%**)
- **3-Star (3★):** 26 reviews (**2.6%**)
- **2-Star (2★):** 33 reviews (**3.3%**)
- **1-Star (1★):** 258 reviews (**25.8%**)
- **Average Rating:** **3.77 / 5.00**
- **Negative Ratio (1–2★):** 291 reviews (**29.1%**)
- **Positive Ratio (4–5★):** 683 reviews (**68.3%**)
- *Takeaway:* User sentiment is intensely polarized. 89.9% of reviews are either 1★ or 5★. Dissatisfied users almost universally assign the minimum possible rating (258 1-star vs only 33 2-star).

---

## Finding B: Monthly Sentiment Trends [OBSERVED]

| Month | Review Volume | Average Rating | 1-Star Count | Negative Count | Negative Share (%) | Positive Share (%) |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| **2026-06** (Partial) | 147 | **3.39** | 51 | 56 | **38.10%** | 57.82% |
| **2026-07** | 286 | **4.03** | 54 | 65 | **22.73%** | 75.17% |
| **2026-08** | 241 | **3.65** | 69 | 77 | **31.95%** | 64.32% |
| **2026-09** | 245 | **3.84** | 61 | 68 | **27.76%** | 70.61% |
| **2026-10** (To Oct 11) | 81 | **3.74** | 23 | 25 | **30.86%** | 67.90% |

- *Key Trends:*
  - Lowest rated month: June 2026 (3.39 avg rating, 38.1% negative share).
  - Peak rated month: July 2026 (4.03 avg rating, 22.7% negative share).
  - Highest negative volume: August 2026 (77 negative reviews, 31.95% negative share).
  - October 2026 shows continued negative pressure (30.86% negative share across 81 reviews).

---

## Finding C: Negative Review Theme Concentration [OBSERVED]
Across the 291 negative reviews, complaints cluster heavily in operational and functional areas:
1. **Booking & Scheduling:** 28 negative occurrences (9.62% of negative reviews, 21 high/critical severity).
2. **App Performance & Freezing:** 28 negative occurrences (9.62% of negative reviews, 28 high/critical severity).
3. **Live Tracking, GPS & ETA:** 23 negative occurrences (7.90% of negative reviews, 18 high/critical severity).
4. **Pickup & Route Assignment:** 21 negative occurrences (7.22% of negative reviews, 6 high/critical severity).
5. **Driver & Vehicle Condition:** 21 negative occurrences (7.22% of negative reviews, 2 high/critical severity).
6. **UI & Redesign Complexity:** 19 negative occurrences (6.53% of negative reviews).
7. **Login & OTP Verification:** 19 negative occurrences (6.53% of negative reviews).
8. **Customer Support:** 12 negative occurrences (4.12% of negative reviews).
9. **Notifications:** 4 negative occurrences (1.37% of negative reviews).
10. **Safety Concerns:** 3 negative occurrences in theme classification (1.03% of negative reviews, 3 critical severity).
11. **Other / Vague Sentiment:** 113 negative occurrences (unstructured sentiment).

---

## Finding D: Defect Severity & Core Journey Impact [OBSERVED / INFERRED]
- **Critical Severity (6 reviews):** Physical safety concerns (3 reviews) and compliance popups blocking OTP retrieval (3 reviews). Highest operational risk [OBSERVED].
- **High Severity (117 reviews):** Service access lockouts (14 crash loops), live tracking failures (26 reviews), booking failures (30 reviews), in-ride freezing (27 reviews), session logouts (20 reviews), and routing detours (16 reviews) [OBSERVED].
- **Medium Severity (83 reviews):** UI clutter (21 reviews), driver AC/hygiene (24 reviews), support responsiveness (8 reviews), push notifications (4 reviews), and low-info functional complaints (17 reviews) [OBSERVED].
- **Pure Emotional Sentiment (76 reviews):** Vague negative words without functional detail [OBSERVED].

---

## Finding E: Important Evidence Gaps [OBSERVED limitation]
- **Diagnostic Gaps (93 reviews):** 76 reviews contain purely emotional sentiment (*"worst app"*, *"bekar"*), and 17 reviews contain low-information functional complaints (*"app not opening"*, *"login problem"*) lacking device model, Android OS version, or stack traces.
- **Internal Telemetry Absence:** Public reviews report symptoms (e.g., frozen map, booking failure), but cannot identify whether the failure originates in the client, backend DB, broker queue, or network carrier without internal telemetry.

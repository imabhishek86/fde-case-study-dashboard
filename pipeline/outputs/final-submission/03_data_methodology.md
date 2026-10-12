# 03. Data Methodology & Analytic Framework

## Overview
This case study employed an auditable, 10-step analytical pipeline to transform raw public review text into evidence-backed product and engineering specifications. All analyses were conducted on real user reviews without fabrication or synthetic augmentation.

---

## The 10-Step Analytical Pipeline

```
Step 1: Public Review Collection (google-play-scraper, n=1,000)
   └──> Step 2: Inspection, Cleaning & Schema Validation (processed_reviews.json)
         └──> Step 3: Rating Distribution & Monthly Trend Analysis
               └──> Step 4: Rule-Based Theme Classification (11 Domain Themes)
                     └──> Step 5: Semantic Analysis (Deterministic NLP Engine)
                           └──> Step 6: Root-Cause Hypothesis Generation (14 Clusters)
                                 └──> Step 6A: Root-Cause Quality Refinement Audit
                                       └──> Step 7: Multi-Dimensional Issue Prioritization
                                             └──> Step 7A: Strict Evidence Quality Audit
                                                   └──> Step 8: PRD & Engineering Specification
```

### Step Details:
1. **Public Review Collection (Step 1):** Scraped 1,000 public English reviews for `com.moveinsync.ets` in India using `google-play-scraper`. Bounded date range: June 15, 2026 to October 11, 2026.
2. **Data Cleaning & Quality Inspection (Step 2):** Validated schema integrity, normalized timestamps to ISO 8601, removed whitespace anomalies, and confirmed zero duplicate review IDs.
3. **Rating Analysis & Trends (Step 3):** Computed star rating distributions, sentiment ratios, and monthly volume/rating trends across June through October 2026.
4. **Theme Classification (Step 4):** Classified reviews across 11 commuter journey themes (`Booking`, `Tracking_GPS_ETA`, `App_Performance`, `UI_UX`, `Pickup_Route`, `Driver_Vehicle`, `Login_OTP`, `Support`, `Notifications`, `Safety`, `Other`).
5. **Semantic Analysis (Step 5):** Conducted semantic feature extraction on 299 negative complaint reviews using a **deterministic, reproducible local semantic analysis engine** (GEMINI_API_KEY was not configured; no external LLM API was claimed).
6. **Root-Cause Analysis (Step 6):** Synthesized user complaints into 14 problem clusters with technical and operational root-cause hypotheses.
7. **Root-Cause Quality Refinement (Step 6A):** Audited hypotheses for evidence strength, separated vague sentiment (76 reviews) from functional complaints (17 reviews), and flagged internal implementation details requiring telemetry.
8. **Issue Prioritization (Step 7):** Scored clusters across Frequency, Severity, Journey Impact, Evidence Strength, Rating Impact Potential, and Qualitative Effort into P0, P1, P2, and P3 tiers.
9. **Prioritization Quality Audit (Step 7A):** Enforced zero double-counting, strictly separated Post-Update Crashes (14) from App Freezing (27), qualified ETA 3x claims, softened causal rating claims, and relabeled all numerical targets as proposed.
10. **Recommendations & PRDs (Step 8):** Authored 9 formal PRDs, backlogs, roadmap, and traceability matrices mapping every action to evidence.

---

## Dataset Parameters & Technical Metadata
- **Application ID:** `com.moveinsync.ets`
- **Geographic Country:** India (`in`)
- **Language:** English (`en`)
- **Total Sampled Reviews:** 1,000
- **Total Negative Reviews Analyzed:** 291 (Rating ≤ 2) + 8 low-rating complaints = 299 total analyzed complaint reviews
- **Tooling:** Node.js, `google-play-scraper`, custom deterministic parsing pipelines.
- **Collection Timestamp:** October 12, 2026.

---

## Epistemic Quality Principles
- **[OBSERVED]:** Directly stated in public review text (e.g., *"app does not open after update"*).
- **[INFERRED]:** Logical operational deduction from recurring evidence (e.g., *"stale tracking causes curbside anxiety"*).
- **[HYPOTHESIS]:** Unverified internal backend/client mechanism (e.g., *"Room schema migration exception"*).
- **[PROPOSED ACTION]:** Recommended engineering or product change (e.g., *"add Skip button"*).
- **[PROPOSED TARGET]:** Suggested performance threshold subject to baseline review (e.g., *"P95 freshness < 10s"*).

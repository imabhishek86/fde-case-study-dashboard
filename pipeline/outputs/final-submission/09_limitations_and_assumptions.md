# 09. Analytical Limitations, Biases & Assumptions

## Overview
Every sound engineering and business assessment must explicitly document its diagnostic boundaries. This section outlines the analytical limitations, statistical biases, and assumptions underlying this case study.

---

## 1. Bounded Sample Boundary
- **Sample Size:** This study analyzed **1,000 public reviews**. While statistically meaningful, it represents a bounded snapshot of public user reviews, *not* the complete historical Play Store database (tens of thousands of reviews) or internal commuter populations.
- **Date Boundary:** Reviews span June 15, 2026 to October 11, 2026. Findings reflect the app versions released during this window.

## 2. Public Review Self-Selection Bias
- **Extreme Sentiment Polarization:** Public review datasets suffer from self-selection bias. Satisfied enterprise commuters silently use the app daily without leaving reviews; commuters who encounter transit failures (missed rides, crashes) actively seek out the Play Store to vent frustration.
- **Under-Representation of Silent Users:** The 29.1% negative review share in public data does not mean 29.1% of all MoveInSync rides fail; it reflects the sentiment share among users motivated to write public feedback.

## 3. Rating / Review Text Discrepancies
- **Sentiment Inconsistency:** In a small number of reviews, commuters assign 5 stars while describing severe functional bugs, or assign 1 star while expressing praise (*"best app"*). Rule-based theme classification handled these via multi-variable keyword filtering, but qualitative dissonance exists in public data.

## 4. Absence of Internal Technical Telemetry
- **Hypotheses vs Confirmed Facts:** Public reviews provide symptom observations (e.g., *"map is frozen"*, *"cannot book"*), but cannot reveal internal server architecture, microservice topologies, database queries, thread pool saturation, or network carrier logs.
- **Technical Humility:** Root causes (e.g., Room database migration failures, API lock contention, WebSocket reconnect bugs) remain **hypotheses requiring telemetry validation** until internal Crashlytics, APM, and server logs confirm them.

## 5. Non-Causal Rating Assumptions
- **No Guaranteed Formula:** We do not claim that fixing a single defect will automatically increase the Play Store rating by an exact numerical amount (e.g., +0.5 stars). Rating recovery depends on cumulative product reliability, customer support responsiveness, and fleet vendor operations over time.

## 6. Monthly Sample Size Variations
- **Partial Month Impact:** October 2026 includes reviews collected through October 11 (81 reviews), whereas July, August, and September represent full calendar months (240–286 reviews). Monthly percentage trends must be interpreted with sample size differences in mind.

## 7. Deterministic Semantic Engine Boundary
- **Semantic Classification Engine:** Semantic feature extraction in Step 5 was executed using a **deterministic, reproducible local semantic analysis engine** (GEMINI_API_KEY was not configured; no external Gemini API calls were made). Findings reflect structured NLP rules rather than deep large language model reasoning.

## 8. Operational & B2B Contextual Realities
- **Enterprise SLA Realities:** MoveInSync operates under complex B2B corporate contracts. Routing constraints, booking cutoff hours, driver fleet quality, and safety popups are often negotiated directly between MoveInSync and corporate enterprise HR/Transport admin teams, placing commercial constraints on pure product redesigns.

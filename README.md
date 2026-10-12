# MoveInSync FDE Case Study Dashboard

An evidence-driven analytics dashboard built as part of a Forward Deployed Engineer (FDE) case study for diagnosing MoveInSync Google Play Store rating issues and translating user feedback into prioritized product and engineering actions.

---

## 1. Executive Summary

This project analyzes user sentiment and functional complaints from a bounded public dataset of Google Play Store reviews for MoveInSync (`com.moveinsync.ets`).

| Metric | Value | Context |
| :--- | :--- | :--- |
| **Total Reviews** | **1,000** | Public sample collected via Google Play |
| **Sample Window** | **June 15 – October 11, 2026** | India locale (`en`), bimodal distribution |
| **Average Rating** | **3.77 / 5.00** | Polarized between high satisfaction and critical friction |
| **1★ Reviews** | **258 (25.8%)** | Acute operational and technical blockers |
| **2★ Reviews** | **33 (3.3%)** | Recurring commuter friction |
| **Negative Share (1–2★)** | **291 (29.1%)** | Primary focus of root-cause and triage analysis |
| **Positive Share (4–5★)** | **683 (68.3%)** | 641 5★ + 42 4★ reviews |
| **Neutral Share (3★)** | **26 (2.6%)** | Mixed satisfaction reviews |

> **Disclaimer:** This analysis is based on a bounded public sample of 1,000 Google Play reviews, not the complete MoveInSync historical Play Store dataset.

---

## 2. Business Problem

Enterprise employee commute systems rely on end-to-end operational and technical reliability. When office commuters experience transit failures, dissatisfaction quickly surfaces as low Play Store ratings.

**Core Case Study Questions:**
1. **Why are MoveInSync ratings lower than expected?** What causes the 29.1% negative review share?
2. **What are the acute commuter pain points?** Where in the daily journey (booking, tracking, pickup, ride, rating) do failures occur?
3. **What should be fixed first?** How should an incoming Forward Deployed Engineer (FDE) sequence product and engineering interventions to halt rating erosion and restore platform confidence?

---

## 3. What I Built

An interactive, responsive single-page web dashboard that turns qualitative feedback into auditable product and engineering roadmaps.

- **Executive Overview (`/overview`):** Top KPI cards, bimodal rating distribution chart, 5-month longitudinal trend line chart, and journey touchpoint overview.
- **User Problems (`/problems`):** 11 categorized complaint themes mapped to journey stages, with volume charts and interactive slide-out detail drawers.
- **Root-Cause Diagnostic Analysis (`/root-causes`):** 4-layer diagnostic cards strictly separating *Observed Symptoms* from *Inferred Hypotheses*, *Required Telemetry*, and *Proposed Actions*.
- **Multi-Dimensional Priority Matrix (`/priorities`):** Rigorous P0–P3 triage stack highlighting the FDE *"What I Would Fix First"* decision framework.
- **Product Recommendations (`/recommendations`):** Formal PRD specifications for P0/P1 initiatives, plus the ⭐ **Potential Quick Win** (dismissible rating prompt).
- **Interactive Product Backlog (`/product-backlog`):** Sortable, filterable table linking initiatives to evidence, user value, effort, and success metrics.
- **Engineering Deep Dives (`/engineering`):** 5 technical investigation briefs detailing required telemetry instrumentation, decision gates, and acceptance criteria.
- **Phased 30-60-90 Day Roadmap (`/roadmap`):** Visual 3-phase execution timeline (Phase 1: Instrumentation → Phase 2: Core Reliability → Phase 3: Algorithmic Scaling).
- **Auditable Evidence Explorer (`/evidence`):** Full inspection suite covering all 1,000 verified reviews with text search, multi-faceted filtering, and detailed inspection modals.

---

## 4. Key Findings

Analysis of the 291 negative reviews identified specific friction clusters across the commuter journey:

1. **Roster & Booking Management Failures (30 primary reviews):** Commuters report booking drop-offs, inability to reserve scheduled shifts, and silent allocation failures during peak cutoff windows.
2. **App Freezing & Performance Degradation (27 primary reviews):** UI lockups, ANR events, and lagging screens during active transit workflows.
3. **Delayed / Frozen Live GPS Tracking (26 primary reviews):** Stale vehicle coordinates and frozen pins leaving commuters uncertain during curbside waiting.
4. **Post-Update Crash Loop (14 primary reviews):** Immediate crash on launch following client updates, creating a total service lockout for affected commuters.

> **Methodological Note:** Post-update app launch crashes (14 reviews) and general app freezing/ANR (27 reviews) are kept strictly separate. They represent distinct failure modes and are never combined into an artificial figure of 41.

---

## 5. Priority Framework

Issues were prioritized using a multi-dimensional rubric balancing commuter impact with technical triage:

| Tier | Focus Area | Primary Criteria |
| :--- | :--- | :--- |
| **P0** | **Critical Operational & Availability Blockers** | High frequency + acute service lockout + severe journey interruption (Booking reliability, Live GPS freshness, App freezing, Post-update crash loops). |
| **P1** | **Core Journey & Algorithm Friction** | Systemic commute degradation affecting transit time or conduct (Routing detours, ETA calibration, Driver/vehicle hygiene, Unskippable rating prompt). |
| **P2** | **Secondary Touchpoint Defects** | Authentication, notification delays, or support ticket latency where operational workarounds exist. |
| **P3** | **Unactionable / Vague Sentiment** | Low-information reviews (e.g., "bad app", "pathetic") lacking reproducible functional detail. |

**Evaluation Dimensions:**
- Defect frequency in public review sample
- Failure severity (blocker vs inconvenience)
- Commuter journey stage impact
- Review evidence confidence
- Potential Play Store rating recovery leverage
- Internal engineering effort and architectural feasibility

---

## 6. Forward Deployed Engineer (FDE) Approach

The case study follows a disciplined engineering diagnostic methodology:

```
Public Reviews (n=1,000)
       │
       ▼
Data Cleaning & Normalization (Schema validation, deduplication)
       │
       ▼
Rating & Longitudinal Trend Analysis (Bimodal distribution, monthly trajectory)
       │
       ▼
Theme Classification (11 journey touchpoints)
       │
       ▼
Semantic NLP Feature Extraction (Deterministic local classification engine)
       │
       ▼
Root-Cause Hypothesis Formulation (14 diagnostic clusters)
       │
       ▼
Multi-Dimensional Prioritization (P0 / P1 / P2 / P3 triage)
       │
       ▼
Product & Engineering Specifications (9 PRDs, 5 technical briefs)
       │
       ▼
Interactive Web Dashboard & Evidence Explorer
```

### Strict Epistemic Discipline
To maintain engineering credibility when presenting to technical leadership:
- **[OBSERVED]:** What users explicitly stated in public review text (e.g., "map pin didn't move for 10 minutes").
- **[HYPOTHESIS]:** Inferred technical mechanisms requiring backend validation (e.g., "broker ingestion lag or driver background location throttling").
- **[VALIDATION REQUIRED]:** Telemetry instrumentation needed before writing production code (e.g., "6-hop end-to-end timestamp tracing").
- **[PROPOSED ACTION]:** Recommended product or engineering response.

---

## 7. Dashboard Preview

> **TODO: Dashboard Screenshots**  
> Screenshots can be added to the repository to showcase the UI:
> - `screenshots/01_overview.png` — Executive KPI summary, rating distribution, and monthly trends.
> - `screenshots/02_priority_matrix.png` — Visual P0–P3 triage matrix and "What I Would Fix First" hierarchy.
> - `screenshots/03_recommendations.png` — PRD specifications and the dismissible rating prompt Quick Win.
> - `screenshots/04_evidence_explorer.png` — Real-time filterable audit table over 1,000 review records with detail inspection drawer.

---

## 8. Tech Stack

- **Framework:** React 19 + Vite (Modern JavaScript `.jsx`, zero TypeScript)
- **Styling:** Tailwind CSS 3.4
- **Charts:** Recharts
- **Icons:** Lucide React
- **Linter & Tooling:** Oxlint, PostCSS, Autoprefixer
- **Data Layer:** Asynchronous client-side JSON ingestion (`public/data/processed_reviews.json`) with bundled fallback

---

## 9. Project Structure

```
dashboard/
├── public/
│   ├── data/
│   │   └── processed_reviews.json    # Complete 1,000-review dataset (zero PII)
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── DataQualityBanner.jsx     # Epistemic notice & audit banner
│   │   ├── Header.jsx                # Responsive header with live review badges
│   │   ├── KPICard.jsx               # Reusable executive metric card
│   │   └── Sidebar.jsx               # Navigation bar with desktop/mobile views
│   ├── pages/
│   │   ├── OverviewPage.jsx          # /overview: Executive dashboard & charts
│   │   ├── UserProblemsPage.jsx      # /problems: 11 themes & detail drawer
│   │   ├── RootCausesPage.jsx        # /root-causes: 4-layer diagnostic cards
│   │   ├── PriorityMatrixPage.jsx    # /priorities: Triage matrix & FDE strategy
│   │   ├── RecommendationsPage.jsx   # /recommendations: Actionable PRD cards
│   │   ├── ProductBacklogPage.jsx    # /product-backlog: Tabular backlog
│   │   ├── EngineeringPage.jsx       # /engineering: 5 investigation briefs
│   │   ├── RoadmapPage.jsx           # /roadmap: 30-60-90 day phased roadmap
│   │   └── EvidenceExplorerPage.jsx  # /evidence: 1,000-review audit engine
│   ├── data/
│   │   └── caseStudyData.js          # Compiled case study metrics & data
│   ├── App.jsx                       # Routing & layout orchestration
│   ├── index.css                     # Tailwind design tokens
│   └── main.jsx                      # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## 10. Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Setup & Execution
```bash
# Clone the repository
git clone https://github.com/imabhishek86/fde-case-study-dashboard.git

# Navigate to the dashboard directory
cd fde-case-study-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173/` in your browser.

### Verification Commands
```bash
# Build production bundle
npm run build

# Run linter
npm run lint
```

---

## 11. Evidence Explorer

The dashboard includes a dedicated **Evidence Explorer (`/#/evidence`)** designed for case study interviewers and auditors:

- **1,000 Verified Records:** Complete review dataset compiled from Google Play Store public data.
- **Case-Insensitive Search:** Real-time search across review ID, review text, and thematic tags.
- **Multi-Faceted Filtering:**
  - Star rating (1★, 2★, 3★, 4★, 5★)
  - Defect severity (Critical, High, Medium, Low, None)
  - Complaint theme (11 journey touchpoints)
  - Journey stage (Pre-Trip booking, Curbside waiting, In-Transit ride, etc.)
  - Priority tier (P0, P1, P2, P3, None)
- **Review Detail Modal:** Click any review row to inspect full review text, classification tags, complaint flags, and UUID hash.
- **Privacy Assurance:** No reviewer names, photos, or personally identifiable information (PII) are stored or displayed.

---

## 12. Limitations

1. **Bounded Public Sample:** Based on a sample of 1,000 public reviews collected between June 15 and October 11, 2026. It is not the complete MoveInSync historical dataset.
2. **Self-Selection Bias:** Play Store reviews inherently over-represent extreme experiences (commuters who encountered severe blockers or users praising drivers).
3. **Missing Internal Telemetry:** Root causes are engineering hypotheses inferred from user symptoms; they cannot be proven without access to internal logs, APM traces, and fleet dispatch databases.
4. **Partial October Sample:** October 2026 contains a smaller partial-month sample (81 reviews), as collection concluded mid-month.
5. **Non-Causal Rating Modeling:** Rating impact estimates reflect potential recovery opportunities, not guaranteed causal outcomes.

---

## 13. Important Methodology Note

- **Semantic Analysis Engine:** Semantic classification and feature extraction were performed using a deterministic local natural language processing (NLP) analysis engine.
- **No External LLM Usage:** A live Gemini API key was not configured during review processing; findings reflect reproducible, deterministic keyword and semantic clustering rather than live Gemini API outputs.

---

## 14. Future Work

To transition these diagnostic findings into production engineering:

1. **Internal Telemetry Ingestion:** Connect Firebase Crashlytics and Google Play Android Vitals to validate ANR rates and post-update crash stack traces.
2. **Booking Concurrency Tracing:** Implement APM distributed tracing on the roster booking microservice during the final 15 minutes of shift cutoff windows.
3. **GPS Freshness Instrumentation:** Instrument a 6-hop timestamp tracking pipeline (Driver GPS capture → Broker ingestion → Dispatch backend → Client receipt → UI rendering) to establish true P95 telemetry latency.
4. **ETA Calibration Pipeline:** Build automated discrepancy telemetry comparing predicted arrival times against actual curb arrival timestamps and external road speed baselines.
5. **Controlled A/B Experiments:** Run an experiment on the post-trip rating prompt (current forced modal vs. dismissible card) to measure impact on task completion and 1-star Play Store review inflow.

---

## 15. Author / Case Study

**Role:** Forward Deployed Engineer (FDE) Case Study  
**Domain:** Enterprise Mobility, Commute Reliability & Rating Intelligence  
**Focus:** Diagnostic Analytics, Product Requirements & Engineering Prioritization

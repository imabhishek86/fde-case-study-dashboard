# MoveInSync Rating Intelligence Dashboard

> **Forward Deployed Engineer (FDE) Case Study Visualization Layer**  
> Visualizing 1,000 Real Google Play Reviews for MoveInSync (`com.moveinsync.ets`)  
> India • English • June 15, 2026 – October 11, 2026

---

## 1. Project Purpose
This interactive web dashboard visually presents the complete 10-step MoveInSync Play Store rating analysis and the resulting product/engineering roadmap. Designed for executive and engineering case-study interviews, it allows stakeholders to explore:
- High-level rating distribution and polarized sentiment trends.
- The 10 core commuter journey touchpoints and where failures occur.
- 14 audited problem clusters with strict epistemic separation (`[OBSERVED]`, `[HYPOTHESIS]`, `[VALIDATION REQUIRED]`, `[PROPOSED ACTION]`).
- The multi-dimensional priority stack (P0, P1, P2, P3).
- 9 formal Product Requirement Documents (PRDs) and the high-leverage dismissible rating prompt Quick Win.
- The 30-60-90 day phased engineering implementation roadmap.
- An interactive Evidence Explorer allowing auditors to inspect real, unredacted review records.

---

## 2. Technology Stack
- **Framework:** React 19 + Vite (Modern JavaScript `.jsx`, zero TypeScript)
- **Styling:** Tailwind CSS 3.4
- **Data Visualizations:** Recharts (Bimodal distributions, monthly trends, theme charts)
- **Icons:** Lucide React
- **Architecture:** Zero-backend client SPA with URL hash-synced navigation and responsive mobile sidebar

---

## 3. Quick Start & Local Execution

### Setup & Installation
```bash
cd dashboard
npm install
```

### Development Dev Server
```bash
npm run dev
```
Launches the development server (typically at `http://localhost:5173/`).

### Production Build
```bash
npm run build
```
Creates an optimized production bundle in `dashboard/dist/`.

### Preview Production Build
```bash
npm run preview
```

---

## 4. Architecture & Navigation Pages
The application is organized into 9 dedicated analytical pages:
1. **/overview (Overview):** Main executive cockpit with 5 top KPI cards (1,000 reviews, 3.77 average rating, 258 1-star reviews, 291 negative reviews, 683 positive reviews), bimodal rating distribution bar chart, monthly sentiment line chart, journey stage overview, and FDE first-move strategy.
2. **/problems (User Problems):** Interactive 10-stage commuter journey map and horizontal bar chart of complaint volume across themes with P0/P1/P2/P3 filters and interactive drawer details.
3. **/root-causes (Root Causes):** 4-layer diagnostic cards strictly distinguishing Observed Symptoms from Inferred Causes, Telemetry Required, and Proposed Actions.
4. **/priorities (Priority Matrix):** Interactive multi-dimensional matrix with P0/P1/P2/P3 badges, search, and prominent *"What I Would Fix First"* candidate FDE highlight.
5. **/recommendations (Recommendations):** Actionable PRD cards covering Booking, Tracking, Stability, Safety, and the ⭐ **Potential Quick Win** (Dismissible rating modal with A/B experiment spec).
6. **/product-backlog (Product Backlog):** Filterable, searchable table ranking all product initiatives with qualitative effort estimates and success metrics.
7. **/engineering (Engineering):** 5 deep technical investigations with telemetry requirements, decision gates, and acceptance criteria.
8. **/roadmap (30-60-90 Roadmap):** 3-phase horizontal visual implementation schedule (Phase 1: Instrumentation → Phase 2: Core Reliability → Phase 3: Algorithmic Scaling).
9. **/evidence (Evidence Explorer):** Searchable, filterable audit engine displaying verified public review records with star ratings, full text, and UUID hashes.

---

## 5. Data Sources & Epistemic Integrity
All dashboard views consume data compiled directly from the audited project artifacts:
- `outputs/rating-analysis/rating_analysis.json`
- `outputs/theme-analysis/theme_summary.json`
- `outputs/root-cause-analysis/root_cause_clusters.json`
- `outputs/prioritization/priority_matrix.json`
- `outputs/recommendations/recommendation_traceability.json`
- `outputs/final-submission/final_traceability.json`

### Strict Epistemic Discipline:
- **Zero Double-Counting:** Post-Update Crash Loops (14 reviews) and App Freezing (27 reviews) are maintained as separate clusters; no 41 combined figure is reported.
- **Qualified Discrepancies:** The ~3x ETA divergence is documented as reviewer-reported testimony; Google Maps is not treated as automatic ground truth.
- **Hypothesis Labeling:** All backend technical root causes are documented as hypotheses requiring internal telemetry validation.
- **No Fabricated Data:** 100% of review quotes and IDs originate from the collected 1,000 public review sample.

---

## 6. Analytical Limitations
- Based on a bounded public sample of 1,000 reviews; does not represent the entire historical Play Store database.
- Public reviews carry inherent self-selection bias toward acute negative experiences.
- October 2026 data represents a partial-month sample (81 reviews).
- Semantic analysis executed via a deterministic local NLP engine (GEMINI_API_KEY was not configured).

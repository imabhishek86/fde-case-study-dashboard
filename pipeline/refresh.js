/**
 * pipeline/refresh.js
 * 
 * Master One-Command Data Refresh Pipeline
 * 
 * Workflow:
 * 1. fetch_reviews: Ingest public Google Play reviews (google-play-scraper)
 * 2. clean_reviews: Validate schema, deduplicate, normalize dates
 * 3. classify_reviews: Deterministic semantic theme classification
 * 4. build_metrics: Write public JSON dataset, review metadata, and alerts
 */

import { fetchReviews } from './fetch_reviews.js';
import { cleanReviews } from './clean_reviews.js';
import { classifyReviews } from './classify_reviews.js';
import { buildMetrics } from './build_metrics.js';

export async function runRefresh() {
  const startTime = Date.now();
  console.log('============================================================');
  console.log('🚀 REPRODUCIBLE DATA REFRESH PIPELINE');
  console.log('============================================================\n');

  console.log('▶ [1/4] Fetching public Google Play reviews...');
  await fetchReviews();

  console.log('▶ [2/4] Cleaning & validating raw review schemas...');
  cleanReviews();

  console.log('▶ [3/4] Running deterministic semantic theme classification...');
  classifyReviews();

  console.log('▶ [4/4] Building metrics and updating dashboard evidence JSON...');
  buildMetrics();

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('============================================================');
  console.log(`✅ DATA REFRESH COMPLETE (${durationSec}s)`);
  console.log('Dashboard data is freshly generated and ready for deploy.');
  console.log('============================================================\n');
}

runRefresh().catch((err) => {
  console.error('❌ Data refresh pipeline failed:', err);
  process.exit(1);
});

/**
 * tests/data-integrity.test.js
 * 
 * Automated Data Integrity & Audit Test Suite
 * Validates data integrity, internal statistical consistency, cluster completeness,
 * and zero-PII compliance across dynamic/refreshable datasets.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '..', 'public', 'data', 'processed_reviews.json');
const META_PATH = path.join(__dirname, '..', 'public', 'data', 'review_metadata.json');

const VALID_NEGATIVE_CLUSTERS = new Set([
  'Roster and booking management failure',
  'App freezing and performance degradation',
  'Delayed or frozen live GPS tracking',
  'Driver behavioral issues and vehicle maintenance deficiencies',
  'Unfavorable UI redesign and workflow complexity',
  'OTP delivery latency, verification & session friction',
  'Low-information functional complaints',
  'Incorrect pickup/drop assignment and circuitous routing',
  'Post-update app launch crash loop',
  'Inaccurate or delayed ETA estimation',
  'Customer support and transport helpdesk responsiveness',
  'Safety concerns and compliance prompt friction',
  'Trip push notification delivery delays and false alerts',
  'Truly vague dissatisfaction'
]);

test('Data Integrity: processed_reviews.json exists and contains 1,000 valid records', () => {
  assert.ok(fs.existsSync(DATA_PATH), 'processed_reviews.json must exist');
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  const data = JSON.parse(raw);
  assert.ok(Array.isArray(data), 'Dataset must be an array');
  assert.equal(data.length, 1000, 'Dataset must contain exactly 1,000 reviews');

  const ids = new Set();
  data.forEach((r, idx) => {
    assert.ok(r.id, `Review at index ${idx} must have an id`);
    assert.ok(!ids.has(r.id), `Review ID ${r.id} must be unique`);
    ids.add(r.id);
    assert.ok(r.rating >= 1 && r.rating <= 5, `Rating ${r.rating} must be between 1 and 5`);
    assert.ok(typeof r.text === 'string', 'Review text must be string');
  });
});

test('Statistical Accuracy: Rating distribution is internally consistent', () => {
  const reviews = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let ratingSum = 0;

  reviews.forEach((r) => {
    counts[r.rating]++;
    ratingSum += r.rating;
  });

  // Rating counts sum must equal total dataset length
  const totalRatingCount = counts[1] + counts[2] + counts[3] + counts[4] + counts[5];
  assert.equal(totalRatingCount, reviews.length, 'Sum of rating counts must equal dataset length');
  assert.equal(reviews.length, 1000, 'Total review count must be 1,000');

  // Verify all rating bins are non-negative
  for (let rating = 1; rating <= 5; rating++) {
    assert.ok(counts[rating] >= 0, `Count for rating ${rating} must be non-negative`);
  }

  // Calculate dynamic average rating and ensure it lies within [1.0, 5.0]
  const avg = Number((ratingSum / reviews.length).toFixed(2));
  assert.ok(avg >= 1.0 && avg <= 5.0, `Average rating (${avg}) must be within [1.0, 5.0]`);

  // Category counts: negative (1-2★), neutral (3★), positive (4-5★)
  const negativeCount = counts[1] + counts[2];
  const neutralCount = counts[3];
  const positiveCount = counts[4] + counts[5];

  // Invariant: negative + neutral + positive === dataset length
  assert.equal(
    negativeCount + neutralCount + positiveCount,
    reviews.length,
    'Sum of negative, neutral, and positive reviews must equal dataset length'
  );
});

test('Cluster Reconciliation: Negative reviews have valid primaryCluster and sum matches', () => {
  const reviews = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const negReviews = reviews.filter((r) => r.rating <= 2);
  const totalNegative = negReviews.length;

  assert.ok(totalNegative > 0, 'Dataset must have negative reviews');

  const clusterCounts = {};
  negReviews.forEach((r, idx) => {
    // Invariant: every negative review must have a non-empty, string primaryCluster
    assert.ok(typeof r.primaryCluster === 'string' && r.primaryCluster.trim().length > 0,
      `Negative review at index ${idx} (id: ${r.id}) must have a non-empty primaryCluster`);

    // Invariant: primaryCluster must be one of the known valid failure mode clusters
    assert.ok(VALID_NEGATIVE_CLUSTERS.has(r.primaryCluster),
      `Negative review (id: ${r.id}) has unexpected primaryCluster: "${r.primaryCluster}"`);

    clusterCounts[r.primaryCluster] = (clusterCounts[r.primaryCluster] || 0) + 1;
  });

  // Invariant: sum of dynamic cluster counts must exactly equal total negative reviews
  const totalClusteredInNeg = Object.values(clusterCounts).reduce((a, b) => a + b, 0);
  assert.equal(totalClusteredInNeg, totalNegative, 'Sum of all negative cluster counts must exactly equal total negative reviews');

  // Invariant: each observed cluster count must be a positive integer
  Object.entries(clusterCounts).forEach(([clusterName, count]) => {
    assert.ok(count > 0, `Cluster "${clusterName}" count must be greater than 0`);
  });
});

test('Metadata Validation: review_metadata.json schema, bounds, and dataset invariants', () => {
  assert.ok(fs.existsSync(META_PATH), 'review_metadata.json must exist');
  const meta = JSON.parse(fs.readFileSync(META_PATH, 'utf-8'));
  const reviews = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

  assert.equal(meta.appId, 'com.moveinsync.ets', 'App ID must be com.moveinsync.ets');
  assert.equal(meta.country, 'in', 'Country must be in');
  assert.equal(meta.language, 'en', 'Language must be en');
  assert.equal(meta.reviewCount, 1000, 'Review count must be 1,000');
  assert.equal(meta.isBoundedSample, true, 'isBoundedSample must be true');
  assert.ok(meta.lastRefreshed, 'lastRefreshed timestamp must exist');

  // Invariant: dataset length === metadata.reviewCount
  assert.equal(reviews.length, meta.reviewCount, 'Dataset length must match metadata.reviewCount');
});

test('Privacy Assurance: Zero PII in public dataset', () => {
  const reviews = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /\b\d{10}\b/;

  reviews.forEach((r, idx) => {
    assert.ok(!emailRegex.test(r.text), `Review at index ${idx} contains email`);
    assert.ok(!phoneRegex.test(r.text), `Review at index ${idx} contains phone number`);
  });
});

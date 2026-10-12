/**
 * tests/data-integrity.test.js
 * 
 * Automated Data Integrity & Audit Test Suite
 * Validates that dashboard evidence JSON and statistical distributions match 100%.
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

test('Statistical Accuracy: Rating distribution counts and averages', () => {
  const reviews = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let sum = 0;

  reviews.forEach((r) => {
    counts[r.rating]++;
    sum += r.rating;
  });

  assert.equal(counts[5], 641, '5-star reviews must be 641 (64.1%)');
  assert.equal(counts[4], 42, '4-star reviews must be 42 (4.2%)');
  assert.equal(counts[3], 26, '3-star reviews must be 26 (2.6%)');
  assert.equal(counts[2], 33, '2-star reviews must be 33 (3.3%)');
  assert.equal(counts[1], 258, '1-star reviews must be 258 (25.8%)');

  const avg = Number((sum / reviews.length).toFixed(2));
  assert.equal(avg, 3.77, 'Average rating must be exactly 3.77');

  const negativeCount = counts[1] + counts[2];
  const positiveCount = counts[4] + counts[5];
  const neutralCount = counts[3];

  assert.equal(negativeCount, 291, 'Negative (1-2★) reviews must be exactly 291');
  assert.equal(positiveCount, 683, 'Positive (4-5★) reviews must be exactly 683');
  assert.equal(neutralCount, 26, 'Neutral (3★) reviews must be exactly 26');
});

test('Cluster Reconciliation: Negative complaint distribution within 1–2★ sums to 291', () => {
  const reviews = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const negReviews = reviews.filter((r) => r.rating <= 2);
  assert.equal(negReviews.length, 291, 'Total negative reviews must equal 291');

  const clusterCounts = {};
  negReviews.forEach((r) => {
    if (r.primaryCluster) {
      clusterCounts[r.primaryCluster] = (clusterCounts[r.primaryCluster] || 0) + 1;
    }
  });

  // Verify critical failure modes among 1-2★ negative complaints
  assert.equal(clusterCounts['Roster and booking management failure'], 30, 'Booking failure must be 30');
  assert.equal(clusterCounts['App freezing and performance degradation'], 27, 'App freezing must be 27');
  assert.equal(clusterCounts['Delayed or frozen live GPS tracking'], 25, 'Delayed GPS must be 25 in 1-2★');
  assert.equal(clusterCounts['Driver behavioral issues and vehicle maintenance deficiencies'], 22, 'Driver issues must be 22 in 1-2★');
  assert.equal(clusterCounts['Unfavorable UI redesign and workflow complexity'], 21, 'UI redesign must be 21 in 1-2★');
  assert.equal(clusterCounts['OTP delivery latency, verification & session friction'], 19, 'OTP latency must be 19 in 1-2★');
  assert.equal(clusterCounts['Low-information functional complaints'], 17, 'Low-info complaints must be 17 in 1-2★');
  assert.equal(clusterCounts['Incorrect pickup/drop assignment and circuitous routing'], 16, 'Circuitous routing must be 16 in 1-2★');
  assert.equal(clusterCounts['Post-update app launch crash loop'], 11, 'Crash loop must be 11 in 1-2★');
  assert.equal(clusterCounts['Inaccurate or delayed ETA estimation'], 10, 'ETA estimation must be 10 in 1-2★');
  assert.equal(clusterCounts['Customer support and transport helpdesk responsiveness'], 8, 'Support must be 8 in 1-2★');
  assert.equal(clusterCounts['Safety concerns and compliance prompt friction'], 6, 'Safety concerns must be 6 in 1-2★');
  assert.equal(clusterCounts['Trip push notification delivery delays and false alerts'], 4, 'Notifications must be 4 in 1-2★');
  assert.equal(clusterCounts['Truly vague dissatisfaction'], 75, 'Truly vague dissatisfaction must be 75 in 1-2★');

  const totalClusteredInNeg = Object.values(clusterCounts).reduce((a, b) => a + b, 0);
  assert.equal(totalClusteredInNeg, 291, 'Sum of all negative clusters must exactly equal 291');
});

test('Metadata Validation: review_metadata.json schema and bounds', () => {
  assert.ok(fs.existsSync(META_PATH), 'review_metadata.json must exist');
  const meta = JSON.parse(fs.readFileSync(META_PATH, 'utf-8'));

  assert.equal(meta.appId, 'com.moveinsync.ets', 'App ID must be com.moveinsync.ets');
  assert.equal(meta.country, 'in', 'Country must be in');
  assert.equal(meta.language, 'en', 'Language must be en');
  assert.equal(meta.reviewCount, 1000, 'Review count must be 1,000');
  assert.equal(meta.isBoundedSample, true, 'isBoundedSample must be true');
  assert.ok(meta.lastRefreshed, 'lastRefreshed timestamp must exist');
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

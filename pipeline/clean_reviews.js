/**
 * pipeline/clean_reviews.js
 * 
 * Pipeline Stage 2: Data Cleaning & Normalization
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function cleanReviews() {
  console.log('====================================================');
  console.log('🧹 STAGE 2: DATA INSPECTION AND CLEANING');
  console.log('====================================================');

  const rawPath = path.join(__dirname, 'data', 'raw', 'raw_reviews.json');
  const processedDir = path.join(__dirname, 'data', 'processed');
  const processedPath = path.join(processedDir, 'processed_reviews.json');
  const qualityReportPath = path.join(processedDir, 'data_quality_report.json');

  if (!fs.existsSync(rawPath)) {
    throw new Error(`Raw reviews file not found at ${rawPath}`);
  }

  if (!fs.existsSync(processedDir)) {
    fs.mkdirSync(processedDir, { recursive: true });
  }

  const rawReviews = JSON.parse(fs.readFileSync(rawPath, 'utf-8'));
  if (!Array.isArray(rawReviews)) {
    throw new Error('Raw reviews root element is not an array.');
  }

  const qualityMetrics = {
    totalInputReviews: rawReviews.length,
    totalOutputReviews: 0,
    duplicateCount: 0,
    missingReviewIdCount: 0,
    missingRatingCount: 0,
    missingTextCount: 0,
    missingDateCount: 0,
    invalidRatingCount: 0,
    emptyTextCount: 0,
    earliestDate: null,
    latestDate: null,
    ratingDistribution: {
      '5_star': 0,
      '4_star': 0,
      '3_star': 0,
      '2_star': 0,
      '1_star': 0
    },
    ratingCategoryDistribution: {
      positive: 0,
      neutral: 0,
      negative: 0
    }
  };

  const seenIds = new Set();
  const processed = [];
  let earliestDateObj = null;
  let latestDateObj = null;

  for (let i = 0; i < rawReviews.length; i++) {
    const rev = rawReviews[i];
    const reviewId = rev.id || rev.reviewId;

    if (!reviewId) {
      qualityMetrics.missingReviewIdCount++;
    } else {
      if (seenIds.has(reviewId)) {
        qualityMetrics.duplicateCount++;
        continue;
      }
      seenIds.add(reviewId);
    }

    const rawScore = rev.score !== undefined ? rev.score : rev.rating;
    if (rawScore === undefined || rawScore === null) {
      qualityMetrics.missingRatingCount++;
      continue;
    }

    const numRating = Number(rawScore);
    if (isNaN(numRating) || numRating < 1 || numRating > 5 || !Number.isInteger(numRating)) {
      qualityMetrics.invalidRatingCount++;
      continue;
    }

    let rawText = rev.text;
    if (rawText === undefined || rawText === null) {
      qualityMetrics.missingTextCount++;
      rawText = '';
    }

    const cleanedText = typeof rawText === 'string'
      ? rawText.trim().replace(/\s+/g, ' ')
      : String(rawText || '').trim();

    if (cleanedText.length === 0) {
      qualityMetrics.emptyTextCount++;
    }

    let isoDate = null;
    let reviewDate = null;
    let reviewMonth = null;

    if (!rev.date) {
      qualityMetrics.missingDateCount++;
      isoDate = new Date().toISOString();
      reviewDate = isoDate.split('T')[0];
      reviewMonth = reviewDate.substring(0, 7);
    } else {
      const d = new Date(rev.date);
      if (isNaN(d.getTime())) {
        qualityMetrics.missingDateCount++;
        isoDate = new Date().toISOString();
        reviewDate = isoDate.split('T')[0];
        reviewMonth = reviewDate.substring(0, 7);
      } else {
        isoDate = d.toISOString();
        reviewDate = isoDate.split('T')[0];
        reviewMonth = reviewDate.substring(0, 7);
        if (!earliestDateObj || d < earliestDateObj) earliestDateObj = d;
        if (!latestDateObj || d > latestDateObj) latestDateObj = d;
      }
    }

    const starKey = `${numRating}_star`;
    qualityMetrics.ratingDistribution[starKey]++;

    let ratingCategory = 'neutral';
    if (numRating >= 4) {
      ratingCategory = 'positive';
      qualityMetrics.ratingCategoryDistribution.positive++;
    } else if (numRating <= 2) {
      ratingCategory = 'negative';
      qualityMetrics.ratingCategoryDistribution.negative++;
    } else {
      qualityMetrics.ratingCategoryDistribution.neutral++;
    }

    processed.push({
      id: reviewId || `generated-${i}`,
      userName: rev.userName || 'Play Store User',
      rating: numRating,
      text: cleanedText,
      cleanedText,
      textLength: cleanedText.length,
      ratingCategory,
      date: isoDate,
      reviewDate,
      reviewMonth,
      thumbsUpCount: Number(rev.thumbsUpCount || rev.thumbsUp || 0),
      version: rev.version || rev.appVersion || 'Unspecified',
      collectedSort: rev.collectedSort || 'UNKNOWN'
    });
  }

  qualityMetrics.totalOutputReviews = processed.length;
  qualityMetrics.earliestDate = earliestDateObj ? earliestDateObj.toISOString() : null;
  qualityMetrics.latestDate = latestDateObj ? latestDateObj.toISOString() : null;

  fs.writeFileSync(processedPath, JSON.stringify(processed, null, 2), 'utf-8');
  fs.writeFileSync(qualityReportPath, JSON.stringify(qualityMetrics, null, 2), 'utf-8');

  console.log(`✅ Cleaned ${processed.length} reviews saved to ${processedPath}`);
  console.log(`✅ Quality report saved to ${qualityReportPath}\n`);

  return { processedReviews: processed, qualityMetrics };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    cleanReviews();
  } catch (err) {
    console.error('❌ Clean failed:', err);
    process.exit(1);
  }
}

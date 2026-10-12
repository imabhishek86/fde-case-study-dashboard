/**
 * pipeline/fetch_reviews.js
 * 
 * Pipeline Stage 1: Public Google Play Review Collection
 * 
 * Notice:
 * "This pipeline uses a bounded public sample of Google Play reviews and is
 * subject to public-source availability, pagination limits, rate limits and sampling bias."
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gplayPkg from 'google-play-scraper';

const gplay = gplayPkg.default || gplayPkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_ID = 'com.moveinsync.ets';
const COUNTRY = 'in';
const LANG = 'en';
const MAX_REVIEWS = 1000;
const BATCH_SIZE = 150;
const DELAY_MS = 500;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchCohort(sortType, sortName, existingMap, targetLimit, errorsList) {
  let nextToken = null;
  let page = 1;

  while (existingMap.size < targetLimit) {
    try {
      const options = {
        appId: APP_ID,
        lang: LANG,
        country: COUNTRY,
        sort: sortType,
        num: BATCH_SIZE,
        paginate: true
      };

      if (nextToken) {
        options.nextPaginationToken = nextToken;
      }

      const result = await gplay.reviews(options);
      const reviews = result.data || [];

      if (!reviews.length) {
        break;
      }

      let newAdded = 0;
      for (const rev of reviews) {
        if (!existingMap.has(rev.id)) {
          existingMap.set(rev.id, {
            ...rev,
            collectedSort: sortName
          });
          newAdded++;
          if (existingMap.size >= targetLimit) {
            break;
          }
        }
      }

      console.log(`  [${sortName}] Page ${page}: fetched ${reviews.length} reviews (${newAdded} new unique). Total: ${existingMap.size}/${targetLimit}`);

      nextToken = result.nextPaginationToken;
      if (!nextToken || existingMap.size >= targetLimit) {
        break;
      }

      page++;
      await sleep(DELAY_MS);
    } catch (err) {
      console.warn(`  [${sortName}] Warning on page ${page}:`, err.message);
      errorsList.push({
        sort: sortName,
        page,
        error: err.message,
        timestamp: new Date().toISOString()
      });
      break;
    }
  }
}

export async function fetchReviews() {
  console.log('====================================================');
  console.log('🔄 STAGE 1: GOOGLE PLAY REVIEW COLLECTION');
  console.log(`App ID:      ${APP_ID}`);
  console.log(`Country:     ${COUNTRY}`);
  console.log(`Language:    ${LANG}`);
  console.log(`Target:      ${MAX_REVIEWS} bounded public sample`);
  console.log('====================================================');

  const rawDir = path.join(__dirname, 'data', 'raw');
  const rawReviewsPath = path.join(rawDir, 'raw_reviews.json');
  const metadataPath = path.join(rawDir, 'collection_metadata.json');

  if (!fs.existsSync(rawDir)) {
    fs.mkdirSync(rawDir, { recursive: true });
  }

  const reviewsMap = new Map();
  const errorsList = [];

  try {
    // Pass 1: NEWEST reviews
    await fetchCohort(gplay.sort.NEWEST, 'NEWEST', reviewsMap, MAX_REVIEWS, errorsList);

    // Pass 2: HELPFULNESS supplement if needed
    if (reviewsMap.size < MAX_REVIEWS) {
      console.log(`\n  Fetching HELPFULNESS cohort to reach ${MAX_REVIEWS}...`);
      await fetchCohort(gplay.sort.HELPFULNESS, 'HELPFULNESS', reviewsMap, MAX_REVIEWS, errorsList);
    }
  } catch (netErr) {
    console.warn('  ⚠️ Live Google Play collection warning:', netErr.message);
  }

  let allReviews = Array.from(reviewsMap.values());

  // Fallback to existing raw file if network failed completely
  if (allReviews.length === 0 && fs.existsSync(rawReviewsPath)) {
    console.log('  ℹ️ Live fetch returned 0 reviews (e.g. offline/rate limit). Using cached raw snapshot.');
    try {
      allReviews = JSON.parse(fs.readFileSync(rawReviewsPath, 'utf-8'));
    } catch {
      // ignore
    }
  }

  // Also check workspace root raw data as fallback
  if (allReviews.length === 0) {
    const rootRaw = path.join(__dirname, '..', '..', 'data', 'raw', 'raw_reviews.json');
    if (fs.existsSync(rootRaw)) {
      console.log('  ℹ️ Ingesting cached raw reviews from data/raw/raw_reviews.json.');
      allReviews = JSON.parse(fs.readFileSync(rootRaw, 'utf-8'));
    }
  }

  if (allReviews.length === 0) {
    throw new Error('No reviews collected and no raw snapshot found.');
  }

  if (allReviews.length > MAX_REVIEWS) {
    allReviews = allReviews.slice(0, MAX_REVIEWS);
  }

  // Calculate rating stats
  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let earliestDate = null;
  let latestDate = null;

  allReviews.forEach((r) => {
    const score = Math.round(r.score || 0);
    if (ratingCounts[score] !== undefined) {
      ratingCounts[score]++;
    }
    if (r.date) {
      const d = new Date(r.date);
      if (!isNaN(d.getTime())) {
        if (!earliestDate || d < earliestDate) earliestDate = d;
        if (!latestDate || d > latestDate) latestDate = d;
      }
    }
  });

  const metadata = {
    appId: APP_ID,
    country: COUNTRY,
    language: LANG,
    requestedReviewCount: MAX_REVIEWS,
    retrievedReviewCount: allReviews.length,
    collectionTimestamp: new Date().toISOString(),
    earliestReviewDate: earliestDate ? earliestDate.toISOString() : 'N/A',
    latestReviewDate: latestDate ? latestDate.toISOString() : 'N/A',
    sortingMethod: 'NEWEST with HELPFULNESS supplement for bounded sample',
    ratingBreakdown: {
      '5_star': ratingCounts[5],
      '4_star': ratingCounts[4],
      '3_star': ratingCounts[3],
      '2_star': ratingCounts[2],
      '1_star': ratingCounts[1]
    },
    errors: errorsList,
    note: 'This pipeline uses a bounded public sample of Google Play reviews and is subject to public-source availability, pagination limits, rate limits and sampling bias.'
  };

  fs.writeFileSync(rawReviewsPath, JSON.stringify(allReviews, null, 2), 'utf-8');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');

  console.log(`✅ Collected ${allReviews.length} reviews saved to ${rawReviewsPath}`);
  console.log(`✅ Collection metadata saved to ${metadataPath}\n`);

  return { reviews: allReviews, metadata };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchReviews().catch((err) => {
    console.error('❌ Fetch failed:', err);
    process.exit(1);
  });
}

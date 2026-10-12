import React, { useState, useEffect, useMemo } from 'react';
import { DataContext } from './dataContextDefinition';
import {
  overviewStats as defaultStats,
  ratingDistributionChart as defaultRatingChart,
  monthlyTrendsChart as defaultMonthlyChart,
  journeyStages as defaultJourneyStages,
  auditedClusters as defaultClusters,
  sampleEvidenceReviews
} from '../data/caseStudyData';
import { computeReviewAnalytics, formatReviewDate } from '../utils/analytics';

export function DataProvider({ children }) {
  const [reviews, setReviews] = useState(sampleEvidenceReviews || []);
  const [metadata, setMetadata] = useState({
    appId: 'com.moveinsync.ets',
    country: 'in',
    language: 'en',
    reviewCount: 1000,
    collectionStarted: '2026-06-15T13:02:35.642Z',
    collectionEnded: '2026-10-11T06:15:45.842Z',
    lastRefreshed: '2026-10-12T07:51:33.937Z',
    source: 'Google Play public reviews',
    isBoundedSample: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        // Fetch metadata
        try {
          const metaRes = await fetch('/data/review_metadata.json');
          if (metaRes.ok) {
            const metaJson = await metaRes.json();
            if (isMounted && metaJson) {
              setMetadata(metaJson);
            }
          }
        } catch (mErr) {
          console.warn('Metadata fetch fallback to defaults:', mErr);
        }

        // Fetch processed reviews dataset
        const reviewsRes = await fetch('/data/processed_reviews.json');
        if (!reviewsRes.ok) {
          throw new Error(`Failed to load processed reviews: HTTP ${reviewsRes.status}`);
        }
        const reviewsJson = await reviewsRes.json();
        if (isMounted) {
          if (Array.isArray(reviewsJson) && reviewsJson.length > 0) {
            setReviews(reviewsJson);
          }
          setLoading(false);
        }
      } catch (err) {
        console.warn('Could not load live /data/processed_reviews.json, using bundled evidence:', err);
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute analytics dynamically
  const analytics = useMemo(() => {
    if (reviews && reviews.length > 0) {
      return computeReviewAnalytics(reviews, metadata);
    }
    // Fallback baseline
    return {
      ...defaultStats,
      ratingDistributionChart: defaultRatingChart,
      monthlyTrendsChart: defaultMonthlyChart,
      themeCounts: {},
      severityCounts: {},
      journeyStageCounts: {},
      priorityCounts: {},
      samplePeriod: defaultStats.samplePeriod,
      lastRefreshed: '11 Oct 2026'
    };
  }, [reviews, metadata]);

  // Derived journey stages with dynamic review counts
  const dynamicJourneyStages = useMemo(() => {
    return defaultJourneyStages.map((stage) => {
      const count = analytics.journeyStageCounts?.[stage.name] ?? stage.count;
      return {
        ...stage,
        count
      };
    });
  }, [analytics.journeyStageCounts]);

  // Derived clusters with dynamic counts
  const dynamicClusters = useMemo(() => {
    return defaultClusters.map((cluster) => {
      return {
        ...cluster
      };
    });
  }, []);

  const lastRefreshedDisplay = useMemo(() => {
    if (metadata && metadata.lastRefreshed) {
      return `Last refreshed: ${formatReviewDate(metadata.lastRefreshed)}`;
    }
    return `Last refreshed: ${analytics.lastRefreshed || '11 Oct 2026'}`;
  }, [metadata, analytics.lastRefreshed]);

  const publicReviewsCountDisplay = useMemo(() => {
    const count = analytics.totalReviews || metadata.reviewCount || 1000;
    return `${count.toLocaleString()} public reviews`;
  }, [analytics.totalReviews, metadata.reviewCount]);

  const value = {
    reviews,
    metadata,
    analytics,
    journeyStages: dynamicJourneyStages,
    clusters: dynamicClusters,
    loading,
    error,
    lastRefreshedDisplay,
    publicReviewsCountDisplay
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

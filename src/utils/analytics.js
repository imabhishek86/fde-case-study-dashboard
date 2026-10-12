/**
 * Dynamic Analytics Engine
 * Computes core dashboard metrics dynamically from processed_reviews.json.
 */

export function formatReviewDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return String(dateString);
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return String(dateString);
  }
}

export function computeReviewAnalytics(reviews = [], metadata = {}) {
  const totalReviews = reviews.length || 0;

  if (totalReviews === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      star1Count: 0,
      star2Count: 0,
      star3Count: 0,
      star4Count: 0,
      star5Count: 0,
      negativeCount: 0,
      negativePercentage: 0,
      positiveCount: 0,
      positivePercentage: 0,
      neutralCount: 0,
      neutralPercentage: 0,
      ratingDistributionChart: [],
      monthlyTrendsChart: [],
      themeCounts: {},
      severityCounts: {},
      journeyStageCounts: {},
      priorityCounts: {},
      clusterCounts: {},
      samplePeriod: 'N/A',
      lastRefreshed: 'N/A'
    };
  }

  const starCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let ratingSum = 0;
  const themeCounts = {};
  const severityCounts = {};
  const journeyStageCounts = {};
  const priorityCounts = {};
  const clusterCounts = {};

  const monthlyBuckets = {};

  let earliestDate = null;
  let latestDate = null;

  for (let i = 0; i < totalReviews; i++) {
    const r = reviews[i];
    const score = Math.min(5, Math.max(1, Math.round(Number(r.rating || r.score || 0))));
    if (starCounts[score] !== undefined) {
      starCounts[score]++;
    }
    ratingSum += score;

    // Themes
    const theme = r.primaryTheme || 'Other';
    themeCounts[theme] = (themeCounts[theme] || 0) + 1;

    // Severity
    const severity = r.severity || 'None';
    severityCounts[severity] = (severityCounts[severity] || 0) + 1;

    // Journey stages
    const journey = r.journeyStage || 'General Commute Experience';
    journeyStageCounts[journey] = (journeyStageCounts[journey] || 0) + 1;

    // Priority
    const priority = r.priority || 'None';
    priorityCounts[priority] = (priorityCounts[priority] || 0) + 1;

    // Clusters
    if (r.primaryCluster) {
      clusterCounts[r.primaryCluster] = (clusterCounts[r.primaryCluster] || 0) + 1;
    }

    // Date analysis
    if (r.date) {
      const d = new Date(r.date);
      if (!isNaN(d.getTime())) {
        if (!earliestDate || d < earliestDate) earliestDate = d;
        if (!latestDate || d > latestDate) latestDate = d;

        const monthKey = r.date.substring(0, 7); // YYYY-MM
        if (!monthlyBuckets[monthKey]) {
          monthlyBuckets[monthKey] = {
            monthKey,
            count: 0,
            sum: 0,
            negCount: 0,
            posCount: 0
          };
        }
        monthlyBuckets[monthKey].count++;
        monthlyBuckets[monthKey].sum += score;
        if (score <= 2) monthlyBuckets[monthKey].negCount++;
        if (score >= 4) monthlyBuckets[monthKey].posCount++;
      }
    }
  }

  const averageRating = Number((ratingSum / totalReviews).toFixed(2));
  const negativeCount = starCounts[1] + starCounts[2];
  const negativePercentage = Number(((negativeCount / totalReviews) * 100).toFixed(1));
  const positiveCount = starCounts[4] + starCounts[5];
  const positivePercentage = Number(((positiveCount / totalReviews) * 100).toFixed(1));
  const neutralCount = starCounts[3];
  const neutralPercentage = Number(((neutralCount / totalReviews) * 100).toFixed(1));

  // Dynamic Rating Distribution Chart
  const ratingDistributionChart = [
    {
      star: '5★',
      count: starCounts[5],
      percentage: Number(((starCounts[5] / totalReviews) * 100).toFixed(1)),
      color: '#10b981'
    },
    {
      star: '4★',
      count: starCounts[4],
      percentage: Number(((starCounts[4] / totalReviews) * 100).toFixed(1)),
      color: '#34d399'
    },
    {
      star: '3★',
      count: starCounts[3],
      percentage: Number(((starCounts[3] / totalReviews) * 100).toFixed(1)),
      color: '#fbbf24'
    },
    {
      star: '2★',
      count: starCounts[2],
      percentage: Number(((starCounts[2] / totalReviews) * 100).toFixed(1)),
      color: '#f87171'
    },
    {
      star: '1★',
      count: starCounts[1],
      percentage: Number(((starCounts[1] / totalReviews) * 100).toFixed(1)),
      color: '#ef4444'
    }
  ];

  // Dynamic Monthly Trends Chart
  const sortedMonths = Object.keys(monthlyBuckets).sort();
  const monthLabels = {
    '2026-06': 'Jun 2026',
    '2026-07': 'Jul 2026',
    '2026-08': 'Aug 2026',
    '2026-09': 'Sep 2026',
    '2026-10': 'Oct 2026 (Partial)'
  };

  const monthlyTrendsChart = sortedMonths.map((mKey) => {
    const b = monthlyBuckets[mKey];
    return {
      month: monthLabels[mKey] || mKey,
      monthKey: mKey,
      reviews: b.count,
      averageRating: Number((b.sum / b.count).toFixed(2)),
      negativeReviews: b.negCount,
      negativePercentage: Number(((b.negCount / b.count) * 100).toFixed(1)),
      positiveReviews: b.posCount
    };
  });

  const samplePeriod = earliestDate && latestDate
    ? `${formatReviewDate(earliestDate)} – ${formatReviewDate(latestDate)}`
    : 'June 15, 2026 – October 11, 2026';

  const lastRefreshed = metadata.lastRefreshed
    ? formatReviewDate(metadata.lastRefreshed)
    : formatReviewDate(latestDate || new Date());

  return {
    totalReviews,
    averageRating,
    star1Count: starCounts[1],
    star2Count: starCounts[2],
    star3Count: starCounts[3],
    star4Count: starCounts[4],
    star5Count: starCounts[5],
    negativeCount,
    negativePercentage,
    positiveCount,
    positivePercentage,
    neutralCount,
    neutralPercentage,
    ratingDistributionChart,
    monthlyTrendsChart,
    themeCounts,
    severityCounts,
    journeyStageCounts,
    priorityCounts,
    clusterCounts,
    samplePeriod,
    lastRefreshed,
    rawMetadata: metadata
  };
}

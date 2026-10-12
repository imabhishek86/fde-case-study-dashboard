/**
 * pipeline/classify_reviews.js
 * 
 * Pipeline Stage 3: Deterministic Semantic Theme Classification
 * 
 * Notice:
 * "A deterministic local semantic analysis engine was used for reproducible
 * classification and hypothesis generation. A live Gemini API call was not used
 * because no Gemini API key was configured."
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 11 Taxonomy Themes
export const THEMES = [
  'Booking',
  'Tracking_GPS_ETA',
  'App_Performance',
  'UI_UX',
  'Pickup_Route',
  'Driver_Vehicle',
  'Notifications',
  'Login_OTP',
  'Support',
  'Safety',
  'Other'
];

const THEME_RULES = {
  Booking: {
    phrases: [
      /\bunable to book\b/i, /\bcannot book\b/i, /\bfailed to book\b/i, /\bbooking failed\b/i,
      /\bbooking issue\b/i, /\bbooking not\b/i, /\bcab booking\b/i, /\btrip booking\b/i,
      /\bauto book\b/i, /\bbooking unavailable\b/i, /\broster not updating\b/i, /\broster schedule\b/i,
      /\bcancel booking\b/i, /\bno slot\b/i, /\bwaitlist\b/i, /\bbooking cancelled\b/i,
      /\bcancellation\b/i, /\bcancel ride\b/i, /\bmodify trip\b/i
    ],
    keywords: [
      /\bbook\b/i, /\bbooking\b/i, /\bbookings\b/i, /\bbooked\b/i,
      /\broster\b/i, /\brosters\b/i, /\bschedule\b/i, /\bschedules\b/i,
      /\bcancel\b/i, /\bcancelling\b/i, /\bseat\b/i, /\bseats\b/i, /\bslot\b/i, /\bslots\b/i
    ]
  },
  Tracking_GPS_ETA: {
    phrases: [
      /\blive track\b/i, /\blive tracking\b/i, /\bgps not\b/i, /\bwrong location\b/i,
      /\bwrong eta\b/i, /\binaccurate eta\b/i, /\beta calculator\b/i, /\bgoogle maps\b/i,
      /\bcar location\b/i, /\bcab location\b/i, /\bvehicle location\b/i, /\bvan location\b/i,
      /\btrack the location\b/i, /\bunable to track\b/i, /\bstop tracking\b/i, /\bnot tracking\b/i,
      /\bdelay tracking\b/i, /\breal time\b/i, /\breach time\b/i, /\barrival time\b/i
    ],
    keywords: [
      /\bgps\b/i, /\btracking\b/i, /\btrack\b/i, /\beta\b/i, /\blocation\b/i,
      /\bmap\b/i, /\bmaps\b/i, /\bnavigation\b/i, /\bwhereabouts\b/i
    ]
  },
  App_Performance: {
    phrases: [
      /\bapp crash\b/i, /\bapp crashes\b/i, /\bkeeps crashing\b/i, /\bcrashing again\b/i,
      /\bapp freeze\b/i, /\bfreezing\b/i, /\bblack screen\b/i, /\bwhite screen\b/i,
      /\bblank screen\b/i, /\bnot opening\b/i, /\bunable to open\b/i, /\bcannot open\b/i,
      /\bforce close\b/i, /\bkeeps stopping\b/i, /\breinstall\b/i, /\buninstall\b/i,
      /\bloading problem\b/i, /\btakes forever to open\b/i, /\bvery slow\b/i, /\blagging\b/i,
      /\bbattery drain\b/i, /\bhanging\b/i, /\bapp hang\b/i
    ],
    keywords: [
      /\bcrash\b/i, /\bcrashes\b/i, /\bcrashing\b/i, /\bcrashed\b/i,
      /\bfreeze\b/i, /\bfreezes\b/i, /\bhung\b/i, /\bhang\b/i, /\bhangs\b/i,
      /\blag\b/i, /\blags\b/i, /\bslow\b/i, /\bglitch\b/i, /\bglitches\b/i,
      /\bbug\b/i, /\bbugs\b/i, /\bstuck\b/i, /\bloading\b/i
    ]
  },
  UI_UX: {
    phrases: [
      /\buser interface\b/i, /\bconfusing interface\b/i, /\bbad redesign\b/i, /\bnew update made it worse\b/i,
      /\bbring the old version\b/i, /\bbring back old\b/i, /\bold version was\b/i, /\bdislike the new update\b/i,
      /\bextra click\b/i, /\bextra clicks\b/i, /\bone click\b/i, /\bno skip option\b/i,
      /\bforcing me to\b/i, /\bdifficult to use\b/i, /\bhard to navigate\b/i, /\bcomplicated to use\b/i,
      /\bmonthly view\b/i, /\bday view\b/i, /\bdark mode\b/i, /\bconfusing features\b/i
    ],
    keywords: [
      /\bui\b/i, /\bux\b/i, /\binterface\b/i, /\bdesign\b/i, /\blayout\b/i,
      /\bconfusing\b/i, /\bcomplicated\b/i, /\bcluttered\b/i, /\bnavigation\b/i,
      /\bpopup\b/i, /\bpop up\b/i, /\bupdate\b/i, /\bfont\b/i, /\blook\b/i
    ]
  },
  Pickup_Route: {
    phrases: [
      /\bwrong pickup\b/i, /\bpickup point\b/i, /\bdrop point\b/i, /\bpickup location\b/i,
      /\blong route\b/i, /\blong detour\b/i, /\bdetour\b/i, /\bdetours\b/i, /\bcircuits\b/i,
      /\bwrong route\b/i, /\btook another route\b/i, /\bboarded another cab\b/i,
      /\btoo many stops\b/i, /\bfirst pickup last drop\b/i, /\broute is too long\b/i,
      /\bextra travel time\b/i, /\bcircuitous\b/i, /\bbharat darshan\b/i
    ],
    keywords: [
      /\broute\b/i, /\broutes\b/i, /\brouting\b/i, /\bdetour\b/i, /\bdetours\b/i,
      /\bpickup\b/i, /\bpick up\b/i, /\bdrop\b/i, /\bdrops\b/i, /\bstop\b/i, /\bstops\b/i
    ]
  },
  Driver_Vehicle: {
    phrases: [
      /\bdriver behavior\b/i, /\brude driver\b/i, /\bunprofessional driver\b/i,
      /\bac not working\b/i, /\bno ac\b/i, /\bbroken ac\b/i, /\bdirty cab\b/i,
      /\bsmelly cab\b/i, /\brash driving\b/i, /\boverspeeding\b/i, /\bdriver cancelled\b/i,
      /\bdriver not calling\b/i, /\bdriver phone switched off\b/i, /\bdriver refused\b/i
    ],
    keywords: [
      /\bdriver\b/i, /\bdrivers\b/i, /\bcab condition\b/i, /\bac\b/i, /\bair condition\b/i,
      /\bcleanliness\b/i, /\bhygiene\b/i, /\bspeeding\b/i, /\brude\b/i, /\bbehavior\b/i, /\bbehaviour\b/i
    ]
  },
  Notifications: {
    phrases: [
      /\bno notification\b/i, /\bdelayed notification\b/i, /\bpush notification\b/i,
      /\balert not received\b/i, /\bsms not received\b/i, /\bnotification delay\b/i
    ],
    keywords: [
      /\bnotification\b/i, /\bnotifications\b/i, /\balert\b/i, /\balerts\b/i,
      /\bmessage\b/i, /\bmessages\b/i, /\bsms\b/i, /\bnotify\b/i
    ]
  },
  Login_OTP: {
    phrases: [
      /\botp not coming\b/i, /\botp delay\b/i, /\bfailed to login\b/i, /\bcannot login\b/i,
      /\bunable to login\b/i, /\bsession expired\b/i, /\blogged out automatically\b/i,
      /\bseat belt popup\b/i, /\bview otp\b/i, /\bboard otp\b/i
    ],
    keywords: [
      /\botp\b/i, /\blogin\b/i, /\blog in\b/i, /\bsign in\b/i, /\bpassword\b/i,
      /\bauthentication\b/i, /\blogout\b/i, /\blog out\b/i, /\bseatbelt\b/i
    ]
  },
  Support: {
    phrases: [
      /\bcustomer support\b/i, /\bhelp desk\b/i, /\bhelpdesk\b/i, /\bno response from support\b/i,
      /\bunresolved issue\b/i, /\bticket closed\b/i, /\bescalation\b/i, /\bcare number\b/i
    ],
    keywords: [
      /\bsupport\b/i, /\bhelpdesk\b/i, /\bhelpline\b/i, /\bcare\b/i, /\bticket\b/i,
      /\bcall center\b/i, /\bexecutive\b/i
    ]
  },
  Safety: {
    phrases: [
      /\bunsafe driving\b/i, /\bemergency button\b/i, /\bsos\b/i, /\bnight drop safety\b/i,
      /\bescort guard\b/i, /\bsecurity issue\b/i, /\bharassment\b/i, /\bfrightened\b/i
    ],
    keywords: [
      /\bsafety\b/i, /\bemergency\b/i, /\bsos\b/i, /\bescort\b/i, /\bguard\b/i,
      /\bsecurity\b/i, /\bharass\b/i, /\bunsafe\b/i
    ]
  }
};

export function classifySingleReview(text, rating) {
  const t = text.toLowerCase();
  const scores = {};
  THEMES.forEach((theme) => {
    scores[theme] = 0;
  });

  for (const theme of Object.keys(THEME_RULES)) {
    const rule = THEME_RULES[theme];
    for (const phrase of rule.phrases) {
      if (phrase.test(t)) {
        scores[theme] += 3;
      }
    }
    for (const kw of rule.keywords) {
      if (kw.test(t)) {
        scores[theme] += 1;
      }
    }
  }

  const sortedThemes = Object.keys(scores)
    .filter((th) => th !== 'Other' && scores[th] > 0)
    .sort((a, b) => scores[b] - scores[a]);

  let primaryTheme = 'Other';
  const secondaryThemes = [];

  if (sortedThemes.length > 0) {
    primaryTheme = sortedThemes[0];
    for (let i = 1; i < sortedThemes.length; i++) {
      if (scores[sortedThemes[i]] >= 2 || secondaryThemes.length < 2) {
        secondaryThemes.push(sortedThemes[i]);
      }
    }
  }

  // Sentiment
  const sentiment = rating >= 4 ? 'positive' : rating === 3 ? 'neutral' : 'negative';
  const complaintFlag = rating <= 3 && primaryTheme !== 'Other';

  // Severity
  let severity = 'None';
  if (rating <= 2) {
    if (primaryTheme === 'Safety' || /emergency|harass|unsafe|sos/i.test(t)) {
      severity = 'Critical';
    } else if (
      primaryTheme === 'Booking' ||
      primaryTheme === 'App_Performance' ||
      primaryTheme === 'Tracking_GPS_ETA'
    ) {
      severity = 'High';
    } else {
      severity = 'Medium';
    }
  } else if (rating === 3) {
    severity = 'Low';
  }

  // Journey stage
  let journeyStage = 'General Commute Experience';
  switch (primaryTheme) {
    case 'Booking':
      journeyStage = 'Trip Booking & Roster Sync';
      break;
    case 'Tracking_GPS_ETA':
      journeyStage = 'Curbside Waiting & Live GPS';
      break;
    case 'App_Performance':
      journeyStage = /crash|open|start/i.test(t)
        ? 'Pre-Commute Launch (Startup)'
        : 'In-Transit Ride Interaction';
      break;
    case 'Pickup_Route':
      journeyStage = 'Pickup & Route Optimization';
      break;
    case 'Driver_Vehicle':
      journeyStage = 'Trip / In-Cabin Comfort';
      break;
    case 'Login_OTP':
      journeyStage = 'Boarding Gate & Verification';
      break;
    case 'Notifications':
      journeyStage = 'Vehicle Assignment Alerts';
      break;
    case 'Support':
      journeyStage = 'Exception Handling & Support';
      break;
    case 'Safety':
      journeyStage = 'Safety, Emergency & Boarding';
      break;
    case 'UI_UX':
      journeyStage = 'Post-Trip Feedback & General UX';
      break;
    default:
      journeyStage = 'General Commute Experience';
  }

  // Primary Cluster mapping
  let primaryCluster = 'Unclustered functional feedback';
  let priority = 'None';

  if (rating >= 4) {
    primaryCluster = 'None (Positive feedback)';
    priority = 'None';
  } else if (primaryTheme === 'Booking') {
    primaryCluster = 'Roster and booking management failure';
    priority = 'P0';
  } else if (primaryTheme === 'Tracking_GPS_ETA') {
    if (/eta|time|reach/i.test(t)) {
      primaryCluster = 'Inaccurate or delayed ETA estimation';
      priority = 'P1';
    } else {
      primaryCluster = 'Delayed or frozen live GPS tracking';
      priority = 'P0';
    }
  } else if (primaryTheme === 'App_Performance') {
    if (/crash|reinstall|open|startup/i.test(t)) {
      primaryCluster = 'Post-update app launch crash loop';
      priority = 'P0';
    } else {
      primaryCluster = 'App freezing and performance degradation';
      priority = 'P1';
    }
  } else if (primaryTheme === 'Pickup_Route') {
    primaryCluster = 'Incorrect pickup/drop assignment and circuitous routing';
    priority = 'P1';
  } else if (primaryTheme === 'Driver_Vehicle') {
    primaryCluster = 'Driver behavioral issues and vehicle maintenance deficiencies';
    priority = 'P1';
  } else if (primaryTheme === 'Login_OTP') {
    primaryCluster = 'OTP delivery latency, verification & session friction';
    priority = 'P2';
  } else if (primaryTheme === 'UI_UX') {
    primaryCluster = 'Unfavorable UI redesign and workflow complexity';
    priority = 'P2';
  } else if (primaryTheme === 'Support') {
    primaryCluster = 'Customer support and transport helpdesk responsiveness';
    priority = 'P2';
  } else if (primaryTheme === 'Safety') {
    primaryCluster = 'Safety concerns and compliance prompt friction';
    priority = 'P0';
  } else if (primaryTheme === 'Notifications') {
    primaryCluster = 'Trip push notification delivery delays and false alerts';
    priority = 'P2';
  } else {
    if (rating <= 2) {
      if (text.length < 25 && /worst|bekar|pathetic|bad|horrible|useless/i.test(t)) {
        primaryCluster = 'Truly vague dissatisfaction';
        priority = 'P3';
      } else {
        primaryCluster = 'Low-information functional complaints';
        priority = 'P3';
      }
    }
  }

  return {
    primaryTheme,
    secondaryThemes,
    sentiment,
    complaintFlag,
    severity,
    journeyStage,
    primaryCluster,
    priority
  };
}

export function classifyReviews() {
  console.log('====================================================');
  console.log('🏷️ STAGE 3: DETERMINISTIC THEME CLASSIFICATION');
  console.log('====================================================');

  const processedPath = path.join(__dirname, 'data', 'processed', 'processed_reviews.json');
  if (!fs.existsSync(processedPath)) {
    throw new Error(`Processed reviews file not found at ${processedPath}`);
  }

  const reviews = JSON.parse(fs.readFileSync(processedPath, 'utf-8'));
  const classified = reviews.map((r) => {
    const c = classifySingleReview(r.text, r.rating);
    return {
      ...r,
      ...c
    };
  });

  const classifiedDir = path.join(__dirname, 'data', 'classified');
  if (!fs.existsSync(classifiedDir)) {
    fs.mkdirSync(classifiedDir, { recursive: true });
  }

  const classifiedPath = path.join(classifiedDir, 'classified_reviews.json');
  fs.writeFileSync(classifiedPath, JSON.stringify(classified, null, 2), 'utf-8');

  console.log(`✅ Classified ${classified.length} reviews saved to ${classifiedPath}\n`);
  return { classifiedReviews: classified };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    classifyReviews();
  } catch (err) {
    console.error('❌ Classification failed:', err);
    process.exit(1);
  }
}

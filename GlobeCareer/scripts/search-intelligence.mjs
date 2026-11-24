#!/usr/bin/env node
/**
 * Search Intelligence report builder for GlobeCareer.online.
 *
 * Turns Google Search Console CSV exports into four prioritised reports:
 *   SEARCH-CONSOLE-BASELINE.csv   headline totals, countries, devices, daily trend
 *   QUERY-OPPORTUNITIES.csv       per-query classification (CTR / ranking / cluster)
 *   PAGE-OPPORTUNITIES.csv        per-URL classification and recommended action
 *   INDEXING-ISSUES.csv           indexing exclusions with an interpretation
 *
 * It reads ONLY the CSV files that Search Console itself produces, so it needs no
 * API key, OAuth client or paid service. Nothing here is uploaded or published.
 *
 * Usage:
 *   node scripts/search-intelligence.mjs [exportDir] [outDir]
 *
 * Defaults (both live outside the git repository on purpose, because the numbers
 * are private to the property owner):
 *   exportDir = ../../_search-intelligence/raw
 *   outDir    = ../../documentation/search-intelligence
 *
 * Expected input files in exportDir (Search Console -> Performance -> Export -> Download CSV,
 * then unzip; plus Page indexing -> Export -> Download CSV):
 *   Queries.csv, Pages.csv, Countries.csv, Devices.csv, Chart.csv, "Critical issues.csv"
 * Any file that is missing is skipped and reported, never invented.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '..');

/* ------------------------------------------------------------------ config */

/**
 * Expected organic CTR by average position, derived from published industry
 * benchmarks, and used ONLY as a relative expectation. A page is never labelled
 * underperforming on CTR alone: position above 20 disqualifies it, and the
 * absolute impression floor below must also be met. A 12-impression query can
 * never justify a rewrite.
 */
const EXPECTED_CTR = [
  { max: 1, ctr: 0.28 },
  { max: 2, ctr: 0.15 },
  { max: 3, ctr: 0.11 },
  { max: 5, ctr: 0.07 },
  { max: 10, ctr: 0.04 },
  { max: 20, ctr: 0.02 },
  { max: Infinity, ctr: 0.005 },
];

/** Impression floors. Tuned for a young property averaging ~400 impressions/month. */
const MIN_IMPRESSIONS_CTR = 20; // enough signal to compare against expectation
const MIN_IMPRESSIONS_ZERO_CLICK = 40; // a page this visible with zero clicks is a problem
const MIN_IMPRESSIONS_RANKING = 5; // low floor: ranking data is useful even when thin
const CTR_EXPECTATION_RATIO = 0.5; // "poor" = less than half of the positional expectation

/** Position bands that are worth acting on, highest leverage first. */
const BAND_NEAR_WIN = [4, 10];
const BAND_STRIKING = [11, 20];
const BAND_DEEP = [21, 100]; // beyond ~10 pages a URL is effectively undiscoverable; still worth flagging

/**
 * Topic clusters, matched against the query text by keyword. These are analyst
 * definitions, not data from Google: they exist so that forty phrasings of the
 * same question ("should i put references on my resume", "do you put references
 * on a resume", ...) are summed into one actionable number instead of being
 * read as forty unrelated single-impression queries.
 */
const CLUSTERS = [
  { name: 'resume-references', keys: ['reference'], page: '/references-on-resume' },
  { name: 'resignation-letters', keys: ['resignation', 'resign', 'notice', 'regain letter', 'region later', 'regeneration'], page: '/resignation-letter' },
  { name: 'recommendation-letters', keys: ['recommendation'], page: '/recommendation-letter' },
  { name: 'ats-optimisation', keys: ['ats'], page: '/ats-resume-maker' },
  { name: 'resume-summary', keys: ['summary'], page: '/summary-generator' },
  { name: 'professional-bio', keys: ['bio', 'biography'], page: '/bio-generator' },
  { name: 'european-cv', keys: ['european', 'europian', 'europa', 'eu cv', 'euro cv', 'europe cv'], page: '/european-cv-format' },
  { name: 'cv-vs-resume', keys: ['cv and resume', 'cv vs resume', 'difference', 'diff bw'], page: '/cv-vs-resume' },
  { name: 'resume-builder', keys: ['resume builder', 'cv builder', 'resume maker', 'cv maker', 'resume creator'], page: '/resume-builder' },
  { name: 'resume-map', keys: ['resume map', 'map resume', 'map online', 'resume near', 'resume travel', 'online resume'], page: '/resume-map' },
  { name: 'covering-letters', keys: ['cover letter'], page: '/cover-letter-builder' },
  { name: 'interview-prep', keys: ['interview'], page: '/interview-prep' },
  { name: 'cover-objective', keys: ['objective'], page: '/resume-objective-generator' },
  { name: 'bullet-phrase', keys: ['bullet', 'phrase', 'sentence'], page: '/resume-bullet-generator' },
  { name: 'resume-length', keys: ['how long', 'word count', 'pages'], page: '/resume-writing-guide' },
  { name: 'country-specific', keys: ['bangladesh', 'german', 'uk cv', 'usa resume', 'pakistan', 'india resume', 'canada'], page: '/country-guides' },
];

/* --------------------------------------------------------------- csv utils */

/** Minimal RFC4180 parser: quoted fields, embedded commas and newlines. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  const src = text.replace(/^\uFEFF/, '');

  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') { field += '"'; i += 1; }
        else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (ch !== '\r') field += ch;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }

  const header = (rows.shift() || []).map((h) => h.trim());
  return rows
    .filter((r) => r.length > 1 && r.some((c) => c.trim() !== ''))
    .map((r) => Object.fromEntries(header.map((h, i) => [h, (r[i] ?? '').trim()])));
}

function readCsv(dir, name) {
  const p = join(dir, name);
  if (!existsSync(p)) return null;
  return parseCsv(readFileSync(p, 'utf8'));
}

const num = (v) => {
  const n = Number(String(v ?? '').replace(/[%,]/g, ''));
  return Number.isFinite(n) ? n : 0;
};

function csvEscape(value) {
  const s = String(value ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function writeCsv(path, rows, columns) {
  const head = columns.join(',');
  const body = rows.map((r) => columns.map((c) => csvEscape(r[c])).join(',')).join('\n');
  writeFileSync(path, `${head}\n${body}${body ? '\n' : ''}`, 'utf8');
}

/* ------------------------------------------------------------- judgement */

function expectedCtr(position) {
  const band = EXPECTED_CTR.find((b) => position <= b.max);
  return band ? band.ctr : 0;
}

function clusterFor(text) {
  const q = String(text).toLowerCase();
  let best = null;
  for (const c of CLUSTERS) {
    for (const k of c.keys) {
      if (q.includes(k) && (!best || k.length > best.len)) best = { name: c.name, page: c.page, len: k.length };
    }
  }
  return best;
}

const inBand = (pos, band) => pos >= band[0] && pos <= band[1];

/**
 * Classify one row and return { category, action, priority, rationale }.
 * Priority: 1 = act now, 2 = next cycle, 3 = monitor.
 */
function classifyRow({ impressions, clicks, ctr, position, kind }) {
  const findings = [];
  let priority = 3;

  if (impressions >= MIN_IMPRESSIONS_ZERO_CLICK && clicks === 0) {
    findings.push({
      category: 'CTR improvement',
      action: position <= 20
        ? 'Rewrite title and meta description for the queries listed; the page ranks well enough to earn clicks.'
        : 'Earn clicks only after ranking improves: verify the page is indexed and the intent matches the query set.',
      priority: position <= 20 ? 1 : 2,
      rationale: `${impressions} impressions and 0 clicks at average position ${position.toFixed(1)}.`,
    });
  }

  const expectation = expectedCtr(position);
  const actual = impressions > 0 ? clicks / impressions : 0;
  if (position <= 20 && impressions >= MIN_IMPRESSIONS_CTR && actual < expectation * CTR_EXPECTATION_RATIO) {
    findings.push({
      category: 'CTR improvement',
      action: 'Test a title/description that states the direct answer or the concrete outcome in the first 60 characters.',
      priority: 1,
      rationale: `CTR ${(actual * 100).toFixed(1)}% is under half the ${(expectation * 100).toFixed(0)}% expected at position ${position.toFixed(1)}.`,
    });
  }

  if (inBand(position, BAND_NEAR_WIN) && impressions >= MIN_IMPRESSIONS_RANKING) {
    findings.push({
      category: 'Ranking improvement',
      action: 'Near-win: add depth, a direct answer block and internal links from the relevant hub to reach the top 3.',
      priority: 1,
      rationale: `Average position ${position.toFixed(1)} is on page 1 but outside the top results.`,
    });
  } else if (inBand(position, BAND_STRIKING) && impressions >= MIN_IMPRESSIONS_RANKING) {
    findings.push({
      category: 'Ranking improvement',
      action: 'Striking distance: strengthen the page against the exact query wording, then request indexing once changed.',
      priority: 2,
      rationale: `Average position ${position.toFixed(1)} is page 2.`,
    });
  } else if (inBand(position, BAND_DEEP) && impressions >= MIN_IMPRESSIONS_RANKING) {
    findings.push({
      category: 'Ranking improvement',
      action: 'Deep result: confirm the page is indexed before optimising further; a non-indexed page cannot rank.',
      priority: 2,
      rationale: `Average position ${position.toFixed(1)} is page 3-5.`,
    });
  }

  if (!findings.length) {
    findings.push({
      category: 'Monitor',
      action: 'No action justified by the current volume; revisit when impressions exceed the configured floors.',
      priority: 3,
      rationale: kind === 'query'
        ? 'Single-digit impressions cannot support a content or metadata decision.'
        : 'Insufficient impressions to justify a change.',
    });
  }

  findings.sort((a, b) => a.priority - b.priority);
  return findings[0];
}

/* ------------------------------------------------------------------- main */

const exportDir = resolve(process.argv[2] || join(REPO, '..', '..', '_search-intelligence', 'raw'));
const outDir = resolve(process.argv[3] || join(REPO, '..', '..', 'documentation', 'search-intelligence'));

const queries = readCsv(exportDir, 'Queries.csv');
const pages = readCsv(exportDir, 'Pages.csv');
const countries = readCsv(exportDir, 'Countries.csv');
const devices = readCsv(exportDir, 'Devices.csv');
const chart = readCsv(exportDir, 'Chart.csv');
const indexing = readCsv(exportDir, 'Critical issues.csv');

if (!queries && !pages) {
  console.error(`No Search Console CSVs found in ${exportDir}`);
  console.error('Expected at least Queries.csv and Pages.csv. See the header of this file.');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const written = [];

/* 1. Baseline ------------------------------------------------------------- */

const baseline = [];
const queryRows = (queries || []).map((r) => ({
  query: r['Top queries'] ?? '',
  clicks: num(r.Clicks),
  impressions: num(r.Impressions),
  ctr: num(r.CTR),
  position: num(r.Position),
}));

if (queryRows.length) {
  const totalClicks = queryRows.reduce((s, r) => s + r.clicks, 0);
  const totalImpressions = queryRows.reduce((s, r) => s + r.impressions, 0);
  const weightedPos = totalImpressions
    ? queryRows.reduce((s, r) => s + r.position * r.impressions, 0) / totalImpressions
    : 0;
  const dateRange = chart && chart.length
    ? `${chart[0].Date} to ${chart[chart.length - 1].Date}`
    : 'not supplied (Chart.csv missing)';

  baseline.push({ metric: 'date_range', value: dateRange, interpretation: 'Search Console reporting window covered by this export.' });
  baseline.push({ metric: 'total_clicks', value: totalClicks, interpretation: 'Sum of clicks across all queries in the export.' });
  baseline.push({ metric: 'total_impressions', value: totalImpressions, interpretation: 'Sum of impressions across all queries in the export.' });
  baseline.push({ metric: 'average_ctr', value: `${totalImpressions ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00'}%`, interpretation: 'Clicks divided by impressions.' });
  baseline.push({ metric: 'average_position', value: weightedPos.toFixed(1), interpretation: 'Impression-weighted mean position.' });
  baseline.push({ metric: 'distinct_queries', value: queryRows.length, interpretation: 'Queries with at least one impression in the window.' });
}

for (const r of countries || []) {
  baseline.push({
    metric: `country:${r.Country}`,
    value: `${num(r.Clicks)} clicks / ${num(r.Impressions)} impressions`,
    interpretation: `CTR ${r.CTR}, average position ${r.Position}.`,
  });
}
for (const r of devices || []) {
  baseline.push({
    metric: `device:${r.Device}`,
    value: `${num(r.Clicks)} clicks / ${num(r.Impressions)} impressions`,
    interpretation: `CTR ${r.CTR}, average position ${r.Position}.`,
  });
}

if (chart && chart.length) {
  const byDate = chart.map((r) => ({ date: r.Date, clicks: num(r.Clicks), impressions: num(r.Impressions) }));
  const last7 = byDate.slice(-7);
  const prev7 = byDate.slice(-14, -7);
  const sum = (rows, k) => rows.reduce((s, r) => s + r[k], 0);
  if (prev7.length === 7) {
    baseline.push({
      metric: 'trend_last_7_days',
      value: `${sum(last7, 'impressions')} impressions / ${sum(last7, 'clicks')} clicks`,
      interpretation: `Previous 7 days: ${sum(prev7, 'impressions')} impressions / ${sum(prev7, 'clicks')} clicks.`,
    });
  }
  const peak = byDate.reduce((a, b) => (b.impressions > a.impressions ? b : a), byDate[0]);
  baseline.push({
    metric: 'peak_impression_day',
    value: `${peak.date} (${peak.impressions})`,
    interpretation: 'Highest single day of impressions in the window.',
  });
}

writeCsv(join(outDir, 'SEARCH-CONSOLE-BASELINE.csv'), baseline, ['metric', 'value', 'interpretation']);
written.push('SEARCH-CONSOLE-BASELINE.csv');

/* 2. Query opportunities -------------------------------------------------- */

const queryReport = [];
for (const q of queryRows) {
  const cluster = clusterFor(q.query);
  const verdict = classifyRow({ ...q, kind: 'query' });
  queryReport.push({
    query: q.query,
    cluster: cluster ? cluster.name : '',
    target_url: cluster ? cluster.page : '',
    clicks: q.clicks,
    impressions: q.impressions,
    ctr: `${q.ctr.toFixed(2)}%`,
    position: q.position.toFixed(1),
    category: verdict.category,
    priority: verdict.priority,
    rationale: verdict.rationale,
    recommended_action: verdict.action,
    implemented: 'no',
  });
}
queryReport.sort((a, b) => a.priority - b.priority || b.impressions - a.impressions);
writeCsv(join(outDir, 'QUERY-OPPORTUNITIES.csv'), queryReport, [
  'query', 'cluster', 'target_url', 'clicks', 'impressions', 'ctr', 'position',
  'category', 'priority', 'rationale', 'recommended_action', 'implemented',
]);
written.push('QUERY-OPPORTUNITIES.csv');

/* 3. Page opportunities --------------------------------------------------- */

const pageRows = (pages || []).map((r) => ({
  url: r['Top pages'] ?? '',
  clicks: num(r.Clicks),
  impressions: num(r.Impressions),
  ctr: num(r.CTR),
  position: num(r.Position),
}));

// Sum cluster demand once, so a page can be judged against total topic demand
// rather than only the queries it happens to be attributed.
const clusterDemand = new Map();
for (const q of queryRows) {
  const c = clusterFor(q.query);
  if (!c) continue;
  const cur = clusterDemand.get(c.name) || { impressions: 0, clicks: 0, queries: 0 };
  clusterDemand.set(c.name, {
    impressions: cur.impressions + q.impressions,
    clicks: cur.clicks + q.clicks,
    queries: cur.queries + 1,
  });
}

const pageReport = [];
for (const p of pageRows) {
  const cluster = clusterFor(p.url.replace(/[-/]/g, ' '));
  const demand = cluster ? clusterDemand.get(cluster.name) : null;
  const verdict = classifyRow({ ...p, kind: 'page' });
  const isWww = /\/\/www\./.test(p.url);
  pageReport.push({
    url: p.url,
    host_variant: isWww ? 'www (redirects to apex)' : 'apex',
    cluster: cluster ? cluster.name : '',
    clicks: p.clicks,
    impressions: p.impressions,
    ctr: `${p.ctr.toFixed(2)}%`,
    position: p.position.toFixed(1),
    topic_demand_impressions: demand ? demand.impressions : '',
    category: verdict.category,
    priority: verdict.priority,
    rationale: verdict.rationale,
    recommended_action: verdict.action,
  });
}
pageReport.sort((a, b) => a.priority - b.priority || b.impressions - a.impressions);
writeCsv(join(outDir, 'PAGE-OPPORTUNITIES.csv'), pageReport, [
  'url', 'host_variant', 'cluster', 'clicks', 'impressions', 'ctr', 'position',
  'topic_demand_impressions', 'category', 'priority', 'rationale', 'recommended_action',
]);
written.push('PAGE-OPPORTUNITIES.csv');

/* 4. Indexing issues ------------------------------------------------------ */

const INDEXING_MEANING = {
  'Alternate page with proper canonical tag': {
    intentional: 'yes',
    meaning: 'The URL declares a different canonical and Google agreed. Expected for alias and duplicate routes.',
    action: 'No action. Confirm the canonical target is itself indexed.',
  },
  'Page with redirect': {
    intentional: 'yes',
    meaning: 'The URL 301s elsewhere. Expected for aliases and legacy hostnames.',
    action: 'No action while every redirect is a single hop to a 200 canonical URL.',
  },
  'Crawled - currently not indexed': {
    intentional: 'no',
    meaning: 'Google fetched the page, accepted crawl and indexing, then decided not to index it. This is a quality/duplication/authority signal, not a technical block.',
    action: 'Raise the page\'s unique value (original data, direct answers, internal links), verify it is not near-duplicate of a sibling, then request indexing once.',
  },
  'Discovered - currently not indexed': {
    intentional: 'no',
    meaning: 'Google knows the URL but has not scheduled a crawl. Usually crawl budget or low perceived value on a young site.',
    action: 'Strengthen internal links from already-indexed pages and keep the sitemap clean; do not mass-request indexing.',
  },
  'Duplicate without user-selected canonical': {
    intentional: 'no',
    meaning: 'Google found duplicates and the page does not declare a canonical.',
    action: 'Add a self-referencing or correct canonical, or 301 the duplicate.',
  },
  'Excluded by noindex tag': {
    intentional: 'maybe',
    meaning: 'A noindex directive is present.',
    action: 'Confirm the page is meant to be private (admin, owner, error pages). Never noindex a page that should rank.',
  },
  'Blocked by robots.txt': {
    intentional: 'no',
    meaning: 'robots.txt prevents crawling, so indexing cannot follow.',
    action: 'Remove the rule if the URL should be indexed.',
  },
  'Soft 404': {
    intentional: 'no',
    meaning: 'The page looks empty or like an error to Google.',
    action: 'Render real content server-side, or return a genuine 404.',
  },
};

const indexingReport = [];
let totalNotIndexed = 0;
for (const r of indexing || []) {
  const pagesCount = num(r.Pages);
  totalNotIndexed += pagesCount;
  const meta = INDEXING_MEANING[r.Reason] || {
    intentional: 'unknown',
    meaning: 'Not documented in this script; read the Search Console explanation.',
    action: 'Inspect one affected URL with URL Inspection before acting.',
  };
  indexingReport.push({
    reason: r.Reason,
    source: r.Source,
    pages: pagesCount,
    intentional: meta.intentional,
    meaning: meta.meaning,
    action: meta.action,
    priority: meta.intentional === 'yes' ? 3 : pagesCount >= 20 ? 1 : 2,
  });
}
if (indexingReport.length) {
  indexingReport.push({
    reason: 'TOTAL not indexed',
    source: '',
    pages: totalNotIndexed,
    intentional: '',
    meaning: 'Sum of all exclusion reasons in this export.',
    action: 'Compare against the indexed count in the same report to size the gap.',
    priority: '',
  });
}
indexingReport.sort((a, b) => (a.priority === '' ? 9 : a.priority) - (b.priority === '' ? 9 : b.priority));
writeCsv(join(outDir, 'INDEXING-ISSUES.csv'), indexingReport, [
  'reason', 'source', 'pages', 'intentional', 'meaning', 'action', 'priority',
]);
written.push('INDEXING-ISSUES.csv');

/* 5. Cluster summary ------------------------------------------------------ */

const clusterRows = [...clusterDemand.entries()]
  .map(([name, d]) => ({
    cluster: name,
    queries: d.queries,
    impressions: d.impressions,
    clicks: d.clicks,
    ctr: d.impressions ? `${((d.clicks / d.impressions) * 100).toFixed(1)}%` : '0.0%',
    target_url: (CLUSTERS.find((c) => c.name === name) || {}).page || '',
  }))
  .sort((a, b) => b.impressions - a.impressions);
writeCsv(join(outDir, 'QUERY-CLUSTERS.csv'), clusterRows, [
  'cluster', 'queries', 'impressions', 'clicks', 'ctr', 'target_url',
]);
written.push('QUERY-CLUSTERS.csv');

/* ------------------------------------------------------------------ report */

console.log(`Search Intelligence rebuilt from ${exportDir}`);
console.log(`Output: ${outDir}`);
for (const f of written) console.log(`  - ${f}`);
const missing = ['Queries.csv', 'Pages.csv', 'Countries.csv', 'Devices.csv', 'Chart.csv', 'Critical issues.csv']
  .filter((f) => !existsSync(join(exportDir, f)));
if (missing.length) {
  console.log(`Skipped (not supplied): ${missing.join(', ')}`);
}
console.log(`Classified ${queryReport.length} queries and ${pageReport.length} URLs.`);

#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const publicationsPath = path.join(rootDir, "app", "publications-data.json");

const config = {
  authorName: readEnv("PUBLICATION_AUTHOR_NAME", "Yang Yu"),
  authorAliases: splitEnv("PUBLICATION_AUTHOR_ALIASES", "Yang Yu;Yu Yang"),
  affiliationKeywords: splitEnv(
    "PUBLICATION_AFFILIATIONS",
    "Nankai University;Nankai;National University of Singapore;NUS;Jilin University;Jilin",
  ),
  topicKeywords: splitEnv(
    "PUBLICATION_TOPIC_KEYWORDS",
    "materials;flexible;stretchable;bioelectronic;bioelectronics;electrode;MEMS;microfabrication;electrophysiological;EMG;underwater;sensor;skin;soft electronics",
  ),
  openAlexAuthorId: normalizeOpenAlexAuthorId(process.env.PUBLICATION_OPENALEX_AUTHOR_ID),
  allowNameOnly: process.env.PUBLICATION_ALLOW_NAME_ONLY === "true",
  sinceYear: Number.parseInt(readEnv("PUBLICATION_SINCE_YEAR", "2020"), 10),
  maxWorks: Number.parseInt(readEnv("PUBLICATION_MAX_RESULTS", "20"), 10),
  apiKey: process.env.OPENALEX_API_KEY?.trim() ?? "",
  mailto: process.env.OPENALEX_MAILTO?.trim() ?? "",
  dryRun: process.argv.includes("--dry-run"),
};

const targetNameKeys = new Set(
  [config.authorName, ...config.authorAliases].filter(Boolean).map(normalizePersonName),
);

if (process.argv.includes("--help")) {
  printHelp();
  process.exit(0);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});

async function main() {
  const currentText = await readFile(publicationsPath, "utf8");
  const currentItems = JSON.parse(currentText);
  const fetchedItems = await fetchPublicationItems();

  if (fetchedItems.length === 0) {
    console.log("No matching OpenAlex publications found. Existing publication data was left unchanged.");
    console.log("For accurate matching, set PUBLICATION_OPENALEX_AUTHOR_ID in GitHub repository variables.");
    return;
  }

  const nextItems = mergePublicationItems(currentItems, fetchedItems);
  const nextText = `${JSON.stringify(nextItems, null, 2)}\n`;

  if (nextText === currentText) {
    console.log(`Publication data is already up to date. ${fetchedItems.length} OpenAlex item(s) checked.`);
    return;
  }

  if (config.dryRun) {
    console.log(`Dry run: ${fetchedItems.length} OpenAlex item(s) would be merged.`);
    for (const item of fetchedItems) {
      console.log(`- ${item.title}`);
    }
    return;
  }

  await writeFile(publicationsPath, nextText, "utf8");
  console.log(`Updated ${path.relative(rootDir, publicationsPath)} with ${fetchedItems.length} OpenAlex item(s).`);
}

async function fetchPublicationItems() {
  const authorIds = config.openAlexAuthorId
    ? [config.openAlexAuthorId]
    : await findLikelyOpenAlexAuthorIds();

  if (authorIds.length === 0) {
    return [];
  }

  const works = [];
  for (const authorId of authorIds) {
    works.push(...(await fetchWorksByAuthorId(authorId)));
  }

  return dedupeByKey(works.map(openAlexWorkToPublication).filter(Boolean), publicationKey)
    .sort((a, b) => (b.publicationDate ?? "").localeCompare(a.publicationDate ?? ""))
    .slice(0, config.maxWorks);
}

async function findLikelyOpenAlexAuthorIds() {
  const url = openAlexUrl("/authors", {
    search: config.authorName,
    "per-page": "50",
  });
  const data = await fetchJson(url);
  const minScore = config.allowNameOnly || config.affiliationKeywords.length === 0 ? 4 : 10;
  const candidates = (data.results ?? [])
    .map((author) => ({ author, score: scoreAuthorCandidate(author) }))
    .filter(({ score }) => score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (candidates.length === 0) {
    console.log("No OpenAlex author profile matched both the target name and affiliation keywords.");
    return [];
  }

  for (const candidate of candidates) {
    console.log(`Matched OpenAlex author: ${candidate.author.display_name} (${candidate.author.id})`);
  }

  return candidates.map(({ author }) => normalizeOpenAlexAuthorId(author.id)).filter(Boolean);
}

function scoreAuthorCandidate(author) {
  if (!matchesTargetName(author.display_name)) {
    return 0;
  }

  let score = 4;
  const institutionText = stringifyText([author.last_known_institutions, author.affiliations]);
  const topicText = stringifyText([author.topics, author.x_concepts]);

  if (includesAnyKeyword(institutionText, config.affiliationKeywords)) {
    score += 6;
  }

  if (includesAnyKeyword(topicText, config.topicKeywords)) {
    score += 1;
  }

  return score;
}

async function fetchWorksByAuthorId(authorId) {
  const authorFilterNames = ["authorships.author.id", "author.id"];
  let lastError;

  for (const authorFilterName of authorFilterNames) {
    try {
      const filters = [
        `${authorFilterName}:${authorId}`,
        `from_publication_date:${config.sinceYear}-01-01`,
      ];
      const url = openAlexUrl("/works", {
        filter: filters.join(","),
        sort: "publication_date:desc",
        "per-page": String(config.maxWorks),
      });
      const data = await fetchJson(url);
      return data.results ?? [];
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

function openAlexWorkToPublication(work) {
  const title = cleanText(work.title || work.display_name);

  if (!title) {
    return null;
  }

  const authorships = work.authorships ?? [];
  const publicationDate = work.publication_date || (work.publication_year ? `${work.publication_year}-01-01` : "");
  const year = publicationDate.slice(0, 4) || work.publication_year || "";
  const venue = findVenue(work);
  const doiUrl = findDoiUrl(work);
  const doi = doiUrl ? doiUrl.replace("https://doi.org/", "") : "";
  const openAlexId = work.id || "";

  return {
    source: "openalex",
    openAlexId,
    doi,
    publicationDate,
    isPublished: true,
    authorRole: inferAuthorRole(authorships),
    venue,
    status: year ? `Published ${year}` : "Published",
    citations: String(work.cited_by_count ?? 0),
    title,
    authors: formatAuthors(authorships),
    imagePath: "/publication-placeholder.svg",
    projectHref: doiUrl || work.primary_location?.landing_page_url || openAlexId || "#",
    highlights: buildHighlights({ venue, year, doi, citedByCount: work.cited_by_count }),
    overview: buildOverview(work, venue),
  };
}

function mergePublicationItems(currentItems, fetchedItems) {
  const currentItemsByKey = new Map(currentItems.map((item) => [publicationKey(item), item]));
  const currentItemsByTitle = new Map(currentItems.map((item) => [normalizeTitle(item.title), item]));
  const mergedFetchedItems = fetchedItems.map((item) =>
    mergeFetchedPublicationItem(
      item,
      currentItemsByKey.get(publicationKey(item)) ?? currentItemsByTitle.get(normalizeTitle(item.title)),
    ),
  );
  const fetchedKeys = new Set(mergedFetchedItems.map(publicationKey));
  const fetchedTitleKeys = new Set(mergedFetchedItems.map((item) => normalizeTitle(item.title)));
  const manualItems = currentItems.filter((item) => item.source !== "openalex");
  const preservedManualItems = manualItems.filter((item) => {
    if (fetchedKeys.has(publicationKey(item))) {
      return false;
    }

    return !fetchedTitleKeys.has(normalizeTitle(item.title));
  });

  return [...mergedFetchedItems, ...preservedManualItems];
}

function mergeFetchedPublicationItem(fetchedItem, currentItem) {
  if (!currentItem) {
    return fetchedItem;
  }

  const nextItem = { ...fetchedItem };

  if (currentItem.authorRole === "co-first") {
    nextItem.authorRole = "co-first";
  }

  if (currentItem.imagePath && currentItem.imagePath !== "/publication-placeholder.svg") {
    nextItem.imagePath = currentItem.imagePath;
  }

  return nextItem;
}

function buildHighlights({ venue, year, doi, citedByCount }) {
  const highlights = [];

  if (venue && year) {
    highlights.push(`Published in ${venue} in ${year}.`);
  } else if (year) {
    highlights.push(`Published in ${year}.`);
  }

  if (doi) {
    highlights.push(`DOI: ${doi}`);
  }

  highlights.push(`Citation count from OpenAlex: ${citedByCount ?? 0}.`);

  return highlights.slice(0, 3);
}

function buildOverview(work, venue) {
  const abstract = abstractFromInvertedIndex(work.abstract_inverted_index);

  if (abstract) {
    return truncateAtSentence(abstract, 480);
  }

  if (venue) {
    return `Publication metadata retrieved from OpenAlex for a ${venue} article.`;
  }

  return "Publication metadata retrieved from OpenAlex.";
}

function abstractFromInvertedIndex(index) {
  if (!index || typeof index !== "object") {
    return "";
  }

  const words = [];
  for (const [word, positions] of Object.entries(index)) {
    for (const position of positions) {
      words[position] = word;
    }
  }

  return cleanText(words.filter(Boolean).join(" "));
}

function formatAuthors(authorships) {
  const names = dedupeByKey(
    authorships
      .map((authorship) => cleanText(authorship.raw_author_name || authorship.author?.display_name || ""))
      .filter(Boolean),
    normalizeText,
  );

  if (names.length <= 8) {
    return names.join(", ");
  }

  return `${names.slice(0, 6).join(", ")}, et al.`;
}

function inferAuthorRole(authorships) {
  const firstAuthor = authorships[0];
  const firstAuthorName = cleanText(firstAuthor?.raw_author_name || firstAuthor?.author?.display_name || "");

  return matchesTargetName(firstAuthorName) ? "first" : "other";
}

function findVenue(work) {
  return cleanText(
    work.primary_location?.source?.display_name ||
      work.host_venue?.display_name ||
      work.locations?.find((location) => location.source?.display_name)?.source?.display_name ||
      "",
  );
}

function findDoiUrl(work) {
  const doi = cleanText(work.doi || "");

  if (!doi) {
    return "";
  }

  if (doi.startsWith("https://doi.org/")) {
    return doi;
  }

  if (doi.startsWith("10.")) {
    return `https://doi.org/${doi}`;
  }

  return doi;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": `yang-yu-homepage-publication-updater${config.mailto ? ` (${config.mailto})` : ""}`,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAlex request failed ${response.status}: ${body.slice(0, 500)}`);
  }

  return response.json();
}

function openAlexUrl(endpoint, params) {
  const url = new URL(`https://api.openalex.org${endpoint}`);

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      url.searchParams.set(key, value);
    }
  }

  if (config.mailto) {
    url.searchParams.set("mailto", config.mailto);
  }

  if (config.apiKey) {
    url.searchParams.set("api_key", config.apiKey);
  }

  return url;
}

function publicationKey(item) {
  const doiKey = normalizeDoi(item.doi || item.projectHref || "");

  if (doiKey) {
    return `doi:${doiKey}`;
  }

  if (item.openAlexId) {
    return `openalex:${normalizeOpenAlexAuthorId(item.openAlexId) || normalizeText(item.openAlexId)}`;
  }

  return `title:${normalizeTitle(item.title)}`;
}

function normalizeDoi(value) {
  const match = String(value).toLowerCase().match(/10\.\S+/);
  return match ? match[0].replace(/[).,;]+$/, "") : "";
}

function normalizeOpenAlexAuthorId(value) {
  const match = String(value ?? "").trim().match(/A\d+/i);
  return match ? match[0].toUpperCase() : "";
}

function matchesTargetName(value) {
  return targetNameKeys.has(normalizePersonName(value));
}

function includesAnyKeyword(text, keywords) {
  const normalizedText = normalizeText(text);
  return keywords.some((keyword) => normalizedText.includes(normalizeText(keyword)));
}

function splitEnv(name, fallback) {
  return readEnv(name, fallback)
    .split(/[;,]/)
    .map((value) => value.trim())
    .filter(Boolean);
}

function readEnv(name, fallback) {
  const value = process.env[name]?.trim();
  return value || fallback;
}

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function stringifyText(value) {
  if (!value) {
    return "";
  }

  if (Array.isArray(value)) {
    return value.map(stringifyText).join(" ");
  }

  if (typeof value === "object") {
    return Object.values(value).map(stringifyText).join(" ");
  }

  return cleanText(value);
}

function normalizeText(value) {
  return cleanText(value).toLowerCase();
}

function normalizePersonName(value) {
  return normalizeText(value).replace(/[^a-z0-9]/g, "");
}

function normalizeTitle(value) {
  return normalizeText(value).replace(/[^a-z0-9]/g, "");
}

function dedupeByKey(items, keyFn) {
  const seen = new Set();
  const result = [];

  for (const item of items) {
    const key = keyFn(item);

    if (!key || seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(item);
  }

  return result;
}

function truncateAtSentence(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  const clipped = text.slice(0, maxLength);
  const sentenceEnd = Math.max(clipped.lastIndexOf(". "), clipped.lastIndexOf("? "), clipped.lastIndexOf("! "));

  if (sentenceEnd > maxLength * 0.55) {
    return clipped.slice(0, sentenceEnd + 1);
  }

  return `${clipped.trim()}...`;
}

function printHelp() {
  console.log(`
Update publication data from OpenAlex.

Usage:
  npm run update-publications
  npm run update-publications -- --dry-run

Useful environment variables:
  PUBLICATION_OPENALEX_AUTHOR_ID  Exact OpenAlex author ID, for example A1234567890.
  PUBLICATION_AUTHOR_NAME         Author name used when searching OpenAlex. Default: Yang Yu.
  PUBLICATION_AUTHOR_ALIASES      Semicolon-separated name aliases. Default: Yang Yu;Yu Yang.
  PUBLICATION_AFFILIATIONS        Semicolon-separated affiliation keywords.
  PUBLICATION_SINCE_YEAR          Earliest publication year to include. Default: 2020.
  PUBLICATION_MAX_RESULTS         Maximum fetched publication count. Default: 20.
  OPENALEX_API_KEY                Optional OpenAlex API key for higher/more stable limits.
  OPENALEX_MAILTO                 Contact email sent to OpenAlex as a polite API parameter.
`);
}

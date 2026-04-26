import test from "node:test";
import assert from "node:assert/strict";

import { isHighQualityCandidate } from "@/lib/article-candidate";
import type { SourceItem } from "@/lib/sources/types";

type Analysis = Parameters<typeof isHighQualityCandidate>[1];

function makeItem(overrides: Partial<SourceItem>): SourceItem {
  return {
    title: "南非科学家推出污染预警应用",
    url: "https://example.com/a",
    source: "华尔街见闻·热门",
    rawText: "南非科学家推出污染预警应用",
    publishedAt: "2026-04-21T08:00:00.000Z",
    sourceType: "newsnow",
    ...overrides
  };
}

function makeAnalysis(overrides: Partial<Analysis>): Analysis {
  return {
    recommendLevel: 3,
    tags: ["宏观"],
    ...overrides
  };
}

test("isHighQualityCandidate accepts curated Chinese macro items", () => {
  assert.equal(isHighQualityCandidate(makeItem({}), makeAnalysis({})), true);
});

test("isHighQualityCandidate rejects thin titles", () => {
  assert.equal(
    isHighQualityCandidate(makeItem({ title: "AI", rawText: "AI", source: "华尔街见闻·热门" }), makeAnalysis({ recommendLevel: 5 })),
    false
  );
});

test("isHighQualityCandidate rejects weak title-only non-curated items", () => {
  assert.equal(
    isHighQualityCandidate(
      makeItem({ source: "Random Blog", sourceType: "rss", rawText: "Short title only" }),
      makeAnalysis({ recommendLevel: 3, tags: ["宏观"] })
    ),
    false
  );
});

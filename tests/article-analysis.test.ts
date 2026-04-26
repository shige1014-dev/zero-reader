import test from "node:test";
import assert from "node:assert/strict";

import { buildFallbackAnalysis, classifyTags } from "@/lib/article-analysis";
import type { SourceItem } from "@/lib/sources/types";

function makeItem(overrides: Partial<SourceItem>): SourceItem {
  return {
    title: "Rate cuts are delayed as inflation stays sticky",
    url: "https://example.com/rates",
    source: "Reuters",
    rawText: "Federal Reserve officials said inflation progress has stalled and bond yields moved higher.",
    publishedAt: "2026-04-22T10:00:00.000Z",
    sourceType: "rss",
    ...overrides
  };
}

test("classifyTags does not misread incidental ai substrings as AI chips", () => {
  assert.deepEqual(classifyTags("Rail delays raise supply chain risk in Britain"), ["宏观"]);
});

test("classifyTags classifies SpaceX as space infrastructure instead of geopolitical risk", () => {
  assert.deepEqual(classifyTags("SpaceX wins new launch contract for satellite constellation"), ["商业航天"]);
});

test("buildFallbackAnalysis creates item-specific non-template judgment", () => {
  const result = buildFallbackAnalysis(
    makeItem({
      title: "Nvidia suppliers expand advanced packaging capacity",
      rawText: "Advanced packaging demand from AI accelerators is forcing suppliers to add capacity and raises the next capex checkpoint."
    })
  );

  assert.deepEqual(result.tags, ["AI芯片"]);
  assert.match(result.zeroEval, /Nvidia suppliers/);
  assert.doesNotMatch(result.zeroEval, /真正重要的是把新闻热度拆成订单兑现/);
  assert.ok(result.analysis);
});

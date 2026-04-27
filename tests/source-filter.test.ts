import test from "node:test";
import assert from "node:assert/strict";

import { isAllowedIngestItem } from "@/lib/source-filter";
import type { SourceItem } from "@/lib/sources/types";

function makeItem(overrides: Partial<SourceItem>): SourceItem {
  return {
    title: "[@karpathy] Software 3.0 note",
    url: "https://twitter.com/karpathy/status/1",
    source: "X:Andrej Karpathy",
    rawText: "Software 3.0 note",
    publishedAt: "2026-04-23T08:00:00.000Z",
    sourceType: "x-twitter",
    ...overrides
  };
}

test("isAllowedIngestItem allows x-twitter items from configured accounts", () => {
  assert.equal(isAllowedIngestItem(makeItem({})), true);
});

test("isAllowedIngestItem keeps random rss sources outside the ingest whitelist", () => {
  assert.equal(
    isAllowedIngestItem(makeItem({ source: "Random Blog", sourceType: "rss" })),
    false
  );
});

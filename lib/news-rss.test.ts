import test from "node:test";
import assert from "node:assert/strict";

import { buildGoogleNewsRssUrl, parseGoogleNewsRss } from "./news-rss.ts";

test("buildGoogleNewsRssUrl encodes the query into a Google News RSS endpoint", () => {
  const url = buildGoogleNewsRssUrl("\"AI chip\" OR semiconductor");
  assert.match(url, /^https:\/\/news\.google\.com\/rss\/search\?/);
  assert.match(url, /q=%22AI\+chip%22\+OR\+semiconductor/);
});

test("parseGoogleNewsRss extracts Reuters and ignores unsupported sources", () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <item>
        <title>TSMC pushes capacity plans - Reuters</title>
        <link>https://news.google.com/rss/articles/CBMiT2h0dHBzOi8vd3d3LnJldXRlcnMuY29tL3dvcmxkL3RzbWMtbmV3cy_SAQA?oc=5</link>
        <pubDate>Sat, 18 Apr 2026 02:00:00 GMT</pubDate>
        <source url="https://www.reuters.com">Reuters</source>
      </item>
      <item>
        <title>Rumor round-up - Blog</title>
        <link>https://news.google.com/rss/articles/irrelevant</link>
        <pubDate>Sat, 18 Apr 2026 01:00:00 GMT</pubDate>
        <source url="https://example.com">Example Blog</source>
      </item>
    </channel>
  </rss>`;

  const items = parseGoogleNewsRss(xml, new Set(["Reuters"]));
  assert.equal(items.length, 1);
  assert.equal(items[0]?.source, "Reuters");
  assert.equal(items[0]?.title, "TSMC pushes capacity plans");
});

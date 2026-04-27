import test from "node:test";
import assert from "node:assert/strict";

import { COMPANY_LINKS, COMPANY_MATRIX_LAYERS, COMPANY_NODES } from "@/lib/company-matrix/data";
import {
  filterCompanyNodes,
  getCompanyByTicker,
  getRenderableLinks,
  layerLabel,
  validateCompanyMatrix
} from "@/lib/company-matrix/model";

test("company matrix data has unique tickers", () => {
  const result = validateCompanyMatrix(COMPANY_NODES, COMPANY_LINKS);

  assert.deepEqual(result.duplicateTickers, []);
});

test("company matrix links reference known tickers", () => {
  const result = validateCompanyMatrix(COMPANY_NODES, COMPANY_LINKS);

  assert.deepEqual(result.unknownLinkTickers, []);
});

test("filterCompanyNodes filters by narrative", () => {
  const nodes = filterCompanyNodes(COMPANY_NODES, { narratives: ["ai-agents"], layers: [], strengths: [] });

  assert.ok(nodes.some((node) => node.ticker === "NVDA"));
  assert.ok(nodes.some((node) => node.ticker === "MSFT"));
  assert.equal(nodes.some((node) => node.ticker === "XOM"), false);
});

test("filterCompanyNodes filters by layer", () => {
  const nodes = filterCompanyNodes(COMPANY_NODES, { narratives: [], layers: [4], strengths: [] });

  assert.ok(nodes.length > 0);
  assert.equal(nodes.every((node) => node.primaryLayer === 4), true);
});

test("getRenderableLinks excludes links with unknown endpoints and supports strength filters", () => {
  const links = getRenderableLinks(
    COMPANY_NODES,
    [
      ...COMPANY_LINKS,
      { source: "NVDA", target: "UNKNOWN", strength: "core", role: "depends_on", thesis: "bad link" }
    ],
    { narratives: [], layers: [], strengths: ["core"] }
  );

  assert.ok(links.length > 0);
  assert.equal(links.every((link) => link.strength === "core"), true);
  assert.equal(links.some((link) => link.target.ticker === "UNKNOWN"), false);
});

test("getCompanyByTicker and layerLabel return expected display values", () => {
  assert.equal(getCompanyByTicker(COMPANY_NODES, "nvda")?.name, "NVIDIA");
  assert.equal(layerLabel(COMPANY_MATRIX_LAYERS, 4), "Compute Layer");
});

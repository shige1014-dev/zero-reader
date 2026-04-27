import test from "node:test";
import assert from "node:assert/strict";

import { resolveSyncDate } from "./sync-cloud.js";

test("resolveSyncDate uses today when local data exists for today", () => {
  const resolved = resolveSyncDate("2026-04-18", ["2026-04-18", "2026-04-16"]);
  assert.equal(resolved, "2026-04-18");
});

test("resolveSyncDate falls back to latest local date when today is empty", () => {
  const resolved = resolveSyncDate("2026-04-18", ["2026-04-16", "2026-04-15"]);
  assert.equal(resolved, "2026-04-16");
});

test("resolveSyncDate returns null when there is no local data", () => {
  const resolved = resolveSyncDate("2026-04-18", []);
  assert.equal(resolved, null);
});
